---
description: >-
  Attaching a RaaS worker on-demand to trigger storage deals for files uploaded
  through the Lighthouse Smart Contract
---

# 👷♂ Attaching RaaS (renew, repair, replication) Worker

## <mark style="color:blue;">1) Attaching Lighthouse RaaS Worker</mark>

**RaaS (renew, repair, replication) workers** interact with Lighthouse Smart Contracts to start deal-making for the data submitted using the `submit` function

{% hint style="info" %}
Uploading via Lighthouse SDK already has a RaaS worker running under the hood tightly coupled with File Upload. This section discusses attaching the RaaS Worker on-demand to your data uploaded via Lighthouse Smart Contract
{% endhint %}

Functions and paarameters for RaaS worker are as follows

<table><thead><tr><th width="59">#</th><th width="155">Function Name</th><th width="211">Parameters</th><th width="155">Parameter Info</th><th>Default Value</th></tr></thead><tbody><tr><td>1</td><td><strong>register_job</strong></td><td><code>cid</code></td><td>cid to register</td><td></td></tr><tr><td></td><td></td><td><code>endDate</code></td><td>time at which deal should ideally end</td><td>1 month</td></tr><tr><td></td><td></td><td><code>jobType</code></td><td>renew, replication or all</td><td>all</td></tr><tr><td></td><td></td><td><code>replicationTarget</code></td><td>number of replications</td><td>2</td></tr><tr><td></td><td></td><td><code>aggregator</code></td><td>lighthouse</td><td>lighthouse</td></tr><tr><td></td><td></td><td><code>epochs</code></td><td>how many epochs before deal expiry should deal be renewed</td><td>4</td></tr><tr><td>2</td><td><strong>deal_status</strong></td><td><code>cid</code></td><td>cid to check deal status for</td><td></td></tr></tbody></table>

### Step 1: How to Register a RaaS Worker

You can register RaaS workers for any CID (including ones of files you didn't upload) by making a POST request to **`https://calibration.lighthouse.storage/api/register_job`** with your CID as the body of the request as below -&#x20;

```bash
# Example of registering a job
curl -X POST https://calibration.lighthouse.storage/api/register_job \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "cid=QmYSNU2i62v4EFvLehikb4njRiBrcWqH6STpMwduDcNmK6"
```

or via code

```javascript
const axios = require('axios')

const register_job = async() =>{
    const formData = new FormData();
    const cid = "QmTgLAp2Ze2bv7WV2wnZrvtpR5pKJxZ2vtBxZPwr7rM61a"
    const requestReceivedTime = new Date()
    const endDate = requestReceivedTime.setMonth(requestReceivedTime.getMonth() + 1)
    const replicationTarget = 2
    const epochs = 4 // how many epochs before deal end should deal be renewed
    formData.append('cid', cid)
    formData.append('endDate', endDate)
    formData.append('replicationTarget', replicationTarget)
    formData.append('epochs', epochs)

    const response = await axios.post(
        `https://calibration.lighthouse.storage/api/register_job`,
        formData
    )
    console.log(response.data)
}

register_job()
```

You can refer to this [Code Repository on GitHub](https://github.com/lighthouse-web3/Lighthouse-FVM-Demo/tree/main/scripts)

### Step 2: Check Deal Status

You'll then be able to query the deal's status using the `deal_status` endpoint

```bash
# Example of how to query a job's status using its CID
curl -X GET "https://calibration.lighthouse.storage/api/deal_status?cid=your_CID_here"
```

***

## <mark style="color:blue;">2) Why Does This Matter?</mark>

Building a decentralized application (dApp) or a Decentralized Autonomous Organization (DAO) to incentivize replications, renewals, and repairs of existing data could create a more resilient and economically sustainable data storage ecosystem. Some unique applications include:

* Rewarding $TOKEN for replicating a useful piece CID (deemed valuable by the TOKEN protocol).
* Example use-case of Attaching RaaS Worker on-demand: Incentivize one set of users to upload data via Smart Contract (using the submit function) and another set to run RaaS workers.

