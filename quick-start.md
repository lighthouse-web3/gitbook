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

# ⛏ Quick Start

In this section, we will see how to

1. [Create an API Key](quick-start.md#create-an-api-key)
2. [Upload a file](quick-start.md#upload-a-file)
3. [View the file](quick-start.md#view-file)
4. [Get Filecoin deals](quick-start.md#get-filecoin-deal)
5. [Verify a Filecoin deal](quick-start.md#verify-filecoin-deal)

This guidance is in Nodejs, but in case you are using any other language, refer to the [how-to](broken-reference) section to get APIs that can be called directly.

### Create an API Key

\
1\. Login into files Dapp\
2\. Go to the API key section and generate the key

{% hint style="info" %}
You can also generate the API key from CLI
{% endhint %}

<figure><img src=".gitbook/assets/api key.png" alt=""><figcaption></figcaption></figure>

### Upload File

\
1\. Install the lighthouse package in your Node application\
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

You will get a response like this once file is successfully uploaded:

```
{
  data: {
    Name: 'wow.jpg',
    Hash: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
    Size: '31735'
  }
}
```

### View File

\
The file can be viewed from an IPFS gateway\
[https://gateway.lighthouse.storage/ipfs/QmWC9AkGa6vSbR4yizoJrFMfmZh4XjZXxvRDknk2LdJff](https://gateway.lighthouse.storage/ipfs/QmWC9AkGa6vSbR4yizoJrFMfmZh4XjZXxvRDknk2LdJffc)

### Get Filecoin Deal

\
The Filecoin deal can take up to 2 days to show up once the file is uploaded. To get Filecoin deal use the following function of the SDK

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

### Verify Filecoin Deal

\
Lighthouse aggregates files uploaded by multiple users into a 32GB CAR file and stores this CAR with a storage provider. To verify that your file was part of the Filecoin deal, you can use the PODSI verification. Refer to the [Filecoin Virtual Machine](filecoin-virtual-machine/appendix/podsi.md) section for more details.
