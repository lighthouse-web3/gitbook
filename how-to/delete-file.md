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
{% endtabs %}

**Note:**

* The `id` parameter is **required** and should be the unique identifier of the file you want to delete.
* The **file ID** is **different from the file CID**. It is a UUID of the file. You can get it from `lighthouse.getUploads()` or refer to the [List Files section](https://docs.lighthouse.storage/lighthouse-1/how-to/list-files?utm_source=chatgpt.com).
* Once deleted, the file **cannot be recovered**.
