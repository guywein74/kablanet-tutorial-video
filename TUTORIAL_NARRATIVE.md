# Kablanet Video Tutorial — Narrative Spine and Positioning

**Owner:** CMO
**Date:** September 1, 2026
**Scope:** the story, the order, and the writing. Chapter inventory and demo-data spec are the PM's.
**Inputs reviewed:** `pages.json` (22 screen chapters), `flow.json` (7-step worked example), `docs/PRODUCT_DESCRIPTION.md`, `docs/MARKETING_MATERIALS_PLAN.md` §6 claims guardrails, `marketing/homepage-copy.md`, the Aug 8 / Aug 24 / Aug 30 Lovable plans for the project KPI row, time tracking and estimate requests.

---

## 0. What the drafts already get right

Before the criticism: the drafts are better than most product tours. They are written in sentences, not bullet points. They resist feature-listing more often than not. Three lines in `pages.json` and `flow.json` are the best writing in the whole project and should survive into the final cut:

- "That is what makes the cost side of a project honest, and it is the difference between knowing a job was profitable and hoping it was." (suppliers)
- "the more of them you record, the truer every profit number in the app becomes" (jobs) — honest about the input cost, which buys trust for everything else
- "you did not calculate it, assemble a spreadsheet, or wait for month end" (flow-7)

Everything below is aimed at making the other 26 clips as good as those three lines.

---

## 1. The spine

### The proposed claim, tested

> *"Both sides of a job live on the same project, so the app can tell a contractor what a job actually left them without a spreadsheet or month-end."*

**It survives, and the product backs it.** The project page carries four KPI cards — Project Value, Cash Position, Overall Margin, Cash Profit to Date — computed by one shared helper from contracts/invoices on one side and jobs, material invoices, miscellaneous and labor on the other. That is a real, on-screen, verifiable asset, and no competitor at this price point puts it on the same page as the change-order signing flow.

**But the wording is wrong in two ways, and both matter.**

*First, "what a job left me" is past tense.* It is the accountant's question, asked after the crew has gone. It is also the question every accounting package claims to answer eventually. The persuasive version of the claim is temporal, not architectural: the number is available **while you can still act on it** — while there is another change order to price, another sub to negotiate, another draw to pull forward. "One page" is a feature. "Before it is too late" is a reason to buy.

*Second, "without a spreadsheet" undersells the mechanism.* The reason the number exists is not that Kablanet is good at arithmetic. It is that the margin is a **by-product of paperwork the contractor is legally and commercially obliged to do anyway** — bill the customer, commit the sub, log the supplier invoice, record the payment. Nobody runs a report. Nobody maintains a job-cost sheet. The number falls out of the work. That is the argument that survives a skeptical contractor asking "yeah, but who's going to type all that in?"

### The spine, in one sentence

> **Every dollar you bill and every dollar you commit lands on the same project, so what the job is making is a by-product of the paperwork you already have to do — and you can see it while the job is still running, not after it.**

### The two movements of the argument

The whole tutorial is one argument in two moves, and every clip belongs to one of them:

1. **You have to do this paperwork anyway.** Invoices, signatures, sub agreements, supplier bills, payment records. Kablanet's version of each is faster and better-evidenced than paper, email and DocuSign — that is the *entry* price of the argument, not the argument.
2. **Because you did it here, once, the number exists.** Single entry is the mechanism; the margin on the project page is the payoff. This is the *only* place the tutorial should raise its voice.

The trust thread — no-login signing, the customer portal, the emails log, the audit trail — is **evidence, not the spine**. It is how a small shop looks like a big one. Keep it subordinate; it wins the argument for the prospect who already believes movement 2.

### Guardrail baked into the spine

The spine must be spoken as **the four cards on the project page**, never as "reports", "job costing", "WIP" or "P&L". There is no standalone P&L report page, retainage is not modeled, and budget-vs-actual does not exist. Say "the number on the project", never "the report".

---

## 2. Chapter order

### The structural problem with the drafts

`flow.json`'s intro says: *"The tour above covers each screen on its own."* That puts the 22-screen tour first and the worked example last. **That order is backwards for both audiences.**

- A prospect will not watch 22 screen tours to reach the payoff. They will give this video 3 to 5 minutes. If the argument has not landed by minute five, it never lands.
- A new customer being onboarded does not know what any screen is *for* until they have seen the whole loop once. The tour teaches better after the story than before it.

