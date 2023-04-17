# Share File

Share access to a encrypted file

```javascript
// Some code
/*
 * @param {string} publicKeyOfOwner the owner's public key.
 * @param {array}  [publicKeyUserB] list of public key of uset to share.
 * @param {string} cid of which access will be granted.
 * @param {string} fileEncryptionKey key used to encrypt file.
 * @param {string} signedMessage signature for auth at encryption node.
 * @return {object}
*/

// Note: you can also share to solana address
import lighthouse from '@lighthouse-web3/sdk'
const response = await lighthouse.shareFile(
    publicKeyOfOwner,
    [publicKeyUserB],
    cid,
    signedMessage
);

/*
Response: 
 {
   data: {
     shareTo: [ '0x487fc2fE07c593EAb555729c3DD6dF85020B5160' ],
     cid: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
     status: 'Success'
   }
 }
*/
```
