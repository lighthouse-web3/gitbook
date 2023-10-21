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

# 📌 Pin CID

A user can create an additional copy of your file in the IPFS network or migrate a file to the Lighthouse IPFS node pinning service can be used.

{% tabs %}
{% tab title="API" %}
A POST request has to be made with cid(required) and fileName(optional) parameters. API key is required for authentication.

{% code overflow="wrap" %}
```bash
curl -X POST -H 'Authorization: Bearer API_KEY' -H "Content-Type: application/json" -d '{"cid": "QmWC9AkGa6vSbR4yizoJrFMfmZh4XjZXxvRDknk2LdJffc","fileName": "abc.png"}' https://api.lighthouse.storage/api/lighthouse/pin
```
{% endcode %}
{% endtab %}
{% endtabs %}
