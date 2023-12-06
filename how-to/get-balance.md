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

# 💰 Get Balance

Users can check their account balance with the given command. It returns the data limit and current usage in bytes.

{% tabs %}
{% tab title="JS SDK" %}
```javascript
const getBalance = async() => {
  /*
    @param {string} publicKey - your public key.
  */
  const publicKey = 'YOUR_WALLET_PUBLIC_KEY';
  const balance = await lighthouse.getBalance(publicKey);
  
  /* Sample Response (Unit is Bytes)
      {data: { dataLimit: 687194767360, dataUsed: 7012827847 }}
  */
}
```
{% endtab %}

{% tab title="API" %}
```bash
curl https://api.lighthouse.storage/api/user/user_data_usage?publicKey=<publicKey>
```
{% endtab %}

{% tab title="CLI" %}
```bash
lighthouse-web3 balance
```
{% endtab %}
{% endtabs %}
