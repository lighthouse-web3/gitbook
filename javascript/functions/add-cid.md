# Add CID




Add your CID to Lighthouse node

```javascript
/** 
 * @param {string} publicKey wallet's public key.
 * @return {object} balance of the wallet in ether
*/
const lighthouse = require('@lighthouse-web3/sdk');
const response = await lighthouse.addCid("adiyogi.jpg", "bafkreia4ruswe7ghckleh3lmpujo5asrnd7hrtu5r23zjk2robpcoend34");

/* Returns: "Added To Queue" if successful else null */
```
