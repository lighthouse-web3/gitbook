# Get Balance

This method returns the current balance of your wallet. Your wallet needs to have Matic/FTM/BSC/Optimism ETH or other chain tokens to store your files on Lighthouse

```javascript
/** 
 * @param {string} publicKey wallet's public key.
 * @return {object} balance of the wallet in ether
*/
const lighthouse = require('@lighthouse-web3/sdk');
const balance = await lighthouse.getBalance('0xA3C960B3BA29367ecBCAf1430452C6cd7516F588');

/* Returns: data used and data limit
    { 
      dataLimit: 1073741824,
      dataUsed: 0 
    }
*/
```
