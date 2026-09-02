#!/usr/bin/env node
/**
 * Kablanet clip recorder — drives the real app in Chromium, draws a synthetic
 * cursor (Playwright never records the OS pointer), and writes a webm.
 *
 *   node record.mjs --clip=dashboard
 *
 * Auth reuses the load-harness test accounts (zz-loadtest-N@kablanet.test),
 * which belong to Summit Crest Builders. We sign in against the Supabase REST
 * endpoint and inject the session into localStorage — no password is ever
 * typed into a form.
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = '/Users/guyw/Desktop/Claude/Kablanet';
const env = Object.fromEntries(
  fs.readFileSync(path.join(ROOT, 'kablanet-build-buddy/.env'), 'utf8')
    .split('\n').filter(Boolean)
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).replace(/^"|"$/g, '')]; }),
);
const SUPA = env.VITE_SUPABASE_URL;
const ANON = env.VITE_SUPABASE_PUBLISHABLE_KEY;

const arg = (k, d) => { const a = process.argv.find((s) => s.startsWith(`--${k}=`)); return a ? a.split('=')[1] : d; };
const CLIP = arg('clip', 'dashboard');
const APP = arg('app', 'https://kablanet.com');
const OUTDIR = arg('out', path.join(import.meta.dirname, 'clips'));
const W = 1440, H = 900;
/* --strict makes a missed target abort the take instead of silently
   recording a cursor that never arrives. On by default; --strict=0 to loosen. */
const STRICT = arg('strict', '1') !== '0';

/* ---------- auth ---------------------------------------------------------- */
/* Reuses the browser session captured once by capture-login.mjs. No password
   is ever handled here. */
const AUTH = path.join(import.meta.dirname, 'auth.json');
if (!fs.existsSync(AUTH)) {
  console.error('No auth.json — run:  node capture-login.mjs');
  process.exit(2);
}


/* ---------- recording chrome cleanup -------------------------------------
   We record from an account that happens to be a platform admin. Subcontractors
   never see the Platform Admin group or the company switcher, so leaving them on
   camera would show a UI the audience does not have. This removes only those two
   admin-only affordances — no product feature is hidden or faked. -------- */
const CHROME_JS = `
(() => {
  const clean = () => {
    // 1. Drop the whole "Platform" sidebar group (its label + the Admin link).
    document.querySelectorAll('[data-sidebar="group"]').forEach((g) => {
      const label = g.querySelector('[data-sidebar="group-label"]');
      if (label && label.textContent.trim() === 'Platform') g.style.display = 'none';
    });
    // 2. The company switcher only renders for admins / multi-company users.
    //    Render it the way a single-company account sees it: a plain name.
    document.querySelectorAll('[data-sidebar="header"] button').forEach((b) => {
      if (b.dataset.plainified) return;
      const name = (b.innerText || '').trim();
      if (!name) return;
      const span = document.createElement('span');
      span.className = 'font-semibold text-sidebar-foreground truncate';
      span.textContent = name;
      b.dataset.plainified = '1';
      b.replaceWith(span);
    });
  };
  const boot = () => { clean(); new MutationObserver(clean)
    .observe(document.documentElement, { childList: true, subtree: true }); };
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
`;

/* ---------- synthetic cursor --------------------------------------------- */
const CURSOR_JS = `
(() => {
  if (window.__cur) return;
  const c = document.createElement('div');
  c.id = '__cursor';
  c.style.cssText = 'position:fixed;left:0;top:0;width:22px;height:22px;z-index:2147483647;' +
    'pointer-events:none;transform:translate(-2px,-2px);will-change:transform;';
  c.innerHTML = '<svg viewBox="0 0 22 22" width="22" height="22">' +
    '<path d="M4 2 L4 17 L8.2 13.2 L10.8 19 L13.6 17.7 L11 12 L16.5 12 Z" ' +
    'fill="#fff" stroke="#12181f" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  document.body.appendChild(c);
  let x = 0, y = 0;
  window.__cur = (nx, ny) => { x = nx; y = ny; c.style.transform =
    'translate(' + (nx - 2) + 'px,' + (ny - 2) + 'px)'; };
  window.__ripple = () => {
    const r = document.createElement('div');
    r.style.cssText = 'position:fixed;z-index:2147483646;pointer-events:none;border-radius:50%;' +
      'border:2px solid rgba(11,99,206,.9);left:' + (x - 6) + 'px;top:' + (y - 6) + 'px;' +
      'width:12px;height:12px;opacity:1;transition:all .38s cubic-bezier(.2,.7,.3,1)';
    document.body.appendChild(r);
    requestAnimationFrame(() => {
      r.style.width = '44px'; r.style.height = '44px';
      r.style.left = (x - 22) + 'px'; r.style.top = (y - 22) + 'px'; r.style.opacity = '0';
    });
    setTimeout(() => r.remove(), 450);
  };
})();
`;

