# Kablanet Finance Hub — Screen-Recorded Video Tutorial
## Product spec: chapters, demo data, and the per-screen action script

**Owner:** Kablanet PM
**Verified against:** `origin/main` @ `f193004ecab85ff8f38d1d7547d8ccca6f52f36e` ("Added recording flags", 2026-09-02 03:04 UTC), local clone `/Users/guyw/Desktop/Claude/Kablanet/kablanet-build-buddy`, `git fetch origin` run immediately before reading. Live-DB facts read via Supabase PostgREST against `hrhigmgtihaoqmrmbxbu` on 2026-09-02.
**Recording company:** Summit Crest Builders — `30af2057-ec23-466e-9d76-ef7ec25d4deb`. Confirmed empty at time of writing (0 rows in `customers`, `projects`, `contracts`, `jobs`, `material_invoices`, `contractors`, `suppliers`, `contract_payments`, `payments`, `time_entries`; no `system_settings`, `payment_statuses`, `change_order_statuses`, `trades`, `price_lists` or `contract_templates` rows of its own).
**Never** record against Lux Builders & Remodeling Inc.

---

## 0. Scope decisions that govern everything below

### 0.1 Invoice mode is the only mode

`system_settings` row `{ company_id: 30af2057…, key: 'contractual_mode', value: "invoices" }` must exist before recording. Set it once; never flip it per clip.

Consequences, all verified:

| Surface | In invoice mode | Source |
|---|---|---|
| Sidebar entry for `/change-orders` | **hidden entirely** | `AppSidebar.tsx:218` — `if (isInvoiceMode && item.url === '/change-orders') return false;` |
| Sidebar label for `/invoices` | `Invoices` | `AppSidebar.tsx:70,224` (`flatDocsTitle`) |
| `/invoices` page heading | `Invoices` + `(n)` | `ChangeOrdersPage.tsx:466` via `docTerms.plural`, `documentTerms.ts:31` |
| `/invoices` summary line | `All invoices across all projects.` | `ChangeOrdersPage.tsx:469-470` |
| `/invoices` primary button | `New Invoice` | `ChangeOrdersPage.tsx:473` |
| Project-page pane title | `Invoices` (not "Contract & AR") | `ProjectDetailPage.tsx:2330` |
| Project-page add button | `Add Invoice` | `ContractsSection.tsx:3026-3029` |
| Project invoices table col 1 | `Invoice #` | `ContractsSection.tsx:531` |
| "Type" column on project table | suppressed | `ContractsSection.tsx:326` |
| Create dialog title | `Add New Invoice` | `ContractDialog.tsx:262-266` |
| Create dialog save button | `Create Invoice`, or `Create & Open Signing Editor` when Require Signature is ticked | `ContractDialog.tsx:244-249` |
| `Main Contract` checkbox | suppressed | `ContractDialog.tsx:287` (`{!isInvoiceMode && …}`) |

**No chapter, no narration line and no seeded row anywhere in this tutorial refers to a contract or a change order.** Not even to say the feature exists.

**One label wart to plan around:** the global `/invoices` list still labels its first column **`CO #`** — the column definition is hardcoded and does not respond to `docTerms` (`ChangeOrdersPage.tsx:435`). The recorder must use the literal string `CO #` if it targets that header, and the narration for Chapter 17 must not read the column headers aloud. Worth filing as a separate bug; it is out of scope for this spec.

### 0.2 The demo company is a specialty-trade subcontractor

Summit Crest Builders is a **framing and rough-carpentry subcontractor** working the San Fernando Valley and the LA basin.

- **Their customers** are the builders, developers and GCs who hire them, plus one direct homeowner.
- **They still hire their own subs** — crane and rigging, truss setting, shear/sheathing, hardware and hold-downs, cleanup and haul-off — so Jobs, Contractors, Accounts Payable stay fully in scope.
- **They still buy materials** — lumberyard, truss plant, fastener/connector distributor, engineered wood — so Suppliers and material invoices stay in scope.
- Every project name, scope line, price-list item and estimate subject below is consistent with framing work.

### 0.3 The signature rule — resolved, with one thing to verify live

The brief I was given states that a pending signature "does NOT change what the document is worth or remove it from receivables." **The code at `origin/main` says the opposite**, and I could not make the two agree:

```
// src/lib/financialModel.ts:204-206
  // Canonical signature gate — mirrors financial_source_rollups() in the database.
  if (sourceSignatureExclusion(source) !== null) return 'signature_pending';
```

`valueExclusionReason()` returning `'signature_pending'` makes `contributesAuthoritativeValue()` false (`financialModel.ts:213-215`), which makes `contractValue()` return `0` (`contractValue.ts:90-93`). The badge text is explicit: `'Awaiting signature — excluded from financial totals'` (`contractEligibility.ts:132-133`). `sourceSignatureExclusion` triggers whenever `require_signature` is truthy and `signed_at`/`contractor_signed_at` are not both set (`financialModel.ts:221-230`).

The older doc-comments at the top of `contractValue.ts` and `contractEligibility.ts` still describe the pre-change behaviour ("Signature-pending documents ARE included in Outstanding"). Those comments are stale relative to `financialModel.ts`.

**What this spec does about it:**
1. Every seeded invoice that must show value is either `require_signature = false` **or** has both `signed_at` and `contractor_signed_at` set. Nothing in the pre-seeded picture depends on the disputed behaviour.
2. Exactly one seeded invoice (`1039`, $164,750, on project P5) is deliberately left `require_signature = true` and unsigned, so the excluded-from-totals state is visible and explainable.
3. **Chapter 12's narration is written to the code, not to the old comment**, and must be re-verified live before the voice-over is cut. See §5, Risk R-1. Do not record the flow.json `flow-4` script as written — it asserts "Signing never changed what the invoice is worth," which is false on this build.

### 0.4 Recorder capability constraints your scripts must respect

Read from `scratchpad/record.mjs`:

- **`d.moveToText(label)` only matches leaf elements** — `if (e.childElementCount) continue;` — with an **exact trimmed `textContent`**, and only when currently in the viewport (`r.top > -10 && r.top < innerHeight`). So it **fails** on:
  - `PageTableHeader` titles: the `<h2>` wraps a nested count `<span>` (`PageTableHeader.tsx:31-36`). Use `moveToEl('h2')`.
  - Any shadcn `Button` with a lucide icon: the `<svg>` is a child element. Use `moveToEl('button:has-text("…")')`.
  - `TableSectionHeader` titles: the chevron `<svg>` is a sibling inside the same button, but the title itself is a leaf `<span>` (`TableSectionHeader.tsx:44`) — `moveToText('Jobs')` **does** work for those.
  - `StatCard` titles: leaf `<p>` (`StatCard.tsx:70`) — `moveToText('Outstanding Balance')` works.
- **`d.moveToEl(sel)` uses `page.locator(sel).first()`**, so full Playwright selector syntax is available: `button:has-text("Add Invoice")`, `text="Invoices"`, `[role="tablist"] > button:nth-child(2)`. Prefer this for anything with an icon.
- **`d.scrollTo(y)` drives the largest inner overflow container**, chosen at call time. When a Radix dialog is open the picker will select the dialog's scroll area — which is what we want inside the invoice editor, but it means a `scrollTo` issued while a dialog is opening is non-deterministic. Always `d.until()` past the dialog's mount before scrolling.
- **There is no typing primitive.** Chapters 9, 10 and 13 require typed field input. See §3.0 — the recorder needs two new methods before Part 4 can be shot.

---

## 1. Chapters

