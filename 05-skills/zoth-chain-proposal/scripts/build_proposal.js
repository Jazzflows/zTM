const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, PageOrientation, LevelFormat,
  TabStopType, TabStopPosition, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, PageBreak
} = require('docx');

// ============================================================
// CONFIG — Edit this block per partner
// ============================================================
const CONFIG = {
  // Partner identity
  CHAIN: "Avalanche",                       // e.g. "Avalanche", "Sui", "Aptos"
  CHAIN_TERMINOLOGY: "C-Chain",             // e.g. "C-Chain", "mainnet", "Sui mainnet"
  TAGLINE: "Yield Infrastructure, AI & Tech US Tokenized Equities for SEA, Cross-Border Payments, Cards & Privacy-Enabled Stack",

  // Theme
  ACCENT: "F58220",                         // Zoth orange default; swap to chain brand if user prefers
  ACCENT_LIGHT: "FDF1E5",                   // Light tint for totals row
  DARK: "1C1C1C",
  ROW_ALT: "FAFAFA",
  BORDER_GREY: "D9D9D9",

  // Asks
  ANCHOR_USD: "$25M",
  GRANT_USD: "$2.5M",
  YIELD_HEADLINE: "up to 12%",              // e.g. "up to 12%", "up to 11%"
  BLENDED_APY_HEADLINE: "up to 22%",        // base + ZOTH + chain max

  // Targets
  TVL_6MO: "$100M",
  TVL_12MO: "$250M",
  MAU_RANGE: "50K to 200K",
  MAU_6MO: "50,000",
  MAU_12MO: "200,000",
  SETTLEMENT_6MO: "$20M+",
  SETTLEMENT_12MO: "$50M+",
  ZSTOCKS_AUM_6MO: "$10M+",
  ZSTOCKS_AUM_12MO: "$40M+",

  // Liquidity Seasons (must sum to 90-day TVL target)
  SEASON_1_TVL: "$25M",
  SEASON_2_TVL: "$35M",
  SEASON_3_TVL: "$40M",
  SEASON_1_TOTAL: "up to 22%",
  SEASON_2_TOTAL: "up to 18%",
  SEASON_3_TOTAL: "up to 16%",

  // Grant breakdown (must sum to GRANT_USD)
  M1_PCT: "12%", M1_AMT: "$300K", M1_NAME: "Architecture & [Chain] Setup",
  M2_PCT: "20%", M2_AMT: "$500K", M2_NAME: "Smart Contract Development",
  M3_PCT: "16%", M3_AMT: "$400K", M3_NAME: "Tier-1 Security Audit",
  M4_PCT: "28%", M4_AMT: "$700K", M4_NAME: "Mainnet Launch + Mobile App Build",
  M5_PCT: "16%", M5_AMT: "$400K", M5_NAME: "Co-Marketing & Ecosystem Activation",
  M6_PCT: "8%",  M6_AMT: "$200K", M6_NAME: "Scale, Vault Expansion & YoY Features",
  GRANT_TOTAL_PCT: "100%",

  // Distribution markets, prioritized
  MARKETS: "UAE, India, Brazil, Argentina, Philippines, Indonesia, Vietnam",
  MARKETS_SHORT: "SEA, India, UAE, Brazil, Argentina",

  // Positioning hook (single sentence; appears in conclusion's return clause)
  POSITIONING_HOOK: "the chain that gave SEA and the Global South one-tap access to the US AI boom",

  // Output
  OUT_PATH: "/mnt/user-data/outputs/Zoth_x_<Chain>.docx",
};

// Apply CONFIG-derived shortcuts so the rest of the script reads cleanly
const ACCENT = CONFIG.ACCENT;
const DARK = CONFIG.DARK;
const HEADER_BG = CONFIG.ACCENT_LIGHT;
const ROW_ALT = CONFIG.ROW_ALT;
const BORDER_GREY = CONFIG.BORDER_GREY;
const CHAIN = CONFIG.CHAIN;

const border = { style: BorderStyle.SINGLE, size: 4, color: BORDER_GREY };
const borders = { top: border, bottom: border, left: border, right: border };

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.afterSpace ?? 100, ...(opts.spacing || {}) },
    alignment: opts.alignment,
    children: [new TextRun({ text, bold: opts.bold, italics: opts.italics, color: opts.color, size: opts.size || 20, font: "Calibri" })]
  });
}

function pruns(runs, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.afterSpace ?? 100, ...(opts.spacing || {}) },
    alignment: opts.alignment,
    children: runs.map(r => new TextRun({ ...r, font: "Calibri", size: r.size || 20 }))
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 220, after: 100 },
    children: [new TextRun({ text, bold: true, color: ACCENT, size: 30, font: "Calibri" })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 160, after: 80 },
    children: [new TextRun({ text, bold: true, color: ACCENT, size: 24, font: "Calibri" })]
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 40 },
    children: [new TextRun({ text, size: 20, font: "Calibri" })]
  });
}

function cell(text, opts = {}) {
  return new TableCell({
    borders,
    width: { size: opts.width, type: WidthType.DXA },
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 70, bottom: 70, left: 110, right: 110 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      spacing: { after: 0 },
      children: [new TextRun({ text, bold: opts.bold, color: opts.color || DARK, size: opts.size || 18, font: "Calibri" })]
    })]
  });
}

