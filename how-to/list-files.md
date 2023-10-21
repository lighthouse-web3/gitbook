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

# 🗃 List Files

All uploaded files can be viewed using the given function, the results are paginated with 2000 records in one page.

{% tabs %}
{% tab title="JS SDK" %}
```javascript
const getUploads = async() =>{
  /*
    @param {string} apiKey - Your API key.
  */
  const response = await lighthouse.getUploads("YOUR_API_KEY")
  console.log(response)
  
  /* Sample response
    {
      data: {
        fileList: [
          {
            publicKey: '0x4e6d5be93ab7c1f75e30dd5a7f574f42f675eed3',
            fileName: 'sample.txt',
            mimeType: 'text/plain',
            txHash: '',
            status: 'queued',
            createdAt: 1691087810426,
            fileSizeInBytes: '14',
            cid: 'QmQK9V46b4vpNUd7pe7EcCqihBEmcSLH4NVNWukLJhGzgN',
            id: '1b2623bd-64ca-4434-8619-24c9a1eca840',
            lastUpdate: 1691087810426,
            encryption: false
          }
        ]
      }
    }
  */
}
```
{% endtab %}

{% tab title="API" %}
```bash
curl -H 'Authorization: Bearer API_KEY' 'https://api.lighthouse.storage/api/user/files_uploaded?pageNo=<pageNo>'
```
{% endtab %}

{% tab title="CLI" %}
```bash
lighthouse-web3 get-uploads
```
{% endtab %}
{% endtabs %}
