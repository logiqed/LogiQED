'use strict';
const { ethers } = require('ethers');

// Dedicated env var for eth_getLogs (SwiftNodes etc.)
// Falls back to RPC_URL if not set.
const RPC_URL = process.env.RPC_URL_ETH_GET_LOGS || process.env.RPC_URL;
if (!RPC_URL) throw new Error('Set RPC_URL_ETH_GET_LOGS (or RPC_URL)');

const provider = new ethers.JsonRpcProvider(RPC_URL);

const ALLOCATION_MANAGER = '0x948a420b8cc1d6bfd0b6087c2e7c344a2cd0b6fa';

// Full range: from slashing activation block to current finalized block
const START_BLOCK = 22270000;

const ABI = [
  'event OperatorSlashed(address indexed operator, bytes32 indexed operatorSet, address[] strategies, uint256[] wadSlashed, string description)',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const finalized = await provider.getBlock('finalized');
  const currentBlock = finalized.number;

  console.log(`RPC: ${RPC_URL.replace(/(key|apikey|api_key)=[^&]+/i, '$1=REDACTED')}`);
  console.log(`Finalized block: ${currentBlock} (hash ${finalized.hash})`);
  console.log(`AllocationManager: ${ALLOCATION_MANAGER}`);
  console.log(`Range: ${START_BLOCK} -> ${currentBlock}\n`);

  const contract = new ethers.Contract(ALLOCATION_MANAGER, ABI, provider);

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
      const events = await contract.queryFilter('OperatorSlashed', from, to);

      if (events.length > 0) {
        total += events.length;
        for (const e of events) {
          found.push({
            block: e.blockNumber,
            operator: e.args.operator,
            operatorSet: e.args.operatorSet,
            description: e.args.description,
            tx: e.transactionHash,
          });
        }
        console.log(`  [${from}-${to}] found ${events.length}`);
      }

      if (to === currentBlock) isFullyCompleted = true;

      from = to + 1;
      step = Math.min(step * 2, 50000);
      retriesAtCurrent = 0;

      // Small delay to avoid hammering the RPC
      await sleep(50);
    } catch (e) {
      retriesAtCurrent++;
      const msg = e.shortMessage || e.message;

      if (retriesAtCurrent > MAX_RETRIES_PER_WINDOW) {
        console.error(
          `  Too many retries at ${from}-${to} (${retriesAtCurrent}). Aborting.`
        );
        console.error(`  Last error: ${msg}`);
        break;
      }

      if (step > MIN_STEP) {
        // Reduce window size on range limit errors
        step = Math.max(Math.floor(step / 2), MIN_STEP);
        console.warn(`  Node error. Step -> ${step} (retry ${retriesAtCurrent})`);
        await sleep(500 * Math.min(retriesAtCurrent, 10));
        continue;
      }

      // At minimum step: one last attempt before giving up
      console.error(`  Fatal at ${from}-${to}: ${msg}`);
      await sleep(2000);
      try {
        const events = await contract.queryFilter('OperatorSlashed', from, to);
        total += events.length;
        if (to === currentBlock) isFullyCompleted = true;
        from = to + 1;
        retriesAtCurrent = 0;
        continue;
      } catch (e2) {
        console.error(`  Fatal retry also failed: ${e2.shortMessage || e2.message}`);
        break;
      }
    }
  }

  console.log('\n================ RESULT ================');
  if (!isFullyCompleted) {
    console.log('❌ SCAN INTERRUPTED: result is NOT complete.');
    console.log(`   Scanned up to block ${from}. Target was ${currentBlock}.`);
  } else if (total === 0) {
    console.log(`✅ 100% COMPLETE: scanned up to finalized block ${currentBlock}`);
    console.log('   0 OperatorSlashed events found.');
    console.log('   No automatic slashing executed on mainnet in this range.');
  } else {
    console.log(`🚨 Found ${total} slashing events:`);
    for (const f of found) {
      console.log(`   Block ${f.block} | ${f.operator} | ${f.description}`);
    }
  }
}

main().catch((e) => {
  console.error('Fatal:', e.shortMessage || e.message);
  process.exitCode = 1;
});