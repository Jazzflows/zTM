# zTM Project Kit

Everything the zTM Claude Project knows, packaged so a new Project can run the same way from its first chat. Built 31 October 2026.

## How a Claude Project uses this

A Claude Project is set up, not trained. Two parts do the work:

- **Project instructions** are applied in every chat. They carry the rules that must never slip: the skill-routing protocol, the non-negotiable copy rules and the output standards. That is why 01-project-instructions.md is short and absolute.
- **Project knowledge** is the library Claude reads from when a task needs it. It carries the detail: facts, channel styles, workstreams, decisions and the marketing playbooks. Instructions point to it by name, so the right file opens for the right task.

Keep that split when you edit. A rule that must hold every time goes in the instructions. Detail, examples and facts go in knowledge.

## Setup

1. Create a new Project.
2. Open 01-project-instructions.md and paste everything below the line into the Project's instructions.
3. Upload to the Project's knowledge: every file in 02-context, 03-style and 04-knowledge-docs (82 files). Upload them all at once; the file names are unique.
4. Do not upload 00-README.md or 05-skills. Skills belong to the account, not the Project. If the new Project sits in the same account, zvault-writing, marketing-council, launch-status-update and zoth-chain-proposal are already available. If it sits in another account, add the folders in 05-skills there as skills.
5. Memory: if the new Project keeps its memory separate, it starts empty, and these files are its full history. The background memory will build from there.
6. Run the three test prompts below before real work.

## Test prompts

1. "Write an X post announcing that the community sale whitelist opens 2 November 2026."
   Pass: the first line names the skill stack ("Running on: ..."), FLAGS come first, three options on different frameworks with character counts, "community sale" (never "IDO"), no TGE date, referral mentioned.
2. "Write a LinkedIn post on zMAG7."
   Pass: line 1 under 15 words, no yield or APY language, closes with "Available to non-US persons in eligible jurisdictions.", one "Action: link" CTA, FLAGS then 3 hooks then the post.
3. "Give me expert feedback on this headline: zOPAL, 16% APY on your USDC."
   Pass: marketing-council runs, and the reply flags the 16% figure for putting Zocta Points into an APY.

If a test fails, the fix almost always belongs in 01-project-instructions.md, not in a knowledge file.

## What is in the kit

| Path | Contents |
|---|---|
| 01-project-instructions.md | Paste-in instructions: scope, first-message skill routing, non-negotiable rules, output standards |
| 02-context/01-fact-sheet.md | Every company and product fact with a status tag (LOCKED, VOLATILE, VERIFY, INTERNAL, DO NOT USE) |
| 02-context/02-community-sale.md | Canonical community sale reference: timeline, tiers, cashback, referral, disclosures, how it is being marketed |
| 02-context/03-workstreams-and-decisions.md | Every workstream with status, plus the dated decision log |
| 02-context/04-team-and-people.md | The user, the founder's review style, the launch team and external partners |
| 02-context/05-open-items.md | 18 conflicts waiting on a ruling, each with a safe default |
| 03-style/01-house-style.md | The full Zoth house style, merged and de-conflicted |
| 03-style/02-x-style.md | X style for @zothdotio and @thezoctopus, rebuilt from the "Zoth on X" kit and corrected against house style |
| 03-style/03-linkedin-style.md | The LinkedIn spec as set on 31 October 2026, with an application guide and a worked example |
| 03-style/04-working-preferences.md | How the user wants work delivered |
| 03-style/05-knowledge-index.md | Which reference doc to open for which task |
| 04-knowledge-docs/claude | SOOHO.IO partner context |
| 04-knowledge-docs/marketing-council | The 12 advisor dossiers and the advisor template |
| 04-knowledge-docs/marketing-library | 58 marketing playbooks (copy, CRO, ads, creative, email, cold outreach, SEO, AI search) |
| 05-skills | Copies of the account's Zoth skills, for reference or for another account |

## Where it came from

- Context, style and preference files: compiled from the zTM Project's memory, the account-level Zoth memory that bears on zTM, the Community Sale offering page (25 and 26 October 2026), the zvault-writing skill and the "Zoth on X" kit. Where sources disagreed, the newest dated decision was kept and the conflict logged in 05-open-items.md.
- The older "zoth-community-sale-reference" doc is replaced by 02-community-sale.md, which carries the 26 October timeline (sale closes 29 November, allocation 5 December).
- The 12 advisor dossiers, the advisor template and the SOOHO.IO doc are copied from the zTM Project docs.
- The 58 marketing playbooks match the versions uploaded to zTM on 13 September 2026, taken from the public source library they came from at that date.

## Keeping it current

- When a rule changes, edit the one file that owns it, then re-upload that file. House rules live in house-style; channel rules in x-style or linkedin-style; facts in fact-sheet.
- Refresh every VOLATILE figure in fact-sheet monthly, and before any launch moment.
- When an open item is ruled on, update open-items, fact-sheet and house-style together.
