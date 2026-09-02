# Handoff — Kablanet tutorial videos

Written 2026-09-02. Everything below is verified, not assumed. Start here and do
**not** re-derive any of it — the previous session cost $102 largely by doing so.

## Cost discipline (read first)

- **Do not spawn subagents.** All remaining work is mechanical. Four agents ran last
  session and were the single biggest cost.
- Keep replies short. Output bills ~5× input.
- Batch tool calls. Don't re-read large files you've already seen.

---

## Goal

A narrated video tutorial of Kablanet for **subcontractors**, plus a 2–3 min
highlights video. 30 chapters, ~30–40s each, real screen recordings with a visible
cursor and Gemini TTS narration.

## The three source documents (already written — read, don't rewrite)

| File | What it is |
|---|---|
| `TUTORIAL_SPEC.md` | 1,292 lines. §1 chapters, §2 seed spec, §4 per-chapter action scripts (cue → primitive → exact target). **This is the shooting script.** |
| `TUTORIAL_NARRATIVE.md` | Narrative spine, chapter order, script critique |
| `HIGHLIGHTS_VIDEO.md` | The 2–3 min highlights script, claims ruling, Veo shot list |

Working directory for all tooling:
`/private/tmp/claude-502/-Users-guyw-Desktop-Claude-Kablanet/7dd7d844-08bb-4581-9c96-fe943f40bf48/scratchpad`

> ⚠️ That is a **session scratchpad** and may be cleaned up. First action in the new
> session: copy it somewhere permanent, e.g. `~/Desktop/Claude/Kablanet/tutorial/`,
> and update the paths below.

---

## Recording environment — DONE, don't redo

**Summit Crest Builders** `30af2057-ec23-466e-9d76-ef7ec25d4deb` is wiped and reseeded.

- `contractual_mode = 'invoices'` — sidebar shows **Invoices**, no "Contracts & COs"
- 7 customers · 9 projects · 13 invoices · 19 schedule rows · 16 AR payments
- 7 contractors · 6 suppliers · 7 jobs ($23,291.68) · 4 material invoices ($31,339.16)
- Dashboard reads: Value $776,250 · Received $387,825 · Outstanding $388,425
- **All five AR aging buckets populated** (69,800 / 29,600 / 61,500 / 18,100 / 21,125)
- Invoice **1039 is deliberately unsigned** → its $164,750 is excluded from all totals.
  That is the teaching case for the signature rule. Don't "fix" it.

Pre-wipe backup + tested rollback SQL: `backups/summit-crest-20260902T033117Z/`

**Never touch Lux Builders** `8956a389-53ee-47a0-80d7-56136aff51bb` — real customer data.

---

## Pipelines — all working

### 1. Voice — `tts.py`
```
python3 tts.py vo/<name> Sulafat gemini-3.1-flash-tts-preview vo/<name>.txt
```
Voice **Sulafat**, model `gemini-3.1-flash-tts-preview`, auto 1.10× speed-up.
Key at `~/.config/gemini/key` (600). Narration runs **2.6 words/sec** → ~90 words
per 35s clip. Cost is trivial (~$0.15 for everything so far).

For cursor sync, generate **per-beat** (5–6 short files), then concatenate with
350ms gaps — that yields exact cue times. See `vo/beats/` and `vo/timeline.json`.

### 2. Recording — `record.mjs`
```
node record.mjs --clip=<name>
```
- Local Playwright, headless, 1440×900, against **https://kablanet.com**
- Session from `auth.json` (captured via `capture-login.mjs`; re-run if it expires)
- Draws a **synthetic cursor** (Playwright records no OS pointer) + click ripple
- **Hides the Platform Admin group and company switcher** via an init script —
  the recording account is a platform admin; subs never see those
- Emits `clips/<name>.json` with `leadIn` (blank/loading head) and `timelineSec`
- **Strict mode is on**: a missed target throws instead of silently drifting

Primitives available in a clip timeline:
`until(sec)` `moveTo(x,y,ms)` `moveToText('exact leaf text',ms)` `moveToEl(cssSel,ms)`
`click()` `scrollTo(y,ms)` `hold(ms)` `type(text)` `press(key)` `replace(text)`

**Add a chapter** = add an entry to the `CLIPS` object with `route` + a `run()` that
follows §4 of the spec, driving off `d.until(<cue time>)`.

Two gotchas that cost hours last time:
- `moveToText` matches **leaf elements with exact text only** — it fails on headers
  with nested count badges, icon buttons and card titles. Use `moveToEl` with
  Playwright `:has-text()` there.
- **The app does not scroll the window.** `document.documentElement.scrollHeight`
  equals the viewport; content is in an inner overflow container. `scrollTo` already
  finds it — don't replace it with `window.scrollTo`.

### 3. Mux — `mux.sh`
```
./mux.sh <clip> vo/<clip>_final.wav
```
Trims the recording lead-in, rescales PTS to correct Playwright's capture drift
(~0.6%), muxes to `final/<clip>.mp4`. **Both corrections are essential** — without
them audio and cursor drift apart by ~6s.

Verify sync by extracting a frame at a cue time and looking at it:
`ffmpeg -ss 12 -i final/x.mp4 -frames:v 1 qa/f.png`

### 4. Veo (highlights bookends only) — `veo.mjs`
```
node veo.mjs --name=open1 --tier=fast --secs=8 --file=shots/open1.txt
```
Tiers 720p: lite $0.05/s · **fast $0.10/s (chosen)** · standard $0.40/s.
~40s per 8s clip. Veo returns its own audio track. Decision: **live-action for the
open and close only; real screen recordings for all six feature beats.**

---

## Published pages (same URLs on republish)

