---
description: >-
  CAR file can be created and get all deal-making information using the
  data-depot service, as shown in the example below.
---

# 📁 Create Car File

**Step 1:** **Create a new Node.js application and initialize it:**

* Open your terminal or command prompt.
* Navigate to the desired directory where you want to create the application.
* Run the following command to create a new Node.js application

```shell
cd lighthouse-create-car-app
npm init -y
```

**Step 2:** **Install the required dependencies:**

```shell
npm install @lighthouse-web3/sdk
```

**Step 3:** **Import the necessary dependencies and configure the environment variables in your Node.js application:**

```javascript
import lighthouse from '@lighthouse-web3/sdk';

const generateCAR = async () => {
  const path = "path/to/your/directory/lighthouse-create-car-app"; // Provide the path to the file
  const apiKey = "YOUR_API_KEY";

  // Get an auth token for the data depot service
  // Note: you can use this token multiple times; it expires in 20 days
  const authToken = await lighthouse.dataDepotAuth(apiKey);
  // Create CAR
  const response = await lighthouse.createCar(path, authToken.data.access_token);

  console.log(response);
  /*
    Expected Response:
    { data: 'Uploaded the files successfully' }
  */
}

generateCAR();
```

**Step 4:** **Customize the code:**

* Replace `"path/to/your/directory/lighthouse-create-car-app"` with the actual path to the file you want to create a CAR from.
* Replace `YOUR_API_KEY` with your actual API key obtained from [Lighthouse API Key Node Application](https://docs.lighthouse.storage/lighthouse-1/lighthouse-sdk/code-examples/nodejs-backend/api-key) or using the [Lighthouse CLI command](https://docs.lighthouse.storage/lighthouse-1/cli-tool/cli-commands/api-key) `lighthouse-web3 api-key --new`.

**Step 5:** **Run the Node.js application to upload the file:**

* In the terminal, while in the `lighthouse-create-car-app` directory, run the following command:

```shell
node app.js
```

* The response from the CAR creation process will be displayed in the console.

**Step 6:** **Retrieve deal-making information:**

* To view all the files and retrieve deal-making information, use the `viewCarFiles` function provided by the `@lighthouse-web3/sdk` package. Here's an example of how to use it:

```javascript
const viewFiles = async () => {
  const pageNo = "1";
  const authToken = "AUTH_TOKEN";

  const files = await lighthouse.viewCarFiles(pageNo, authToken);
  console.log(files);
}
```

* Replace `pageNo` with the desired page number (e.g., "1") and `AUTH_TOKEN` with the authentication token obtained from the data depot service.

**Note:** Ensure that you have the correct file path, API key, and necessary configurations set before running the application.

With this code, you can create a CAR file and retrieve deal-making information using Node.js.
