# 🔐 NodeJS Decrypt File

Fetch file from lighthouse node and decrypt using node.js&#x20;

```javascript
// Decrypt file nodejs
const {ethers} = require("ethers");
const fs = require("fs");
const lighthouse = require('@lighthouse-web3/sdk');

const sign_auth_message = async(publicKey, privateKey) =>{
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message
  const signedMessage = await signer.signMessage(messageRequested);
  return(signedMessage)
}

const decrypt = async() =>{
  const publicKey = "0xa3c960b3ba29367ecbcaf1430452c6cd7516f588";
  const cid = "QmbGN1YcBM25s6Ry9V2iMMsBpDEAPzWRiYQQwCTx7PPXRZ";

  // Get file encryption key
  const signed_message = await sign_auth_message(publicKey, "0x6aa0ee41fa9cf65f90c06e5db8fa2834399b59b37974b21f2e405955630d472a");
  const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
    cid,
    publicKey,
    signed_message
  );

  // Decrypt File
  const decrypted = await lighthouse.decryptFile(
    cid,
    fileEncryptionKey
  );

  // Save File
  fs.createWriteStream("flow.png").write(Buffer.from(decrypted))  
}

decrypt()
```
