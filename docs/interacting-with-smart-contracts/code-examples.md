# Code Examples

#### Important references:

Lighthouse Smart Contracts -&#x20;

&#x20;   1\. Smart Contract Code - [https://github.com/nandit123/lighthouse/blob/eth-to-fil/contracts/LighthouseV2.sol](https://github.com/nandit123/lighthouse/blob/eth-to-fil/contracts/LighthouseV2.sol)

&#x20;   2\. Rinkeby Contract Address - 0x5e507e4f223364176D0294D1696226f2405f4EeD

&#x20;   3\. Lighthouse Abi - [https://github.com/nandit123/lighthouse/blob/eth-to-fil/contracts/abi/LighthouseV2.json](https://github.com/nandit123/lighthouse/blob/eth-to-fil/contracts/abi/LighthouseV2.json)

### Functions:

* **Store** function requires a cid and config as input parameters and also an optional value pass in ETH for fileCost. The code examples below use ethers.js

{% hint style="info" %}
&#x20;Currently user and applications need to calculate the storage cost on their end to pay to the lighthouse smart contract for the equivalent amount of storage.
{% endhint %}

```javascript
const provider = new ethers.providers.Web3Provider(); // use desired provider here
const signer = provider.getSigner();
const contract = new ethers.Contract(“0x5e507e4f223364176D0294D1696226f2405f4EeD”, lighthouseAbi, provider);
const contractWithSigner = contract.connect(signer);

contractWithSigner.store(cid, config).then(async (res) => {
    console.log(res.hash); // get transaction hash
});
```

* **Request Storage Status** function asks the storage status of a cid to be published on-chain if a filecoin deal was made using that cid previously. This is achieved by an oracle mechanism running in the lighthouse node. This function accepts a cid as input and as a response the Status of that cid containing filecoin deal-Ids and active storage status is stored on-chain in the _statuses_ mapping variable.

```javascript
const provider = new ethers.providers.Web3Provider(); // use desired provider here
const signer = provider.getSigner();
const contract = new ethers.Contract(“0x5e507e4f223364176D0294D1696226f2405f4EeD”, lighthouseAbi, provider);
const contractWithSigner = contract.connect(signer);

contractWithSigner.requestStorageStatus(cid).then(async (res) => {
    console.log(res.hash); // get transaction hash
});
```

### On Chain Variables

Two main on-chain variables are defined as below. You can query these to get the corresponding information.

* requests -&#x20;

```javascript
mapping(address => mapping(string => Content)) public requests;
```

* statuses -&#x20;

```javascript
mapping(string => Status) public statuses;
```
