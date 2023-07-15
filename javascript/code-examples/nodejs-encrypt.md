---
description: Files can be pushed to Lighthouse node with encryption using NodeJS, similar to the example given below.
---
# 🔐 NodeJS Encryption

**Step 1:** **Create a new Node.js application and initialize it:**&#x20;

* Open your terminal or command prompt.
* Navigate to the desired directory where you want to create the application.
* Run the following command to create a new Node.js application

```shell
cd lighthouse-upload-app
npm init -y
```

**Step 2:** **Install the required dependencies:**&#x20;
```shell
npm install dotenv ethers @lighthouse-web3/sdk
```

**Step 3:** **Import the necessary dependencies and configure the environment variables in your Node.js application:**&#x20;


```javascript
import * as dotenv from 'dotenv';
dotenv.config();
import { ethers } from "ethers";
import lighthouse from '@lighthouse-web3/sdk';

const signAuthMessage = async (publicKey, privateKey) => {
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
  const signedMessage = await signer.signMessage(messageRequested);
  return signedMessage;
}

const deployEncrypted = async () => {
  const path = "/mnt/c/Users/ravis/Pictures/Screenshots/flow1.png"; // Provide the absolute path to the file
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
    response:
    {
      data: {
        Name: 'flow1.png',
        Hash: 'QmQqfuFH77vsau5xpVHUfJ6mJQgiG8kDmR62rF98iSPRes',
        Size: '31735'
      }
    }
    Note: The Hash in the response is a CID.
  */
}

deployEncrypted();
```

**Step 4:** **Customize the code:**&#x20;
* Update the `path` variable with the actual absolute path to the file you want to upload.
* Replace `0xa3c960b3ba29367ecbcaf1430452c6cd7516f588` with your own public key.
* Ensure you have the corresponding private key stored in the `PRIVATE_KEY` environment variable.


**Step 5:** **Configure the API key and the Private Key:**&#x20;
* Create a .env file in your project's root directory.
* Add the following content to the .env file:
```makefile
API_KEY=YOUR_API_KEY
PRIVATE_KEY=YOUR_PRIVATE_KEY
```

* Replace `YOUR_API_KEY` with your actual API key obtained from [Lighthouse API Key Node Application](https://docs.lighthouse.storage/lighthouse-1/lighthouse-sdk/code-examples/nodejs-backend/api-key) or using the [Lighthouse CLI command](https://docs.lighthouse.storage/lighthouse-1/cli-tool/cli-commands/api-key) `lighthouse-web3 api-key --new`.
* Replace `YOUR_PRIVATE_KEY` with your own private key corresponding to the public key used in the code (Can be obtained from the wallet.json file made while [creating a wallet](https://docs.lighthouse.storage/lighthouse-1/cli-tool/cli-commands/create-wallet)). 

**Step 6:** **Run the Node.js application to upload the file:**&#x20;
* In the terminal, while in the `lighthouse-encryption-app` directory, run the following command:
```shell
node app.js
```
* The response from the upload process will be displayed in the console, including the file's name, hash (CID), and size.

**Note:** Ensure that you have a valid API key, the necessary configurations are set, and you have the correct file path before running the application.