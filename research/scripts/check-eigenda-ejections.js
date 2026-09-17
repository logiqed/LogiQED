'use strict';
const { ethers } = require('ethers');

const RPC_URL = process.env.RPC_URL_ETH_GET_LOGS || process.env.RPC_URL;
if (!RPC_URL) throw new Error('Set RPC_URL_ETH_GET_LOGS (or RPC_URL)');

const provider = new ethers.JsonRpcProvider(RPC_URL);

// EigenDA mainnet contracts
const EIGENDA_REGISTRY_COORDINATOR = '0x0BAAc79acD45A023E19345c352d8a7a83C4e5656';
const EIGENDA_EJECTION_MANAGER = '0x130d8EA0052B45554e4C99079B84df292149Bd5E';

const START_BLOCK = 22270000;

const ABI = [
  // EigenDA RegistryCoordinator
  'event OperatorEjected(address indexed operator, bytes32 indexed operatorId)',
  // EigenDA EjectionManager
  'event EjectionStarted(address indexed operator, bytes32 indexed operatorId)',
  'event EjectionCompleted(address indexed operator, bytes32 indexed operatorId)',
];

const registryCoordinator = new ethers.Contract(EIGENDA_REGISTRY_COORDINATOR, ABI, provider);
const ejectionManager = new ethers.Contract(EIGENDA_EJECTION_MANAGER, ABI, provider);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function scanContract(contract, eventName, label) {
  const finalized = await provider.getBlock('finalized');
  const currentBlock = finalized.number;

  console.log(`\n=== ${label} ===`);
  console.log(`Contract: ${contract.target}`);
  console.log(`Event: ${eventName}`);
  console.log(`Range: ${START_BLOCK} -> ${currentBlock}\n`);

  let step = 10000;
  const MIN_STEP = 100;
  let total = 0;
  let isFullyCompleted = false;

  let from = START_BLOCK;
  let retriesAtCurrent = 0;
  const MAX_RETRIES_PER_WINDOW = 30;

  while (from <= currentBlock) {
    const to = Math.min(from + step - 1, currentBlock);

    try {
      const events = await contract.queryFilter(eventName, from, to);
      if (events.length > 0) {
        total += events.length;
        console.log(`  [${from}-${to}] found ${events.length}`);
        for (const e of events) {
          console.log(`    Block ${e.blockNumber} | operator=${e.args[0]} | tx=${e.transactionHash}`);
        }
      }
      if (to === currentBlock) isFullyCompleted = true;

      from = to + 1;
      step = Math.min(step * 2, 50000);
      retriesAtCurrent = 0;
      await sleep(50);
    } catch (e) {
      retriesAtCurrent++;
      if (retriesAtCurrent > MAX_RETRIES_PER_WINDOW) break;
      if (step > MIN_STEP) {
        step = Math.max(Math.floor(step / 2), MIN_STEP);
        await sleep(500 * Math.min(retriesAtCurrent, 10));
        continue;
      }
      break;
    }
  }

  return { total, isFullyCompleted, lastScanned: from, currentBlock };
}

async function main() {
  const ejected = await scanContract(
    registryCoordinator,
    'OperatorEjected',
    'EigenDA RegistryCoordinator — OperatorEjected'
  );

  const ejectionStarted = await scanContract(
    ejectionManager,
    'EjectionStarted',
    'EigenDA EjectionManager — EjectionStarted'
  );

  const ejectionCompleted = await scanContract(
    ejectionManager,
    'EjectionCompleted',
    'EigenDA EjectionManager — EjectionCompleted'
  );

  console.log('\n================ SUMMARY ================');

  const checks = [
    { name: 'OperatorEjected (RegistryCoordinator)', res: ejected },
    { name: 'EjectionStarted (EjectionManager)', res: ejectionStarted },
    { name: 'EjectionCompleted (EjectionManager)', res: ejectionCompleted },
  ];

  let allCompleted = true;
  let totalEvents = 0;

  for (const c of checks) {
    if (!c.res.isFullyCompleted) {
      console.log(`❌ ${c.name}: SCAN INTERRUPTED at block ${c.res.lastScanned}`);
      allCompleted = false;
    } else {
      console.log(`✅ ${c.name}: 100% COMPLETE. Events found: ${c.res.total}`);
      totalEvents += c.res.total;
    }
  }

  if (allCompleted && totalEvents === 0) {
    console.log('\n✅ 0 ejection events across all three contracts over the scanned range.');
    console.log('   No forced ejection activity observed for EigenDA.');
  } else if (allCompleted) {
    console.log('\n⚠️ Non-zero ejection events found. Manual review required.');
  } else {
    console.log('\n❌ At least one scan did not complete. Results are NOT valid.');
  }
}

main().catch((e) => {
  console.error('Fatal:', e.shortMessage || e.message);
  process.exitCode = 1;
});