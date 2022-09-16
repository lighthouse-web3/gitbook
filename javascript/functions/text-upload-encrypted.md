# Text Upload

Upload a text string to IPFS with encryption.

Note: this function only supported for NodeJS at the moment.

```javascript
/** 
 * @param {string} text to upload 
 * @param {string} apiKey your api key.
 * @param {string} publicKey wallet's public key.
 * @param {string} signedMessage message signed by owner of publicKey.
 * @return {object} containing details of file uploaded.
*/

const lighthouse = require('@lighthouse-web3/sdk');
const response = await lighthouse.textUploadEncrypted(
  "This is a string",
  process.env.API_KEY,
  "0xa3c960b3ba29367ecbcaf1430452c6cd7516f588",
  "0x16b15f88b....7edf3adf6735a86fc3741f5231b"
)
/* Returns:
  {
    data: {
      Name: 'QmXWdmnTETPCg6vEJHXzoYRF4KiQWkjJz1um7XCkpw1zpZ',
      Hash: 'QmXWdmnTETPCg6vEJHXzoYRF4KiQWkjJz1um7XCkpw1zpZ',
      Size: '68'
    }
  }
*/
```
