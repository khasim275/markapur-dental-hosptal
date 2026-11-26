# Markapur Dental Website — Function Approval Register

**Project:** Markapur dental website  
**Source of truth:** `khasim275/markapur-dental-hosptal` (public GitHub repository)  
**Clinic branding:** Markapur  
**Register updated:** 2026-11-26  
**Release policy:** No production deployment, live patient-data collection, patient communications, or payment activation without explicit written owner approval.

## Source-of-truth status

The public repository was empty when selected as the authoritative source. It has now been initialized with governance documentation only. No application source code, backend, database, booking integration, tests, or deployment configuration has been verified in this repository.

The previously inspected Aurelia Dental Studio Next.js bundle is a separate prototype/reference and is **not** the source of truth for Markapur. Its observations must not be represented as verified features of this repository.

## Register rules

- Every function has its own approval record and must pass every required gate.
- Approval to inspect, design, or build is not approval to deploy.
- A test is PASS only when it has actually been executed and evidence is recorded.
- Not tested means `NOT TESTED`, never PASS.
- Independent review stages remain BLOCKED until an actual independent reviewer performs the review.
- A function is not COMPLETE until the required checks, independent reviews, and final owner approval are recorded.
- No production deployment, merge to a release branch, live patient-data handling, real patient messaging, or payment activation is authorized by this register.
- Work must proceed one function at a time. Silence is not approval.
- If a required tool, credential, policy decision, or independent reviewer is unavailable, record the gate as BLOCKED.

## Priority register

The following is a planning backlog, not evidence that these features already exist in the Markapur repository.

| Priority | Function ID | Function | Status | Initial note |
|---|---|---|---|---|
| P0 | FN-001 | Appointment enquiry submission (server-backed) | PENDING OWNER APPROVAL | First function proposed for design investigation; no implementation verified. |
| P0 | FN-002 | Appointment form validation and error recovery | NOT ASSESSED | Scope and source implementation not yet inspected. |
| P0 | FN-003 | Verified clinic identity and contact actions | BLOCKED | Owner must supply verified clinic contact details and destinations. |
| P0 | FN-004 | Privacy notice and patient-data handling | BLOCKED | Clinic policy and applicable legal/privacy review required before collecting patient data. |
| P1 | FN-005 | Primary navigation and mobile menu | NOT ASSESSED | No application source verified. |
| P1 | FN-006 | Appointment CTA and section navigation | NOT ASSESSED | No application source verified. |
| P1 | FN-007 | Patient concern finder | NOT ASSESSED | Any clinical suggestions require clinic review. |
| P1 | FN-008 | Services and treatment information | NOT ASSESSED | Scope and clinical wording require clinic verification. |
| P1 | FN-009 | Dentist/team profiles and credentials | BLOCKED | Verified clinician names, registrations, qualifications, and approved biographies required. |
| P1 | FN-010 | Trust metrics and patient testimonials | BLOCKED | Genuine, verifiable, appropriately consented evidence required. |
| P1 | FN-011 | Before/after case comparison | BLOCKED | Real case images, patient consent, treatment context, and clinical review required. |
| P1 | FN-012 | FAQ accordion | NOT ASSESSED | No application source verified; answers require clinic review. |
| P1 | FN-013 | Pricing and payment information | BLOCKED | Clinic-approved prices and payment terms required. |
| P1 | FN-014 | Footer, map, social, email and telephone links | BLOCKED | Verified clinic details and destinations required. |
| P1 | FN-015 | Responsive layout and mobile action dock | NOT ASSESSED | No viewport/browser evidence. |
| P1 | FN-016 | Accessibility and keyboard support | NOT ASSESSED | No accessibility audit evidence. |
| P2 | FN-017 | SEO metadata and structured data | NOT ASSESSED | No application source or production domain verified. |
| P2 | FN-018 | Performance and image optimization | NOT ASSESSED | No performance measurements. |
| P2 | FN-019 | Error monitoring, analytics and spam protection | BLOCKED | Provider, consent, credentials, and clinic approval required. |
| P2 | FN-020 | Patient/staff login and dashboards | NOT SCOPED | Requires separate requirements and owner authorization. |
| P2 | FN-021 | Appointment status, reschedule and cancellation | NOT SCOPED | Requires approved booking workflow and business rules. |
| P2 | FN-022 | Payments, invoices and refunds | NOT SCOPED | Requires explicit scope, provider approval, and security review. |

## Function approval record

### FN-001 — Appointment enquiry submission (server-backed)

