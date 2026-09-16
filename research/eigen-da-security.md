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

EigenDA is one of the largest AVSs in the EigenLayer ecosystem. This research measures its weighted quorum stake directly from on-chain contracts and checks whether that stake maps to confirmed slashable magnitudes through the inspected AllocationManager path.

Key findings:

1. 59 active operators across 3 independent quorums: ETH/LST (33), EIGEN (47), and a third quorum (11).
2. Weighted stake: 283,387 ETH-equivalent, 236,150,309 EIGEN-equivalent, and 412,085 units in the third quorum.
3. Concentration in the ETH quorum is severe: one operator controls about 40.6% of weighted stake; top-3 operators control about 67.6%; top-10 operators control about 97.9%.
4. The EIGEN quorum is also concentrated: top-1 controls about 20.8%, top-3 about 43.1%, and top-10 about 80.1% of weighted stake.
5. Zero OperatorSlashed events in the AllocationManager across 3.7 million blocks scanned since slashing activation.
6. EigenDA uses M2 middleware, not Operator Sets. Its weighted quorum stake could not be mapped to slashable magnitudes through the inspected AllocationManager path.
7. The slashable economic backstop for EigenDA is not independently verifiable from public on-chain data.

---

## 1. Objective

Determine the real economic security budget of EigenDA and evaluate whether 
it can be independently priced from public data.

Methodological principle: only active operators with non-zero stake are 
counted. Zero-stake, deregistered, and abandoned addresses do not affect 
consensus and are excluded.

Operator count note: this research reports 59 unique operators with 
non-zero weighted stake at the snapshot block, across the three quorums 
of the inspected RegistryCoordinator. L2BEAT reports 71 operators as of 
the same period. The two numbers are not contradictory; they reflect 
different definitions:

- registered operators (including zero-weight entries),
- operators visible through Eigen API,
- operators with non-zero effective weight,
- operators across selected quorums at a specific reference block.

This research uses on-chain non-zero weighted stake at block 25,990,607 
as the operational definition.

Revision note: an earlier draft used non-atomic latest-state reads for stake 
values. Current figures are recomputed at fixed block 25,990,607 using blockTag 
for all stake reads. Differences between drafts reflect the switch to an atomic 
snapshot, not a change in the underlying on-chain data.

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

RegistryCoordinator reports quorumCount = 3 on the snapshot block. 
The standard EigenDA CertVerifier at 0x61692e93b6B045c444e942A91EcD1527F23A3FB7 
declares requiredQuorums = 0x0001. This means q0 and q1 are jointly required 
for a standard certificate, not independent alternatives.

| Quorum | Type | Operators | In required set |
|---|---|---:|---|
| q0 | ETH / LST | 33 | yes |
| q1 | EIGEN | 47 | yes |
| q2 | Third quorum (not in standard requiredQuorums) | 11 | no |
| Unique total (getOperatorState) | | 59 | |

Quorum semantics from the CertVerifier source and constructor parameters:

- requiredQuorums = 0x0001 (quorums 0 and 1)
- confirmationThreshold = 55
- adversaryThreshold = 33

Verifier relation: requiredQuorums ⊆ blobQuorums ⊆ confirmedQuorums ⊆ signedQuorums.

Implications:

- A valid certificate requires each required quorum (q0 and q1) to reach 
  confirmationThreshold.
- A liveness attack requires preventing at least one required quorum 
  from reaching confirmationThreshold.
- q2 exists in the RegistryCoordinator but is not part of the standard 
  requiredQuorums for the inspected CertVerifier.

Note on operator counts: the per-quorum counts in the table above refer 
to operators with non-zero weighted stake in each quorum at the snapshot 
block. getOperatorState returns all registered operators, including 
entries with zero weight, and reports 32 / 55 / 4 for q0 / q1 / q2 at 
block 25,990,607. The union of these three sets is 59 unique addresses, 
which is the total used throughout this report.

---

## 4. Weighted stake per quorum

All figures below are weighted quorum units as returned by StakeRegistry.weightOfOperatorForQuorum. They are not necessarily equal to underlying token balances, because quorum strategy multipliers may scale the weight.