function cellMulti(lines, opts = {}) {
  return new TableCell({
    borders,
    width: { size: opts.width, type: WidthType.DXA },
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: { top: 70, bottom: 70, left: 110, right: 110 },
    verticalAlign: VerticalAlign.CENTER,
    children: lines.map(line => new Paragraph({
      spacing: { after: 30 },
      children: [new TextRun({ text: line, bold: opts.bold, color: opts.color || DARK, size: opts.size || 18, font: "Calibri" })]
    }))
  });
}

function makeTable(widths, rows) {
  const total = widths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: widths,
    rows
  });
}

const children = [];

// === PAGE 1: Title + Executive Summary ===
children.push(new Paragraph({
  alignment: AlignmentType.LEFT,
  spacing: { after: 60 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 14, color: ACCENT, space: 4 } },
  children: [new TextRun({ text: "Zoth × Avalanche", bold: true, color: DARK, size: 48, font: "Calibri" })]
}));

children.push(new Paragraph({
  spacing: { before: 140, after: 60 },
  children: [new TextRun({ text: "The Stablecoin Neobank for Avalanche", bold: true, color: DARK, size: 28, font: "Calibri" })]
}));

children.push(new Paragraph({
  spacing: { after: 160 },
  children: [new TextRun({ text: "Yield Infrastructure, AI & Tech US Tokenized Equities for SEA, Cross-Border Payments, Cards & Privacy-Enabled Stack", italics: true, color: DARK, size: 20, font: "Calibri" })]
}));

children.push(p("Zoth is a stablecoin-first neobank, the financial operating system for on-chain economies. Deploying the full Zoth stack on Avalanche brings institutional-grade yield, AI and tech US tokenized equities access for SEA, real cross-border payments, and a 1.8M+ wallet distribution network natively to Avalanche C-Chain.", { size: 20 }));

children.push(p("Two-phase build. Phase 1: zPayments and zVault yield infrastructure go live natively on Avalanche C-Chain, $25M+ monthly TPV, up to 12% RWA-backed APY from Day 1. Phase 2: the first fully integrated Avalanche-native neobank under a co-branded identity, yield + AI/tech US equities + cross-border payments + Zocta Card unified in one app, one wallet, one KYC, one balance.", { size: 20 }));

