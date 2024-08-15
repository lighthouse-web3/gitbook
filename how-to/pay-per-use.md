---
description: >-
  Lighthouse offers a pay-per-use functionality for users who prefer a flexible
  and consumption-based approach to uploading data to Filecoin.
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# 💸 Pay per use

## ⚠️Currently Under Maintenance⚠️

Lighthouse offers a pay-per-use functionality for users who prefer a flexible and consumption-based approach to uploading data to Filecoin.

In the traditional method, users could access Lighthouse's upload services by generating an API key as detailed in the Quick Start section. This key allowed users to purchase data plans, enabling them to increase their upload data capacity as needed.

With the pay-per-use functionality, users can upload data without the need for API key generation and purchasing predefined data cap plans. Instead, they have to pay based on their actual usage.

The pay-per-use model can be divided into the following steps -

1. Fetching Price
2. Making Payment
3. Generating Auth Token
4. Uploading Data

### Fetch Price

To obtain the cost of uploading a file in the selected token, utilize the following function:

```javascript
lighthouse.getPrice(filePathOrSize, network, token)
/*
filePathOrSize : file path in strings or file size in bytes.
network : “filecoin” or “calibration”
token : “native” or “usdc” or (usdt for calibration)
*/
```

For instance, to get the price for uploading a 1 kb file in the native token (FIL) of filecoin network -

```javascript
let price = await lighthouse.getPrice(1024, "filecoin", "native")
```

The returned value is in the smallest denomination of the specified token (e.g., attoFIL for native filecoin token).

### Making Payment

After obtaining the upload cost, users can proceed to make the payment for file upload:

```javascript
lighthouse.fund(price, network, token, privateKey)
/*
price : upload cost of a file in smallest denomination
network : “filecoin” or “calibration”
token : “native” or “usdc” or (usdt for calibration)
privateKey: private key of the account to transfer from(skip for browser app)
*/
```

For instance, to make a payment of 1 USDC on filecoin main network using an account’s private key for uploading a file, execute

```javascript
const tx = await lighthouse.fund(100000, "filecoin", "usdc", "YOUR_PRIVATE_KEY")
```

Note: For USDC, the execution time may be longer due to the requirement of an ERC20 token approval transaction followed by a transfer transaction.

Note: For calibration net, the user can get up to 100MB of free data cap for testing out the service. Recharge beyond that won't work.

### Generating Auth Token

To authenticate that the user who made the payment is only authorized to upload the file, generate a one-time auth token:

```javascript
const authToken = await lighthouse.oneTimeAuth("YOUR_PRIVATE_KEY")
```

The auth token expires once used for uploading a file. It looks like this:

```
0xA3C960B3BA29367ecBCAf1430452C6cd7516F588$0x38a7b0097a5ad7b262b2c128967a9922b61027e812fba36d966936abdd5295b27c57be0af3a251cef5fbdcf92c22b338f296f02990d9c19160cf342b7fa2e8ab1b
```

### Upload Data

The final step involves uploading the file using the generated auth token:

```javascript
const response = await lighthouse.upload(filePath, authToken)
```

Upon successful upload, the response includes essential information about the uploaded file:

```
{
  data: {
    Name: 'image.png',
    Hash: 'QmXnudxxXwaBRYVzy5Q9fFtqPsCgoqxLLBY6VYFfcQXRTw',
    Size: '7123'
  }
}
```

The uploaded file can be accessed from the IPFS gateway:

https://gateway.lighthouse.storage/ipfs/QmXnudxxXwaBRYVzy5Q9fFtqPsCgoqxLLBY6VYFfcQXRTw

The complete code for uploading a file using Lighthouse’s pay-per-use functionality -

```javascript
const lighthouse = require("@lighthouse-web3/sdk");
require("dotenv/config");

const fileUpload = async () => {
  const filePath =
    "/Users/parv/Desktop/Lighthouse/Lighthouse-sdk-usage/image3.png";

  const network = "calibration";
  const token = "native";
  const privateKey = process.env.PRIVATE_KEY;

  // Fetching Price
  const price = await lighthouse.getPrice(filePath, network, token);
  console.log(price);

  // Making Payment
  const tx = await lighthouse.fund(price, network, token, privateKey);
  console.log(tx);

  // Generating Auth Token
  const authToken = await lighthouse.oneTimeAuth(privateKey);
  console.log(authToken);

  // Uploading File
  const response = await lighthouse.upload(filePath, authToken);
  console.log(response);
  console.log(`View file -> https://gateway.lighthouse.storage/ipfs/${response.data.Hash}`);

};

fileUpload();
```

This comprehensive guide enables users to seamlessly navigate the Lighthouse pay-per-use model and successfully upload files to Filecoin.
