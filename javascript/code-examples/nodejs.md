# ⬆ NodeJS Upload

Pushing files to IPFS and Filecoin using Lighthouse in NodeJS.

```javascript
import * as dotenv from 'dotenv'
dotenv.config()
import lighthouse from '@lighthouse-web3/sdk'

const uploadFile = async() =>{
  const path = "C:/Users/.../test"; // Give path to the file
  const apiKey = process.env.API_KEY; //generate from https://files.lighthouse.storage/ or cli (lighthouse-web3 api-key --new)
  // Both file and folder are supported by the upload function
  const response = await lighthouse.upload(path, apiKey);
  
  /*
      data: {
        Name: 'test',
        Hash: 'QmWC9AkGa6vSbR4yizoJrFMfmZh4XjZXxvRDknk2LdJffc',
        Size: '6198'
      }
      Note: Hash in response is CID.
  */
  console.log(response);
  console.log("Visit at: https://gateway.lighthouse.storage/ipfs/" + response.data.Hash);
}

uploadFile()
```
