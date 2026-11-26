# Markapur Dental Website — From-Scratch Delivery Plan

**Status:** Design proposal only  
**Source of truth:** `khasim275/markapur-dental-hosptal`  
**Brand:** Markapur  
**Last updated:** 2026-11-26

## 1. Delivery approach

Build a new website in this repository from a clean application scaffold. Do not copy the Aurelia Dental Studio prototype into this project. Keep development, preview, and production separate. Move through the approval gates in order; a later phase does not become authorized merely because an earlier phase passed.

## 2. Proposed website structure

1. **Home** — clear clinic introduction, primary appointment-enquiry call to action, key services, trust information only when verified.
2. **Services** — clinic-approved treatment descriptions; no unsupported clinical promises.
3. **About the clinic** — verified clinic story, dentist/team credentials, facilities and photographs supplied or approved by the clinic.
4. **Appointment enquiry** — a request form that is explicitly an enquiry, not a confirmed booking.
5. **Patient information** — clinic-approved FAQs, visit preparation and practical information.
6. **Contact** — verified address, phone, opening hours, map and approved contact destinations.
7. **Privacy** — approved privacy notice and explanation of what happens to enquiry information.

The exact clinic/legal name, address, phone, hours, clinician details, prices, photos, social links and domain are content dependencies. Use clearly marked placeholders until the owner verifies them; do not invent them.

## 3. Proposed first-release scope

### Public website
- Responsive home page and navigation.
- Services, clinic/about, patient information, contact and privacy pages.
- Accessible mobile menu, keyboard navigation, visible focus states and semantic page structure.
- Search/social metadata and basic performance optimization.
- Clear telephone/map links only after destinations are verified.

### Appointment enquiry (FN-001)
- Minimal form fields to be agreed with the owner.
- Server-side validation and safe error handling.
- Spam/abuse controls and duplicate-submission protection.
- Persist only after an approved destination and retention policy are selected.
- Show a success message only after server confirmation.
- Explain that submitting an enquiry does not reserve or confirm a time.
- No live CRM, messaging provider, real patient data, or production database during design or test stages.

### Explicitly out of initial scope
- Patient accounts, staff dashboards, clinical records, diagnosis or treatment advice.
- Real-time appointment-slot inventory or automatic booking confirmation.
- Payments, invoices, refunds, WhatsApp/SMS/email automation.
- Analytics or advertising trackers until consent and provider decisions are approved.

## 4. Proposed technical direction (subject to build approval)

- **Application:** Next.js with TypeScript, App Router and a maintainable component system.
- **Styling:** responsive, mobile-first CSS/Tailwind approach with accessible design tokens.
- **Content:** typed local content initially, so unverified clinic claims are not published accidentally.
- **Enquiry API:** server-side route with schema validation, rate limiting and an idempotency strategy.
- **Persistence:** provider-neutral repository interface. Select a real database/CRM only after the owner approves the destination, access model, data retention and costs.
- **Secrets:** environment variables only; commit an `.env.example` containing names and safe placeholders, never credentials.
- **Hosting:** existing Vercel Git-linked project has been discovered for this repository. Its presence is not deployment approval. Preview and production settings must be checked before any deployment action.
- **Testing:** unit/component tests, API tests with synthetic data, browser end-to-end checks, accessibility checks, responsive viewport checks and security review.

The final stack and service providers must be confirmed during the build-authorization review. This proposal does not create or connect external services.

## 5. Function-by-function delivery order

