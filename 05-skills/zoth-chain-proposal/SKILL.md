---
name: zoth-chain-proposal
description: Generate Zoth × [Chain] partnership proposals as branded Word documents. Use this skill whenever the user mentions creating, drafting, or writing a partnership proposal, grant proposal, ecosystem proposal, or chain proposal for Zoth (e.g. "draft a proposal for Sui", "Zoth × Aptos deck", "write a partnership memo for the Mantle team", "create a proposal for the next chain"). Also use when the user references partner chains by name (Avalanche, Soneium, Sui, Aptos, Sei, Movement, Mantle, Berachain, Monad, Hyperliquid, Plume, etc.) in context of a Zoth deployment, GTM, anchor liquidity, or grant request. The skill captures Zoth's standard proposal structure, voice, and visual theme so each new partner proposal stays on-brand and on-format.
license: Proprietary, internal Zoth use only
---

# Zoth Chain Partnership Proposal

Build a partnership proposal for Zoth deploying its stablecoin neobank stack on a new chain. Output is a polished .docx in Zoth's orange theme, structurally derived from the Soneium and Avalanche proposals.

## When to use

Trigger this skill anytime the user asks for a Zoth proposal, partnership deck, grant memo, or chain GTM document. Also trigger when a chain name appears alongside Zoth product terms (zVault, zPayments, zStocks, Zocta Card, anchor liquidity, milestone grant).

## How this skill works

1. Run the **interview** below first. Do not start drafting until critical answers are locked. Saksham communicates tersely, so present questions in batches and use `ask_user_input_v0` where it speeds things up.
2. Confirm the section list and asks before writing anything.
3. Use `scripts/build_proposal.js` as the working template. Edit it with the user's parameters and run it. Validate the docx, render to PDF, spot-check page 1, deliver.
4. Apply the **style rules** religiously. Saksham will catch every em dash, every restated table, every motivational sentence.

## The Interview

Ask in this order. Stop at any unclear answer and resolve before continuing.

### Round 1, the asks (must have before drafting)

1. **Partner / chain name** and a one-line description of how they position themselves (institutional, retail, gaming, RWA-native, etc).
2. **Anchor liquidity ask** in USD (typical range $5M to $25M).
3. **Grant ask** in USD (typical range $500K to $2.5M).
4. **TVL target at 6 months and 12 months.**
5. **MAU range** (e.g. 25K to 100K, or 50K to 200K).
6. **Settlement volume target** (zPayments $/month).
7. **Page count target** (8-page concise default, 13-page expanded if requested).
8. **Brand accent color** (default Zoth orange `#F58220`; can switch to chain brand color if user prefers).

### Round 2, product layers

9. **Which Zoth products feature in this proposal?** Default is the full stack (zVault, zStocks, zPayments, Zocta Card). Confirm or trim.
10. **zStocks framing.** Generic "tokenized US equities" or themed (e.g. "AI & tech US equities for SEA")? If themed, capture the angle and the ticker basket to highlight.
11. **Privacy-enabled infrastructure track:** include as joint exploration section? (Default yes.)
12. **Phase 2 mobile app:** include the two-phase build narrative ending in a co-branded Avalanche-native style neobank app? (Default yes for chains where Zoth will build a dedicated app.)

### Round 3, GTM and positioning

13. **Distribution markets to emphasize.** Default is UAE, India, Brazil, Argentina, Philippines, Indonesia, Vietnam. Adjust per chain (e.g. SEA-heavy for AI thesis, MENA-heavy for institutional, LATAM-heavy for remittances).
14. **Special positioning hook** if any (e.g. "first fully integrated neobank on Avalanche", "the AI boom for SEA", "the institutional yield layer for Sony's on-chain economy"). One sentence.
15. **Chain ecosystem callouts.** Should the proposal name-drop institutional partners on the chain (BlackRock BUIDL, Franklin BENJI, Apollo ACRED, JPM Kinexys etc) or stay neutral? Saksham's recent default: **stay neutral**, no name-drops.
16. **Existing relationship.** Is there a prior acquisition, integration, or pilot to reference? (e.g. "Zoth acquired Neemo Finance, a Soneium Spark portfolio project.")

### Round 4, structure and breakdown

17. **Grant breakdown line items.** Default split: smart contracts $500K, audit $400K, mobile app $350K, mainnet launch $350K, co-marketing $400K, architecture $300K, vault expansion $50K, year-on-year features $150K. Confirm or adjust to fit the grant ask.
18. **Liquidity season structure.** Three 30-day seasons summing to the 6-month TVL target. Default escalator: $25M → $35M → $40M for $100M total. Adjust per ask.
19. **Yield headline.** Default "up to 12% APY". Confirm.
20. **Chain-specific terminology** (C-Chain, mainnet, L1s, mainnet beta, testnet name, etc.).

### Round 5, optional polish

