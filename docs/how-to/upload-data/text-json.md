# 🔤 Text/JSON

Follow the given code example, in the case of JSON use Stringify

{% tabs %}
{% tab title="JS SDK" %}
```javascript
import lighthouse from '@lighthouse-web3/sdk'

const text = "Sometimes, I Wish I Was A Cloud, Just Floating Along"
const apiKey = "YOUR_API_KEY"
const name = "shikamaru" //Optional

const response = await lighthouse.uploadText(text, apiKey, name)

console.log(response)
// Sample response
{
  data: {
    Name: 'shikamaru',
    Hash: 'QmY77L7JzF8E7Rio4XboEpXL2kTZnW2oBFdzm6c53g5ay8',
    Size: '91'
  }
}
```

Note: The name parameter is optional, it's just used to give a name to text that will appear in the response, if not provided Name parameter in the response will be the same as Hash.
{% endtab %}

{% tab title="Python SDK" %}
```python
from lighthouseweb3 import Lighthouse
import io

lh = Lighthouse(token="YOUR_API_KEY")
text = "Sometimes, I Wish I Was A Cloud, Just Floating Along"
name = "shikamaru"  # Optional

text_bytes = text.encode('utf-8')
text_file = io.BytesIO(text_bytes)
response = lh.uploadBlob(text_file, name, tag="")

print(response)
# Sample response
# {
#   'data': {
#     'Name': 'shikamaru',
#     'Hash': 'QmY77L7JzF8E7Rio4XboEpXL2kTZnW2oBFdzm6c53g5ay8',
#     'Size': '91'
#   }
# }
```

**Note:** The `name` parameter is optional. If not provided, the Name parameter in the response will be the same as the Hash.
{% endtab %}

{% tab title="Go SDK" %}
```go
package main

import (
    "context"
    "fmt"
    "log"
    "os"
    "strings"

    "github.com/lighthouse-web3/lighthouse-go-sdk/lighthouse"
)

func main() {
    client := lighthouse.NewClient(nil,
        lighthouse.WithAPIKey(os.Getenv("LIGHTHOUSE_API_KEY")),
    )

    ctx := context.Background()

    text := "Sometimes, I Wish I Was A Cloud, Just Floating Along"
    name := "shikamaru" // Optional

    // Upload text using UploadReader
    textReader := strings.NewReader(text)
    response, err := client.Storage().UploadReader(ctx, name, int64(len(text)), textReader)
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
