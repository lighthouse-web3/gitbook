# Revoke Access

Revoke access for a encrypted file

```javascript
/*
 * @param {string} publicKeyOfOwner the owner's public key.
 * @param {string} revokeTo address to be revoked.
 * @param {string} cid on which access to be revoked.
 * @param {string} signedMessage signature for auth at encryption node.
 * @return {object}
*/

// Note: you can also share to solana address
const lighthouse = require('@lighthouse-web3/sdk');
const response = await lighthouse.shareFile(
    publicKeyOfOwner,
    revokeTo,
    cid,
    signedMessage
);

/*
Response: 
 {
   data: {
     cid: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
     revokeTo: '0x487fc2fE07c593EAb555729c3DD6dF85020B5160'
   }
 }
*/
```
