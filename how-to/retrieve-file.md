---
description: >-
  Files stored on the platform can be retrieved directly via the IPFS gateway
  using the Content Identifier (CID) associated with each file. Here's how to
  retrieve a file using the CID.
---

# 🔁 Retrieve File



{% tabs %}
{% tab title="JS" %}
```javascript
const fs = require('fs');
const fetch = require('node-fetch'); // node-fetch must be installed if you are using Node version less than 18

const downloadFile = (cid, path) => {
  fetch(`https://gateway.lighthouse.storage/ipfs/${cid}`)
    .then(response => {
      if (response.ok) return response.buffer();
      throw new Error('Network response was not ok.');
    })
    .then(buffer => {
      fs.writeFile(path, buffer, () => {
        console.log(`File saved to ${path}`);
      });
    })
    .catch(error => {
      console.error('Failed to save the file:', error);
    });
};

// Replace 'CID' with the actual Content Identifier of your file and 'path' with your desired file path.
downloadFile('CID', 'path/to/your/directory/filename.ext');

```
{% endtab %}

{% tab title="CLI" %}
```sh
curl https://gateway.lighthouse.storage/ipfs/CID

# Make sure to replace 'CID' with the actual Content Identifier of your file.
```
{% endtab %}

{% tab title="Web Browser" %}
To retrieve a file using a web browser, simply navigate to the following URL:

[https://gateway.lighthouse.storage/ipfs/CID](https://gateway.lighthouse.storage/ipfs/CID)

Replace `CID` with the actual Content Identifier of the file you wish to access.
{% endtab %}
{% endtabs %}
