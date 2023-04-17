# 🔐 NodeJS Decrypt File

Fetch the file from lighthouse node and decrypt using node.js

```javascript
// Decrypt file nodejs
import fs from "fs"
import {ethers} from "ethers"
import lighthouse from '@lighthouse-web3/sdk'

const signAuthMessage = async(publicKey, privateKey) =>{
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
  const signedMessage = await signAuthMessage(publicKey, privateKey);
  const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
    cid,
    publicKey,
    signedMessage
  );

  // Decrypt File
  const decrypted = await lighthouse.decryptFile(
    cid,
    fileEncryptionKey.data.key
  );

  // Save File
  fs.createWriteStream("fileName.png").write(Buffer.from(decrypted))  
}

decrypt()
```