21. Any chain-specific incentive program, hackathon, or accelerator to reference (e.g. Soneium Spark, Avalanche Rush)?
22. Any partner-specific KPIs to add to the metrics table?
23. Anything in the standard partnerships list (Bakkt, Chainlink, Olea, Haven1, Plume, etc.) that should be removed for this chain (e.g. don't list Plume in a Plume proposal).

Once Round 1 and 2 are answered, you can start drafting page 1 in parallel with asking Rounds 3 to 5.

## Section list (8-page default)

| Page | Sections |
|------|----------|
| 1 | Title, exec summary, Strength × What [Chain] Gets table, 4-metric strip (TVL/MAU/volume/zVaults), Proposition |
| 2 | Why [Chain] × Zoth, four questions, Gap × Opportunity table, Billion-User Opportunity bullets |
| 3 | Stack table (4 layers), capital loop one-liner, Privacy-Enabled Infrastructure section + 2-row table |
| 4 | What We Will Build (5 products consolidated into one dense table) |
| 5 | Joint Liquidity Program intro, Liquidity Seasons table (3 rows), Yield Stack table, LP Terms bullets |
| 6 | Metrics table (7 KPIs), Partnership Requirements table |
| 7 | Grant Request intro, full 6-milestone breakdown table with totals row |
| 8 | Traction table, Funding paragraph, Partnerships line, Next Steps table, Conclusion + ask/return |

For 13-page expanded version: split "What We Will Build" into 5 sub-sections with bullets, expand bullets in opportunity sections, give privacy table its own page.

## Style rules (non-negotiable)

These are Saksham's hard preferences. Violating them will result in a rewrite request.

- **No em dashes (—) or en dashes (–) anywhere.** Use commas, semicolons, periods, colons, parentheses, or restructure the sentence. This includes in product labels (write "zVault, Yield Layer" not "zVault — Yield Layer").
- **VC analyst voice.** Claim-first, table-heavy. One linking sentence between sections maximum. No motivational framing. Sections stand alone.
- **No filler prose.** Do not restate what a table just showed. No "as you can see" or "in summary" sentences.
- **Tables do the heavy lifting.** When a list has 3+ comparable items, use a table. Prose is reserved for narrative bridges.
- **No corporate polish or AI-sounding phrases.** Cut "leverage", "synergy", "ecosystem play", "value add", "best-in-class".
- **Short, punchy outputs.** Sentences <20 words where possible.
- **Bullets are short, parallel, and verb-led where possible.**
- **All numerical asks bolded or color-accented for skim-readability.**

## Visual theme

| Element | Color | Notes |
|---------|-------|-------|
| Primary accent | `#F58220` (Zoth orange) | Headers, table header bars, accent text |
| Body text | `#1C1C1C` | Near-black, not pure black |
| Border lines | `#D9D9D9` | Tables and section rules |
| Alternate row | `#FAFAFA` | Subtle row banding |
| Totals/summary tint | `#FDF1E5` | Light orange for totals rows |

If user requests chain-brand color, swap `#F58220` and adjust the totals tint to a corresponding light shade (~10% saturation of the accent).

## Working with the build script

`scripts/build_proposal.js` is a parameterized template based on the most recent Avalanche concise version. Workflow:

1. Copy `build_proposal.js` to `/home/claude/<workspace>/build.js`.
2. Find and replace all chain-specific values (search for "Avalanche", "C-Chain", anchor amounts, TVL targets, etc).
3. Update the `CONFIG` block at the top with new partner values.
4. Run: `export NODE_PATH=/home/claude/.npm-global/lib/node_modules && node build.js`
5. Validate: `python3 /mnt/skills/public/docx/scripts/office/validate.py output.docx`
6. Render to PDF and visually inspect at least page 1, the grant table page, and the final page.
7. Spot check: search for any em dashes, search for any name-drops the user vetoed, confirm grant amounts sum correctly.

Math sanity checks before delivery:
- Grant milestone amounts must sum to the grant ask total. Print totals row.
- Liquidity season TVL targets must sum to the 90-day TVL target.
- Anchor + chain incentive APY must be plausible vs the headline blended APY.

## Common pitfalls

| Pitfall | Fix |
|---------|-----|
| Em dashes sneak into product labels (e.g. "zVault — Yield Layer") | Always use comma form. Sed-clean before final render: `sed -i 's/ — /, /g'` |
| Stranded section headers across page breaks | Either remove explicit page breaks and let content flow, or shift content above to fill the prior page |
| Grant total math wrong | Compute the totals row programmatically in the script, not hardcoded |
| Restating institutional partners that don't fit | Default to neutral framing. Only name-drop if user explicitly asks. |
| Chain L1 architecture references that don't apply | Match the chain's actual architecture. Avalanche has C-Chain and L1s, Sui has objects, Aptos has Move parallel execution, etc. Don't generic-ify. |
| Tagline forgetting the new positioning hook | The tagline directly under the title is where the special angle goes ("AI & Tech US Tokenized Equities for SEA"). Update it for each proposal. |

## Reference files

- `references/style_guide.md` — Full style guide expanded from the rules above, with examples.
- `references/section_template.md` — Section-by-section content patterns with copy slots to fill in.
- `scripts/build_proposal.js` — Working docx builder, edit and run.

## Output

Deliver as a .docx in `/mnt/user-data/outputs/`. Filename convention: `Zoth_x_<ChainName>.docx`. Always use `present_files` to surface to the user.
