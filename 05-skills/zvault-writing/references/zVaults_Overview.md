# zVaults: Canonical Overview

Reference document for AI agents producing Zoth content. This is a neutral fact base, not a style example. Tone and persuasion are set by the SKILL instructions, not by this file. Tag legend: `[VOLATILE]` verify before use, `[INTERNAL]` not for external output, `[UNANNOUNCED]` anonymize externally, `[IN PROGRESS]` soften verb tense, `[ILLUSTRATIVE]` never present as actual.

---

## 1. Company context

Zoth is a privacy-first, stablecoin-led neobank for the Global South and the agentic economy, positioned as a Revolut-style consumer stack that abstracts on-chain complexity to deliver yield, payments, and card services to non-crypto-native users on institutional-grade infrastructure under a regulated framework.

Legal operating entity: **METACO INTELLIGENCE CORPORATION**, governed under the laws of Panama. `[INTERNAL]` for the full legal name in external docs; use "Zoth operating entity" unless clearance is given.

Product lines: zVault (yield infrastructure), FAAST (regulated fund wrapper), zoUSD (blended stablecoin vault), zBTC, zPAXG, PayX7 / zPayments (cross-border payments), Zocta (points and card).

### Traction `[VOLATILE]`
| Metric | Figure |
|---|---|
| Peak TVL | $75M |
| Average monthly TPV | $40M+ (always state as $40M+ unless told otherwise) |
| Revenue to date | $5.2M |
| Community | 1M+ across channels |
| Onboarded wallets | 1.8M+ |
| Customers | 40+, including Standard Chartered Group, Plume, SingularityDAO, LuLu Group |
| Strategic partnerships | 25+, including Bakkt, Intellistake (CSE-listed), Chainlink, Huma, Fetch AI |

Note: "1M+ community across channels" and "1.8M+ onboarded wallets" are distinct metrics. Do not conflate.

### Regulatory and partner backbone
- Compliance stack via **Bakkt** (NYSE-listed, ICE-owned): access to Money Transmitter Licenses across 50+ US states and a New York BitLicense.
- Licensed fund out of the Cayman Islands and BVI.
- GENIUS-compliant broker-dealer license `[IN PROGRESS]`.
- JV with a leading payment infrastructure positions Zoth among the top stablecoin-led cross-border players in South Asia. `[UNANNOUNCED]` partner name.
- Proprietary stablecoin stack built on the acquisition of **Neemo Finance**.
- Backing: follow-on from Taisu Ventures; strategic investment from Bakkt and Luca Netz (CEO, Pudgy Penguins); $75M RWA alliance with Haven1; $15M token commitment from Bolts Capital.

---

## 2. What zVault is

zVault is the infrastructure layer of the Zoth protocol: a turnkey system for launching a tokenized, yield-bearing vault. The smart contracts, custody, pricing, compliance, and frontend are provided as a stack, so a strategy team or chain brings a yield source and a mandate rather than building vault infrastructure.

Each vault issues a **zTOKEN**, an ERC-20 interest-bearing token representing a proportional claim on the vault's net asset value. The unit price appreciates as the underlying strategy generates yield. No rebasing, no separate claim step. A zTOKEN is not a stablecoin; it behaves as a tokenized fund share.

In deployment-agnostic and technical-doc contexts, always use the generic term **zTOKEN**, never zOPAL. zOPAL is the first deployment; the architecture and diagrams stay generic.

### Strategy categories
RWA, DeFi, private credit and lending, geographic-specific. Each vault runs a single strategy or combines several, carries a risk profile of conservative / moderate / aggressive, and the strategy team retains operational control within the mandate.

---

## 3. Architecture

A zVault is a layered smart-contract system, not a single contract. Responsibilities are split across distinct contracts; the boundaries are auditable. The architecture is deployment-agnostic: every vault reuses the same contract set regardless of strategy. The design separates what stays open and transparent (the token, the price feed) from what stays tightly controlled (role administration, upgrades, custody authority).

