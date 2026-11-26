# Markapur Dental Website

This public repository is the declared source of truth for the Markapur dental website project.

## Current status

- Repository initialized for project governance documentation.
- Application implementation has not yet been inspected in this repository; the repository was empty at the time of initialization.
- Function approval register: see `docs/FUNCTION-APPROVAL-REGISTER.md` on the governance working branch.
- No deployment is authorized by this repository initialization.

## Governance

No function may be treated as approved, tested, or complete without the evidence and owner approvals recorded in the function approval register. Approval to investigate or build is not approval to deploy.

## FN-001 implementation

The from-scratch Next.js/TypeScript implementation is in progress on `implementation/fn-001-enquiry`. See:

- `docs/WEBSITE-PLAN.md` — approved planning proposal.
- `docs/FN-001-IMPLEMENTATION.md` — implementation scope, limitations and test status.
- `docs/FUNCTION-APPROVAL-REGISTER.md` — approval and evidence register.

The appointment enquiry API is intentionally disabled in production until an owner-approved persistent destination and privacy/retention controls are implemented. Use synthetic data only. No deployment is authorized.
