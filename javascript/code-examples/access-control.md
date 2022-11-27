# 🔑 Apply Access Control

Pushing file to lighthouse node with encryption using nodejs.

```javascript
const ethers = require("ethers");
const lighthouse = require('@lighthouse-web3/sdk');

const sign_auth_message = async(publicKey, privateKey) =>{
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
  const signedMessage = await signer.signMessage(messageRequested);
  return(signedMessage)
}

const accessControl = async() =>{
  const cid = "QmXtLgrwUYq3GeCXX3pjDG76byRkr4dUbmhRe148YqHgTK";
  const publicKey = "0xa3c960b3ba29367ecbcaf1430452c6cd7516f588";
  const privateKey = process.env.PRIVATE_KEY;
  
  // Conditions to add
  const conditions = [
    {
      id: 1,
      chain: "wallaby",
      method: "balanceOf",
      standardContractType: "ERC20",
      contractAddress: "0x1a6ceedD39E85668c233a061DBB83125847B8e3A",
      returnValueTest: { comparator: ">=", value: "1" },
      parameters: [":userAddress"],
    },
    {
      id: 2,
      chain: "Optimism",
      method: "getBlockNumber",
      standardContractType: "",
      returnValueTest: {
        comparator: ">=",
        value: "13349"
      },
    },
  ];

  const aggregator = "([1] and [2])";

  const signedMessage = await sign_auth_message(publicKey, privateKey);
  /*
    accessCondition(publicKey, cid, signedMessage, conditions, aggregator)
      Parameters:
        publicKey: owners public key
        CID: CID of file to decrypt
        signedMessage: message signed by owner of publicKey
        conditions: should be in format like above
        aggregator: aggregator to apply on conditions, in this example we used and
  */
  const response = await lighthouse.accessCondition(
    publicKey,
    cid,
    signedMessage,
    conditions,
    aggregator
  );

  // // Display response
  console.log(response);
  /*
    {
      data: {
        cid: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
        conditions: [ [Object] ],
        aggregator: '([1])'
      }
    }
  */
}

const getfileEncryptionKey = async() => {
  // Get key back after passing access control condition
  const cid = "QmXtLgrwUYq3GeCXX3pjDG76byRkr4dUbmhRe148YqHgTK";
  const publicKey = "0x969e19A952A9aeF004e4F711eE481D72A59470B1";
  const privateKey = "0xa74ba0e4cc2e9f0be6776509cdb1495d76ac8fdc727a8b93f60772d73893fe2e";

  const signedMessage = await sign_auth_message(publicKey, privateKey);
  /*
    fetchEncryptionKey(cid, publicKey, signedMessage)
      Parameters:
        cid: cid of file
        publicKey: your public key
        signedMessage: message signed by owner of public key
  */
  const key = await lighthouse.fetchEncryptionKey(
    cid,
    publicKey,
    signedMessage
  );
  console.log(key);
}

accessControl()
```
