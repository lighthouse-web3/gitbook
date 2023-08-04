---
description: An API key can be generated similar to the example given below
---

# 🔑 Api Key

**Step 1:** **Create a new Node.js application and initialize it:**

* Open your terminal or command prompt.
* Navigate to the desired directory where you want to create the application.
* Run the following command to create a new Node.js application

```shell
cd lighthouse-api-app
npm init -y
```

**Step 2:** **Install the required dependencies:**

```shell
npm install @lighthouse-web3/sdk axios ethers
```

**Step 3:** **Import the required dependencies and define the necessary functions in your Node.js application:**

_Note: In this example, we are using ES6 so we have to save the file as `filename.mjs` or define `"type": "module",` in the `package.json` file._

```javascript
import lighthouse from '@lighthouse-web3/sdk'
import axios from 'axios'
import { ethers } from 'ethers'

const signAuthMessage = async(privateKey, messageRequested) =>{
  const signer = new ethers.Wallet(privateKey);
  const signedMessage = await signer.signMessage(messageRequested);
  return(signedMessage)
}

const getApiKey = async() =>{
  const wallet = {
    publicKey: 'YOUR_PUBLIC_KEY', //>> Example: '0xEaF4E24ffC1A2f53c07839a74966A6611b8Cb8A1'
    privateKey: 'WALLET_PRIVATE_KEY'
  }
  const verificationMessage = (
    await axios.get(
        `https://api.lighthouse.storage/api/auth/get_message?publicKey=${wallet.publicKey}`
    )
  ).data
  const signedMessage = await signAuthMessage(wallet.privateKey, verificationMessage)
  const response = await lighthouse.getApiKey(wallet.publicKey, signedMessage)
  console.log(response)
}

getApiKey()
```

**Expected Response:**

```bash
{ data: { apiKey: '7d8f3d18.eda91521aa294773a8201d2a7d241a2c' } } 
```

* Replace `'YOUR_PUBLIC_KEY'` with your wallet's public key.
* Replace `'WALLET_PRIVATE_KEY'` with your wallet's private key.

**Step 4:** **In the terminal, while in the lighthouse-api-app directory, run the following command:**

```shell
node app.js
```
