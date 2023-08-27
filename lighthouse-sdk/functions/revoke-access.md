---
description: Securely retract permissions for shared encrypted files using Lighthouse.
---

# Revoke Access

## Revoke Access

In some cases, after sharing an encrypted file, you might need to revoke access for specific users. Maybe they no longer require the information, or perhaps there were changes in project roles. Whatever the reason, Lighthouse makes this process easy and intuitive. Let's dive in!

### 1. Why Revoke Access?

Just as it's crucial to **grant access**, it's equally important to **withdraw permissions** when necessary. This is all about ensuring that your sensitive information remains in the right hands.

### 2. Function Overview

Let's get a clear view of the function that lets you do this:

```js
/**
 * Use this function to revoke access to an encrypted file on IPFS.
 * 
 * @param {string} publicKeyOfOwner - The file owner's public key.
 * @param {string} [revokeTo] - The address whose access you want to revoke.
 * @param {string} cid - The ID of the file from which you want to revoke access.
 * @param {string} signedMessage - A message signed by the owner for authentication.
 * 
 * @return {object} - Details of the revocation operation.
 */
```

### 3. Example Code

Here's a practical code template for you. Replace the placeholders with your data, and you're good to go:

```javascript
import lighthouse from '@lighthouse-web3/sdk';

const ownerPublicKey = "OWNER_PUBLIC_KEY_HERE";
const addressToRevoke = ["LIST_OF_ADDRESSES_TO_REVOKE_HERE"];
const fileCID = "FILE_CID_HERE";
const ownerSignedMessage = "OWNER_SIGNED_MESSAGE_HERE";

const response = await lighthouse.revokeFileAccess(ownerPublicKey, addressToRevoke, fileCID, ownerSignedMessage);

console.log(response);
```

Executing the function will produce a response like:

```js
{
   data: {
     cid: 'FILE_CID_HERE',
     revokeTo: ['REVOKED_ADDRESS_HERE'],
     status: 'Success'
   }
}
```

**Pro Tip**: Just as with sharing, Lighthouse supports revoking access from Solana addresses as well!