The existing group order compounds this. The video currently opens on **Setting up** — three clips, roughly 100 seconds, of company address, signature capture and price-list entry, before anything of value has happened. That is the worst possible opening for a video that has to persuade as well as teach.

### Recommended running order (29 clips)

| # | Clip | Block | Job of this clip |
|---|------|-------|------------------|
| 1 | **The hook** | Cold open | State the question the video answers. No UI tour. |
| 2 | Raise the invoice | **Act 1 — One job, start to finish** | Everything starts on a project, not in a vacuum |
| 3 | Send it to be signed | | Place the signature box on the page itself |
| 4 | They sign, you counter-sign *(merge flow-3 + flow-4)* | | The visceral moment: signed on a phone, no account |
| 5 | The money arrives | | One entry, four screens move |
| 6 | Give part of the work to a sub | | **The hinge** — the second side of the ledger opens |
| 7 | Materials and hours | | The cost side completes |
| 8 | **What the job made** *(new clip)* | | **The payoff** — read the four cards out loud |
| 9 | Dashboard | **Act 2 — Money in** | Zoom out: one job becomes every job |
| 10 | Projects | | |
| 11 | Inside a project | | The map of the page (layout, not numbers — see note) |
| 12 | Invoices | | |
| 13 | Accounts Receivable | | |
| 14 | Jobs | **Act 3 — Money out** | |
| 15 | Suppliers / material invoices | | |
| 16 | Time tracking | | Labor is the third cost bucket, not a bonus feature |
| 17 | Accounts Payable | | |
| 18 | Payments | | Both directions in one ledger — the "no double entry" proof |
| 19 | Customers | **Act 4 — The people** | Address book with balances attached |
| 20 | Contractors | | |
| 21 | Estimate Requests | **Act 5 — Before the job** | |
| 22 | Received Estimates | | |
| 23 | Sent Estimates | | |
| 24 | Company details and your team | **Act 6 — Make it yours** | |
| 25 | Your signature | | |
| 26 | Price list *(single clip, merged)* | | |
| 27 | Settings — the rest | | |
| 28 | Emails | **Act 7 — When something goes wrong** | |
| 29 | Help, and where to start | | Carries the closing 30 seconds |

Count reconciles to 29: 22 page chapters + 7 flow steps, **minus** the duplicate price-list chapter, **minus** one clip from merging flow-3 and flow-4, **plus** the hook, **plus** the new payoff clip.

### What opens

**A 30-second cold open that is not a screen tour.** It names the problem (you know what a job was worth; you don't know what it left you until months later), names the consequence (that's why you underprice the next one), and promises one worked job. It can run over B-roll of the dashboard or a project page — the visuals matter less than getting the question stated before any menu is clicked.

### What closes

**Not Help.** The draft ends on "Help is the full manual... we'd rather hear from you early", which is a service message and a soft landing. Help earns its place at clip 29, but the **last thirty seconds must restate the payoff and give one instruction**: put one live job in and compare the number to what you thought that job was making. One project, not a migration. That is the smallest possible commitment that produces the aha.

### The three clips that carry the persuasive weight

1. **Clip 8 — "What the job made."** The proof of the spine and the single most important thirty seconds in the video. It does not exist in the drafts; it must be built. Read the four card names, say one real dollar figure, then say the sentence that matters: *nobody assembled this*.
2. **Clip 4 — "They sign, you counter-sign."** The most visceral "I couldn't do this before" moment, and the cheapest belief to buy — the viewer watches a document get signed on a phone with no account. It is also the differentiator against the real competitor (QuickBooks + DocuSign + a printer).
3. **Clip 6 — "Give part of the work to a sub."** The hinge. Without this clip, clip 8 is unearned — the margin number only means something once the viewer has watched the cost side appear on the same page they were just billing from. Direct the cursor to *stay on the same project* here; the whole argument is carried by not navigating away.

Fourth, honorable mention: **clip 18, Payments.** It is where "you don't enter anything twice" stops being a claim and becomes something the viewer has now watched happen five times.

### Departures from the existing grouping, and why

