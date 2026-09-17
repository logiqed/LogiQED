'use strict';
const fs = require('node:fs');

const data = JSON.parse(fs.readFileSync('registered-stakes.json', 'utf8'));

function toEther(x) {
  return Number(BigInt(x)) / 1e18;
}

function formatPct(part, total) {
  return ((part / total) * 100).toFixed(2) + '%';
}

function statsForQuorum(quorum) {
  const q = data.perQuorum.find((x) => x.quorum === quorum);

  const rows = q.operators
    .map((op) => ({
      address: op.address,
      value: op.weightedStake === null ? 0n : BigInt(op.weightedStake),
    }))
    .filter((r) => r.value > 0n)
    .sort((a, b) => (a.value === b.value ? 0 : a.value > b.value ? -1 : 1));

  const total = rows.reduce((s, r) => s + r.value, 0n);

  const top1 = rows.slice(0, 1).reduce((s, r) => s + r.value, 0n);
  const top3 = rows.slice(0, 3).reduce((s, r) => s + r.value, 0n);
  const top10 = rows.slice(0, 10).reduce((s, r) => s + r.value, 0n);

  console.log(`\n=== q${quorum} ===`);
  console.log(`Total: ${toEther(total).toFixed(6)}`);
  console.log(`Non-zero operators: ${rows.length}`);
  console.log(`Top-1:  ${formatPct(Number(top1), Number(total))} — ${rows[0].address}`);
  console.log(`Top-3:  ${formatPct(Number(top3), Number(total))}`);
  console.log(`Top-10: ${formatPct(Number(top10), Number(total))}`);

  const conf55 = (total * 55n) / 100n;
  const adv33 = (total * 33n) / 100n;
  console.log(`Confirmation 55%: ${toEther(conf55).toFixed(6)}`);
  console.log(`Adversary 33%:    ${toEther(adv33).toFixed(6)}`);

  console.log('\nTop-5 operators:');
  for (const r of rows.slice(0, 5)) {
    console.log(`  ${r.address} | ${toEther(r.value).toFixed(6)} | ${formatPct(Number(r.value), Number(total))}`);
  }
}

statsForQuorum(0);
statsForQuorum(1);
statsForQuorum(2);