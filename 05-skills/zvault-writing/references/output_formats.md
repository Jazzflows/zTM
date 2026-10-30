# Zoth Output Formats

The same facts and voice carry across every output type; the structure and length change. Read this to pick the right shape for the request, then pull facts from the product overviews and apply the house style.

## Proposal (partner or customer)

The flagship format. Branded Word doc, built via a Node.js docx script with the Zoth palette. Reference build pattern: the zVaults proposition document.

Typical structure:
1. Title block, intro (one or two sentences on what the doc covers)
2. What makes Zoth unique (positioning + Traction table + Regulatory backbone)
3. The product (stack + at-a-glance parameter table)
4. Architecture (technical, deployment-agnostic)
5. Distribution or use case (with a case study where one exists)
6. Criteria to onboard
7. Credit risk framework (for vault proposals)
8. Ecosystem (what runs on the platform, as proof)
9. Commercials

Rules: one page must be able to carry the offer on its own (the at-a-glance and traction tables). Every yield states its build-up. Every capability names its provider. Mark illustrative economics. Embed diagrams via cairosvg at 2x, around 600px wide.

## Blog or article

Standalone artifact (.md or .html), published outside the chat. Looser than a proposal but still analyst register: explanatory, not promotional. Lead with the thesis, support with mechanism and named proof. A blog can carry one metaphor where it earns its place; everything else stays literal. No report-style header stack; flowing prose with occasional subheads.

## Memo

Internal or external decision document. Inline or .md, rarely .docx unless a formal deliverable. Claim-first, terse, structured. Open with the decision or recommendation, then the reasoning, then the supporting detail. Tables for any comparison or option set. A memo answers "what should we do and why" in its first paragraph.

## Presentation

Slide deck (.pptx). One idea per slide. Title states the takeaway, not the topic ("zOPAL passes 10% to customers, retains 200 bps" not "zOPAL Economics"). Body is the minimum that supports the title. Tables and diagrams over paragraphs. The deck should read top to bottom from titles alone.

## Partner message (Telegram, Slack, email)

The one place second person and a lower register are allowed. Lowercase conversational tone for chat; one message block per context, blank lines marking send breaks. Still apply flag-before-send discipline: surface any accuracy or disclosure risk separately from the paste-ready message. For email, keep it tighter and more formal than chat but warmer than a memo.

## Choosing inline vs file

- Inline in chat: strategy, summary, outline, analysis, a memo the reader consumes in the thread, web-research answers.
- File: a proposal, blog post, article, deck, or any artifact the reader will copy, publish, or send onward. A blog post is a file even when casually requested; a strategy is inline even when formally requested.
- Default toward Markdown or inline. Use .docx only on a clear signal the reader wants a downloadable Word document.
