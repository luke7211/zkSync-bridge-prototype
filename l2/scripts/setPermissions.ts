/* 
yarn hardhat run --network hardhat ./scripts/setPermissions.ts
*/
import { Wallet, Provider, Contract } from "zksync-web3";
import hre from "hardhat";
import dotenv from "dotenv";

async function main() {
  dotenv.config();

  console.log("hello");
  console.log(hre.config.zkSyncDeploy);

  const l2Provider = new Provider("https://zksync2-testnet.zksync.dev");
  console.log("Connected to", await l2Provider.getNetwork());
  //process.exit(1);

  const wallet = new Wallet(process.env["SIGNER_PK"] as string, l2Provider);

  const L2DAI_CONTRACT_ADDRESS = "0x9E25a8e17cc6c20b9E2f9b8943B8aee45Cbb811b";
  const L2GovRelay_CONTRACT_ADDRESS =
    "0x106081EC9E2132E304655F0964a93010D9aFc9f2";
  const L2DAIBridge_CONTRACT_ADDRESS =
    "0xF94288cf65d2c1b2b18581E0Ddc061ddb59B9EA4";
  const L2DAI_ABI = ["function rely(address)"];

  const dai = new Contract(L2DAI_CONTRACT_ADDRESS, L2DAI_ABI, wallet);
  const tx = await dai.rely(L2DAIBridge_CONTRACT_ADDRESS);
  console.log("Rely tx: ", tx);

  await tx.waitFinalize();
  console.log(tx.hash, "is mined, getting receipt");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
