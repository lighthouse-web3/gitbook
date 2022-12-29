# 🔑 Apply Access Control

Pushing file to lighthouse node with encryption using nodejs.

```javascript
const ethers = require("ethers");
const lighthouse = require('@lighthouse-web3/sdk');

const signAuthMessage = async(publicKey, privateKey) =>{
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
  const signedMessage = await signer.signMessage(messageRequested);
  return(signedMessage)
}

const accessControl = async() =>{
  try{
    const cid = "Qma7Na9sEdeM6aQeu6bUFW54HktNnW2k8g226VunXBhrn7";
    const publicKey = "0xa3c960b3ba29367ecbcaf1430452c6cd7516f588";
    const privateKey = "0x6aa0ee41fa9cf65f90c06e5db8fa2834399b59b37974b21f2e405955630d472a";
    
    // Conditions to add
    const conditions = [
      {
        id: 1,
        chain: "Optimism",
        method: "getBlockNumber",
        standardContractType: "",
        returnValueTest: {
          comparator: ">=",
          value: "13349"
        },
      },
    ];

    const aggregator = "([1])";

    const signedMessage = await signAuthMessage(publicKey, privateKey);
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
          cid: 'Qma7Na9sEdeM6aQeu6bUFW54HktNnW2k8g226VunXBhrn7',
          status: 'Success'
        }
      }
    */
  } catch(error){
    console.log(error)
  }
}

const getfileEncryptionKey = async() => {
  try{
    // Get key back after passing access control condition
    const cid = "Qma7Na9sEdeM6aQeu6bUFW54HktNnW2k8g226VunXBhrn7";
    const publicKey = "0x969e19A952A9aeF004e4F711eE481D72A59470B1";
    const privateKey = process.env.PRIVATE_KEY_WALLET2;

    const signedMessage = await signAuthMessage(publicKey, privateKey);
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
    /*
      {
        data: {
          key: '18475nf54a37294f538t4c83ba67e0c5e11fds0fcaa2507cg8539aaff79c5d82'
        }
      }
    */
  } catch(error){
    console.log(error)
  }
}

accessControl()
```
