# ⬆ Text Upload

Upload string to IPFS and Filecoin using Lighthouse in Node.JS.

```javascript
require("dotenv").config();

const lighthouse = require('@lighthouse-web3/sdk');

const uploadText = async() =>{
  const apiKey = "3bc2a852-3qa1-46e8-9cfg-3f42150d2448";
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
  console.log("Visit at: https://ipfs.io/ipfs/" + response.Hash);
}

uploadText()
```