| Change | Justification |
|---|---|
| **Worked example moves from last to first** (Acts 1 before the screen tour) | The prospect's attention budget is five minutes; the payoff cannot sit at minute fifteen. Onboarding customers also learn screens faster once they have seen the loop. Chapter markers let a day-one customer jump to Act 6. |
| **"Setting up" moves from first to Act 6** | Three clips of admin is the worst opening in video. Placed at the end, the same clips read as "now make it yours" — the viewer knows what the logo prints on and what the signature is for, because they watched both get used in Act 1. |
| **"Who you work with" is split** | Contractors and Suppliers were sitting between the money-in and money-out stories, breaking the argument in half. Suppliers moves into money-out because it is the only chapter that carries the material-cost story (there is no dedicated Materials chapter — see PM note). Customers and Contractors stay together as a short "address book with balances" block. |
| **Time Tracking moves out of "Everything else"** into money-out | Labor is the third cost bucket in the margin calculation. Filing it under "Everything else" tells the viewer it is optional, which directly undermines the spine. |
| **"Everything else" is retired as a name** | It signals "the stuff we couldn't place". Emails and Help become "when something goes wrong", which is a reason to watch. |
| **Estimates run Requests → Received → Sent, not Sent → Received → Requests** | The draft order is causally backwards. A contractor requests prices from subs, reads what comes back, and quotes the customer off those numbers. Teaching it in that order explains *why* the three pages exist; the draft order makes them look like three arbitrary lists. |
| **Price list appears once, not twice** | `setup-price-list` and `price-list` are near-duplicate scripts. Two clips on the same screen in one video costs credibility and wastes 35 seconds. |

### Two notes for the PM

- **Clip 11 must not repeat clip 8.** Clip 8 is about the *numbers* (the four cards, the payoff). Clip 11 is about the *layout* (where the invoice section is, where jobs are, where documents are). Write them as different jobs or the video sags at minute five.
- **If a Materials / material-invoice chapter exists in your inventory**, put it at slot 15 and move Suppliers up next to Contractors in Act 4. The Suppliers page is only carrying the materials story because nothing else does.

### One positioning decision the order depends on

The recording is being made with `contractual_mode = 'invoices'` on Summit Crest, which is right for the specialty-trade half of the audience — but that mode **hides Change Orders entirely**, and signed change orders are the single strongest thing this product does for a GC. As shipped, this tutorial makes the *sub's* argument, not the GC's.

Recommendation: keep the invoice-mode recording (simpler vocabulary, larger audience, no branching), and add **one line in clip 3** that acknowledges it, spoken plainly:

> "If you run main contracts and change orders rather than invoices, your Kablanet says so — same screens, same steps, different word on the button."

Then commission a separate 90-second GC cut of the signing story in change-order mode for the ads and the GC landing page. That is a marketing asset, not a tutorial chapter, and it is the highest-value 90 seconds we could shoot next.

---

## 3. Script critique

### The systemic problems

**A. Reading the interface aloud.** Roughly a third of the clips describe what is visible instead of why it matters. The dashboard clip is the worst offender: four sentences that each name a tile and restate its label. The viewer can read. Narration's only job is to say what the screen *does not say*.

**B. Hedging and apologizing.** The drafts repeatedly excuse the software: *"There is more in here than you need on day one, so do not feel you have to work through all of it"*, *"It is the least urgent screen in the app"*, *"It is not a mailbox and it is not meant to replace one"*, *"If most of your work comes through one or two builders, this list will stay short, and that is fine."* Reassurance that lowers the cost of *acting* is good writing ("everything here can be changed later"). Apology that pre-empts a complaint the viewer has not made yet is not — it plants the doubt.

**C. Interchangeable copy.** Lines like *"Use the filters along the top to narrow it down"*, *"Add a new customer with the Add Customer button"*, *"Same shape as Contractors"* could be narrated over any competitor's product. Every clip should contain at least one sentence that only Kablanet could say.

**D. Register.** Two problems. First, **the drafts are written in British English** — "recognise", "nought to thirty days", "whoever writes the cheque", "licence number", "labour", "organise". The audience is Los Angeles general contractors. "Nought to thirty" and "cheque" will land as foreign in the first ten seconds and cost credibility before the product is even on screen. Convert the entire script to American English and to American units (the time-tracking radius is "about half a mile", not "a kilometer"). Second, **accountant vocabulary creeps in** where trade vocabulary belongs: "the mirror image of your receivables", "recognising a payment against it as received", "aging buckets". A contractor says "what I owe" and "who hasn't paid me".

