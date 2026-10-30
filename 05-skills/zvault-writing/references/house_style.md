# Zoth House Style

The voice for all Zoth written output: proposals, blogs, memos, presentations, and partner messages. The reference model is an institutional analyst note, not a marketing brochure. The Edge Capital fund proposal is the external benchmark for proof discipline.

## Register

- **Analyst, third person.** Write "Zoth," not "we" or "our." No second-person address ("you") in formal documents; partner chat messages are the only exception.
- **Claim-first sentences.** Lead with the assertion, then support it. "zOPAL targets ~12% from cleared Brazilian card receivables" beats "We are excited to share that zOPAL can offer attractive yields."
- **No persuasion adjectives.** Cut "strong," "robust," "seamless," "hyper-engaged," "first-of-its-kind," "world-class," "cutting-edge." A named third party or a number does the work an adjective cannot.
- **Proof discipline.** Every claim pairs with a mechanism, a named entity, or a figure. State a yield with the fee waterfall beneath it, not the headline alone. Name the auditor (Entersoft), the custodian (ForDefi), the rating partner (Cicada), not "audited" or "secure."

## Formatting

- **Tables over prose** for anything structured: parameters, comparisons, criteria, fees, status. A reader should be able to diligence the document from its tables.
- **Minimal prose between tables.** One or two framing sentences, then the table.
- **No repetition.** Each fact gets one home, in the section where it lands hardest. Do not restate distribution numbers, the stack-vs-creator split, or redemption timing in multiple sections.
- **Headers and bullets** earn their place; do not over-format. Bullets are at least a full clause.
- **Bold the lead-in label** on bullets and notes, then continue in regular weight: "**Optimized one-time setup:** $20,000 one-time, then $6,500 per month," "**Note:** Zoth does not separately charge for distribution." The bold label carries the scan; the value follows unbolded.

## Hard rules

- **Never use dashes.** No em dashes, no en dashes, anywhere. Use commas, colons, "to" for ranges ("1 to 5 business days"), or restructure the sentence.
- **Table headers are Zoth orange (#FF4509) with white text, never black.**
- **Tables span the full content width.** Every table stretches edge to edge between the margins, with fixed layout (`tblLayout` fixed) and column widths scaled proportionally to fill the content width. Never leave a table at a default width narrower than the text block.
- **Brand palette:** primary #FF4509, tint #FFE8DD, body #1C1C1C, borders #D9D9D9, alt row #FAFAFA. Diagram bands: success green #EAF3DE/#639922, revert red #FCEBEB/#A32D2D. Always pastel fills, never dark or saturated boxes.
- **Typography is EB Garamond, the document default.** Body in EB Garamond Medium, headings in EB Garamond. H1 orange (#FF4509), H2 body color (#1C1C1C). This replaces the earlier per-proposal font choices (Times New Roman, Arial, DM Sans).
- **Monthly TPV is always $40M+** unless explicitly told otherwise.
- **Strategy AUM, never bare "AUM."** It is capital deployed in the underlying strategy, distinct from vault TVL.

## Terminology (get these exactly right)

| Correct | Wrong |
|---|---|
| Payment financing (zOPAL) | Private credit |
| USDC | USD |
| WBTC, LBTC, cbBTC | BTC |
| PAXG, PAXGy | Gold |
| Strategy AUM | AUM |
| zTOKEN (in deployment-agnostic / technical docs) | zOPAL |
| Vault onboarding is permissioned; deposits are permissionless | "permissionless" used loosely |
| Redemption obligor | "stands behind the vault" |
| zoUSD blends gtUSDA 70% + zOPAL 30% | any other split |

- zOPAL is **not** built on FAAST. FAAST is a separate, opt-in regulated wrapper.
- Zocta Points are a separate reward layer, never blended into a stated APY.

## Flag-before-output discipline

Before presenting any paste-ready or external-facing output, surface accuracy and disclosure risks in a short list, separately from the output itself, never instead of it. Flag:

- **Volatile metrics** (`[VOLATILE]` in the overviews): Strategy AUM, TPV, APY, TVL, wallet/community counts, day counts. These drift; confirm before external use.
- **Unannounced counterparties** (`[UNANNOUNCED]`): anonymize externally. Paxos descriptor when needed: "one of North America's largest stablecoin issuers."
- **Illustrative economics** (`[ILLUSTRATIVE]`): never present as actual or achieved.
- **In-progress items** (`[IN PROGRESS]`): soften verb tense ("is launching" becomes "is bringing on").
- **Internal-only facts** (`[INTERNAL]`): legal entity names, specific contract addresses, revenue splits. Use "Zoth operating entity" externally unless cleared.
- **Known conflicts**: the pricing-image-vs-text mismatch, the neobank geography label. Do not silently pick a side.

The flag list comes first, then the paste-ready output. Both, never one instead of the other.

## Editing existing Zoth text

- Preserve the author's structure and voice. Edit in place; do not rewrite from scratch.
- Light grammar and phrasing cleanup only, unless a restructure is explicitly requested.
- Corrections as specific options (A or B), not open-ended feedback.
- No more than two take-or-leave suggestions per pass.
- Do not add caveats where execution is what is wanted; pushback is fine but stay direct.
