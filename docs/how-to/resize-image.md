---
description: >-
  For resizing an image stored on the IPFS network via the Lighthouse gateway,
  you can use the image's Content Identifier (CID) along with specific query
  parameters to define the desired dimensions.
icon: image-landscape
---

# Resize Image



{% tabs %}
{% tab title="JS" %}
```javascript
const fetch = require('node-fetch'); // node-fetch must be installed if you're using Node.js versions before 18.x

const resizeImage = (cid, height, width, path) => {
  const url = `https://gateway.lighthouse.storage/ipfs/${cid}?h=${height}&w=${width}`;

  fetch(url)
    .then(response => {
      if (response.ok) return response.buffer();
      throw new Error('Network response was not ok.');
    })
    .then(buffer => {
      const fs = require('fs');
      fs.writeFile(path, buffer, () => {
        console.log(`Resized image saved to ${path}`);
      });
    })
    .catch(error => {
      console.error('Failed to save the resized image:', error);
    });
};

// Replace 'CID' with the actual Content Identifier of your image, and 'path' with your desired file path.
resizeImage('CID', 200, 800, 'path/to/your/directory/filename.ext');

```
{% endtab %}

{% tab title="CLI" %}
```sh
curl "https://gateway.lighthouse.storage/ipfs/CID?h=200&w=800" --output path/to/your/directory/filename.ext

# Replace 'CID' with your file's Content Identifier and adjust the output path accordingly.
```
{% endtab %}

{% tab title="Web Browser" %}


To resize an image using a web browser, navigate to the URL with the appropriate parameters. Replace `CID` with your file's Content Identifier:

[https://gateway.lighthouse.storage/ipfs/CID?h=200\&w=800](https://gateway.lighthouse.storage/ipfs/CID?h=200\&w=800)

Adjust the height (h) and width (w) parameters as needed.
{% endtab %}

{% tab title="Python SDK" %}
```python
import requests

def resize_image(cid, height, width, path):
    """
    Resize an image stored on IPFS via Lighthouse gateway.
    
    :param cid: str, Content Identifier of the image
    :param height: int, Desired height in pixels
    :param width: int, Desired width in pixels
    :param path: str, Path where resized image will be saved
    """
    url = f"https://gateway.lighthouse.storage/ipfs/{cid}?h={height}&w={width}"
    
    response = requests.get(url)
    response.raise_for_status()
    
    # Save the resized image
    with open(path, 'wb') as f:
        f.write(response.content)
    
    print(f"Resized image saved to {path}")

# Replace 'CID' with the actual Content Identifier of your image, and 'path' with your desired file path.
resize_image('CID', 200, 800, 'path/to/your/directory/filename.ext')
```
{% endtab %}
{% endtabs %}
