// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { getAddressOfNextDeployedContract } from "@makerdao/hardhat-utils";
import hre from "hardhat";
import dotenv from "dotenv";

async function main() {
  dotenv.config();
  const network = await ethers.provider.getNetwork();
  console.log(network);

  const l1Deployer = new hre.ethers.Wallet(
    process.env["SIGNER_PK"] as string,
    ethers.provider
  );
  console.log("Deployer:", l1Deployer.address);

  const nextContractAddress = await getAddressOfNextDeployedContract(
    l1Deployer,
    1
  );
  console.log(`Next contract will be deployed at  ${nextContractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
