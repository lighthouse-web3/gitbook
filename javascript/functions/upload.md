---
description: >-
  Here's a step-by-step guide to help you upload files to Lighthouse using its
  SDK.
---

# Upload

### 1. Function Overview

```javascript
/**
 * This function allows you to upload a file or a folder to Lighthouse.
 * 
 * @param {string} path - The location of your file or folder.
 * @param {string} apiKey - Your personal API key for Lighthouse.
 * @param {boolean} multi - Specify if you are uploading multiple files or folders.
 * @param {object} dealParameters - Custom parameters for file storage deals (see below for more details).
 * 
 * @return {object} - Returns details about the uploaded file.
 */
```

### 2. Basic Usage

Here's a simple example where you're uploading a single file named 'wow.jpg' from your desktop:

```javascript
import lighthouse from '@lighthouse-web3/sdk'

const apiKey = 'YOUR_API_KEY_HERE';
const uploadResponse = await lighthouse.upload(
  '/home/cosmos/Desktop/wow.jpg', 
  apiKey,
  false
);

console.log(uploadResponse);
```

Upon successful upload, you'll receive an output like:

```js
{
  data: {
    Name: 'wow.jpg',
    Hash: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
    Size: '31735'
  }
}
```

### 3. Advanced Options (Deal Parameters)

Deal parameters are in the testing phase are are supported on the calibration testnet, refer to [this](../../filecoin-virtual-machine/deal-parameters.md) section for more details.