| Order | Function | Completion evidence |
|---|---|---|
| 1 | FN-001 Appointment enquiry flow | Approved contract, implementation, server/API tests, synthetic-data persistence test, failure and duplicate tests |
| 2 | FN-005 Navigation and mobile menu | Keyboard and touch interaction checks, responsive screenshots |
| 3 | FN-006 Appointment CTA and page navigation | Link/anchor checks and browser journey |
| 4 | FN-008 Services content | Clinic-approved content and content verification |
| 5 | FN-009 Team profiles | Verified credentials and owner-approved biographies |
| 6 | FN-012 FAQ | Clinic-reviewed answers and keyboard interaction checks |
| 7 | FN-003 Contact actions | Owner-verified contact details and link tests |
| 8 | FN-004 Privacy and data handling | Approved privacy text, data-flow review and retention decision |
| 9 | FN-015 Responsive layout | Evidence at mobile, tablet and desktop sizes |
| 10 | FN-016 Accessibility | Keyboard, contrast, semantics and automated/manual audit evidence |
| 11 | FN-017/018 SEO and performance | Metadata validation, structured-data checks and measured performance report |

Blocked content-dependent functions remain unpublished until the owner supplies verified material.

## 6. Agent/workstream model

Where supported by the available tools, work can be divided into these specialist workstreams:

- **Planning/product:** requirements, user journeys, function register and acceptance criteria.
- **Frontend:** page structure, components, responsive behavior and accessibility.
- **Backend:** enquiry API, validation, persistence boundary, abuse protection and error handling.
- **QA:** repeatable test cases, browser evidence, responsive and edge-case checks.
- **Security/privacy:** threat review, secrets, data minimization, retention and privacy dependencies.
- **Documentation/release:** README, architecture, environment template, test reports, deployment and rollback runbooks.

These are workstream assignments, not proof that separate autonomous agents or independent reviewers have executed work. A required independent review must be performed by a genuinely separate reviewer and recorded with evidence. If no such reviewer is available, that gate remains BLOCKED.

## 7. Required approval gates

1. **Design review:** owner reviews this plan and the FN-001 design.
2. **Build authorization:** explicit owner approval for the named function and scope before application code is written.
3. **First independent functional check:** checker other than the builder; record steps, environment, result and evidence.
4. **Owner approval:** owner reviews the first-check evidence.
5. **Five distinct re-checks:** functional, responsive, security, edge cases and end-to-end. Each has its own report and evidence.
6. **Second independent reviewer:** review implementation and evidence; record findings and resolution.
7. **Final independent reviewer:** final review of release candidate and documentation.
8. **Final owner approval and release authorization:** separate explicit approval before production release.
9. **Deployment verification:** only after authorization; verify the deployed URL, health, key journeys, logs and rollback readiness.

No silent approvals. A failed or unperformed check is never marked PASS.

## 8. Deployment and rollback plan (not authorized yet)

- Use feature branches and pull requests; keep the production branch protected.
- Development uses synthetic data and non-production credentials.
- Preview deployments, if later approved, must not receive real patient data.
- Production deployment requires final owner release authorization and a verified production configuration.
- Record deployment ID, commit SHA, URL, timestamp, smoke-test results and approver.
- Roll back by promoting the last known-good deployment and disabling any newly introduced integration if required; document the actual rollback result.
- Do not attach a custom domain or alter DNS until the owner approves the domain and release step.

## 9. Owner inputs needed before final design/build approval

- Exact public-facing clinic name and verified address.
- Clinic phone number, opening hours and map pin.
- Approved list of services and treatment descriptions.
- Verified dentist/team names, qualifications and approved biographies.
- Approved logo, photographs and brand preferences (or permission to create a provisional visual identity).
- Appointment enquiry destination and responsible clinic recipient.
- Minimum permitted form fields, privacy/consent wording and retention period.
- Whether date/time is only a preference or whether a later approved system must check actual availability.
- Domain name and confirmation of who controls its DNS.
- Any approved WhatsApp/contact destination; no WhatsApp automation is assumed.

## 10. Current authorization boundary

The owner has approved FN-001 design investigation only and requested that the website be created from scratch. This document is a design proposal. It does not authorize application implementation, live integrations, merging, preview publication, production deployment, real patient-data handling, messaging or payments.

**Next gate:** owner reviews the design proposal and explicitly authorizes the first implementation function.