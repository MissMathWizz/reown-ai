# Product specification

## Vision

Turn bulk photos into a useful inventory of physical objects, then help an owner keep, resell, or donate them. Future multimodal recognition and visual retrieval should propose identities with confidence and provenance rather than claim certainty. Two identical-looking products may be distinct physical objects; user correction is essential.

## MVP scope and assumptions

Single person, one local browser, small inventory, English UI. USD may be a future default but no prices are estimated now. Local development takes priority over deployment. IndexedDB is the persistence layer; no backend or account is necessary. Uploaded photos each start as an unclassified item. Automatic grouping is deliberately deferred; manual merge/move/split provides the correction workflow. Demo inventory is opt-in and clearly marked.

Implemented: responsive upload/drop zone, file type/size/count validation and image decoding; gallery with search and status filters; item editor; photo counts; manual photo grouping; Keep/Sell/Donate; local persistence; delete confirmation; local save feedback; placeholder listing preview for all target marketplaces.

Not implemented: automatic grouping, product identification, embeddings, similarity search, secondhand appraisal, real listing generation, marketplace authentication, posting, shipping, payments, messaging, accounts, synchronization, export/import, and production hosting.

## Acceptance flows

- Upload two valid photos: two records appear and remain after reload.
- Edit an item and save: saved fields appear in gallery/search and listing preview.
- Move selected photos into another item: no photo is lost or duplicated; an empty source disappears.
- Split a subset: source and new item each have photos. A whole-group split is disabled.
- Set Sell or Donate: summary count and filtered gallery update after saving.
- Reject an invalid batch without partial additions; report storage errors without claiming success.
- Empty collection and no-search-results states explain the current view.

## Marketplace policy

Targets: eBay, Poshmark, OfferUp, Craigslist, Nextdoor, WeChat communities, Moon BBS. Current support is a local text template containing the selected marketplace name, saved item details, and review instructions. These are basic templates, not researched marketplace-specific field schemas or policy guarantees.

Only build publishing through a verified, permitted official integration. Before any such implementation, check current official documentation, permissions, geographic/account restrictions, and rate limits. Do not infer API permission from this target list. Otherwise support user-reviewed drafts and manual posting. Never add scraping-based posting or autonomous posting.

## Proposed milestones

1. Local foundation (this MVP): manual inventory and grouping, persistence, placeholder adapters.
2. Reliability: image resizing, import/export, richer accessible dialog focus behavior, browser end-to-end coverage, quota reporting, concurrent-tab protection, license choice.
3. Assisted perception: opt-in vision adapter, grouping suggestions with undo, product candidates and confidence, embeddings/retrieval with evidence. Evaluate physical-instance grouping precision and correction rate.
4. Valuation: dated sold comparables, currency/region/condition adjustments, ranges, uncertainty, source attribution. Evaluate against actual sold prices; do not substitute asking prices silently.
5. Listing drafts: researched schemas per marketplace, editable drafts, validation, preview, copy/export, user approval.
6. Permitted integrations: official API verification, OAuth and secure token storage, explicit publish confirmation, audit trail, idempotency, rate limits, revocation, account isolation.

Success for the MVP means an owner can add, correct, find, classify, and reload their items without losing photos. Future metrics include grouping accuracy, identification confidence calibration, valuation error, and time to a reviewed listing.
