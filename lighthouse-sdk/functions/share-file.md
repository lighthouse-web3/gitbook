---
description: >-
  Sometimes, you may have an encrypted file stored on the InterPlanetary File
  System (IPFS) and wish to share access to it with someone else. Lighthouse
  provides a straightforward method for this. Let's
---

# Share File

### 1. Why Share Encrypted Files?

**Security** is the main reason. Encrypting a file ensures only authorized users can access its contents. Sharing access provides specific users the ability to decrypt and view the file, while others remain locked out.

### 2. Function Overview

Here's a breakdown of the function you'd be using:

```js
/**
 * Use this function to share access to an encrypted file on IPFS.
 * 
 * @param {string} publicKeyOfOwner - The file owner's public key.
 * @param {array}  [publicKeyUserB] - List of public keys of users to share access with.
 * @param {string} cid - The ID of the file you want to share.
 * @param {string} fileEncryptionKey - The key originally used to encrypt the file.
 * @param {string} signedMessage - A message signed by the owner for authentication.
 * 
 * @return {object} - Details of the sharing operation.
 */
```

### 3. Example Code

Here's a ready-to-use code template. You only need to replace the placeholders with your actual data:

```javascript
import lighthouse from '@lighthouse-web3/sdk';

const ownerPublicKey = "OWNER_PUBLIC_KEY_HERE";
const usersPublicKeys = ["USER_PUBLIC_KEY_HERE"];
const fileCID = "FILE_CID_HERE";
const encryptionKey = "FILE_ENCRYPTION_KEY_HERE";
const ownerSignedMessage = "OWNER_SIGNED_MESSAGE_HERE";

const response = await lighthouse.shareFile(ownerPublicKey, usersPublicKeys, fileCID, encryptionKey, ownerSignedMessage);

console.log(response);
```

Executing the function will produce a response like:

```js
{
   data: {
     shareTo: ['PUBLIC_KEY_OF_SHARED_USER'],
     cid: 'FILE_CID_HERE',
     status: 'Success'
   }
}
```

**Pro Tip**: Lighthouse also supports sharing to Solana addresses!
