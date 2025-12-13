# Add CID




Add your CID to Lighthouse node

```javascript
/** 
 * @param {string} fileName name of the file.
 * @param {string} cid ipfs hash of the file.
 * @return {string} queued message if success
*/
const lighthouse = require('@lighthouse-web3/sdk');
const response = await lighthouse.addCid("adiyogi.jpg", "bafkreia4ruswe7ghckleh3lmpujo5asrnd7hrtu5r23zjk2robpcoend34");

/* Returns: "Added To Queue" if successful else null */
```
