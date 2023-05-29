# IPNS

Create, Publish, Get, and Remove an IPNS record

```javascript
import lighthouse from '@lighthouse-web3/sdk'

const ipns = async() =>{
  const apiKey = process.env.API_KEY
  const keyResponse = await lighthouse.generateKey(apiKey)
  console.log(keyResponse)
  /*
    {
          data: {
              "ipnsName": "6cda213e3a534f8388665dee77a26458",
              "ipnsId": "k51qzi5uqu5dm6uvby6428rfpcv1vcba6hxq6vcu52qtfsx3np4536jkr71gnu"
          }
        }
  */

  const pubResponse = await lighthouse.publishRecord(
    "QmWC9AkGa6vSbR4yizoJrFMfmZh4XjZXxvRDknk2LdJffc",
    keyResponse.data.ipnsName,
    apiKey
  )
  console.log(pubResponse)
  /*
    {
      data: {
          "Name": "k51qzi5uqu5dm6uvby6428rfpcv1vcba6hxq6vcu52qtfsx3np4536jkr71gnu",
          "Value": "/ipfs/Qmd5MBBScDUV3Ly8qahXtZFqyRRfYSmUwEcxpYcV4hzKfW"
      }
    }
  */

  const allKeys = await lighthouse.getAllKeys(apiKey)
  console.log(allKeys)
  /*
    {
      data: [
        {
          "ipnsName": "6cda213e3a534f8388665dee77a26458",
          "ipnsId": "k51qzi5uqu5dm6uvby6428rfpcv1vcba6hxq6vcu52qtfsx3np4536jkr71gnu",
          "publicKey": "0xc88c729ef2c18baf1074ea0df537d61a54a8ce7b",
          "cid": "Qmd5MBBScDUV3Ly8qahXtZFqyRRfYSmUwEcxpYcV4hzKfW",
          "lastUpdate": 1684855771773
        }
      ]
    }
  */

  const removeRes = await lighthouse.removeKey(keyResponse.data.ipnsName, apiKey)
  console.log(removeRes)
  /*
    {
      data: { 
        Keys: [
            {
                "Name": "3090a315e92c495ea36444f2bbaeefaf",
                "Id": "k51qzi5uqu5dm8gfelll8own1epd9osmlig49il5mmphkrcxbnhydkmx101x15"
            }
        ]
      }
    }
  */
}

ipns()
```
