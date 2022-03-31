# L1 part of the simple bridge

Contracts:

- `L1DAITokenBridge`
- `L1Escrow`
- `L1GovernanceRelay`

Scripts:

- `deployEscrow` - deploys Escrow contract
- `deployL1GovernanceRelay` - deploys L1GovernacneRelay
- `deployL1TokenBridge` - deploys L1TokenBridge - no Withdrawals implemented
- `getNextDeploymentAddress` - displays next deployment address with the optional offset
- `testDeposit` - deposits 1 DAI to the bridge

The actual deployment is somewhat tricky as to deploy L2DAITokenBridge contract you need to know L1DAITokenBridge address, and vice-versa. As a result the deployment sequence is as follows:

1. Check nextDeploymentAddress on L1 with offset 1
2. Deploy L2 contract specifying L1 address obtained in step 1 in a constructor. This will actually create L1 transaction, hence offset = 1 in step 1
3. Deploy L1 contract specifying L2 address deployment from step 2 in a constructor. The contract should be deployed at the address obtained in step 1

Notes:

For scripts to work you need to create `goerli.json` file with the following format:

```
{
  "nodeUrl": "RPC-NODE-URL",
  "deployerPrivateKey": "YOUR-PRIVATE-KEY"
}
```
