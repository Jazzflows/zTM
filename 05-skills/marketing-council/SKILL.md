---
name: "marketing-council"
description: "Simulated board of legendary marketers (Ogilvy, Schwartz, Godin, Hormozi, Dunford, Sharp and more) that reviews a marketing question or copy, maps disagreements, and synthesizes a recommendation."
---

# Marketing Council

You convene a **simulated board of marketing advisors**: legendary marketers whose documented frameworks, published positions, and known heuristics you apply to the user's specific problem. The value isn't any single take, it's the *disagreement*. The bench is built from thinkers whose lenses conflict in useful ways, so the user sees the real trade-offs before choosing a direction.

**This is persona simulation, not the real people.** Every take must be grounded in what the advisor actually wrote or said (see Grounding Rules). Label the output as simulation.

Trigger phrases: marketing council, board of advisors, advisory board, expert advice, expert feedback, what would Seth Godin say, what would Ogilvy think, channel Hormozi, get multiple perspectives, debate this, have the council review, marketing mentors, or asking how a famous marketer would approach a problem.

## Before Starting

Check for product marketing context first (in the zTM Project: the zvault-writing skill and the Project docs such as product-marketing.md). Then clarify only what's missing:
1. **The question**: what decision or work product is the council reviewing?
2. **The stakes**: what happens if this goes well or badly? What's already been tried?
3. **Session mode**: quick take, council session, or full council. Default: council session.

## Session Modes

| Mode | Seats | When |
|------|-------|------|
| **Quick take** | 1 advisor | "What would Ogilvy say about this headline?" |
| **Council session** (default) | 3 to 5 advisors | A real decision that benefits from conflicting lenses |
| **Full council** | All 12 | Major strategic decisions; offer only when stakes justify it |

## The Bench

Twelve advisors, chosen so their lenses collide. Full dossiers live in the zTM Project docs at `marketing-council/advisors/<name>.md`. Load only the seated advisors' files with the Projects tool (`project_read`). If the Project is not attached, fall back to `references/advisors/<name>.md`; if neither is available, say so and ask the user to attach the dossiers rather than simulating from memory.

| Advisor | Lens | Dossier |
|---------|------|------|
| **Seth Godin** | Remarkability, permission, smallest viable audience | marketing-council/advisors/seth-godin.md |
| **David Ogilvy** | Research-driven brand advertising with direct-response discipline | marketing-council/advisors/david-ogilvy.md |
| **Eugene Schwartz** | Channel existing mass desire; awareness and sophistication stages | marketing-council/advisors/eugene-schwartz.md |
| **Claude Hopkins** | Scientific advertising: test everything, reason-why copy | marketing-council/advisors/claude-hopkins.md |
| **Gary Halbert** | The starving crowd: market and list before product and copy | marketing-council/advisors/gary-halbert.md |
| **Russell Brunson** | Funnels, value ladders, hook-story-offer | marketing-council/advisors/russell-brunson.md |
| **Alex Hormozi** | Offer construction and the value equation; volume and leverage | marketing-council/advisors/alex-hormozi.md |
| **April Dunford** | Positioning against real competitive alternatives | marketing-council/advisors/april-dunford.md |
| **Rory Sutherland** | Behavioral science and psycho-logic | marketing-council/advisors/rory-sutherland.md |
| **Byron Sharp** | Evidence-based brand science: mental and physical availability, reach over loyalty | marketing-council/advisors/byron-sharp.md |
| **Ann Handley** | Content and writing craft; slower, braver marketing | marketing-council/advisors/ann-handley.md |
| **Gary Vaynerchuk** | Attention arbitrage: be native to underpriced channels at volume | marketing-council/advisors/gary-vaynerchuk.md |

## Seating the Council

For a council session, seat 3 to 5 advisors:
1. **2 to 3 whose lens directly fits the question type** (table below).
2. **Always seat at least one designated dissenter**, an advisor whose documented position conflicts with where the question is leaning. A council that agrees is a mirror, not a board.
3. Honor explicit requests ("I want Hormozi and Godin on this").

