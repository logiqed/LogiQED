'use strict';
const fs = require('node:fs');
const { ethers } = require('ethers');

const RPC_URL = process.env.RPC_URL;
if (!RPC_URL) throw new Error('Set RPC_URL');

const provider = new ethers.JsonRpcProvider(RPC_URL);

const SNAPSHOT_BLOCK = Number(process.env.SNAPSHOT_BLOCK || 25990607);
const DIRECTORY = '0x64AB2e9A86FA2E183CB6f01B2D4050c1c2dFAad4';

const DIRECTORY_ABI = [
  'function getAllNames() view returns (string[] memory)',
  'function getAddress(bytes32 key) view returns (address)',
  'function getAddress(string name) view returns (address)',
];

const REGISTRY_ABI = ['function quorumCount() view returns (uint8)'];

const RETRIEVER_ABI = [
  'function getOperatorState(address registryCoordinator, bytes quorumNumbers, uint32 blockNumber) view returns (tuple(address operator, bytes32 operatorId, uint96 stake)[][])',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function retry(fn, label, attempts = 5) {
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      const msg = e.shortMessage || e.message;
      console.warn(`  ${label}: attempt ${i}/${attempts} failed — ${msg}`);
      if (i === attempts) throw e;
      await sleep(1000 * i); // exponential backoff
    }
  }
}

async function main() {
  console.log(`Snapshot block: ${SNAPSHOT_BLOCK}\n`);

  const dir = new ethers.Contract(DIRECTORY, DIRECTORY_ABI, provider);

  // getAllNames — without blockTag (read the current directory)
  const names = await retry(
    () => dir.getAllNames(),
    'getAllNames'
  );
  console.log(`Directory names (${names.length}):`);
  for (const n of names) console.log(`  - ${n}`);

  console.log('\n=== Resolving addresses (bytes32 variant, with retry) ===');
  const resolved = {};

  for (const name of names) {
    const key = ethers.keccak256(ethers.toUtf8Bytes(name));
    let addr = null;
    try {
      addr = await retry(
        () => dir['getAddress(bytes32)'](key),
        `getAddress(${name})`
      );
    } catch (e) {
      console.warn(`  ${name}: SKIPPED — ${e.shortMessage || e.message}`);
      addr = null;
    }
    resolved[name] = addr;
    console.log(`  ${name} = ${addr || 'ERROR'}`);
    await sleep(300); // мягкая пауза между запросами
  }

  const rcAddr = resolved['REGISTRY_COORDINATOR'];
  if (!rcAddr || rcAddr.toLowerCase() === DIRECTORY.toLowerCase()) {
    console.error('\n❌ REGISTRY_COORDINATOR not resolved.');
    process.exit(1);
  }

  console.log(`\n=== v2 RegistryCoordinator: ${rcAddr} ===`);

  const coordinator = new ethers.Contract(rcAddr, REGISTRY_ABI, provider);
  const quorumCount = Number(
    await retry(() => coordinator.quorumCount({ blockTag: SNAPSHOT_BLOCK }), 'quorumCount')
  );
  console.log(`quorumCount = ${quorumCount}`);

  const quorumNumbers =
    '0x' +
    Array.from({ length: quorumCount }, (_, i) =>
      i.toString(16).padStart(2, '0')
    ).join('');
  console.log(`quorumNumbers = ${quorumNumbers}`);

  const retrieverAddr = resolved['OPERATOR_STATE_RETRIEVER'];
  if (!retrieverAddr) {
    console.error('\n❌ OPERATOR_STATE_RETRIEVER not resolved.');
    process.exit(1);
  }
  console.log(`\n=== OperatorStateRetriever: ${retrieverAddr} ===`);

  const retriever = new ethers.Contract(retrieverAddr, RETRIEVER_ABI, provider);
  const result = await retry(
    () =>
      retriever.getOperatorState(rcAddr, quorumNumbers, SNAPSHOT_BLOCK),
    'getOperatorState'
  );

  const allOps = new Set();
  for (let q = 0; q < result.length; q++) {
    console.log(`  Quorum ${q}: ${result[q].length} operators`);
    for (const op of result[q]) allOps.add(op.operator.toLowerCase());
  }

  console.log(`\nTotal unique v2 operators: ${allOps.size}`);

  fs.writeFileSync('operators-v2.txt', Array.from(allOps).sort().join('\n'));
  fs.writeFileSync(
    'v2-summary.json',
    JSON.stringify(
      {
        snapshotBlock: SNAPSHOT_BLOCK,
        resolvedAddresses: resolved,
        registryCoordinator: rcAddr,
        operatorStateRetriever: retrieverAddr,
        quorumCount,
        totalUniqueOperators: allOps.size,
        operators: Array.from(allOps).sort(),
      },
      null,
      2
    )
  );

  console.log('\nSaved: operators-v2.txt');
  console.log('Saved: v2-summary.json');
}

main().catch((e) => {
  console.error('Fatal:', e.shortMessage || e.message);
  process.exitCode = 1;
});