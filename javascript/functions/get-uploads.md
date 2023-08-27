---
description: Reviewing Your Upload History on Lighthouse
---

# Get Uploads

One of the exciting features of the Lighthouse SDK is the ability to view all the files you've uploaded using a specific public key. If you've ever wondered what files you've uploaded, their size, or when you uploaded them, this guide is for you!

### 1. Why Review Your Uploads?

Tracking and managing your uploaded files is crucial, especially if you're handling multiple files or working in a team. With the Lighthouse SDK, you can:

* **Verify** if a particular file has been uploaded.
* **Review** the size and type of uploaded files.
* **Audit** when files were uploaded or last updated.

### 2. Function Overview

To retrieve a list of your uploaded files, Lighthouse offers a simple function:

```plaintext
/**
 * This function fetches the list of files uploaded using a particular public key.
 * 
 * @param {string} publicKey - The public key associated with the uploads.
 * 
 * @return [object] - An array containing details of each uploaded file.
 */
```

### 3. Step-by-Step: How to Fetch Your Uploads

Follow these steps to view your upload history:

```javascript
// Import the Lighthouse SDK
import lighthouse from '@lighthouse-web3/sdk';

// Use the function to retrieve the list of uploads
const publicKey = 'YOUR_WALLET_PUBLIC_KEY'; // Make sure to replace with your public key
const uploads = await lighthouse.getUploads(publicKey);

// Display the list of uploaded files
console.log(uploads);
```

Executing this code provides a detailed breakdown:

* **fileList**: Contains details of each uploaded file, including its name, size, upload date, and more.
* **totalFiles**: Indicates the total number of files you've uploaded.

With this information at your fingertips, you can easily manage and review your Lighthouse uploads!
