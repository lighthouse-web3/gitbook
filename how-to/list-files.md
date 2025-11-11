# 📂 List Files

All uploaded files can be viewed using the given function, the results are paginated with 2000 records in one page.

{% tabs %}
{% tab title="JS SDK" %}
```javascript
const getUploads = async() =>{
  /*
    @param {string} apiKey - Your API key.
    @param {number} [lastKey=null] - id of last object of previous response, defaults to null.
  */
  const response = await lighthouse.getUploads("YOUR_API_KEY",null)
  console.log(response)
  
  /* Sample response
    {
      data: {
        "fileList": [
          {
              "sentForDeal": "",
              "publicKey": "",
              "fileName": "",
              "mimeType": "",
              "createdAt":,
              "fileSizeInBytes": "",
              "cid": "",
              "id": "b5f60ba0-b708-41a3-b0f2-5c808ce63b48",
              "lastUpdate":,
              "encryption": true
          },
        ],
        "totalFiles": 2000
      }
    }
  */
  
  /* Based on the totalFiles send user can evaluate if the next request needs to be send in the next request id of the last element of the previous response needs to be send.*/
  const response = await lighthouse.getUploads("YOUR_API_KEY","b5f60ba0-b708-41a3-b0f2-5c808ce63b48")

}
```
{% endtab %}

{% tab title="API" %}
```bash
curl -H 'Authorization: Bearer API_KEY' 'https://api.lighthouse.storage/api/user/files_uploaded?lastKey=null'
```
{% endtab %}

{% tab title="CLI" %}
```bash
lighthouse-web3 get-uploads
```
{% endtab %}

{% tab title="Python SDK" %}
```python
from lighthouseweb3 import Lighthouse

# Initialize Lighthouse with your API token
lh = Lighthouse(token="YOUR_API_KEY")

# Get all uploads (first page)
response = lh.getUploads()
print(response)

# Sample response
# {
#   'data': {
#     'fileList': [
#       {
#         'sentForDeal': '',
#         'publicKey': '',
#         'fileName': '',
#         'mimeType': '',
#         'createdAt': 1234567890,
#         'fileSizeInBytes': '',
#         'cid': '',
#         'id': 'b5f60ba0-b708-41a3-b0f2-5c808ce63b48',
#         'lastUpdate': 1234567890,
#         'encryption': True
#       },
#     ],
#     'totalFiles': 2000
#   }
# }

# Access file list
file_list = response['data']['fileList']
total_files = response['data']['totalFiles']

print(f"Total Files: {total_files}")
for file in file_list:
    print(f"ID: {file['id']}, CID: {file['cid']}, Name: {file['fileName']}")

# Get next page using lastKey (id of last element from previous response)
if file_list:
    last_key = file_list[-1]['id']
    next_page = lh.getUploads(last_key)
    print(f"\nNext page - {len(next_page['data']['fileList'])} files")
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

    // List all files (first page)
    listUploads, err := client.Files().List(ctx, nil)
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("Total Files: %d\n", listUploads.TotalFiles)
    for _, file := range listUploads.Data {
        fmt.Printf("ID: %s, CID: %s, Name: %s\n", file.ID, file.CID, file.Name)
    }

    // Get next page using lastKey
    if listUploads.LastKey != nil {
        nextPage, err := client.Files().List(ctx, listUploads.LastKey)
        if err != nil {
            log.Fatal(err)
        }
        fmt.Printf("\nNext page - %d files\n", len(nextPage.Data))
    }
}
```
{% endtab %}
{% endtabs %}

**Note:** To navigate to different pages of results, you need to pass the `id` of the last object from the previous response as the `lastKey` parameter in the function call. This will fetch the next set of records starting from the given `lastKey`.
