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
{% endtabs %}
