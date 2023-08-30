---
description: >-
  A concise guide detailing the functionalities and methods within the FVM
  Contract on the Calibration Testnet.
---

# FVM Contract Overview

## The Base and Full RaaS Interfaces

RaaS (renew, repair, replication) interacts with smart contracts to figure out which on-chain data deals to perform its services on. Specifically, it can interact with one of two types of interfaces:

- The Base Interface: A user deploys deploys a smart contract that inherits from [`IAggregatorOracle.sol`](https://github.com/xBalbinus/fevm-data-segment/blob/main/contracts/aggregator-oracle/IAggregatorOracle.sol) which allows them to rely on their own contract deployment to submit and complete data deals.
- The Full Interface: A user relies on an existing FVM contract deployment to submit and complete data deals. Usually, the deployment is verified and maintained by storage infrastructures such as Lighthouse.

Among the two interfaces, some important common features stand out:

<table><thead><tr><th width="69">#</th><th width="196">Function Name</th><th width="174">Purpose</th><th width="155">Key Parameters</th><th>Outcome</th></tr></thead><tbody><tr><td>1</td><td><code>submit</code></td><td>Function that submits a new deal request to the oracle. Critical in all RaaS functionalities.</td><td><code>_cid</code></td><td><code>Event: SubmitAggregatorRequest</code></td></tr><tr><td>2</td><td><code>getAllDeals</code></td><td>Get all deal IDs for a specified cid</td><td><code>_cid</code></td><td><code>Deal[]</code></td></tr><tr><td>3</td><td><code>getActiveDeals</code></td><td>return all the _cid's active dealIds. Critical for replication deals.</td><td><code>_cid</code></td><td><code>Deal[]</code></td></tr><tr><td>4</td><td><code>getExpiringDeals</code></td><td>return all the deals' dealIds if they are expiring within <code>epochs</code>. Critical for renewal and repair jobs.</td><td><code>_cid, epochs</code></td><td><code>Deal[]</code></td></tr></tbody></table>

## Interacting with the Smart Contract

First, you'll need to either:
- Start an instance of the BaseInterface by deploying a contract that inherits from `IAggregatorOracle` (you can do so via. `yarn deploy` in the [RaaS Starter Kit](https://github.com/filecoin-project/raas-starter-kit))
- Or, use an existing instance of the FullInterface located at 
  - **Calibration Testnet**: `0x6ec8722e6543fB5976a547434c8644b51e24785b`

You can then interact with the smart contract by submitting a CID of your choice to the `submit` function. This will create a new deal request that will be picked up by the RaaS services.

```javascript
// contractInstance is the address of the contract you deployed or the FullInterface address above.
const dealStatus = await ethers.getContractAt("DealStatus", contractInstance);
// Submit the CID of the file you want to upload to the Filecoin network in the following way.
await dealStatus.submit(ethers.utils.toUtf8Bytes(newJob.cid));
```

The [RaaS Starter Kit](https://github.com/filecoin-project/raas-starter-kit) actually provides you with a frontend that allows you to upload your file to Lighthouse, get a CID for the uploaded file, then seamlessly submit the CID to the smart contract (accessible via `yarn start`). 

But first, you'll need to know how to register the various RaaS workers. **RaaS functionality will not function automatically if deals are only created using submit function.**

## Add Replication, Renewal, Repair Workers

You can add workers to perform replication, renewal, and repair jobs by having them listen to the `SubmitAggregatorRequest`. The methods for doing so differ between the Base and Full interfaces.

If you are running a base interface (specifically, the one in the [RaaS Starter Kit](https://github.com/filecoin-project/raas-starter-kit)), there's an event listener inside the RaaS service node that you can use to listen for new deal requests.
This event listener performs processing for each job submitted to the contract to add RaaS service workers and eventually to call `complete` on the contract.

```javascript
// Initialize the listener for the Deal Creation event
async function initializeDealCreationListener() {
  const dealStatus = await ethers.getContractAt(contractName, contractInstance);

  /// Logic for handling SubmitAggregatorRequest events
  function handleEvent(transactionId, cid) {
    console.log(`Received SubmitAggregatorRequest event: (Transaction ID: ${transactionId}, CID: ${cid})`);
    // ... other code to handle the event emission

    (async () => {
      // ... other code
      
      // After processing this event, reattach the event listener
      if (dealStatus.listenerCount("SubmitAggregatorRequest") === 0) {
        dealStatus.once("SubmitAggregatorRequest", handleEvent);
      }
    })();
  }

  // Start listening to the first event and recursively handle the next events
  if (dealStatus.listenerCount("SubmitAggregatorRequest") === 0) {
    dealStatus.once("SubmitAggregatorRequest", handleEvent);
  }
}
```

To use this, simply do `yarn service` in the terminal and proceed through the frontend as you normally would - uploading any random file, and then registering the workers using the autocompleted CID that appears in the box. **If you want to register the workers manually for a job that you didn't upload, just simply paste in the known CID of your file into the box and register the jobs anyway**.

With Lighthouse's full interface, you'll have to make a few additions instead to the API call on upload. Recall the process described for uploading a file with replication:

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

For initializing RaaS services via. the full interface, you'll need to add a few more parameters to the `dealParams` object:

```javascript
import lighthouse from "@lighthouse-web3/sdk";
// ... other code

// Deal params should include the settings for RaaS jobs
const dealParams = {
  num_copies: 2,
  repair_threshold: 28800,
  renew_threshold: 240,
};

const uploadResponse = await lighthouse.upload('/path/to/adorable/dog.jpg', 'YOUR_API_KEY', false, dealParams);
```

## Why Does This Matter?
Building a decentralized application (dApp) or a Decentralized Autonomous Organization (DAO) to incentivize replications, renewals, and repairs of existing data could create a more resilient and economically sustainable data storage ecosystem. Some unique applications include:

- Rewarding $TOKEN for the replication of a useful piece CID (deemed valuable by the TOKEN protocol).
- Building perpetual storage solutions with RaaS workers.

## Appendix

For more information, check out the full flow below.

<figure><img src="../.gitbook/assets/Screenshot 2023-07-20 153345.png" alt=""><figcaption></figcaption></figure>

