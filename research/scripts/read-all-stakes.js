'use strict';
const fs = require('node:fs');
const { ethers } = require('ethers');

const RPC_URL = process.env.RPC_URL;
if (!RPC_URL) throw new Error('Set RPC_URL');

const provider = new ethers.JsonRpcProvider(RPC_URL);

const SNAPSHOT_BLOCK = Number(process.env.SNAPSHOT_BLOCK || 25990607);

const STAKE_REGISTRY = '0x006124ae7976137266feebfb3f4d2be4c073139d';

const ABI = [
  'function weightOfOperatorForQuorum(uint8 quorumNumber, address operator) view returns (uint96)',
  'function strategyParamsLength(uint8 quorumNumber) view returns (uint256)',
  'function strategyParamsByIndex(uint8 quorumNumber, uint256 index) view returns (tuple(address strategy, uint96 multiplier))',
];

const registry = new ethers.Contract(STAKE_REGISTRY, ABI, provider);

async function safeWeight(quorum, addr) {
  try {
    const v = await registry.weightOfOperatorForQuorum(quorum, addr, {
      blockTag: SNAPSHOT_BLOCK,
    });
    return BigInt(v);
  } catch {
    return null;
  }
}

async function readQuorumConfig(quorum) {
  console.log(`\n=== Quorum ${quorum} strategy config ===`);
  let len = 0n;
  try {
    len = BigInt(await registry.strategyParamsLength(quorum, { blockTag: SNAPSHOT_BLOCK }));
  } catch (e) {
    console.log(`  strategyParamsLength failed: ${e.shortMessage || e.message}`);
    return;
  }

  console.log(`  strategies in quorum: ${len.toString()}`);

  for (let i = 0n; i < len; i++) {
    try {
      const p = await registry.strategyParamsByIndex(quorum, i, {
        blockTag: SNAPSHOT_BLOCK,
      });
      console.log(`  [${i}] strategy=${p.strategy} multiplier=${p.multiplier.toString()}`);
    } catch (e) {
      console.log(`  [${i}] failed: ${e.shortMessage || e.message}`);
    }
  }
}

async function main() {
  console.log(`Snapshot block: ${SNAPSHOT_BLOCK}`);
  console.log(`StakeRegistry: ${STAKE_REGISTRY}`);

  // 1. Read strategy config for all three quorums
  await readQuorumConfig(0);
  await readQuorumConfig(1);
  await readQuorumConfig(2);

  // 2. Read weighted stake per operator
  console.log(`\n=== Reading weighted stake per operator ===\n`);

  const lines = fs
    .readFileSync('operators.txt', 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('0x'));

  console.log(`Loaded ${lines.length} operators\n`);

  const results = [];
  for (let i = 0; i < lines.length; i++) {
    const addr = lines[i];
    const q0 = await safeWeight(0, addr);
    const q1 = await safeWeight(1, addr);
    const q2 = await safeWeight(2, addr);

    results.push({ address: addr, q0, q1, q2 });

    if (i % 10 === 0 || i === lines.length - 1) {
      console.log(`[${i + 1}/${lines.length}] ${addr}`);
    }
  }

  const valid = (field) =>
    results.filter((r) => r[field] !== null && r[field] > 0n);

  const totalQ0 = valid('q0').reduce((s, r) => s + r.q0, 0n);
  const totalQ1 = valid('q1').reduce((s, r) => s + r.q1, 0n);
  const totalQ2 = valid('q2').reduce((s, r) => s + r.q2, 0n);

  console.log('\n================ TOTALS ================');
  console.log(
    `q0 (ETH/LST):  ${(Number(totalQ0) / 1e18).toFixed(6)} ETH  | non-zero: ${valid('q0').length}`
  );
  console.log(
    `q1 (EIGEN):    ${(Number(totalQ1) / 1e18).toFixed(6)} EIGEN | non-zero: ${valid('q1').length}`
  );
  console.log(
    `q2 (third):    ${(Number(totalQ2) / 1e18).toFixed(6)} units | non-zero: ${valid('q2').length}`
  );

  fs.writeFileSync(
    'all-stakes.json',
    JSON.stringify(
      {
        snapshotBlock: SNAPSHOT_BLOCK,
        totals: {
          q0: totalQ0.toString(),
          q1: totalQ1.toString(),
          q2: totalQ2.toString(),
        },
        operators: results.map((r) => ({
          address: r.address,
          q0: r.q0 === null ? null : r.q0.toString(),
          q1: r.q1 === null ? null : r.q1.toString(),
          q2: r.q2 === null ? null : r.q2.toString(),
        })),
      },
      null,
      2
    )
  );

  console.log('\nSaved: all-stakes.json');
}

main().catch((e) => {
  console.error('Fatal:', e.shortMessage || e.message);
  process.exitCode = 1;
});