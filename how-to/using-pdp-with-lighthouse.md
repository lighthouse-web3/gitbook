# Using PDP with lighthouse

PDP enables storage providers to cryptographically prove they possess an immediately available copy of user data. Unlike Filecoin’s first storage tier backed by Proof of Replication (PoRep), which focuses on long-term cold storage of distinct replicas sealed in cryptographically unique sectors, PDP is designed specifically for hot storage scenarios such as retrieval services, dApp frontends, AI datasets, and digital assets where data needs to be ready at a moment’s notice.

## 1. To check PDP Deal Status

```javascript
curl -X GET "https://api.lighthouse.storage/api/lighthouse/pdp_deal_status?cid=QmNfViiEzYQm539684rJW32a3wQALXHReTGQcF4bRSYVUV" \
  -H "accept: application/json"
  
/*Sample response
[
  {
    "publicKey": "0xc88c729ef2c18baf1074ea0df537d61a54a8ce7b",
    "dealStatus": "completed",
    "updatedAt": "2025-09-23T16:54:42.070Z",
    "createdAt": "2025-09-23T16:54:42.070Z",
    "transactionDetails": {
      "RootCID": "QmNfViiEzYQm539684rJW32a3wQALXHReTGQcF4bRSYVUV",
      "DownloadURL": "https://calib.ezpdpz.net/piece/bafkzcibeus7agdafmfz4hqnlio6momhdhgnkeymtnb4aqjn3harbaziariqmpkfrfm",
      "TXHash": "0x8146cb451068c8bc2f833c7f62926c37abd14fe3c0d6ac7c5e3e984f2f8f329e"
    },
    "cid": "QmNfViiEzYQm539684rJW32a3wQALXHReTGQcF4bRSYVUV",
    "id": "74fc18bd-8001-45f6-8df2-f44d84ae30fd"
  }
]
*/
```

## 2. For PDP Deal Request

```javascript
curl -X GET "https://api.lighthouse.storage/api/lighthouse/pdp_deal_request?cid=QmNfViiEzYQm539684rJW32a3wQALXHReTGQcF4bRSYVUV" \
  -H "Authorization: Bearer YOUR_API_KEY_HERE" \
  -H "Accept: application/json"
  
/*Sample Response
  Success
```

{% hint style="info" %}
Note: Deals will take 20 min to show up after submitting request and the size limit is 100 MB
{% endhint %}
