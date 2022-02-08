# Deploy



Used to deploy a file to Lighthouse. Use this function after the Get Quote function to get fee details and prepare file to be sent.&#x20;

CID returned by quote function needs to be sent here.

```javascript
/**
 * @param {string} path path to file.
 * @param {object} signer a signer used to execute transaction.
 * @param {string} cid cid to push on network.
 * @param {boolean} cli if using cli tool to deploy file.
 * @param {string} chain blockchain network to use [polygon, fantom, binance] default: polygon.
 * @param {string} network [mainnet, testnet] default: testnet.
 * @return {object} containing storage transaction details.
 */

const lighthouse = require('lighthouse-web3');
const deploy = await lighthouse.deploy('/home/cosmos/Desktop/wow.jpg', signer, false, "fantom", "testnet"); // path, signer, cid, cli, chain, network

/* Returns:
    {
      cid: ['...'], //cid of file
      txObj: { // tx details
        ...
      }
    }
*/
```
