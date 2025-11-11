# 🗑️ Delete File

You can delete any uploaded file using the given function.

{% hint style="info" %}
Only files in the **Annual Plan** can be deleted. Files in the **Permanent Plan** cannot be deleted.
{% endhint %}

{% tabs %}
{% tab title="JS SDK" %}
```javascript
const deleteFile = async () => {
  /*
    @param {string} apiKey - Your API key.
    @param {string} fileId - The unique file ID (UUID) of the file you want to delete.
                             Note: This is different from the file CID.
                             You can get fileId from lighthouse.getUploads() 
                             or refer to the List Files section in docs.
  */
  const response = await lighthouse.deleteFile(
    "YOUR_API_KEY",
    "b5f60ba0-b708-41a3-b0f2-5c808ce63b48"
  );

  console.log(response);

  /* Sample response
    {
      "message": "File deleted successfully",
    }
  */
};

deleteFile();

```
{% endtab %}

{% tab title="API" %}
```
curl -X DELETE
-H "Authorization: Bearer API_KEY"
"https://api.lighthouse.storage/api/user/delete_file?id=FILE_ID"
```
{% endtab %}

{% tab title="CLI" %}
```
lighthouse-web3 delete-file <fileID>
```
{% endtab %}

{% tab title="Python SDK" %}
```python
import requests
from lighthouseweb3 import Lighthouse

lh = Lighthouse(token="YOUR_API_KEY")
file_id = "b5f60ba0-b708-41a3-b0f2-5c808ce63b48"

url = f"https://api.lighthouse.storage/api/user/delete_file?id={file_id}"
headers = {
    "Authorization": f"Bearer {lh.token}"
}

response = requests.delete(url, headers=headers)
response.raise_for_status()

result = response.json()
print(result)
# Sample response
# {
#   "message": "File deleted successfully"
# }
```

**Note:** The Python SDK doesn't have a built-in `deleteFile` method, so you need to use the API directly as shown above. The `fileId` parameter is required and should be the unique identifier (UUID) of the file, not the CID. You can get the file ID from `lh.getUploads()`.
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

    // Delete a file by ID
    fileID := "b5f60ba0-b708-41a3-b0f2-5c808ce63b48"
    err := client.Files().Delete(ctx, fileID)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("File deleted successfully")
}
```
{% endtab %}
{% endtabs %}

**Note:**

* The `id` parameter is **required** and should be the unique identifier of the file you want to delete.
* The **file ID** is **different from the file CID**. It is a UUID of the file. You can get it from `lighthouse.getUploads()` or refer to the [List Files section](https://docs.lighthouse.storage/lighthouse-1/how-to/list-files?utm_source=chatgpt.com).
* Once deleted, the file **cannot be recovered**.
