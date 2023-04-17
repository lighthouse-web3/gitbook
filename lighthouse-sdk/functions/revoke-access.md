# Revoke Access

Revoke access for an encrypted file

```javascript
/*
 * @param {string} publicKeyOfOwner the owner's public key.
 * @param {string} [revokeTo] address to be revoked.
 * @param {string} cid on which access to be revoked.
 * @param {string} signedMessage signature for auth at encryption node.
 * @return {object}
*/

// Note: you can also share to solana address
import lighthouse from '@lighthouse-web3/sdk'
const response = await lighthouse.shareFile(
    publicKeyOfOwner,
    [revokeTo],
    cid,
    signedMessage
);

/*
Response: 
 {
   data: {
     cid: 'Qma7Na9sEdeM6aQeu6bUFW54HktNnW2k8g226VunXBhrn7',
     revokeTo: ['0x487fc2fE07c593EAb555729c3DD6dF85020B5160'],
     status: 'Success'
   }
 }
*/
```