**E. The data-model lecture in the middle of the emotional peak.** `flow-4` stops the signing story dead to explain when an invoice counts toward receivables versus when it can be marked paid. It is accurate and it matters — but it is the third-most-boring sentence in the video placed at its most exciting moment. Move it.

### Rewrites

All rewrites are 80–100 words (≈31–38 seconds at 2.6 words/second) and are written in American English.

---

**1. Dashboard** — reads the tiles aloud; generic.

> *Current:* "The tiles along the top are your money at a glance. Total Projects Value is everything you have on the books. Received Amount is what has actually landed. Outstanding Balance is what is still owed to you, and Scheduled Balance is what is lined up but not due yet."

> **Rewrite (89 words):**
> This is the first screen after you sign in, and it is four questions, not four numbers. What have I got on the books. What has actually landed in the bank. What is owed to me. And what is lined up but not due yet. Under that, your open projects and the payments waiting on you to approve, so the first thing you see in the morning is the thing you have to do something about. Click any project and you go from the whole company to one job.

---

**2. Inside a project / the payoff clip** — asserts the differentiator without ever showing it.

> *Current:* "This is the one screen that answers what did this job actually leave me, rather than just what was it worth."

The line is right and the clip never earns it — it does not name a single one of the four cards that actually answer the question. This is the most important rewrite in the document.

> **Rewrite (89 words):**
> Four numbers across the top of every project. Project Value is what the job is worth. Cash Position splits that into what has come in and what has not. Overall Margin is that value minus everything the job is costing you — subs, materials, permits, dump fees, labor. Cash Profit to Date is the cash-basis version: money received, minus costs actually paid. Nobody built this. It is the invoices and the bills you entered anyway, subtracted. Which means it was true last Tuesday, and it will be true tomorrow.

---

**3. Accounts Receivable** — reads buckets aloud; British; buries its one good line.

> *Current:* "grouped by how long it has been sitting — nought to thirty days, thirty-one to sixty, sixty-one to ninety, and older. Anything past sixty days is worth a phone call."

> **Rewrite (91 words):**
> Everything you have billed and not been paid for, oldest first. The buckets matter less than the top of the list: anything sitting past sixty days is a phone call, and you can make it from this row — open the document you sent, see the date it went out, request the payment again. When the money lands you mark it received here, once. The aging drops, the project balance drops, the dashboard drops. This is the screen you open on a Monday, not the one you build at month end.

---

**4. Price list** — actively de-sells itself, and the "an hour saves a day a year" blurb is a metric we cannot support.

> *Current:* "It is the least urgent screen in the app and the one that saves the most time over a year, so it is worth an hour when you have a quiet afternoon."

> **Rewrite (88 words):**
> Your standard scopes, written the way you want them to read on a document, with the price you normally charge. Add the ten you quote every week and stop there. Next time you bill demo and framing you pick them instead of typing them, and the wording is the same wording you used on the last three jobs, which is what stops arguments later. Items that always go together become a set you drop in with one click. If you already have a spreadsheet of rates, import it.

---

**5. Signing (merged flow-3 + flow-4)** — currently three clips where two will do, with a lecture in the middle.

> *Current (flow-4):* "Here is the part worth understanding. Signing never changed what the invoice is worth — it counted from the moment you saved it. What a pending signature blocks is recognising a payment against it as received."

> **Rewrite (91 words):**
> Your customer taps the link, and the document opens in their browser. No login, no app, no account. They read it, sign in the box you placed, and submit — usually on a phone, in a truck, at eleven at night. You sign it back with the signature you saved in Settings, and both signatures flatten into one PDF stored on the project. That file is what you would hand a lawyer: who signed, what they signed, when. No printing, no scanning, and nobody had to be in the same room.

> **Where the deleted explanation goes:** two sentences inside clip 13 (Accounts Receivable) or clip 18 (Payments), where the viewer is already thinking about balances: *"One thing worth knowing. An invoice counts as money owed to you from the moment you save it — signing does not change the amount. What the signature gates is marking it paid."*

---

**6. Payments** — buries the strongest claim in the video in its last clause.

> *Current:* "Either way it updates your dashboard and your aging at the same time, so nothing is entered twice."

> **Rewrite (88 words):**
> Every payment, both directions, in one ledger — what came in from customers, what went out to subs and suppliers. The point of this screen is what is not on it: a second place to type any of this. You record a payment once, here or on the project schedule, and the aging list, the project balance, the contractor's balance and the dashboard all move off that one entry. Method, date, check number if you wrote one. A payment shows as scheduled until it actually lands, then final.

