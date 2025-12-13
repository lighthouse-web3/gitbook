# 🏖️ Pushing File Metadata Onchain

In this section, we will push uploaded file metadata on-chain through the [OnchainCID Contract](https://github.com/lighthouse-web3/Onchain-CID-Contract/blob/main/contracts/OnchainCID.sol). Initially, we will push the file info like filename, filesize, mime-type, etc on-chain followed by updating dealIDs for that CID after a successful deal creation of the file.

Make sure to go through the [quick start](https://docs.lighthouse.storage/lighthouse-1/quick-start) section before proceeding. The complete script can be copied from [here](https://github.com/lighthouse-web3/Onchain-CID-Contract/blob/main/scripts/onchainMetadata.js)

Install and import all the required modules

```jsx
const lighthouse = require("@lighthouse-web3/sdk");
const ethers = require("ethers");
const OnChainCIDabi = require("./utils/abi");
const chainConfig = require("./utils/chainConfig");
require("dotenv").config();
```

Paste the Lighthouse API Key and signing wallet private key

```jsx
const API_KEY = process.env.LIGHTHOUSE_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
```

Declare the Rpc Url and onchainCID contract address either by passing the chain name or pasting it from [chain config](https://github.com/lighthouse-web3/Onchain-CID-Contract/blob/main/scripts/utils/chainConfig.js).

```jsx
const chain = "baseSepolia"; // Update chain here or

// Update rpc and contract address here
const RPC_URL = chainConfig[chain].rpcUrl;
const CONTRACT_ADDRESS = chainConfig[chain].contractAddress;
```

Supported chains include -

* Mainnet - polygon, base, filecoin
* Testnet - polygonAmoy, baseSepolia, calibration

Creating the signer and contract instance

```
const provider = new ethers.JsonRpcProvider(RPC_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, OnChainCIDabi, signer);
```

Now to add a file CID and metadata on-chain, either upload a new file using Lighthouse SDK

```jsx
const filePath = "./uploadSample.txt";
const uploadResponse = await lighthouse.upload(filePath, API_KEY);
console.log("File uploaded to Lighthouse:", uploadResponse);
const cid = uploadResponse.data.Hash;
```

Or paste an uploaded file’s CID

```jsx
const cid = "Qmah99npVfj9WRMfc172Ghk1qKdxF7BTYFLTD9Ph4wseTJ";
```

Retrieve the file info and execute the pushCIDOnchain function

```jsx
const fileInfo = await lighthouse.getFileInfo(cid);

const tx = await contract.pushCIDOnchain(
      cid,
      fileInfo.data.fileName,
      fileInfo.data.fileSizeInBytes,
      fileInfo.data.encryption,
      fileInfo.data.mimeType,
      [] // initial empty dealIDs array
);
await tx.wait();
```

View the file metadata on the chain

```jsx
const details = await contract.getFileDetails(signer.address, cid);
console.log(details)
```

you will get a response like this -

```bash
{
  filename: 'uploadSample.txt',
  size: '71',
  encryption: false,
  mimeType: 'text/plain',
  dealIDs: []
}
```

After the successful deal creation of the file, deal IDs can be updated for that CID. Fetch the deal status and then execute the updateDealID function of the contract.

```jsx
 const dealStatus = await lighthouse.dealStatus(cid)
 
 // aggregating dealIDs
 const dealIds = [];
 dealStatus.data.forEach((sector) => {
    sector.deal.forEach((deal) => {
      dealIds.push(deal.dealId);
    });
 });
  
// update the dealIDs in the contract
const tx = await contract.updateDealID(cid, dealIds);
await tx.wait();
```

Now the file metadata can be viewed again

```jsx
const details = await contract.getFileDetails(signer.address, cid);
console.log(details)
```

This time, the response will include the dealIDs

```bash
{
  filename: 'beanMeUp.jpeg',
  size: '2056258',
  encryption: false,
  mimeType: 'image/jpeg',
  dealIDs: [ '93785930', '93782071', '93877438', '93871617' ]
}
```
