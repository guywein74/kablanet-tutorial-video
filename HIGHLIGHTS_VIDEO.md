# Kablanet — 2:30 Highlights Video

**Owner:** CMO
**Date:** September 1, 2026
**Audience:** Los Angeles specialty trade subcontractors — framing, plumbing, electrical, roofing, glazing. Non-technical owner-operators.
**Voice:** Gemini TTS, Sulafat. 2.6 words/second.
**Budget:** 387 words / 148.9 seconds (2:29). Hard cap was 390.
**Guardrails:** inherits every "never say" from `TUTORIAL_NARRATIVE.md` §5. American English throughout.

**Source read:** local clone at `/Users/guyw/Desktop/Claude/Kablanet/kablanet-build-buddy` (no `git pull` available in this session — no Bash tool). Every citation below should be re-confirmed with Lovable `read_file` before the shoot. One briefing item already turned out to be stale; see Finding 0.

---

## 0. Correction to the briefing before anything else

> **Briefed as CRITICAL:** *"a document that requires a signature and is not fully signed contributes NOTHING to financial totals — `financialModel.ts:205` returns `'signature_pending'` from `valueExclusionReason`, badge reads 'Awaiting signature — excluded from financial totals'."*

**That is no longer true in the code.** The financial model was inverted at some point since that note was written:

- `financialModel.ts:147-171` — `valueExclusionReason` has a docblock that says, in terms: *"Document kind is irrelevant. **Signature state is irrelevant.** Only lifecycle death (deleted / declined / rejected / voided / cancelled) and an EXPLICIT supersession relationship remove a document's value."* It returns `deleted | declined | voided | superseded | relationship_credit` and never `signature_pending`.
- Signature state moved to a **recognition** exclusion: `financialModel.ts:182-196`, `sourceSignatureExclusion` → `source_unsigned | source_awaiting_countersign | source_awaiting_customer`. `isSignaturePending` is commented "Purely informational."
- The badge text is now `contractEligibility.ts:134-135`:

  ```
  'Signature pending — counted in Outstanding, not in Recognized Paid'
  ```

  and `valueExclusionLabel` (`contractEligibility.ts:142-159`) has **no** `signature_pending` case at all.

**Marketing consequence:** an unsigned invoice **does** count as money you are owed. What the missing signature blocks is recognizing a *payment* against it. This matches what I already wrote in `TUTORIAL_NARRATIVE.md` (line 207/212) and contradicts the briefing. Nothing in this script depends on it either way — I stayed off the topic entirely, because it takes two sentences to say correctly and this video does not have two spare sentences. But do not let anyone write "get it signed so it counts" into a future cut. It is backwards.

---

## 1. Claims ruling

