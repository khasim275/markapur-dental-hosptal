# FN-001 implementation notes

**Status:** Implementation scaffold committed; independent functional verification not yet performed.  
**Scope authorization:** Owner authorized FN-001 implementation only on 2026-11-26.  
**Release:** Not authorized. No deployment performed.

## Delivered in this branch

- New Next.js App Router + TypeScript application scaffold, created from scratch.
- Single-page appointment enquiry experience with name, Indian mobile number, optional preferred date/time, and explicit response consent.
- Server-side Zod validation.
- JSON-only endpoint with request-size guard, basic development rate limiting, honeypot handling, and idempotency-key handling.
- Success state explicitly says this is not a confirmed appointment.
- Unit tests for minimum valid input, country-code number, invalid phone, missing consent, and short name.
- Development-only in-memory persistence adapter.

## Important storage limitation

There is no approved database or CRM destination, no retention policy, and no production credentials. The in-memory adapter is deliberately disabled in production. The API returns HTTP 503 in production instead of claiming that an enquiry has been saved. In-memory development records are ephemeral and are not suitable for real patient information.

Before production use, a separately approved persistent storage destination, access model, retention/deletion policy, privacy notice, monitoring, and abuse-protection strategy must be implemented and reviewed. Do not enter real patient information into this prototype.

## Test status

GitHub Actions run **#21** completed successfully on commit `e1183980bc73237f456697e91f7a2152636d42d4`: TypeScript typecheck PASS; 10 automated unit/API tests PASS; Next.js production build PASS; npm audit PASS with zero reported vulnerabilities. Evidence: https://github.com/khasim275/markapur-dental-hosptal/actions/runs/45769619832. This is automated CI evidence, not an independent review or a browser-based end-to-end/responsive test. No browser screenshots or independent reviewer evidence are currently available. The earlier run found a TypeScript issue and a subsequent run found alias-resolution errors; both were fixed before the passing run. The dependency audit initially found six advisories; affected packages were upgraded, and the passing audit returned an empty vulnerability report.

## Known limitations

- No live persistence, CRM, email, SMS, WhatsApp, or booking integration.
- The date/time fields capture preferences only; no appointment availability is checked.
- No appointment confirmation is created.
- Rate limiting and idempotency are in-memory development mechanisms only.
- Privacy copy is provisional and not a clinic-approved legal privacy notice.
- Clinic legal name, address, phone, opening hours, clinician details, and domain remain unverified and are intentionally omitted.
- Remote fonts have been avoided to reduce third-party requests in the prototype.

## Local commands

```bash
npm install
npm run typecheck
npm test
npm run build
npm run dev
```

Use synthetic test values only. Production submission is intentionally disabled.