/* ---------- movement helpers --------------------------------------------- */
const ease = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function makeDriver(page) {
  let cx = W / 2, cy = H / 2;
  let t0 = Date.now();
  return {
    /* Zero the clock immediately before the timeline runs, so the offset we
       record is exactly the recording's lead-in. */
    reset() { t0 = Date.now(); return t0; },
    /* Hold until an absolute time on the audio cue sheet. Keeps every clip
       exactly the length of its voice-over, whatever the app's load time. */
    async until(sec) {
      const wait = t0 + sec * 1000 - Date.now();
      if (wait > 0) await sleep(wait);
      else if (wait < -400) console.error(`  ! behind cue ${sec}s by ${(-wait / 1000).toFixed(1)}s`);
    },
    elapsed() { return (Date.now() - t0) / 1000; },
    async ensure() { await page.evaluate(CURSOR_JS); await page.evaluate(([x, y]) => window.__cur(x, y), [cx, cy]); },
    async moveTo(x, y, ms = 700) {
      const sx = cx, sy = cy, steps = Math.max(12, Math.round(ms / 16));
      for (let i = 1; i <= steps; i++) {
        const t = ease(i / steps);
        const nx = sx + (x - sx) * t, ny = sy + (y - sy) * t;
        await page.evaluate(([a, b]) => window.__cur && window.__cur(a, b), [nx, ny]);
        await page.mouse.move(nx, ny);
        await sleep(ms / steps);
      }
      cx = x; cy = y;
    },
    async moveToEl(sel, ms = 700, dx = 0, dy = 0) {
      let box;
      try {
        box = await page.locator(sel).first().boundingBox({ timeout: 2500 });
      } catch { box = null; }
      if (!box) {
        const msg = '  ! not found: ' + sel;
        if (STRICT) throw new Error(msg.trim());
        console.error(msg); return false;
      }
      await this.moveTo(box.x + box.width / 2 + dx, box.y + box.height / 2 + dy, ms);
      return true;
    },
    /* Find a leaf element by its exact visible text and move there. Far more
       robust than a CSS selector against a data-driven UI. */
    async moveToText(label, ms = 700, dy = 0) {
      const pt = await page.evaluate((want) => {
        const els = [...document.querySelectorAll('div,span,p,td,th,h1,h2,h3,button,a')];
        for (const e of els) {
          if (e.childElementCount) continue;
          if ((e.textContent || '').trim() !== want) continue;
          const r = e.getBoundingClientRect();
          if (r.width > 4 && r.height > 4 && r.top > -10 && r.top < innerHeight)
            return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) };
        }
        return null;
      }, label);
      if (!pt) {
        const msg = '  ! text not found: ' + label;
        if (STRICT) throw new Error(msg.trim());
        console.error(msg); return false;
      }
      await this.moveTo(pt.x, pt.y + dy, ms);
      return true;
    },
    async click() {
      await page.evaluate(() => window.__ripple && window.__ripple());
      await page.mouse.click(cx, cy);
      await sleep(120);
    },
    async hold(ms) { await sleep(ms); },
    /* Type at a human cadence into whatever currently has focus. Click the
       field first: moveToEl -> click -> type is the full gesture. */
    async type(text, msPerChar = 55) {
      await page.keyboard.type(String(text), { delay: msPerChar });
    },
    async press(key) { await page.keyboard.press(key); await sleep(90); },
    /* Clear a field before typing into it (select-all then overwrite). */
    async replace(text, msPerChar = 55) {
      await page.keyboard.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
      await sleep(80);
      await page.keyboard.type(String(text), { delay: msPerChar });
    },
    /* The app scrolls an inner container, not the window — find whichever
       element actually has overflow and drive that. */
    async scrollTo(y, ms = 900) {
      const from = await page.evaluate(() => {
        const pick = () => {
          if (document.documentElement.scrollHeight > innerHeight + 40) return null;
          let best = null, bestH = 0;
          for (const e of document.querySelectorAll('*')) {
            const over = e.scrollHeight - e.clientHeight;
            if (over > 80 && e.clientHeight > 300 && over > bestH) { best = e; bestH = over; }
          }
          return best;
        };
        window.__sc = pick();
        return window.__sc ? window.__sc.scrollTop : window.scrollY;
      });
      const steps = Math.max(12, Math.round(ms / 16));
      for (let i = 1; i <= steps; i++) {
        const t = ease(i / steps);
        await page.evaluate((v) => {
          if (window.__sc) window.__sc.scrollTop = v; else window.scrollTo(0, v);
        }, from + (y - from) * t);
        await sleep(ms / steps);
      }
    },
    pos() { return [cx, cy]; },
  };
}

