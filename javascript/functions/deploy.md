# Deploy



Used to deploy a file to Lighthouse. Use this function after the Get Quote function to get fee details and prepare file to be sent.&#x20;

CID returned by quote function needs to be sent here.

```javascript
/**
 * @param {string} path path to file.
 * @param {string} apiKey your apiKey.
 * @param {string} publicKey wallet's public key.
 * @return {object} containing storage details.
 */

const lighthouse = require('lighthouse-web3');
const deploy = await lighthouse.deploy('/home/cosmos/Desktop/wow.jpg', publicKey, apiKey); // path, apiKey, publicKey

/* Returns:
    {
      Hash: "bafkreia4ruswe7ghckleh3lmpujo5asrnd7hrtu5r23zjk2robpcoend34", //cid of file
      Name: "cosmos",
      Size: 1234
    }
*/
```
