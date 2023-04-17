# Text Upload Encrypted

Upload a text string to IPFS with encryption

```javascript
/** 
 * @param {string} text to upload 
 * @param {string} apiKey your api key.
 * @param {string} publicKey wallet's public key.
 * @param {string} signedMessage message signed by owner of publicKey.
 * @return {object} containing details of file uploaded.
*/

import lighthouse from '@lighthouse-web3/sdk'
const response = await lighthouse.textUploadEncrypted(
  "This is a string",
  "YOUR_API_KEY",
  "0xa3c960b3ba29367ecbcaf1430452c6cd7516f588",
  "0x16b15f88bbd2e0a22d1d0084b8b7080f2003ea83eab1a00f80d8c18446c9c1b6224f17aa09eaf167717ca4f355bb6dc94356e037edf3adf6735a86fc3741f5231b"
)

/* Returns:
  {
    data: {
      Name: 'QmSRBDQ2KhzEzqmRSDppzAdEPDxmrhVrogggNv876eeLCC',
      Hash: 'QmSRBDQ2KhzEzqmRSDppzAdEPDxmrhVrogggNv876eeLCC',
      Size: '20'
    }
  }
*/
```
