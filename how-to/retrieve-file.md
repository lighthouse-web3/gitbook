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

{% tab title="Go SDK" %}
```go
package main

import (
    "context"
    "fmt"
    "io"
    "log"
    "net/http"
    "os"

    "github.com/lighthouse-web3/lighthouse-go-sdk/lighthouse"
)

func main() {
    client := lighthouse.NewClient(nil,
        lighthouse.WithAPIKey(os.Getenv("LIGHTHOUSE_API_KEY")),
    )

    ctx := context.Background()

    cid := "YOUR_CID_HERE"
    
    // Get file info first
    fileInfo, err := client.Files().Info(ctx, cid)
    if err != nil {
        log.Fatal(err)
    }

    // Retrieve file from IPFS gateway
    destinationPath := "./downloaded_file"
    ipfsGatewayURL := fmt.Sprintf("https://gateway.lighthouse.storage/ipfs/%s", cid)

    req, err := http.NewRequestWithContext(ctx, "GET", ipfsGatewayURL, nil)
    if err != nil {
        log.Fatal(err)
    }
    
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        log.Fatal(err)
    }
    defer resp.Body.Close()

    out, err := os.Create(destinationPath)
    if err != nil {
        log.Fatal(err)
    }
    defer out.Close()

    _, err = io.Copy(out, resp.Body)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("File retrieved successfully! Saved to: %s\n", destinationPath)
    fmt.Printf("File Name: %s, Size: %d bytes\n", fileInfo.FileName, fileInfo.FileSizeInBytes)
}
```
{% endtab %}
{% endtabs %}
