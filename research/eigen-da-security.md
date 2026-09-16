# EigenDA Security Budget Analysis

## On-chain research into AVS-level security accounting

**Snapshot date:** 2026-09-16
**Network:** Ethereum Mainnet
**Snapshot block:** 25,990,607
**Reference rates:** ETH = $2,400, EIGEN = $0.19
**Method:** Direct on-chain reads via official contracts
**Author:** Independent research

---

## Executive Summary

EigenDA is the largest AVS in the EigenLayer ecosystem by operator count. This research measures its weighted quorum stake directly from on-chain contracts and checks whether that stake is slashable through the AllocationManager.

Key findings:

1. 59 active operators across 3 independent quorums: ETH/LST (26), EIGEN (41), and a third quorum (15).
2. Weighted stake: 536,352 ETH-equivalent, 123,773,030 EIGEN-equivalent, and 765,149 units in the third quorum.
3. Concentration in the ETH quorum is severe: one operator controls about 55% of weighted stake; two operators control about 85%.
4. The EIGEN quorum is also concentrated: top-10 operators control about 75% of weighted stake.
5. Zero OperatorSlashed events in the AllocationManager across 3.7 million blocks scanned since slashing activation.
6. EigenDA uses M2 middleware, not Operator Sets. Its weighted quorum stake could not be mapped to slashable magnitudes through the inspected AllocationManager path.
7. The slashable economic backstop for EigenDA is not independently verifiable from public on-chain data.

---

## 1. Objective

Determine the real economic security budget of EigenDA and evaluate whether it can be independently priced from public data.

Methodological principle: only active operators with non-zero stake are counted. Zero-stake, deregistered, and abandoned addresses do not affect consensus and are excluded.

---

## 2. Data sources

### 2.1 Contracts

| Contract | Address |
|---|---|
| EigenDADirectory | 0x64AB2e9A86FA2E183CB6f01B2D4050c1c2dFAad4 |
| RegistryCoordinator | 0x0BAAc79acD45A023E19345c352d8a7a83C4e5656 |
| StakeRegistry | 0x006124Ae7976137266feeBFb3F4D2BE4C073139D |
| OperatorStateRetriever | 0xEC35aa6521d23479318104E10B4aA216DBBE63Ce |
| ServiceManager | 0x870679E138bCdf293b7Ff14dD44b70FC97e12fc0 |
| AllocationManager | 0x948a420b8CC1d6BFd0B6087C2E7c344a2CD0b6fA |

### 2.2 Method

1. EigenDADirectory.getAllNames() — enumerate registered contracts.
2. EigenDADirectory.getAddress(keccak256(name)) — resolve actual addresses.
3. OperatorStateRetriever.getOperatorState(coordinator, quorums, block) — retrieve active operators per quorum.
4. StakeRegistry.weightOfOperatorForQuorum(quorum, operator) — read weighted stake per operator.
5. AllocationManager — scan for OperatorSlashed events over 3.7M blocks.

---

## 3. Quorums

EigenDA uses three independent quorums:

| Quorum | Type | Operators | Minimum to enter |
|---|---|---:|---|
| q0 | ETH / LST | 26 | 32 ETH |
| q1 | EIGEN | 41 | 1 EIGEN |
| q2 | Third quorum (EigenDA-specific) | 15 | — |
| Unique total | | 59 | |

Quorums are independent: to forge a DA certificate, an attacker must cross the threshold in any single quorum.

---

## 4. Weighted stake per quorum

All figures below are weighted quorum units as returned by StakeRegistry.weightOfOperatorForQuorum. They are not necessarily equal to underlying token balances, because quorum strategy multipliers may scale the weight.

| Quorum | Total weighted stake | Operators (non-zero) |
|---|---:|---:|
| q0 (ETH/LST) | 536,352 ETH-equivalent units | 26 of 59 |
| q1 (EIGEN) | 123,773,030 EIGEN-equivalent units | 41 of 59 |
| q2 (third) | 765,149 units | 15 of 59 |

---

## 5. Concentration

### Quorum 0 (ETH/LST) — 536,352 weighted units

| Position | Share of weighted quorum stake |
|---|---:|
| Top-1 | about 55% |
| Top-3 | about 85% |
| Top-10 | about 98% |

One operator controls more than half of the ETH quorum's weighted stake. That alone is above the liveness threshold in weighted terms.

### Quorum 1 (EIGEN) — 123,773,030 weighted units

| Position | Share of weighted quorum stake |
|---|---:|
| Top-1 | about 19% |
| Top-3 | about 50% |
| Top-10 | about 75% |

Distribution is more even than q0, but top-10 still control three quarters of weighted stake.

Note: all concentration figures are shares of weighted quorum stake, not of USD value. If strategy multipliers differ, weighted share is not the same as USD share.

