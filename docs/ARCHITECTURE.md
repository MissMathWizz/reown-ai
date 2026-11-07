# Architecture

## Current implementation

Next.js App Router + React + strict TypeScript. The root layout provides metadata and global CSS. `app/page.tsx` is a client component because file reading, crypto UUIDs, image decoding, and IndexedDB are browser APIs. No API routes or remote image/model requests are present. Demo SVGs are generated locally. Plain CSS handles desktop sidebar, responsive grid, and mobile layout without a component dependency.

Data flow: File selection/drop → validate entire batch → FileReader data URLs → browser image decode → one item per photo → IndexedDB transaction → update React state. Editing/grouping follows the same persist-before-state pattern. Initial reads happen after hydration. An empty array is persisted as a valid empty inventory; demos never silently replace real data. Failed initial reads block writes; failed writes retain the prior visible records.

IndexedDB database `reown-local`, version 1, store `inventory`, key `items` holds the full Item array. A transaction atomically replaces that snapshot. It is intentionally simple and inefficient at scale; photos expand as data URLs, and every save rewrites the snapshot. No cross-tab locking exists: concurrent saves are last-writer-wins. Keep a single tab open. A production design should separate photo blobs, inventory metadata, and indexed fields, and introduce versioned migrations and conflict detection.

## Domain

Item: UUID, title, category, brand, condition, notes, Keep/Sell/Donate status, photos, optional demo flag. Photo: UUID, original filename, local data URL. No inferred product identity or price is stored. Photo moves and splits are pure functions. An item must contain at least one photo; moving its last photo removes it. Splitting retains metadata/status but resets the new title for review.

## Future boundaries

`VisionAdapter`: photo grouping suggestions and ranked identity candidates with confidence/evidence URLs. Implementations must not overwrite user corrections automatically. Add explicit model/version, physical-instance distinctions, review state, and accepted/rejected suggestions before integration.

`ValuationAdapter`: range, currency, dated observation, and comparable URLs. Future storage needs comparable sale dates, sold-vs-asking provenance, condition, fees, shipping and regional assumptions.

`MarketplaceAdapter`: draft generation and capability declarations. No publish method is exposed. Add publishing only in a separate integration with verified official permission, server-side secrets, explicit approval, and auditable state transitions. All adapters here are interfaces only; the current `draft` function is a deterministic placeholder.

## Security and privacy

No auth, secrets, telemetry, model calls, or external posting. React escapes entered text; no HTML injection rendering. File MIME, count, size and decode are checked client-side for usability, not as a server security boundary. A future server must independently validate uploads, remove sensitive metadata where appropriate, authorize every object access, and manage retention/deletion. Original images may include EXIF and personal details; a local photo can still contain sensitive information. No cloud security is implied by this prototype.

## Verification

`npm test`: photo conservation, source cleanup, split behavior, invalid operation guards, and placeholder disclosure for every target. `npm run typecheck`: TypeScript. `npm run build`: production compilation and framework type validation. Manual browser checks should cover upload, reload, save failure, grouping, filtering, narrow screen layout, and keyboard access. These checks do not validate any future AI accuracy or marketplace capability.
