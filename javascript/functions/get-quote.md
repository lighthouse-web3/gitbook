# Get Quote



Get a quote for the file to be uploaded and prepare it to be pushed to the Lighthouse. Run it before the deploy function to confirm the fee to upload a file and pass the returned CID to the&#x20;

```javascript
/**
    * @param {string} path path to file.
    * @param {string} publicKey wallet's public key.
    * @return {object} containing quote details.
*/

const lighthouse = require('lighthouse-web3');
const quote = await lighthouse.get_quote('/home/cosmos/Desktop/wow.jpg', '0x1Ec09D4B3Cb565b7CCe2eEAf71CC90c9b46c5c26')

/* Returns: Example
    {
      cost: 0.0005880506906630162,
      current_balance: '242235976400000000',
      gasFee: 98593,
      file_size: 239214,
      mime_type: 'image/jpeg',
      file_name: 'adiyogi.jpg',
      ipfs_hash: 'bafkreia4ruswe7ghckleh3lmpujo5asrnd7hrtu5r23zjk2robpcoend34'
    } 
*/
```
