---
description: >-
  Files can be fetched from Lighthouse node and decrypt using NodeJS, similar to
  the example given below.
---

# 💻 NodeJS Decrypt File

<details>

<summary>Project Setup</summary>

**Step 1:** **Create a new Node.js application and initialize it:**

* Open your terminal or command prompt.
* Navigate to the desired directory where you want to create the application.
* Run the following command to create a new Node.js application

```shell
cd lighthouse-upload-app
npm init -y
```

**Step 2:** **Install the required dependencies:**

```shell
npm install fs ethers @lighthouse-web3/sdk
```

**Step 3:** **Import the necessary dependencies and configure the environment variables in your Node.js application:**

_Note: In this example, we are using ES6 so we have to save the file as `filename.mjs` or define `"type": "module",` in the `package.json` file._



</details>

```javascript
import * as dotenv from 'dotenv'
dotenv.config()
import fs from "fs"
import { ethers } from "ethers"
import lighthouse from '@lighthouse-web3/sdk'

const signAuthMessage = async (publicKey, privateKey) => {
  const provider = new ethers.JsonRpcProvider()
  const signer = new ethers.Wallet(privateKey, provider)
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message
  const signedMessage = await signer.signMessage(messageRequested)
  return signedMessage
}

const decrypt = async () => {
  const cid = "YOUR_CID" //Example: 'QmbGN1YcBM25s6Ry9V2iMMsBpDEAPzWRiYQQwCTx7PPXRZ'
  const publicKey = "YOUR_PUBLIC_KEY" //Example: '0xa3c960b3ba29367ecbcaf1430452c6cd7516f588'
  const privateKey = process.env.PRIVATE_KEY

  // Get file encryption key
  const signedMessage = await signAuthMessage(publicKey, privateKey)
  const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
    cid,
    publicKey,
    signedMessage
  )

  // Decrypt File
  const decrypted = await lighthouse.decryptFile(
    cid,
    fileEncryptionKey.data.key
  )

  // Save File
  fs.createWriteStream("fileName.png").write(Buffer.from(decrypted))
}

decrypt()
```

**Step 4:** **Customize the code:**

* Replace `YOUR_CID` with the actual CID of the file you want to decrypt.
* Replace `YOUR_PUBLIC_KEY` with your own public key.
* Ensure you have the corresponding private key stored in the `PRIVATE_KEY` environment variable.

**Step 5:** **Configure the Private Key:**

* Create a .env file in your project's root directory.
* Add the following content to the .env file:

```makefile
PRIVATE_KEY=YOUR_PRIVATE_KEY
```

* Replace `YOUR_PRIVATE_KEY` with your own private key corresponding to the public key used in the code (Can be obtained from the wallet.json file made while [creating a wallet](https://docs.lighthouse.storage/lighthouse-1/cli-tool/cli-commands/create-wallet)).

**Step 6:** **Run the Node.js application to upload the file:**

* In the terminal, while in the `lighthouse-decrypt-app` directory, run the following command:

```shell
node app.js
```

* The decrypted file will be saved as fileName.png in the current directory.

**Note:** Ensure that you have the correct CID, private key, and necessary configurations set before running the application.

With this code, you can fetch a file from the Lighthouse node and decrypt it using Node.js.
