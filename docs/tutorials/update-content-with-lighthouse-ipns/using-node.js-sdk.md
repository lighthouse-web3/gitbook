---
description: Using Node.js SDK to Update Content with Lighthouse IPNS
---

# Using Node.js SDK

**Step 0:** Get API keys from Lighthouse as explained in the [main tutorial](./#step-0-getting-your-lighthouse-api-key-files-lighthouse-storage).

**Step 1:** Import the Lighthouse package and set up your API key:

```jsx
import lighthouse from '@lighthouse-web3/sdk';
const apiKey = process.env.API_KEY; // Replace this with your actual API key
```

**Step 2:** Generate an IPNS key using the Lighthouse SDK:

```jsx
const keyResponse = await lighthouse.generateKey(apiKey);
console.log(keyResponse.data);
```

This will return an IPNS name and ID, which we will use in the next steps.

**Step 3:** Publish the content using the generated IPNS key and the CID:

```jsx
const pubResponse = await lighthouse.publishRecord(
  "QmWC9AkGa6vSbR4yizoJrFMfmZh4XjZXxvRDknk2LdJffc",
  keyResponse.data.ipnsName,
  apiKey
);
console.log(pubResponse.data);
```

You will receive a response containing the IPNS name and the link to access the published content.

**Step 4:** Get all IPNS keys associated with your Lighthouse account:

```jsx
const allKeys = await lighthouse.getAllKeys(apiKey);
console.log(allKeys.data);
```

This step allows you to retrieve a list of all IPNS keys associated with your account.

**Step 5:** (Optional) Remove an IPNS key:

```jsx
const removeRes = await lighthouse.removeKey(keyResponse.data.ipnsName, apiKey);
console.log(removeRes.data);
```

This step enables you to remove an IPNS key if necessary.
