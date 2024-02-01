# ⬆ Upload, PoDSI, and Deal-Making via SDK

In this **Section A**, we will discuss the following steps

1. [Upload your first file](section-a.md#step-1-upload-your-first-file-using-lighthouse-sdk)&#x20;
2. [Set deal parameters](section-a.md#step-2-set-deal-parameters)
3. [Understanding PoDSI: Getting the PoDSI for your file](section-a.md#step-3-understanding-podsi-getting-the-podsi-for-your-file)
4. [Get your deal ID from your upload](section-a.md#step-4-get-your-deal-id-from-your-upload)
5. [Download your file using the file’s CID](section-a.md#step-5-download-your-file-using-the-files-cid)



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

{% hint style="info" %}
Previously, if the file of your puppy was too small, it would encounter issues being stored on the chain due to size minimums enforced by on-chain deal makers. The SDK helps you get around this by adding mock data (in deal parameters below) to your file to meet the minimum size requirements.
{% endhint %}

**B. To upload a file with replication:**

_Replication_ is the process of making multiple copies of your file and storing them on the Filecoin network. This ensures that if one storage provider goes down, you'll still be able to retrieve your file from another storage provider.

{% hint style="info" %}
You can get the API key from [https://files.lighthouse.storage/](https://files.lighthouse.storage/) or via [CLI](broken-reference)&#x20;
{% endhint %}

{% code lineNumbers="true" %}
```javascript
import lighthouse from "@lighthouse-web3/sdk";
// ... other code
// Indicates that the deal to maintain your file will be replicated to a total of two copies on the network.
const dealParams = {
  num_copies: 2,
};
// The `false` indicates that we're uploading a single file.
// Returns a CID (Content ID) for your file that you can use for PoDSI verification.
const uploadResponse = await lighthouse.upload('/path/to/adorable/dog.jpg', 'YOUR_API_KEY', false, dealParams);
```
{% endcode %}

### Step 2: Set Deal Parameters

{% hint style="info" %}
**Note**: Deal parameters are currently supported on the Calibration testnet. If you don't specify deal parameters, then deal is made on Filecoin mainnet
{% endhint %}

When uploading a file, you can customize how it's stored in Lighthouse using the **deal parameters**:

**num\_copies**: Decide how many backup copies you want for your file. The Max limit is 3. For instance, if set to 3, your file will be stored by 3 different storage providers.

**repair\_threshold**: Determines when a storage sector is considered "broken" if a provider fails to confirm they still have your file. It's measured in "epochs", with 28800 epochs being roughly 10 days.

**renew\_threshold**: Specifies when your storage deal should be renewed. It's also measured in epochs.

**miner**: If you have preferred miners, list their addresses here. For testing, it's recommended to use t017840.

**network**: This should always be set to 'calibration' (for RAAS services to function) unless you want to use the mainnet.

**add\_mock\_data**: This field is used to make smaller files reach the minimum file size accepted on the Lighthouse calibration test network (1 MB). If your file is less than the minimum size, `add_mock_data` will append a mock file to ensure it meets the storage requirements. The value indicates the size in MB. For instance, if your file is 256KB, the add\_mock\_data should be set to 2 to the minimum target.

{% hint style="info" %}
The term "epoch" can be thought of as a time unit in the filecoin network under which various operations occur, like PoST, PoRep, etc., with 2880 epochs equivalent to a day.
{% endhint %}

Example:

```javascript
// Sample JSON of deal parameters
const dealParams = {
  num_copies: 2,
  repair_threshold: 28800,
  renew_threshold: 240,
  miner: ["t017840"],
  network: 'calibration',
  add_mock_data: 2
};
```

<pre class="language-javascript" data-line-numbers><code class="lang-javascript"><strong>const path = "/path/to/file.jpg"
</strong>const apiKey = "thisisaateststring"

const dealParam_default = {
	"network":"calibration"
}

// adds mock data for satisfying minimum file size
const dealParam_mock = {
	"add_mock_data": 4,
	"network":"calibration"
}

// To ignore a deal parameter set it as null
const dealParam_ignore = {
	"replication_num_copies":null,
	"repair_threshold":null,
	"renewal_threshold":null,
	"network":"calibration"
}

// Default parameters set. All RaaS workers enabled, any miners can take the deal. 2 MiB mock file added.
const response = await lighthouse.upload(path, apiKey, false,dealParam_default);


//this should be used if the user wants to bundle in a 4MiB mock file with their user submission.
const response = await lighthouse.upload(path, apiKey, false, dealParam_mock);

//this needs to be used by the self hosted RaaS module, and the aggregator SDK after the event gets emitted. Turns off all RaaS workers. 2 MiB mock file added.
const response = await lighthouse.upload(path, apiKey, false, dealParam_ignore);
</code></pre>

### Step 3: Understanding PoDSI: Getting the PoDSI for your file

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
curl https://api.lighthouse.storage/api/lighthouse/get_proof?cid=QmS7Do1mDZNBJAVyE8N9r6wYMdg27LiSj5W9mmm9TZoeWp&network=testnet
```

The response, an example of a PoDSI proof on Calibration, should look something like this:

{% code title="PoDSI response" lineNumbers="true" %}
```json
{
    pieceCID:
      'baga6ea4seaqn6s6n3irnz2ewfwlybhpjzrg6i57fzuwletj5sxcv7hz5rauewli',
    dealInfo: [
      {
        dealId: 53078591,
        storageProvider: 'f02620',
        proof: {
          inclusionProof: {
            proofIndex: {
              index: '1ffc08fd',
              path: [
                '624c730d13648b9d386948925afbad6980b3a08dd9db7d8d156ffd0d15f1f724',
                '6f980e8fd5af43732faf137ff24808dc42f15ec07b5671f9c85c899550d7790a',
                'a2f5e3c55a9ff784cc5f39b63846914caf3f0556a65ef6df5847c69df7f30200',
                'a46614cbaee2e1c7ed71e43d3f6d8e9ed0ff4e42422f4347fc1ffd0700e24017',
                'e919844c2aafbfe63ef9dae0990980c66d3f2548b6b3781445055b9221142901',
                'ecbe60a5baf21f07d8f9ae98805149c6e595d7413fc591a86b06e00a0317fc22',
                '7455143f0a3424fab9bc576ace3b6fa95bba4ea59e270fc0a1ed06381ddc9e0b',
                '356e98673a0f1457e405ebe8bb4564cd6b537fde6e22d75d4b986abf2807be05',
                'd29ee6aca59e9b005e74defa05e3edb54e8ecd448b2834635edb3252b516d122',
                '77871a87f00a1d260af0050586833a209ce84fce0f783486a2a64a838abebd03',
                '6eb665702e7b642b5cc4447b6ad5ca7eedb1de773862ca126ad7cc1a81a7fc16',
                'aba5c7451052da6de12715f3f7943a0c65171cd405f296cfdc689f0ae0da950f',
                '98d4f4a746d58a5b14be5ec1ed24f99fe25a7caa55769e6abe88f12bdbb79116',
                '0c90015fc0e88c578510b0be936618deda2cf6e06f41b4f8d386defc6bf39f16',
                'd99887b973573a96e11393645236c17b1f4c7034d723c7a99f709bb4da61162b',
                'd0b530dbb0b4f25c5d2f2a28dfee808b53412a02931f18c499f5a254086b1326',
                '84c0421ba0685a01bf795a2344064fe424bd52a9d24377b394ff4c4b4568e811',
                '65f29e5d98d246c38b388cfc06db1f6b021303c5a289000bdce832a9c3ec421c',
                'a2247508285850965b7e334b3127b0c042b1d046dc54402137627cd8799ce13a',
                'dafdab6da9364453c26d33726b9fefe343be8f81649ec009aad3faff50617508',
                'd941d5e0d6314a995c33ffbd4fbe69118d73d4e5fd2cd31f0f7c86ebdd14e706',
                '514c435c3d04d349a5365fbd59ffc713629111785991c1a3c53af22079741a2f',
                'ad06853969d37d34ff08e09f56930a4ad19a89def60cbfee7e1d3381c1e71c37',
                '39560e7b13a93b07a243fd2720ffa7cb3e1d2e505ab3629e79f46313512cda06',
                'ccc3c012f5b05e811a2bbfdd0f6833b84275b47bf229c0052a82484f3c1a5b3d',
                '7df29b69773199e8f2b40b77919d048509eed768e2c7297b1f1437034fc3c62c',
                'fa668a0a32942239e35c880bc01f031e87d3dd3d5088a325959ef00a2fe4ed00',
                '4c4000f3b62fd9999516e7869f3d3e0c7ca983c0749c8b52f702fb1dae87692f',
                'ec3b81a302915954112ec8a6d455751469252e0ca21319e7215b43d13c7c311c',
              ],
            },
            proofSubtree: {
              index: '9e3',
              path: [
                '1a70519a83a389da68342023f94c0b15bc6f6648bad14e4e27fc2c2d125d3f20',
                'a3c0174ed523fe92d9ddde004b2edfed748160d039246b3d74afccb9a0b0c519',
                'dc478492b1d8a2b1ccc39814ab5015f24b7e3a0fc942a3d48dabda78e1ab2a3f',
                'e3e9663d7b67090385ff0732e29fd20c663e0815c25a11d10da506b248532012',
                'dafdab6da9364453c26d33726b9fefe343be8f81649ec009aad3faff50617508',
                'a77eff48b3368c4d75808dcbc0caf1d403abdd8954aeb643fed17527b557ce24',
                '055300ed6b6526d89f2dcfaf9f59b893bc6cd53c3eaa27876db80830e85b443e',
                '38c3e42a3376c26ea82e920e5e5b052f712ad376ef7999e9d8af035c55bcf20f',
                '4b5cbc0110eb00a5fc1722a2f7a474b619df9c498bb80622f879b6471345521b',
                'db084639887800382d080d44a0fd9818b0344da75a66599e1fc42887ab777035',
                '08ca66a143b334d38a8829247688e45548bf26005401ba9e6350267fb6a7b424',
                '60414c8e87371715a022a4f5928d898a19ced0133b90fe3b8b32726334a24b18',
                'e671e3b30d01a29b2d05632592b36541fa221cb14d9205253896b40b7bcc1700',
                '07406022b338845ccc7a8750cb2e927c5f2c671cae07897f5deab2e4f1bf8905',
              ],
            },
          },
          verifierData: {
            commPc:
              '0181e203922020df4bcdda22dce8962d97809de9cc4de477e5cd2cb24d3d95c55f9f3d88284b2d',
            sizePc: '200000',
          },
          indexRecord: {
            checksum: '2dd9de62dd6433725d537f8c43941a1b',
            proofIndex:
              'df4bcdda22dce8962d97809de9cc4de477e5cd2cb24d3d95c55f9f3d88284b2d',
            proofSubtree: 5307891712,
            size: 2097152,
          },
        },
        aggPieceCID:
          'baga6ea4seaqgcyx3xz23psubfg2c6qzhffa4fuchmydcwzamtpaf5ct46l5nola',
        aggPieceSize: 34359738368,
        aggCarFileSize: 34091302912,
      },
    ],
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

### Step 4: Get your deal ID from your upload

When you upload the picture of your puppy, the on-chain deal that is made to store it on the Filecoin network is assigned a unique deal ID. You can get this deal ID the same way you get the PoDSI for your file. In the above, it would be accessible through `response.data.deal_id`.

> Under the hood, the node infrastructure is working hard to ensure that your file is included on-chain. The process of deal making can take up to about **an hour**.

### Step 5: Download your file using the file’s CID

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
