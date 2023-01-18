# ⬆ NodeJS Upload

Pushing file to IPFS and Filecoin using Lighthouse in Node.JS.

```javascript
require("dotenv").config();

const lighthouse = require('@lighthouse-web3/sdk');

const deploy = async() =>{
  const path = "img-1.jpg"; //Give path to the file 
  const apiKey = process.env.API_KEY; //generate from https://files.lighthouse.storage/ or cli (lighthouse-web3 api-key --new)

  const response = await lighthouse.upload(path, apiKey);
  
  // Display response
  console.log(response);
  console.log("Visit at: https://ipfs.io/ipfs/" + response.Hash);
}

deploy()
```

The above code gives the following **output**

```
response output:
{
    Hash: "QmYjsW76L3UQLXZzYdKyg1p9Qoof6HVo1BPCbS1SSDQoDX",
    Name: "img-1",
    Size: 15370
}

Note: The Hash in above output is IPFS CID
```