---

**7. Time tracking** — right instinct, missing the mechanism.

> *Current:* "Hours land as labour cost on the job they were worked on, which is the piece most trade businesses are missing when they try to work out what a job really made."

The clip never says how hours become dollars (a rate per person) or how the app gets the job right (location).

> **Rewrite (92 words):**
> Your crew clocks in from a phone on site, and the app offers the projects within about half a mile of where they are standing, so the hours land on the right job instead of being reconstructed on Friday. Set a rate for each person and those hours become dollars in the labor row on the project, next to your subs and your materials. Most contractors know their sub costs and guess their own labor. This is the piece that turns the margin number on the project page from roughly right into right.

---

**8. Estimate Requests** — overclaims, in a way a competitor could copy verbatim.

> *Current:* "It turns pricing a job from a morning of phone calls into a few minutes at the keyboard."

Untrue in the way that matters: you still wait for subs. Overclaiming here costs us the credibility we need for clip 8.

> **Rewrite (92 words):**
> Pricing a job usually means the same scope sent to four subs and a week of chasing. Write it once here, pick who it goes to, attach the plans, and send. Each of them gets a link where they reply with a price — no account needed — and their answers come back in one list you can read side by side. You still wait for subs to get back to you. What you stop doing is digging through your inbox to work out who has answered and who has gone quiet.

---

**9. Emails** — double hedge, no scenario.

> *Current:* "It is not a mailbox and it is not meant to replace one; it is the paper trail behind the documents the app sends for you."

> **Rewrite (81 words):**
> Every message the app has sent for you, with the date it went and where it went. This exists for one conversation: the customer who says they never got the invoice. You open this screen, read them the timestamp, and the conversation is over. Signing invitations, statements, payment requests, estimate requests — all logged. It is not a mailbox and it does not replace yours. Think of it as the certified-mail receipt for the paperwork the app sends on your behalf.

---

**10. Company details** — a clip about typing your address; apologizes at the end.

> *Current:* "There is more in here than you need on day one, so do not feel you have to work through all of it."

> **Rewrite (89 words):**
> Ten minutes here changes what your customer sees. Your company name, address, phone and license number, and your logo — they print on every invoice, estimate and statement that leaves the app, which is the difference between a document that looks like a business and one that looks like a Word file. Add your office manager or your bookkeeper while you are here, and choose what each of them can open; a field PM does not need to see your margins. Everything on this page can be changed later.

---

**11. Give part of the work to a sub (flow-6)** — the hinge clip; currently correct but flat.

> *Current:* "From that moment it is a commitment, so it shows up as money you owe rather than money you have spent."

The idea is right. It needs a name, a trade and a consequence.

> **Rewrite (90 words):**
> You are not doing all of this yourself. On the same project, add a job for your framer: what the work is, what you agreed to pay, when. Or import his bid and let the app pull the numbers off it for you to check. The moment you save, that amount is a commitment — money you owe, not money you have spent — and it shows against the job, against the framer, and in what you owe this month. This is the second side of the ledger opening up.

---

### Line-level fixes that do not need a full rewrite

| Clip | Line | Fix |
|---|---|---|
| Projects | "Almost everything else in Kablanet hangs off a project" | Architecture talk. "If it costs money or earns money, it belongs to a project." |
| Accounts Payable | "the mirror image of your receivables" | "Everything you owe, and when it is due." |
| Suppliers | "Same shape as Contractors" | Cut. UI consistency is not a benefit; open on the materials-cost point instead. |
| Customers | "whoever writes the cheque" | "whoever signs the check." |
| Customers | "this list will stay short, and that is fine" | Cut. Apology. |
| Contractors | "the paperwork you generate for them comes out right the first time" | Name the paperwork. "Their license number is already on the job document when you send it." |
| Invoices | "it feeds straight into your dashboard and your receivables" | "it is money you are owed on every screen that tracks it, before you have finished saving." |
| Settings | "do not feel you have to work through all of it" | Cut. |
| Jobs | "Jobs are the biggest part of most trade businesses' costs" | Softer and truer: "For most shops, subs are the biggest line in the job." |
| Throughout | British spelling and idiom | Convert to American English before recording. Non-negotiable for this audience. |

---

## 4. The hook and the payoff

### Opening 30 seconds — clip 1, ready to narrate

