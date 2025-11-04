# 💁 File Info

Use file info API to get metadata of your file stored at Lighthouse.

{% tabs %}
{% tab title="JS SDK" %}
```javascript
const fileInfo = async() => {
  /*
    @param {string} cid - cid of file.
  */
  const cid = "QmeMsykMDyD76zpAbinCy1cjb1KL6CVNBfB44am15U1XHh"
  const fileInfo = await lighthouse.getFileInfo(cid)
  /* Sample Response
    {
      data: {
        fileSizeInBytes: '95077',
        cid: 'QmeMsykMDyD76zpAbinCy1cjb1KL6CVNBfB44am15U1XHh',
        encryption: false,
        fileName: 'itachi.jpg',
        mimeType: 'image/jpeg',
        txHash: ''
      }
    }
  */
}
```
{% endtab %}

{% tab title="API" %}
```bash
curl https://api.lighthouse.storage/api/lighthouse/file_info?cid=QmeMsykMDyD76zpAbinCy1cjb1KL6CVNBfB44am15U1XHh
```
{% endtab %}

{% tab title="Go SDK" %}
```go
package main

import (
    "context"
    "fmt"
    "log"
    "os"

    "github.com/lighthouse-web3/lighthouse-go-sdk/lighthouse"
)

func main() {
    client := lighthouse.NewClient(nil,
        lighthouse.WithAPIKey(os.Getenv("LIGHTHOUSE_API_KEY")),
    )

    ctx := context.Background()

    cid := "QmeMsykMDyD76zpAbinCy1cjb1KL6CVNBfB44am15U1XHh"
    fileInfo, err := client.Files().Info(ctx, cid)
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("File Name: %s\n", fileInfo.FileName)
    fmt.Printf("File Size: %d bytes\n", fileInfo.FileSizeInBytes)
    fmt.Printf("CID: %s\n", fileInfo.CID)
    fmt.Printf("MIME Type: %s\n", fileInfo.MimeType)
    fmt.Printf("Encryption: %v\n", fileInfo.Encryption)
}
```
{% endtab %}
{% endtabs %}
