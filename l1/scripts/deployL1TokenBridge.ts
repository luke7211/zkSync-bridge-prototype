// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { Provider } from "zksync-web3";

async function main() {
  const l2Provider = new Provider("https://zksync2-testnet.zksync.dev");
  const zkSyncAddress = await l2Provider.getMainContractAddress();
  const l1DAI = "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844"; // goerli DAI
  const l1Escrow = "0x11dD504c8a56d99101946B3eD0AD4562a2fCd3ea"; // goerli L1Escrow
  const l2DAI = "0x9E25a8e17cc6c20b9E2f9b8943B8aee45Cbb811b"; // L2 zkSync Testnet DAI
  const l2DAITokenBridge = "0xF94288cf65d2c1b2b18581E0Ddc061ddb59B9EA4"; // L2 DAI TokenBridge

  // We get the contract to deploy
  const L1DAITokenBridge = await ethers.getContractFactory("L1DAITokenBridge");
  const contract = await L1DAITokenBridge.deploy(
    l1DAI,
    l2DAITokenBridge,
    l2DAI,
    l1Escrow,
    zkSyncAddress
  );
  await contract.deployed();
  console.log(
    `L1DAITokenBridge contract was successfully deployed at ${contract.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
