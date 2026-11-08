# Contributor and agent guidance

## Scope

Build Reown AI as a user-controlled inventory/resale assistant. Maintain Next.js, TypeScript and local development support. Read README.md and docs/ before changes. Keep UI copy honest about implemented versus simulated capabilities.

## Guardrails

- Do not add credentials, live AI calls, telemetry, marketplace posting, or scraping without explicit scope expansion.
- Use only verified official integrations for any future automated publishing; require user review/approval, secure credentials, and auditability.
- Preserve original photo references and user corrections when grouping. Never equate visually identical objects with one physical item without review.
- Clearly label demo data, template drafts, uncertain identifications, and estimates. Never fabricate sold comparables or valuations.
- Avoid destructive storage/schema changes without migration and recovery planning.
- Browser storage is local, origin-specific and quota-limited. Do not claim cloud persistence or cross-device synchronization.

## Development

Use `npm ci`, `npm run dev`. Run `npm test`, `npm run typecheck`, and `npm run build` for meaningful source changes. Add tests for data-loss risks and domain behavior. Keep adapter contracts in lib/adapters.ts and pure grouping operations in lib/inventory.ts. Report checks that could not run. Do not commit node_modules, .next, credentials, or personal uploaded photos. Update docs when behavior changes. Select a license with the maintainer before claiming licensed open-source distribution.
