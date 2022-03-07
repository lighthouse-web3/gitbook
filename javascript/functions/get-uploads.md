# Get Uploads



Returns cid and filecost of all uploads by a publicKey

```javascript
/**
 * @param {string} publicKey wallet's public key
 * @param {string} network polygon, fantom, binance default: polygon. Note testnet not supported in this method.
*/
const lighthouse = require('lighthouse-web3');
const uploads = await lighthouse.getUploads('0x487fc2fE07c593EAb555729c3DD6dF85020B5160', "fantom");

/* Returns: wallet object
  [
    {
      cid: String,
      config: String,
      fileCost: BigNumber,
      fileName: String,
      fileSize: BigNumber,
      timestamp: BigNumber
    }
  ]
*/
```
