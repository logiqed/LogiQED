'use strict';
const fs = require('node:fs');
const { ethers } = require('ethers');

const RPC_URL = process.env.RPC_URL;
if (!RPC_URL) throw new Error('Set RPC_URL');

const provider = new ethers.JsonRpcProvider(RPC_URL);

// Fixed snapshot block for atomicity
const SNAPSHOT_BLOCK = Number(process.env.SNAPSHOT_BLOCK || 25990607);

const STAKE_REGISTRY = '0x006124Ae7976137266feeBFb3F4D2BE4C073139D';
const REGISTRY_COORDINATOR = '0x0BAAc79acD45A023E19345c352d8a7a83C4e5656';
const OPERATOR_STATE_RETRIEVER = '0xEC35aa6521d23479318104E10B4aA216DBBE63Ce';

const STAKE_REGISTRY_ABI = [
  'function weightOfOperatorForQuorum(uint8 quorumNumber, address operator) view returns (uint96)',
];

const RETRIEVER_ABI = [
  'function getOperatorState(address registryCoordinator, bytes quorumNumbers, uint32 blockNumber) view returns (tuple(address operator, bytes32 operatorId, uint96 stake)[][])',
];

const stakeRegistry = new ethers.Contract(STAKE_REGISTRY, STAKE_REGISTRY_ABI, provider);
const retriever = new ethers.Contract(OPERATOR_STATE_RETRIEVER, RETRIEVER_ABI, provider);

async function safeWeight(quorum, addr) {
  try {
    const v = await stakeRegistry.weightOfOperatorForQuorum(quorum, addr, {
      blockTag: SNAPSHOT_BLOCK,
    });
    return BigInt(v);
  } catch {
    return null; // revert or error
  }
}

function format18(x) {
  if (x === null) return 'null';
  return (Number(x) / 1e18).toFixed(6);
}

async function main() {
  console.log(`Snapshot block: ${SNAPSHOT_BLOCK}`);
  console.log(`RegistryCoordinator: ${REGISTRY_COORDINATOR}`);
  console.log(`OperatorStateRetriever: ${OPERATOR_STATE_RETRIEVER}`);
  console.log(`StakeRegistry: ${STAKE_REGISTRY}\n`);

  // 1. Read registered operators per quorum
  const quorumNumbers = '0x000102'; // q0, q1, q2
  const state = await retriever.getOperatorState(
    REGISTRY_COORDINATOR,
    quorumNumbers,
    SNAPSHOT_BLOCK
  );

  const perQuorum = [];

  for (let q = 0; q < state.length; q++) {
    const registered = state[q];
    console.log(`\n=== Quorum ${q}: ${registered.length} registered operators ===`);

    const operators = [];
    let total = 0n;

    for (const op of registered) {
      const weight = await safeWeight(q, op.operator);
      if (weight !== null && weight > 0n) {
        total += weight;
        operators.push({
          address: op.operator.toLowerCase(),
          operatorId: op.operatorId,
          registeredStake: op.stake.toString(),
          weightedStake: weight.toString(),
        });
      } else {
        operators.push({
          address: op.operator.toLowerCase(),
          operatorId: op.operatorId,
          registeredStake: op.stake.toString(),
          weightedStake: null,
        });
      }
    }

    const nonZero = operators.filter((o) => o.weightedStake !== null);
    console.log(`  registered: ${operators.length}`);
    console.log(`  non-zero weighted stake: ${nonZero.length}`);
    console.log(`  total weighted stake: ${format18(total)}`);

    perQuorum.push({
      quorum: q,
      registeredCount: operators.length,
      nonZeroCount: nonZero.length,
      totalWeightedStake: total.toString(),
      operators,
    });
  }

  // 2. Unique operators across all quorums
  const unique = new Set();
  for (const q of perQuorum) {
    for (const op of q.operators) unique.add(op.address);
  }

  console.log(`\n================ SUMMARY ================`);
  for (const q of perQuorum) {
    console.log(
      `q${q.quorum}: registered=${q.registeredCount} | non-zero=${q.nonZeroCount} | total=${format18(BigInt(q.totalWeightedStake))}`
    );
  }
  console.log(`Unique operators across all quorums: ${unique.size}`);

  // 3. Save artifact
  const artifact = {
    snapshotBlock: SNAPSHOT_BLOCK,
    registryCoordinator: REGISTRY_COORDINATOR,
    operatorStateRetriever: OPERATOR_STATE_RETRIEVER,
    stakeRegistry: STAKE_REGISTRY,
    perQuorum: perQuorum.map((q) => ({
      quorum: q.quorum,
      registeredCount: q.registeredCount,
      nonZeroCount: q.nonZeroCount,
      totalWeightedStake: q.totalWeightedStake,
      operators: q.operators,
    })),
    uniqueOperators: Array.from(unique).sort(),
  };

  fs.writeFileSync(
    'registered-stakes.json',
    JSON.stringify(artifact, null, 2)
  );

  console.log('\nSaved: registered-stakes.json');
}

main().catch((e) => {
  console.error('Fatal:', e.shortMessage || e.message);
  process.exitCode = 1;
});