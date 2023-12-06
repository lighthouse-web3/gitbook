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

# ℹ File Info

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
{% endtabs %}
