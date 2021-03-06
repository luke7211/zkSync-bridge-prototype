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
  const l2GovernanceRelay = "0x614af89Bb7C61Dad3685E7a8f4785965878C2E6e"; // L2 Governance Relayer

  const L1GovernanceRelay = await ethers.getContractFactory(
    "L1GovernanceRelay"
  );
  const contract = await L1GovernanceRelay.deploy(
    l2GovernanceRelay,
    zkSyncAddress
  );
  await contract.deployed();
  console.log(
    `L1GovernanceRelay contract was successfully deployed at ${contract.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
