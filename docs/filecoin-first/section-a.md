---
hidden: true
---

# ⬆️ Upload, PoDSI, and Deal-Making via SDK

In this **Section A**, we will discuss the following steps

1. [Upload your first file](section-a.md#step-1-upload-your-first-file-using-lighthouse-sdk)&#x20;
2. [Understanding PoDSI: Getting the PoDSI for your file](section-a.md#step-2-understanding-podsi-getting-the-podsi-for-your-file)
3. [Get your deal ID from your upload](section-a.md#step-3-get-your-deal-id-of-your-upload)
4. [Download your file using the file’s CID](section-a.md#step-4-download-your-file-using-the-files-cid)



### Step 1: Upload your first file using Lighthouse SDK

Firstly, you'll need to get a picture of your favorite pupper whose picture you'll want to store on the decentralized web.

{% hint style="success" %}
The Lighthouse SDK is a JavaScript library that allows you to upload files to the Filecoin network. It's open source and available [here](https://github.com/lighthouse-web3/lighthouse-package)
{% endhint %}

**A. Uploading a file is as simple as:**

{% code overflow="wrap" lineNumbers="true" %}
```javascript
import lighthouse from "@lighthouse-web3/sdk";
// ... other code
const uploadResponse = await lighthouse.upload('/path/to/adorable/dog.jpg', 'YOUR_API_KEY');
```
{% endcode %}

### Step 2: Understanding PoDSI: Getting the PoDSI for your file

Now that you've registered the picture of your puppy, how would you know that it's actually being maintained on the Filecoin network? This is where the PoDSI comes in. The PoDSI is a proof that your file is being maintained on the Filecoin network.

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
curl https://api.lighthouse.storage/api/lighthouse/get_proof?cid=QmYTaCnjNrrKCwXzC8ZLiiNJ78rsobXtfKwN8s9qCLBzVA&network=testnet
```

The response, an example of a PoDSI proof on Calibration, should look something like this:

{% code title="PoDSI response" lineNumbers="true" %}
```json
{
    "dealInfo": [
        {
            "dealId": 177596,
            "storageProvider": "17840",
            "proof": {
                "verifierData": {
                    "commPc": "0181e20392202075faff211d8024d98d81df87efd40bbabfeb63c7f5200afea342da4429c01a18",
                    "sizePc": "100"
                },
                "inclusionProof": {
                    "proofIndex": {
                        "index": "7ff00",
                        "path": [
                            "4d44014e19d80119f530dfc878db53c3faab0752e4665693b7a7aeff08b09822",
                            "f04fb42fcce9613a8eae7c230acbd40d4df6abb01a5ae161f1c462cb96d3660e",
                            "b9e8cedc33a3aa75b3c8c6c91cbffc273b0511503b6ff21bc74e884818588139",
                            "c52bebb2782a1fd39348c490be938c2c54ea52225b12ca3e0425abfa9c4a4414",
                            "2c3626cab40f8f6697d69e2845d8b20ed32f15e10263b291387c573e9ab92731",
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
                            "8d36a00defd360383041e0f23e37dc65305efe6101af7be541911071f2b92807",
                            "d42dd81b76df548ff381781e00083cccf43ef55c8b0aa8484d40e24f347a6801"
                        ]
                    },
                    "proofSubtree": {
                        "index": "0",
                        "path": [
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
                            "0b8da0a9a8fddd8373c510738dac969b90f6267e84681efc945c6f7b704dd33a",
                            "55f07e2ab4c4565c37bf8323224d5eea90ad78580e853c6755f9f42e511b740e",
                            "84c0421ba0685a01bf795a2344064fe424bd52a9d24377b394ff4c4b4568e811",
                            "1d570841d92d9b0d377a0b3a58fbc96e50be278ccf60b1d8a9511f5ba006233e",
                            "cf8f34780af2dd659e587b5fffe59a653c631611acb52ce2cce58ed1fac48a39"
                        ]
                    }
                },
                "indexRecord": {
                    "checksum": "2f6c39761557bcaac7bddb1845d06501",
                    "proofIndex": "75faff211d8024d98d81df87efd40bbabfeb63c7f5200afea342da4429c01a18",
                    "proofSubtree": 0,
                    "size": 256
                }
            }
        }
    ]
}
```
{% endcode %}

1. The _**proof**_ contains information that can be used to confirm whether your file was included in a specific aggregated data bundle.
2. The _**dealInfo**_ provides details about the file's storage deal. If the "dealId" is null, it means that the storage deal has been initiated but the miner hasn't started the sealing process yet.

### Step 3: Get your deal ID of your upload

When you upload the picture of your puppy, the on-chain deal that is made to store it on the Filecoin network is assigned a unique deal ID. You can get this deal ID from the PODSI response above.

> Under the hood, the node infrastructure is working hard to ensure that your file is included on-chain. The process of deal making can take up to about **a day**.

### Step 4: Download your file using the file’s CID

Now that your file is stored on the Filecoin network, you can retrieve it using its CID. You can do this by calling the `download` function in one of the following ways:

**via CLI:**

```bash
# Assumes that you have lighthouse-cli installed. If not, feel free to download it using 
# npm install -g @lighthouse-web3/sdk
curl -o fileName https://gateway.lighthouse.storage/ipfs/<cid>
```

**or via Code:**

<pre class="language-javascript" data-line-numbers><code class="lang-javascript"><strong>const lighthouseDealDownloadEndpoint = https://gateway.lighthouse.storage/ipfs/'
</strong>
let response = await axios({
    method: 'GET',
    url: `${lighthouseDealDownloadEndpoint}${lighthouse_cid}`,
    responseType: 'stream',
});

try {
    const filePath = await this.saveResponseToFile(response, downloadPath);
    console.log(`File saved at ${filePath}`);
    return filePath
} catch (err) {
    console.error(`Error saving file: ${err}`);
}

saveResponseToFile(response, filePath) {
    const writer = fs.createWriteStream(filePath);

    // Pipe the response data to the file
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(filePath));
        writer.on('error', (err) => {
            console.error(err);
            reject(err);
        });
    });
}
</code></pre>

***

You can also work with PODSI, and deal making on-chain with help of smart contracts which we will discuss thoroughly in [next section](section-b.md).
