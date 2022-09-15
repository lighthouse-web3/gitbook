# 🔐 NodeJS Encryption

Pushing file to lighthouse node with encryption using nodejs.

```javascript
const { ethers } = require("ethers");
const lighthouse = require('@lighthouse-web3/sdk');

const sign_auth_message = async(publicKey, privateKey) =>{
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
  const signedMessage = await signer.signMessage(messageRequested);
  return(signedMessage)
}

const deployEncrypted = async() =>{
  const path = "/mnt/c/Users/ravis/Pictures/Screenshots/flow1.png";	//Give absolute path
  const apiKey = "74de897c-f98f-486d-aaeb-809c31b2c0qf";
  const publicKey = "0xa3c960b3ba29367ecbcaf1430452c6cd7516f588";
  const privateKey = "0x6aa0ee41fa9cf65f90c06e5db8fa2834399b59b37974b21f2e405955630d452a";
  const signed_message = await sign_auth_message(publicKey, privateKey);

  const response = await lighthouse.uploadEncrypted(
    path,
    apiKey,
    publicKey,
    signed_message
  );
  // Display response
  console.log(response);
  /*
    {
      Name: 'flow1.png',
      Hash: 'QmQqfuFH77vsau5xpVHUfJ6mJQgiG8kDmR62rF98iSPRes',
      Size: '31735'
    }
    Note: Hash in response is CID.
  */
}

deployEncrypted()
```
