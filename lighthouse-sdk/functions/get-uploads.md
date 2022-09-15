# Get Uploads



Returns cid and filecost of all uploads by a publicKey

```javascript
/**
 * @param {string} publicKey wallet's public key
 * @return [object] array of file object
*/
const lighthouse = require('@lighthouse-web3/sdk');
const uploads = await lighthouse.getUploads('0x487fc2fE07c593EAb555729c3DD6dF85020B5160');

/* Returns: wallet object
  [
    {
      cid: String,
      fileSizeInBytes: Number,
      fileCost: BigNumber,
      fileName: String,
      status: String,
      txHash: String,
      fileSize: BigNumber,
      createdAt: Number,
      lastUpdate: Number,
      id: String,
      network: String
    }
  ]
*/
```