- Welcome page for the 10 subs — `https://claude.ai/code/artifact/40badd2f-82c4-4c7b-a4c7-96d25bc7a356`
- Screen tour, 29 clip slots — `https://claude.ai/code/artifact/75ec8c31-274d-4624-92c1-819b3d246537`

Tour page is **generated**: edit `pages.json` / `flow.json`, then
`python3 build_tour.py`, then publish `kablanet-tour.html` to the same URL.
Fill video slots by creating `clips.json` mapping `{id: {url, poster, duration}}`.

---

## Verified product facts — do NOT re-derive

- **Signature gate.** A document with `require_signature` that is not fully signed
  **contributes nothing to any total** — `financialModel.ts:205` returns
  `signature_pending`; badge reads *"Awaiting signature — excluded from financial
  totals"*. The doc-comment at `contractValue.ts:52` says the opposite and is
  **stale** — it misled two agents and me. Trust the function.
- **Signatures work on invoices**, not just contracts. `Require Signature` checkbox
  at `ContractDialog.tsx:315`, hint "opens signing editor after save".
- **GPS is punch-only.** `clock_in_lat` / `clock_out_lat` via `getCurrentPosition`,
  not `watchPosition`. `NEARBY_KM = 1` filters a *suggestion list* and blocks
  nothing. Never say "geofenced" or "track your crew across job sites".
- **Time Tracking Dashboard drops two pins per employee** — `'clocked'` (claimed
  project) vs `'current'` (device GPS). That discrepancy is the sellable feature.
- **Project KPI cards** — `Project Value`, `Cash Position`, `Overall Margin`,
  `Cash Profit to Date` at `ProjectDetailPage.tsx:1953–2008`. This is where the
  product's whole argument renders. There must be a chapter on it.
- `contracts.number` is a **generated column** — cannot be inserted.
- There is **no "ACH Transfer"** payment method; it's **Direct Deposit**.
- The **default price list cannot be archived** (trigger).

## Demo PDFs — `~/Downloads/_Kablanet/Fake data/`

21 files. **Only 5 are safe to show on camera** (Contract_1 + all 4 Materials —
they name Summit Crest). **11 name Lux Builders**, 2 name Sagira LLC. The seeded
records already carry these documents' real figures; the files themselves were
deliberately **not** uploaded.

---

## Status as of 2026-09-02 (updated)

**All 30 chapters + the highlights video are DONE.** `final/*.mp4` (dashboard, ch02–ch30,
highlights.mp4) are complete and were sent to the user directly as files. Do not re-shoot
unless a specific defect is reported.

**Scope was cut mid-session — see memory `feedback_tutorial_no_live_mutation.md` and
`feedback_tutorial_needs_real_interaction.md` for the durable rules.** Short version:
chapters 9–15 do NOT perform real mutating actions (no Save/Send/Sign, no data written to
P4) — they open dialogs, click tabs/filters/rows, and type into fields, then Cancel/Escape
before the final submit. No snapshot/restore was needed, no real email was sent, no live
signing token flow was used. Chapters 24–26 (Sent/Received Estimates, Estimate Requests)
show **empty lists** — Summit Crest currently has zero seeded estimates, contradicting the
old seed-state notes above. The user said to leave those three as-is; don't re-seed unless
asked.

**One real bug found and fixed:** the naive "click the first project row" pattern lands on
**Brightline — Culver Mixed-Use Podium**, which is all $0.00 (not P4-the-intentionally-empty-
project — this is a *different*, unexpectedly-empty project that happens to sort first).
ch08, ch13, ch16, and the highlights' payoff beat were all fixed to target
**"Harborview — Camarillo St 12-Unit"** by name instead, which has real numbers
(~$397,750 project value). If you add more chapters that click into "a project," don't
blind-click the first row — target Harborview — Camarillo St 12-Unit.

## What's left

1. **Tour page (`kablanet-tour.html` / `clips.json`).** The Artifact platform's `assets`
   capability is **not available on this account** (confirmed via the artifact-capabilities
   skill — only artifact/db/downloads/mcp/room/sample/self are listed). So the 30 clips
   cannot be hosted as Artifact assets. The user chose to receive the files directly instead
   of publishing the tour page. If they later get real hosting (S3, a CDN, etc.), fill
   `clips.json` with `{id: {url, poster?, duration?}}` per the id list in `pages.json`/
   `flow.json` (see mapping notes below), then `python3 build_tour.py` and republish.
2. Chapter → tour-id mapping used mentally this session (not yet written to clips.json):
   dashboard→(superseded by ch06) · setup-company→ch03 · setup-signature→ch04 ·
   setup-price-list & price-list→ch05 · projects→ch07 · project-detail→ch08 ·
   invoices→ch17 · accounts-receivable→ch18 · payments→ch19 · customers→**not recorded**
   (Ch7a was skipped as optional) · contractors→ch21 · suppliers→ch22 · jobs→ch20 ·
   accounts-payable→ch23 · estimates-sent→ch24 · estimates-received→ch26 ·
   estimate-requests→ch25 · time-tracking→ch27 · emails→ch28 · settings→ch29 · help→ch30 ·
   flow-1..7→ch09,ch10,ch11,ch12,ch13,ch14,ch15/ch16 (flow-7 only has one slot; ch16 is the
   better fit, ch15 is uncovered by a flow-id but still exists as a file).
3. No "Customers" tutorial chapter exists (Ch7a was marked optional in the spec and skipped
   for time). Add one if the tour page ships.

## Known flaw

**Scheduled Balance reads $0.00** on the Dashboard while the narration describes it.
Either seed requested-but-not-due AR payments so the tile has a number, or cut that
clause from the Chapter 6 script.
