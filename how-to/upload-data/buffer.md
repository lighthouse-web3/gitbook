# 🔀 Buffer

* **Buffer**: A temporary storage spot for data. Think of it like a digital clipboard where you can keep data until you use it.
* **Stream**: A sequence of data elements that can be accessed in a sequential manner. It's like a conveyor belt of data items.

If you're looking to upload raw data, like a buffer or a stream, to Lighthouse, Here's a simple explanation:

{% tabs %}
{% tab title="JS SDK" %}
```javascript
/**
 * This function allows you to upload a buffer or a stream directly to Lighthouse.
 * 
 * @param {string} buffer - Your data in the form of a buffer or stream.
 * @param {string} apiKey - Your personal API key for Lighthouse.
 * 
 * @return {object} - Returns details about the uploaded data.
*/
 
const uploadResponse = await lighthouse.uploadBuffer(buffer, apiKey)
console.log(uploadResponse)

/* Sample response
{
  data: {
    Name: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
    Hash: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
    Size: '31735'
  }
}    
*/
```
{% endtab %}

{% tab title="Go SDK" %}
```go
package main

import (
    "bytes"
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

    // Create a buffer (byte slice)
    buffer := []byte("your buffer data here")

    // Upload buffer using UploadReader
    bufferReader := bytes.NewReader(buffer)
    response, err := client.Storage().UploadReader(ctx, "buffer.bin", int64(len(buffer)), bufferReader)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Uploaded successfully!\n")
    fmt.Printf("Name: %s\n", response.Name)
    fmt.Printf("Hash (CID): %s\n", response.Hash)
    fmt.Printf("Size: %s\n", response.Size)
}
```
{% endtab %}
{% endtabs %}