| Quorum | Total weighted stake | Operators (non-zero) |
|---|---:|---:|
| q0 (ETH/LST) | 283,387 ETH-equivalent units | 33 of 59 |
| q1 (EIGEN) | 236,150,309 EIGEN-equivalent units | 47 of 59 |
| q2 (third) | 412,085 units | 11 of 59 |

---

## 5. Concentration

### Quorum 0 (ETH/LST) — 283,387 weighted units

| Position | Share of weighted quorum stake | Address |
|---|---:|---|
| Top-1 | about 40.60% | 0xbe7d5f26f5d5f567d35a86dd4d7d02aced2d5bff |
| Top-3 | about 67.63% | |
| Top-10 | about 97.85% | |

Top-1 operator holds 115,068 ETH-equivalent weighted units.
Top-3 operators collectively hold 191,645 ETH-equivalent weighted units.

The top-1 operator alone is below confirmationThreshold = 55, but the top-3 
collectively exceed both confirmationThreshold (55%) and adversaryThreshold (33%). 
The quorum's confirmation condition is substantially dependent on a small group 
of three operators.

### Quorum 1 (EIGEN) — 236,150,309 weighted units

| Position | Share of weighted quorum stake | Address |
|---|---:|---|
| Top-1 | about 20.80% | 0xdde3d4e0d7705ff68d31009a2422425ae38810a6 |
| Top-3 | about 43.07% | |
| Top-10 | about 80.07% | |

Top-1 operator holds 49,115,582 EIGEN-equivalent weighted units.
Top-3 operators collectively hold 101,715,773 EIGEN-equivalent weighted units.

Distribution is more even than q0, but top-10 still control about 80% of 
weighted stake.

### Quorum 2 (third) — 412,085 weighted units

| Position | Share of weighted quorum stake | Address |
|---|---:|---|
| Top-1 | about 74.03% | 0x5accc90436492f24e6af278569691e2c942a676d |
| Top-3 | about 96.07% | |
| Top-10 | about 100.00% | |

Quorum 2 is not part of the standard requiredQuorums for the inspected 
CertVerifier, but its concentration is severe: one operator controls 
about 74% of weighted stake.

---

## 6. Threshold exposure (weighted)

Thresholds below are computed from the on-chain weighted quorum units 
reported by StakeRegistry at block 25,990,607. They are not proven 
slashable amounts.

On-chain CertVerifier parameters (from the deployed EigenDA CertVerifier 
at 0x61692e93b6B045c444e942A91EcD1527F23A3FB7):

- confirmationThreshold = 55
- adversaryThreshold = 33
- requiredQuorums = 0x0001 (q0 and q1)

### Quorum 0 (ETH) — 283,387 weighted units

| Threshold | Weighted units | Share |
|---|---:|---:|
| Confirmation 55% | 155,863 | 55% |
| Adversary 33% | 93,518 | 33% |

### Quorum 1 (EIGEN) — 236,150,309 weighted units

| Threshold | Weighted units | Share |
|---|---:|---:|
| Confirmation 55% | 129,882,670 | 55% |
| Adversary 33% | 77,929,602 | 33% |

Notes:

- Each required quorum (q0 and q1) must reach confirmationThreshold for 
  a valid certificate. The quorums are not OR-alternatives.
- A pure quorum liveness failure occurs if less than confirmationThreshold 
  of weighted stake signs in a required quorum. Equivalently, more than 
  45% of weighted stake is unavailable or withholding.
- The 33% adversaryThreshold is a separate EigenDA security parameter. 
  It should not be interpreted as the liveness-blocking fraction.
- Safety attack: produce a valid certificate. This requires crossing 
  confirmationThreshold in every required quorum simultaneously.

These are weighted quorum thresholds. They are not proven slashable 
amounts, because weighted stake is not the same as slashable stake.

---

## 7. Slashing check on AllocationManager

### Method

Scan AllocationManager (0x948a420b...b6fa) for OperatorSlashed events from slashing activation block (22,270,000) to the latest finalized block (25,991,586).

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
100% COMPLETE: scanned up to block 25991586
0 OperatorSlashed events found.

