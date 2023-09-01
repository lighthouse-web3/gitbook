---
description: >-
  Attaching a RaaS worker on-demand to trigger storage deals for files uploaded
  through the Lighthouse Smart Contract
---

# 🅱 Attaching RaaS (renew, repair, replication) Worker

## <mark style="color:blue;">1) Attaching Lighthouse RaaS Worker</mark>

**RaaS (renew, repair, replication) workers** interact with Lighthouse Smart Contracts to run the RaaS worker on the data stored and submitted to the Smart Contract

{% hint style="info" %}
Uploading via Lighthouse SDK already has a RaaS worker running under the hood tightly coupled with File Upload. This section discusses attaching the RaaS Worker on-demand to your data uploaded via Lighthouse Smart Contract
{% endhint %}

* This will trigger deal-making with the parameters set by developers in RaaS Service
* You can add workers to perform replication, renewal, and repair jobs by having them listen to the `SubmitAggregatorRequest`.

### Step 1: How to Register a RaaS Worker

You can register RaaS workers for any CID (including ones of files you didn't upload) by making a POST request to **`https://calibration.lighthouse.storage/api/register_job`** with your CID as the body of the request as below -&#x20;

```bash
# Example of registering a job
curl -X POST https://calibration.lighthouse.storage/api/register_job \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "cid=QmYSNU2i62v4EFvLehikb4njRiBrcWqH6STpMwduDcNmK6"
```

### Step 2: Check Deal Status

You'll then be able to query the deal's status using the `deal_status` endpoint

```bash
# Example of how to query a job's status using its CID
curl -X GET "https://calibration.lighthouse.storage/api/deal_status?CID=your_CID_here"
```

***

## <mark style="color:blue;">2) Why Does This Matter?</mark>

Building a decentralized application (dApp) or a Decentralized Autonomous Organization (DAO) to incentivize replications, renewals, and repairs of existing data could create a more resilient and economically sustainable data storage ecosystem. Some unique applications include:

* Rewarding $TOKEN for replicating a useful piece CID (deemed valuable by the TOKEN protocol).
* Example: Incentivize one set of users to upload data via Smart Contract (using submit function) and another set to run RaaS workers.

