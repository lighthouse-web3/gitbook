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
{% endtabs %}
