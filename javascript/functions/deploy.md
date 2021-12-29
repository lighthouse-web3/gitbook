# Deploy



Deploy file to the Lighthouse

```javascript
/**
 * @param {string} path path to file.
 * @param {string} privateKey wallet's private key used to execute transaction.
 * @param {string} cid cid to push on network.
 * @return {object} containing storage transaction details.
 */

const lighthouse = require('lighthouse-web3');
const deploy = await lighthouse.deploy('/home/cosmos/Desktop/wow.jpg', '0xd7f1e7ccf6e3620327d3b29c57018d076305148eec487c57d8121beac0067895', 'bafkreia4ruswe7ghckleh3lmpujo5asrnd7hrtu5r23zjk2robpcoend34'); // path, private_key, cid

/* Returns:
    {
      cid: '...', //cid of file
      providers: [
        '...'
      ],
      tx: { // tx details
        ...
      }
    }
*/
```
