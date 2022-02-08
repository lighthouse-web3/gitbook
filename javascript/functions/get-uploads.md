# Get Uploads



Returns cid and filecost of all uploads by a publicKey

```javascript
/**
 * @param {string} publicKey wallet's public key
 * @param {string} chain blockchain network to use [polygon, fantom, binance] default: polygon.
 * @param {string} network [mainnet, testnet] default: testnet.
*/
const lighthouse = require('lighthouse-web3');
const uploads = await lighthouse.get_uploads('0x487fc2fE07c593EAb555729c3DD6dF85020B5160', "fantom", "testnet");

/* Returns: wallet object
  [
    {
      cid: 'bafkreiefxy4xbf34rivlekencrtucworpv5jgnyrmkcpniclgjwk5m4jla',
      fileCost: 30164930835563
    }
  ]
*/
```
