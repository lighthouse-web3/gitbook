---
description: Upload a string to IPFS and Filecoin using Lighthouse in Node.js.
---

# ⬆ Text Upload

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
npm install dotenv @lighthouse-web3/sdk
```

**Step 3:** **Import the necessary dependencies and configure the environment variables in your Node.js application:**

_Note: In this example, we are using ES6 so we have to save the file as `filename.mjs` or define `"type": "module",` in the `package.json` file._

```javascript
import * as dotenv from 'dotenv'
dotenv.config()
import lighthouse from '@lighthouse-web3/sdk'

const uploadText = async () => {
  const apiKey = process.env.API_KEY; // Generate from https://files.lighthouse.storage/ or CLI (lighthouse-web3 api-key --new)
  
  const response = await lighthouse.uploadText(
    "This is a string",
    apiKey
  );
  
  // Display response
  console.log(response);
  console.log("Visit at: https://gateway.lighthouse.storage/ipfs/" + response.data.Hash);
}
uploadText();
```

**Expected Response:**

```bash
  {
    data: {
      Name: 'Qmbz13iSeUU1y1z4JGcLNSBH1bFveWzpyTk1drZ6iKSVvd',
      Hash: 'Qmbz13iSeUU1y1z4JGcLNSBH1bFveWzpyTk1drZ6iKSVvd',
      Size: '24'
    }
  }
```

**Step 4:** **Customize the code:**

* You can modify the string `"This is a string"` in the `uploadText` function to any desired string that you want to upload.

**Step 5:** **Configure the API key:**

* Create a .env file in your project's root directory.
* Add the following content to the .env file:

```makefile
API_KEY=YOUR_API_KEY
```

* Replace `YOUR_API_KEY` with your actual API key obtained from [Lighthouse API Key Node Application](https://docs.lighthouse.storage/lighthouse-1/lighthouse-sdk/code-examples/nodejs-backend/api-key) or using the [Lighthouse CLI command](https://docs.lighthouse.storage/lighthouse-1/cli-tool/cli-commands/api-key) `lighthouse-web3 api-key --new`.

**Step 6:** **Run the Node.js application to upload the file:**

* In the terminal, while in the `lighthouse-upload-app` directory, run the following command:

```shell
node app.js
```

* The response from the upload process will be displayed in the console, including the name, hash (CID), and size of the uploaded string.
* The console will also provide a link to access the uploaded string on the Lighthouse IPFS gateway.

**Note:** Ensure that you have a valid API key and the necessary configurations are set before running the application.
