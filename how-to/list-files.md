---
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

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
{% endtabs %}

**Note:** To navigate to different pages of results, you need to pass the `id` of the last object from the previous response as the `lastKey` parameter in the function call. This will fetch the next set of records starting from the given `lastKey`.
