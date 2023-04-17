# Upload Encrypted

Deploy file with encryption enabled

```javascript
/*
 * @param {string} path path to file.
 * @param {string} apiKey your api key.
 * @param {publicKey} publicKey of user.
 * @param {signedMessage} signed message for auth at ecnryption nodes.
 * @return {object} containing details of file uploaded.
*/

import lighthouse from '@lighthouse-web3/sdk'
const response = await lighthouse.uploadEncrypted(
  '/home/cosmos/Desktop/wow.jpg',
  process.env.apiKey,
  "0xa3c960b3ba29367ecbcaf1430452c6cd7516f588",
  "0xbfdd117......317467897341b"
);

/* Returns:
    {
      data: {
        Name: 'flow1.png',
        Hash: 'QmbGN1YcBM25s6Ry9V2iMMsBpDEAPzWRiYQQwCTx7PPXRZ',
        Size: '31735'
      }
    }
*/
```
