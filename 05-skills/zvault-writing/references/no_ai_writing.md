# No-AI-Writing: How Zoth Should Write

A corrective reference. Read this before producing any Zoth document, and check the draft against it before output. It exists because the current materials read like marketing: padded, repetitive, and indirect. The target is institutional writing, the register an investor, allocator, or credit committee writes in. Say the thing, prove it, stop.

This doc names the specific habits to drop, with examples taken from the real Zoth documents in `examples/`. The product overviews give the facts; the house style gives the voice; this gives the discipline that separates an institutional note from a brochure.

---

## The core problem

Two failures recur across the example documents:

1. **Indirectness.** The point arrives late, wrapped in setup. An investor wants the claim in the first sentence, then the evidence. A brochure builds suspense; a memo does not.
2. **Repetition as persuasion.** The same idea is restated in three sections because restating feels like emphasis. To an institutional reader, repetition reads as having little to say. Each fact gets one home.

Everything below is a specific form of one of these two.

---

## 1. Cut the marketing vocabulary

These words appear repeatedly in the current docs and signal a sales register. They carry no information. Delete them or replace with the concrete fact.

| Banned word or phrase | Why it fails | Replace with |
|---|---|---|
| strategic, strategically | Says nothing; every business action is "strategic" | the actual reason or mechanism |
| foundational | Inflation; "foundational liquidity partner" is just "early partner" | the literal role |
| engineered, carefully designed | Implies effort, not result | what the design does |
| vision | Pitch-deck word | the specific plan or outcome |
| highly competitive, best-in-class | Unverifiable boast | the number that proves it |
| seamless, robust, world-class, cutting-edge | Empty adjectives | delete |
| unlock, empower, leverage (as verb) | Startup filler | the plain verb (use, gain, access) |
| more than yield, not just X | Brochure cadence | state both things plainly |

Test: if a sentence survives deletion of the adjective with no loss of meaning, the adjective was marketing. "Foundational liquidity partner" to "early liquidity partner" loses nothing. "Carefully designed incentive structure" to "incentive structure" loses nothing.

---

## 2. Lead with the claim, not the windup

The current docs open sections with framing before the substance. Invert it.

**Before (from an LP proposal):**
> "This vision is supported by a carefully designed incentive structure engineered to deliver a highly competitive return."

**After:**
> "The program targets up to 12% base APY, plus up to 3% MOVE and 3% ZOCTA in token incentives."

The reader learns the actual terms in the first line. The adjectives ("carefully designed," "engineered," "highly competitive") are gone because the numbers do the work.

**Before:**
> "Early partners gain more than yield. They gain preferential access to new vault launches..."

**After:**
> "Early partners receive preferential access to new vault launches and [the specific terms]."

"Gain more than yield" is a teaser. Cut it and list what they get.

Rule: the first sentence of every section states what the section concludes. If the first sentence is scene-setting, delete it and promote the second.

---

## 3. One fact, one home

The same claims recur across sections in the current materials: the partner network, the distribution numbers, the "creator brings a strategy, Zoth brings the stack" line, redemption timing. Each restatement dilutes the others.

- Pick the single section where a fact lands hardest and state it there, in full, once.
- Elsewhere, reference it or assume it. An institutional reader remembers; they do not need the partner list three times.
- If a fact seems to need repeating, the structure is wrong. Move the fact to the section that needs it most and cut the others.

Test: search the draft for any distinctive figure or phrase. If it appears more than once outside a deliberate summary table, cut the weaker instances.

---

## 4. Numbers and names, not assertions

Institutional writing earns trust through specifics, not adjectives. This is the Edge Capital discipline.

- Replace "audited" with "audited by Entersoft." Replace "secure custody" with "ForDefi MPC, 3-of-5." Replace "investment-grade" with "Baa3 (Cicada Partners)."
- State every yield with its build-up, not the headline alone. "~7% net" should be reachable as (70% x gtUSDA) + (30% x zOPAL).
- A claim with no number and no named source is a claim the reader discounts. Either attach evidence or cut the claim.

---

## 5. Shorter sentences, fewer clauses

Marketing sentences stack clauses to sound substantial. Institutional sentences are flat and short.

**Before:**
> "This proposal invites institutional Liquidity Providers to become foundational participants in Zoth's zVault ecosystem, beginning with yield-bearing strategies that combine institutional-grade infrastructure with a carefully designed incentive structure."

**After:**
> "This proposal invites institutional LPs into the zVault liquidity program. Capital earns base vault yield plus token incentives, under the terms below."

One idea per sentence. If a sentence has three "that" or "which" clauses, break it into three sentences or a table.

---

## 6. Tables for anything structured

Prose describing a comparison, an option set, a fee schedule, or a set of parameters is harder to read than the table it should have been. The current docs already do this well in places; do it everywhere structured content appears. A reader should be able to diligence the document from its tables alone, reading prose only for the connective logic.

---

## 7. No persuasion in the body; let structure persuade

The current docs editorialize ("the pattern is the point," "this is the differentiator," "more than yield"). An institutional reader resents being told what to conclude. Present the facts in an order that makes the conclusion obvious, then stop. The proof section (what runs on the platform, who rated it, what it returns) persuades; the adjectives do not.

---

## Pre-output checklist

Before presenting any Zoth document, run this:

1. Does each section's first sentence state its conclusion? If not, promote the substantive sentence.
2. Search the marketing-word table. Any hit, delete or replace.
3. Search distinctive facts and figures. Any appearing more than once outside a summary table, cut the weaker instances.
4. Does every claim have a number or a named source? If not, attach one or cut the claim.
5. Any sentence over roughly 30 words or with three subordinate clauses? Break it up or table it.
6. Read the document using only the section headers and tables. Does it still convey the offer? If yes, the prose is doing its job as connective tissue, not carrying weight it should not.
7. Remove every adjective that survives deletion without loss of meaning.

The standard is simple: would a credit committee or an allocator read this and find it direct, specific, and free of selling? If it reads like a pitch, it is not done.