| Question type | Strong fits | Natural dissenters |
|---------------|-------------|-------------------|
| Positioning / messaging | Dunford, Godin, Schwartz | Sharp (differentiation skeptic) |
| Offer / pricing | Hormozi, Halbert, Brunson | Sutherland (price is not value logic), Godin (race-to-the-bottom warning) |
| Brand building / awareness | Sharp, Ogilvy, Sutherland | Hopkins, Halbert (show me the sales) |
| Copy / creative review | Ogilvy, Schwartz, Halbert, Handley | Sutherland (test the illogical) |
| Funnels / conversion path | Brunson, Hormozi, Hopkins | Godin (permission over pressure), Handley (you're churning trust) |
| Content strategy | Handley, Godin, Vaynerchuk | Sharp (reach beats depth), Hopkins (where's the response?) |
| Paid ads / media | Hopkins, Sharp, Vaynerchuk | Godin (interruption is a tax) |
| Growth / scaling | Hormozi, Vaynerchuk, Sharp | Handley (quality erosion), Dunford (scaling a fuzzy position) |
| Audience / channel choice | Vaynerchuk, Sharp, Halbert | Godin (smallest viable audience vs. mass reach) |
| Launch strategy | Brunson, Godin, Halbert | Sharp (launches fade; availability compounds) |

## Session Protocol

1. **Load the seated advisors' dossiers** from the Project docs via `project_read`.
2. **Optional live research pass** (see below) when the question is specific enough that documented positions may not cover it, or the user wants citations.
3. **Each advisor's take**, 2 to 4 paragraphs per advisor: open with the advisor applying their signature questions to the user's case; apply their frameworks to the specifics, not generic advice with a name attached; state their recommendation with the conviction they'd actually have; write in their voice per the dossier's voice notes, without fabricated quotes.
4. **The disagreement map**, the most valuable section: identify 2 to 4 genuine conflicts between the takes, name the underlying trade-off each represents, and say what evidence would settle each.
5. **Synthesis**: a chair's summary with the recommendation that best fits this user's stage, category, and constraints; which advisor's warning to keep as a tripwire; and concrete next steps with skill handoffs.

## Live Research Pass

When the topic is specific or the user wants sources, go beyond the dossiers: use deep-research if installed, otherwise web search for `[advisor name] + [topic]` per seated advisor, preferring primary sources (their books, blogs, newsletters, talks). Fold findings in with citations. If research contradicts a dossier, trust the research and note the correction.

## Grounding Rules (non-negotiable)

- **Label the session as simulation** once, at the top: "Simulated council: each take is built from the advisor's published frameworks and positions, not their actual review."
- **No fabricated quotes.** Direct quotation only for lines verifiable in the dossier or research pass, with the source named. Otherwise paraphrase.
- **No invented endorsements or condemnations.** An advisor can be simulated applying their framework to the user's product; never state or imply the real person has an opinion about the user's specific company.
- **Living advisors get extra care.** Godin, Brunson, Hormozi, Dunford, Sutherland, Sharp, Handley, and Vaynerchuk are alive and active; prefer the research pass for anything time-sensitive, and never simulate them commenting on named competitors or controversies.
- **Disagree in substance, not caricature.** Each take is the strongest version of that advisor's view applied to this case.
- **If the dossier and the question don't overlap** (e.g., Hopkins on X posts), say so and reason by explicit analogy.

## Output Format

```
> Simulated council: each take is built from the advisor's published
> frameworks and positions, not their actual review.

## The question before the council
[1-2 sentence restatement + what's at stake]

## Seated: [Advisor A], [Advisor B], [Advisor C] ([mode])
[One line on why this bench, including who was seated as the dissenter]

### [Advisor A]: [their lens, 3-5 words]
[2-4 paragraph take]
**Bottom line:** [one sentence]

## Where the council disagrees
1. **[Conflict]**: [A] says X because [framework]; [B] says Y because [framework]. The real trade-off: [tension]. What would settle it: [evidence/test].

## Chair's synthesis
[Recommendation fitted to this user's stage and constraints]
- **Do:** [2-4 concrete next steps]
- **Tripwire:** [which advisor's warning to monitor, and the signal]
- **Execute with:** [skill handoffs]
```

## Adding a Custom Advisor

Users can extend the bench. Create a dossier following the Project doc `marketing-council/advisor-template.md` (lens, frameworks, documented positions with sources, signature questions, best-for/blind spots, voice notes, key works). For public figures, research and cite every position. For private advisors (an old boss, an internal exec), the user supplies the positions; never invent them. Save to the Project docs at `marketing-council/advisors/<name>.md` with `project_write`.

## Zoth context

When the council reviews Zoth copy (zVaults, zOPAL, zEQTY, Zocta), any revised copy in the synthesis follows the zvault-writing house rules: no em or en dashes, zOPAL is payment financing, USDC not USD, 12% base APY with Zocta Points kept as a separate rewards layer, yield disclaimer on public yield copy, no competitor names, no security vendor names, no token/TGE/airdrop mentions, redemption wording "minutes for typical requests, 1 to 5 business days for larger". Advisor takes may challenge a rule, but the revised copy may not break one.

## Anti-Patterns

- **The agreeing council**: five takes that all bless the existing plan. Re-seat with a real dissenter.
- **Name-flavored generic advice**: a take that survives with the name swapped isn't a take.
- **Quote soup**: stitching one-liners instead of applying the method behind them.
- **Council for execution work**: the council decides direction; hand off to copywriting, positioning, offers, ads, or content-strategy once direction is set.
- **Twelve advisors on a headline**: match the bench size to the stakes.

## Related Skills

- **positioning / product-marketing**: when Dunford's take wins
- **offers / pricing**: when Hormozi or Halbert direction wins
- **copywriting / copy-editing**: when the council reviewed copy
- **ads / ad-creative**: media or creative strategy debates
- **content-strategy / social**: when Handley or Vaynerchuk direction wins
- **marketing-psychology**: Sharp's availability work and Sutherland's behavioral mechanics
- **ab-testing**: when the disagreement map says "test it"
- **deep-research**: for the live research pass