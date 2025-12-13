---
hidden: true
---

# 👮‍♀️ Self Hosted RaaS

Alternatively, developers can also self-host their own RaaS (Repair, Replication, Renewal worker).&#x20;

A user deploys a smart contract that inherits from [`IAggregatorOracle.sol`](https://github.com/xBalbinus/fevm-data-segment/blob/main/contracts/aggregator-oracle/IAggregatorOracle.sol) (refer [here](https://github.com/filecoin-project/raas-starter-kit/tree/main/contracts/interfaces)) which allows them to rely on their own contract deployment to submit and complete data deals.

#### Interacting with the Smart Contracts

Start an instance of the self-hosted RaaS by deploying a contract that inherits from `IAggregatorOracle` (`yarn deploy` in the [RaaS Starter Kit](https://github.com/filecoin-project/raas-starter-kit))

The [RaaS Starter Kit](https://github.com/filecoin-project/raas-starter-kit) comes with a frontend that allows you to upload your file to Lighthouse, get a CID for the uploaded file, then seamlessly submit the CID to the smart contract (accessible via `yarn start`).

![RaaS Starter Kit Frontend](/img/Frontend.png)

If you're hosting your own RaaS service (specifically, the one in the [RaaS Starter Kit](https://github.com/filecoin-project/raas-starter-kit)), there's an event listener inside that you can use to listen for new deal requests.

To use this, do `yarn service` in the terminal and proceed through the frontend as you normally would - uploading any random file and then registering the workers using the autocompleted CID that appears in the box.&#x20;

If you want to register the workers manually for a job that you didn't upload, simply paste in the known CID of your file and register the jobs anyway.\
\
Hosting your own Raas would give you freedom to configure many specs along with using different aggregator as well.

For more information on self-hosting RaaS, check out the [RaaS Starter Kit README](https://github.com/filecoin-project/raas-starter-kit#readme).
