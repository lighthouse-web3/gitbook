# 💾 Check for Filecoin Deals

Filecoin deal is created for all files uploaded to Lighthouse. Here is an example of how to view the deal status. A Filecoin deal refers to an agreement between a client and a storage miner to store data in the Filecoin network. Once a deal is made, the storage miner receives the data to store and must repeatedly prove to the chain that they are still storing the data according to the agreement in order to receive rewards

{% tabs %}
{% tab title="JS SDK" %}
```javascript
/*
  @param {string} cid
*/
const status = await lighthouse.dealStatus('QmPCM9nLb4CdtWH9M5iD4oi32ARtaFxgUfgr1eMViU8dfZ')

/* Sample Response
{
  data: [
  {
    "pieceCID": "QmPCM9nLb4CdtWH9M5iD4oi32ARtaFxgUfgr1eMViU8dfZ",
    "payloadCid": "bafkreiemizfwgot67q5mfsejmgwotaoegd3v536l2liy5oubpjhbaawfku",
    "pieceSize": 512,
    "carFileSize": 256,
    "dealId": 74606268,
    "miner": "f01771403",
    "content": 74,
    "dealStatus": "Sealing: Proving",
    "startEpoch": 3714464,
    "endEpoch": 4232864,
    "publishCid": "bafy2bzacedupiqlo732qxawhctakxtfjyljuwjvndih22wqkkdhon4fsnsopa",
    "dealUUID": "10ed5a44-1d76-425f-af70-270a78fefb6f",
    "providerCollateral": "7.568 mFIL",
    "chainDealID": 74606268
  },
  {
    "pieceCID": "QmPCM9nLb4CdtWH9M5iD4oi32ARtaFxgUfgr1eMViU8dfZ",
    "payloadCid": "bafkreiemizfwgot67q5mfsejmgwotaoegd3v536l2liy5oubpjhbaawfku",
    "pieceSize": 512,
    "carFileSize": 256,
    "dealId": 75486682,
    "miner": "f02366527",
    "content": 74,
    "dealStatus": "Sealing: Proving",
    "startEpoch": 3734467,
    "endEpoch": 7276867,
    "publishCid": "bafy2bzaceaohycdaye2cxqdgzwhmialv7ncnaqigxgdctkmldparqpjdbiip6",
    "dealUUID": "1209331c-89b8-43d2-b50f-ecd18b78b1fe",
    "providerCollateral": "7.505 mFIL",
    "chainDealID": 75486682
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

{% tab title="Python SDK" %}
```python
from lighthouseweb3 import Lighthouse

# Initialize Lighthouse
lh = Lighthouse(token="YOUR_API_KEY")

# Get deal status
cid = "QmPCM9nLb4CdtWH9M5iD4oi32ARtaFxgUfgr1eMViU8dfZ"
deal_status = lh.getDealStatus(cid)

print(deal_status)
# Sample Response
# {
#   'data': [
#     {
#       'pieceCID': 'QmPCM9nLb4CdtWH9M5iD4oi32ARtaFxgUfgr1eMViU8dfZ',
#       'payloadCid': 'bafkreiemizfwgot67q5mfsejmgwotaoegd3v536l2liy5oubpjhbaawfku',
#       'pieceSize': 512,
#       'carFileSize': 256,
#       'dealId': 74606268,
#       'miner': 'f01771403',
#       'content': 74,
#       'dealStatus': 'Sealing: Proving',
#       'startEpoch': 3714464,
#       'endEpoch': 4232864,
#       'publishCid': 'bafy2bzacedupiqlo732qxawhctakxtfjyljuwjvndih22wqkkdhon4fsnsopa',
#       'dealUUID': '10ed5a44-1d76-425f-af70-270a78fefb6f',
#       'providerCollateral': '7.568 mFIL',
#       'chainDealID': 74606268
#     }
#   ]
# }

# Access deal information
for deal in deal_status['data']:
    print(f"Deal ID: {deal['dealId']}")
    print(f"Status: {deal['dealStatus']}")
    print(f"Storage Provider: {deal['miner']}")
    print(f"Start Epoch: {deal['startEpoch']}")
    print(f"End Epoch: {deal['endEpoch']}")
    print(f"Chain Deal ID: {deal['chainDealID']}")
    print("---")
```
{% endtab %}

{% tab title="Go SDK" %}
```go
package main

import (
    "context"
    "fmt"
    "log"
    "os"

    "github.com/lighthouse-web3/lighthouse-go-sdk/lighthouse"
)

func main() {
    client := lighthouse.NewClient(nil,
        lighthouse.WithAPIKey(os.Getenv("LIGHTHOUSE_API_KEY")),
    )

    ctx := context.Background()

    cid := "QmPCM9nLb4CdtWH9M5iD4oi32ARtaFxgUfgr1eMViU8dfZ"
    
    // Get deal status
    dealStatus, err := client.Deals().Status(ctx, cid)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("Deal Status:")
    for _, deal := range dealStatus {
        fmt.Printf("Deal ID: %d\n", deal.DealID)
        fmt.Printf("Status: %s\n", deal.DealStatus)
        fmt.Printf("Storage Provider: %s\n", deal.StorageProvider)
        fmt.Printf("Start Epoch: %d\n", deal.StartEpoch)
        fmt.Printf("End Epoch: %d\n", deal.EndEpoch)
        fmt.Printf("Chain Deal ID: %d\n", deal.ChainDealID)
        fmt.Println("---")
    }
}
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
