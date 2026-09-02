import path from 'node:path';
import { chromium } from 'playwright';
const b = await chromium.launch({ headless: true });
const c = await b.newContext({ viewport:{width:1440,height:900}, storageState: path.join(import.meta.dirname,'auth.json') });
const p = await c.newPage();
await p.goto('https://kablanet.com/dashboard', { waitUntil:'domcontentloaded' });
await p.waitForTimeout(6000);
console.log(JSON.stringify(await p.evaluate(() => {
  const out = { platformNodes: [], switcher: null, sidebarAttrs: [] };
  document.querySelectorAll('*').forEach(e => {
    const t = e.childElementCount === 0 ? (e.textContent||'').trim() : '';
    if (t === 'Platform Admin' || t === 'Platform') {
      let anc = e, chain = [];
      for (let i=0; i<6 && anc; i++) {
        chain.push(anc.tagName + (anc.dataset.sidebar ? `[data-sidebar=${anc.dataset.sidebar}]` : '') + (anc.className && typeof anc.className==='string' ? '.'+anc.className.split(' ').slice(0,2).join('.') : ''));
        anc = anc.parentElement;
      }
      out.platformNodes.push({ text: t, chain });
    }
  });
  const sw = [...document.querySelectorAll('button')].find(b => (b.innerText||'').includes('Summit Crest'));
  if (sw) out.switcher = { tag: sw.tagName, ds: sw.dataset.sidebar||null, cls: (sw.className||'').slice(0,80), parentDs: sw.parentElement?.dataset?.sidebar||null };
  document.querySelectorAll('[data-sidebar]').forEach(e => out.sidebarAttrs.push(e.dataset.sidebar));
  out.sidebarAttrs = [...new Set(out.sidebarAttrs)];
  return out;
}), null, 1));
await b.close();
