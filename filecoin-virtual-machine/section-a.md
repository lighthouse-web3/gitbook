# Section A: Upload, PoDSI and Deal ID

## Quickstart: Uploading Your First 🐕 Onto Filecoin

### Upload your first file through the lighthouse SDK

Firstly, you'll need to get a picture of your favorite pupper whose picture you'll want to immortalize on the internet.

![Adapted from https://www.tldraw.com/r/v2_c_M7QpjoG42dpa5c2E4N2hG](../.gitbook/assets/DogDiagram.png)

Think of the lighthouse SDK as a doggy daycare and the RaaS (renew, repair, replication) services as its caretaker. The lighthouse SDK provides a place for your puppy to stay while the services take care of your dog and makes sure it's fed and healthy. In this case, lighthouse provides storage while the RaaS takes care of your file and makes sure it's stored on the Filecoin network permanently. 

The lighthouse SDK is a JavaScript library that allows you to upload files to the Filecoin network. It's open source and available [here](https://github.com/lighthouse-web3/lighthouse-package)

Uploading a file is as simple as:

```javascript
import lighthouse from "@lighthouse-web3/sdk";
// ... other code
const uploadResponse = await lighthouse.upload('/path/to/adorable/dog.jpg', 'YOUR_API_KEY');
```

Previously, if the file of your puppy was too small, it would encounter issues being stored on chain due to size minimums enforced by on-chain deal makers. The SDK helps you get around this by adding mock data to your file to meet the minimum size requirements.

When you upload a file without any RaaS, you've only uploaded one copy of your file to the Filecoin network. There's no guarantee that if the file's deal term expires or is no longer being maintained by the storage provider, that you'll be able to retrieve your file. This is where the RaaS come in.

Replication is the process of making copies of your file and storing them on the Filecoin network. This ensures that if one storage provider goes down, you'll still be able to retrieve your file from another storage provider.

Here's an example of how to upload a file with replication:

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

### Deal Parameters

When uploading a file, you can customize how it's stored in Lighthouse using the **deal parameters**:

**num\_copies**: Decide how many backup copies you want for your file. The Max limit is 3. For instance, if set to 3, your file will be stored by 3 different storage providers.

**repair\_threshold**: Determines the time a storage sector is considered "broken" if a provider fails to confirm they still have your file. It's measured in "epochs", with 28800 epochs being roughly 10 days.

**renew\_threshold**: Specifies when your storage deal should be renewed. It's also measured in epochs.

**miner**: If you have preferred miners, list their addresses here. For testing, it's recommended to use t017840.

**network**: This should always be set to 'calibration' (for RAAS services to function) unless you want to use the mainnet.

**add\_mock\_data**: This field is used to make smaller files reach the minimum file size accepted on the Lighthouse calibration test network (1 MB). If your file is less than the minimum size, `add_mock_data` will append a mock file to ensure it meets the storage requirements. The value indicates the size in MB. For instance, if your file is 256KB, the add\_mock\_data should be set to 2 to the minimum target.

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

```javascript
const path = "/path/to/file.jpg"
const apiKey = "thisisaateststring"



const dealParam_default = {
	"network":"calibration"
}


const dealParam_mock = {
	"add_mock_data": 4,
"network":"calibration"
}

const dealParam_ignore = {
	"replication_num_copies":null,
	"repair_threshold":null,
	"renewal_threshold":null,
	"network":"calibration"
}

//this should do all the correct default things for ODH. All RaaS workers enabled, any miners can take the deal. 2 MiB mock file added.
const response = await lighthouse.upload(path, apiKey, false,dealParam_default);


//this should be used if the user wants to bundle in a 4MiB mock file with their user submission.
const response = await lighthouse.upload(path, apiKey, false, dealParam_mock);

//this needs to be used by the self hosted RaaS module, and the aggregator SDK after the event gets emitted. Turns off all RaaS workers. 2 MiB mock file added.
const response = await lighthouse.upload(path, apiKey, false, dealParam_ignore);
```

**Friendly Tip**: The term "epoch" can be thought of as a time unit in filecoin under which various operations occur like PoST PoRep..., with 2880 epochs being equivalent to a day.

### Understanding PoDSI: Getting the PoDSI for your file

Now that you've registered the picture of your puppy, how would you know that it's actually being maintained on the Filecoin network? This is where the PoDSI comes in. The PoDSI is a proof that your file is being maintained on the Filecoin network. 

**Proof of Data Segment Inclusion (PoDSI)** is like a certificate of authenticity. It assures that your file is safely tucked inside a special package, known as a "deal", made by the aggregator node. This aggregator combines several files, gives them a unique ID, offers proof of their inclusion, and even throws in a mini-proof of the entire package's structure.

The time between upload and being able to get your PoDSI should only be a few minutes. You can get the PoDSI for your file by calling the `getProof` function in one of the following ways:

```javascript
let response = await axios.get("https://api.lighthouse.storage/api/lighthouse/get_proof", {
    params: {
        cid: lighthouse_cid,
        network: "testnet" // Change the network to mainnet when ready
    }
})
```

```bash
# Assumes that uploaded your file to mainnet.
# Alternatively, if you are using testnet, add &network=testnet to the end of the URL.
curl https://api.lighthouse.storage/api/lighthouse/get_proof?cid=<puppy_CID>
```

As a quick example of fetching the PoDSI of a file on testnet, you can use the following command:

```bash
# An example of how to get the PoDSI for a file uploaded to testnet
curl https://api.lighthouse.storage/api/lighthouse/get_proof?cid=QmS7Do1mDZNBJAVyE8N9r6wYMdg27LiSj5W9mmm9TZoeWp&network=testnet
```

The response, an example of a PoDSI proof on Calibration, should look something like this:

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
The "pieceCID" is a content identifier used for referencing data in distributed information systems by it’s contents rather than its location using cryptographic hashing and self-describing formats. A core component of IPFS and IPLD, you can read more about it [here](https://docs.filecoin.io/basics/the-blockchain/proofs/).

The "proof" contains information that can be used to confirm whether your file was included in a specific aggregated data set.

The "dealInfo" provides details about the file's storage deal. If the "dealId" is null, it means that the storage deal has been initiated but the miner hasn't started the sealing process yet.

The "previousAggregates" parameter lists older aggregate IDs for the file, if the file's storage deal has been renewed. You can use these IDs to get more details about previous aggregates. To do this, use the provided API link, substituting the appropriate aggregate ID and network information. 
- For example, to get information about a previous aggregate with the ID '975afcd3-ff3e-4395-a50e-24500ca0bfb7' on the Testnet, you would use the following:
   
```bash
curl https://api.lighthouse.storage/api/lighthouse/aggregate_info?aggregateId=975afcd3-ff3e-4395-a50e-24500ca0bfb7&network=testnet
```

### Get your deal ID from your upload
When you upload the picture of your puppy, the on-chain deal that is made to store it on the Filecoin network is assigned a unique deal ID. You can get this deal ID the same way you get the PoDSI for your file. In the above, it would be accessible through `response.data.deal_id`.

Under the hood, the node infrastructure is working hard to ensure that your file is included on-chain. The process can take up to about **an hour**.

### Download your file using the file’s CID
Now that your file is stored on the Filecoin network, you can retrieve it using the file's CID. You can do this by calling the `download` function in one of the following ways:

```bash
# Assumes that you have lighthouse-cli installed. If not, feel free to download it using 
# npm install -g @lighthouse-web3/sdk
lighthouse-web3 decrypt-file <CID>
```

```javascript
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
```

## Why does all this matter?

We see a bright future in enabling permanent, immutable, decentralized data-storage for developers. 

The interface for the lighthouse SDK is designed to be simple and easy to use. We hope that this will enable developers to easily integrate the Filecoin network as the primary data storage provider for their applications.

More importantly, this enables developers to build novel applications. Imagine a dapp or DAO that can be built to incentivize, analyze and store upload metadata on-chain. There are a couple of examples of this:

- Rewarding $TOKEN based on the upload of a particular file and their CID.
- Being able to track CIDs and deal IDs onchain for verification and airdropping.
- Building more advanced, robust DataDAOs (check out the starter kit [here](https://github.com/filecoin-project/fevm-data-dao-kit)!)

For your consideration, here's some pseudocode of how you could build a simple dapp that rewards users for uploading files to the Filecoin network:

```solidity
function uploadFile(bytes32 fileCID) public {
    // Check if the file has already been uploaded
    require(!fileExists(fileCID), "File already exists");

    // Check if the user's file contains the correct data
    require(verifyPoDSI(fileCID), "File does not contain the correct data");

    // Save the file's CID to prevent against replay attacks
    saveFile(fileCID);

    // Reward the user for uploading the file
    rewardUser(msg.sender);
}
```

## Appendix

For more information, check out the following code examples to upload files:

1. [NodeJS Code Examples](../lighthouse-sdk/code-examples/nodejs-backend/)
2. [Frontend(React, Next..) Code Examples](../lighthouse-sdk/code-examples/browser-frontend/)
3. [Lighthouse File](https://files.lighthouse.storage/)

You can also check out the following documentation to learn more about various other jobs you can register

**Note**: Deal by default using SDK will go to the mainnet unless deal parameters are provided mentioned [here](../javascript/functions/upload.md).

### Appendix: Flow diagram

A full flow diagram of the lighthouse SDK can be found below:

<figure><img src="../.gitbook/assets/Screenshot 2023-07-20 153056.png" alt=""><figcaption></figcaption></figure>

### Appendix: Deal Verification Flow

Deals can be verified on FilFox using the following steps.

#### Steps to Confirm Your File's Inclusion:

#### 1. Use the Contract to Verify:

* Dive into the **verify function** located here: `0x27235FbFee0F5519A8786EA7Fc13258234aC1847`.
* Submit your proof details, specifically: proofSubtree, proofIndex, and verifierData.
* What you'll get in return are two things: "commPa" and "sizePa". Think of these as your file's unique fingerprints.
* **Heads up**: These fingerprints (pieceCID and pieceSize) might look like regular text. You'll need to change them into a code-like format, known as hex, before you compare.

#### 2. Double-Check Your File's Data:

* This verifier data is like a mixed salad of your file combined with others. The first step confirmed that the salad has the right ingredients.
* Now, it's time to be certain that the main ingredient in the salad is indeed your file. Do this by grabbing your file's unique PieceCid and comparing it with the verifier data given.

#### 3. Seal the Deal:

* You're almost done! You've just ensured your file is part of a bigger package that was handed to a miner.
* Need more peace of mind? Head on over to [FilFox](https://filfox.info/en/deal/23410543). Here, just make sure the package's unique tag (the piece cid) aligns with what you've been provided earlier.