'use strict';
const { ethers } = require('ethers');

const RPC_URL = process.env.RPC_URL_ETH_GET_LOGS || process.env.RPC_URL;
if (!RPC_URL) throw new Error('Set RPC_URL_ETH_GET_LOGS (or RPC_URL)');

const provider = new ethers.JsonRpcProvider(RPC_URL);

const ALLOCATION_MANAGER = '0x948a420b8cc1d6bfd0b6087c2e7c344a2cd0b6fa';
const STRATEGY_MANAGER = '0x858646372CC42E1A627fcE94aa7A7033e7CF075A';

const START_BLOCK = 22270000;

const ABI = [
  'event OperatorSlashed(address indexed operator, bytes32 indexed operatorSet, address[] strategies, uint256[] wadSlashed, string description)',
  'event BurnOrRedistributableSharesIncreased(bytes32 indexed operatorSetKey, uint256 indexed slashId, address indexed strategy, uint256 shares)',
];

const allocationManager = new ethers.Contract(ALLOCATION_MANAGER, ABI, provider);
const strategyManager = new ethers.Contract(STRATEGY_MANAGER, ABI, provider);

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
  const found = [];
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
        for (const e of events) {
          found.push({ block: e.blockNumber, args: e.args, tx: e.transactionHash });
        }
        console.log(`  [${from}-${to}] found ${events.length}`);
      }

      if (to === currentBlock) isFullyCompleted = true;

      from = to + 1;
      step = Math.min(step * 2, 50000);
      retriesAtCurrent = 0;
      await sleep(50);
    } catch (e) {
      retriesAtCurrent++;
      const msg = e.shortMessage || e.message;

      if (retriesAtCurrent > MAX_RETRIES_PER_WINDOW) {
        console.error(`  Too many retries at ${from}-${to}. Aborting.`);
        break;
      }

      if (step > MIN_STEP) {
        step = Math.max(Math.floor(step / 2), MIN_STEP);
        console.warn(`  Node error. Step -> ${step} (retry ${retriesAtCurrent})`);
        await sleep(500 * Math.min(retriesAtCurrent, 10));
        continue;
      }

      console.error(`  Fatal at ${from}-${to}: ${msg}`);
      break;
    }
  }

  return { total, found, isFullyCompleted, currentBlock, lastScanned: from };
}

async function main() {
  const slashed = await scanContract(allocationManager, 'OperatorSlashed', 'AllocationManager — OperatorSlashed');
  const burned = await scanContract(strategyManager, 'BurnOrRedistributableSharesIncreased', 'StrategyManager — BurnOrRedistributableSharesIncreased');

  console.log('\n================ SUMMARY ================');

  const slashedDone = slashed.isFullyCompleted;
  const burnedDone = burned.isFullyCompleted;

  if (!slashedDone) {
    console.log(`❌ OperatorSlashed scan: SCAN INTERRUPTED at block ${slashed.lastScanned}`);
    console.log(`   Scanned up to block ${slashed.lastScanned}. Target was ${slashed.currentBlock}.`);
  } else {
    console.log(`✅ OperatorSlashed scan: 100% COMPLETE. Events found: ${slashed.total}`);
  }

  if (!burnedDone) {
    console.log(`❌ BurnOrRedistributableSharesIncreased scan: SCAN INTERRUPTED at block ${burned.lastScanned}`);
    console.log(`   Scanned up to block ${burned.lastScanned}. Target was ${burned.currentBlock}.`);
  } else {
    console.log(`✅ BurnOrRedistributableSharesIncreased scan: 100% COMPLETE. Events found: ${burned.total}`);
  }

  if (slashedDone && burnedDone && slashed.total === 0 && burned.total === 0) {
    console.log('\n✅ 0 events in both contracts over the scanned range.');
    console.log('   No slashing or burn/redistribution activity observed.');
  } else if (slashedDone && burnedDone) {
    console.log('\n⚠️ Non-zero events found. Manual review required.');
  } else {
    console.log('\n❌ At least one scan did not complete. Results are NOT valid.');
  }
}

main().catch((e) => {
  console.error('Fatal:', e.shortMessage || e.message);
  process.exitCode = 1;
});