| # | Claim in the draft | Verdict | Why | Replacement |
|---|---|---|---|---|
| 1 | "the only platform on the market that gives you a complete view of your operations at all times" | **CUT** | Unfalsifiable superiority claim about products we have not audited, in the first 15 seconds, to an audience that has been lied to by software salesmen before. It is also the weakest possible version of a strong idea: "complete view" is what every competitor says. The defensible claim is not that we are the only one — it is *what specifically is on the page*. | Replaced structurally: the video ends on the four project cards and says **"Nobody assembled that. It's the paperwork you already have to do, subtracted."** A specific mechanism beats a superlative. |
| 2 | "Stop payroll leaks" | **CUT the phrase, KEEP the idea — and the real thing is better** | Kablanet is not payroll software. No tax withholding, no filings, no paychecks — grep for payroll/W-2/1099 across `src/` returns zero real hits. Saying "payroll" invites a buyer to ask "does it run my payroll?", and the answer is no. **But the underlying capability is stronger than the draft knew.** `laborCost.ts:1-203` is a full labor cost model — regular, daily OT, weekly OT, monthly OT, each with its own rate, lunch deducted once per worked day. And `TimeTrackingDashboardPage.tsx:320-361` drops **two pins per employee**: `'clocked'` (the project they say they're on) and `'current'` (the device GPS on the entry), legended on screen at lines 451-459 as "Clocked location (project)" and "Current location (device)". That discrepancy *is* the leak, shown rather than claimed. | **"The map shows who's on the clock, and where the phone actually was."** |
| 3 | "lock down digital signatures instantly" | **CUT "instantly"** | The flow is: `send-contract-signature-invite` → email → signee opens on their own time → `contract-signee-get-pdf-url` → they sign → `contract-signee-upload-signed-pdf` → you `contractor-countersign` → `send-contract-signed-email`. The product ships a **reminder feature** (`useSigningReminder.ts`, `SignatureReminderSection.tsx`) whose entire reason for existing is that signees do not sign instantly. Claiming "instant" is contradicted by our own UI. The honest replacement is *stronger*, because `generateSignatureAuditTrailPdf.ts:26-62` classifies SENT / VIEWED / SIGNED / COUNTER-SIGNED / DECLINED with timestamp, name, email and **IP address** — you can prove they opened it. | **"You counter-sign, both signatures flatten into one PDF, and the app logs who opened it, when, and from what IP."** |
| 3b | "No more waiting around for paperwork to clear before you can break ground" | **CUT** | Same fault, worse: it promises a *schedule* outcome that depends entirely on how fast the customer taps a link. We control the sending, not the signing. | No replacement. The audit-trail line already carries the beat. |
| 4 | "integrated incoming and outgoing price lists" | **KEEP the structure, FIX the naming — the real feature is better than the draft** | Two genuinely different things, both real. **Outgoing:** `PriceListPage.tsx` → `PriceListsTab.tsx:26-32` = price lists + scopes (line item library) + scope sets (assemblies), priced per list, with a company default. **Incoming:** `VendorPriceListSection.tsx:31-35` and `useVendorPriceList.ts:37-42` — a price list per supplier or contractor, **maintained automatically by database triggers whenever an invoice, quote/estimate or bid is saved**, carrying `current_price`, `min_price`, `max_price`, `points_count`, `last_seen_at` and a full history dialog. You do not type it. | **"Two price lists. Yours is the scopes you sell, at the price you normally charge. The other builds itself..."** |
| 4b | "Update your rates instantly to match the current market" | **CUT** | Kablanet does not know the market. It knows *your* vendors' history. "Match the market" implies an external price feed we do not have. | **"...so you can see what your lumber yard charged you in March, and what they're charging now."** Same value, true. |
| 5 | "built-in client and subcontractor CRM" | **SPLIT — honest on the client side, inflated on the sub side** | **Customers: defensible.** `useCustomerActivities.ts` + `customerActivity.ts:3-9` gives logged activities typed Meeting / Phone Call / Text / Email, with `follow_up_date`, `follow_up_description` and `status`, surfaced as `CustomerActivitiesSection`, `CustomerFollowUpsSection` and `CustomerEmailsSection` (`CustomerDetailPane.tsx:35-38`). That is a call log with follow-ups — CRM-ish, fairly. **Contractors: not a CRM.** `ContractorDetailPane.tsx` sections are Details, Jobs, AP, Bids, Price List, Payment History, Documents, with hero stats Total Payments / Current Balance / # of Projects (lines 676-678). No activity log, no follow-ups. Calling it a CRM invites a demo question we lose. | Describe both by what they hold, and never use the word CRM: **"Open a customer and you get every call, text and meeting you logged, and the date you said you'd follow up. Open a sub: what you owe them, every bid they've sent, what they've charged you before."** |
| 6 | "Win more profitable commercial and residential bids" | **CUT** | An outcome claim about revenue we have zero measured customers to support. It is also the exact register — promised wins, no mechanism — that makes this audience stop listening. | **"Then you quote your customer off real numbers."** We can prove the inputs; we cannot promise the win. |
| 7 | "guessing where your crew is" (intro) + "Track your field crew across job sites with precise GPS time tracking" | **CUT — this is the most dangerous line in the draft** | It describes continuous location tracking. Kablanet does not do that. `TimeTrackingClockPage.tsx:133-177` records `clock_in_lat/lng` at clock-in and `clock_out_lat/lng` at clock-out. Nothing in between. The map plots those stored points (`TimeTrackingDashboardPage.tsx:354-355`), not a live feed. Selling continuous tracking to a contractor who then can't find it is a refund and a review. Also: the "nearby projects" list is a **suggestion**, not a geofence — `NEARBY_KM = 1` at line 30 filters the *suggested* list; a user can still pick any project or none (`NO_PROJECT`, line 140). Do not say "they can't clock in from home." They can. | **"The app offers the projects closest to them"** + **"where the phone actually was."** |
| 8 | "Keep all your incoming estimates and outgoing proposals neatly organized in one digital hub" | **FIX — accurate but limp** | Real: `EstimateRequestsPage.tsx` (requests out to subs, with `opened_count` / `responded_count` columns, lines 43-50), `EstimateReplyPage.tsx` (they reply via link, no account), `SentEstimatesPage.tsx`, and `BidsPage.tsx` where bids compare side by side with a winner row (`is_winner`, `WINNER_CLASS`, lines 40-58). "Neatly organized in one digital hub" is filing-cabinet language for a thing that actually sends, tracks opens, and compares. | **"Write it once, pick who gets it, attach the plans, send... the bids come back in one list you read side by side."** |
| 9 | "right at your fingertips" | **CUT** | Explicitly on the banned-vocabulary list in `TUTORIAL_NARRATIVE.md:333`. | — |
| 10 | "Everything you need runs under one roof... one powerful dashboard" | **CUT** | "All-in-one" and "powerful" are both banned (same line). Worse, it makes the *dashboard* the payoff. The payoff is the four numbers on a project — that is the one thing on screen a competitor at this price cannot show. | Replaced by beat 7 in full. |
| 11 | "Grow your contracting business today." | **CUT** | Empty CTA, asks for nothing specific, and "grow your business" is what every SaaS ad says at second 148. | **"Don't migrate. Put one live job in Kablanet and compare that number to what you thought that job was making."** The smallest commitment that produces the realization. |
| 12 | Draft implies signing is contracts-only | **EXPAND — free credibility** | `useSigningReminder.ts:6-11` states the signing family is "main contracts, change orders, invoices, estimates." Confirmed on the entry point: "Require Signature (opens signing editor after save)" at `ContractDialog.tsx:314-330`. Saying "any invoice or contract" costs two words and closes the most common objection ("does it do my invoices, or just contracts?"). | **"Check Require Signature on any invoice or contract..."** |

---

## 2. The intro

**48 words · 18.5 seconds · 0:00–0:18**

> You know what the job was worth. The number on the contract.
> Ask what it left you, and you're waiting on the last supplier invoice — sometimes months after the crew rolled off.
> That gap isn't a bookkeeping problem. It's why you underbid the next one.
> Kablanet closes it.

**Why this hook.** It does not describe software for its first fourteen seconds. It states a question the viewer already asks himself and has never had answered, then names a consequence he has personally paid for — underbidding the next job. "It's why you underbid the next one" is the line that earns the remaining two minutes, because it reframes bookkeeping from a chore into the reason he is leaving money on the table. The last three words are the only sales in it.

**Delivery notes for Sulafat.** Flat, unhurried, peer-to-peer. Hard stop after "the contract." Do not lift on "Kablanet closes it" — land it dry. No music swell under the intro; music enters at 0:18.

---

## 3. Full narration script

Total **387 words / 148.9 s (2:29)**. Word counts are exact; timecodes assume 2.6 w/s with no pauses budgeted, so build in ~1s of air between beats by trimming the last beat if the edit runs long.

---

**BEAT 1 — The gap** · 48 words · **0:00–0:18**

> You know what the job was worth. The number on the contract. Ask what it left you, and you're waiting on the last supplier invoice — sometimes months after the crew rolled off. That gap isn't a bookkeeping problem. It's why you underbid the next one. Kablanet closes it.

---

**BEAT 2 — Signing** · 55 words · **0:18–0:39**

> Check Require Signature on any invoice or contract and the signing editor opens — place the signature box right on the page. Your customer taps the emailed link and signs in their browser. No account, no app. You counter-sign, both signatures flatten into one PDF, and the app logs who opened it, when, and from what IP.

---

**BEAT 3 — Time and labor** · 55 words · **0:39–1:00**

> Your crew clocks in from a phone. The app offers the projects closest to them, so hours land on the right job, not reconstructed Friday. Set each person's rate — regular, overtime, lunch deducted — and those hours become labor cost on that job. The map shows who's on the clock, and where the phone actually was.

---

**BEAT 4 — Estimates** · 50 words · **1:00–1:19**

> Pricing a job means the same scope out to four subs. Write it once, pick who gets it, attach the plans, send. They reply through a link — no account needed — and the bids come back in one list you read side by side. Then you quote your customer off real numbers.

---

**BEAT 5 — Two price lists** · 50 words · **1:19–1:39**

> Two price lists. Yours is the scopes you sell, at the price you normally charge. The other builds itself: every invoice, quote and bid you save writes that vendor's price into their history. So you can see what your lumber yard charged you in March, and what they're charging now.

---

**BEAT 6 — The people** · 37 words · **1:39–1:53**

> Open a customer and you get every call, text and meeting you logged, and the date you said you'd follow up. Open a sub: what you owe them, every bid they've sent, what they've charged you before.

---

**BEAT 7 — The payoff** · 54 words · **1:53–2:14**

> All of it lands on the same project. Four numbers across the top: what the job is worth, what's come in, your margin, and cash profit to date. Nobody assembled that. It's the paperwork you already have to do, subtracted. Which means it's true today — while there's still a change order left to price.

---

**BEAT 8 — Close** · 38 words · **2:14–2:29**

> It's only as true as what you put in — that part is real work. So don't migrate. Put one live job in Kablanet and compare that number to what you thought that job was making. Kablanet dot com.

**On beat 8's first sentence.** Do not let anyone cut it. Admitting the input cost, out loud, ten seconds from the CTA, is what makes the previous 140 seconds believable to a man who has been sold "effortless" four times. It converts better than the version without it.

---

## 4. Shot list

### The verdict on your prior: you're right, and I'd tighten it further

Live-action for the open and close only. Real screens for every feature beat. Three reasons, in order of how much money they save:

1. **Every feature beat has a genuinely photogenic real screen.** Even the one the draft assumed we'd have to fake. The draft's "map of Los Angeles with GPS tracking pins" exists — `TimeTrackingDashboardPage.tsx` renders a react-leaflet map with two-color pins, a legend, a fullscreen toggle, and a header reading *"Employee locations — N on the clock, M mapped"* (line 441). It is better-looking than anything Veo would give us for that beat.
2. **A generated shot of a UI is a fabricated product claim.** If Veo renders "a clean price list interface" (the draft's shot 4), we have put a screen on the internet that does not exist. That is the single fastest way to lose this audience, and it is a legal exposure, not just a taste one.
3. **Cost.** Three Veo shots at 8s = 24 seconds of generated footage carrying 149 seconds of video. The other 125 seconds cost us screen-recording time.

**The one place I'd push back on you:** beat 3's clock-in should be shot on a **real phone in a real hand at a real job site** — an iPhone screen recording of `/time/clock` composited into iPhone-shot handheld footage, or simply filmed over the shoulder. That is not Veo and it is not a desktop screen recording; it is a third category, and it is the most credible ten seconds in the video because the viewer can see it is a phone his framer would actually hold. Cost: one afternoon, no Veo credits.

### Beat-by-beat

| Beat | Time | Source | What's on screen |
|---|---|---|---|
| 1 | 0:00–0:08 | **VEO — Shot A** | LA job site, contractor at the tailgate with loose paperwork |
| 1 | 0:08–0:16 | **VEO — Shot B** | Same site, framed structure, contractor standing still, looking at it |
| 1 | 0:16–0:18 | **CARD** | Black card, Kablanet wordmark, no tagline. Lands under "Kablanet closes it." |
| 2 | 0:18–0:39 | **SCREEN** | Contract/invoice dialog → check **Require Signature** (`ContractDialog.tsx:314-330`) → signing editor, drag the signature box onto the page → cut to the signee's mobile browser signing → counter-sign → **hold on the audit trail PDF** (SENT / VIEWED / SIGNED / COUNTER-SIGNED with timestamps and IP). The audit trail is the money shot; give it 4 full seconds. |
| 3 | 0:39–0:55 | **PHONE (real device, not Veo)** | `/time/clock` on an iPhone held in a work glove on site. Nearby projects list populates, tap the top one, Clock In. |
| 3 | 0:55–1:00 | **SCREEN** | Time Tracking Dashboard, Map mode, fullscreen. Both pin colors visible with the legend. Header reads "N on the clock, M mapped." Cut precisely on "where the phone actually was." |
| 4 | 1:00–1:19 | **SCREEN** | Send Estimate Request dialog: subject, recipients, attach plans, Send → Estimate Requests table with Opened / Responded columns ticking → Bids page, side-by-side comparison, winner row highlighted green. |
| 5 | 1:19–1:29 | **SCREEN** | Price List page — lists, scopes, scope sets. |
| 5 | 1:29–1:39 | **SCREEN** | A supplier's detail pane → Price List section → open the **price history dialog** on one line item. The history chart is the proof for "charged you in March / charging now." |
| 6 | 1:39–1:47 | **SCREEN** | Customer detail pane → Activities + Follow-ups sections. |
| 6 | 1:47–1:53 | **SCREEN** | Contractor detail pane → Current Balance stat, Bids section, Price List section. |
| 7 | 1:53–2:14 | **SCREEN** | Project page. Slow, deliberate move across the four KPI cards, one per named number. Then pull back to show the invoice section and the jobs section on the same page. **No cursor movement on "Nobody assembled that."** |
| 8 | 2:14–2:22 | **VEO — Shot C** | Contractor in the truck door, phone in hand, end of day |
| 8 | 2:22–2:29 | **CARD** | Kablanet wordmark + `kablanet.com`. Static. |

### Veo prompts (8 seconds max each, three shots total)

All three are deliberately **text-free and logo-free** — Veo mangles text, and any signage it invents is a liability. No screens visible in any generated shot.

**Shot A — 0:00–0:08**
```
Handheld documentary shot, 35mm, early morning golden light, Los Angeles
residential remodel job site. A framing contractor in his late forties, dusty
Carhartt jacket and a faded cap, stands at the open tailgate of a white
pickup truck. Loose invoices and a torn manila folder are spread across the
tailgate. He picks up one crumpled invoice, looks at it for a beat, sets it
back down, and looks off toward the house. Real dust in the air, shallow
depth of field, natural sound. No text, no signage, no logos, no screens,
no on-screen graphics.
```

**Shot B — 0:08–0:16**
```
Slow push-in, handheld documentary, late afternoon. Los Angeles residential
job site. Wide shot of a newly framed second story, bare studs against a
hazy warm sky, a crew packing tools into a truck in the background. The same
framing contractor stands motionless in the foreground, hands on hips,
looking up at the house. Warm low sun, long shadows, shallow depth of field.
No text, no signage, no logos, no screens, no on-screen graphics.
```

**Shot C — 2:14–2:22**
```
Handheld, golden hour, Los Angeles job site driveway. A framing contractor in
his late forties sits sideways in the open driver's door of his pickup truck,
one boot on the ground, relaxed, half-smiling, tools and lumber loaded behind
him. A second work truck pulls away in the background. Warm natural backlight,
dust in the air, shallow depth of field, documentary style. No text, no
signage, no logos, no screens, no on-screen graphics.
```

**If budget forces a cut:** drop Shot B and hold Shot A longer with a slow digital push. The intro survives on one live-action shot. Do **not** cut Shot C — the video needs a human face at the CTA or the close reads as a product demo that stopped.

### Music and mix

The draft's "upbeat, relaxed acoustic guitar" is the wrong cue for this script. Upbeat undercuts a hook whose whole job is to name a loss. Use a **sparse, mid-tempo instrumental that enters at 0:18** (after "Kablanet closes it"), stays under the voice, and lifts only once — at 1:53, into the payoff beat. Silence under the first eighteen seconds. That silence is the most persuasive production choice in the piece.

---

## 5. What we are not saying

Cut, and to stay cut. Anyone reintroducing a line from this list needs a file:line that supports it.

### Cut from this draft

| Killed line | Why it can't come back |
|---|---|
| "the only platform on the market" | Unverifiable competitor claim. No superlatives about competitors, ever, in narration. |
| "Stop payroll leaks" | Kablanet is not payroll software. No withholding, no filings, no paychecks. |
| "lock down digital signatures instantly" | An email goes to a human who signs on their own schedule. We ship a reminder feature because of it. |
| "No more waiting around for paperwork to clear before you can break ground" | Promises a schedule outcome controlled by the customer, not by us. |
| "Track your field crew across job sites with precise GPS" | **No continuous tracking exists.** Coordinates are captured at clock-in and clock-out only. |
| "guessing where your crew is" | Same. Implies a live feed. |
| "Update your rates instantly to match the current market" | No market price feed. Vendor history only. |
| "built-in client and subcontractor CRM" | Customers have activities and follow-ups. Contractors do not. "CRM" fails on the sub side. |
| "Win more profitable commercial and residential bids" | Revenue outcome claim with zero measured customers. |
| "neatly organized in one digital hub" | Filing-cabinet language for a feature that sends, tracks opens and compares. Undersells and sounds generic. |
| "right at your fingertips" | Banned vocabulary (`TUTORIAL_NARRATIVE.md:333`). |
| "Everything you need runs under one roof" / "one powerful dashboard" | Banned ("all-in-one", "powerful"), and it puts the payoff on the wrong screen. |
| "Grow your contracting business today" | Empty CTA. Replaced with a specific, small, testable action. |

### Still banned, inherited from `TUTORIAL_NARRATIVE.md` §5

Job costing · WIP · budget vs. actual · P&L report · retainage · "syncs with QuickBooks" · "pay your subs from Kablanet" or anything implying payment rails (Kablanet **records** payments, it does not move money) · "powered by AI" as a headline · "legally binding signatures" · "bank-grade security" · "instant access / sign up and you're in" (signup passes an approval gate) · "your customer sees everything" (the portal is read-only and your costs are not in it) · "hours automatically become cost" (only once a rate is set) · "nothing is ever entered twice" as an absolute · any invented time or money saving · any social proof, count or logo · any competitor name · seamless, streamline, revolutionize, effortless, intuitive, powerful, robust, all-in-one, game-changer, unlock, empower, at your fingertips, single source of truth · exclamation marks.

### Two new entries earned by this script

| Never say | Why | Say instead |
|---|---|---|
| "They can't clock in from home" / "geofenced clock-in" | `NEARBY_KM = 1` (`TimeTrackingClockPage.tsx:30`) filters a **suggestion list**. Nothing blocks picking a distant project or no project at all (`NO_PROJECT`, line 140). It is proximity-aware, not proximity-enforced. | "The app offers the projects closest to them" — and, for the honest edge: "if the phone was somewhere else, you can see that." |
| "Get it signed so it counts toward your numbers" | Backwards as of the current model. Signature state does not affect a document's value (`financialModel.ts:150`); it gates *recognized paid*. | Stay off it in a 2:30 video. If forced: "an invoice is money owed from the moment you save it — the signature is what lets you mark it paid." |

### One thing to verify before the shoot

Re-read `financialModel.ts:147-196` and `contractEligibility.ts:130-159` via Lovable MCP against the live project, not this clone. The briefing and the clone disagree, and the clone may itself be behind. Nothing in the script above depends on the answer — that was deliberate — but the *manual*, the homepage, and the tutorial all may.