Range: 3.7 million blocks.
Slashing events: 0.
```

### What this shows

1. Slashing is technically enabled at the EigenLayer protocol level.
2. It has never been executed on EigenDA or, in this scanned range, on any AVS whose events would appear in the same contract.
3. EigenDA operates on M2 middleware, not on Operator Sets.
4. Weighted stake in this path was not mapped to confirmed slashable magnitudes in this research.

---

## 8. Limitations

1. Weighted stake is not slashable stake. This report measures voting weight in quorums, not slashable magnitudes in AllocationManager.
2. Zero OperatorSlashed events were observed on EigenLayer mainnet in the scanned range (blocks 22,270,000–25,991,586). This result does not by itself prove that no M2-specific slashing or enforcement mechanism exists.
3. USD figures are indicative. ETH = $2,400, EIGEN = $0.19 at snapshot. Conversions scale linearly.
4. RPC constraints. Public free RPCs do not serve archive eth_getLogs. This research used SwiftNodes (free tier, 250K requests per month) with adaptive chunking.

---

## 9. Conclusions

1. Within this research, EigenDA reports 59 active operators across 
   three quorums in the inspected RegistryCoordinator. 
   Comparative ranking against other AVSs was not performed.
2. It runs three configured quorums: ETH/LST (q0), EIGEN (q1), and a third EigenDA-specific quorum (q2). q0 and q1 are jointly required for a standard certificate.
3. The ETH quorum is severely concentrated: top-1 controls about 40.6%, top-3 about 67.6%, top-10 about 97.9% of weighted stake.
4. The EIGEN quorum is also concentrated: top-1 controls about 20.8%, top-10 about 80.1%.
5. Zero OperatorSlashed events over 3.7M blocks — slashing has never been executed in this range.
6. EigenDA runs on M2 middleware, not Operator Sets. No slashable 
   allocation corresponding to the observed EigenDA quorum weights was 
   identified through the inspected AllocationManager / Operator Sets path.
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
const OPERATOR_STATE_RETRIEVER = '0xEC35aa6521d23479318104E10B4aA216DBBE63Ce';

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

const SNAPSHOT_BLOCK = Number(process.env.SNAPSHOT_BLOCK || 25990607);

async function safeWeight(quorum, address) {
  try {
    const v = await registry.weightOfOperatorForQuorum(quorum, address, {
      blockTag: SNAPSHOT_BLOCK,
    });
    return BigInt(v);
  } catch {
    return null;
  }
}

async function main() {
  const lines = fs
    .readFileSync('operators.txt', 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('0x'));

  const operators = [];
  for (const address of lines) {
    const q0 = await safeWeight(0, address);
    const q1 = await safeWeight(1, address);
    const q2 = await safeWeight(2, address);
    operators.push({
      address,
      q0: q0 === null ? null : q0.toString(),
      q1: q1 === null ? null : q1.toString(),
      q2: q2 === null ? null : q2.toString(),
    });
  }

  const sumNonZero = (field) =>
    operators
      .map((o) => o[field])
      .filter((v) => v !== null)
      .map((v) => BigInt(v))
      .filter((v) => v > 0n)
      .reduce((s, v) => s + v, 0n);

  const totals = {
    q0: sumNonZero('q0').toString(),
    q1: sumNonZero('q1').toString(),
    q2: sumNonZero('q2').toString(),
  };

  fs.writeFileSync(
    'all-stakes.json',
    JSON.stringify({ snapshotBlock: SNAPSHOT_BLOCK, totals, operators }, null, 2)
  );

  console.log('Saved: all-stakes.json');
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
  const finalized = await provider.getBlock('finalized');
  const currentBlock = finalized.number;

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
Set `SNAPSHOT_BLOCK=25990607` for a reproducible snapshot. Without it, the script defaults to 25990607.

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

EigenDA's AVS-level slashable economic backstop could not be independently verified from the inspected public contracts and event history. The analysis identified 283,387 ETH-equivalent and 236,150,309 EIGEN-equivalent weighted units across three quorums at block 25,990,607, but could not map that stake to confirmed slashable magnitudes. EigenDA runs on M2 middleware rather than the inspected Operator Sets path, so its active enforcement mechanism requires further verification.

---

Snapshot block: 25,990,607 (2026-09-16).
Slashing scan finalized block: 25,991,586.
Snapshot rates: ETH = $2,400, EIGEN = $0.19.

This research is reproducible. All contracts, blocks, and scripts are listed above. Readers are encouraged to independently verify the on-chain data.