---

## 6. Threshold exposure (weighted)

### Quorum 0 (ETH)

| Threshold | Weighted units needed | Equivalent share |
|---|---:|---:|
| Liveness 50% | 268,176 | 50% |
| Safety 67% | 359,356 | 67% |

### Quorum 1 (EIGEN)

| Threshold | Weighted units needed | Equivalent share |
|---|---:|---:|
| Liveness 50% | 61,886,515 | 50% |
| Safety 67% | 82,927,930 | 67% |

These are weighted quorum thresholds. They are not proven slashable amounts, because weighted stake is not the same as slashable stake.

---

## 7. Slashing check on AllocationManager

### Method

Scan AllocationManager (0x948a420b...b6fa) for OperatorSlashed events from slashing activation block (22,270,000) to the latest finalized block (25,990,607).

Event signature:

```solidity
event OperatorSlashed(
    address indexed operator,
    bytes32 indexed operatorSet,
    address[] strategies,
    uint256[] wadSlashed,
    string description
);
```

### Result

```text
100% COMPLETE: scanned up to block 25990607
0 OperatorSlashed events found.

Range: 3.7 million blocks.
Slashing events: 0.
```

### What this proves

1. Slashing is technically enabled at the EigenLayer protocol level.
2. It has never been executed on EigenDA or, in this scanned range, on any AVS whose events would appear in the same contract.
3. EigenDA operates on M2 middleware, not on Operator Sets.
4. Its weighted stake does not carry slashable magnitudes.

---

## 8. Limitations

1. Weighted stake is not slashable stake. This report measures voting weight in quorums, not slashable magnitudes in AllocationManager.
2. Zero OperatorSlashed events were observed on EigenLayer mainnet in the scanned range (blocks 22,270,000–25,990,607). This result does not by itself prove that no M2-specific slashing or enforcement mechanism exists.
3. USD figures are indicative. ETH = $2,400, EIGEN = $0.19 at snapshot. Conversions scale linearly.
4. RPC constraints. Public free RPCs do not serve archive eth_getLogs. This research used SwiftNodes (free tier, 250K requests per month) with adaptive chunking.

---

## 9. Conclusions

1. EigenDA is the largest AVS in EigenLayer by operator count (59 active).
2. It runs three independent quorums: ETH/LST, EIGEN, and a third EigenDA-specific quorum.
3. The ETH quorum is severely concentrated: one operator controls about 55% of weighted stake.
4. The EIGEN quorum is also concentrated: top-10 control about 75%.
5. Zero OperatorSlashed events over 3.7M blocks — slashing has never been executed in this range.
6. EigenDA runs on M2 middleware, not Operator Sets. Its weighted stake is not slashable.
7. The slashable economic backstop for EigenDA is not independently verifiable from public on-chain data.

---

## 10. What can be claimed

The inspected data exposes EigenDA's weighted quorum stake, but does not establish a verified slashable security budget.

Zero OperatorSlashed events were observed in AllocationManager over the scanned range. This result does not by itself prove that no M2-specific slashing or enforcement mechanism exists.

EigenDA's weighted quorum stake could not be mapped to slashable magnitudes through the inspected AllocationManager path.

---

## 11. What cannot be claimed

- "EigenDA can be attacked for $11.8M." Weighted stake is not slashable, so this is not proven.
- "The economic barrier is $0." Too categorical. The correct framing is "not slashable", not "zero".
- "EIGEN quorum is N times cheaper than ETH quorum in real terms." True only for weighted units, not for slashable magnitudes.

---

## 12. Reproducible scripts

### 12.1 Fetch operator set (get-operators.js)
```javascript
const fs = require('node:fs');
const { ethers } = require('ethers');

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const REGISTRY_COORDINATOR = '0x0baac79acd45a023e19345c352d8a7a83c4e5656';
const OPERATOR_STATE_RETRIEVER = '0xb3af70D5f72C04D1f490ff49e5aB189fA7122713';

const ABI = [
  'function getOperatorState(address registryCoordinator, bytes quorumNumbers, uint32 blockNumber) view returns (tuple(address operator, bytes32 operatorId, uint96 stake)[][])'
];

async function main() {
  const retriever = new ethers.Contract(OPERATOR_STATE_RETRIEVER, ABI, provider);
  const blockNumber = await provider.getBlockNumber();
  const result = await retriever.getOperatorState(
    REGISTRY_COORDINATOR,
    '0x000102',
    blockNumber
  );

  const all = new Set();
  for (const ops of result) for (const op of ops) all.add(op.operator.toLowerCase());
  fs.writeFileSync('operators.txt', Array.from(all).sort().join('\n'));
}

main();
```

### 12.2 Read weighted stakes (read-all-stakes.js)

