// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  console.log(ethers.provider);
  //const network = await ethers.provider.getNetwork();
  //console.log(network);
  //const L1Escrow = await ethers.getContractFactory("L1Escrow");
  //const contract = await L1Escrow.deploy();
  //await contract.deployed();
  //console.log(
  //  `L1Escrow contract was successfully deployed at ${contract.address}`
  //);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