*(95 words, ≈36 seconds. Runs over the dashboard or a project page; no cursor movement needed until the last line.)*

> Every contractor knows what a job was worth. Fewer can tell you what it left them — not until the last supplier invoice turns up, sometimes months after the crew moved on. That gap is not a bookkeeping problem. It is the reason you underprice the next one. Kablanet puts both sides of a job on the same page: what you billed the customer, and what you committed to subs, suppliers and labor. Nothing in here is a report you run. It is the paperwork you already do, in one place. Here is one job, start to finish.

### Closing 30 seconds — tail of clip 29, ready to narrate

*(96 words, ≈37 seconds. Runs over the project page with the four cards visible.)*

> That is the whole loop. You billed the customer, got it signed, took the money, and paid the people who did the work — and because all of it landed on one project, the margin was sitting there the whole time. Nobody assembled it. If you are already running jobs, put a live one in and compare that number to what you thought that job was making. If you get stuck, Help has the manual, and the message box on it reaches us with your account attached. Start with one project. That is enough to know whether this fits how you work.

---

## 5. What we are not saying

Anything below is either unverifiable, oversold, or something a competitor could say identically. None of it appears in narration.

### Product claims that are wrong or not yet true

| Never say | Why | Say instead |
|---|---|---|
| "Job costing", "WIP", "budget vs. actual", "P&L report", "retainage" | No standalone reporting module exists; retainage is not modeled. This is the fastest way to get caught by a commercial GC. | "The four numbers at the top of the project." |
| "Syncs with QuickBooks" | No integration. CSV export only. | "Export any list to CSV. Keep QuickBooks for your accounting." |
| "Pay your subs from Kablanet" / anything implying payment rails | Kablanet **records** payments; it does not move money. A viewer who hears "contractor payments" can easily assume ACH. Be explicit in the Payments clip that this is a record, not a transfer. | "Record the payment — amount, date, method, check number." |
| "Powered by AI" as a headline | This audience is AI-skeptical, and it converts a time-saving into an accuracy promise we would then have to defend. | "Import the bid and it pulls the numbers off it for you to check." Always show the review step on screen. |
| "Legally binding signatures" | E-signature validity is a legal question, not a product claim. | "Both signatures flatten into one PDF, with who signed and when." |
| "Bank-grade security", "two-factor", "we log every IP" | Unverified. | "Role-based access, soft deletes, and an audit trail of every change." |
| "Instant access" / "sign up and you're in" | Signup passes through an approval gate. | Say nothing about signup speed in the tutorial. |
| "Your customer sees everything" | The portal is read-only and deliberately scoped — sub bids and your costs are never shown. | "A read-only view of their own project. Your costs are not in it." |
| "Hours automatically become cost" | Only once a rate is set for that person. | "Set a rate for each person and the hours become dollars on the job." |
| "Nothing is ever entered twice" (as an absolute) | Overreach. | "You record it once, in one place" — said about the specific flow on screen. |

### Marketing claims to avoid

- **Invented time and money savings.** "An hour here saves a day a year", "a morning of phone calls into a few minutes", "10x faster". We have no customers measured. Cut all of them.
- **Any social proof.** No "contractors across LA", no counts, no logos, no implied testimonials. We have none yet.
- **Competitor names.** Never in narration. Comparison belongs on comparison pages, where it can be argued fairly.
- **The interchangeable vocabulary.** Banned words for this script: seamless, streamline, revolutionize, effortless, intuitive, powerful, robust, all-in-one, game-changer, unlock, empower, at your fingertips, single source of truth. If a sentence would survive being narrated over a competitor's screen recording, rewrite it.
- **Predictive claims.** Kablanet does not warn you that a job is going to lose money. It shows you the number today. Do not imply forecasting.
- **Exclamation marks, and the enthusiastic-demo voice.** The register is a peer who has run jobs, saying true things at normal volume. Where the product is boring, say it is boring and say why it is worth doing anyway — the jobs clip already does this well ("the more of them you record, the truer every profit number becomes") and that honesty is what buys belief for clip 8.

### One thing we should say that the drafts do not

The margin number is only as good as what you put in. Say it once, plainly, in clip 7 or clip 8 — *"this is only true if the sub jobs and the supplier bills are in here, which is the real work"* — and the whole video becomes more credible, not less. Contractors have been sold effortless before. Nobody who has run a job believes it.
