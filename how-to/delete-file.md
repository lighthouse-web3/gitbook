# 🗑️ Delete File

You can delete any uploaded file using the given function.

{% tabs %}
{% tab title="API" %}
```
curl -X DELETE
-H "Authorization: Bearer API_KEY"
"https://api.lighthouse.storage/api/user/delete_file?id=FILE_ID"
```
{% endtab %}
{% endtabs %}

**Note:**

* The `id` parameter is **required** and should be the unique identifier of the file you want to delete.
* Once deleted, the file **cannot be recovered**.
