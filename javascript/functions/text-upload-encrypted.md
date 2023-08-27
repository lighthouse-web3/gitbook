---
description: >-
  If you've ever wanted to securely save a piece of text, maybe a note or a
  secret, on the InterPlanetary File System (IPFS) with encryption, Lighthouse
  makes it easy. Here's a step-by-step guide to hel
---

# Text Upload Encrypted

### 1. Why Encryption Matters?

**Encryption** scrambles your text into a code to protect it from prying eyes. When you encrypt before uploading, you're ensuring only those with the correct key can decipher and read your text.

### 2. Function Overview

To help understand, here's a brief about the function:

```plaintext
/**
* Use this function to upload an encrypted text string to IPFS.
* 
* @param {string} text - The text you want to upload.
* @param {string} apiKey - Your unique Lighthouse API key.
* @param {string} publicKey - Your wallet's public key.
* @param {string} signedMessage - A message you've signed using your private key.
* 
* @return {object} - Details of the uploaded file on IPFS.
*/
```

### 3. Let's Dive into the Code

Below is a template to help you use the function. Just fill in the placeholders with your details:

```javascript
import lighthouse from '@lighthouse-web3/sdk';

const yourText = "PLACE_YOUR_TEXT_HERE";
const apiKey = "PLACE_YOUR_API_KEY_HERE";
const publicKey = "PLACE_YOUR_PUBLIC_KEY_HERE";
const signedMessage = "PLACE_YOUR_SIGNED_MESSAGE_HERE";

const response = await lighthouse.textUploadEncrypted(yourText, apiKey, publicKey, signedMessage);

console.log(response);
```

Upon successful execution, you'll receive:

```javascript
{
  data: {
    Name: 'SOME_HASH_VALUE',
    Hash: 'SOME_HASH_VALUE',
    Size: 'SIZE_OF_TEXT'
  }
}
```

**Friendly Reminder**: Always ensure you have the right `publicKey` and a valid `signedMessage`. Also, remember to never share your private keys or API keys publicly.
