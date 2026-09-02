#!/usr/bin/env node
/**
 * One-time login capture. Opens a real Chromium window at the login page and
 * watches until you're signed in, then saves the browser session to auth.json
 * and closes itself. Nothing to type in the terminal.
 *
 * Your password goes into that browser window and nowhere else — it is never
 * read, stored, or transmitted by this script.
 *
 *   node capture-login.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const OUT = path.join(import.meta.dirname, 'auth.json');
const APP = process.argv.find((s) => s.startsWith('--app='))?.split('=')[1] || 'https://kablanet.com';
const WANT = 'summit crest';
const TIMEOUT_MS = 10 * 60 * 1000;
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

const browser = await chromium.launch({ headless: false, args: ['--window-size=1460,980'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(APP + '/login');

log('browser open at ' + APP + '/login — sign in, then switch the company picker to Summit Crest Builders');

const started = Date.now();
let sawAuth = false, sawCompany = false;

async function probe() {
  try {
    const state = await page.evaluate(() => {
      let token = null;
      try {
        for (const k of Object.keys(localStorage)) {
          if (k.startsWith('sb-') && k.endsWith('-auth-token')) { token = k; break; }
        }
      } catch (e) { /* ignore */ }
      const side = document.querySelector('[data-sidebar="header"]')
        || document.querySelector('aside') || document.body;
      return {
        token: !!token,
        path: location.pathname,
        side: (side.innerText || '').slice(0, 300).replace(/\s+/g, ' '),
      };
    });
    return state;
  } catch (e) { return null; }
}

while (Date.now() - started < TIMEOUT_MS) {
  await new Promise((r) => setTimeout(r, 2000));
  const s = await probe();
  if (!s) continue;

  if (s.token && s.path !== '/login' && !sawAuth) {
    sawAuth = true;
    log('signed in — now on ' + s.path);
  }
  if (!sawAuth) continue;

  const onSummit = s.side.toLowerCase().includes(WANT);
  if (onSummit && !sawCompany) {
    sawCompany = true;
    log('company is Summit Crest Builders');
  }

  // Save once we're authenticated AND on the right company; after 60s of being
  // signed in, save anyway and report whichever company is active.
  const waitedEnough = sawAuth && Date.now() - started > 60_000;
  if (sawCompany || waitedEnough) {
    await ctx.storageState({ path: OUT });
    const company = (s.side.match(/[A-Z][A-Za-z&'. -]{2,40}/) || ['unknown'])[0];
    log('saved ' + OUT);
    log('active company looks like: ' + company + (onSummit ? '  ✓' : '  (not Summit Crest)'));
    await browser.close();
    console.log(JSON.stringify({ ok: true, summitCrest: onSummit, path: s.path }));
    process.exit(0);
  }
}

log('timed out after 10 minutes without a sign-in');
await browser.close();
process.exit(3);
