# NodeJS Encryption

Pushing file to lighthouse node with encryption using nodejs.

```javascript
const { ethers } = require("ethers");
const lighthouse = require('@lighthouse-web3/sdk');

const sign_auth_message = async(publicKey, privateKey) =>{
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = await lighthouse.getAuthMessage(publicKey);
  const signedMessage = await signer.signMessage(messageRequested);
  return(signedMessage)
}

const accessControl = async() =>{
  const cid = "QmQA5LfUpoyBGcc6E4doYDU7YeWEar4bppfjZ6mB2by7mK";
  const publicKey = "0xa3c960b3ba29367ecbcaf1430452c6cd7516f588";
  const privateKey = "0x6aa0ee41fa9cf65f90c06e5db8fa2834399b59b37974b21f2e405955630d472a";
  const signedMessage1 = await sign_auth_message(publicKey, privateKey);
  
  // Get File Encryption Key
  const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
    cid,
    publicKey,
    signedMessage1,
  );
  
  // Conditions to add
  const conditions = [
    {
      id: 1,
      chain: "FantomTest",
      method: "balanceOf",
      standardContractType: "ERC20",
      contractAddress: "0xF0Bc72fA04aea04d04b1fA80B359Adb566E1c8B1",
      returnValueTest: { comparator: ">=", value: "0" },
      parameters: [":userAddress"],
    },
    {
      id: 2,
      chain: "FantomTest",
      method: "balanceOf",
      standardContractType: "ERC20",
      contractAddress: "0xF0Bc72fA04aea04d04b1fA80B359Adb566E1c8B1",
      returnValueTest: { comparator: ">=", value: "0" },
      parameters: [":userAddress"],
    },
  ];

  const aggregator = "([1] and [2])";

  const signedMessage2 = await sign_auth_message(publicKey, "0x6aa0ee41fa9cf65f90c06e5db8fa2834399b59b37974b21f2e405955630d472a");
  /*
    accessCondition(publicKey, cid, fileEncryptionKey, signedMessage, conditions, aggregator)
      Parameters:
        publicKey: owners public key
        CID: CID of file to decrypt
        fileEncryptionKey: fetched above
        signedMessage: message signed by owner of publicKey
        conditions: should be in format like above
        aggregator: aggregator to apply on conditions, in this example we used and
  */
  const response = await lighthouse.accessCondition(
    publicKey,
    cid,
    fileEncryptionKey,
    signedMessage2,
    conditions,
    aggregator
  );

  // // Display response
  console.log(response);
  /*
    shared
  */
}

const getfileEncryptionKey = () => {
  // Get key back after passing access control condition
  const cid = "QmQA5LfUpoyBGcc6E4doYDU7YeWEar4bppfjZ6mB2by7mK";
  const publicKey = "0xa3c960b3ba29367ecbcaf1430452c6cd7516f588";
  const privateKey = "0x6aa0ee41fa9cf65f90c06e5db8fa2834399b59b37974b21f2e405955630d472a";

  const signedMessage = await sign_auth_message(publicKey, privateKey);
  
  /*
    fetchEncryptionKey(cid, publicKey, signedMessage, directaccessMode)
      Parameters:
        cid: cid of file
        publicKey: your public key
        signedMessage: message signed by owner of public key
        directaccessMode: to be set false in case you try to access file using access conditions.
  */
  const key = await lighthouse.fetchEncryptionKey(
    cid,
    publicKey,
    signedMessage,
    false
  );
  console.log(key);
}

accessControl()
```