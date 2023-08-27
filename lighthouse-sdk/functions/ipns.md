---
description: Managing IPNS Records with Lighthouse SDK
---

# IPNS

IPNS (InterPlanetary Name System) is a system that allows you to create mutable pointers to data in the IPFS network. In simpler terms, it's like a dynamic address that always points to the latest version of your content. Using the Lighthouse SDK, you can easily create, publish, fetch, and remove IPNS records.

### 1. What is IPNS?

Think of IPNS as a dynamic domain name for your content on IPFS. While IPFS hashes are static and change when content changes, IPNS provides a static address that can be updated to point to new content.

### 2. Function Overview

Here's a breakdown of what each function does:

* `generateKey()`: Creates a new IPNS key.
* `publishRecord()`: Publishes an IPFS hash to an IPNS name.
* `getAllKeys()`: Retrieves all IPNS keys associated with your account.
* `removeKey()`: Removes a specific IPNS key.

### 3. Step-by-Step Guide to Manage IPNS Records

#### Step 1: Import Lighthouse SDK

```javascript
import lighthouse from '@lighthouse-web3/sdk';
```

#### Step 2: Create a New IPNS Key

```javascript
const apiKey = process.env.API_KEY;
const keyResponse = await lighthouse.generateKey(apiKey);
console.log(keyResponse);
```

Upon successful creation, you will receive an IPNS name and its corresponding ID.

#### Step 3: Publish an IPFS Hash to IPNS

```javascript
const pubResponse = await lighthouse.publishRecord(
  "YOUR_IPFS_HASH", // replace with your IPFS hash
  keyResponse.data.ipnsName,
  apiKey
);
console.log(pubResponse);
```

The response will show the IPNS name and the IPFS path it points to.

#### Step 4: Retrieve All IPNS Keys

```javascript
const allKeys = await lighthouse.getAllKeys(apiKey);
console.log(allKeys);
```

This step fetches all IPNS keys linked to your account.

#### Step 5: Remove an IPNS Key

```javascript
const removeRes = await lighthouse.removeKey(keyResponse.data.ipnsName, apiKey);
console.log(removeRes);
```

Executing this will remove the IPNS key from your account.

#### Step 6: Run the Function

To execute everything:

```javascript
ipns();
```

With these steps, you now have a grasp on how to manage IPNS records with the Lighthouse SDK!
