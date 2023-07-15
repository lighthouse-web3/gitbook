---
description: Pushing files to IPFS and Filecoin using Lighthouse in NodeJS.
---
# ⬆ NodeJS Upload

**Step 1:** **Create a new Node.js application and initialize it:**&#x20;

* Open your terminal or command prompt.
* Navigate to the desired directory where you want to create the application.
* Run the following command to create a new Node.js application

```shell
cd lighthouse-api-app
npm init -y
```


**Step 2:** **Install the required dependencies:**&#x20;
```shell
npm install dotenv @lighthouse-web3/sdk
```

**Step 3:** **Import the necessary dependencies and configure the environment variables in your Node.js application:**&#x20;

```javascript
import * as dotenv from 'dotenv';
dotenv.config();
import lighthouse from '@lighthouse-web3/sdk';

const uploadFile = async () => {
  const path = "C:/Users/.../test"; // Provide the path to the file
  const apiKey = process.env.API_KEY; 
  // Generate the API key from https://files.lighthouse.storage/ 
  //or using CLI (lighthouse-web3 api-key --new)

  // Both files and folders are supported by the upload function
  const response = await lighthouse.upload(path, apiKey);

  /*
    Expected response:
    {
      data: {
        Name: 'test',
        Hash: 'QmWC9AkGa6vSbR4yizoJrFMfmZh4XjZXxvRDknk2LdJffc',
        Size: '6198'
      }
    }
    Note: The Hash in the response is a CID.
  */

  console.log(response);
  console.log("Visit at: https://gateway.lighthouse.storage/ipfs/" + response.data.Hash);
}

uploadFile();
```

**Step 4:** **Customize the code:**&#x20;
* Update the path variable with the actual `path` to the file you want to upload.

**Step 5:** **Configure the API key:**&#x20;
* Create a .env file in your project's root directory.
* Add the following content to the .env file:
```makefile
API_KEY=YOUR_API_KEY
```
* Replace `YOUR_API_KEY` with your actual API key obtained from [Lighthouse API Key Node Application](https://docs.lighthouse.storage/lighthouse-1/lighthouse-sdk/code-examples/nodejs-backend/api-key) or using the [Lighthouse CLI command](https://docs.lighthouse.storage/lighthouse-1/cli-tool/cli-commands/api-key) `lighthouse-web3 api-key --new`.

**Step 6:** **Run the Node.js application to upload the file:**&#x20;
* In the terminal, while in the `lighthouse-upload-app` directory, run the following command:
```shell
node app.js
```

* The response from the upload process will be displayed in the console, including the file's name, hash (CID), and size.
* The console will also provide a link to access the uploaded file on the Lighthouse IPFS gateway.

**Note:** 
1. Ensure that you have a valid API key and the file path is correctly set before running the application.
2.  With this code, you can push files to IPFS and Filecoin using Lighthouse in your Node.js application.