children.push(makeTable([3500, 5860], [
  new TableRow({ tableHeader: true, children: [
    cell("Zoth Strength", { fill: ACCENT, color: "FFFFFF", bold: true, width: 3500 }),
    cell("What Avalanche Gets", { fill: ACCENT, color: "FFFFFF", bold: true, width: 5860 }),
  ]}),
  new TableRow({ children: [
    cell("zVault Liquid Assets, RWA-backed, live", { width: 3500 }),
    cell("First fully integrated institutional-grade yield infrastructure on Avalanche", { width: 5860 }),
  ]}),
  new TableRow({ children: [
    cell("zStocks: AI & tech US tokenized equities for SEA", { width: 3500, fill: ROW_ALT }),
    cell("First app on Avalanche giving SEA and Global South users one-tap access to NVDA, MSFT, GOOGL, META, AMZN and the US AI boom", { width: 5860, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("zPayments cross-border settlement", { width: 3500 }),
    cell("Real cross-border volume from Day 1, $25M+/month TPV across 160+ countries", { width: 5860 }),
  ]}),
  new TableRow({ children: [
    cell("Zocta Card, the spend layer", { width: 3500, fill: ROW_ALT }),
    cell("Daily on-chain activity from yield-earning balances, prevents capital outflows", { width: 5860, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("1.8M+ wallet user base", { width: 3500 }),
    cell("Ready distribution onto Avalanche, no consumer acquisition spend required", { width: 5860 }),
  ]}),
  new TableRow({ children: [
    cell("Privacy-Enabled Infrastructure (joint exploration)", { width: 3500, fill: ROW_ALT }),
    cell("Co-designed confidentiality layer for enterprise treasuries and institutional LPs", { width: 5860, fill: ROW_ALT }),
  ]}),
]));

children.push(p("", { afterSpace: 80 }));

children.push(makeTable([2340, 2340, 2340, 2340], [
  new TableRow({ tableHeader: true, children: [
    cell("Sticky TVL", { fill: ACCENT, color: "FFFFFF", bold: true, width: 2340 }),
    cell("Monthly Active Users", { fill: ACCENT, color: "FFFFFF", bold: true, width: 2340 }),
    cell("Settlement Volume", { fill: ACCENT, color: "FFFFFF", bold: true, width: 2340 }),
    cell("Active zVaults", { fill: ACCENT, color: "FFFFFF", bold: true, width: 2340 }),
  ]}),
  new TableRow({ children: [
    cell("$100M+ (6 months)", { width: 2340, bold: true }),
    cell("50K to 200K", { width: 2340, bold: true }),
    cell("$20M+/month", { width: 2340, bold: true }),
    cell("2+ by Month 6", { width: 2340, bold: true }),
  ]}),
]));

children.push(p("", { afterSpace: 100 }));

children.push(pruns([
  { text: "The Proposition: ", bold: true, color: ACCENT, size: 20 },
  { text: "$25M anchor liquidity into zVault Liquid Yield Assets, $2.5M milestone-gated grant, chain incentive co-funding across three liquidity seasons, joint co-marketing & ecosystem activation.", size: 20 }
]));

// === PAGE 2: Why Avalanche + Gap Table + Opportunity ===
children.push(new Paragraph({ children: [new PageBreak()] }));

children.push(h1("Why Avalanche × Zoth"));
children.push(p("Avalanche has positioned itself as a high-performance institutional chain: sub-second finality, customizable L1 architecture, EVM compatibility. But infrastructure alone is not a destination. The next competitive advantage belongs to networks that answer four questions allocators, fintech builders, and Global South users are actively asking:", { size: 20 }));

children.push(bullet("Where can users park stablecoins and earn institutional-grade yield without bridging to CeFi?"));
children.push(bullet("How do SEA and Global South users access the US AI boom (NVDA, MSFT, GOOGL, META) without broker-dealer friction?"));
children.push(bullet("How do users access cross-border settlement and a working spend layer in the same app?"));
children.push(bullet("Why would users stay on this chain after the transaction completes?"));

children.push(makeTable([4680, 4680], [
  new TableRow({ tableHeader: true, children: [
    cell("The Gap Avalanche Needs to Fill", { fill: ACCENT, color: "FFFFFF", bold: true, width: 4680 }),
    cell("The Opportunity Zoth Unlocks", { fill: ACCENT, color: "FFFFFF", bold: true, width: 4680 }),
  ]}),
  new TableRow({ children: [
    cell("TVL that rotates between protocols with no lock-in", { width: 4680 }),
    cell("Balances locked in productive, yield-generating positions, up to 12% APY creates daily switching costs", { width: 4680 }),
  ]}),
  new TableRow({ children: [
    cell("SEA and Global South users locked out of the US AI boom by brokerage friction, FX cost, and minimums", { width: 4680, fill: ROW_ALT }),
    cell("zStocks ships AI and tech US tokenized equities (NVDA, MSFT, GOOGL, META, AMZN, AVGO, AMD, TSLA) natively from Day 1", { width: 4680, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("DeFi volume driven by speculation and one-time swaps", { width: 4680 }),
    cell("Real economic flows: payroll, remittances, B2B settlement via zPayments across 160+ countries", { width: 4680 }),
  ]}),
  new TableRow({ children: [
    cell("Infrastructure for developers with no end-user destination", { width: 4680, fill: ROW_ALT }),
    cell("A financial destination for retail, institutions, and enterprise treasuries via the full Zoth neobank stack", { width: 4680, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("Reach limited to crypto-native communities in developed markets", { width: 4680 }),
    cell("Direct distribution to 1.4B+ underbanked Global South users via Zoth's 1.8M+ wallet network", { width: 4680 }),
  ]}),
  new TableRow({ children: [
    cell("On-chain transparency exposes enterprise treasury and counterparty data", { width: 4680, fill: ROW_ALT }),
    cell("Privacy-enabled infrastructure stack co-designed with Avalanche, shielded positions and confidential routing", { width: 4680, fill: ROW_ALT }),
  ]}),
]));

children.push(h2("The Billion-User Opportunity"));
children.push(p("The Global South is the largest untapped market for stablecoin adoption. Within that, SEA is the sharpest wedge: 680M+ people, deep retail investing culture, and rising appetite to participate in the US AI boom that local brokers cannot easily deliver.", { size: 20 }));

children.push(bullet("1.4B+ underbanked adults across UAE, India, Brazil, Argentina, Philippines, Indonesia, Vietnam"));
children.push(bullet("$702B+ annual remittance flows perfect for stablecoin rails"));
children.push(bullet("US AI boom inaccessible: SEA retail cannot easily buy NVDA, MSFT, GOOGL, META locally; ETF wrappers carry 1 to 3% expense ratios plus 1 to 2% FX leakage"));
children.push(bullet("Yield up to 12% on USD vs. <3% on local deposits, combined with one-tap AI exposure and instant settlement, creates lock-in nothing else replicates"));

// === PAGE 3: Stack + Capital Loop + Privacy + What We Will Build ===
children.push(new Paragraph({ children: [new PageBreak()] }));

children.push(h1("The Zoth Stablecoin Neobank Stack"));
children.push(p("Four integrated product layers, each reinforcing the others, creating compounding capital gravity on Avalanche.", { size: 20 }));

children.push(makeTable([2200, 3580, 3580], [
  new TableRow({ tableHeader: true, children: [
    cell("Layer", { fill: ACCENT, color: "FFFFFF", bold: true, width: 2200 }),
    cell("What It Is", { fill: ACCENT, color: "FFFFFF", bold: true, width: 3580 }),
    cell("What It Does for Avalanche", { fill: ACCENT, color: "FFFFFF", bold: true, width: 3580 }),
  ]}),
  new TableRow({ children: [
    cell("zVault, the Yield Layer", { width: 2200, bold: true }),
    cell("Institutional-grade RWA-backed yield up to 12%+ APY from T-Bills, short-duration credit, DeFi. CIMA/BVI regulated", { width: 3580 }),
    cell("Converts idle USDC/USDT into productive, locked TVL", { width: 3580 }),
  ]}),
  new TableRow({ children: [
    cell("zStocks, the AI & Tech US Equities Layer", { width: 2200, bold: true, fill: ROW_ALT }),
    cell("AI/tech US tokenized equities for SEA: NVDA, MSFT, GOOGL, META, AMZN, AVGO, AMD, TSLA. Dividends auto-compound to vault, 1-tap from yield balance", { width: 3580, fill: ROW_ALT }),
    cell("Unlocks the US AI boom for the next 1B users, sticky engagement loop", { width: 3580, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("zPayments, the FX Layer", { width: 2200, bold: true }),
    cell("Cross-border settlement, $25M+ monthly TPV, 160+ countries, 99.1% success rate, 78+ Indian banks via CSBK", { width: 3580 }),
    cell("Real, recurring payment volume scaling to $20M+/month", { width: 3580 }),
  ]}),
  new TableRow({ children: [
    cell("Zocta Card, the Spend Layer", { width: 2200, bold: true, fill: ROW_ALT }),
    cell("Physical and virtual card; spend from zVault while capital earns yield until the moment of spend", { width: 3580, fill: ROW_ALT }),
    cell("Daily on-chain activity, prevents capital outflows", { width: 3580, fill: ROW_ALT }),
  ]}),
]));

children.push(p("", { afterSpace: 60 }));

children.push(pruns([
  { text: "The capital loop: ", bold: true, color: ACCENT, size: 20 },
  { text: "User deposits USDC, earns up to 12% in zVault, 1-tap allocates to zStocks (NVDA, MSFT, GOOGL, META), dividends auto-compound to vault, settles cross-border via zPayments, spends via Zocta Card. Balance stays on Avalanche. Every day capital stays, switching cost compounds.", size: 20 }
]));

children.push(h1("Privacy-Enabled Infrastructure: A Joint Exploration Track"));
children.push(p("Privacy infrastructure is a co-design track with Avalanche, not a shipped product. The unlock for enterprise treasuries and institutional LPs that cannot deploy on fully transparent public chains. Avalanche's customizable L1 architecture is the right environment to co-design this.", { size: 20 }));

children.push(makeTable([3000, 6360], [
  new TableRow({ tableHeader: true, children: [
    cell("Application", { fill: ACCENT, color: "FFFFFF", bold: true, width: 3000 }),
    cell("What It Unlocks", { fill: ACCENT, color: "FFFFFF", bold: true, width: 6360 }),
  ]}),
  new TableRow({ children: [
    cell("zPayments Privacy", { width: 3000, bold: true }),
    cell("Shielded counterparty identities, transaction amounts, and routing paths. Private B2B payroll, supplier and treasury flows. FATF Travel Rule and AML preserved via selective disclosure.", { width: 6360 }),
  ]}),
  new TableRow({ children: [
    cell("zVault Privacy", { width: 3000, bold: true, fill: ROW_ALT }),
    cell("Shielded deposits, yield accrual, and portfolio allocation. ZK attestation for NAV and Proof of Reserves verifiable by regulators without exposing position-level data. Enterprise treasuries deploy without exposing data on-chain.", { width: 6360, fill: ROW_ALT }),
  ]}),
]));

// === PAGE 4: What We Will Build (compressed table) ===
children.push(new Paragraph({ children: [new PageBreak()] }));

children.push(h1("What We Will Build on Avalanche"));

children.push(makeTable([2200, 7160], [
  new TableRow({ tableHeader: true, children: [
    cell("Product", { fill: ACCENT, color: "FFFFFF", bold: true, width: 2200 }),
    cell("What Ships on Avalanche", { fill: ACCENT, color: "FFFFFF", bold: true, width: 7160 }),
  ]}),
  new TableRow({ children: [
    cell("1. zVault, Yield Infrastructure", { width: 2200, bold: true }),
    cellMulti([
      "Smart contracts deployed natively on Avalanche C-Chain: deposit, redemption, NAV accrual with full on-chain transparency",
      "NAV oracle: biweekly attestation via decentralized oracle network, real-time Proof of Reserves",
      "zVault Liquid Yield Assets on Avalanche, up to 12%+ APY from diversified RWA and DeFi strategies",
      "MPC custody, no single point of failure. CIMA/BVI regulated fund structure, ring-fenced, bankruptcy-remote"
    ], { width: 7160 }),
  ]}),
  new TableRow({ children: [
    cell("2. zStocks, AI & Tech US Equities for SEA", { width: 2200, bold: true, fill: ROW_ALT }),
    cellMulti([
      "AI/tech-focused basket: NVDA, MSFT, GOOGL, META, AMZN, AVGO, AMD, TSLA, PLTR, ORCL, plus SMH, SOXX, QQQ",
      "250+ tokenized US equities, ETFs, and index tokens, with the AI/tech basket as default discovery surface for SEA users",
      "Dividends auto-compound into zVault: AI equity exposure plus yield in one balance",
      "1-tap from USDC balance to AI exposure, no separate brokerage flow, no FX leakage. Compliance baked into the rail",
      "SEA-prioritized rollout: Philippines, Indonesia, Vietnam, plus India, UAE, Brazil, Argentina"
    ], { width: 7160, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("3. zPayments, Cross-Border Settlement", { width: 2200, bold: true }),
    cellMulti([
      "Smart routing engine across 160+ country corridors, 99.1% success rate, Rs 25B+ annualized run rate",
      "78+ Indian banks via CSBK gateway. B2B and merchant settlement: payroll, supplier, treasury",
      "Never holds customer funds, zero balance sheet risk",
      "Optional confidential settlement track via privacy-enabled infrastructure"
    ], { width: 7160 }),
  ]}),
  new TableRow({ children: [
    cell("4. Zocta Card, Spend Layer", { width: 2200, bold: true, fill: ROW_ALT }),
    cellMulti([
      "Physical and virtual card, instant issuance to retail and B2B",
      "Spend directly from zVault balances while capital earns yield until the moment of spend",
      "On-chain rewards via Zocta loyalty: high-frequency activity drives retention without capital outflows"
    ], { width: 7160, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("5. Avalanche-Native Neobank Mobile App (Phase 2)", { width: 2200, bold: true }),
    cellMulti([
      "Co-branded identity for Avalanche users, native iOS and Android",
      "Full integration of zVault, zStocks, zPayments, Zocta Card. One wallet, one KYC, one balance",
      "Distribution to Zoth's 1.8M+ user base, SEA prioritized for AI equity launch",
      "Year-on-year feature roadmap funded as part of grant scope"
    ], { width: 7160 }),
  ]}),
]));

// === PAGE 5: Joint Liquidity + Seasons + Yield Stack + LP Terms ===
children.push(new Paragraph({ children: [new PageBreak()] }));

children.push(h1("Joint Liquidity Incentive Program"));
children.push(p("Zoth and Avalanche co-design a liquidity bootstrapping campaign. Avalanche co-funds the chain incentive APY layer; Zoth funds $ZOTH rewards and all vault infrastructure. Together: up to 22% blended APY for institutional LPs, a structure neither party can offer alone.", { size: 20 }));

children.push(pruns([
  { text: "This is not a short-term yield farm. ", bold: true, size: 20 },
  { text: "It is a foundational position in regulated on-chain RWA infrastructure on Avalanche before the market broadly recognizes its scale.", size: 20 }
]));

children.push(h2("Liquidity Seasons: $100M TVL in 90 Days"));
children.push(makeTable([1500, 1700, 1500, 1500, 1660, 1500], [
  new TableRow({ tableHeader: true, children: [
    cell("Season", { fill: ACCENT, color: "FFFFFF", bold: true, width: 1500 }),
    cell("TVL Target", { fill: ACCENT, color: "FFFFFF", bold: true, width: 1700 }),
    cell("Duration", { fill: ACCENT, color: "FFFFFF", bold: true, width: 1500 }),
    cell("Base APY", { fill: ACCENT, color: "FFFFFF", bold: true, width: 1500 }),
    cell("$ZOTH + Chain", { fill: ACCENT, color: "FFFFFF", bold: true, width: 1660 }),
    cell("Total APY", { fill: ACCENT, color: "FFFFFF", bold: true, width: 1500 }),
  ]}),
  new TableRow({ children: [
    cell("Season 1", { width: 1500, bold: true }),
    cell("$25M", { width: 1700 }),
    cell("30 days", { width: 1500 }),
    cell("up to 12%", { width: 1500 }),
    cell("5% + 5%", { width: 1660 }),
    cell("up to 22%", { width: 1500, bold: true }),
  ]}),
  new TableRow({ children: [
    cell("Season 2", { width: 1500, bold: true, fill: ROW_ALT }),
    cell("$35M", { width: 1700, fill: ROW_ALT }),
    cell("30 days", { width: 1500, fill: ROW_ALT }),
    cell("up to 12%", { width: 1500, fill: ROW_ALT }),
    cell("3% + 3%", { width: 1660, fill: ROW_ALT }),
    cell("up to 18%", { width: 1500, bold: true, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("Season 3", { width: 1500, bold: true }),
    cell("$40M", { width: 1700 }),
    cell("30 days", { width: 1500 }),
    cell("up to 12%", { width: 1500 }),
    cell("2% + 2%", { width: 1660 }),
    cell("up to 16%", { width: 1500, bold: true }),
  ]}),
]));

children.push(h2("Yield Stack"));
children.push(makeTable([2860, 4500, 2000], [
  new TableRow({ tableHeader: true, children: [
    cell("Component", { fill: ACCENT, color: "FFFFFF", bold: true, width: 2860 }),
    cell("Source", { fill: ACCENT, color: "FFFFFF", bold: true, width: 4500 }),
    cell("Funded By", { fill: ACCENT, color: "FFFFFF", bold: true, width: 2000 }),
  ]}),
  new TableRow({ children: [
    cell("Base Yield (up to 12%)", { width: 2860, bold: true }),
    cell("RWA: T-Bills, short-duration credit, DeFi basis trading", { width: 4500 }),
    cell("Fund performance", { width: 2000 }),
  ]}),
  new TableRow({ children: [
    cell("$ZOTH Incentives (2 to 5%)", { width: 2860, bold: true, fill: ROW_ALT }),
    cell("Protocol token rewards aligned with LP commitment", { width: 4500, fill: ROW_ALT }),
    cell("Zoth", { width: 2000, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("Chain Incentives (2 to 5%)", { width: 2860, bold: true }),
    cell("Ecosystem rewards for LPs deploying on Avalanche, fixed per tranche (5% / 3% / 2%)", { width: 4500 }),
    cell("Avalanche, joint", { width: 2000 }),
  ]}),
]));

children.push(h2("Key LP Terms"));
children.push(bullet("Minimum commitment: $250,000 | Total capacity: $100M | Assets: USDC / USDT"));
children.push(bullet("Redemption: no lock-up; 1 to 5 business day settlement"));
children.push(bullet("LP benefits: priority vault access, Zoth-advised rebalancing, $ZOTH allocation, foundational partner status"));

// === PAGE 6: Metrics + Partnership Requirements ===
children.push(new Paragraph({ children: [new PageBreak()] }));

children.push(h1("Metrics & Measurable Outcomes"));
children.push(p("Institutional-grade KPIs tracked jointly, shared via monthly dashboard with quarterly business reviews and real-time TVL via public dashboard.", { size: 20 }));

children.push(makeTable([2700, 3460, 1600, 1600], [
  new TableRow({ tableHeader: true, children: [
    cell("Metric", { fill: ACCENT, color: "FFFFFF", bold: true, width: 2700 }),
    cell("Definition", { fill: ACCENT, color: "FFFFFF", bold: true, width: 3460 }),
    cell("6-Month", { fill: ACCENT, color: "FFFFFF", bold: true, width: 1600 }),
    cell("12-Month", { fill: ACCENT, color: "FFFFFF", bold: true, width: 1600 }),
  ]}),
  new TableRow({ children: [
    cell("Total zVault TVL on Avalanche", { width: 2700, bold: true }),
    cell("Cumulative zVault Liquid Assets minted on Avalanche", { width: 3460 }),
    cell("$100M", { width: 1600 }),
    cell("$250M", { width: 1600 }),
  ]}),
  new TableRow({ children: [
    cell("TVL Retention Rate", { width: 2700, bold: true, fill: ROW_ALT }),
    cell("% of deposits retained after 30 days", { width: 3460, fill: ROW_ALT }),
    cell(">80%", { width: 1600, fill: ROW_ALT }),
    cell(">85%", { width: 1600, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("Monthly Active Users", { width: 2700, bold: true }),
    cell("Unique wallets with neobank activity on Avalanche", { width: 3460 }),
    cell("50,000", { width: 1600 }),
    cell("200,000", { width: 1600 }),
  ]}),
  new TableRow({ children: [
    cell("Active zVault Liquid Assets", { width: 2700, bold: true, fill: ROW_ALT }),
    cell("Live vaults deployed on Avalanche", { width: 3460, fill: ROW_ALT }),
    cell("2+", { width: 1600, fill: ROW_ALT }),
    cell("5+", { width: 1600, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("zPayments Settlement Volume", { width: 2700, bold: true }),
    cell("Monthly cross-border value settled through Avalanche", { width: 3460 }),
    cell("$20M+", { width: 1600 }),
    cell("$50M+", { width: 1600 }),
  ]}),
  new TableRow({ children: [
    cell("zStocks AI & Tech AUM", { width: 2700, bold: true, fill: ROW_ALT }),
    cell("Cumulative AI/tech US tokenized equities held by SEA and Global South users on Avalanche", { width: 3460, fill: ROW_ALT }),
    cell("$10M+", { width: 1600, fill: ROW_ALT }),
    cell("$40M+", { width: 1600, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("Catalytic TVL Multiplier", { width: 2700, bold: true }),
    cell("Total TVL / Avalanche anchor commitment", { width: 3460 }),
    cell("3.5 to 5x", { width: 1600 }),
    cell("5x+", { width: 1600 }),
  ]}),
]));

children.push(h1("Partnership Requirements"));
children.push(makeTable([2700, 6660], [
  new TableRow({ tableHeader: true, children: [
    cell("Area", { fill: ACCENT, color: "FFFFFF", bold: true, width: 2700 }),
    cell("Detail", { fill: ACCENT, color: "FFFFFF", bold: true, width: 6660 }),
  ]}),
  new TableRow({ children: [
    cell("Liquidity Anchor", { width: 2700, bold: true }),
    cell("$25M into zVault Liquid Assets, catalytic, not a grant. Avalanche earns up to 12% APY, redeemable at NAV. Expected 3.5 to 5x multiplier from Zoth's 100+ LP network.", { width: 6660 }),
  ]}),
  new TableRow({ children: [
    cell("Chain Incentive Co-Funding", { width: 2700, bold: true, fill: ROW_ALT }),
    cell("Co-fund Chain Incentive APY layer across all three liquidity seasons; quantum agreed jointly per season.", { width: 6660, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("Marketing & Community", { width: 2700, bold: true }),
    cell("Joint announcements, co-branded PR, AMAs across SEA, India, UAE, Brazil, Argentina; SEA AI equity launch campaign.", { width: 6660 }),
  ]}),
  new TableRow({ children: [
    cell("Network & Ecosystem Access", { width: 2700, bold: true, fill: ROW_ALT }),
    cell("Introductions to Avalanche portfolio companies, institutional allocators, and enterprise partners.", { width: 6660, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("Privacy Stack Co-Design", { width: 2700, bold: true }),
    cell("Joint working group to scope and prototype privacy-enabled infrastructure for zVault and zPayments.", { width: 6660 }),
  ]}),
]));

// === PAGE 7: Grant Request + Milestones ===
children.push(new Paragraph({ children: [new PageBreak()] }));

children.push(h1("Grant Request: $2.5M to Launch on Avalanche"));
children.push(p("$2.5M grant to deploy the full Zoth stack natively on Avalanche, structured across 6 milestones. Release is milestone-gated to ensure accountability at every stage.", { size: 20 }));

children.push(pruns([
  { text: "Breakdown: ", bold: true, color: ACCENT, size: 20 },
  { text: "Smart contract development $500K | Tier-1 audit $400K | Mobile app build $350K | Mainnet launch $350K | Co-marketing $400K | Architecture $300K | Vault expansion $50K | Year-on-year features $150K", size: 20 }
]));

children.push(makeTable([520, 1900, 3000, 2440, 700, 800], [
  new TableRow({ tableHeader: true, children: [
    cell("#", { fill: ACCENT, color: "FFFFFF", bold: true, width: 520 }),
    cell("Phase", { fill: ACCENT, color: "FFFFFF", bold: true, width: 1900 }),
    cell("Deliverables", { fill: ACCENT, color: "FFFFFF", bold: true, width: 3000 }),
    cell("Target KPIs", { fill: ACCENT, color: "FFFFFF", bold: true, width: 2440 }),
    cell("%", { fill: ACCENT, color: "FFFFFF", bold: true, width: 700 }),
    cell("Amount", { fill: ACCENT, color: "FFFFFF", bold: true, width: 800 }),
  ]}),
  new TableRow({ children: [
    cell("1", { width: 520 }),
    cell("Architecture & Avalanche Setup", { width: 1900, bold: true }),
    cell("Joint architecture; smart contract spec for zVault and zPayments on C-Chain; security review framework; privacy stack scope", { width: 3000 }),
    cell("Architecture doc approved; spec signed off; privacy stack co-design initiated", { width: 2440 }),
    cell("12%", { width: 700, bold: true }),
    cell("$300K", { width: 800, bold: true }),
  ]}),
  new TableRow({ children: [
    cell("2", { width: 520, fill: ROW_ALT }),
    cell("Smart Contract Development", { width: 1900, bold: true, fill: ROW_ALT }),
    cell("Core zVault contracts; deposit/redemption flows; NAV oracle; MPC wallet setup; zPayments bridge; zStocks settlement integration", { width: 3000, fill: ROW_ALT }),
    cell("Testnet deployment; end-to-end demo; 3+ vault scenarios tested", { width: 2440, fill: ROW_ALT }),
    cell("20%", { width: 700, bold: true, fill: ROW_ALT }),
    cell("$500K", { width: 800, bold: true, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("3", { width: 520 }),
    cell("Tier-1 Security Audit", { width: 1900, bold: true }),
    cell("Full audit of zVault and zPayments contracts; remediation of critical and high-severity findings; report published on-chain", { width: 3000 }),
    cell("Zero critical findings; report published; MPC custody verified", { width: 2440 }),
    cell("16%", { width: 700, bold: true }),
    cell("$400K", { width: 800, bold: true }),
  ]}),
  new TableRow({ children: [
    cell("4", { width: 520, fill: ROW_ALT }),
    cell("Mainnet Launch + Mobile App Build", { width: 1900, bold: true, fill: ROW_ALT }),
    cell("zVault on mainnet; first live RWA vault; Season 1 activated. Avalanche-native neobank app shipped (iOS + Android). Mobile app line item: $350K", { width: 3000, fill: ROW_ALT }),
    cell("Live zVault; $5M+ TVL within 30 days; app live in App Store and Play Store; Season 1 LP onboarding begins", { width: 2440, fill: ROW_ALT }),
    cell("28%", { width: 700, bold: true, fill: ROW_ALT }),
    cell("$700K", { width: 800, bold: true, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("5", { width: 520 }),
    cell("Co-Marketing & Ecosystem Activation", { width: 1900, bold: true }),
    cell("Co-branded announcements, founder interviews, AMA series across SEA, India, UAE, Brazil, Argentina; SEA AI equity launch campaign; institutional LP roadshow", { width: 3000 }),
    cell("25,000+ new wallets; $25M+ TVL milestone; 3+ ecosystem integrations", { width: 2440 }),
    cell("16%", { width: 700, bold: true }),
    cell("$400K", { width: 800, bold: true }),
  ]}),
  new TableRow({ children: [
    cell("6", { width: 520, fill: ROW_ALT }),
    cell("Scale, Vault Expansion & YoY Features", { width: 1900, bold: true, fill: ROW_ALT }),
    cell("Additional zVault strategies; Seasons 2 & 3; zStocks expansion. Year-on-year feature roadmap: ongoing app development. YoY line item: $150K", { width: 3000, fill: ROW_ALT }),
    cell("5+ active zVaults; $100M+ cumulative TVL; 50,000+ MAU; $20M+ monthly settlement volume", { width: 2440, fill: ROW_ALT }),
    cell("8%", { width: 700, bold: true, fill: ROW_ALT }),
    cell("$200K", { width: 800, bold: true, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("", { width: 520, fill: HEADER_BG }),
    cell("Total", { width: 1900, bold: true, fill: HEADER_BG }),
    cell("", { width: 3000, fill: HEADER_BG }),
    cell("", { width: 2440, fill: HEADER_BG }),
    cell("100%", { width: 700, bold: true, fill: HEADER_BG }),
    cell("$2.5M", { width: 800, bold: true, fill: HEADER_BG }),
  ]}),
]));

// === PAGE 8: Traction + Funding + Partnerships + Next Steps + Conclusion ===
children.push(new Paragraph({ children: [new PageBreak()] }));

children.push(h1("Zoth, Traction & Credentials"));

children.push(makeTable([4680, 4680], [
  new TableRow({ tableHeader: true, children: [
    cell("Metric", { fill: ACCENT, color: "FFFFFF", bold: true, width: 4680 }),
    cell("Value", { fill: ACCENT, color: "FFFFFF", bold: true, width: 4680 }),
  ]}),
  new TableRow({ children: [
    cell("Total Revenue", { width: 4680, bold: true }),
    cell("$5.2M", { width: 4680 }),
  ]}),
  new TableRow({ children: [
    cell("Yield Tokens Sold | Fixed Income Originated", { width: 4680, bold: true, fill: ROW_ALT }),
    cell("$75M | $100M+", { width: 4680, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("Monthly TPV (115% MoM growth)", { width: 4680, bold: true }),
    cell("$25M+", { width: 4680 }),
  ]}),
  new TableRow({ children: [
    cell("zPayments Success Rate | Annualized Run Rate", { width: 4680, bold: true, fill: ROW_ALT }),
    cell("99.1% | Rs 25B+ (~$300M)", { width: 4680, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("Wallets | B2B Customers | Bank Coverage", { width: 4680, bold: true }),
    cell("1.8M+ | 40+ | 78+ Indian banks via CSBK", { width: 4680 }),
  ]}),
]));

children.push(h2("Funding & Investors"));
children.push(p("~$21.5M raised: $2.5M seed (Blockchain Founders Fund, Apr 2024), $4M strategic (Taisu Ventures, Aug 2024), $15M token commitment (Bolts Capital, Aug 2025). 27+ institutional investors. Currently raising Pre-Series A: $10M at $90M valuation (SAFE + Token Warrant).", { size: 20 }));

children.push(h2("Key Partnerships"));
children.push(p("Bakkt (US MTLs across 50 states, NY BitLicense, FinCEN MSB) | Chainlink BUILD member | Standard Chartered-backed Olea (trade finance) | Haven1 ($75M TVL alliance) | Plume Network, Wormhole, Deploy Finance ($50M pipeline) | Government of India (seed investment) | Pudgy Penguins (Luca Netz angel)", { size: 20 }));

children.push(h1("Next Steps"));
children.push(makeTable([520, 2700, 6140], [
  new TableRow({ tableHeader: true, children: [
    cell("#", { fill: ACCENT, color: "FFFFFF", bold: true, width: 520 }),
    cell("Step", { fill: ACCENT, color: "FFFFFF", bold: true, width: 2700 }),
    cell("Detail", { fill: ACCENT, color: "FFFFFF", bold: true, width: 6140 }),
  ]}),
  new TableRow({ children: [
    cell("1", { width: 520 }),
    cell("Partnership Agreement", { width: 2700, bold: true }),
    cell("Sign terms: $25M anchor, $2.5M grant, joint liquidity program, co-marketing", { width: 6140 }),
  ]}),
  new TableRow({ children: [
    cell("2", { width: 520, fill: ROW_ALT }),
    cell("Vault & Privacy Setup", { width: 2700, bold: true, fill: ROW_ALT }),
    cell("CIMA/BVI fund setup, smart contract deployment, oracle config; privacy stack working group launched", { width: 6140, fill: ROW_ALT }),
  ]}),
  new TableRow({ children: [
    cell("3", { width: 520 }),
    cell("Anchor + LP Outreach", { width: 2700, bold: true }),
    cell("Avalanche deploys $25M anchor; joint LP outreach to seed Season 1", { width: 6140 }),
  ]}),
  new TableRow({ children: [
    cell("4", { width: 520, fill: ROW_ALT }),
    cell("Go-Live & Co-Marketing", { width: 2700, bold: true, fill: ROW_ALT }),
    cell("Season 1 launches; mobile app ships; co-branded PR and community activation", { width: 6140, fill: ROW_ALT }),
  ]}),
]));

children.push(h1("Conclusion"));
children.push(p("Avalanche brings the chain, the L1 architecture, and the incentives. Zoth brings the only fully integrated neobank stack on the chain: yield, AI/tech US equities for SEA, payments, cards, and users. Together: up to 22% blended APY for institutional LPs, $100M+ in sticky TVL, the first Avalanche-native neobank, and an economic flywheel that keeps capital on Avalanche long after the incentive program ends.", { size: 20 }));

children.push(pruns([
  { text: "The ask: ", bold: true, color: ACCENT, size: 20 },
  { text: "$25M anchor + $2.5M grant + chain incentive co-funding + co-marketing + privacy stack co-design.", size: 20 }
]));

children.push(pruns([
  { text: "The return: ", bold: true, color: ACCENT, size: 20 },
  { text: "50,000 to 200,000 active users, $100M+ sticky TVL, the first fully integrated stablecoin neobank built natively on Avalanche, and Avalanche as the chain that gave SEA and the Global South one-tap access to the US AI boom.", size: 20 }
]));

children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 220, after: 0 },
  children: [new TextRun({ text: "www.zoth.io  |  Zoth, The Stablecoin Neobank", bold: true, color: ACCENT, size: 20, font: "Calibri" })]
}));

// === DOC ASSEMBLY ===
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Calibri", size: 20 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Calibri", color: ACCENT },
        paragraph: { spacing: { before: 220, after: 100 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Calibri", color: ACCENT },
        paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 1 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 900, right: 1080, bottom: 900, left: 1080 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.LEFT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: ACCENT, space: 4 } },
          children: [new TextRun({ text: "ZOTH × AVALANCHE", bold: true, color: ACCENT, size: 16, font: "Calibri" })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "www.zoth.io  |  ", color: "808080", size: 16, font: "Calibri" }),
            new TextRun({ children: ["Page ", PageNumber.CURRENT], color: "808080", size: 16, font: "Calibri" })
          ]
        })]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(CONFIG.OUT_PATH, buf);
  console.log("Wrote", buf.length, "bytes");
});
