# 🔑 Api Key

An API key can be generated using the given code example:

```javascript
import lighthouse from '@lighthouse-web3/sdk'
import axios from 'axios'
import {ethers} from 'ethers'

const signAuthMessage = async(privateKey, messageRequested) =>{
  const signer = new ethers.Wallet(privateKey);
  const signedMessage = await signer.signMessage(messageRequested);
  return(signedMessage)
}

const getApiKey = async() =>{
  const wallet = {
    publicKey: '0xEaF4E24ffC1A2f53c07839a74966A6611b8Cb8A1',
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
  /* { data: { apiKey: '7d8f3d18.eda91521aa294773a8201d2a7d241a2c' } } */
}

getApiKey()
```
