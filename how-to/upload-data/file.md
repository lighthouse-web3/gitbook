# 📁 File

Any kind of file can be uploaded to Lighthouse refer to the code example given below. For developers building on other programming languages use the API directly.

{% hint style="info" %}
Lighthouse currently allows a maximum file size of 24GB to be uploaded in a single request.
{% endhint %}

{% tabs %}
{% tab title="JS SDK" %}
**Method 1: NodeJS:**

```javascript
import lighthouse from '@lighthouse-web3/sdk'

/**
 * This function allows you to upload a file or a folder to Lighthouse.
 * 
 * @param {string} path - The location of your file or folder.
 * @param {string} apiKey - Your personal API key for Lighthouse.
 * @param {object} dealParameters - Custom parameters for file storage deals(check FVM section).
 * @return {object} - Returns details about the uploaded file.
*/
const uploadResponse = await lighthouse.upload(
  '/home/cosmos/Desktop/wow.jpg', 
  'YOUR_API_KEY_HERE'
)

console.log(uploadResponse)

/*Sample response
{
  data: {
    Name: 'wow.jpg',
    Hash: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
    Size: '31735'
  }
}
*/
```

**Method 2: Browser**

```javascript
import React from "react"
import lighthouse from '@lighthouse-web3/sdk'

function App() {

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2)
    console.log(percentageDone)
  }

  const uploadFile = async(file) =>{
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
    // Fourth parameter is the deal parameters, default null
    const output = await lighthouse.upload(file, "YOUR_API_KEY", null, progressCallback)
    console.log('File Status:', output)
    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

      console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash)
  }

  return (
    <div className="App">
      <input onChange={e=>uploadFile(e.target.files)} type="file" />
    </div>
  )
}

export default App
```
{% endtab %}

{% tab title="API" %}
{% code overflow="wrap" %}
```bash
curl -X POST -H 'Authorization: Bearer API_KEY' -F 'file=@/mnt/c/Users/ravis/Desktop/unnamed.jpeg' 'https://upload.lighthouse.storage/api/v0/add'
```
{% endcode %}
{% endtab %}

{% tab title="CLI" %}
The given command can be used to upload a file or directory on Lighthouse\
`lighthouse-web3 upload <path>`
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

    // Upload a file
    upload, err := client.Storage().UploadFile(ctx, "/path/to/your/file.jpg")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("File uploaded successfully!\n")
    fmt.Printf("CID: %s\n", upload.Hash)
    fmt.Printf("Name: %s\n", upload.Name)
    fmt.Printf("Size: %s\n", upload.Size)
}
```
{% endtab %}
{% endtabs %}

