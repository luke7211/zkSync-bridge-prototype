import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import dotenv from "dotenv";

// Insert the address of the governance contract
//const GOVERNANCE_ADDRESS = "<GOVERNANCE-ADDRESS>";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  dotenv.config();
  console.log(`Running deploy script for the L2GovernanceRelay contract`);

  // Initialize the wallet

  const wallet = new Wallet(process.env["SIGNER_PK"] as string);

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  //const artifact = await deployer.loadArtifact("Dai");
  //const artifact = await deployer.loadArtifact("L2DAITokenBridge");
  const artifact = await deployer.loadArtifact("L2GovernanceRelay");

  // Deposit some funds to L2 to be able to perform deposits.
  const depositAmount = ethers.utils.parseEther("0.001");
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: depositAmount,
  });
  // Wait until the deposit is processed on zkSync
  await depositHandle.wait();

  //const daiContract = await deployer.deploy(artifact, []);
  //const contractAddress = daiContract.address;

  /*const l2Token = "0x9E25a8e17cc6c20b9E2f9b8943B8aee45Cbb811b";
  const l1Token = "0x11dD504c8a56d99101946B3eD0AD4562a2fCd3ea";
  const l1DAIBridgeFutureAddress = "0x3d72bE1B6b0F05a23a973262fA5AC0f681b43d6E";

  const l2TokenBridgeContract = await deployer.deploy(artifact, [
    l2Token,
    l1Token,
    l1DAIBridgeFutureAddress,
  ]);
  const contractAddress = l2TokenBridgeContract.address; */

  const l1GovernanceRelayAddress = "0x106081EC9E2132E304655F0964a93010D9aFc9f2";

  const l2GovernanceRelayContract = await deployer.deploy(artifact, [
    l1GovernanceRelayAddress,
  ]);
  const contractAddress = l2GovernanceRelayContract.address;

  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}
