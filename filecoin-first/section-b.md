---
description: >-
  Attaching a RaaS worker on-demand to trigger storage deals for files uploaded
  through the Lighthouse Smart Contract
hidden: true
---

# 👷‍♂️ RaaS (renew, repair, replication) Smart Contracts

In this section B, we will discuss following:

1. [Upload via Lighthouse Smart contracts](section-b.md#id-1-upload-via-lighthouse-smart-contract)
   * [Smart Contract Interface](section-b.md#smart-contract-interface)
   * [Calling SubmitRaaS Functions](section-b.md#calling-submitraas-function)
   * [Lighthouse Raas Specs](section-b.md#lighthouse-raas-specs)
2. [Building Dapps with RaaS contracts](section-b.md#id-2-building-dapps-with-raas-contracts)
3.  [Why does all this matter?](section-b.md#id-3-why-does-all-this-matter)



## 1<mark style="color:blue;">) Upload via Lighthouse Smart Contract</mark>

In this method, we will pass a cid to Lighthouse Smart Contract deployed on the following address

* **Mainnet:** [`0xd928b92E6028463910b2005d118C2edE16C38a2a`](https://filfox.info/en/address/0xd928b92E6028463910b2005d118C2edE16C38a2a?t=3)
* **Calibration Testnet**: [`0x4015c3E5453d38Df71539C0F7440603C69784d7a`](https://calibration.filfox.info/en/address/0x4015c3E5453d38Df71539C0F7440603C69784d7a?t=3)

The source code for this contract can be found [here](https://github.com/lighthouse-web3/raas-starter-kit/blob/main/contracts/DealStatus.sol)\


{% hint style="success" %}
You can directly interact with these deployed verified contracts directly from filfox by clicking on contract links above.
{% endhint %}

### Smart Contract Interface

Within the smart contract interface, some important features are critical to the RaaS service. These include:

<table><thead><tr><th width="59">#</th><th width="178">Function Name</th><th width="233">Purpose</th><th width="229">Key Parameters</th><th>Outcome</th></tr></thead><tbody><tr><td>1</td><td><code>submit</code></td><td>Function that submits a new deal request to the oracle and will creates a new deal. By default, there will be no renewals and replications for this deal</td><td><code>_cid</code></td><td><code>Event: SubmitAggregatorRequest</code></td></tr><tr><td>2</td><td><code>submitRaaS</code></td><td>Function that submits a new deal request to the oracle and will creates a new deal. Here user can define deal parameters.</td><td><code>_cid,</code><br><code>_replication_target,</code><br><code>_repair_threshold,</code><br><code>_renew_threshold</code></td><td><code>Event:SubmitAggregatorRequestWithRaaS</code></td></tr><tr><td>3</td><td><code>getAllDeals</code></td><td>Get all deal IDs for a specified cid</td><td><code>_cid</code></td><td><code>Deal[]</code></td></tr><tr><td>4</td><td><code>getActiveDeals</code></td><td>return all the _cid's active dealIds. Critical for replication deals.</td><td><code>_cid</code></td><td><code>Deal[]</code></td></tr><tr><td>5</td><td><code>getExpiringDeals</code></td><td>return all the deals' dealIds if they are expiring within <code>epochs</code>. Critical for renewal and repair jobs.</td><td><code>_cid, epochs</code></td><td><code>Deal[]</code></td></tr></tbody></table>

### Calling SubmitRaaS Functions

You can interact with the smart contract by submitting a CID of your choice to the `submitRaaS` function. This will create a new deal request that the Lighthouse RaaS Worker will pick up and initiate deals.

{% code lineNumbers="true" %}
```javascript
// contractInstance is the address of the contract you deployed or the aggregator-hosted RaaS address above.
const dealStatus = await ethers.getContractAt("DealStatus", contractInstance);
// Submit the CID of the file you want to upload to the Filecoin network in the following way.
await dealStatus.submitRaaS(ethers.utils.toUtf8Bytes(newJob.cid), 2, 4, 40);
```
{% endcode %}

### Lighthouse Raas Specs

We have deployed universal RaaS node which can be used by anyone through smart contracts. \
Thus, there are few things to be kept in mind while working with our RaaS implementation:-

* The params for renewal and repair have been decided by lighthouse universally for all the deals, thus giving different params would not modify those params. This is done to handle these jobs together easily for large number of cids.
* The cid uploaded for raas service must be pinned to IPFS so as to be retrieved by Lighthouse Deal Engine to execute raas jobs.
* Their is maxReplication param in LighthouseDealStatus contract which is currently set to 2 for both Calibrationnet testnet and Filecoin Mainnet. This means that you can only replicate your deal to 2 different miners using Lighthouse Raas service. This would be increased soon.

{% hint style="info" %}
You can remove these constraints and even configure new features in RaaS through Self Hosted Raas discussed in[ Appendix E](self-hosted-raas.md)
{% endhint %}

## <mark style="color:blue;">2) Building Dapps with RaaS contracts</mark>&#x20;

You can build Dapps using Raas Contracts using our `ILighthouseDealStatus` provided [here](https://github.com/lighthouse-web3/raas-starter-kit/blob/main/contracts/interfaces/ILighthouseDealStatus.sol).\
\
For reference , look at following pseudocode

<pre class="language-solidity"><code class="lang-solidity"><strong>contract SampleContract {
</strong>    ILighthouseDealStatus public dealStatus;
    // initialize with lighthouse deployed contract
    constructor(address _dealStatus) {
        dealStatus = ILighthouseDealStatus(_dealStatus);
    }

    function demoSubmitRaaS(
        bytes memory _cid,
        uint256 _replication_target,
        uint256 _repair_threshold,
        uint256 _renew_threshold
    ) public returns (uint256) {
        uint256 result = dealStatus.submitRaaS(_cid, _replication_target, _repair_threshold, _renew_threshold);
        // Handle the result with dapp logic
        return result;
    }

    function demoGetAllCIDs() public view returns (bytes[] memory) {
        bytes[] memory cids = dealStatus.getAllCids();
        // Handle the cids with dapp logic.
        return cids;
    }
}
</code></pre>



We look forward to developers developing some cool dapps using our RaaS Contracts 🙂🤩\


## <mark style="color:blue;">3) Why does all this matter?</mark>

We see a bright future in enabling programmable, immutable, decentralized data storage for developers.

Lighthouse SDK is designed to be simple and easy to use. We hope that this will enable developers to easily integrate the Filecoin network as the primary data storage layer for their applications.

More importantly, this enables developers to build novel applications. Imagine a dapp or DAO that can be built to incentivize, analyze and store upload metadata on-chain. There are a couple of examples of this:

* Rewarding $TOKEN based on the upload of a particular file and their CID.
* Being able to track CIDs and deal IDs onchain for verification and airdropping.
* Building more advanced, robust DataDAOs (check out the starter kit [here](https://github.com/filecoin-project/fevm-data-dao-kit)!)

For your consideration, here's some pseudocode of how you could build a simple dapp that rewards users for uploading files to the Filecoin network:

```solidity
function uploadFile(bytes32 fileCID) public {
    // Check if the file has already been uploaded
    require(!fileExists(fileCID), "File already exists");

    // Check if the user's file contains the correct data
    // The logic in verifyPoDSI() depends on your specific application
    // Check out the various possibilities here https://docs.filecoin.io/smart-contracts/developing-contracts/solidity-libraries/
    require(verifyPoDSI(fileCID), "File does not contain the correct data");

    // Save the file's CID to prevent against replay attacks
    saveFile(fileCID);

    // Reward the user for uploading the file
    // You can mint them a token or send them some $FIL 
    // Read more here: https://docs.filecoin.io/smart-contracts/developing-contracts/ethereum-libraries/#example-using-an-erc20-contract
    rewardUser(msg.sender);
}
```
