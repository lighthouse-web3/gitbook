# Get Balance



This method returns the current balance of your wallet. Your wallet needs to have Matic/FTM/BSC/Optimism ETH or other chain tokens to store your files on Lighthouse

```javascript
/** 
 * @param {string} publicKey wallet's public key.
 * @param {string} network polygon, fantom, binance-testnet default: polygon.
 * @return {object} balance of the wallet in ether
*/
const lighthouse = require('lighthouse-web3');
const balance = await lighthouse.getBalance('0x1Ec09D4B3Cb565b7CCe2eEAf71CC90c9b46c5c26', 'polygon');

/* Returns: data limit and data used by a user in GB
    {
        dataLimit: 1,
        dataUsed: 0
    }
*/
```
