---
description: >-
  For those who prioritize privacy, Lighthouse offers the ability to encrypt
  files before uploading. Here's a guide to help you navigate through this
  process.
---

# Upload Encrypted

### 1. Why Encrypt Files?

**Encryption** is the process of converting information into a code to prevent unauthorized access. By encrypting your files before uploading, you're adding an extra layer of security to your data.

### 2. Function Overview

```javascript
/**
 * This function lets you upload a file to Lighthouse with encryption enabled.
 * 
 * @param {string} path - Location of your file.
 * @param {string} apiKey - Your unique Lighthouse API key.
 * @param {string} publicKey - User's public key for encryption.
 * @param {string} signedMessage - A signed message used for authentication at encryption nodes.
 * 
 * @return {object} - Returns details of the encrypted uploaded file.
 */
```

### 3. Example Usage

Here's a walkthrough of the code needed to upload an encrypted file:

```javascript
import lighthouse from '@lighthouse-web3/sdk';

const pathToFile = '/home/cosmos/Desktop/wow.jpg';
const apiKey = 'YOUR_API_KEY_HERE';
const publicKey = 'YOUR_PUBLIC_KEY_HERE';
const signedMessage = 'YOUR_SIGNED_MESSAGE_HERE';

const response = await lighthouse.uploadEncrypted(pathToFile, apiKey, publicKey, signedMessage);

console.log(response);
```

On successful upload, you'll receive the following details:

```javascript
{
  data: {
    Name: 'flow1.png',
    Hash: 'QmbGN1YcBM25s6Ry9V2iMMsBpDEAPzWRiYQQwCTx7PPXRZ',
    Size: '31735'
  }
}
```

**Note**: Ensure you have the correct `publicKey` and a valid `signedMessage` for the encryption to work seamlessly.
