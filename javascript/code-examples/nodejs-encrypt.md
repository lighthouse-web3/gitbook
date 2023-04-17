# 🔐 NodeJS Encryption

Pushing file to lighthouse node with encryption using nodejs.

```javascript
import * as dotenv from 'dotenv'
dotenv.config()
import {ethers} from "ethers"
import lighthouse from '@lighthouse-web3/sdk'

const signAuthMessage = async(publicKey, privateKey) =>{
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
  const signedMessage = await signer.signMessage(messageRequested);
  return(signedMessage)
}

const deployEncrypted = async() =>{
  const path = "/mnt/c/Users/ravis/Pictures/Screenshots/flow1.png";	//Give absolute path
  const apiKey = process.env.API_KEY;
  const publicKey = "0xa3c960b3ba29367ecbcaf1430452c6cd7516f588";
  const privateKey = process.env.PRIVATE_KEY;
  const signedMessage = await signAuthMessage(publicKey, privateKey);

  const response = await lighthouse.uploadEncrypted(
    path,
    apiKey,
    publicKey,
    signedMessage
  );
  // Display response
  console.log(response);
  /*
    data: {
      Name: 'flow1.png',
      Hash: 'QmQqfuFH77vsau5xpVHUfJ6mJQgiG8kDmR62rF98iSPRes',
      Size: '31735'
    }
    Note: Hash in response is CID.
  */
}

deployEncrypted()
```