/* ---------- clip timelines ------------------------------------------------ */
const CLIPS = {
  dashboard: {
    route: '/dashboard',
    async run(page, d) {
      await d.until(4.6);                                      // "This is your dashboard"
      await d.moveTo(360, 300, 900);                           // "money at a glance"
      await d.until(9.0);
      await d.moveToText('Total Projects Value', 700);         // "Total Projects Value..."
      await d.until(13.2);
      await d.moveToText('Received Amount', 750);              // "...Received Amount"
      await d.until(17.4);
      await d.moveToText('Outstanding Balance', 750);          // "Outstanding Balance..."
      await d.until(21.4);
      await d.moveToText('Scheduled Balance', 750);            // "...Scheduled Balance"
      await d.until(25.5);
      await d.scrollTo(560, 1300);                             // "below the tiles..."
      await d.until(30.3);
      const ok = await d.moveToEl('table tbody tr', 900);      // "click any project"
      await d.until(33.4);
      if (ok) await d.click();
      await d.until(37.4);                                     // ~1.6s tail after the audio
    },
  },
  ch02: {
    route: '/dashboard',
    async run(page, d) {
      await d.until(2.98);
      await d.moveToText('Dashboard', 500);
      await d.until(5.14);
      await d.moveToText('Customers', 500);
      await d.until(7.30);
      await d.moveToText('Projects', 500);
      await d.until(9.78);
      await d.moveToText('Invoices', 450);
      await d.until(11.66);
      await d.moveToText('Accounts Receivable', 450);
      await d.until(13.55);
      await d.moveToText('Payments', 400);
      await d.until(15.43);
      await d.moveToText('Jobs', 400);
      await d.until(17.32);
      await d.moveToText('Contractors', 400);
      await d.until(19.20);
      await d.moveToText('Suppliers', 400);
      await d.until(21.09);
      await d.moveToText('Accounts Payable', 400);
      await d.until(23.33);
      const ok = await d.moveToEl('[aria-expanded] svg.lucide-chevron-right', 500);
      await d.until(24.3);
      if (ok) await d.click();
      await d.until(27.3);
      await d.moveToText('Harborview Property Group', 700);
      await d.until(34.68);
      await d.moveToText('Estimates', 600);
      await d.until(37.07);
      await d.moveToText('Time Tracking', 500);
      await d.until(39.9);
      await d.moveToText('Help', 500);
      await d.until(45.8);
    },
  },
  ch03: {
    route: '/settings?tab=system',
    async run(page, d) {
      await d.until(2.0);
      await d.moveToEl(':is(h1,h2,h3,h4,div):has-text("Company Details")', 600);
      await d.until(6.0);
      await d.moveToEl('#companyName', 600);
      await d.until(10.02);
      await d.moveToEl('#companyAddress', 500);
      await d.until(11.28);
      await d.moveToEl('#companyCity', 450);
      await d.until(12.55);
      await d.moveToEl('#companyState', 400);
      await d.until(13.82);
      await d.moveToEl('#companyZip', 400);
      await d.until(16.67);
      await d.moveToEl('#companyPhone', 500);
      await d.until(18.59);
      await d.moveToEl('#companyTaxId', 550);
      await d.until(21.41);
      await d.moveToEl('#companyLicense', 500);
      await d.until(24.23);
      await d.moveToEl('#companyLicenseExpires', 450);
      await d.until(27.40);
      const logoBtn = await d.moveToEl(':is(button,label):has(input[type="file"]), button:has-text("Upload"), button:has-text("Logo")', 700);
      if (logoBtn) await d.click();
      await d.until(33.14);
      await d.scrollTo(900, 700);
      await d.moveToEl('button:has-text("Save")', 500);
      await d.until(45.0);
    },
  },
  ch04: {
    route: '/settings?tab=user',
    async run(page, d) {
      await d.until(1.5);
      await d.moveToEl('h3:has-text("Signature")', 700);
      await d.until(4.0);
      await d.moveToEl('img[alt="Saved signature"]', 700);
      await d.until(10.93);
      await d.moveToEl('button:has-text("Edit signature")', 600);
      await d.until(18.42);
      await d.moveToEl('img[alt="Saved initials"]', 600);
      await d.until(24.46);
      await d.scrollTo(360, 700);
      await d.moveToEl('h3:has-text("Email Signature")', 500);
      await d.until(30.35);
      await d.moveToEl('h3:has-text("Change Password")', 600);
      await d.until(36.3);
    },
  },
  ch05: {
    route: '/price-list',
    async run(page, d) {
      await d.until(1.5);
      await d.moveToEl('h1', 600);
      await d.until(3.5);
      await d.moveToText('Standard 2026', 600);
      await d.click();
      await d.until(6.5);
      await d.scrollTo(300, 700);
      const addLine = await d.moveToEl('button:has-text("Add Line Item")', 500);
      if (addLine) { await d.click(); await d.until(8.0); await d.press('Escape'); }
      await d.until(9.0);
      const row = await d.moveToText('Wall framing — 2x6 exterior, 16" on center (per LF)', 700);
      if (row) await d.click();
      await d.until(18.24);
      await d.moveToText('Harborview Contract Rates', 600);
      await d.until(20.5);
      const copyBtn = await d.moveToEl('button:has-text("Copy prices")', 500);
      if (copyBtn) { await d.click(); await d.until(23.5); await d.press('Escape'); }
      await d.until(25.21);
      await d.scrollTo(950, 700);
      const asm = await d.moveToText('Multifamily podium package', 600);
      if (asm) await d.click();
      await d.until(34.62);
      const impBtn = await d.moveToEl('button:has-text("Import CSV")', 500);
      if (impBtn) { await d.click(); await d.until(37.5); await d.press('Escape'); }
      await d.until(39.5);
    },
  },
  ch06: {
    route: '/dashboard',
    async run(page, d) {
      await d.until(3.2);
      await d.moveTo(400, 260, 700);
      await d.until(5.19);
      await d.moveToText('Total Projects Value', 700);
      await d.until(9.51);
      await d.moveToText('Outstanding Balance', 650);
      await d.until(13.61);
      await d.moveToText('Scheduled Balance', 650);
      await d.until(24.05);
      await d.moveToText('Received Amount', 650);
      await d.until(27.69);
      await d.moveToText('Total Jobs & Materials', 700);
      await d.until(31.5);
      await d.moveToText('Outstanding Jobs & Materials', 650);
      await d.until(36.09);
      await d.scrollTo(520, 900);
      await d.until(38.5);
      await d.scrollTo(1050, 900);
      const projRow = await d.moveToEl('table tbody tr', 600);
      if (projRow) await d.click();
      await d.until(44.5);
    },
  },
  ch07: {
    route: '/projects',
    async run(page, d) {
      await d.until(2.0);
      await d.moveToEl('h2', 600);
      await d.until(4.93);
      await d.moveToEl('table tbody tr:first-child', 700);
      await d.until(9.0);
      await d.moveToText('Total', 500);
      await d.until(11.0);
      await d.moveToText('Balance', 450);
      await d.until(15.51);
      await d.moveToEl('tfoot tr', 700);
      await d.until(19.55);
      await d.moveToEl('#show-inactive', 550);
      await d.click();
      await d.until(25.19);
      await d.moveToText('Projects', 600);
      await d.until(31.93);
      await d.moveToEl('#show-inactive', 500);
      await d.click();
      await d.until(39.3);
    },
  },
  ch08: {
    route: '/projects',
    async run(page, d) {
      await d.until(2.0);
      let gotRow = await d.moveToText('Harborview — Camarillo St 12-Unit', 700);
      if (!gotRow) gotRow = await d.moveToEl('table tbody tr:first-child', 700);
      if (gotRow) { await d.click(); await d.until(6.5); }
      await d.moveTo(720, 220, 800);
      await d.until(10.57);
      await d.moveToText('Project Details', 700);
      await d.until(13.44);
      await d.scrollTo(520, 900);
      await d.until(16.0);
      await d.moveToText('Invoices', 700);
      await d.until(18.0);
      await d.scrollTo(1150, 900);
      await d.until(19.98);
      await d.moveToText('Payment Schedule', 700);
      await d.until(24.0);
      await d.scrollTo(1950, 900);
      await d.until(27.0);
      await d.moveToText('Jobs', 600);
      await d.until(29.0);
      await d.moveToText('Materials', 600);
      await d.until(33.14);
      await d.scrollTo(2900, 900);
      await d.until(36.26);
      await d.moveToText('Project Documents', 700);
      await d.until(48.7);
    },
  },
  ch09: {
    route: '/projects',
    async run(page, d) {
      await d.until(1.0);
      const row = await d.moveToEl('table tbody tr:first-child', 600);
      if (row) { await d.click(); await d.until(2.5); }
      await d.scrollTo(1150, 700);
      await d.until(3.5);
      const addInv = await d.moveToEl('button:has-text("Add Invoice")', 600);
      if (addInv) { await d.click(); }
      await d.until(4.43);
      await d.moveToEl('input[placeholder^="e.g. Plans"]', 600);
      await d.click();
      await d.type('Podium framing — Levels 1 to 3');
      await d.until(10.93);
      await d.moveToEl('input[placeholder="Auto-assigned if blank"]', 500);
      await d.until(15.43);
      const addAsm = await d.moveToEl('button:has-text("Add Assembly")', 600);
      if (addAsm) { await d.click(); await d.until(17.0);
        await d.moveToText('Multifamily podium package', 500); await d.click(); }
      await d.until(25.86);
      await d.scrollTo(420, 600);
      await d.until(28.52);
      await d.scrollTo(880, 600);
      await d.until(34.66);
      const reqSig = await d.moveToEl('#require_signature', 500);
      if (reqSig) await d.click();
      await d.until(40.41);
      await d.moveToEl('button:has-text("Cancel")', 500);
      await d.until(41.5);
      await d.press('Escape');
      await d.until(45.0);
    },
  },
  ch10: {
    route: '/invoices',
    async run(page, d) {
      await d.until(1.0);
      await d.moveToEl('h2', 600);
      await d.until(3.23);
      const row = await d.moveToEl('tbody tr:first-child', 700);
      if (row) { await d.click(); }
      await d.until(8.0);
      await d.moveTo(1080, 320, 800);
      await d.until(12.33);
      const sig = await d.moveToEl(':is(h2,h3,h4):has-text("Signees")', 700);
      if (!sig) await d.scrollTo(1400, 700);
      await d.until(18.17);
      const addSignee = await d.moveToEl('button:has-text("Add signee")', 550);
      if (addSignee) await d.click();
      await d.moveToEl('input[placeholder="Full name"]', 500);
      if (addSignee) { await d.click(); await d.type('Jen Okafor'); }
      await d.until(27.47);
      await d.scrollTo(1900, 600);
      await d.until(33.03);
      const reqBox = await d.moveToText('Require signature', 600);
      if (reqBox) await d.click();
      await d.until(38.0);
      await d.press('Escape');
      await d.until(41.6);
    },
  },
  ch11: {
    route: '/invoices',
    async run(page, d) {
      await d.until(1.0);
      await d.moveToEl('h2', 600);
      await d.until(2.99);
      const newInv = await d.moveToEl('button:has-text("New Invoice")', 600);
      if (newInv) { await d.click(); await d.until(5.5); await d.press('Escape'); }
      await d.until(9.94);
      const statusBtn = await d.moveToEl('button:has-text("All statuses")', 600);
      if (statusBtn) { await d.click(); await d.until(12.5); await d.press('Escape'); }
      await d.until(19.39);
      const sigBtn = await d.moveToEl('button:has-text("All signature statuses")', 650);
      if (sigBtn) { await d.click(); await d.until(22.5); await d.press('Escape'); }
      await d.until(25.68);
      const r1 = await d.moveToText('Awaiting Signees', 700);
      if (r1) await d.click();
      await d.until(27.5);
      await d.press('Escape');
      await d.until(29.67);
      const r2 = await d.moveToText('Fully Executed', 650);
      if (r2) await d.click();
      await d.until(32.5);
      await d.press('Escape');
      await d.until(34.9);
    },
  },
  ch12: {
    route: '/invoices',
    async run(page, d) {
      await d.until(1.0);
      const fe1 = await d.moveToText('Fully Executed', 700);
      if (fe1) { await d.click(); await d.until(4.5); await d.press('Escape'); }
      await d.until(11.79);
      await d.moveToEl('h2', 500);
      await d.until(15.23);
      await d.moveToText('Awaiting Signees', 800);
      await d.until(17.95);
      const docBtn = await d.moveToEl('tbody tr:first-child button[title*="Documents" i]', 600);
      if (docBtn) { await d.click(); await d.until(21.0); await d.press('Escape'); }
      await d.until(28.79);
      await d.moveToText('Fully Executed', 700);
      await d.until(36.49);
      await d.moveToText('Signed outside system', 700);
      await d.until(43.0);
    },
  },
  ch13: {
    route: '/projects',
    async run(page, d) {
      await d.until(1.0);
      let row = await d.moveToText('Harborview — Camarillo St 12-Unit', 600);
      if (!row) row = await d.moveToEl('table tbody tr:first-child', 600);
      if (row) { await d.click(); await d.until(2.5); }
      await d.scrollTo(1150, 700);
      await d.until(3.75);
      await d.moveToText('Payment Schedule', 700);
      await d.until(7.5);
      const payBtn = await d.moveToEl('tr:has-text("Deposit") button[title*="payment" i], tr:first-child button[title*="payment" i]', 700);
      if (payBtn) { await d.click(); await d.until(13.0); await d.press('Escape'); }
      await d.until(16.1);
      await d.moveTo(720, 220, 700);
      await d.until(21.21);
      await d.moveTo(400, 260, 700);
      // cut
      await page.goto(page.url().split('/projects')[0] + '/accounts-receivable', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1200);
      await d.ensure();
      await d.until(30.52);
      await d.moveToText('Received Amount', 700);
      await d.until(38.57);
      await d.moveToText('0-30 Days', 600);
      await d.until(44.7);
    },
  },
  ch14: {
    route: '/projects',
    async run(page, d) {
      await d.until(1.0);
      const row = await d.moveToEl('table tbody tr:first-child', 600);
      if (row) { await d.click(); await d.until(2.5); }
      await d.scrollTo(1950, 700);
      await d.until(4.0);
      await d.moveToText('Jobs', 700);
      await d.until(6.0);
      const addJob = await d.moveToEl('button:has-text("Add Job")', 650);
      if (addJob) { await d.click(); await d.until(8.0);
        const nameField = await d.moveToEl('input[placeholder*="e.g." i]', 500);
        if (nameField) { await d.click(); await d.type('Crane and rigging — podium beam set'); } }
      await d.until(11.66);
      const contractorSel = await d.moveToEl('button[role="combobox"], [role="combobox"]', 600);
      if (contractorSel) await d.click();
      await d.until(13.5);
      if (contractorSel) await d.press('Escape');
      await d.until(14.93);
      const totalField = await d.moveToEl('input[type="number"]', 500);
      if (totalField) { await d.click(); await d.type('23900'); }
      await d.until(23.02);
      await d.moveToEl('button:has-text("Cancel")', 500);
      await d.press('Escape');
      await d.until(24.5);
      await d.moveToText('Contractors', 600);
      await d.until(28.5);
      await d.moveToText('Accounts Payable', 600);
      await d.until(33.9);
    },
  },
  ch15: {
    route: '/projects',
    async run(page, d) {
      await d.until(1.0);
      const row = await d.moveToEl('table tbody tr:first-child', 600);
      if (row) { await d.click(); await d.until(2.5); }
      await d.scrollTo(1950, 700);
      await d.until(4.74);
      await d.moveToText('Materials', 700);
      await d.until(6.5);
      const addMat = await d.moveToEl('button:has-text("Add")', 650);
      if (addMat) { await d.click(); await d.until(9.0);
        const invField = await d.moveToEl('input[placeholder*="invoice" i], input[name*="invoice" i]', 500);
        if (invField) { await d.click(); await d.type('M-90941'); }
        await d.until(12.5);
        const subtotalField = await d.moveToEl('input[type="number"]', 500);
        if (subtotalField) { await d.click(); await d.type('31400'); } }
      await d.until(15.29);
      await d.press('Escape');
      await d.until(22.22);
      await d.moveToText('Labor', 700);
      await d.until(28.92);
      await d.scrollTo(2200, 700);
      await d.until(36.7);
    },
  },
  ch16: {
    route: '/projects',
    async run(page, d) {
      await d.until(1.0);
      let row = await d.moveToText('Harborview — Camarillo St 12-Unit', 600);
      if (!row) row = await d.moveToEl('table tbody tr:first-child', 600);
      if (row) { await d.click(); await d.until(2.5); }
      await d.moveTo(720, 220, 700);
      await d.until(5.48);
      await d.moveToText('Project Value', 700);
      await d.until(13.25);
      await d.moveToText('Cash Position', 700);
      await d.until(26.26);
      await d.moveToText('Overall Margin', 700);
      await d.until(40.37);
      await d.moveToText('Cash Profit to Date', 700);
      await d.until(49.21);
      await d.scrollTo(560, 800);
      await d.until(55.5);
    },
  },
  ch17: {
    route: '/invoices',
    async run(page, d) {
      await d.until(1.5);
      await d.moveToEl('h2', 600);
      await d.until(8.29);
      await d.moveToEl('button:has-text("All projects")', 600);
      await d.until(12.0);
      await d.moveToText('All statuses', 550);
      await d.until(15.0);
      await d.moveToText('All signature statuses', 600);
      await d.until(19.86);
      await d.moveToText('Awaiting Signees', 700);
      await d.until(24.0);
      await d.moveToText('Fully Executed', 650);
      await d.until(27.93);
      await d.moveToEl('button:has-text("New Invoice")', 700);
      await d.until(29.5);
      await d.press('Escape');
      await d.until(38.8);
    },
  },
  ch18: {
    route: '/accounts-receivable',
    async run(page, d) {
      await d.until(1.5);
      await d.moveToEl('h1', 600);
      await d.until(3.68);
      await d.moveToText('Outstanding Amount', 600);
      await d.until(6.5);
      await d.moveToText('Requested Amount', 500);
      await d.until(8.7);
      await d.moveToText('Received Amount', 500);
      await d.until(11.96);
      await d.moveToText('Aging (unpaid)', 700);
      await d.until(14.3);
      await d.moveToText('0-30 Days', 500);
      await d.until(15.8);
      await d.moveToText('31-60 Days', 450);
      await d.until(17.3);
      await d.moveToText('61-90 Days', 450);
      await d.until(18.98);
      await d.moveToText('91-120 Days', 450);
      await d.until(20.5);
      await d.moveToText('120+ Days', 450);
      await d.until(36.17);
      await d.scrollTo(560, 800);
      await d.until(39.5);
      const reqPay = await d.moveToEl('tbody tr:first-child button[title="Request payment"]', 600);
      if (reqPay) { await d.click(); await d.until(42.0); await d.press('Escape'); }
      await d.until(43.45);
      const agingBtn = await d.moveToEl('button:has-text("Aging")', 550);
      if (agingBtn) await d.click();
      await d.until(49.9);
    },
  },
  ch19: {
    route: '/payments',
    async run(page, d) {
      await d.until(1.5);
      await d.moveToEl('h2', 600);
      await d.until(5.34);
      await d.moveToEl('[role="tablist"] > button:nth-child(1)', 550);
      await d.until(9.70);
      await d.moveToEl('[role="tablist"] > button:nth-child(2)', 650);
      await d.click();
      await d.until(13.28);
      await d.moveToText('Method', 500);
      await d.until(16.5);
      await d.moveToText('Check #', 450);
      await d.until(22.63);
      await d.moveToEl('button:has-text("All Contractors")', 550);
      await d.until(34.04);
      await d.moveToEl('button:has-text("Download CSV")', 600);
      await d.until(42.9);
    },
  },
  ch20: {
    route: '/jobs',
    async run(page, d) {
      await d.until(1.5);
      await d.moveToEl('h2', 600);
      await d.until(6.83);
      await d.moveToText('Contractor', 550);
      await d.until(9.5);
      await d.moveToText('Total', 400);
      await d.until(11.0);
      await d.moveToText('Scheduled', 400);
      await d.until(12.5);
      await d.moveToText('Paid', 400);
      await d.until(14.0);
      await d.moveToText('Balance', 400);
      await d.until(17.51);
      const addJobBtn = await d.moveToEl('button:has-text("Add Job")', 600);
      if (addJobBtn) { await d.click(); await d.until(20.0); await d.press('Escape'); }
      await d.until(21.5);
      const impBtn = await d.moveToEl('button:has-text("Import")', 550);
      if (impBtn) { await d.click(); await d.until(24.0); await d.press('Escape'); }
      await d.until(25.17);
      const jobRow = await d.moveToEl('table tbody tr:first-child', 600);
      if (jobRow) await d.click();
      await d.until(39.4);
    },
  },
  ch21: {
    route: '/contractors',
    async run(page, d) {
      await d.until(1.5);
      await d.moveToEl('h2', 600);
      await d.until(4.90);
      await d.moveToText('Trades', 500);
      await d.until(7.0);
      await d.moveToText('Balance', 500);
      await d.until(16.17);
      const r = await d.moveToEl('table tbody tr:first-child', 700);
      if (r) { await d.click(); await d.until(18.5); }
      await d.moveToText('Total Payments', 600);
      await d.until(20.5);
      await d.moveToText('Current Balance', 500);
      await d.until(22.5);
      await d.moveToText('# of Projects', 500);
      await d.until(25.99);
      await d.scrollTo(400, 700);
      await d.until(34.6);
    },
  },
  ch22: {
    route: '/suppliers',
    async run(page, d) {
      await d.until(1.5);
      await d.moveToEl('h2', 600);
      await d.until(4.11);
      const r = await d.moveToEl('table tbody tr:first-child', 700);
      if (r) { await d.click(); await d.until(6.0); }
      await d.until(11.64);
      await d.scrollTo(320, 700);
      await d.until(23.20);
      await d.until(31.7);
    },
  },
  ch23: {
    route: '/accounts-payable',
    async run(page, d) {
      await d.until(1.5);
      await d.moveToEl('h1', 600);
      await d.until(3.48);
      await d.moveToText('Outstanding Amount', 550);
      await d.until(6.5);
      await d.moveToText('Requested Amount', 450);
      await d.until(8.5);
      await d.moveToText('Scheduled Amount', 450);
      await d.until(10.5);
      await d.moveToText('Completed Amount', 450);
      await d.until(14.5);
      await d.moveToText('Not Yet Requested', 550);
      await d.until(20.53);
      await d.moveToText('0-30 Days', 500);
      await d.until(22.5);
      await d.moveToText('31-60 Days', 400);
      await d.until(24.5);
      await d.moveToText('61-90 Days', 400);
      await d.until(26.0);
      await d.moveToText('120+ Days', 450);
      await d.until(35.05);
      await d.scrollTo(640, 800);
      await d.until(38.0);
      const arow = await d.moveToEl('table tbody tr:first-child', 600);
      if (arow) await d.click();
      await d.until(40.0);
      await d.moveToEl('button[title="Approve & Schedule"]', 600);
      await d.until(45.9);
    },
  },
  ch24: {
    route: '/estimates/sent',
    async run(page, d) {
      await d.until(1.5);
      await d.moveToEl('h2', 600);
      await d.until(3.99);
      await d.moveToEl('table tbody tr:nth-child(1)', 700);
      await d.until(11.00);
      await d.moveToEl('table tbody tr:nth-child(2)', 650);
      await d.until(21.37);
      await d.moveToEl('table tbody tr:last-child', 650);
      await d.until(24.5);
      await d.moveToEl('tbody tr:last-child button[aria-haspopup="menu"]', 600);
      await d.until(27.5);
      await d.press('Escape');
      await d.until(29.15);
      await d.moveToEl('button:has-text("New Estimate")', 600);
      await d.until(36.7);
    },
  },
  ch25: {
    route: '/estimates/requests',
    async run(page, d) {
      await d.until(1.5);
      await d.moveToEl('h2', 600);
      await d.until(5.73);
      await d.moveToText('Crane and rigging — Culver podium beam set', 700);
      await d.until(10.5);
      await d.moveToText('Recipients', 500);
      await d.until(12.0);
      await d.moveToText('Opened', 450);
      await d.until(13.2);
      await d.moveToText('Responded', 450);
      await d.until(14.35);
      const vrow = await d.moveToText('Vendors', 500);
      if (vrow) await d.click();
      await d.until(25.41);
      const sendBtn = await d.moveToEl('button:has-text("Send Estimate Request")', 650);
      if (sendBtn) { await d.click(); await d.until(28.0); await d.press('Escape'); }
      await d.until(29.74);
      const vendBtn = await d.moveToEl('button:has-text("Vendor")', 500);
      if (vendBtn) await d.click();
      await d.until(36.5);
    },
  },
  ch26: {
    route: '/bids',
    async run(page, d) {
      await d.until(1.5);
      await d.moveToEl('h2', 600);
      await d.until(6.36);
      await d.moveToEl('table tbody tr:first-child', 700);
      await d.until(11.5);
      await d.moveToText('Winner', 500);
      await d.until(16.70);
      await d.moveToEl('tbody tr:nth-child(1) input[type="checkbox"]', 550);
      await d.click();
      await d.until(18.5);
      await d.moveToEl('tbody tr:nth-child(2) input[type="checkbox"]', 450);
      await d.click();
      await d.until(20.0);
      await d.moveToEl('button:has-text("Compare Selected")', 600);
      await d.until(21.5);
      await d.click();
      await d.until(22.34);
      await d.press('Escape');
      await d.moveToEl('button:has-text("Add Estimate")', 600);
      await d.until(31.1);
    },
  },
  ch27: {
    route: '/time-tracking',
    async run(page, d) {
      await d.until(1.5);
      await d.moveToEl('h1', 600);
      await d.until(5.28);
      await d.moveToEl('h3:has-text("Clock in")', 700);
      await d.until(13.17);
      await d.moveToEl('input[placeholder="Search project name"]', 600);
      await d.until(16.0);
      await d.moveToEl('button[role="combobox"]', 600);
      await d.until(17.5);
      await d.press('Escape');
      await d.until(18.54);
      await page.goto(page.url().split('/time-tracking')[0] + '/time-tracking/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1200);
      await d.ensure();
      await d.until(21.0);
      await d.moveToText('Employee', 550);
      await d.until(23.0);
      await d.moveToText('Hours', 450);
      await d.until(24.5);
      await d.moveToText('Total cost', 500);
      await d.until(34.2);
    },
  },
  ch28: {
    route: '/emails',
    async run(page, d) {
      await d.until(1.5);
      await d.moveToEl('h2', 600);
      await d.until(6.10);
      await d.moveToText('Sent', 500);
      await d.until(9.0);
      await d.moveToText('Recipient', 500);
      await d.until(11.0);
      await d.moveToText('Status', 400);
      await d.until(12.5);
      await d.moveToText('Opened', 400);
      await d.until(14.0);
      await d.moveToText('Clicked', 400);
      await d.until(18.0);
      const viewBtn = await d.moveToEl('tbody tr:first-child button[title="View email details"]', 650);
      if (viewBtn) { await d.click(); await d.until(21.0); await d.press('Escape'); }
      await d.until(23.38);
      await d.moveToText('Received', 550);
      await d.click();
      await d.until(35.8);
    },
  },
  ch29: {
    route: '/settings',
    async run(page, d) {
      await d.until(1.5);
      await d.moveToEl('h1', 600);
      await d.until(3.0);
      await d.moveTo(720, 150, 700);
      await d.until(4.51);
      await d.moveToText('Users', 550);
      await d.click();
      await d.until(11.38);
      await d.moveToText('Document Statuses', 600);
      await d.click();
      await d.until(19.93);
      await d.moveToText('Trades', 550);
      await d.click();
      await d.until(23.93);
      await d.moveToText('Document Templates', 600);
      await d.click();
      await d.until(34.7);
    },
  },
  ch30: {
    route: '/help',
    async run(page, d) {
      await d.until(1.5);
      await d.moveToEl('input[placeholder*="earch"]', 650);
      await d.click();
      await d.type('aging');
      await d.until(9.0);
      await d.moveToEl('[data-toc-item]', 600);
      await d.until(9.5);
      await d.click();
      await d.until(12.04);
      await d.scrollTo(500, 800);
      await d.until(22.55);
      await d.moveToEl('button:has-text("Ask")', 600);
      await d.until(26.0);
      await d.moveToText('Help', 550);
      await d.until(30.8);
    },
  },
  hl2: {
    route: '/invoices',
    async run(page, d) {
      await d.until(1.0);
      const row = await d.moveToEl('tbody tr:first-child', 700);
      if (row) await d.click();
      await d.until(4.0);
      await d.moveTo(1080, 320, 900);
      await d.until(8.0);
      const sig = await d.moveToEl(':is(h2,h3,h4):has-text("Signees")', 700);
      if (!sig) await d.scrollTo(1400, 700);
      await d.until(12.0);
      await d.moveToText('Require signature', 700);
      await d.until(15.0);
      await d.press('Escape');
      await d.until(17.0);
      const feRow = await d.moveToText('Fully Executed', 700);
      if (feRow) await d.click();
      await d.until(20.0);
      const docBtn = await d.moveToEl('button[title*="Documents" i]', 600);
      if (docBtn) await d.click();
      await d.until(23.7);
    },
  },
  hl3: {
    route: '/time-tracking',
    async run(page, d) {
      await d.until(1.0);
      await d.moveToEl('h3:has-text("Clock in")', 700);
      await d.until(4.0);
      await d.moveToEl('input[placeholder="Search project name"]', 600);
      await d.until(7.0);
      const combo = await d.moveToEl('button[role="combobox"]', 600);
      if (combo) await d.click();
      await d.until(9.5);
      await d.press('Escape');
      await d.until(11.0);
      await page.goto(page.url().split('/time-tracking')[0] + '/time-tracking/dashboard', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      await d.ensure();
      await d.until(14.0);
      await d.moveTo(720, 400, 900);
      await d.until(18.0);
      await d.scrollTo(300, 800);
      await d.until(22.9);
    },
  },
  hl4: {
    route: '/estimates/requests',
    async run(page, d) {
      await d.until(1.0);
      const row = await d.moveToText('Crane and rigging — Culver podium beam set', 750);
      if (row) await d.click();
      await d.until(4.5);
      await d.press('Escape');
      await d.moveToText('Recipients', 550);
      await d.until(7.0);
      await d.moveToText('Responded', 500);
      await d.until(9.5);
      await page.goto(page.url().split('/estimates')[0] + '/bids', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      await d.ensure();
      await d.until(12.5);
      const brow = await d.moveToEl('table tbody tr:first-child', 700);
      if (brow) await d.click();
      await d.until(16.0);
      await d.moveToText('Winner', 700);
      await d.until(20.1);
    },
  },
  hl5: {
    route: '/price-list',
    async run(page, d) {
      await d.until(1.0);
      await d.moveToEl('h1', 600);
      await d.until(3.0);
      await d.scrollTo(300, 700);
      await d.until(6.0);
      await d.moveToText('Wall framing — 2x6 exterior, 16" on center (per LF)', 700);
      await d.until(9.0);
      await page.goto(page.url().split('/price-list')[0] + '/suppliers', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      await d.ensure();
      await d.until(11.5);
      const srow = await d.moveToEl('table tbody tr:first-child', 700);
      if (srow) await d.click();
      await d.until(15.0);
      await d.scrollTo(320, 700);
      await d.until(18.0);
      const irow = await d.moveToEl('tbody tr:first-child', 600);
      if (irow) await d.click();
      await d.until(20.1);
    },
  },
  hl6: {
    route: '/customers',
    async run(page, d) {
      await d.until(1.0);
      const crow = await d.moveToEl('table tbody tr:first-child', 700);
      if (crow) await d.click();
      await d.until(4.5);
      await d.scrollTo(300, 800);
      await d.until(7.5);
      await page.goto(page.url().split('/customers')[0] + '/contractors', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);
      await d.ensure();
      await d.until(10.5);
      const trow = await d.moveToEl('table tbody tr:first-child', 700);
      if (trow) await d.click();
      await d.until(13.7);
    },
  },
  hl7: {
    route: '/projects',
    async run(page, d) {
      await d.until(1.0);
      let prow = await d.moveToText('Harborview — Camarillo St 12-Unit', 700);
      if (!prow) prow = await d.moveToEl('table tbody tr:first-child', 700);
      if (prow) await d.click();
      await d.until(4.0);
      await d.moveTo(720, 220, 900);
      await d.until(7.5);
      await d.moveToText('Project Value', 800);
      await d.until(11.5);
      await d.moveToText('Cash Position', 800);
      await d.until(15.5);
      await d.moveToText('Overall Margin', 800);
      await d.until(19.5);
      await d.moveToText('Cash Profit to Date', 800);
      await d.until(23.0);
    },
  },
};

/* ---------- main ---------------------------------------------------------- */
const spec = CLIPS[CLIP];
if (!spec) { console.error('unknown clip: ' + CLIP); process.exit(1); }
fs.mkdirSync(OUTDIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const recStart = Date.now();      // video recording starts with the context
const ctx = await browser.newContext({
  viewport: { width: W, height: H },
  deviceScaleFactor: 1,
  storageState: AUTH,
  recordVideo: { dir: OUTDIR, size: { width: W, height: H } },
});

await ctx.addInitScript(CHROME_JS);   // applies on every navigation
const page = await ctx.newPage();
console.error(`→ ${APP}${spec.route}`);
await page.goto(APP + spec.route, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(4500);                 // let the SPA hydrate and data land

const who = await page.evaluate(() => document.body.innerText.slice(0, 400));
console.error('company/context check: ' + who.replace(/\s+/g, ' ').slice(0, 160));

const d = makeDriver(page);
await d.ensure();
const t0 = d.reset();
const leadIn = (t0 - recStart) / 1000;   // blank/loading head to trim off
await spec.run(page, d);
const timelineSec = (Date.now() - t0) / 1000;
console.error(`lead-in ${leadIn.toFixed(2)}s, timeline ${timelineSec.toFixed(2)}s`);

await ctx.close();
await browser.close();

const vids = fs.readdirSync(OUTDIR).filter((f) => f.endsWith('.webm'))
  .map((f) => ({ f, t: fs.statSync(path.join(OUTDIR, f)).mtimeMs }))
  .sort((a, b) => b.t - a.t);
const src = path.join(OUTDIR, vids[0].f);
const dst = path.join(OUTDIR, `${CLIP}.webm`);
fs.renameSync(src, dst);
const meta = { clip: CLIP, file: dst, bytes: fs.statSync(dst).size,
               leadIn: Number(leadIn.toFixed(3)), timelineSec: Number(timelineSec.toFixed(3)) };
fs.writeFileSync(path.join(OUTDIR, `${CLIP}.json`), JSON.stringify(meta, null, 1));
console.log(JSON.stringify(meta));
