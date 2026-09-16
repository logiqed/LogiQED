'use strict';
const fs = require('node:fs');
const { ethers } = require('ethers');

const RPC_URL = process.env.RPC_URL;
if (!RPC_URL) throw new Error('Set RPC_URL');
const provider = new ethers.JsonRpcProvider(RPC_URL);

const STAKE_REGISTRY = '0x006124ae7976137266feebfb3f4d2be4c073139d';
const ABI = [
  'function weightOfOperatorForQuorum(uint8 quorumNumber, address operator) view returns (uint96)',
];
const registry = new ethers.Contract(STAKE_REGISTRY, ABI, provider);

async function safeWeight(quorum, addr) {
  try {
    const v = await registry.weightOfOperatorForQuorum(quorum, addr);
    return BigInt(v);
  } catch (e) {
    return null; // revert или ошибка
  }
}

function format18(x) {
  if (x === null) return 'null';
  return (Number(x) / 1e18).toFixed(6);
}

async function main() {
  const lines = fs.readFileSync('operators.txt', 'utf8')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('0x'));

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

  const valid = (field) => results.filter(r => r[field] !== null && r[field] > 0n);

  const totalQ0 = valid('q0').reduce((s, r) => s + r.q0, 0n);
  const totalQ1 = valid('q1').reduce((s, r) => s + r.q1, 0n);
  const totalQ2 = valid('q2').reduce((s, r) => s + r.q2, 0n);

  console.log('\n================ TOTALS ================');
  console.log(`q0 (ETH/LST):  ${format18(totalQ0)} ETH  | non-zero operators: ${valid('q0').length}`);
  console.log(`q1 (EIGEN):    ${format18(totalQ1)} EIGEN | non-zero operators: ${valid('q1').length}`);
  console.log(`q2 (third):    ${format18(totalQ2)} units | non-zero operators: ${valid('q2').length}`);

  // Сохраняем JSON
  fs.writeFileSync('all-stakes.json', JSON.stringify(results.map(r => ({
    address: r.address,
    q0: r.q0 === null ? null : r.q0.toString(),
    q1: r.q1 === null ? null : r.q1.toString(),
    q2: r.q2 === null ? null : r.q2.toString(),
  })), null, 2));

  console.log('\nSaved: all-stakes.json');
}

main().catch(e => { console.error('Fatal:', e.shortMessage || e.message); process.exitCode = 1; });