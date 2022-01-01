# Get Balance



This method returns the current balance of your wallet. Your wallet needs to have Matic/ETH or other chains tokens to store your files on Lighthouse

```javascript
/** 
 * @param {string} publicKey wallet's public key.
 * @return {object} balance of the wallet key
*/
const lighthouse = require('lighthouse-web3');
const balance = await lighthouse.get_balance("0x1Ec09D4B3Cb565b7CCe2eEAf71CC90c9b46c5c26");

/* Returns: wallet balance in wei
    { data: 242235976400000000 } 
*/
```
