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
  const cid = "QmbGN1YcBM25s6Ry9V2iMMsBpDEAPzWRiYQQwCTx7PPXRZ";
  const publicKey = "0xa3c960b3ba29367ecbcaf1430452c6cd7516f588";
  const privateKey = process.env.PRIVATE_KEY;

  // Get file encryption key
  const signed_message = await sign_auth_message(publicKey, privateKey);
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
  fs.createWriteStream("fileName.png").write(Buffer.from(decrypted))  
}

decrypt()
```
