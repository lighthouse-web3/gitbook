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

# 🔑 Create an API Key

An API key is required to use Lighthouse, it can be generated using [Files Dapp UI](https://files.lighthouse.storage/) (check [quick start](../quick-start.md) for more detail), CLI, and SDK. Refer to the given code examples to generate an API key based on your preferred environment.&#x20;

In general, to create an API key there are two steps involved:\
1\. The user requests an authentication message from the message API.\
2\. The user signs the auth message to get the API key.

{% tabs %}
{% tab title="JS SDK" %}
```javascript
import axios from 'axios'
import { ethers } from 'ethers'
import lighthouse from '@lighthouse-web3/sdk'

const signAuthMessage = async(privateKey, verificationMessage) =>{
  const signer = new ethers.Wallet(privateKey)
  const signedMessage = await signer.signMessage(verificationMessage)
  return(signedMessage)
}

const getApiKey = async() =>{
  const wallet = {
    publicKey: 'YOUR_PUBLIC_KEY', // Ex: '0xEaF4E24ffC1A2f53c07839a74966A6611b8Cb8A1'
    privateKey: 'WALLET_PRIVATE_KEY'
  }
  const verificationMessage = (
    await axios.get(
        `https://api.lighthouse.storage/api/auth/get_message?publicKey=${wallet.publicKey}`
    )
  ).data
  const signedMessage = await signAuthMessage(wallet.privateKey, verificationMessage)
  const response = await lighthouse.getApiKey(wallet.publicKey, signedMessage)
  console.log(response)
}

getApiKey()
```
{% endtab %}

{% tab title="API" %}
First, we need to get an authentication message that should be signed in order to generate an API key

```bash
curl https://api.lighthouse.storage/api/auth/get_message?publicKey=<publicKey>
```

This will send a message(string) in response that has to be signed by the user, the signature will be required to generate the API key

```bash
curl -X POST -d '{"publicKey": "value1", "signedMessage": "value2", "keyName": "value3"}' https://api.lighthouse.storage/api/auth/create_api_key
```
{% endtab %}

{% tab title="CLI" %}
Before generating the API key using CLI make sure there is a wallet created or an existing wallet is imported in CLI. To check your wallet use the following command

```bash
lighthouse-web3 wallet
#Returns
#Public Key: 0x92a605b54a7F3171aF7D093d8CeD874236ea96A5
#Network: polygon
```

If there is no wallet, create one or import one using

```bash
lighthouse-web3 create-wallet

lighthouse-web3 import-wallet --key <private_key>
```

Now run the following command to create API key

```bash
lighthouse-web3 api-key --new
```
{% endtab %}
{% endtabs %}