### Contract suite `[INTERNAL]` for specific addresses
- ZothAccessControl
- zTOKEN (zOPAL Token in the first deployment)
- DepositVault (upgradeable via TransparentUpgradeableProxy)
- RedemptionVault (upgradeable via TransparentUpgradeableProxy)
- PriceOracle (non-upgradeable)
- FunctionsAccessControl (non-upgradeable)
- ProxyAdmin

### Custody and security
- Custody: **ForDefi** MPC, 3-of-5 multisig. All signing on video calls.
- Compliance: **Chainalysis** sanctions oracle plus greenlist and blacklist screening, applied at the contract level on every deposit, redemption, and transfer.
- Audit: **Entersoft**, independent blockchain security firm, before deployment and on an ongoing basis as the codebase evolves.
- Monitoring: **Cyvers**, real-time on-chain threat monitoring.

### NAV and oracle
NAV updates on a defined cadence (zOPAL: approximately 2PM GMT) via oracle, gated by a tolerance check against the prior price. If the oracle goes stale beyond a threshold (zOPAL: 30 hours), deposits and redemptions auto-pause until updated.

---

## 4. FAAST (regulated fund layer)

FAAST is an optional regulated wrapper that sits on top of the same vault contracts. It is operated as a Segregated Portfolio Company (SPC) under the Cayman Islands Monetary Authority (CIMA) and the BVI Financial Commission, with independent directors, a licensed fund administrator, an appointed custodian, and an external auditor.

FAAST is opt-in and is not a precondition for launching a vault. Individual vaults can run on the technical stack alone. zOPAL itself is not built on FAAST.

FAAST benefits: launch a compliant fund in under 4 weeks; approximately 70% saving against traditional fund setup and operating cost; low-touch backend operations.

---

## 5. Marketplace and distribution

zVaults is a marketplace for vetted vaults. Every vault clears Zoth's framework on four standards before it reaches customers:

| Standard | Meaning |
|---|---|
| Security | MPC custody, multiple signatories, pre-audited contracts, real-time monitoring |
| Scalability | Infrastructure that supports TVL and user growth without re-engineering |
| Compliance | Contract-level screening and an optional regulated fund layer |
| Yield value | A real, rated yield source that holds up to institutional and retail scrutiny |

What Zoth provides in return is distribution: a network of neobanks, fintechs, and exchanges that puts a listed vault in front of end users. Distribution proof customers include Olea (Standard Chartered Group), BlackOpal, and Deploy Finance.

Live distribution example: one of North America's largest neobanks integrated zOPAL to offer a high-yield RWA-backed product and open a new revenue line. `[ILLUSTRATIVE]` economics: on $10M eligible balances, existing 4% product yields $400K/yr vs zOPAL passing ~10% to customers yielding $1M/yr, with the distributor retaining a ~200 bps spread. Mark all such figures illustrative. Note: case-study geography label is unresolved (North America vs emerging market); confirm before external use.

---

## 6. Criteria to onboard

Vault onboarding is permissioned. (Vault *deposits* are permissionless; vault *creation* is gated. Keep this distinction precise.)

### Eligibility
| Criterion | Requirement |
|---|---|
| Risk rating | A credit risk rating on the strategy (see section 7) |
| Liquidity | Minimum $5M committed or addressable strategy liquidity |
| Smart contract audit | Underlying strategy contracts audited by a recognized firm |
| Regulated structure | A regulated fund structure, or adoption of FAAST |

### Operating terms
| Term | Standard |
|---|---|
| Lock-ups | None |
| Redemption queue | Maximum T+5 business days |
| Pricing | On-chain NAV via oracle |

Launch timeline: 3 to 4 weeks from mandate to live vault.

---

## 7. Credit risk rating framework

Onboarding is gated by a credit risk framework every strategy must clear before launch. A strategy with an existing rating presents it; a strategy without one is rated through Zoth's credit risk rating partnerships before launch.

