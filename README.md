# Reown AI

Open-source multimodal personal inventory and resale assistant — **local MVP**.

Bulk-upload belongings, correct photo groups, edit structured records, and choose Keep, Sell, or Donate. AI identification, visual retrieval, valuations, and marketplace integrations are future work. No external model calls, credentials, or automated posting exist in this version.

## Run locally

Requires Node.js 20.9+ and npm. From this directory:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Checks: `npm run typecheck`, `npm test`, `npm run build`. Production preview: `npm run build && npm start`.

## Try it

1. Upload JPG, PNG, or WebP photos (up to 30 per batch, 10 MB each), or load the explicitly labeled demo inventory.
2. Each uploaded photo becomes a separate unclassified item. Open a card and edit the title, brand, category, condition, notes, and status; click **Save details**.
3. Select photos and move them to another item to merge groups. Split a subset into a new item to correct a group. Moving all photos deletes the empty source record.
4. Choose a marketplace to view a clearly labeled listing template. Templates use saved details; save edits before previewing.
5. Reload the same browser and origin to recover your inventory.

## Storage and limits

Inventory and original photo data URLs live in IndexedDB on this browser and origin. Nothing is uploaded to a server. Clearing site data removes it; private browsing and storage quotas can limit persistence. Save failures are shown and do not replace the in-memory inventory. This is a small, single-tab prototype: no account, cloud backup, synchronization, export/import, or multi-tab concurrency handling. Do not use it as your only copy of important photos. Large batches may be slow because images are not resized yet. HEIC is unsupported.

Demo images are generated SVG illustrations, not product photos. Demo item names and all marketplace templates are placeholders. No fabricated price estimates are displayed. The seven targets are eBay, Poshmark, OfferUp, Craigslist, Nextdoor, WeChat communities, and Moon BBS. Selecting a target does not imply API access or publishing support.

## Project

- `app/`: responsive inventory UI and styling
- `lib/inventory.ts`: records, grouping operations, placeholder templates
- `lib/storage.ts`: IndexedDB persistence
- `lib/adapters.ts`: future vision, valuation, marketplace contracts
- `tests/`: grouping invariants and template disclosure checks
- [Product specification](docs/PRODUCT_SPEC.md), [Architecture](docs/ARCHITECTURE.md), [Agent guidance](AGENTS.md)

Next.js setup follows the [official App Router installation guide](https://nextjs.org/docs/app/getting-started/installation). Dependencies are locked in `package-lock.json`. A license has not been chosen; select an open-source license before wider distribution.

## Verification in the build environment

Production build, TypeScript check, and all four domain tests passed. Browser-based end-to-end verification remains pending: the embedded browser navigation timed out, and local dev watchers hit macOS file-watch limits. Scripts use Webpack because Turbopack could not start an FSEvent stream in this environment. If development reports `EMFILE`, try `WATCHPACK_POLLING=true npm run dev`, or use the production preview, which does not need file watching.
