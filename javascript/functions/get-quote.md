# Get Quote



Get a quote for the file to be uploaded and prepare it to be pushed to the Lighthouse. Run it before the deploy function to confirm the fee to upload a file and pass the returned CID to the deploy function

```javascript
/**
    * @param {string} path path to file.
    * @param {string} publicKey wallet's public key.
    * @param {string} chain blockchain network to use [polygon, fantom, binance] default: polygon.
    * @param {string} network [mainnet, testnet] default: testnet.
    * @return {object} containing quote details.
*/

const lighthouse = require('lighthouse-web3');
const quote = await lighthouse.get_quote('/home/cosmos/Desktop/wow.jpg', '0x1Ec09D4B3Cb565b7CCe2eEAf71CC90c9b46c5c26')

/* Returns: Example
    {
      meta_data: [
        {
          file_size: 15184,
          mime_type: 'image/svg+xml',
          file_name: 'motoko.svg',
          cid: 'bafkreiefxy4xbf34rivlekencrtucworpv5jgnyrmkcpniclgjwk5m4jla',
          cost: 0.00003131709844931087
        }
      ],
      gasFee: 98615,
      current_balance: BigNumber { _hex: '0x0114adbf8b71926f9b', _isBigNumber: true },
      total_size: 15184,
      total_cost: 0.00003131709844931087
    }
*/
```
