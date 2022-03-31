// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { JsonRpcProvider } from "@ethersproject/providers";
import { getAddressOfNextDeployedContract } from "@makerdao/hardhat-utils";
import hre from "hardhat";
import dotenv from "dotenv";

async function main() {
  dotenv.config();

  const network = await ethers.provider.getNetwork();
  console.log(network);

  const signer = new hre.ethers.Wallet(
    process.env["SIGNER_PK"] as string,
    ethers.provider
  );
  console.log("Signer:", signer.address);

  const l1DAI = "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844"; // goerli DAI
  //const l2DAI = "​​0x9E25a8e17cc6c20b9E2f9b8943B8aee45Cbb811b"; // l2 DAI - what is wrong with this string ????
  const l2DAI = "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844";
  const l1DAITokenBridge = "0x3d72bE1B6b0F05a23a973262fA5AC0f681b43d6E"; // L1DAITokenBridge

  // TODO test some
  const l1DAITokenBridgeAbi = [
    "function depositERC20(address ,address ,uint256 ,uint32 ,bytes)",
  ];
  const l1DAITokenBridgeContract = new ethers.Contract(
    l1DAITokenBridge,
    l1DAITokenBridgeAbi,
    signer
  );

  console.log(l1DAITokenBridgeContract);

  const tx = await l1DAITokenBridgeContract.depositERC20(
    l1DAI,
    l2DAI,
    1,
    1000,
    0
  );

  console.log("Deposit successful ?", tx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
