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

If you've ever wanted to securely save a piece of text, maybe a note or a secret, on the InterPlanetary File System (IPFS) with encryption, Lighthouse makes it easy. Here's a step-by-step guide to help

{% tabs %}
{% tab title="JS SDK" %}
```javascript
import lighthouse from '@lighthouse-web3/sdk'

/**
* Use this function to upload an encrypted text string to IPFS.
* 
* @param {string} text - The text you want to upload.
* @param {string} apiKey - Your unique Lighthouse API key.
* @param {string} publicKey - Your wallet's public key.
* @param {string} signedMessage - A message you've signed using your private key.
* @param {string} [name] - optional name for text
*
* @return {object} - Details of the uploaded file on IPFS.
*/

const yourText = "PLACE_YOUR_TEXT_HERE"
const apiKey = "PLACE_YOUR_API_KEY_HERE"
const publicKey = "PLACE_YOUR_PUBLIC_KEY_HERE"
const signedMessage = "SIGNATURE/JWT"
const name = "anime"

const response = await lighthouse.textUploadEncrypted(yourText, apiKey, publicKey, signedMessage)
console.log(response)
/* Sample Response
{
  data: {
    Name: 'anime',
    Hash: 'QmTsC1UxihvZYBcrA36DGpikiyR8ShosCcygKojHVdjpGd',
    Size: '67'
  }
}
*/
```
{% endtab %}
{% endtabs %}

