# zOPAL: Canonical Overview

Reference document for AI agents producing Zoth content. Neutral fact base, not a style example. Tag legend: `[VOLATILE]` verify before use, `[INTERNAL]` not for external output, `[ILLUSTRATIVE]` never present as actual.

---

## 1. What zOPAL is

zOPAL is the first live zVault, deployed on Base. It is a tokenized, yield-bearing vault whose returns come from **payment financing**, not private credit. State it as payment financing in all contexts; "private credit" is incorrect.

The vault issues the **zOPAL token**, a standard ERC-20 interest-bearing token. Its price appreciates as the underlying strategy earns. Yield accrues through NAV appreciation only: no rebasing, no payouts to claim.

### Snapshot `[VOLATILE]`
| Field | Value |
|---|---|
| Chain | Base |
| Deposit asset | USDC (USDT bridgeable to USDC via LiFi integration) |
| Strategy | BlackOpal LiquidStone II payment financing + Superstate USCC basis |
| Target APY | ~12% (12.5% average APY) |
| Strategy AUM | $20.5M `[VOLATILE]` |
| Default rate | 0.0% historical |
| Rating | Baa3 investment grade (Cicada Partners) |
| Status | Live |

Asset is always USDC, never "USD." The capital metric is always labeled **Strategy AUM**, never bare "AUM" (it is capital deployed in the underlying strategy, distinct from vault TVL).

---

## 2. Underlying strategy

zOPAL is operated through **BLACKOPAL ONCHAIN CREDIT FUND 1 LTD. SAC**, financing merchant credit across Brazil and connecting into the country's $750B credit-card payments market.

Two sleeves:
- **Yield sleeve**: 50 to 75% in short-term Brazilian credit-card receivables.
- **Liquidity sleeve**: 25 to 50% in a liquid, regulated strategy currently anchored by **Superstate USCC** (market-neutral), held as the redemption buffer.

### How the financing works
- In Brazil, 62 to 79% of consumer purchases are paid in installments across six to seven 30-day cycles.
- BlackOpal finances these receivables for merchants, capturing the spread.
- Target average repayment window is 45 days or less, from low-risk merchants (restaurants, groceries, gas stations); excludes e-commerce, gambling, subscriptions to limit fraud and chargebacks.
- Funding is approved against confirmed card-transaction receivables and disbursed automatically to merchants.
- Receivables settle directly through Visa and Mastercard, so the pool holds cleared card transactions, not unverified credit. The merchant screen is the primary risk control.

### Why the receivables carry low risk
- 0% historical default across all receivables purchased to date.
- 50% of fund assets sit in USD; remaining BRL/USD exposure fully hedged via Non-Deliverable Forwards (NDFs).
- Baa3 investment-grade rating (Cicada Partners).
- BlackOpal is setting up a CVM-regulated FIDC sub-fund in Brazil (standard onshore receivables-pooling structure). `[IN PROGRESS]`

### Certainty of repayment
BlackOpal is the registered beneficiary of each receivable in Brazil's **C3 Registry** (receivables infrastructure mandated by the Brazilian Central Bank). Repayments route directly to the fund at settlement, never through the merchant, with settlement finality reinforced by **BCB Resolution 522**. The fund collects on money already moving inside the card-settlement system.

---

## 3. Mechanics (for partner and external Q&A)

- **Not built on FAAST.** FAAST is a separate, opt-in regulated wrapper. zOPAL runs on the zVault technical stack alone.
- **Deposits**: instant at any size, no admin review, no waiting period. The zOPAL token mints to the depositor's wallet in the same transaction at current NAV.
- **Redemption**: send zOPAL back, tokens are burned, USDC returned at current oracle NAV. Settled FIFO. Average under 30 minutes; 1 to 5 business days for larger requests. No lock-up.
- **Yield**: accrues via NAV appreciation. No rebasing, no claim step.
- **Transferability**: standard ERC-20, freely transferable. Every transfer and every redemption is screened against sanctions and blocked-address lists; a wallet flagged as critical risk cannot redeem.
- **Permissionless**: no agreement required to deposit or redeem. An NDA or partnership agreement can be signed if a counterparty's process requires it, via METACO INTELLIGENCE CORPORATION.

### Redemption obligor
The redemption obligation sits with the Zoth operating entity (**METACO INTELLIGENCE CORPORATION**, Panama law) `[INTERNAL]` for the entity name externally, plus the underlying strategy run by BlackOpal through BLACKOPAL ONCHAIN CREDIT FUND 1 LTD. SAC, which processes redemption requests Zoth aggregates. As a Segregated Account Company, the fund's assets are ring-fenced, insulating zOPAL holders from liabilities elsewhere in the structure.

---

## 4. Custody, oracle, security

- **Custody**: ForDefi MPC, 3-of-5 multisig. Capital deployed into the BlackOpal strategy via Enzyme Finance.
- **NAV oracle**: updates approximately 2PM GMT, gated by a tolerance check against the prior price. Auto-pauses deposits and redemptions if the oracle is stale beyond 30 hours.
- **Audit**: Entersoft, before deployment and ongoing.
- **Monitoring**: Cyvers, real-time on-chain.

---

## 5. Fees

| Action | Fee |
|---|---|
| Deposit | 0% |
| Instant redemption | 0.5% |
| Standard request redemption | 0.1% |

Redemption fee is deducted from the zOPAL input before burning; USDC output = net zOPAL after fee, times current NAV.

---

## 6. Loyalty layer

zOPAL distribution can carry **Zocta Points**, a separate reward layer (up to 4% in the neobank case study). Zocta Points are not vault interest and must not be blended into the stated APY. Keep them described as a distinct rewards layer.

---

## 7. Contract suite `[INTERNAL]` for addresses

ZothAccessControl; zOPAL Token; DepositVault and RedemptionVault (upgradeable via TransparentUpgradeableProxy); PriceOracle and FunctionsAccessControl (non-upgradeable); ProxyAdmin.

Payment tokens in config: USDC, and USDbC (second payment token, 0 bps; identity to be clarified `[INTERNAL]`).

---

## 8. One-line descriptions (ready to reuse)

- **Short**: zOPAL is Zoth's first live vault, a USDC payment-financing vault on Base targeting ~12% from cleared Brazilian card receivables, rated Baa3 by Cicada Partners.
- **Mechanism**: deposits mint zOPAL instantly at NAV; yield accrues through NAV appreciation; redemptions burn zOPAL and return USDC, average under 30 minutes.
- **Risk framing**: repayment is structural rather than discretionary, collected at card settlement through Brazil's C3 Registry, not at borrower election.