- **Function:** Provide a secure way for a prospective patient to submit an appointment enquiry and show a success confirmation only after the server confirms that the enquiry has been safely persisted.
- **Project/brand:** Markapur.
- **Authoritative repository:** `khasim275/markapur-dental-hosptal`.
- **Status:** PENDING OWNER APPROVAL — design investigation only.
- **Implementation status:** NOT STARTED. No application implementation has been verified in the authoritative repository.
- **Build owner:** Not assigned.
- **First checker:** Not assigned; must be separate from the builder.
- **Initial owner approval:** PENDING.
- **Re-check rounds:** 0/5.
- **Second reviewer:** Not assigned; independent review not performed.
- **Second review verdict:** BLOCKED / NOT REVIEWED.
- **Final reviewer:** Not assigned; independent final review not performed.
- **Final review verdict:** BLOCKED / NOT REVIEWED.
- **Final owner approval:** PENDING.
- **Files currently related:** None verified in the authoritative repository.
- **Tests performed:** None. Status: NOT TESTED.
- **Evidence:** Repository inspection confirmed it was empty before governance initialization. No API, database, form, test suite, or deployment target has been verified.
- **Required design scope:** Proposed user journey; approved form fields; server/API contract; secure persistence option; server-side validation; spam/abuse controls; duplicate-submission/idempotency strategy; loading, success, and recoverable error states; data minimization and retention; privacy/consent wording; operational ownership and failure handling.
- **Safety constraints:** Do not connect a live CRM, database, messaging provider, or production service during this design-only stage. Do not use real patient data. Do not promise or imply a confirmed appointment slot; an enquiry is not a booked appointment unless a separately approved scheduling workflow confirms it.
- **Open owner decisions:** (1) What destination should receive enquiries (approved CRM, clinic-managed database, or another system)? (2) Which fields are essential and permitted? (3) What consent/privacy wording and retention policy should apply? (4) Is the selected date/time only a patient preference, or should the system eventually check real availability? (5) Who at the clinic is responsible for receiving and responding to enquiries?
- **Current gate:** Awaiting the owner's initial approval of the limited design-investigation scope below.
- **Next action:** Do not begin implementation until the owner responds to this request. After approval, prepare a design proposal only; return for a separate build authorization before implementation.

## FN-001 — Initial owner approval request

**Decision requested:** Approve the team to investigate and document a proposed FN-001 design for Markapur appointment enquiries.

If approved, the permitted work is limited to:
1. Define the enquiry journey and recommend a minimal set of form fields.
2. Compare suitable non-production architecture options for receiving and securely storing enquiries.
3. Document privacy, consent, retention, spam protection, duplicate handling, and operational requirements.
4. Present the proposed API/data flow, dependencies, risks, and cost/ownership implications for a separate owner decision.

**This approval does NOT authorize:**
- Building or activating the live submission function.
- Connecting a live CRM, database, WhatsApp/SMS/email provider, or other external service.
- Collecting, importing, or processing real patient information.
- Sending patient communications.
- Confirming appointment slots or creating bookings.
- Merging to a production/release branch or deploying/publishing any website.

**Owner response required:**

- [ ] **APPROVE** — FN-001 design investigation only, within the limits above.
- [ ] **REJECT** — Do not proceed with FN-001.
- [ ] **REQUEST CHANGES** — Provide the changes required before reconsideration.

**Owner name/role:** ____________________  
**Decision date:** ____________________  
**Notes/conditions:** ____________________

Until an explicit owner decision is recorded, FN-001 remains **PENDING OWNER APPROVAL** and work is paused. No response or silence will be treated as approval.

## Initial gate summary

| Gate | Status | Evidence/next requirement |
|---|---|---|
| Source of truth selected | COMPLETE | Owner selected the public Markapur repository. |
| Clinic branding selected | COMPLETE | Owner selected Markapur branding; exact formal clinic/legal name and contact details remain to be supplied if needed. |
| FN-001 initial owner approval | PENDING | Owner must approve, reject, or request changes above. |
| FN-001 design investigation | NOT STARTED | Begins only after explicit approval. |
| FN-001 implementation | NOT AUTHORIZED | Requires a separate build decision after design review. |
| First functional check | NOT STARTED | Requires implementation and a checker independent of the builder. |
| Five re-check rounds | 0/5 | Functional, responsive, security, edge-case, and end-to-end evidence required. |
| Second independent review | BLOCKED | Reviewer not assigned. |
| Final independent review | BLOCKED | Reviewer not assigned. |
| Final owner approval/release authorization | PENDING | Separate explicit decision required; deployment remains unauthorized. |
