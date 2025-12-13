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

{% tab title="Python SDK" %}
```python
from lighthouseweb3 import Lighthouse
import io

# Initialize Lighthouse with your API token
lh = Lighthouse(token="YOUR_API_KEY")

# Create a buffer (bytes)
buffer_data = b"your buffer data here"

# Create a file-like object from the buffer
buffer_file = io.BytesIO(buffer_data)

# Upload buffer using uploadBlob
response = lh.uploadBlob(buffer_file, "buffer.bin", tag="")

print(response)
# Sample response
# {
#   'data': {
#     'Name': 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
#     'Hash': 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
#     'Size': '31735'
#   }
# }

print(f"Uploaded successfully!")
print(f"Name: {response['data']['Name']}")
print(f"Hash (CID): {response['data']['Hash']}")
print(f"Size: {response['data']['Size']} bytes")

# Example: Upload from a stream or generator
def data_generator():
    """Example generator that yields data chunks"""
    for i in range(10):
        yield f"chunk_{i}_data\n".encode('utf-8')

# Collect generator data into a buffer
stream_data = b''.join(data_generator())
stream_file = io.BytesIO(stream_data)
stream_response = lh.uploadBlob(stream_file, "stream_data.bin", tag="")
print(f"Stream uploaded! CID: {stream_response['data']['Hash']}")
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