30 chapters, 8 parts, ≈18 minutes total. Structured as modular self-selectable chapters of 35–45s rather than one linear reel, which is the current convention for multi-use-case product tours ([Arcade, *Product Tour Examples to Copy in 2026*](https://www.arcade.software/post/product-tour-examples); [Arcade, *SaaS Product Demos in 2026*](https://www.arcade.software/post/saas-product-demos-guide)). Grouping into named parts mirrors how Buildertrend segments its own library into Getting Started / Financials / Tools & Tutorials ([Buildertrend video library](https://buildertrend.com/videos/)).

| # | Title | Route | Purpose | Target |
|---|---|---|---|---|
| **PART 1 — START HERE** ||||
| 1 | What Kablanet does for you | `/dashboard` | The promise, in one screen: what you're owed, what you owe, what the job made | 0:45 |
| 2 | Finding your way around | `/dashboard` | The left menu is the app's spine — what's on it and how projects nest under customers | 0:35 |
| **PART 2 — SET UP ONCE** ||||
| 3 | Your company details | `/settings?tab=system` | Name, address, licence, logo — what prints on every invoice you send | 0:40 |
| 4 | Your signature | `/settings?tab=user` | Draw it once; signing becomes one click | 0:35 |
| 5 | Your price list | `/price-list` | Standard scopes and rates, and assemblies that pull a whole package in | 0:40 |
| **PART 3 — EVERY DAY** ||||
| 6 | The dashboard | `/dashboard` | The ten tiles, what each one means, and where the money sections live | 0:40 |
| 7 | Projects | `/projects` | One row per job, with total, paid and balance | 0:35 |
| 8 | Inside a project | `/projects/<P1>` | The five panes, and what lives in each | 0:40 |
| **PART 4 — ONE INVOICE, START TO FINISH** ||||
| 9 | Raise the invoice | `/projects/<P4>` | Bill from the project, priced off the price list | 0:40 |
| 10 | Who has to sign it | `/projects/<P4>` (signing editor) | Signees, and what "Require Signature" actually does | 0:35 |
| 11 | Send it, and what your customer sees | `/invoices` → `/sign/contract/<token>` | The customer's browser view — no login, works on a phone | 0:40 |
| 12 | You sign it back | `/invoices` (counter-sign) | Counter-sign, the executed PDF, and the one thing signing changes | 0:40 |
| 13 | The money arrives | `/projects/<P4>` → `/accounts-receivable` | One entry, four screens updated | 0:40 |
| 14 | Hand part of the work to a sub | `/projects/<P4>` | A job is a commitment: it becomes money you owe | 0:35 |
| 15 | Materials and your crew's hours | `/projects/<P4>` | The rest of the cost side | 0:35 |
| 16 | What the job actually left you | `/projects/<P1>` | **Project Value, Cash Position, Overall Margin, Cash Profit to Date** | 0:45 |
| **PART 5 — GETTING PAID** ||||
| 17 | Invoices | `/invoices` | Every invoice across every project, filtered | 0:35 |
| 18 | Accounts Receivable | `/accounts-receivable` | The chase list, aged | 0:40 |
| 19 | Payments | `/payments` | The ledger of money actually moving, both directions | 0:35 |
| **PART 6 — WHAT IT COSTS YOU** ||||
| 20 | Jobs | `/jobs` | Work you've handed out, and what you agreed to pay | 0:35 |
| 21 | Contractors | `/contractors` | Your subs, their trades, and what you owe each | 0:35 |
| 22 | Suppliers | `/suppliers` | Merchants and their invoices | 0:35 |
| 23 | Accounts Payable | `/accounts-payable` | What you owe, by stage and by age | 0:40 |
| **PART 7 — WINNING WORK** ||||
| 24 | Sent Estimates | `/estimates/sent` | Your pipeline: open, won, lost | 0:35 |
| 25 | Estimate Requests | `/estimates/requests` | One scope out to several subs at once | 0:35 |
| 26 | Received Estimates | `/bids` | Their prices back, side by side | 0:35 |
| **PART 8 — EVERYTHING ELSE** ||||
| 27 | Time Tracking | `/time-tracking` → `/time-tracking/dashboard` | Clock in on site; hours become labour cost | 0:35 |
| 28 | Emails | `/emails` | Proof of what went out and when | 0:35 |
| 29 | The rest of Settings | `/settings` | Users, statuses, trades, document templates | 0:35 |
| 30 | Help | `/help` | The manual, and a direct line | 0:35 |

### 1.1 What I changed from the existing 22 screens + 7 flow steps, and why

| Change | Why |
|---|---|
| **Dropped nothing that survives invoice mode.** No contracts/change-orders chapter was ever in `pages.json`, so the scope correction removed no existing content. | — |
| **Merged `setup-price-list` and `price-list` into one chapter (5).** | They are the same route (`/price-list`) and the same screen; the two scripts overlap ~70%. Two clips of one screen reads as padding. |
| **Retargeted `setup-company` from `/settings` to `/settings?tab=system`.** | Company Details (name, address, licence, logo) is on the **System** tab, not the landing tab — `SystemSettingsTab.tsx:296` renders `<CardTitle>Company Details</CardTitle>`, and `settingsPages` (`pageRegistry.ts:41-58`) has no "Company" tab at all. The old route opens on User Settings and the narration would describe a screen that isn't showing. |
| **Retitled the old `settings` screen to "The rest of Settings" (29) and moved it late.** | Chapters 3 and 4 already cover the two tabs a new user must touch. Chapter 29 is the tab-strip tour: Users, Document Statuses, Trades, Document Templates, Email Templates. |
| **Added Chapter 1 (cold open) and Chapter 2 (sidebar).** | Current practice is to answer "how does this make my life easier?" inside the first 30 seconds or lose the viewer ([darvideo, *SaaS Demo Videos That Sell in 2026*](https://darvideo.tv/blog/best-product-demo-videos-for-saas-tech/)). Opening on "enter your company address" is the worst possible first 30 seconds. Chapter 2 exists because the sidebar is the app's actual spine — it carries every route plus a customer→project tree (`AppSidebar.tsx:441-500`) — and nothing in the 22 screens ever explains it. |
| **Split `flow-2` into Chapters 10 and 11.** | `flow-2`'s 30-second script covers signees, field placement, sending, *and* the customer's inbox. That is two clips of material; at 2.6 wps it cannot be said in 78 words without becoming a list. |
| **Merged `flow-3` into Chapter 11.** | "Send it" and "what they see when they open it" are one continuous shot: you send, you cut to the token URL. Splitting them wastes a chapter on a 6-second state change. |
| **Rewrote `flow-4` (Chapter 12).** | Its central claim is false on this build. See §0.3 and Risk R-1. |
| **Added Chapter 16, "What the job actually left you."** | Nothing in the 29 existing clips ever shows the four project-header KPI cards — **Project Value**, **Cash Position**, **Overall Margin**, **Cash Profit to Date** (`ProjectDetailPage.tsx:1953, 1961, 1995, 2008`). That single row is where the product's whole argument is rendered. It is the payoff for Part 4 and it closes the tutorial's spine. It runs on **P1**, not P4, because P1 is four months old and produces four rich numbers; a project built from zero on camera produces a cash-profit figure with nothing paid out yet, which teaches nothing. |
| **Reordered Part 7 to Sent → Requests → Received.** | `pages.json` had Sent → Received → Requests. Requests *cause* Received Estimates — an estimate request emails vendors and their replies land in `/bids`. Teaching the effect before the cause is backwards. |
| **Customers is not a standalone chapter in the 30 above — it is optional.** | For a subcontractor with three or four repeat builders, the Customers list is thin, and its content is already visible twice: the sidebar's customer→project tree (Chapter 2) and the Projects list (Chapter 7). I have written it as **Chapter 7a** in §4 so you can drop it in; with it the tutorial is 31 chapters / ≈18:45. |
| **Chapter 16 runs on P1, not on the project built in Part 4.** | A project built from zero on camera has nothing paid out yet, so Cash Profit to Date equals the deposit and Overall Margin is near-100% — it teaches the opposite of the point. P1 is four months old and produces four honest numbers. |

> **Decision needed from you:** whether Customers gets its own chapter. My recommendation is yes — insert **7a. Customers** (`/customers`, 0:35), using the existing `pages.json` `customers` script with "builders, developers, GCs — whoever writes the check" in place of "whoever writes the cheque." I have written the action script for it in §4 so it can be dropped in either way.

---

## 2. Demo data — pre-existing (seeded before recording)

All dates are offsets from **D = recording day**, local `America/Los_Angeles`. Seed via direct SQL against the live Postgres, not the UI.

**Aging arithmetic that drives the offsets** (`src/lib/aging.ts:48-56`): `days = floor(startOfToday − dueDate)`; `≤30 → 0-30 Days`, `≤60 → 31-60 Days`, `≤90 → 61-90 Days`, `≤120 → 91-120 Days`, else `120+ Days`. **A future due date has negative `days` and therefore lands in `0-30 Days`.** `agingDateOf` = `due_date || date` (`aging.ts:35-37`), and `contract_payments.date` is never null, so the **`Undated` tile will always read $0** in this dataset. That is honest; no narration should point at it.

### 2.1 Company profile — `companies` (update row `30af2057…`)

| Column | Value | Note |
|---|---|---|
| `name` | `Summit Crest Builders` | already set |
| `address` | `2255 Ventura Blvd., Suite 410` | **street only** — the current live value crams city/state/zip *and a phone number* into this column; it must be split |
| `city` / `state` / `zip` | `Sherman Oaks` / `CA` / `91403` | |
| `phone` | `(818) 555-2040` | |
| `secondary_phone` | `(818) 555-2041` | |
| `fax` | `(818) 555-2049` | |
| `email` | `office@summitcrestbuilders.com` | currently null |
| `website` | `https://summitcrestbuilders.com` | |
| `license_number` | `CSLB 1084427` | currently null — Chapter 3 points at this field |
| `license_expires_on` | `D + 412 days` | |
| `tax_id` | `47-3319085` | |
| `timezone` | `America/Los_Angeles` | every rendered document date uses this, never the browser's (`src/lib/documentTimeZone.ts`) |
| `logo_url` | already set (`company-logos/30af2057…/1786295336106.jpg`) | **verify it renders** before Chapter 3 |
| `status` | `active` | |

### 2.2 `system_settings`

| key | value | why |
|---|---|---|
| `contractual_mode` | `"invoices"` | §0.1. Stored as a raw JSON string (`useContractualMode.ts:74-77`) |
| `contract_number_start` | `1042` | so the on-camera invoice takes the next clean number |

> **Verify, don't assume, the on-camera invoice number.** `next_change_order_number(_company_id)` is the only numbering RPC (`ChangeOrderForm.tsx:117-126`; `next_contract_number` and `next_invoice_number` do not exist). Called against the empty Summit Crest it returns **`"7273R"`** — a number unrelated to any seed, with an `R` suffix. It is idempotent (two consecutive calls returned the same value), so **after seeding, call the RPC once and put the returned string into the Chapter 9 cue table's expected-value column.** Do not hard-code `1042`. The `R` suffix on an invoice number is a cosmetic wart; flag it separately.

### 2.3 Statuses, methods, trades

Summit Crest has **no** company-scoped `payment_statuses` or `change_order_statuses`, so it inherits the global defaults (`company_id IS NULL`), verified live:

- **AR:** `ar_outstanding` → **Outstanding**, `ar_scheduled` → **Requested** *(note: the label is "Requested", not "Scheduled")*, `ar_received` → **Received** (`is_final`).
- **AP:** `outstanding` → Outstanding, `requested` → Requested, `scheduled` → Scheduled, `issued` → Issued, `received` → **Completed** (`is_final`).

Leave these inherited. Do **not** seed company overrides — every narration line below uses the inherited labels.

`payment_methods` — seed 4: `Check` (type `check`), `ACH Transfer` (`ach`), `Wire` (`wire`), `Credit Card` (`card`).

`trades` — seed 10, `is_active = true`, `sort_order` 1–10:
`Framing`, `Rough Carpentry`, `Truss Setting`, `Crane & Rigging`, `Shear & Sheathing`, `Hardware & Hold-Downs`, `Joist & Beam Layout`, `Stair Framing`, `Cleanup & Haul-Off`, `Scaffolding`.

`contract_templates` — Summit Crest has none of its own, but **global defaults exist** for `kind = 'invoice'` (`New Invoice`, `is_default = true`) and `kind = 'estimate'`. Verified live. Nothing to seed; the signing editor's template fallback (`ContractsSection.tsx:2409-2419`) will find them. **Because only one invoice template exists, the template picker in `ChangeOrderForm` will not render** (`ChangeOrderForm.tsx:2305` — `{templates.length > 1 && …}`). If Chapter 10 should show a template picker, seed a second company-scoped invoice template named `Summit Crest Invoice`.

### 2.4 Recording user — `auth.users` + `profiles` + `user_roles` + `company_members` + `user_signatures`

**This is a blocker, not a nice-to-have.** The current `scratchpad/auth.json` session belongs to `guywein@gmail.com`, a **platform admin** with an `impersonate_company_id` override. Recording under it puts a **`Platform` group with a `Platform Admin` link** in the sidebar (`AppSidebar.tsx:536-556`) and a multi-company switcher in the header (`AppSidebar.tsx:~262`) — neither of which any customer will ever see. Summit Crest currently has **one** `user_roles` row (`a1531520-…`, `admin`) with **no matching `profiles` row and no `company_members` row**, i.e. no usable member.

Create:

| Field | Value |
|---|---|
| email | `ray@summitcrestbuilders.com` |
| `profiles.full_name` | `Ray Ellison` — this is what the sidebar footer prints (`AppSidebar.tsx:573`) |
| `user_roles` | `admin`, scoped to Summit Crest **only** |
| `platform_admins` | **absent** |
| `company_members` | one active row for Summit Crest |
| `user_signatures.signature_data_url` | a real-looking hand-drawn "Ray Ellison" PNG |
| `user_signatures.initials_data_url` | a real-looking "RE" PNG |
| `user_signatures.email_signature` | `Ray Ellison\nSummit Crest Builders\n(818) 555-2040 · ray@summitcrestbuilders.com` |

Then re-run `capture-login.mjs` as this user to produce a fresh `auth.json`.

**Also reset these localStorage keys per take**, because they persist view state that will otherwise drift between clips: `ui.dashboardCollapsed`, `ui.dashboardProjectsView` (→ `"table"`), `ui.dashboardTopView`, `ui.dashboardAgingView`, the `ReorderableSections` order key for `dashboard` (`DashboardPage.tsx:534`), every `project-pane:*` key (`ProjectPane.tsx:76`), every `tbl-prefs:*` key, and `ar.filters.aging`.

### 2.5 Crew — `time_tracking_employees` (5 users)

| Name | Email | `hourly_rate` | `lunch_minutes` | `daily_overtime_after_hours` / `daily_overtime_rate` | `weekly_overtime_after_hours` |
|---|---|---|---|---|---|
| Marco Ibarra | `marco@summitcrestbuilders.com` | 46 | 30 | 8 / 1.5 | 40 |
| Tony Rasmussen | `tony@summitcrestbuilders.com` | 42 | 30 | 8 / 1.5 | 40 |
| Devon Price | `devon@summitcrestbuilders.com` | 38 | 30 | 8 / 1.5 | 40 |
| Luis Camarena | `luis@summitcrestbuilders.com` | 38 | 30 | 8 / 1.5 | 40 |
| Beau Whitaker | `beau@summitcrestbuilders.com` | 34 | 30 | 8 / 1.5 | 40 |

Each needs a real `auth.users` row (FK `time_entries.user_id`), a `profiles` row with the full name, and a `company_members` row. They do **not** need `user_roles` beyond a viewer-level role.

### 2.6 Customers — `customers` (4)

| # | `name` | `contact_name` | `email` | `phone` | address / city / state / zip |
|---|---|---|---|---|---|
| Cu1 | Harborview Property Group | Dana Whitfield | `dana@harborviewpg.com` | (310) 555-0184 | 11835 W Olympic Blvd, Suite 900 / Los Angeles / CA / 90064 |
| Cu2 | Marisol & Peter Reyes | Marisol Reyes | `mreyes.la@gmail.com` | (818) 555-7712 | 4417 Kester Ave / Sherman Oaks / CA / 91403 |
| Cu3 | Cypress Ridge Construction | Alan Feld | `afeld@cypressridgeco.com` | (626) 555-3390 | 340 E Colorado Blvd, Suite 210 / Pasadena / CA / 91101 |
| Cu4 | Brightline Builders | Jen Okafor | `j.okafor@brightlinebuilders.com` | (213) 555-2266 | 700 S Flower St, Suite 1500 / Los Angeles / CA / 90017 |

Also seed `customer_contacts` (one `is_primary` row each, mirroring the above) — the invoice editor's "Contact person" select reads from this table (`ChangeOrderForm.tsx:2809-2831`) and is empty otherwise.

`customer_types` — seed 3: `Builder / Developer`, `General Contractor`, `Homeowner`. Assign Cu1 → Builder / Developer, Cu2 → Homeowner, Cu3 and Cu4 → General Contractor. This gives Chapter 7's group-by something to group.

### 2.7 Projects — `projects` (6)

`projects.address` is **street only**; city/state/zip are their own columns.

| # | `name` | cust | `address` | city/state/zip | `status` | created |
|---|---|---|---|---|---|---|
| **P1** | Harborview — Camarillo St 12-Unit | Cu1 | `14520 Camarillo St` | Sherman Oaks / CA / 91403 | active | D-118 |
| **P2** | Cypress Ridge — Oakmont Custom Home | Cu3 | `1440 Oakmont Dr` | Pasadena / CA / 91106 | active | D-205 |
| **P3** | Reyes Residence — Second-Story Addition | Cu2 | `4417 Kester Ave` | Sherman Oaks / CA / 91403 | active | D-52 |
| **P4** | Brightline — Culver Mixed-Use Podium | Cu4 | `9410 Washington Blvd` | Culver City / CA / 90232 | active | D-24 |
| **P5** | Harborview — Vanowen St 8-Unit | Cu1 | `7715 Vanowen St` | Van Nuys / CA / 91405 | active | D-31 |
| **P6** | Cypress Ridge — Del Mar Remodel | Cu3 | `815 S Del Mar Ave` | Pasadena / CA / 91106 | **completed** | D-340 |

Design notes:
- **P1 and P5 both belong to Cu1 and are both `active`**, which is the only way the sidebar renders a **customer group with nested projects** — that branch requires `projs.length > 1` and the sidebar query filters `status = 'active'` (`AppSidebar.tsx:157-160, 441-443`). Chapter 2 depends on this.
- **P6 is `completed`** so Chapter 7's `Show Inactive` switch (`ProjectsPage.tsx:577-580`) has something to reveal.
- **P4 is seeded almost empty** — customer, address, and time entries only. No invoices, no jobs, no materials. Part 4 builds it from zero on camera, which is far more legible than editing an already-populated project.

Also seed `contact_name` / `contact_email` / `contact_phone` on each project from the customer's primary contact — the signing prepare dialog defaults off these (`ContractsSection.tsx:3463-3464`).

### 2.8 Invoices — `contracts` where `kind = 'invoice'` (10)

All rows: `company_id = 30af2057…`, `is_main_contract = true` (invoice mode sets this on create — `ContractsSection.tsx:1824`), `status = 'sent'` unless noted, `total_amount = bid_amount`.

| `contract_number` | project | `title` / `name` | value | `require_signature` | `signed_at` | `contractor_signed_at` | `date` |
|---|---|---|---|---|---|---|---|
| 1024 | P2 | Rough framing — floors 1 and 2 | 84,500 | true | D-196 | D-195 | D-198 |
| 1027 | P2 | Roof cut and stack, and shear package | 36,200 | true | D-148 | D-147 | D-150 |
| 1029 | P1 | Building A — framing, floors 1–2 | 118,400 | true | D-110 | D-109 | D-112 |
| 1031 | P1 | Added shear walls per revised structural | 14,750 | **false** | — | — | D-58 |
| 1033 | P1 | Buildings B and C — framing, all floors | 246,000 | true | D-90 | D-89 | D-92 |
| 1035 | P3 | Second-story framing and roof | 28,900 | true | D-38 | D-37 | D-40 |
| 1037 | P5 | Podium deck and Level 1 framing | 52,300 | true | D-19 | D-18 | D-21 |
| **1039** | **P5** | **Level 2 and 3 framing — base scope** | **164,750** | **true** | **null** | **null** | D-16 |
| 1040 | P1 | Level 3 backing and blocking | 18,600 | **false** | — | — | D-9 |
| 1041 | P2 | Framing punch list and deficiency correction | 6,900 | **false** | — | — | D-6 |

- **1039 is the deliberate teaching case**: `require_signature = true`, unsigned → `resolveSigningStatus` returns **`Awaiting Signees`** (`signingStatus.ts:39`) and `valueExclusionReason` returns `signature_pending`, so its $164,750 is excluded from every total. Chapter 17 points at it.
- 1031, 1040 and 1041 (`require_signature = false`) show **`Signed outside system`** in the Signing Status column (`signingStatus.ts:41, 62`).
- **1040 has no payment schedule and no payments at all.** That is deliberate: it is what makes `Outstanding Balance` ($218,725) exceed `Scheduled Balance` ($200,125) by exactly $18,600, so the dashboard narration in Chapter 6 has a true, explainable difference to describe.

**Counting value:** 84,500 + 36,200 + 118,400 + 14,750 + 246,000 + 28,900 + 52,300 + 18,600 + 6,900 = **$606,550**. (1039's $164,750 is excluded.)

Also seed `contract_line_items` (3–6 per invoice, drawn from the price list in §2.13) and `contract_payment_schedule` rows matching the payments below, so the project-page **Payment Schedule** section (`PaymentScheduleSection.tsx:1135`) is populated.

### 2.9 Customer payments — `contract_payments`

**Received** (`status = 'ar_received'`, final — feeds **Received Amount**):

| contract | amount | `date` | `due_date` | method | `check_number` |
|---|---|---|---|---|---|
| 1024 | 42,250 | D-190 | D-190 | Check | 4471 |
| 1024 | 21,125 | D-172 | D-175 | Check | 4530 |
| 1027 | 18,100 | D-140 | D-140 | ACH Transfer | — |
| 1029 | 59,200 | D-108 | D-108 | Check | 1188 |
| 1029 | 29,600 | D-70 | D-70 | Check | 1221 |
| 1033 | 123,000 | D-88 | D-88 | Wire | — |
| 1033 | 61,500 | D-52 | D-52 | Wire | — |
| 1037 | 26,150 | D-14 | D-14 | Check | 2049 |
| 1041 | 6,900 | D-2 | D-2 | Check | 1240 |

Total received = **$387,825**.

**Unpaid** — this is the table that builds the AR aging shape. Set `due_date` exactly as given:

| contract | amount | `date` | `due_date` | `status` | lands in |
|---|---|---|---|---|---|
| 1024 | 21,125 | D-170 | **D-163** | `ar_outstanding` | **120+ Days** |
| 1027 | 18,100 | D-115 | **D-108** | `ar_scheduled` | **91-120 Days** |
| 1033 | 61,500 | D-80 | **D-74** | `ar_scheduled` | **61-90 Days** |
| 1029 | 29,600 | D-54 | **D-47** | `ar_outstanding` | **31-60 Days** |
| 1035 | 28,900 | D-19 | **D-12** | `ar_scheduled` | **0-30 Days** |
| 1031 | 14,750 | D-30 | **D-24** | `ar_scheduled` | **0-30 Days** |
| 1037 | 26,150 | D-3 | **D+9** *(future)* | `ar_outstanding` | **0-30 Days** |

Total unpaid = **$200,125**. Bucket totals: `0-30` **$69,800** · `31-60` **$29,600** · `61-90` **$61,500** · `91-120` **$18,100** · `120+` **$21,125** · `Undated` **$0**.

Cross-check: 387,825 + 200,125 + 18,600 (unscheduled on 1040) = 606,550 ✓

### 2.10 Contractors — `contractors` + `contractor_trades` (5)

| # | `name` | `contact_name` | `email` | `phone` | `license_number` | `license_expiration` | trades |
|---|---|---|---|---|---|---|---|
| Co1 | Ironwood Truss Setting | Hal Brenner | `hal@ironwoodtruss.com` | (818) 555-4417 | 1024881 | D+190 | Truss Setting, Joist & Beam Layout |
| Co2 | Delgado Crane Service | Ruben Delgado | `dispatch@delgadocrane.com` | (626) 555-9080 | 998214 | **D+64** | Crane & Rigging |
| Co3 | Baseline Shear & Sheathing | Luz Vega | `luz@baselineshear.com` | (310) 555-6621 | 1101347 | D+301 | Shear & Sheathing, Rough Carpentry |
| Co4 | Nolan Hardware & Hold-Downs | Terry Nolan | `terry@nolanhardware.com` | (818) 555-3310 | 972640 | D+118 | Hardware & Hold-Downs |
| Co5 | Sunrise Site Cleanup | Ana Sierra | `ana@sunrisesitecleanup.com` | (626) 555-7743 | 1067902 | D+245 | Cleanup & Haul-Off, Scaffolding |

Co2's near-term licence expiry is a deliberate realism detail for Chapter 21.

### 2.11 Suppliers — `suppliers` (4)

| # | `name` | `contact_name` | `email` | `phone` | address / city / state / zip |
|---|---|---|---|---|---|
| Su1 | Sun Valley Lumber & Supply | Ed Marchetti | `orders@sunvalleylumber.com` | (818) 555-2200 | 8801 San Fernando Rd / Sun Valley / CA / 91352 |
| Su2 | Pacific Truss Company | Rosa Lim | `rosa@pacifictruss.com` | (909) 555-6410 | 1120 S Rochester Ave / Ontario / CA / 91761 |
| Su3 | Coast Fastener & Connector | Miguel Paz | `sales@coastfastener.com` | (562) 555-1180 | 14200 Alondra Blvd / Santa Fe Springs / CA / 90670 |
| Su4 | Anderson Engineered Wood | Nina Duarte | `nina@andersonew.com` | (818) 555-8890 | 12900 Bradley Ave / Sylmar / CA / 91342 |

Also seed `supplier_trades` linking Su2 → Truss Setting and Su1 → Framing, so the Suppliers list has a Trades column with content.

### 2.12 Jobs — `jobs` (15). `job_status = 'job'`.

| `job_number` | project | contractor | `scope` | `bid_amount` | `date` |
|---|---|---|---|---|---|
| J-2101 | P2 | Ironwood Truss Setting | Roof truss set — main house | 18,400 | D-190 |
| J-2103 | P2 | Baseline Shear & Sheathing | Shear wall sheathing and nailing, floors 1–2 | 22,750 | D-186 |
| J-2105 | P2 | Nolan Hardware & Hold-Downs | Hold-downs, straps and connector install | 16,900 | D-182 |
| J-2107 | P2 | Sunrise Site Cleanup | Framing debris haul-off, three loads | 12,300 | D-150 |
| J-2109 | P3 | Delgado Crane Service | Crane set — second-floor beams | 9,850 | D-42 |
| J-2112 | P1 | Ironwood Truss Setting | Truss set — Buildings A, B and C | 41,600 | D-104 |
| J-2114 | P1 | Baseline Shear & Sheathing | Shear package, all buildings | 57,300 | D-100 |
| J-2116 | P1 | Nolan Hardware & Hold-Downs | Hold-down and strap install, all buildings | 38,900 | D-92 |
| J-2118 | P1 | Sunrise Site Cleanup | Weekly cleanup and haul-off, eight weeks | 26,400 | D-64 |
| J-2121 | P2 | Baseline Shear & Sheathing | Roof sheathing and edge nailing | 21,700 | D-160 |
| J-2123 | P2 | Sunrise Site Cleanup | Final framing clean | 4,600 | D-96 |
| J-2126 | P5 | Delgado Crane Service | Crane and rigging — podium beam set | 23,900 | D-11 |
| J-2128 | P5 | Ironwood Truss Setting | Podium deck joist and truss set | 15,400 | D-15 |
| J-2130 | P1 | Baseline Shear & Sheathing | Building C shear and sheathing, Levels 2–3 | 28,900 | D-70 |
| J-2132 | P1 | Ironwood Truss Setting | Buildings B and C roof truss set | 29,500 | D-56 |

**Total Jobs Cost = $368,400.** Link each job to its project's invoice via `contract_jobs`.

### 2.13 Sub payments — `payments` with `job_id`

**Paid** (`status = 'received'`, label **Completed**):

| job | amount | `date` | method | check |
|---|---|---|---|---|
| J-2101 | 18,400 | D-170 | Check | 3102 |
| J-2103 | 15,000 | D-166 | Check | 3110 |
| J-2105 | 16,900 | D-160 | Check | 3118 |
| J-2107 | 12,300 | D-130 | Check | 3155 |
| J-2121 | 21,700 | D-140 | Check | 3040 |
| J-2123 | 4,600 | D-88 | Check | 3061 |
| J-2112 | 41,600 | D-58 | ACH Transfer | — |
| J-2114 | 40,000 | D-50 | ACH Transfer | — |
| J-2132 | 29,500 | D-30 | Check | 3170 |

Paid = **$200,000**.

**Unpaid** — builds the AP aging shape and spreads across AP stages:

| job | amount | `date` | `due_date` | `status` | lands in |
|---|---|---|---|---|---|
| J-2103 (remainder) | 7,750 | D-20 | D-9 | `scheduled` | 0-30 |
| J-2118 | 26,400 | D-30 | D-19 | `scheduled` | 0-30 |
| J-2126 | 23,900 | D-11 | **D+14** | `outstanding` | 0-30 |
| J-2130 | 28,900 | D-20 | D-8 | `outstanding` | 0-30 |
| J-2114 (remainder) | 17,300 | D-50 | D-38 | `requested` | 31-60 |
| J-2116 | 38,900 | D-78 | D-66 | `outstanding` | 61-90 |
| J-2109 | 9,850 | D-112 | D-101 | `outstanding` | 91-120 |
| J-2128 | 15,400 | D-142 | D-131 | `requested` | 120+ |

Unpaid jobs = **$168,400** (368,400 − 200,000 ✓).

### 2.14 Material invoices — `material_invoices` + `material_items` (8)

| `invoice_number` | supplier | linked invoice (project) | `job_id` | `invoice_date` | `due_date` | `subtotal` | `tax` | `total` |
|---|---|---|---|---|---|---|---|---|
| M-88412 | Sun Valley Lumber | 1024 (P2) | J-2103 | D-192 | D-162 | 12,880 | 1,224 | **14,104** |
| M-88690 | Coast Fastener | 1024 (P2) | J-2105 | D-185 | D-155 | 8,410 | 799 | **9,209** |
| M-90121 | Pacific Truss | 1024 (P2) | J-2101 | D-188 | D-158 | 24,500 | 2,328 | **26,828** |
| M-89044 | Pacific Truss | 1033 (P1) | J-2112 | D-102 | **D-72** | 21,300 | 2,024 | **23,324** |
| M-89310 | Sun Valley Lumber | 1033 (P1) | J-2114 | D-99 | D-69 | 17,650 | 1,677 | **19,327** |
| M-89755 | Anderson Engineered Wood | 1029 (P1) | — | D-60 | **D-30** | 6,940 | 659 | **7,599** |
| M-89902 | Sun Valley Lumber | 1033 (P1) | J-2130 | D-68 | **D-38** | 34,900 | 3,316 | **38,216** |
| M-90588 | Sun Valley Lumber | 1037 (P5) | J-2128 | D-10 | **D+20** | 4,260 | 405 | **4,665** |

**Total Materials Cost = $143,272.** Give each 3–5 `material_items` rows with real framing SKUs (e.g. `2x6 DF #2 16'`, qty 480, unit `EA`, unit_price 18.40; `7/16" OSB 4x8`, qty 320, `SHT`, 21.75; `Simpson HDU5-SDS2.5`, qty 46, `EA`, 38.10; `1-3/4"x11-7/8" LVL 20'`, qty 12, `EA`, 214.00).

**Material payments** (`payments` with `material_invoice_id`, `status = 'received'`): M-88412 14,104 (D-170, chk 3125) · M-88690 9,209 (D-165, chk 3126) · M-90121 26,828 (D-155, chk 3045) · M-89310 19,327 (D-40, ACH). Paid = **$69,468**.

**Unpaid materials**, via `material_invoice_payment_schedule` + `payments`: M-89044 23,324 (`scheduled`, due D-72 → 61-90) · M-89755 7,599 (`outstanding`, due D-30 → 0-30) · M-89902 38,216 (`scheduled`, due D-38 → 31-60) · M-90588 4,665 (`outstanding`, due D+20 → 0-30). Unpaid = **$73,804** (143,272 − 69,468 ✓).

### 2.15 Miscellaneous and pre-jobs

`misc_payments` on P1 (always treated as already paid — `projectFinancials.ts:33`):
- `Temporary power pole, permit and monthly service` — 2,450 — D-100
- `Portable toilet and washstation rental, four months` — 1,180 — D-70

Misc = **$3,630**.

`pre_jobs` on P1 (uncommitted estimates — excluded from cost and margin, surfaced separately as `pendingCost`; `projectFinancials.ts:11`):
- `Level 3 stair framing — pending structural` — Baseline Shear & Sheathing — 12,400 — D-14
- `Parapet and roof screen framing — pending owner decision` — Ironwood Truss Setting — 6,800 — D-9

Pending = **$19,200**. This makes Chapter 16's Overall Margin tooltip read the long form (`ProjectDetailPage.tsx:2001-2003`): *"Pending pre-jobs of $19,200.00 are uncommitted estimates and are excluded; including them the margin would be $45,404.00."*

### 2.16 Time entries — `time_entries`

Seed **20 working days**, D-28 through D-1, weekdays only, 5 crew, 7.5 h/day (clock in 06:45, clock out 15:15, 30 min lunch), with `clock_in_address` / `clock_out_address` set to the project street address and plausible `lat`/`lng`.

Distribution — tune entry counts to hit these labour totals:

| project | target labour | ≈ hours |
|---|---|---|
| P1 | **$18,450** | ~460 |
| P2 | $3,600 | ~90 |
| P3 | $4,000 | ~100 |
| P4 | **$4,000** | ~100 |

Include **two overtime days** (10 h) in the last week so the Time Dashboard's `Overtime cost` column has content. **Leave the recording user (`ray@`) not clocked in**, so Chapter 27 opens on the `Clock in` card rather than `On the clock` (`TimeTrackingClockPage.tsx:230`).

Also seed 6–8 `project_photos` on P1 and P4 (framing progress shots) so Chapter 8's photos section is not empty.

### 2.17 Price list — `price_lists`, `line_items`, `line_item_prices`, `assemblies`

Two price lists so Chapter 5's **Copy prices** button renders (`ScopesSection.tsx:461` — `{lists.length > 1 && …}`):
- **`Standard 2026`** — `is_default = true`
- **`Harborview Contract Rates`** — the volume-builder list

| `line_items.name` | Standard 2026 | Harborview |
|---|---|---|
| Wall framing — 2x6 exterior, 16" on center (per LF) | 42.00 | 38.50 |
| Wall framing — 2x4 interior, 16" on center (per LF) | 31.00 | 28.00 |
| Floor system — I-joist install over prepped foundation (per SF) | 6.40 | 5.85 |
| Roof truss setting — single story (per SF) | 4.75 | 4.30 |
| Roof framing — conventional cut and stack (per SF) | 9.20 | 8.40 |
| Shear wall — sheathe, nail and inspect (per SF) | 5.60 | 5.10 |
| Hold-down and strap installation (each) | 96.00 | 88.00 |
| Beam and post set — LVL or PSL up to 24 feet (each) | 780.00 | 715.00 |
| Stair framing — straight run, up to 14 risers (each) | 2,150.00 | 1,980.00 |
| Window and door bucks — rough opening framing (each) | 118.00 | 105.00 |
| Backing and blocking for finishes (per LF) | 7.80 | 7.10 |
| Framing punch and deficiency correction (per hour) | 96.00 | 88.00 |

Give each `line_items.description` 2–4 bullets (the field is JSON; the editor calls them bullets — `ScopesSection.tsx:794` `addLabel="Add bullet"`).

`assemblies` (labelled **Assemblies** in the UI; the picker button reads **Add Assembly** — `ScopeSetPicker.tsx:82-83`):
- **`Single-family framing package`** → items 1, 2, 3, 5, 6, 7, 10, 11
- **`Multifamily podium package`** → items 1, 2, 3, 4, 6, 7, 8, 11

### 2.18 Estimates — `contracts` where `kind = 'estimate'` (3)

Estimates read from `contracts` filtered on `kind = 'estimate'` (`SentEstimatesPage.tsx:66-69`); **won** is `converted_contract_id` being set, **lost** is `status = 'lost'`, **open** is `status = 'open'` (`SentEstimatesPage.tsx:147-162`).

| `contract_number` | customer | project | `title` | `total_amount` | state | `created_at` |
|---|---|---|---|---|---|---|
| E-4468 | Harborview Property Group | P5 | Vanowen St 8-Unit — podium deck and Level 1 framing | 52,300 | **won** — `converted_contract_id` → invoice 1037, `status = 'approved'` | D-38 |
| E-4471 | Brightline Builders | P4 | Culver Mixed-Use — podium framing, all levels | 164,750 | **open** — `status = 'open'`, `require_signature = true`, unsigned | D-31 |
| E-4465 | Cypress Ridge Construction | — | Altadena spec home — complete framing package | 91,800 | **lost** — `status = 'lost'` | D-64 |

E-4471 is the estimate the Chapter 9 invoice bills against, which gives Part 4 a beginning that predates the camera.

**Value note:** a `converted` estimate is `superseded` and contributes 0 (`financialModel.ts:191`); an unaccepted estimate contributes 0 (`financialModel.ts:200-202`); a `lost` estimate contributes 0. So none of the three touches Total Projects Value. Correct — and worth one narrated sentence in Chapter 24.

### 2.19 Estimate requests and received estimates

`estimate_requests` + `estimate_request_recipients`:

| subject | project | `sent_at` | `due_date` | recipients | responded |
|---|---|---|---|---|---|
| `Crane and rigging — Culver podium beam set` | P4 | D-13 | D-6 | Delgado Crane Service, Ironwood Truss Setting, Baseline Shear & Sheathing | 2 of 3 |
| `Roof truss set — Harborview Camarillo Buildings A to C` | P1 | D-118 | D-111 | Ironwood Truss Setting, Pacific Truss Company, Baseline Shear & Sheathing | 3 of 3 |

`job_offers` (Received Estimates):

| contractor | `scope` | `amount` | `is_winner` | linked |
|---|---|---|---|---|
| Delgado Crane Service | Crane and rigging — Culver podium beam set | 23,900 | **true** | `pre_job_id` on P4 (becomes the on-camera job in Ch 14) |
| Ironwood Truss Setting | Crane and rigging — Culver podium beam set | 27,400 | false | — |
| Baseline Shear & Sheathing | Crane and rigging — Culver podium beam set | 31,200 | false | — |
| Ironwood Truss Setting | Truss set — Buildings A, B and C | 41,600 | **true** | J-2112 |
| Baseline Shear & Sheathing | Truss set — Buildings A, B and C | 46,900 | false | — |

`material_quotes`: Pacific Truss 21,300 (`is_winner = true`, → M-89044) and Sun Valley Lumber 24,850 (false), both scoped `Truss package — Buildings A to C`.

### 2.20 My Tasks rules — `my_task_rules` (for `ray@`)

The dashboard's My Tasks pane is rule-driven and empty without rows. **I did not verify the `object_type` vocabulary** — read `src/components/settings/MyTasksRuleDialog.tsx` (the `OBJECT_TYPE_LABELS` map referenced at line 201) before writing these. Intent:

- Overdue receivable — status `ar_outstanding`, `overdue_days = 30`, label `Chase overdue invoice`
- Payment waiting on approval — AP status `requested`, label `Approve payment request`
- Document sent and unsigned — status `sent`, `min_age_days = 3`, label `Chase unsigned invoice`

Target 5–8 resulting tasks. Any more and the pane needs scrolling inside a 40-second clip.

### 2.21 What the seeded data computes to (all app-computed, not stored)

Verify these on screen before the voice-over is cut. If any is off, the seed is wrong, not the narration.

**Dashboard, row 1** (`DashboardPage.tsx:440-476`):

| Tile | Value |
|---|---|
| Total Projects Value | **$606,550** |
| Outstanding Balance | **$218,725** |
| Scheduled Balance | **$200,125** |
| Received Amount | **$387,825** |

**Dashboard, row 2** (`DashboardPage.tsx:481-524`):

| Tile | Value |
|---|---|
| Total Jobs & Materials | **$511,672** |
| Outstanding Jobs & Materials | **$242,204** |
| Total Jobs Cost | **$368,400** |
| Total Materials Cost | **$143,272** |
| Outstanding Jobs | **$168,400** |
| Outstanding Materials | **$73,804** |

**AR aging strip** (`AccountsReceivablePage.tsx:1567-1571`): 0-30 **$69,800** · 31-60 **$29,600** · 61-90 **$61,500** · 91-120 **$18,100** · 120+ **$21,125** · Undated **$0**.

**AR status tiles**: Outstanding Amount **$76,875** (1024's 21,125 + 1029's 29,600 + 1037's 26,150) · Requested Amount **$123,250** · Received Amount **$387,825**.

**AP aging strip**: 0-30 **$99,214** · 31-60 **$55,516** · 61-90 **$62,224** · 91-120 **$9,850** · 120+ **$15,400**. Sum $242,204 ✓

**P1 project header — Chapter 16's four cards** (`projectFinancials.ts:70-131`):

| Card | Value | Working |
|---|---|---|
| **Project Value** | **$397,750** | 118,400 + 14,750 + 246,000 + 18,600 |
| **Cash Position** | **$397,750** | received **$273,300** (68.7%) / outstanding **$124,450** (31.3%) |
| **Overall Margin** | **$64,604** | 397,750 − (jobs 222,600 + materials 88,466 + misc 3,630 + labour 18,450 = 333,146) → **16.2%** |
| **Cash Profit to Date** | **$120,793** | 273,300 − (jobs paid 111,100 + materials paid 19,327 + misc 3,630 + labour 18,450 = 152,507) |

Overall Margin tooltip long form: pending pre-jobs $19,200 excluded; including them the margin would be $45,404.

> **Note a stale tooltip.** The Overall Margin tooltip says "Project Value − (Jobs + Materials + Misc)" (`ProjectDetailPage.tsx:2002-2004`) but `projectFinancials.ts:100` computes `totalProjectCost = jobsCost + materialsCost + miscCost + laborCost` — **labour is included**. The Cost Breakdown tooltip at `ProjectDetailPage.tsx:2238` gets it right. Chapter 16's narration follows the code, and the tooltip should be fixed separately.

---

## 3. Demo data — created on camera

### 3.0 The recorder needs two new primitives first

Chapters 9, 10 and 13 type into form fields. `record.mjs` has no typing primitive. Add:

```js
async type(text, msPerChar = 55) { /* page.keyboard.type with per-char delay */ },
async press(key) { /* page.keyboard.press */ },
```

`d.moveToEl(sel) → d.click() → d.type('…')` is then a complete field-fill gesture. Everything else in this spec is expressible in the existing five primitives.

### 3.1 Ordered list of on-camera mutations

All on **P4 — Brightline — Culver Mixed-Use Podium**, which is seeded with nothing but a customer, an address and time entries.

| Ch | Action | Exact values typed |
|---|---|---|
| 9 | Open **Add Invoice** on P4 | — |
| 9 | `Invoice Name` | `Podium framing — Levels 1 to 3` |
| 9 | `Date` | leave as today's default |
| 9 | `Invoice Number` | **leave blank** — placeholder reads `Auto-assigned if blank`; the RPC assigns it. Put the RPC's actual return value in the cue table (see §2.2). |
| 9 | Tick **Require Signature** | — |
| 9 | **Add Assembly** → `Multifamily podium package` | pulls 8 priced line items |
| 9 | Edit quantity on `Roof truss setting — single story (per SF)` | `9200` |
| 9 | **Add Payment** ×3, then type descriptions/amounts | `Deposit on execution` `65900` · `Level 1 and 2 complete` `65900` · `Final — Level 3 complete and inspected` `32950` |
| 9 | Click **Create & Open Signing Editor** | invoice total **$164,750** |
| 10 | In the full-screen editor: **Add signee** | Name `Jen Okafor`, Email `j.okafor@brightlinebuilders.com` |
| 10 | Confirm **Require signature** and **Require initials** are checked | — |
| 11 | Click **Save & Send to Customer** | **sends a real email** — see Risk R-3 |
| 11 | Cut to `/sign/contract/<token>` in a second browser context | customer draws a signature, clicks submit |
| 12 | Back in `/invoices`, row action → counter-sign | uses `ray@`'s saved signature |
| 13 | On P4's Payment Schedule, record against `Deposit on execution` | Amount `65900`, Date today, Method `Check`, Check # `2214`, advance to **Received** |
| 14 | **Add Job** on P4 | Contractor `Delgado Crane Service`, Job Name `Crane and rigging — podium beam set`, Total `23900`, Date today |
| 15 | **Add** a material invoice on P4 | Supplier `Sun Valley Lumber & Supply`, Invoice # `M-90941`, Invoice date today, Due date `today + 30`, subtotal `31400`, tax `2983`, total **`34383`** |

### 3.2 Reset between takes

Every row above mutates the company. Take a Postgres snapshot of Summit Crest immediately after seeding and restore it before each Part 4 take.

| Table | Rows to delete on reset |
|---|---|
| `contracts` | the P4 invoice (kind `invoice`) |
| `contract_line_items`, `contract_payment_schedule`, `contract_payments` | its children |
| `contract_signees` / `change_order_signees` | the Jen Okafor signee |
| `signing_placeholders` | auto-captured field boxes |
| `document_attachments` | the generated and the flattened signed PDF |
| `jobs`, `contract_jobs`, `payments` | the crane job and any payment against it |
| `material_invoices`, `material_items`, `material_invoice_payment_schedule` | M-90941 |
| `email_send_log`, `email_send_state` | the signature-invite email — **otherwise Chapter 28 shows six identical invites from six takes** |
| `audit_log` | optional; only matters if Chapter 29 opens the Audit Trail tab |

Do **not** rely on soft deletes: `deleted_at IS NOT NULL` rows still surface in Settings → Trash, and the invoice number is consumed either way, so the number shown in Chapter 9 will drift take to take. Hard-restore the snapshot.

---

## 4. Per-chapter action script

Format: **cue** (seconds from timeline zero, which `d.reset()` sets after a 4.5 s hydrate) → **primitive** → **target** → **what the viewer sees**.

Conventions used throughout, and why:
- Page titles rendered by `PageTableHeader` → `d.moveToEl('h2')`, never `moveToText` (§0.4).
- Icon buttons → `d.moveToEl('button:has-text("…")')`.
- `StatCard` titles and `TableSectionHeader` titles are leaves → `d.moveToText('…')` is fine.
- Every chapter ends with a ~1.5 s tail after the last narrated word.

Labels marked **[unverified]** are ones I could not pin to a file:line; check them before you build the timeline.

---

### Ch 1 — What Kablanet does for you · `/dashboard` · 0:45

Narration (117 words ≈ 45 s): *"This is Kablanet. It is one place for the money side of your business — what you have billed, what has been paid, what you still owe your subs and your suppliers, and what each job actually left you. Everything on this screen is calculated from what you entered once. Total Projects Value is everything on your books. Outstanding Balance is what customers still owe you. Total Jobs and Materials is what you have committed to spend. You will not find a spreadsheet behind any of these numbers. Over the next few minutes we will set the app up, run one invoice from start to finish, and then walk every screen."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.4)` | — | Dashboard settled, cursor centre |
| 3.4 | `d.moveTo(720, 300, 900)` | — | Drift toward the tile row |
| 11.5 | `d.moveToText('Total Projects Value', 700)` | leaf `<p>` (`StatCard.tsx:70`) | hover `$606,550` |
| 16.0 | `d.moveToText('Outstanding Balance', 700)` | | hover `$218,725` |
| 21.5 | `d.moveToText('Total Jobs & Materials', 750)` | | hover `$511,672` |
| 28.0 | `d.scrollTo(420, 1200)` | | Financial Health chart enters frame |
| 34.0 | `d.scrollTo(0, 900)` | | back to the tiles |
| 38.0 | `d.moveTo(720, 240, 700)` | | rest |
| 43.5 | `d.until(45.0)` | | tail |

---

### Ch 2 — Finding your way around · `/dashboard` · 0:35

Narration (91 words): *"Everything lives on the left. Dashboard, Customers, Projects, then the money screens — Invoices, Accounts Receivable, Payments on one side, Jobs, Contractors, Suppliers and Accounts Payable on the other. Open Projects and your live jobs are listed right there, grouped under the customer they belong to, so you can jump into a job from anywhere without going back to a list. Estimates and Time Tracking each open into their own group. Help is at the bottom. That is the whole app."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(2.8)` | — | rest |
| 2.8 | `d.moveToText('Dashboard', 700)` | sidebar `<span>` (`AppSidebar.tsx:527`) | hover |
| 5.0 | `d.moveToText('Customers', 500)` | | |
| 7.0 | `d.moveToText('Projects', 500)` | | |
| 9.5 | `d.moveToText('Invoices', 500)` | **invoice mode label** (`AppSidebar.tsx:224`) | |
| 11.5 | `d.moveToText('Accounts Receivable', 500)` | | |
| 13.5 | `d.moveToText('Payments', 500)` | | |
| 15.5 | `d.moveToText('Jobs', 500)` | | |
| 17.0 | `d.moveToText('Contractors', 450)` | | |
| 18.5 | `d.moveToText('Suppliers', 450)` | | |
| 20.0 | `d.moveToText('Accounts Payable', 450)` | | |
| 22.0 | `d.moveToEl('[aria-expanded] svg.lucide-chevron-right', 600)` **[unverified selector]** | Projects collapsible trigger (`AppSidebar.tsx:416-420`) | |
| 23.0 | `d.click()` | | Projects tree expands: **Harborview Property Group** group with **Harborview — Camarillo St 12-Unit** and **Harborview — Vanowen St 8-Unit** nested; the other four active projects flat |
| 26.0 | `d.moveToText('Harborview Property Group', 700)` | customer group label (`AppSidebar.tsx:459`) | |
| 29.0 | `d.moveToText('Estimates', 600)` | collapsible group label (`AppSidebar.tsx:243`) | |
| 31.0 | `d.moveToText('Time Tracking', 500)` | (`AppSidebar.tsx:237`) | |
| 32.5 | `d.moveToText('Help', 500)` | | |
| 34.0 | `d.until(35.5)` | | tail |

---

### Ch 3 — Your company details · `/settings?tab=system` · 0:40

Narration (104 words): *"Start here. Your company details print on every invoice you send, so it is worth ten minutes getting them right before you bill anyone. Name, street address, city, state and ZIP. Your phone numbers. Your tax ID and your license number, with the date it expires — that one matters, because it prints on the document. Drop your logo in at the top and it appears on everything automatically. Hit Save Settings and you are done. You will not come back to this screen often, but everything you send out reads better because you filled it in."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | System tab open on **Company Details** (`SystemSettingsTab.tsx:296`) |
| 3.0 | `d.moveToText('Company Details', 800)` | `CardTitle` leaf | |
| 8.0 | `d.moveToEl('#companyName', 700)` | `Company Name` input (`:330-335`) | `Summit Crest Builders` |
| 11.5 | `d.moveToEl('#companyAddress', 600)` | `Street Address` (`:342-347`) | `2255 Ventura Blvd., Suite 410` |
| 14.0 | `d.moveToEl('#companyCity', 450)` | `City` (`:353`) | `Sherman Oaks` |
| 15.5 | `d.moveToEl('#companyState', 350)` | `State` (`:357`) | `CA` |
| 16.5 | `d.moveToEl('#companyZip', 350)` | `ZIP` (`:361`) | `91403` |
| 18.5 | `d.moveToEl('#companyPhone', 550)` | `Primary Phone` (`:370-371`) | `(818) 555-2040` |
| 22.0 | `d.moveToEl('#companyTaxId', 600)` | `Tax ID / EIN` (`:395-396`) | `47-3319085` |
| 24.5 | `d.moveToEl('#companyLicense', 500)` | `License Number` (`:399-400`) | `CSLB 1084427` |
| 27.0 | `d.moveToEl('#companyLicenseExpires', 450)` | `License Expires` (`:403`) | |
| 30.0 | `d.moveToEl('#companyLogo', 800)` | logo upload (`:321`) | logo thumbnail |
| 35.0 | `d.scrollTo(900, 900)` | | Save button enters frame |
| 36.5 | `d.moveToEl('button:has-text("Save Settings")', 600)` **[unverified label]** — read `SystemSettingsTab.tsx:522-525` | | |
| 38.5 | `d.until(40.0)` | | tail. **Do not click Save** — nothing changed and a toast would fire. |

---

### Ch 4 — Your signature · `/settings?tab=user` · 0:35

Narration (90 words): *"On the User Settings tab you save your signature. Draw it with a finger or a mouse, or upload a photo of it, and Kablanet keeps it. From then on, signing a document takes one click instead of print, sign, scan. Save your initials in the box beside it — some documents ask you to initial every page. Below that is your email signature, which gets added to the messages the app sends for you. And this is also where you change your password, so do both while you are here."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | User Settings tab |
| 3.0 | `d.moveToText('Signature', 800)` | `CardTitle` — **note: `CardTitle` wraps an `<svg>` + text, so it is not a leaf.** Use `d.moveToEl('h3:has-text("Signature")')` **[verify the CardTitle element tag]** | |
| 6.5 | `d.moveToEl('img[alt="Saved signature"]', 800)` | (`UserSettingsTab.tsx:227`) | Ray Ellison's signature |
| 13.0 | `d.moveToEl('button:has-text("Edit signature")', 700)` | (`:235-238`) | |
| 18.0 | `d.moveToEl('img[alt="Saved initials"]', 700)` | (`:250`) | `RE` |
| 22.0 | `d.scrollTo(360, 900)` | | Email Signature card |
| 24.0 | `d.moveToText('Email Signature', 600)` **[not a leaf — use `moveToEl`]** | (`:275`) | |
| 28.0 | `d.moveToText('Change Password', 700)` **[not a leaf — use `moveToEl`]** | (`:293-296`) | right column |
| 32.5 | `d.until(35.0)` | | tail |

---

### Ch 5 — Your price list · `/price-list` · 0:40

Narration (104 words): *"Your price list is your standard scopes and your rates, written down once. Add a line item — the wording you would put on an invoice — and the price you normally charge. Do the ones you quote every week first; you do not need a full catalogue to start. You can keep a second list for a builder who has negotiated rates, and copy prices between them. Group the items that always go together into an assembly, and you can pull a whole framing package into an invoice in one click. Or import your existing list from a spreadsheet."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | `Price List` heading + `Price lists, line items and assemblies` (`PriceListPage.tsx:12-13`) |
| 3.0 | `d.moveToEl('h1', 700)` | | |
| 7.0 | `d.moveToText('Standard 2026', 700)` | Price Lists card row | |
| 12.0 | `d.scrollTo(300, 1000)` | | **Line Items** card (`ScopesSection.tsx:436-438`) |
| 14.0 | `d.moveToEl('button:has-text("Add Line Item")', 650)` | (`:448-450`) | |
| 18.5 | `d.moveToText('Wall framing — 2x6 exterior, 16" on center (per LF)', 800)` | | `$42.00` / `$38.50` |
| 24.0 | `d.moveToText('Harborview Contract Rates', 700)` | second price column header | |
| 27.0 | `d.moveToEl('button:has-text("Copy prices")', 600)` | (`:461-464`) | |
| 30.0 | `d.scrollTo(950, 1100)` | | **Assemblies** card (`ScopeSetsSection.tsx:70-73`) |
| 32.0 | `d.moveToText('Multifamily podium package', 700)` | | 8 items |
| 36.0 | `d.moveToEl('button:has-text("Import CSV")', 600)` | (`:451-453`) | |
| 38.5 | `d.until(40.0)` | | tail |

---

### Ch 6 — The dashboard · `/dashboard` · 0:40

Rewritten from `pages.json` `dashboard`. **Two corrections:** the tile order on screen is Total Projects Value → **Outstanding Balance** → **Scheduled Balance** → Received Amount (`DashboardPage.tsx:440, 448, 463, 471`), not the order the old script reads them in; and the section below the tiles is **Financial Health** first, then **My Tasks**, then **Projects** (`:541, 568, 590`), not "projects and your task list."

Narration (105 words): *"This is your dashboard. The top row is your customer money. Total Projects Value is everything on your books. Outstanding Balance is what is still owed to you. Scheduled Balance is the part of that already sitting on a payment schedule — the gap between the two is work you have billed but not scheduled yet. Received Amount is what has landed. The second row is the other direction: what you have committed to your subs and suppliers, and how much of it you still owe. Below that, Financial Health, your task list, and every open project with its balance."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.2)` | — | rest |
| 3.2 | `d.moveToText('Total Projects Value', 800)` | | `$606,550` |
| 7.5 | `d.moveToText('Outstanding Balance', 700)` | | `$218,725` |
| 11.5 | `d.moveToText('Scheduled Balance', 700)` | | `$200,125` |
| 17.5 | `d.moveToText('Received Amount', 700)` | | `$387,825` |
| 21.5 | `d.moveToText('Total Jobs & Materials', 750)` | | `$511,672` |
| 25.5 | `d.moveToText('Outstanding Jobs & Materials', 650)` | | `$242,204` |
| 29.5 | `d.scrollTo(520, 1200)` | | **Financial Health** header + Cash Flow chart (`FinancialOverviewPane.tsx:253`) |
| 33.0 | `d.scrollTo(1050, 1000)` | | **My Tasks**, then **Projects (6 projects)** |
| 36.5 | `d.moveToEl('table tbody tr', 700)` | first projects row | |
| 38.5 | `d.until(40.0)` | | tail |

---

### Ch 7 — Projects · `/projects` · 0:35

Narration (92 words): *"Projects is one row per job you are running. Project name, address, how many jobs you have handed out on it, the total, what has been paid and what is still owed. The footer adds it up. Flip Show Inactive and your finished jobs come back into the list. Your live projects also sit down the left menu, so you can jump straight into one from anywhere. Almost everything else in Kablanet hangs off a project, so this is usually where you start."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | `Projects (5)` (`ProjectsPage.tsx:573`) |
| 3.0 | `d.moveToEl('h2', 700)` | | |
| 6.5 | `d.moveToText('Harborview — Camarillo St 12-Unit', 800)` | first row, `Project` column (`:517`) | |
| 11.0 | `d.moveToText('Total', 550)` | `<th>` (`:522`) | |
| 13.5 | `d.moveToText('Paid', 450)` | (`:529`) | |
| 15.5 | `d.moveToText('Balance', 450)` | (`:536`) | |
| 18.5 | `d.moveToEl('tfoot tr', 700)` | footer totals row (`:646-660`) | |
| 22.0 | `d.moveToEl('#show-inactive', 650)` | Switch (`:578`) | |
| 23.5 | `d.click()` | | **Cypress Ridge — Del Mar Remodel** appears; count → `(6)` |
| 27.0 | `d.moveToText('Projects', 700)` | sidebar item | |
| 31.0 | `d.moveToEl('#show-inactive', 500)`; `d.click()` | | reset for the next take |
| 33.5 | `d.until(35.0)` | | tail |

---

### Ch 7a — Customers · `/customers` · 0:35 *(optional — see §1.1)*

Narration (89 words): *"Customers is everyone you bill — builders, developers, general contractors, and the occasional homeowner. Open one and you get their projects, everything you have invoiced them, and what is still outstanding, so you can answer where do I stand with this builder in a couple of seconds. Add a new one with Add Customer, and their contact details flow straight onto the documents you send them. If most of your work comes through two or three builders, this list stays short, and that is fine."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | `Customers (4)` (`CustomersPage.tsx:378`) |
| 3.0 | `d.moveToEl('h2', 700)` | | |
| 7.0 | `d.moveToText('Harborview Property Group', 750)` | | |
| 10.0 | `d.click()` | | detail view opens |
| 15.0 | `d.scrollTo(300, 900)` | | projects + invoiced + outstanding |
| 24.0 | `d.moveToEl('button:has-text("Add Customer")', 700)` | `addLabel` (`:409`) | |
| 32.5 | `d.until(35.0)` | | tail |

---

### Ch 8 — Inside a project · `/projects/<P1>` · 0:40

Narration (105 words): *"Open a project and the whole job is on one page. Across the top, what it is worth and where the money stands. Then Project Details. Invoices holds everything you have billed on this job with the payment schedule underneath it. Labor, Materials and AP is the money going out — the jobs you handed to your subs, your material invoices, your crew's hours, and anything miscellaneous. Estimates is what you quoted. And at the bottom, your subs, your suppliers, your site photos and every document attached to the job. One page, both directions."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.4)` | — | P1 loaded, sticky KPI bar pinned |
| 3.4 | `d.moveTo(720, 200, 800)` | | across the four KPI cards |
| 8.0 | `d.moveToText('Project Details', 700)` | `ProjectPane` title (`:2021`) | |
| 12.0 | `d.scrollTo(520, 1200)` | | **Cost Breakdown** (`:2152`) |
| 14.5 | `d.moveToText('Invoices', 700)` | pane title — `docTerms.plural` in invoice mode (`:2330`) | |
| 18.0 | `d.scrollTo(1150, 1200)` | | invoices table: 4 rows, `Invoice #` / `Name` / `Total` / `Scheduled` / `Paid` / `Balance` / `Signing Status` |
| 21.0 | `d.moveToText('Payment Schedule', 700)` | `TableSectionHeader` leaf `<span>` (`PaymentScheduleSection.tsx:1135`) | |
| 25.0 | `d.scrollTo(1950, 1300)` | | **Labor, Materials, and AP** (`:2400`) |
| 27.5 | `d.moveToText('Jobs', 600)` | (`JobsSection.tsx:382`) | |
| 30.0 | `d.moveToText('Materials', 600)` | (`MaterialsSection.tsx:739`) | |
| 33.0 | `d.scrollTo(2900, 1300)` | | **Estimates**, then **Contractors, Suppliers, and Documents** (`:2543, 2548`) |
| 37.0 | `d.moveToText('Project Documents', 700)` | (`:2567`) | |
| 38.5 | `d.until(40.0)` | | tail |

---

### Ch 9 — Raise the invoice · `/projects/<P4>` · 0:40

Narration (104 words): *"You bill from the project, not from a blank page. Add Invoice. Give it a name — Podium framing, Levels one to three. Leave the number blank and Kablanet assigns the next one. Now the pricing: instead of typing scopes out, pull an assembly straight off your price list and the whole package drops in, priced. Adjust a quantity where you need to. Under that, the payment schedule — the phases you will actually bill, and when. Tick Require Signature and saving opens the signing editor. The lines add up to what the invoice is worth."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(2.6)` | — | P4, empty: `Invoices (0)`, `No contracts yet` (`ContractsSection.tsx:3103`) |
| 2.6 | `d.moveToEl('button:has-text("Add Invoice")', 700)` | (`:3026-3029`) | |
| 4.0 | `d.click()` | | dialog `Add New Invoice` (`ContractDialog.tsx:262-266`) |
| 7.0 | `d.moveToEl('input[placeholder^="e.g. Plans"]', 700)`; `d.click()`; `d.type('Podium framing — Levels 1 to 3')` | `Invoice Name` (`:375-380`) | |
| 13.0 | `d.moveToEl('input[placeholder="Auto-assigned if blank"]', 600)` | `Invoice Number` (`:355-359`) | left blank |
| 17.0 | `d.moveToEl('button:has-text("Add Assembly")', 700)` | (`ScopeSetPicker.tsx:82-83`) | |
| 18.5 | `d.click()` | | assembly menu |
| 20.0 | `d.moveToText('Multifamily podium package', 600)`; `d.click()` | | 8 priced rows drop in; toast `Added 8 line items from "Multifamily podium package"` |
| 24.0 | `d.scrollTo(420, 900)` | | pricing rows + running **Total** (`ContractDialog.tsx:556-562`) |
| 26.0 | `d.moveToEl('input[value="…"]', 500)`; `d.click()`; `d.type('9200')` **[verify the qty input selector]** | truss-setting qty | total climbs to **$164,750** |
| 30.0 | `d.scrollTo(880, 900)` | | **Payment Schedule** (`:566`) |
| 31.5 | `d.moveToEl('button:has-text("Add Payment")', 500)`; `d.click()` ×3, typing each description + amount | (`:569-576`) | `Deposit on execution` `65,900` · `Level 1 and 2 complete` `65,900` · `Final — Level 3 complete and inspected` `32,950` |
| 36.0 | `d.moveToEl('#require_signature', 600)`; `d.click()` | `Require Signature` (`:314-330`) | save button relabels to **`Create & Open Signing Editor`** (`:244-249`) |
| 38.5 | `d.until(40.0)` | | tail |

---

### Ch 10 — Who has to sign it · `/projects/<P4>` (signing editor) · 0:35

Narration (91 words): *"Saving opens the signing editor. This is the document your customer will actually see, built from your template with your logo and your license number on it. Down the side, Signees — the people who have to sign, in order. Add one: their name and their email. That is all they need; they do not create an account. Require signature and require initials are already on. Kablanet places the signature and initial boxes on the document for you, so you are not dragging fields around."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(1.0)` | — | continues from Ch 9 |
| 1.0 | `d.moveToEl('button:has-text("Create & Open Signing Editor")', 600)`; `d.click()` | | full-screen editor, `DialogTitle` = **`Edit Invoice`** (`ChangeOrderDialog.tsx:31-32`, `noun` resolves to `Invoice` for `kind='invoice'`) |
| 6.0 | `d.until(6.0)` | | live document preview renders on the right |
| 8.0 | `d.moveTo(1080, 320, 900)` | | across the rendered invoice: logo, company block, license |
| 14.0 | `d.scrollTo(1400, 1100)` | | **Signees** section (`SigneesSection.tsx:96`) |
| 16.0 | `d.moveToEl('button:has-text("Add signee")', 600)`; `d.click()` | (`:191-192`) | empty signee row |
| 19.0 | `d.moveToEl('input[placeholder="Full name"]', 500)`; `d.click()`; `d.type('Jen Okafor')` | (`:125`) | |
| 23.0 | `d.moveToEl('input[placeholder="email@example.com"]', 500)`; `d.click()`; `d.type('j.okafor@brightlinebuilders.com')` | (`:136`) | |
| 28.0 | `d.scrollTo(1900, 800)` | | **Require signature** / **Require initials** checkboxes (`ChangeOrderForm.tsx:2749, 2760`) |
| 30.0 | `d.moveToText('Require signature', 600)` | leaf `<div>` | both checked |
| 33.0 | `d.until(35.0)` | | tail |

---

### Ch 11 — Send it, and what your customer sees · `/invoices` → `/sign/contract/<token>` · 0:40

Narration (105 words): *"Save and Send to Customer. Kablanet emails Jen a private link and the invoice moves to awaiting her signature. Here is what she gets. It opens in her browser — no login, nothing to install, and it works on a phone, which is usually where this actually happens. She reads it, taps the signature box you placed, signs with her finger, and submits. That is it. Back in your list, the status changes on its own. You do not have to call anyone to find out whether they got it."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(1.5)` | — | continues from Ch 10 |
| 1.5 | `d.scrollTo(9999, 700)` | | editor footer |
| 2.5 | `d.moveToEl('button:has-text("Save & Send to Customer")', 700)` | (`ChangeOrderForm.tsx:3129-3143`) | |
| 4.0 | `d.click()` | | spinner → toast → dialog closes |
| 9.0 | **cut** to `/invoices` | | new row; `Signature Status` = **`Awaiting Signees`** (`signingStatus.ts:38`) |
| 12.0 | `d.moveToText('Awaiting Signees', 700)` | | |
| 16.0 | **cut** to a second browser context at `/sign/contract/<token>` at **390×844** | `SignContractTokenPage` (`App.tsx:350`) | phone-shaped customer view |
| 20.0 | `d.scrollTo(600, 1400)` | | the invoice, scrolled |
| 26.0 | `d.moveToEl('.signing-field-next', 700)` **[verify class]** — the amber next-field highlight is owned by `SIGNING_FIELD_NEXT_CLASS` in `src/lib/signatureInkRect.ts` | | |
| 27.5 | `d.click()` | | signature pad |
| 30.0 | draw + submit | | |
| 34.0 | **cut** back to `/invoices` | | `Signature Status` → **`Awaiting Counter-Sign`** (`signingStatus.ts:40`) |
| 38.0 | `d.until(40.0)` | | tail |

---

### Ch 12 — You sign it back · `/invoices` · 0:40

**This replaces `flow.json` `flow-4`, whose central claim is false on this build.** See §0.3 and Risk R-1.

Narration (106 words, pending the live check in R-1): *"Your turn. Counter-sign, using the signature you saved in Settings, and Kablanet flattens both signatures into one final PDF and files it against the job. Status reads Fully Executed. Now the part worth knowing. Until an invoice you marked Require Signature is signed by both sides, it is not counted as an authoritative document — it sits in your list with a badge telling you it is excluded from your totals. The moment you counter-sign, its value lands on your dashboard and its unpaid amount lands in your receivables. If you sign outside the system, untick Require Signature and it counts straight away."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(2.6)` | — | `/invoices`, P4 row awaiting counter-sign |
| 2.6 | `d.moveToEl('tbody tr:first-child button[title="Counter-sign"]', 700)` **[verify title]** — the row action list is at `ContractsSection.tsx:435` (`{ label: 'Counter-sign' }`) | | |
| 4.0 | `d.click()` | | `ChangeOrderCounterSignDialog` |
| 8.0 | `d.moveToEl('img[alt*="signature" i]', 700)` **[unverified]** | saved-signature one-tap option (`UserSettingsTab.tsx:217-218` describes it) | |
| 10.0 | `d.click()` | | signature drops in |
| 13.0 | `d.moveToEl('button:has-text("Sign")', 600)` **[verify label]**; `d.click()` | | flatten → executed PDF |
| 18.0 | `d.until(18.0)` | | list refreshes; `Signature Status` = **`Fully Executed`** |
| 19.0 | `d.moveToText('Fully Executed', 700)` | (`signingStatus.ts:41`) | |
| 24.0 | `d.moveToText('Awaiting Signees', 800)` | **invoice 1039's row** — the seeded unsigned one | the contrasting state, still excluded |
| 30.0 | `d.moveToText('Signed outside system', 700)` | **invoice 1041's row** (`require_signature = false`) | the third state |
| 35.0 | `d.moveToEl('tbody tr:first-child button[title^="Documents"]', 600)` (`ChangeOrdersPage.tsx:845`) | | executed PDF attached |
| 38.5 | `d.until(40.0)` | | tail |

---

### Ch 13 — The money arrives · `/projects/<P4>` → `/accounts-receivable` · 0:40

Narration (105 words): *"When the deposit lands, record it once. On the project's payment schedule, find the phase, enter the amount, the date, how it came in and the check number, and mark it Received. That is the only place you type it. Everything else recalculates. The project balance drops. The dashboard's Received Amount goes up and Outstanding goes down by the same figure. And over in Accounts Receivable the row leaves the aging list, because it is no longer money you are chasing. Nothing is entered twice and nothing needs reconciling at the end of the month."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(2.4)` | — | P4, Payment Schedule visible |
| 2.4 | `d.moveToText('Deposit on execution', 700)` | schedule row `Payment Description` (`PaymentScheduleSection.tsx:541`) | |
| 4.5 | `d.moveToEl('tr:has-text("Deposit on execution") button[title*="payment" i]', 700)` **[verify title]**; `d.click()` | | payment dialog |
| 8.0 | fill: `65900` / today / `Check` / `2214` | | |
| 16.0 | `d.moveToEl('button:has-text("Save")', 600)` **[verify label]**; `d.click()` | | schedule row settles |
| 20.0 | `d.until(20.0)` | | `Balance` on the invoice row falls to `$98,850` |
| 21.0 | `d.moveTo(720, 200, 800)` | | KPI bar: Cash Position bar shifts green |
| 25.0 | **cut** to `/accounts-receivable` | | |
| 27.0 | `d.moveToText('Received Amount', 700)` | AR status tile (`AccountsReceivablePage.tsx:1545`) | `$453,725` |
| 31.0 | `d.moveToText('0-30 Days', 700)` | aging tile (`aging.ts:12`) | unchanged — the deposit never aged |
| 35.0 | **cut** to `/dashboard`; `d.moveToText('Received Amount', 700)` | | `$453,725`, Outstanding down $65,900 |
| 38.5 | `d.until(40.0)` | | tail |

---

### Ch 14 — Hand part of the work to a sub · `/projects/<P4>` · 0:35

Narration (90 words): *"You are not setting that podium beam yourself. On the same project, add a job: who is doing it, what the scope is, and what you agreed to pay them. Twenty-three nine for crane and rigging. Save it, and from that second it is a commitment — it shows as money you owe, not money you have spent. It appears against Delgado on the Contractors screen, in your Jobs list, and in Accounts Payable with its due date, without you entering it anywhere else."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(2.4)` | — | P4, **Labor, Materials, and AP** pane |
| 2.4 | `d.moveToText('Jobs', 700)` | `TableSectionHeader` (`JobsSection.tsx:382`) | `Jobs (0)` |
| 4.5 | `d.moveToEl('button:has-text("Add Job")', 650)` **[verify — project-page label; the global page uses `Add Job` at `JobsPage.tsx:672`]**; `d.click()` | | dialog |
| 8.0 | fill Contractor `Delgado Crane Service` · Job Name `Crane and rigging — podium beam set` · Total `23900` · Date today | | |
| 19.0 | `d.moveToEl('button:has-text("Save")', 600)` **[verify]**; `d.click()` | | `Jobs (1)`; `Balance` `$23,900` |
| 24.0 | **cut** to `/contractors`; `d.moveToText('Delgado Crane Service', 700)` | | Jobs / Projects / Total / Balance all up (`ContractorsList.tsx:113-121`) |
| 29.0 | **cut** to `/accounts-payable`; `d.moveToText('0-30 Days', 700)` | | the new amount, dated |
| 33.5 | `d.until(35.0)` | | tail |

---

### Ch 15 — Materials and your crew's hours · `/projects/<P4>` · 0:35

Narration (91 words): *"Same page, one section down: materials. Log the lumberyard invoice against this job — supplier, invoice number, date, due date and the total with tax. Now that cost sits on the job that used it, instead of in a general pile at the end of the month. Under that is Labor: the hours your crew clocked on this site, priced at their rate. Your subs, your materials and your own labor, all on the project that generated them."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(2.4)` | — | P4 |
| 2.4 | `d.moveToText('Materials', 700)` | (`MaterialsSection.tsx:739`) | `Materials (0)` |
| 4.5 | `d.moveToEl('button:has-text("Add")', 650)` **[verify the Materials add label]**; `d.click()` | `MaterialInvoiceDialog` | |
| 8.0 | fill Supplier `Sun Valley Lumber & Supply` · Invoice # `M-90941` · Invoice date today · Due date today+30 · Subtotal `31400` · Tax `2983` | | Total → **`$34,383`** |
| 20.0 | `d.moveToEl('button:has-text("Save")', 600)` **[verify]**; `d.click()` | | `Materials (1)`, summary `$34,383` |
| 25.0 | `d.moveToText('Labor', 700)` **[verify the ProjectLaborSection header label]** | (`ProjectDetailPage.tsx:2492`) | ~$4,000 of clocked hours |
| 30.0 | `d.scrollTo(620, 1100)` | | **Cost Breakdown** (`:2222`) now shows jobs + materials + labor |
| 33.5 | `d.until(35.0)` | | tail |

---

### Ch 16 — What the job actually left you · `/projects/<P1>` · 0:45

**The chapter the existing 29 clips are missing.** Runs on P1, a four-month-old job with rich numbers, not on the project just built from zero.

Narration (117 words): *"Here is the whole point, on a job that has been running four months. Project Value: three hundred ninety-seven thousand, seven fifty — everything you have billed on it. Cash Position splits that in two: two seventy-three has come in, a hundred twenty-four is still owed, and the bar shows you the split without doing arithmetic. Overall Margin is Project Value minus everything the job has cost you — your subs, your materials, your miscellaneous costs and your own crew's hours. Sixty-four thousand, six hundred. Cash Profit to Date is the same thing on a cash basis: money in, minus money actually out, right now. You did not build a spreadsheet. It has been true the whole time."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.4)` | — | P1, sticky KPI bar pinned (`ProjectDetailPage.tsx:1916-1919`) |
| 3.4 | `d.moveToText('Project Overview', 700)` | `SectionHeader` (`:1937`) | |
| 6.5 | `d.moveToText('Project Value', 700)` | (`:1953`) | **$397,750** |
| 13.0 | `d.moveToText('Cash Position', 700)` | (`:1961`) | **$397,750**, bar 68.7 / 31.3, `$273,300 received` · `$124,450 outstanding` (`:1994-1999`) |
| 22.0 | `d.moveToText('Overall Margin', 700)` | (`:1995`) | **$64,604**, description `Project Value − total Project Cost` |
| 26.0 | `d.moveToEl('[data-state="closed"] + *', 400)` **[unverified]** — hover the `InfoTooltip` beside Overall Margin (`StatCard.tsx:71`) | | tooltip: pre-jobs of $19,200 excluded; margin would be $45,404 |
| 33.0 | `d.moveToText('Cash Profit to Date', 700)` | (`:2008`) | **$120,793**, description `Received − paid costs to date` |
| 38.0 | `d.scrollTo(560, 1100)` | | **Cost Breakdown**: Jobs $222,600 · Materials $88,466 · Misc $3,630 · Labor $18,450 |
| 43.0 | `d.until(45.0)` | | tail |

---

### Ch 17 — Invoices · `/invoices` · 0:35

Narration (91 words): *"Invoices is everything you have billed, across every project and every customer, in one list. Filter it down by project, by status, by signature status, or by when it was raised — so you can see just the ones still unsigned, or just this month's. Each row carries the project, the amount, where it has got to, and whether it has been signed. To bill something new, New Invoice, pick the project, and you land in the same editor you have already seen."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | `Invoices (10)` + `All invoices across all projects.` (`ChangeOrdersPage.tsx:466-470`) |
| 3.0 | `d.moveToEl('h2', 700)` | | |
| 8.0 | `d.moveToEl('button:has-text("All projects")', 650)` **[the SearchableSelect trigger renders `placeholder="All projects"` — `:525`]** | | |
| 12.0 | `d.moveToText('All statuses', 600)` | (`:532`) | |
| 15.0 | `d.moveToText('All signature statuses', 650)` | (`:561`) | |
| 19.0 | `d.moveToText('Awaiting Signees', 750)` | invoice 1039's row | the excluded one |
| 24.0 | `d.moveToText('Fully Executed', 650)` | | |
| 28.0 | `d.moveToEl('button:has-text("New Invoice")', 700)` | (`:473`) | |
| 30.0 | `d.click()` | | dialog `Select Project` (`:928`) |
| 33.0 | `d.moveToEl('button:has-text("Cancel")', 400)`; `d.click()` | (`:943`) | closes clean |
| 33.5 | `d.until(35.0)` | | tail |

---

### Ch 18 — Accounts Receivable · `/accounts-receivable` · 0:40

Narration (104 words): *"Accounts Receivable is your chase list. The top row groups everything by where it has got to — Outstanding, Requested, Received. Below that is the aging: everything unpaid, sorted by how long it has been sitting. Zero to thirty, thirty-one to sixty, sixty-one to ninety, ninety-one to one-twenty, and over one-twenty. Twenty-one thousand of that is more than four months old, which is a phone call, not an email. You can request a payment straight from a row, open the documents behind it, or jump to the project. Mark it received here and every other screen catches up."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | `Accounts Receivable` + `Track scheduled and received client payments` (`:1494-1495`) |
| 3.0 | `d.moveToEl('h1', 700)` | | |
| 6.0 | `d.moveToText('Outstanding Amount', 650)` | `${s.label} Amount` (`:1545`) | `$76,875` |
| 9.0 | `d.moveToText('Requested Amount', 550)` | | `$123,250` |
| 11.5 | `d.moveToText('Received Amount', 550)` | | `$387,825` |
| 15.0 | `d.moveToText('Aging (unpaid)', 700)` | (`:1563`) | |
| 17.5 | `d.moveToText('0-30 Days', 550)` | | `$69,800` |
| 19.5 | `d.moveToText('31-60 Days', 500)` | | `$29,600` |
| 21.5 | `d.moveToText('61-90 Days', 500)` | | `$61,500` |
| 23.5 | `d.moveToText('91-120 Days', 500)` | | `$18,100` |
| 25.5 | `d.moveToText('120+ Days', 500)` | | `$21,125` |
| 29.0 | `d.scrollTo(560, 1100)` | | `Outstanding Payments` table (`:2009` pattern → `${status.label} Payments`) |
| 32.0 | `d.moveToEl('tbody tr:first-child button[title="Request payment"]', 700)` (`:354`) | | |
| 36.0 | `d.moveToEl('button:has-text("Aging")', 600)` | Group-by option (`:1533`) | |
| 38.5 | `d.until(40.0)` | | tail |

---

### Ch 19 — Payments · `/payments` · 0:35

Narration (91 words): *"Payments is the ledger of money actually moving, both directions. AP is what went out to your subs and suppliers. AR is what came in from your customers. Each row carries the project, the date, the amount, how it was paid and a check number if you have one. Filter by project, by contractor, by supplier, by status or by date, and download the lot as a CSV for your bookkeeper. Record a payment here or from inside the project — either way it lands in one place."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | `Payments (n)` (`PaymentsPage.tsx:666-667`), AP tab active |
| 3.0 | `d.moveToEl('h2', 650)` | | |
| 6.0 | `d.moveToEl('[role="tablist"] > button:nth-child(1)', 600)` | `AP (n)` (`:757`) — text includes a live count, so **never** `moveToText` | |
| 10.0 | `d.moveToText('Payee', 550)` **[AP table header — verify against `PaymentsPage.tsx:471-481`]** | | |
| 13.0 | `d.moveToEl('[role="tablist"] > button:nth-child(2)', 700)`; `d.click()` | `AR (n)` (`:758`) | list switches |
| 18.0 | `d.moveToText('Method', 550)` | (`:494`) | Check / ACH Transfer / Wire |
| 20.5 | `d.moveToText('Check #', 500)` | (`:495`) | |
| 25.0 | `d.moveToEl('button:has-text("All Contractors")', 600)` | (`:707`) | |
| 29.0 | `d.moveToEl('button:has-text("Download CSV")', 650)` | (`:679`) | |
| 33.5 | `d.until(35.0)` | | tail |

---

### Ch 20 — Jobs · `/jobs` · 0:35

Narration (91 words): *"Jobs is the work you have handed to your own subs, everywhere, in one list. Who is doing it, on which project, what you agreed to pay, what you have scheduled, what you have paid, and what is left. Add one by hand, or import their invoice and let Kablanet read the details straight off the document. For a framing outfit, cranes, trusses, shear and cleanup are most of your cost — the more of them you record, the truer every profit number in the app becomes."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | `Jobs (15)` (`JobsPage.tsx:667`) |
| 3.0 | `d.moveToEl('h2', 650)` | | |
| 6.5 | `d.moveToText('Contractor', 600)` | header (`:294`) | |
| 9.0 | `d.moveToText('Total', 450)` | (`:295`) | |
| 10.5 | `d.moveToText('Scheduled', 450)` | (`:296`) | |
| 12.0 | `d.moveToText('Paid', 400)` | (`:297`) | |
| 13.5 | `d.moveToText('Balance', 400)` | (`:298`) | |
| 17.0 | `d.moveToText('Truss set — Buildings A, B and C', 700)` | `Job Name` (`:293`) | Ironwood, $41,600 |
| 24.0 | `d.moveToEl('button:has-text("Add Job")', 650)` | (`:672`) | |
| 29.0 | `d.moveToEl('button:has-text("Import")', 600)` **[verify — Jobs page import entry point]** | | |
| 33.5 | `d.until(35.0)` | | tail |

---

### Ch 21 — Contractors · `/contractors` · 0:35

Narration (90 words): *"Contractors is your own subs — the people you hand work to. Each one shows their trades, how many projects and jobs they are on, and the money: total, scheduled, paid, and what is still open. Click a name and a panel slides in with their whole history, so you can see everything you have ever given them without hunting through projects. Keeping their license number and expiry here also means the paperwork you generate for them comes out right the first time."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | `Contractors (5)` (`ContractorsList.tsx:180`) |
| 3.0 | `d.moveToEl('h2', 650)` | | |
| 6.0 | `d.moveToText('Trades', 500)` | (`:114`) | |
| 8.5 | `d.moveToText('Balance', 500)` | (`:120`) | |
| 12.0 | `d.moveToText('Baseline Shear & Sheathing', 750)` | | |
| 14.0 | `d.click()` | | right sheet opens |
| 18.0 | `d.moveToText('Total Payments', 650)` | `StatCard` (`ContractorDetailPane.tsx:750`) | |
| 21.0 | `d.moveToText('Current Balance', 550)` | (`:751`) | |
| 23.5 | `d.moveToText('# of Projects', 500)` | (`:752`) | |
| 27.0 | `d.scrollTo(400, 900)` | | job history, `Job #` / `Project` / `Job Name` / `Total` / `Scheduled` / `Paid` / `Balance` |
| 33.5 | `d.until(35.0)` | | tail |

---

### Ch 22 — Suppliers · `/suppliers` · 0:35

Narration (89 words): *"Suppliers is where the yards and the truss plants live. Same shape as Contractors — open one and a panel slides in with their invoices, what you have paid, and what is still outstanding. Material invoices get logged against the project that used them, so the lumber for the Camarillo job lands on the Camarillo job rather than in one big pile at month end. That is what makes the cost side honest, and it is the difference between knowing a job made money and hoping it did."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | `Suppliers (4)` (`SuppliersList.tsx` — **[verify the `PageTableHeader` title line]**) |
| 3.0 | `d.moveToEl('h2', 650)` | | |
| 8.0 | `d.moveToText('Sun Valley Lumber & Supply', 750)` | | |
| 10.0 | `d.click()` | | right sheet (`SupplierDetailPane.tsx`) |
| 15.0 | `d.scrollTo(320, 900)` | | invoice history: M-88412, M-89310, M-89902, M-90588 |
| 22.0 | `d.moveToText('M-89902', 700)` | | $38,216 unpaid |
| 28.0 | `d.moveToText('Pacific Truss Company', 700)` **[requires closing the sheet first]** | | |
| 33.5 | `d.until(35.0)` | | tail |

---

### Ch 23 — Accounts Payable · `/accounts-payable` · 0:40

Narration (104 words): *"Accounts Payable is the mirror image. What you owe, grouped by where each payment has got to — Outstanding, meaning nobody has asked yet; Requested, waiting on you to approve; Scheduled; Issued; and Completed. Under that, the same aging you saw on the receivables side, so you always know what is due this week. Fifteen four to Ironwood is past a hundred and twenty days, which is how you lose a good truss crew. Because it draws from the same jobs and material invoices as everything else, approving something here shows up on the project and the dashboard immediately."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | `Accounts Payable` (`AccountsPayablePage.tsx:1796`) |
| 3.0 | `d.moveToEl('h1', 650)` | | |
| 6.0 | `d.moveToText('Outstanding Amount', 600)` | `${s.label} Amount` (`:1881`) | |
| 9.0 | `d.moveToText('Requested Amount', 500)` | | |
| 11.0 | `d.moveToText('Scheduled Amount', 500)` | | |
| 13.0 | `d.moveToText('Completed Amount', 500)` | AP final status label is **Completed** | |
| 17.0 | `d.moveToText('Not Yet Requested', 600)` | (`:1888`) | |
| 21.0 | `d.moveToText('0-30 Days', 550)` | aging strip (`:1910-1912`) | `$99,214` |
| 23.0 | `d.moveToText('31-60 Days', 450)` | | `$55,516` |
| 25.0 | `d.moveToText('61-90 Days', 450)` | | `$62,224` |
| 27.0 | `d.moveToText('120+ Days', 500)` | | `$15,400` |
| 31.0 | `d.scrollTo(640, 1100)` | | `Requested Payments` table, `Approve & Schedule` action (`:501`) |
| 35.0 | `d.moveToEl('button[title="Approve & Schedule"]', 700)` | | hover only — **do not click** |
| 38.5 | `d.until(40.0)` | | tail |

---

### Ch 24 — Sent Estimates · `/estimates/sent` · 0:35

Narration (91 words): *"Sent Estimates is work you have quoted. Each one shows the customer, the project, the amount, and where it stands. An estimate is an offer, not money — it does not touch your totals until it is accepted, which is exactly what you want in a pipeline number. When a builder says yes, convert it into an invoice rather than retyping it; the lines come across with it. When you lose one, mark it lost, so what is left in the list is real work you might still get."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | `Sent Estimates (3)` (`SentEstimatesPage.tsx:268`) |
| 3.0 | `d.moveToEl('h2', 650)` | | |
| 6.5 | `d.moveToText('Culver Mixed-Use — podium framing, all levels', 750)` | `Title` (`:254`) | **open**, $164,750 |
| 13.0 | `d.moveToText('Vanowen St 8-Unit — podium deck and Level 1 framing', 700)` | | **won** (`Converted: Yes`) |
| 20.0 | `d.moveToText('Altadena spec home — complete framing package', 700)` | | **lost** |
| 26.0 | `d.moveToEl('tbody tr:last-child button[aria-haspopup="menu"]', 650)`; `d.click()` | row menu | `Mark as lost` / `Reopen` (`:531, 537`) |
| 30.0 | `d.press('Escape')` | | |
| 31.0 | `d.moveToEl('button:has-text("New Estimate")', 600)` | (`:271-273`) | |
| 33.5 | `d.until(35.0)` | | tail |

---

### Ch 25 — Estimate Requests · `/estimates/requests` · 0:35

Narration (90 words): *"Estimate Requests is how you send one scope out to several subs at once. Write it once — crane and rigging for the Culver podium — pick who you are sending it to, and Kablanet emails each of them. You can see who was sent what, who opened it, who answered and who has gone quiet, and chase the quiet ones from here. Their replies come back as Received Estimates. It turns pricing a job from a morning of phone calls into a few minutes at the keyboard."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | `Estimate Requests (2)` (`EstimateRequestsPage.tsx:405`) |
| 3.0 | `d.moveToEl('h2', 650)` | | |
| 7.0 | `d.moveToText('Crane and rigging — Culver podium beam set', 750)` | `Subject` (`:44`) | |
| 13.0 | `d.moveToText('Recipients', 550)` | (`:49`) | `3` |
| 15.5 | `d.moveToText('Opened', 500)` | (`:50`) | `3` |
| 17.5 | `d.moveToText('Responded', 500)` | (`:51`) | `2` |
| 21.0 | `d.moveToText('Vendors', 550)` | (`:46`) | Delgado, Ironwood, Baseline |
| 26.0 | `d.moveToEl('button:has-text("Send Estimate Request")', 700)` | (`:409-410`) | |
| 30.0 | `d.moveToEl('button:has-text("Vendor")', 550)` | group toggle (`:426`) | |
| 33.5 | `d.until(35.0)` | | tail |

---

### Ch 26 — Received Estimates · `/bids` · 0:35

Narration (90 words): *"Received Estimates is the other direction — prices your subs and your suppliers have quoted you. Record what each came back with against the project and the scope, and you are comparing real numbers side by side instead of digging through email. Tick two or more and Compare Selected puts them next to each other. Mark the one you are going with as the winner, and it becomes a job — the amount you agreed carries straight over into what you owe them."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | `Received Estimates (5)` (`BidsPage.tsx:523`) |
| 3.0 | `d.moveToEl('h2', 650)` | | |
| 6.5 | `d.moveToText('Crane and rigging — Culver podium beam set', 750)` | `Job Name` (`:360`) | three rows: 23,900 / 27,400 / 31,200 |
| 13.0 | `d.moveToText('Winner', 550)` | (`:363`) | Delgado flagged |
| 17.0 | `d.moveToEl('tbody tr:nth-child(1) input[type="checkbox"]', 600)`; `d.click()` | | |
| 19.0 | `d.moveToEl('tbody tr:nth-child(2) input[type="checkbox"]', 450)`; `d.click()` | | |
| 21.0 | `d.moveToEl('button:has-text("Compare Selected")', 650)` | (`:544`) | |
| 22.5 | `d.click()` | | dialog `Compare Estimates (2)` (`:663`) |
| 29.0 | `d.press('Escape')` | | |
| 30.0 | `d.moveToEl('button:has-text("Add Estimate")', 600)` | (`:526-529`) | |
| 33.5 | `d.until(35.0)` | | tail |

---

### Ch 27 — Time Tracking · `/time-tracking` → `/time-tracking/dashboard` · 0:35

Narration (91 words): *"Time Tracking is where your crew clock in and out against a job. It works on a phone, so it happens on the site instead of being reconstructed from memory on Friday afternoon. Pick the project — nearby ones come up first — and clock in. The hours land as labor cost on the job they were worked on, which is the piece most trade businesses are missing when they try to work out what a job really made. The Time Dashboard totals it all by person and by project."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | `Time Tracking` + `Clock in and out, and add site photos.` (`TimeTrackingClockPage.tsx:210-211`) |
| 3.0 | `d.moveToEl('h1', 650)` | | |
| 7.0 | `d.moveToText('Clock in', 700)` | `CardTitle` — **[not a leaf; `moveToEl('h3:has-text("Clock in")')`]** (`:230`) | |
| 12.0 | `d.moveToEl('input[placeholder="Search project name"]', 650)` | (`:271`) | |
| 16.0 | `d.moveToEl('button[role="combobox"]', 650)`; `d.click()` | `Select a project` (`:276`) | project list |
| 20.0 | `d.press('Escape')` | | **do not clock in** — it writes a real `time_entries` row |
| 22.0 | **cut** to `/time-tracking/dashboard` | `Time Tracking Dashboard` (`:372`) | |
| 26.0 | `d.moveToText('Employee', 550)` | (`:246`) | |
| 28.0 | `d.moveToText('Hours', 450)` | (`:260`) | |
| 30.0 | `d.moveToText('Total cost', 500)` | (`:265`) | |
| 33.5 | `d.until(35.0)` | | tail |

---

### Ch 28 — Emails · `/emails` · 0:35

Narration (90 words): *"Emails is a record of everything Kablanet has sent and received on your behalf. If a builder says they never got the invoice, this is where you check — what went out, to whom, when, whether they opened it and whether they clicked the link. Filter by date or by type when you are looking for something specific. Received holds the replies to your estimate requests, with their attachments. It is not a mailbox and it is not trying to be one. It is the paper trail."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | `Sent emails` (`EmailsPage.tsx:494`), Sent tab active |
| 3.0 | `d.moveToEl('h2', 650)` | | |
| 6.0 | `d.moveToText('Sent', 500)` | `TabsTrigger` (`:488`) | |
| 10.0 | `d.moveToText('Recipient', 550)` | (`:337`) | `j.okafor@brightlinebuilders.com` |
| 13.0 | `d.moveToText('Status', 450)` | (`:339`) | |
| 15.0 | `d.moveToText('Opened', 450)` | (`:340`) | |
| 17.0 | `d.moveToText('Clicked', 450)` | (`:341`) | |
| 21.0 | `d.moveToEl('tbody tr:first-child button[title="View email details"]', 700)` (`:358`) | | |
| 25.0 | `d.moveToText('Received', 600)` | `TabsTrigger` (`:489`) | |
| 26.5 | `d.click()` | | estimate-request replies with attachments |
| 33.5 | `d.until(35.0)` | | tail |

---

### Ch 29 — The rest of Settings · `/settings` · 0:35

Narration (90 words): *"There is more in Settings than you need on day one. Users is where you invite your office manager or your bookkeeper and choose what each of them can see. Document Statuses lets you rename the stages a payment or an invoice moves through to match the words you already use. Trades is the list you tag your subs with. Document Templates is the layout your invoices print in — your logo, your wording, your footer. Have a look when you have a quiet afternoon."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | `Settings` (`SettingsPage.tsx:94`), User Settings tab active |
| 3.0 | `d.moveToEl('h1', 600)` | | |
| 5.5 | `d.moveTo(720, 150, 900)` | | across the tab strip |
| 9.0 | `d.moveToText('Users', 600)` | tab label from `pageRegistry.ts:45` | |
| 10.5 | `d.click()` | | user management + roles + security |
| 16.0 | `d.moveToText('Document Statuses', 650)` | (`pageRegistry.ts:47`) | |
| 17.5 | `d.click()` | | |
| 23.0 | `d.moveToText('Trades', 600)` | (`pageRegistry.ts:50`) | |
| 24.5 | `d.click()` | | the ten framing trades |
| 28.5 | `d.moveToText('Document Templates', 650)` | (`pageRegistry.ts:52`) | |
| 30.0 | `d.click()` | | |
| 33.5 | `d.until(35.0)` | | tail |

---

### Ch 30 — Help · `/help` · 0:35

Narration (89 words): *"Help is the full manual, at the bottom of the left menu. Search it for whatever screen you are stuck on and you get step-by-step instructions with pictures. If the answer is not there, send us a question from the same screen — it comes through with your account attached, so we can see what you were looking at instead of asking you to describe it. We would much rather hear from you early than find out weeks later that something has not been working."*

| Cue | Primitive | Target | Viewer sees |
|---|---|---|---|
| 0.0 | `d.until(3.0)` | — | manual: TOC left, article right (`HelpPage.tsx:57-75`) |
| 3.0 | `d.moveToEl('input[placeholder*="earch"]', 700)` | search box | |
| 4.5 | `d.click()`; `d.type('aging')` | | TOC filters live (`:33-42`) |
| 12.0 | `d.moveToEl('[data-toc-item]', 700)` **[unverified selector — read `ManualTOC.tsx`]**; `d.click()` | | article loads |
| 20.0 | `d.scrollTo(500, 1200)` | `#manual-article-scroll` (`:50`) | screenshots in the article |
| 26.0 | `d.moveToEl('button:has-text("Ask")', 650)` **[unverified label — read `HelpPage.tsx` header + `SupportRequestPage`]** | | |
| 30.0 | `d.moveToText('Help', 600)` | sidebar item | |
| 33.5 | `d.until(35.0)` | | tail |

---

## 5. Risks

**R-1 — The signature narration in Chapter 12 contradicts the brief, and one of them is wrong.** `financialModel.ts:204-206` excludes a signature-pending document from all totals; the brief and `flow.json` `flow-4` say it does not. The badge string `'Awaiting signature — excluded from financial totals'` (`contractEligibility.ts:132`) and the stale doc-comments in `contractValue.ts`/`contractEligibility.ts` point in opposite directions, so I could not resolve it from the code alone. **Before the Chapter 12 voice-over is cut:** seed invoice 1039 ($164,750, `require_signature = true`, unsigned) into Summit Crest, load `/dashboard`, and read `Total Projects Value`. If it shows **$606,550**, the code behaviour holds and my narration is right. If it shows **$771,300**, the brief is right and Chapter 12's script must be rewritten to the flow.json version. Everything else in the seed is designed not to depend on the answer.

**R-2 — Recording under a platform-admin session leaks internal UI.** The current `auth.json` is `guywein@gmail.com` with `impersonate_company_id`. That renders a `Platform` sidebar group with a `Platform Admin` link (`AppSidebar.tsx:536-556`) and a multi-company switcher in the sidebar header. Both are visible in every single clip. **Blocker.** Create `ray@summitcrestbuilders.com` per §2.4 and re-capture.

**R-3 — Chapter 11 sends a real email.** `Save & Send to Customer` invokes the live send pipeline. Use a mailbox you control for `j.okafor@brightlinebuilders.com` and expect a `email_send_log` row per take — six takes means six rows visible in Chapter 28. Purge on reset (§3.2). Related trap from `CLAUDE.md`: **email links always resolve to production**, so the signing link in that email will point at kablanet.com regardless of where you recorded.

**R-4 — Chapter 11's customer-signing shot needs a second browser context.** No login, but a live `sign_token`. The recorder currently launches one context. Either add a second context to the same run, or split Chapter 11 into two clips and stitch. Doing it in one run is worth the effort: a real token signing is the single most persuasive shot in the tutorial.

**R-5 — `moveToText` will silently fail on ~40% of naive targets.** It requires a leaf element with exact text, in the viewport. `PageTableHeader` `<h2>`s, every icon `Button`, and every `CardTitle` will log `! text not found:` and continue without moving — producing a clip where the cursor sits still while the narration describes something. **Add a strict mode to the recorder** that throws instead of `console.error`-ing, and run every timeline once in strict mode before recording for real.

**R-6 — Dashboard section order and pane collapse state are user-persisted.** `ReorderableSections` (`DashboardPage.tsx:534`) and every `ProjectPane` (`ProjectPane.tsx:76`) store state in localStorage. A take that collapses a pane changes the next take's layout, and scroll offsets in the cue tables become wrong. Reset the keys listed in §2.4 before every take.

**R-7 — `Undated` will read $0 and the Cash Flow chart may look thin.** `contract_payments.date` is never null, so `agingDateOf` always resolves — nothing can land in `Undated`. Don't narrate it. Separately, the Financial Health Cash Flow chart buckets by week/month/quarter (`FinancialOverviewPane.tsx:241-243`); with payments concentrated in the last ~7 months it will look reasonable at **Months**, sparse at **Weeks**. Set the granularity to Months before Chapter 1 and Chapter 6.

**R-8 — Time Tracking cannot be shown end to end.** `TimeTrackingClockPage` requests geolocation; headless Chromium denies it and the card degrades to `Location unavailable — pick your project manually` (`:239-241`). Either grant a fixed geolocation to the Playwright context (`geolocation: { latitude: 34.0522, longitude: -118.2437 }`, `permissions: ['geolocation']`) so the "nearby" badge renders, or accept the manual-picker path. **Do not actually clock in** — it writes a real entry as the recording user and breaks the reset.

**R-9 — The `/invoices` list still says `CO #`.** Hardcoded at `ChangeOrdersPage.tsx:435`, unaffected by invoice mode. It is on screen in Chapters 12 and 17. Either fix it before recording, or hide the column via the Customize-table popover during setup (the preference persists in `tbl-prefs:change_orders.list`) and keep the narration off it.

**R-10 — On-camera document numbers are not predictable from the seed.** `next_change_order_number` returned `"7273R"` against the empty company, i.e. it is not derived from `contract_number_start` in the way the field's `7248` placeholder implies, and it appends an `R` suffix that reads oddly on an invoice. Call the RPC after seeding, record the value, and either use it in the narration or keep the narration off the number entirely (my Chapter 9 script says "leave the number blank and Kablanet assigns the next one," which is safe either way).

**R-11 — Several row-action tooltips and dialog save-button labels are unverified.** Marked **[unverified]** throughout §4: the Counter-sign row action title, the payment-dialog and job-dialog save labels, the Materials add-button label, the ProjectLaborSection header, the Suppliers page title line, the Help TOC item selector, and the Save button on the System settings tab. Each is a 30-second read; do them before building timelines rather than debugging a silent no-move at record time.

**R-12 — 30 chapters is ~18 minutes.** That is well past the 2–3 minute ceiling for an unattended demo. It works as a **chaptered reference library** with per-chapter deep links and a 60–90 second Part 1 cut used as the standalone top-of-funnel asset — which is the current recommendation for multi-use-case products ([Arcade](https://www.arcade.software/post/saas-product-demos-guide); [howdygo, *SaaS Product Demo: Detailed 2026 Guide*](https://www.howdygo.com/blog/saas-product-demo)). It does not work as one continuous video. Plan the distribution surface accordingly.
