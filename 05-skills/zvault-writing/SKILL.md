---
name: zvault-writing
description: Write or edit any Zoth-branded content in the house style. Covers proposals, partner and customer decks, blogs, articles, memos, presentations, one-pagers, case studies, and partner messages (Telegram, Slack, email). Use this skill whenever the task involves producing or revising written material about Zoth, zVault, zVaults, zOPAL, zoUSD, zBTC, zPAXG, FAAST, PayX7, Zocta, or any Zoth product, partner, or company fact, even when the user does not name the style explicitly. Trigger on requests like "draft a proposal for X," "write a blog about zVault," "a memo on our credit framework," "a deck for the Paxos team," "a one-pager on zOPAL," "reply to this partner," or any time Zoth product facts or company claims need to be written down correctly and on-brand. This skill supplies the canonical product facts so claims are accurate, supplies the analyst-register voice so tone is consistent, and enforces flag-before-output discipline for volatile, unannounced, illustrative, and internal facts.
---

# zVault Writing

Produce and edit Zoth content that is factually correct and on-brand. Two failure modes this skill prevents: getting product facts wrong (the recurring traps: payment financing vs private credit, USDC vs USD, zOPAL not on FAAST), and drifting into marketing register when an analyst note is wanted.

## How to use this skill

1. **Identify the output type** (proposal, blog, memo, presentation, partner message). Read `references/output_formats.md` to pick the right structure and length, and to decide inline vs file.

2. **Look at a worked example.** Check `examples/INDEX.md` and read any example document that matches the output type. Mirror its structure, table design, and phrasing. Read examples for form only: verify every number against the overviews, never against an example, because examples can carry stale figures.

3. **Pull the facts.** Read the relevant product overview before writing any product claim:
   - `references/zVaults_Overview.md` for the platform, architecture, FAAST, marketplace, criteria, credit framework, ecosystem, commercials, company and traction.
   - `references/zOPAL_Overview.md` for the first live vault: strategy, mechanics, custody, fees, partner Q&A answers.
   Do not write product facts from memory. These files are the source of truth and resolve the common errors. If a fact is not in them, say so rather than inventing it.

4. **Apply the voice.** Read `references/house_style.md` and `references/no_ai_writing.md` and write in analyst register: claim-first, third person, no persuasion adjectives, tables over prose, every claim paired with a named entity or number. Never use dashes. Get the terminology table exactly right. `no_ai_writing.md` is the corrective discipline: lead with the claim, one fact one home, cut the marketing vocabulary, let structure persuade.

5. **Flag before output.** Before presenting paste-ready or external-facing text, surface accuracy and disclosure risks in a short list, separately from the output, never instead of it. The overviews tag facts as `[VOLATILE]`, `[UNANNOUNCED]`, `[ILLUSTRATIVE]`, `[IN PROGRESS]`, `[INTERNAL]`; honor each tag per `house_style.md`. The flag list comes first, then the output.

6. **Build the artifact.** For a .docx proposal, build via a Node.js docx script with the Zoth palette (orange headers, never black), validate, and render to check before presenting. For .md or inline, write directly. Diagrams via cairosvg at 2x.

7. **Run the pre-output checklist.** Before presenting, run the checklist at the end of `references/no_ai_writing.md`: every section opens on its conclusion, no marketing vocabulary, no fact repeated outside a summary table, every claim has a number or named source, no bloated sentences, the document reads from headers and tables alone. If it reads like a pitch, it is not done.

## Non-negotiables (full detail in house_style.md)

- No dashes anywhere. No "we" or "our" in formal docs.
- Payment financing not private credit. USDC not USD. WBTC/LBTC/cbBTC not BTC. PAXG/PAXGy not Gold. Strategy AUM not AUM. zTOKEN not zOPAL in technical docs.
- zOPAL is not built on FAAST. Zocta Points are never blended into a stated APY.
- Monthly TPV is always $40M+ unless told otherwise.
- Table headers Zoth orange (#FF4509), white text.
- Flag volatile, unannounced, illustrative, in-progress, and internal facts before any external output.

## Editing mode

When revising existing Zoth text rather than writing fresh, preserve the author's structure and voice, edit in place, keep corrections as A-or-B options, and do not rewrite from scratch unless asked. See the editing section of `house_style.md`.

## When facts are missing or conflicting

The overviews carry an open-items list and known conflicts (pricing image vs text, neobank geography label). If a request touches one, flag it and ask rather than picking a side. If a needed fact is in neither overview, state that it is not in the knowledge base instead of inventing it; offer to add it once confirmed.