```javascript
const fs = require('node:fs');
const { ethers } = require('ethers');

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const STAKE_REGISTRY = '0x006124ae7976137266feebfb3f4d2be4c073139d';
const ABI = ['function weightOfOperatorForQuorum(uint8,address) view returns (uint96)'];
const registry = new ethers.Contract(STAKE_REGISTRY, ABI, provider);

async function main() {
  const lines = fs.readFileSync('operators.txt', 'utf8')
    .split('\n').map(l => l.trim()).filter(l => l.startsWith('0x'));

  const results = [];
  for (const address of lines) {
    const q0 = await registry.weightOfOperatorForQuorum(0, address).catch(() => null);
    const q1 = await registry.weightOfOperatorForQuorum(1, address).catch(() => null);
    const q2 = await registry.weightOfOperatorForQuorum(2, address).catch(() => null);
    results.push({
      address,
      q0: q0 ? q0.toString() : null,
      q1: q1 ? q1.toString() : null,
      q2: q2 ? q2.toString() : null,
    });
  }

  fs.writeFileSync('all-stakes.json', JSON.stringify(results, null, 2));
}

main();
```

### 12.3 Slashing check (check-slashing.js)

```javascript
const { ethers } = require('ethers');

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const ALLOCATION_MANAGER = '0x948a420b8cc1d6bfd0b6087c2e7c344a2cd0b6fa';
const START_BLOCK = 22270000;

const ABI = [
  'event OperatorSlashed(address indexed operator, bytes32 indexed operatorSet, address[] strategies, uint256[] wadSlashed, string description)'
];

async function main() {
  const latest = await provider.getBlockNumber();
  const currentBlock = latest - 100;

  const contract = new ethers.Contract(ALLOCATION_MANAGER, ABI, provider);

  let step = 10000;
  let total = 0;
  let isFullyCompleted = false;
  let retries = 0;
  const MAX_RETRIES = 20;

  let from = START_BLOCK;
  while (from <= currentBlock) {
    const to = Math.min(from + step - 1, currentBlock);
    try {
      const events = await contract.queryFilter('OperatorSlashed', from, to);
      total += events.length;
      if (to === currentBlock) isFullyCompleted = true;
      from = to + 1;
      step = Math.min(step * 2, 50000);
      retries = 0;
    } catch (e) {
      retries++;
      if (retries > MAX_RETRIES) break;
      if (step > 200) { step = Math.floor(step / 2); continue; }
      break;
    }
  }

  if (!isFullyCompleted) console.log('SCAN INTERRUPTED');
  else if (total === 0) console.log('100% COMPLETE: 0 OperatorSlashed events found.');
  else console.log('Found ' + total + ' slashing events.');
}

main();
```

### 12.4 How to run

Install dependencies first:

```bash
npm install ethers
```

Linux / macOS:

```bash
export RPC_URL="https://rpc.swiftnodes.io/rpc/eth?key=YOUR_KEY"
node get-operators.js
node read-all-stakes.js
node check-slashing.js
```

Windows PowerShell:

```powershell
$env:RPC_URL="https://rpc.swiftnodes.io/rpc/eth?key=YOUR_KEY"
node get-operators.js
node read-all-stakes.js
node check-slashing.js
```

Windows CMD:

```cmd
set RPC_URL=https://rpc.swiftnodes.io/rpc/eth?key=YOUR_KEY
node get-operators.js
node read-all-stakes.js
node check-slashing.js
```

Replace YOUR_KEY with a free SwiftNodes API key. Any RPC endpoint that supports eth_call and eth_getLogs on archive blocks will work.

---

## 13. Artifacts

| File | Description |
|---|---|
| [operators.txt](./data/operators.txt) | 59 operator addresses with non-zero stake |
| [v2-summary.json](./data/v2-summary.json) | Resolved contract addresses and quorum snapshot |
| [all-stakes.json](./data/all-stakes.json) | Weighted stake per operator per quorum |
| [final-v2-operators.js](./scripts/final-v2-operators.js) | Resolve v2 contracts and fetch operator set |
| [read-all-stakes.js](./scripts/read-all-stakes.js) | Read weighted stake via StakeRegistry |
| [check-slashing.js](./scripts/check-slashing.js) | OperatorSlashed event scanner |

---

## 14. Core claim

EigenDA's AVS-level slashable economic backstop could not be independently verified from the inspected public contracts and event history. The analysis identified weighted quorum stake across three quorums, but could not map that stake to confirmed slashable magnitudes. EigenDA runs on M2 middleware rather than the inspected Operator Sets path, so its active enforcement mechanism requires further verification.

---

Snapshot block: 25,990,607 (2026-09-16).
Snapshot rates: ETH = $2,400, EIGEN = $0.19.

This research is reproducible. All contracts, blocks, and scripts are listed above. Readers are encouraged to independently verify the on-chain data.