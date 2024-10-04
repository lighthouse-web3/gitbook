---
hidden: true
---

# 📖 PoDSI

**Proof of Data Segment Inclusion (PoDSI)** is like a certificate of authenticity. It assures that your file is safely tucked inside a special package, known as a "deal", made by the Lighthouse Node. This node combines several files, gives them a unique ID, offers proof of their inclusion, and even throws a mini-proof of the entire package's structure.

<figure><picture><source srcset="../.gitbook/assets/Group 1707478178.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/Api de.png" alt=""></picture><figcaption></figcaption></figure>

{% hint style="warning" %}
The time between uploading and being able to get your PoDSI varies from testnet from mainnet. Ideally it would be 6hr in testnet and 1 day in mainnet. You can get the PoDSI for your file by calling the `getProof` function in one of the following ways:
{% endhint %}

via Axios in node.js

{% code lineNumbers="true" %}
```javascript
let response = await axios.get("https://api.lighthouse.storage/api/lighthouse/get_proof", {
    params: {
        cid: lighthouse_cid,
        network: "testnet" // Change the network to mainnet when ready
    }
})
```
{% endcode %}

or via curl&#x20;

```bash
# Assumes that uploaded your file to mainnet.
# Alternatively, if you are using testnet, add &network=testnet to the end of the URL.
curl https://api.lighthouse.storage/api/lighthouse/get_proof?cid=<puppy_CID>
```

**curl example:**

```bash
# An example of how to get the PoDSI for a file uploaded to testnet
curl https://api.lighthouse.storage/api/lighthouse/get_proof?cid=QmPCM9nLb4CdtWH9M5iD4oi32ARtaFxgUfgr1eMViU8dfZ&network=testnet
```

The response, an example of a PoDSI proof on Calibration, should look something like this:

{% code title="PoDSI response" lineNumbers="true" %}
```json
{
  "dealInfo": [
    {
      "dealId": 180313,
      "storageProvider": "17840",
      "proof": {
        "verifierData": {
          "commPc": "0181e203922020ff1684fe9f42dcd606013436d106b3f68a12d8a745bcda239fff0c61a7cf8d00",
          "sizePc": "200"
        },
        "inclusionProof": {
          "proofIndex": {
            "index": "ffe08",
            "path": [
              "1bbfcc7cee5720e9f54ba23b3def5e2acc29f471eb785fc61bc89bcc85b86109",
              "6a28d9a48b458c0b7441547968b45dd41f13a97834c88ce5cb70ee8a4801511d",
              "81b7c84fdaa0b148ccd5f1bfffdb31ebd2e768957431b6f189b441f3ab1a9d28",
              "63ddfa0ccc8ae6af308a223ab32c35952fcc41c6bf45a546e0ad845861c8b000",
              "4bed83295e43af494c8d2449e9b41ee4b965487d985dcb4a50f5e7d3be672f3c",
              "fc7e928296e516faade986b28f92d44a4f24b935485223376a799027bc18f833",
              "08c47b38ee13bc43f41b915c0eed9911a26086b3ed62401bf9d58b8d19dff624",
              "b2e47bfb11facd941f62af5c750f3ea5cc4df517d5c4f16db2b4d77baec1a32f",
              "f9226160c8f927bfdcc418cdf203493146008eaefb7d02194d5e548189005108",
              "2c1a964bb90b59ebfe0f6da29ad65ae3e417724a8f7c11745a40cac1e5e74011",
              "fee378cef16404b199ede0b13e11b624ff9d784fbbed878d83297e795e024f02",
              "8e9e2403fa884cf6237f60df25f83ee40dca9ed879eb6f6352d15084f5ad0d3f",
              "752d9693fa167524395476e317a98580f00947afb7a30540d625a9291cc12a07",
              "7022f60f7ef6adfa17117a52619e30cea82c68075adf1c667786ec506eef2d19",
              "d99887b973573a96e11393645236c17b1f4c7034d723c7a99f709bb4da61162b",
              "d0b530dbb0b4f25c5d2f2a28dfee808b53412a02931f18c499f5a254086b1326",
              "84c0421ba0685a01bf795a2344064fe424bd52a9d24377b394ff4c4b4568e811",
              "65f29e5d98d246c38b388cfc06db1f6b021303c5a289000bdce832a9c3ec421c",
              "4d30309453ba8162df5fad5ca674bfddbfa77f04a9d34f452dd3f435d1548220",
              "308b7ac653ca76bf698031d74fd325e72ab4b157d9e93d0f1366be5103f05422"
            ]
          },
          "proofSubtree": {
            "index": "3800",
            "path": [
              "650962983d59cde36b83cf10029fd4a6839afadd4e4e89c001771762252c9b10",
              "1f7ac9595510e09ea41c460b176430bb322cd6fb412ec57cb17d989a4310372f",
              "fc7e928296e516faade986b28f92d44a4f24b935485223376a799027bc18f833",
              "08c47b38ee13bc43f41b915c0eed9911a26086b3ed62401bf9d58b8d19dff624",
              "b2e47bfb11facd941f62af5c750f3ea5cc4df517d5c4f16db2b4d77baec1a32f",
              "f9226160c8f927bfdcc418cdf203493146008eaefb7d02194d5e548189005108",
              "2c1a964bb90b59ebfe0f6da29ad65ae3e417724a8f7c11745a40cac1e5e74011",
              "fee378cef16404b199ede0b13e11b624ff9d784fbbed878d83297e795e024f02",
              "8e9e2403fa884cf6237f60df25f83ee40dca9ed879eb6f6352d15084f5ad0d3f",
              "752d9693fa167524395476e317a98580f00947afb7a30540d625a9291cc12a07",
              "7022f60f7ef6adfa17117a52619e30cea82c68075adf1c667786ec506eef2d19",
              "570a9f7de6019f338772c16598597e8028ed889de1b4006dacd0f575312e5a25",
              "e178f9b57a0d203a06f569eea8c1af23b161a37b6495ca14ccd8fa474fa99113",
              "fc042755d7bc4bc5a8e674dc61d1792b3e9ddb1506547bdc41c5f11dee3fbc18",
              "bf3885f14f576c4e82ba97e432e2382d3c5b306020e5cf4a5670dec62cd59b37",
              "3efc419f4223d704ccc9621fd253b1d63b4f105294d56dc6b70c8ec140cd9f03",
              "37ea21c10202b87c22436af983948e8ca5773f356e318a0b502ddb5968074a04"
            ]
          }
        },
        "indexRecord": {
          "checksum": "54718803470b48fa764f8ede503bbf1b",
          "proofIndex": "ff1684fe9f42dcd606013436d106b3f68a12d8a745bcda239fff0c61a7cf8d00",
          "proofSubtree": 7340032,
          "size": 512
        }
      }
    }
  ]
}
```
{% endcode %}

1. The _**dealId**_ provides details about the file's storage deal. If the "dealId" is null, it means that the storage deal has been initiated but the miner hasn't started the sealing process yet.
2. The **storageProvider** details about SP with which your deal has been made.
3. The _**proof**_ contains information that can be used to confirm whether your file was included in a specific aggregated data bundle.



**CID information**

To get information about cid "QmPCM9nLb4CdtWH9M5iD4oi32ARtaFxgUfgr1eMViU8dfZ", you would use the following:

```bash
curl https://api.lighthouse.storage/api/lighthouse/deal_status?cid=QmPCM9nLb4CdtWH9M5iD4oi32ARtaFxgUfgr1eMViU8dfZ
```
