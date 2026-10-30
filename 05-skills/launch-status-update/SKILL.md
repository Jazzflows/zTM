---
name: launch-status-update
description: "Generate structured launch status updates for leadership from project trackers, spreadsheets, or conversation context. Use this skill whenever the user asks for a status update, launch update, project summary for leadership, standup summary, blocker report, or anything that involves categorizing tasks by status (done/pending/blocked) and presenting them with ownership and ETAs. Also trigger when the user mentions 'update for Pritam', 'share with leadership', 'summary of where we are', 'launch readiness', or wants to convert a task tracker into a structured update. This skill applies to any product launch context, not just zVault."
---

# Launch Status Update Skill

Generate concise, leadership-ready status updates from project data. These updates are meant to be shared on Telegram, Slack, or email with decision makers who need a fast read on what is done, what is stuck, and what needs their attention.

## Input Sources

The update can be built from any combination of:
- Uploaded spreadsheet (.xlsx, .csv) with task/status columns
- Project knowledge (PRDs, risk registers, audit trackers)
- Conversation context (the user describes what happened verbally)
- Memory of past conversations about the project

Always cross-reference multiple sources. A spreadsheet may show "WIP" but conversation context may reveal something is actually blocked.

## Output Structure

Use this exact section hierarchy. Skip a section only if there is genuinely nothing to put in it.

```
**[Project Name] [Update Type] | [Date]**

**Concerns**
Items that are not blockers but need a decision, clarification, or flag to leadership. These are strategic or commercial issues, not task-level items.
Format: Numbered list. Bold heading per item. 2-3 sentence explanation of the concern and its implication. End with Owner.

**Ops Readiness** (include only when ops maturity is a relevant narrative)
A short narrative paragraph followed by bullet points showing specific steps taken.
Purpose: Show leadership that operational groundwork is being laid proactively, not reactively.
Include: documented workflows, automation, team training, monitoring, audit trails, recurring rhythms.
End with an honest line about what still needs practice or refinement.

**Major Blockers**
Items that will prevent launch if not resolved. These are hard gates.
Format: Numbered list. Bold heading per item. 1-2 sentences on what is stuck and why. End with Owner and ETA.

**Pending**
Items that are in progress or queued but not blocking launch. Work is happening.
Format: Numbered list. Bold heading per item. 1 sentence on current state. End with Owner.

**Done**
Items completed. Keep these brief but include them so leadership sees momentum.
Format: Numbered list. Bold heading per item. 1 sentence on what was delivered and who reviewed it.

**Not Immediate**
Items that matter but are not needed for the current milestone. Parking lot.
Format: Numbered list. Bold heading per item. 1 sentence on what it is and when it will be picked up.
```

## Formatting Rules

1. Every numbered item starts with a **Bold Heading:** followed by the detail.
2. Owners are always named as full names (not just first names) on blocker items. First names are acceptable in Done/Not Immediate.
3. ETAs are included on Major Blockers. Optional on Pending.
4. No dashes (em or en) in the output. Use commas, periods, or rewrite.
5. No bullet points inside numbered items. Keep each item as a continuous sentence or two.
6. Language should be direct and natural. Not polished corporate prose. Write like you are telling a colleague what is going on.
7. Concerns section items should always explain the implication, not just state the issue. "X is happening" is not enough. "X is happening, which means Y for us" is the right pattern.
8. Numbers use plain style: "2 Apr" not "April 2nd", "4 out of 10" not "4/10", "$100" not "$100.00".

## Categorization Logic

Use these rules to sort items into the right section:

| Signal | Category |
|---|---|
| Agreement/contract unsigned and needed for launch | Major Blocker |
| End-to-end validation not done | Major Blocker |
| Dependency on external party with no confirmed date | Major Blocker |
| Work in progress, owner is active, no hard dependency | Pending |
| Needs a decision from leadership before it can move | Concerns |
| Commercial or strategic misalignment with a partner | Concerns |
| Completed and reviewed | Done |
| Needed for a later milestone (Beta, Public) | Not Immediate |
| Blocked by another blocker (chain dependency) | Major Blocker, note which blocker it depends on |

## Tone and Voice

- First person plural ("we", "our") when describing team actions
- Direct attribution ("Tejas has reviewed", "Avanish owns this")
- Honest about risks ("we expect things to not go perfectly smooth")
- No hedging language ("perhaps", "it might be worth considering")
- No filler ("it should be noted that", "it is important to mention")
- Concerns should feel like you are flagging something to a senior partner, not writing a memo

## Process

1. Read all available data sources (spreadsheet, project knowledge, conversation)
2. Build a raw list of all items with their true status
3. Categorize each item using the logic table above
4. Draft the update in the structure above
5. Review: Does every blocker have an owner and ETA? Does every concern explain its implication? Are done items actually done or just "mostly done"?
6. If the user provides corrections or rephrasing, apply them exactly. Do not rewrite their voice.

## Common Mistakes to Avoid

- Putting an item in "Pending" when it is actually blocked by an unsigned agreement (that is a Blocker)
- Listing a concern without explaining why it matters
- Making "Done" items too verbose. One sentence is enough.
- Formatting owners inconsistently (sometimes full name, sometimes first name, sometimes role)
- Using dashes anywhere in the output
- Restructuring the user's own phrasing when they provide corrections. Preserve their voice.
