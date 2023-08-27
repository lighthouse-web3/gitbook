---
description: >-
  Retrieve and understand the access permissions set for your encrypted files
  using the Lighthouse SDK.
---

# Get Access Conditions

## Get Access Conditions

If you're working with encrypted files using the Lighthouse SDK, there might be times when you'd want to know the access conditions set for them. This allows you to understand who has access to a given file and under what circumstances. Let's explore how to do that!

### 1. What Are Access Conditions?

Access conditions are rules that determine who can view an encrypted file. These rules can be based on several criteria like the user's public key, or more complex logic (for example, "User A AND User B").

### 2. Function Overview

To understand and get these conditions, Lighthouse provides a simple function:

```plaintext
/**
 * Use this function to get the access conditions for an encrypted file.
 * 
 * @param {string} cid - The ID of the encrypted file.
 * 
 * @return {object} - An object detailing the access conditions.
 */
```

### 3. Code Example

Here's a basic example to help you understand how to use it:

```javascript
import lighthouse from '@lighthouse-web3/sdk';

const accessConditions = async() => {
  const cid = "YOUR_FILE_CID_HERE"; // Replace with your file's CID
  const response = await lighthouse.getAccessConditions(cid);

  // Print the access conditions
  console.log(response);
}

accessConditions();
```

After running the code, you might get different types of responses:

* **Access Conditions Present**: This response means that there are some conditions set for the file. You'll see details like which users have access and under which logical conditions.
* **No Access Conditions**: If there are no specific conditions set, it implies that perhaps only the owner can access the file.
* **Error - CID Not Found**: This means that the provided CID doesn't match any files. Check the CID and try again!

With this, you can always stay informed about your encrypted files' access conditions!
