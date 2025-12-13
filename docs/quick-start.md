---
title: Quick Start
icon: hammer
---

# Quick Start

In this section, we will see how to

1. [Create an API Key](#create-an-api-key)
2. [Upload a file](#upload-a-file)
3. [View the file](#view-file)
4. [Get Filecoin deals](#get-filecoin-deal)
5. [What's Next?](#id-5.-whats-next)

This Quick Start guide walks you through the essentials: creating an API key, uploading a file, viewing it, and tracking its storage status. While the examples below use Node.js, you can easily adapt them for other environments using our How-To section

### 1. Create an API Key

\
1\. Login into Lighthouse files dapp ([https://files.lighthouse.storage/](https://files.lighthouse.storage/))

\
2\. Go to the API key section and generate the API key as shown in image below

{% hint style="info" %}
You can also generate the API key from CLI
{% endhint %}

<figure><img src="/img/api key.png" alt=""><figcaption></figcaption></figure>

### 2. Upload a File

\
1\. Install the lighthouse package in your Node application

```
npm i @lighthouse-web3/sdk
```

\
2\. Run the following script

```javascript
import lighthouse from '@lighthouse-web3/sdk'

const apiKey = 'YOUR_API_KEY_HERE';
const uploadResponse = await lighthouse.upload(
  '/home/cosmos/Desktop/wow.jpg', 
  apiKey
);

console.log(uploadResponse);
```

On success, you'll receive an object containing the file name, its CID (“Hash”), and size—example shown below:

```
{
  data: {
    Name: 'wow.jpg',
    Hash: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
    Size: '31735'
  }
}
```

### 3. View the File

The file can be viewed from an IPFS gateway\
[https://gateway.lighthouse.storage/ipfs/QmWC9AkGa6vSbR4yizoJrFMfmZh4XjZXxvRDknk2LdJff](https://gateway.lighthouse.storage/ipfs/QmWC9AkGa6vSbR4yizoJrFMfmZh4XjZXxvRDknk2LdJffc)

### 4. Get Filecoin Deal

{% hint style="info" %}
Filecoin deals can take up to couple of hours to 1 day to appear—this is expected. Use the `dealStatus` function as shown below to monitor progress. Once sealed, files are verifiably stored
{% endhint %}

```javascript
const status = await lighthouse.dealStatus('bafkreia4ruswe7ghckleh3lmpujo5asrnd7hrtu5r23zjk2robpcoend34')
```

The response will look like this

```
data: [
    {
        "endEpoch": 4490732,
        "chainDealID": 45796363,
        "publishCID": "bafy2bzacec2v6bahuatbgxeocrym6vwduzovopwtairtvcipzj6q6jvq3pmti",
        "storageProvider": "f02620",
        "dealStatus": "Sealing: PreCommit1",
        "dealUUID": "e8ad77c7-0801-4076-80b8-bdabff95cb7b",
        "startEpoch": 3035532,
        "aggregateIn": "b231aeed-59a8-4586-9bf9-e45679895e8f",
        "providerCollateral": "10.282 mFIL",
        "lastUpdate": 1676160004130,
        "pieceCID": "baga6ea4seaqhtz4xcs5d3yrf6hivxp7dbcqg6dwqqojez5ztcq7mycngigptsoy",
        "payloadCid": "bafybeiefcsn6rwyswdlf6mmknaq3kncuee6mwfx7fy4qea7msl2zngnaia",
        "pieceSize": 34359738368,
        "carFileSize": 34091302912,
        "dealId": 45796363,
        "miner": "f02620",
        "content": 31721
    }
]
```

### 5. What’s Next?

Explore further with:

* CLI tools
* Python SDK examples
* Encrypted uploads (Kavach)
* Token gating & access control
* Image resizing, IPNS, and more…
