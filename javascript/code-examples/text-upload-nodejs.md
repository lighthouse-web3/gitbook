# ⬆ Text Upload

Upload string to IPFS and Filecoin using Lighthouse in Node.JS.

```javascript
require("dotenv").config();

const lighthouse = require('@lighthouse-web3/sdk');

const uploadText = async() =>{
  const apiKey = process.env.API_KEY; //generate from https://files.lighthouse.storage/ or cli (lighthouse-web3 api-key --new)
  const response = await lighthouse.uploadText(
    "This is a string",
    apiKey
  );
  
  // Display response
  console.log(response);
  /*
  {
    data: {
      Name: 'Qmbz13iSeUU1y1z4JGcLNSBH1bFveWzpyTk1drZ6iKSVvd',
      Hash: 'Qmbz13iSeUU1y1z4JGcLNSBH1bFveWzpyTk1drZ6iKSVvd',
      Size: '24'
    }
  }
  */
  console.log("Visit at: https://gateway.lighthouse.storage/ipfs/" + response.Hash);
}

uploadText()
```
