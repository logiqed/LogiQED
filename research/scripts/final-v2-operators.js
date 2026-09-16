'use strict';
const fs = require('node:fs');
const { ethers } = require('ethers');

const RPC_URL = process.env.RPC_URL;
if (!RPC_URL) throw new Error('Set RPC_URL');
const provider = new ethers.JsonRpcProvider(RPC_URL);

const DIRECTORY = '0x64AB2e9A86FA2E183CB6f01B2D4050c1c2dFAad4';

// ОБЕ функции getAddress — с разными сигнатурами
const DIRECTORY_ABI = [
  'function getAllNames() view returns (string[] memory)',
  'function getAddress(bytes32 key) view returns (address)',   // селектор 0x21f8a721
  'function getAddress(string name) view returns (address)',  // селектор 0xbf40fac1
  'function getName(bytes32 key) view returns (string)',
];

const REGISTRY_ABI = ['function quorumCount() view returns (uint8)'];

const RETRIEVER_ABI = [
  'function getOperatorState(address registryCoordinator, bytes quorumNumbers, uint32 blockNumber) view returns (tuple(address operator, bytes32 operatorId, uint96 stake)[][])',
];

async function main() {
  const blockNumber = await provider.getBlockNumber();
  console.log(`Current block: ${blockNumber}\n`);

  const dir = new ethers.Contract(DIRECTORY, DIRECTORY_ABI, provider);

  const names = await dir.getAllNames();
  console.log(`Directory names (${names.length}):`);
  for (const n of names) console.log(`  - ${n}`);

  console.log('\n=== Resolving addresses (trying bytes32 variant) ===');
  const resolved = {};

  for (const name of names) {
    const key = ethers.keccak256(ethers.toUtf8Bytes(name));
    
    // Пробуем bytes32-вариант (селектор 0x21f8a721)
    let addr = null;
    try {
      addr = await dir['getAddress(bytes32)'](key);
    } catch (e) {
      // Fallback — пробуем string-вариант
      try {
        addr = await dir['getAddress(string)'](name);
      } catch (e2) {
        addr = null;
      }
    }

    resolved[name] = addr;
    console.log(`  ${name} = ${addr || 'ERROR'}`);
  }

  // Проверяем, что REGISTRY_COORDINATOR отличается от Directory
  const rcAddr = resolved['REGISTRY_COORDINATOR'];
  if (!rcAddr || rcAddr.toLowerCase() === DIRECTORY.toLowerCase()) {
    console.error('\n❌ REGISTRY_COORDINATOR resolved to Directory itself.');
    console.error('   The bytes32 variant did not work either.');
    console.error('   Need to check actual ABI on Etherscan.');
    process.exit(1);
  }

  console.log(`\n=== v2 RegistryCoordinator: ${rcAddr} ===`);

  const coordinator = new ethers.Contract(rcAddr, REGISTRY_ABI, provider);
  const quorumCount = Number(await coordinator.quorumCount());
  console.log(`quorumCount = ${quorumCount}`);

  const quorumNumbers = '0x' + Array.from(
    { length: quorumCount },
    (_, i) => i.toString(16).padStart(2, '0')
  ).join('');
  console.log(`quorumNumbers = ${quorumNumbers}`);

  const retrieverAddr = resolved['OPERATOR_STATE_RETRIEVER'];
  console.log(`\n=== OperatorStateRetriever: ${retrieverAddr} ===`);

  const retriever = new ethers.Contract(retrieverAddr, RETRIEVER_ABI, provider);
  const result = await retriever.getOperatorState(
    rcAddr,
    quorumNumbers,
    blockNumber
  );

  const allOps = new Set();
  for (let q = 0; q < result.length; q++) {
    console.log(`  Quorum ${q}: ${result[q].length} operators`);
    for (const op of result[q]) allOps.add(op.operator.toLowerCase());
  }

  console.log(`\nTotal unique v2 operators: ${allOps.size}`);

  fs.writeFileSync('operators-v2.txt', Array.from(allOps).sort().join('\n'));
  fs.writeFileSync('v2-summary.json', JSON.stringify({
    blockNumber,
    resolvedAddresses: resolved,
    registryCoordinator: rcAddr,
    operatorStateRetriever: retrieverAddr,
    quorumCount,
    totalUniqueOperators: allOps.size,
    operators: Array.from(allOps).sort(),
  }, null, 2));

  console.log('\nSaved: operators-v2.txt');
  console.log('Saved: v2-summary.json');
}

main().catch(e => { console.error('Fatal:', e.shortMessage || e.message); process.exitCode = 1; });