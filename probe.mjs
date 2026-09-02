import path from 'node:path';
import { chromium } from 'playwright';
const AUTH = path.join(import.meta.dirname, 'auth.json');
const route = process.argv[2] || '/dashboard';
const b = await chromium.launch({ headless: true });
const c = await b.newContext({ viewport:{width:1440,height:900}, storageState: AUTH });
const p = await c.newPage();
await p.goto('https://kablanet.com' + route, { waitUntil:'domcontentloaded' });
await p.waitForTimeout(6000);
const out = await p.evaluate(() => {
  const res = { title: document.title, h1: [], cards: [], tables: [], buttons: [] };
  document.querySelectorAll('h1,h2').forEach(e => res.h1.push(e.innerText.trim().slice(0,60)));
  // any element whose text looks like a KPI label
  document.querySelectorAll('div,span,p').forEach(e => {
    const t = (e.childElementCount === 0 ? e.textContent : '').trim();
    if (t && /^(Total|Received|Outstanding|Scheduled)\b/.test(t) && t.length < 46) {
      const r = e.getBoundingClientRect();
      if (r.width > 10) res.cards.push({ t, x: Math.round(r.x+r.width/2), y: Math.round(r.y+r.height/2) });
    }
  });
  document.querySelectorAll('table').forEach(t => {
    const r = t.getBoundingClientRect();
    res.tables.push({ rows: t.querySelectorAll('tbody tr').length, y: Math.round(r.y), h: Math.round(r.height) });
  });
  document.querySelectorAll('button').forEach(e => { const t=e.innerText.trim(); if(t&&t.length<28) res.buttons.push(t); });
  res.scrollH = document.documentElement.scrollHeight;
  return res;
});
console.log(JSON.stringify(out, null, 1).slice(0, 2600));
await b.close();
