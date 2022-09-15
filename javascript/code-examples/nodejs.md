# ⬆ NodeJS Upload

Pushing file to lighthouse node using nodejs.

```javascript
const lighthouse = require('@lighthouse-web3/sdk');

const deploy = async() =>{
  const path = "/mnt/c/Users/cosmos/Desktop/projects/testing/status.js"; //Give absolute path
  const apiKey = process.env.API_KEY; //generate from https://files.lighthouse.storage/ or cli (lighthouse-web3 api-key --new)

  const response = await lighthouse.deploy(path, apiKey);
  
  // Display response
  console.log(response);
  /*
    output:
      {
        Hash: "QmYjsW76L3UQLXZzYdKyg1p9Qoof6HVo1BPCbS1SSDQoDX",
        Name: "testImage1.svg",
        Size: 15370
      }
    Note: Hash in response is CID.
  */
}

deploy()
```
