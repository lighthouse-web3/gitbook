# PoDSI

**Proof of Data Segment Inclusion (PoDSI)** is like a certificate of authenticity. It assures that your file is safely tucked inside a special package, known as a "deal", made by the Lighthouse Node. This node combines several files, gives them a unique ID, offers proof of their inclusion, and even throws a mini-proof of the entire package's structure.

{% hint style="warning" %}
The time between uploading and being able to get your PoDSI should only be a few minutes. You can get the PoDSI for your file by calling the `getProof` function in one of the following ways:
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
curl https://api.lighthouse.storage/api/lighthouse/get_proof?cid=QmS7Do1mDZNBJAVyE8N9r6wYMdg27LiSj5W9mmm9TZoeWp&network=testnet
```

The response, an example of a PoDSI proof on Calibration, should look something like this:

{% code title="PoDSI response" lineNumbers="true" %}
```json
{
    "pieceCID": "baga6ea4seaqgbiszkxkzmaxio5zjucpg2sd4n6abvmcsenah27g4xtjszxtzmia",
    "pieceSize": 4194304,
    "carFileSize": 4161536,
    "proof": {
        "pieceCID": "baga6ea4seaqn6s6n3irnz2ewfwlybhpjzrg6i57fzuwletj5sxcv7hz5rauewli",
        "id": "19845d2a-4fae-426c-893d-491770c317e8",
        "lastUpdate": 1692888301,
        "fileProof": {
            "verifierData": {
                "commPc": "0181e203922020df4bcdda22dce8962d97809de9cc4de477e5cd2cb24d3d95c55f9f3d88284b2d",
                "sizePc": "200000"
            },
            "inclusionProof": {
                "proofIndex": {
                    "index": "ffe0",
                    "path": [
                        "f5a5fd42d16a20302798ef6ed309979b43003d2320d9f0e8ea9831a92759fb0b",
                        "3731bb99ac689f66eef5973e4a94da188f4ddcae580724fc6f3fd60dfd488333",
                        "642a607ef886b004bf2c1978463ae1d4693ac0f410eb2d1b7a47fe205e5e750f",
                        "57a2381a28652bf47f6bef7aca679be4aede5871ab5cf3eb2c08114488cb8526",
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
                        "d99887b973573a96e11393645236c17b1f4c7034d723c7a99f709bb4da61162b",
                        "df4bcdda22dce8962d97809de9cc4de477e5cd2cb24d3d95c55f9f3d88284b2d"
                    ]
                },
                "proofSubtree": {
                    "index": "0",
                    "path": [
                        "83ccb895e53b292546ccda9c45017c247ffa54b406f492605c9148e09aa2f208"
                    ]
                }
            },
            "indexRecord": {
                "checksum": "4a8e39cfd5af583596f54f95954a991b",
                "proofIndex": "df4bcdda22dce8962d97809de9cc4de477e5cd2cb24d3d95c55f9f3d88284b2d",
                "proofSubtree": 0,
                "size": 2097152
            }
        }
    },
    "dealInfo": [
        {
            "dealUUID": "f064d4d5-7b35-4647-8df7-91fb8fb99f23",
            "dealId": 13279,
            "storageProvider": "t017840"
        },
        {
            "dealUUID": "ae8f6709-5ca0-4944-abb1-cd04cf05e0c3",
            "dealId": null,
            "storageProvider": "t017819"
        }
    ],
    "previousAggregates": [
        "975afcd3-ff3e-4395-a50e-24500ca0bfb7"
    ]
}
```
{% endcode %}

1. The _**pieceCID**_ is a content identifier used for referencing data in distributed information systems by it’s contents rather than its location using cryptographic hashing and self-describing formats. A core component of IPFS and IPLD, you can read more about it [here](https://docs.filecoin.io/basics/the-blockchain/proofs/).
2. The _**proof**_ contains information that can be used to confirm whether your file was included in a specific aggregated data bundle.
3. The _**dealInfo**_ provides details about the file's storage deal. If the "dealId" is null, it means that the storage deal has been initiated but the miner hasn't started the sealing process yet.
4. The _**previousAggregates**_ parameter lists older aggregate IDs for the file, if the file's storage deal has been renewed. You can use these IDs to get more details about previous aggregates. To do this, use the provided API link, substituting the appropriate aggregate ID and network information.

**Previous Aggregates Info**

To get information about a previous aggregate with the ID '975afcd3-ff3e-4395-a50e-24500ca0bfb7' on the Testnet, you would use the following:

```bash
curl https://api.lighthouse.storage/api/lighthouse/aggregate_info?aggregateId=975afcd3-ff3e-4395-a50e-24500ca0bfb7&network=testnet
```