### Assessment dimensions
Built on the IRB parameter set (probability of default, loss given default, exposure at default, effective maturity M) extended with structural and operational dimensions: concentration risk, counterparty risk, collateral and security, liquidity profile, settlement and operational risk. Expected loss = PD x LGD x EAD.

### Tokenized scorecard
The rating partner (Cicada Partners for the LiquidStone 2 / zOPAL rating) delivers a tokenized, on-chain risk score grouped under four pillars:
- **Assets**: diversification, portfolio quality, liquidity, counterparty concentration, counterparty quality, base currency risk
- **Capital**: cash flow leverage, balance sheet leverage, seniority, quality of outside capital, systemic importance
- **Quality**: ROIC and track record, retention and stickiness, historical and trending CAGRs, cash flow, pricing power, competitiveness and strategy, complexity
- **Management**: incentive alignment, legacy and franchise position, intangibles, transparency, consistency of reporting, opacity of reports, excess reports

### Rating scale (CRA reference)
Investment grade runs Aaa/AAA down to Baa3/BBB-; speculative grade runs Ba1/BB+ down to C/D. The investment-grade boundary is Baa3 (Moody's) and BBB- (S&P, Fitch). zOPAL's strategy carries Baa3 (Cicada Partners).

---

## 8. Ecosystem

| Vault | Asset | Partner | Class | Status | Target net yield |
|---|---|---|---|---|---|
| zOPAL | USDC | BlackOpal, Superstate | Payment financing + basis | Live (Base) | ~12% `[VOLATILE]` |
| zoUSD | USDC | Gauntlet | Curated stablecoin (vault of vaults) | Structuring | ~7% blended |
| zBTC | WBTC, LBTC, cbBTC | Lombard | BTC carry | Structuring | up to ~6% on BTC |
| zPAXG | PAXG, PAXGy | Paxos | Leveraged gold yield | In discussion | 6 to 10% net |

Asset naming is strict: USDC not USD; WBTC/LBTC/cbBTC not BTC; PAXG/PAXGy not Gold.

- **zoUSD** is the first "vault of vaults": blends Gauntlet's USD Alpha vault (gtUSDA) 70% with zOPAL 30%; APY is the allocation-weighted average, (70% x gtUSDA APY) + (30% x zOPAL APY) net of fees, approximately 7%.
- **zBTC**: BTC-denominated collateral, USDC borrowed against it, deployed into zOPAL carry; BTC position preserved.
- **zPAXG**: leveraged tokenized-gold vault for family-office demand; three-tier stack (tokenized gold, yield-bearing wrap ~3%, leveraged vaults 6 to 10% net at ~70% LTV); gold exposure preserved on 100% of collateral.

(zOPAL has its own dedicated overview document.)

---

## 9. Commercials

| Option | When | Fees |
|---|---|---|
| Option 1: zVault alone | Strategy already has a regulated fund | Setup waived; $3,000/month per vault |
| Option 2: zVault + FAAST | Strategy needs a regulated fund | FAAST setup $20K or $40K tier + monthly ($6,500 or $5,000), plus the $3,000/month zVault fee |

Monthly fees may be fully subsidized on elevation to strategic partnership, alignment to partner-chain incentive criteria, and inflows above $10M TVL.

Zoth does not separately charge the strategy partner for distribution. The model may instead charge end users a performance, platform, or withdrawal fee depending on the strategy.

**Known conflict** `[INTERNAL]`: a "Transparent Pricing Model" graphic in circulation shows different numbers ($10K setup, $3.5K/month, FAAST $40K and $8-9K/month). The text figures above are the working set; reconcile before any output uses pricing.

---

## 10. Open items `[INTERNAL]`

- Timelock contract identity and full address (referenced in ForDefi policies, not listed in the zOPAL contracts section).
- USDbC: second payment token in the zOPAL config (0 bps); clarify what it is.
- Pricing image vs text conflict (section 9).
- Neobank case-study geography label (section 5).
