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

# 💾 Check for Filecoin Deals

Filecoin deal is created for all files uploaded to Lighthouse. Here is an example of how to view the deal status. A Filecoin deal refers to an agreement between a client and a storage miner to store data in the Filecoin network. Once a deal is made, the storage miner receives the data to store and must repeatedly prove to the chain that they are still storing the data according to the agreement in order to receive rewards

{% tabs %}
{% tab title="JS SDK" %}
```javascript
/*
  @param {string} cid
*/
const status = await lighthouse.dealStatus('bafkreia4ruswe7ghckleh3lmpujo5asrnd7hrtu5r23zjk2robpcoend34')

/* Sample Response
{
  data: [
    {
      endEpoch: 3548449,
      chainDealID: 45479152,
      publishCID: 'bafy2bzacecy6dvmgluweqnyzouy54gspsec72djz5fghjuzay42cmyfw7rztc',
      storageProvider: 'f02620',
      dealStatus: 'Sealing: PreCommit1',
      dealUUID: '3a03de54-a4ba-4b52-be56-e010135cf530',
      startEpoch: 3030049,
      aggregateIn: '63e2cd90-db13-4fdc-a2e4-61ee5bcd4239',
      providerCollateral: '10.311 mFIL',
      lastUpdate: 1676160004130,
      pieceCID: 'baga6ea4seaqjqy5n2ru5n3ip2v6gq6z43qhbpp4jhqjy7unurxiscolooh2vyfq',
      payloadCid: 'bafybeifgbexa4kg5a3tf5kp5t7m63hr2nifi6rlnnltres4bhjl7u43ljm',
      pieceSize: 34359738368,
      carFileSize: 34091302912,
      dealId: 45479152,
      miner: 'f02620',
      content: 239214
    }
  ]
}
*/
```
{% endtab %}

{% tab title="API" %}
```bash
curl https://api.lighthouse.storage/api/lighthouse/deal_status?cid=<cid>
```
{% endtab %}

{% tab title="CLI" %}
```bash
lighthouse-web3 deal-status <cid>
```
{% endtab %}
{% endtabs %}

Let's see what response parameters actually mean:

* chainDealID: you can search deals on Filfox, Starboard.. using the chainDealID ex: [https://filfox.info/en/deal/23410543](https://filfox.info/en/deal/23410543)
* storageProvider: miner that has stored the aggregated CAR file
* startEpoch: epoch on Filecoin chain when the deal is started
* endEpoch: epoch on Filecoin chain when the deal will end
* dealStatus: current status of deal
* dealUUID: UUID for given deal
* pieceCID: piece CID of aggregated CAR (include padding added at the end of the file to make total file size 2^n)
* payloadCid: payload CID of aggregated CAR (does not include padding)
