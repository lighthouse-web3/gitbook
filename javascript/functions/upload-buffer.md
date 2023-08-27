---
description: >-
  If you're looking to upload raw data, like a buffer or a stream, to
  Lighthouse, this guide is for you! Here's a simple explanation:
---

# Buffer Upload

### 1. What is a Buffer or Stream?

* **Buffer**: A temporary storage spot for data. Think of it like a digital clipboard where you can keep data until you use it.
* **Stream**: A sequence of data elements that can be accessed in a sequential manner. It's like a conveyor belt of data items.

### 2. Function Overview

```javascript
/**
 * This function allows you to upload a buffer or a stream directly to Lighthouse.
 * 
 * @param {string} buffer - Your data in the form of a buffer or stream.
 * @param {string} apiKey - Your personal API key for Lighthouse.
 * 
 * @return {object} - Returns details about the uploaded data.
 */
```

### 3. How to Use

Below is a simple step to upload your buffer or stream:

```javascript
import lighthouse from '@lighthouse-web3/sdk'

const apiKey = 'YOUR_API_KEY_HERE';
const uploadResponse = await lighthouse.uploadBuffer(buffer, apiKey);

console.log(uploadResponse);
```

On successful upload, you'll get something like:

```javascript
{
  data: {
    Name: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
    Hash: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
    Size: '31735'
  }
}
```
