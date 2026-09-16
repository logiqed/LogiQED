'use strict';
const { ethers } = require('ethers');

const RPC_URL = process.env.RPC_URL;
if (!RPC_URL) throw new Error('Set RPC_URL');

const provider = new ethers.JsonRpcProvider(RPC_URL);

const ALLOCATION_MANAGER = '0x948a420b8cc1d6bfd0b6087c2e7c344a2cd0b6fa';
const START_BLOCK = 22270000;

const ABI = [
  'event OperatorSlashed(address indexed operator, bytes32 indexed operatorSet, address[] strategies, uint256[] wadSlashed, string description)'
];

async function main() {
  const latestBlock = await provider.getBlockNumber();
  // Отступаем 100 блоков — избегаем нефинализированных блоков
  const currentBlock = latestBlock - 100;

  console.log(`Latest block: ${latestBlock}`);
  console.log(`Scanning up to safe block: ${currentBlock}`);
  console.log(`AllocationManager: ${ALLOCATION_MANAGER}`);
  console.log(`Range: ${START_BLOCK} -> ${currentBlock}\n`);

  const contract = new ethers.Contract(ALLOCATION_MANAGER, ABI, provider);

  let step = 10000;
  let total = 0;
  const found = [];
  let isFullyCompleted = false;

  let from = START_BLOCK;
  let retries = 0;
  const MAX_RETRIES = 20;

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

      if (to === currentBlock) {
        isFullyCompleted = true;
      }

      from = to + 1;
      step = Math.min(step * 2, 50000);
      retries = 0;
    } catch (e) {
      retries++;
      if (retries > MAX_RETRIES) {
        console.error(`  Too many retries at ${from}-${to}: ${e.shortMessage || e.message}`);
        break;
      }
      if (step > 200) {
        step = Math.floor(step / 2);
        console.warn(`  Node error. Step -> ${step} (retry ${retries})`);
        continue;
      }
      console.error(`  Fatal at ${from}-${to}: ${e.shortMessage || e.message}`);
      break;
    }
  }

  console.log('\n================ RESULT ================');
  if (!isFullyCompleted) {
    console.log('❌ SCAN INTERRUPTED: result is NOT complete.');
  } else if (total === 0) {
    console.log(`✅ 100% COMPLETE: scanned up to block ${currentBlock}`);
    console.log('   0 OperatorSlashed events found.');
    console.log('   No automatic slashing executed on mainnet in this range.');
  } else {
    console.log(`🚨 Found ${total} slashing events:`);
    for (const f of found) {
      console.log(`   Block ${f.block} | ${f.operator} | ${f.description}`);
    }
  }
}

main().catch(e => {
  console.error('Fatal:', e.shortMessage || e.message);
  process.exitCode = 1;
});