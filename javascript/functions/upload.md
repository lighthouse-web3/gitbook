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

When uploading a file, you can customize how it's stored in Lighthouse using the **dealParameters**:

**num\_copies**: Decide how many backup copies you want for your file. Max limit is 3. For instance, if set to 3, your file will be stored by 3 different storage providers.

**repair\_threshold**: Determines the time after which a storage sector is considered "broken" if a provider fails to confirm they still have your file. It's measured in "epochs", with 28800 epochs being roughly 10 days.

**renew\_threshold**: Specifies when your storage deal should be renewed. It's also measured in epochs.

**miner**: If you have preferred miners, list their addresses here. For testing, it's recommended to use t017840.

**network**: This should always be set to 'calibration' unless you specifically want to use the mainnet.

**add\_mock\_data**: This field is used to make smaller files reach the minimum file size accepted on the Lighthouse calibration test network (1 MB). If your file is less than the minimum size, `add_mock_data` will append a mock file to ensure it meets the storage requirements. The value indicates the size in MB. For instance, if your file is 256KB, the add\_mock\_data should be set to 2 to the minimum target.

Example:

```javascript
const dealParams = {
  num_copies: 2,
  repair_threshold: 28800,
  renew_threshold: 240,
  miner: ["t017840"],
  network: 'calibration',
  add_mock_data: 2

};

const uploadResponse = await lighthouse.upload(
  '/home/cosmos/Desktop/wow.jpg', 
  apiKey,
  false,
  dealParams
);
```

```
# Use cases
// This will use default values of other parameters.
const dealParam_default = {
	"network":"calibration"
}

// If user wants to bundle 4MB dummy file with their data
const dealParam_mock = {
	"add_mock_data": 4,
	"network":"calibration"
}

// specifying null will disable functionality of specified field
const dealParam_ignore = {
	"num_copies":null,
	"repair_threshold":null,
	"renewal_threshold":null,
	"network":"calibration"
}
```

> **Friendly Tip**: The term "epoch" can be thought of as a time unit in filecoin under which various operation occur like PoST PoRep..., with 2880 epochs being equivalent to a day.
