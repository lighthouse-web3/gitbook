---
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# 📁 File

This example demonstrates uploading files to Lighthouse, which are encrypted at the user's end while it's getting uploaded. The encryption key is split into five parts using BLS cryptography and stored independently in five nodes.

{% tabs %}
{% tab title="JS SDK" %}
#### Method 1: Node JS

```javascript
import lighthouse from '@lighthouse-web3/sdk';

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

const pathToFile = '/home/cosmos/Desktop/wow.jpg';
const apiKey = 'YOUR_API_KEY_HERE';
const publicKey = 'YOUR_PUBLIC_KEY_HERE';
const signedMessage = 'YOUR_SIGNED_MESSAGE_HERE';

const response = await lighthouse.uploadEncrypted(pathToFile, apiKey, publicKey, signedMessage);

console.log(response);
```

#### Method 2: Browser

```javascript
import React from "react";
import lighthouse from '@lighthouse-web3/sdk';

function App() {

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadFile = async(file) =>{
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
    // Fourth parameter is the deal parameters, default null
    const output = await lighthouse.upload(file, "YOUR_API_KEY", false, null, progressCallback);
    console.log('File Status:', output);
    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

      console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
  }

  return (
    <div className="App">
      <input onChange={e=>uploadFile(e.target.files)} type="file" />
    </div>
  );
}

export default App;
```
{% endtab %}

{% tab title="CLI" %}
```bash
lighthouse-web3 upload-encrypted <path>
```
{% endtab %}
{% endtabs %}
