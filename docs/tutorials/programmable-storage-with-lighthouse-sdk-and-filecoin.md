---
description: Dive into Programmable storage with Lighthouse & FVM and its use cases
hidden: true
---

# 👩‍💻 Programmable Storage with Lighthouse SDK and Filecoin

#### **Introduction to Programmable Storage**

Programmable storage refers to the ability to integrate and manipulate decentralized data storage through code. Unlike traditional storage solutions, programmable storage allows developers to embed storage operations directly into their applications, enabling more dynamic and flexible data handling. By leveraging blockchain technology and decentralized networks like Filecoin, programmable storage ensures data immutability, transparency, and robustness against single points of failure.

#### **Possible Use Cases:**

* **Decentralized Applications (DApps)**: Store application data in a decentralized manner, ensuring data permanence and censorship resistance.
* **DataDAOs**: Create decentralized autonomous organizations focused on data governance and sharing.
* **Backup and Archival**: Store critical data backups on decentralized networks to ensure long-term availability and protection against data loss.
* **Data DAOs**: Establish decentralized autonomous organizations centered around data governance and sharing.
* **Perpetual Storage**: A mechanism ensuring long-term data storage without fear of loss or deletion.
* **Staking Protocols**: Engage in protocols where users can stake assets for rewards or as part of the storage ecosystem.
* **Replication and Repair Workers**: Automatically replicate and repair stored data to maintain data integrity.
* **Insurance Protocols**: Safeguard your stored data with decentralized insurance, ensuring compensation in case of any loss.

#### **Prerequisites**

* Basic understanding of JavaScript.
* Node.js installed on your machine.
* Lighthouse SDK installed (you can find it [here](https://github.com/lighthouse-web3/lighthouse-package)).

#### **Steps**

#### **1. Setting Up the Lighthouse SDK**

First, you need to integrate the Lighthouse SDK into your project.

```jsx
import lighthouse from "@lighthouse-web3/sdk";
```

#### **2. Uploading a File**

To upload a file to the Filecoin network using the Lighthouse SDK:

```jsx
const uploadResponse = await lighthouse.upload('/path/to/your/file.jpg', 'YOUR_API_KEY');
```

**Note**: Ensure you replace `'YOUR_API_KEY'` with your actual API key. You can obtain one from [https://files.lighthouse.storage/](https://files.lighthouse.storage/).

#### **3. Setting Deal Parameters**

Customize your file storage using deal parameters:

```jsx
const dealParams = {
  num_copies: 2,  // Number of backup copies
  repair_threshold: 28800,  // When a storage sector is considered "broken"
  renew_threshold: 240,  // When your storage deal should be renewed
  miner: ["t017840"],  // Preferred miners
  network: 'calibration',  // Network choice
  add_mock_data: 2  // Mock data size in MB
};
const uploadResponseWithParams = await lighthouse.upload('/path/to/your/file.jpg', 'YOUR_API_KEY', false, dealParams);
```

#### **4. Understanding PoDSI**

Proof of Data Segment Inclusion (PoDSI) assures that your file is safely stored on the Filecoin network.

```jsx
let response = await axios.get("<https://api.lighthouse.storage/api/lighthouse/get_proof>", {
    params: {
        cid: lighthouse_cid,
        network: "testnet"
    }
});
```

#### **5. Retrieving the Deal ID**

After uploading, you can get the unique deal ID for your file:

```jsx
const dealID = response.data.deal_id;
```

***

#### Optional: **Downloading Your File**

To retrieve your file from the Filecoin network:

```jsx
const lighthouseDealDownloadEndpoint = '<https://gateway.lighthouse.storage/ipfs/>';
let downloadResponse = await axios({
    method: 'GET',
    url: `${lighthouseDealDownloadEndpoint}${lighthouse_cid}`,
    responseType: 'stream',
});
```

#### Optional: **Using Lighthouse Smart Contract**

To create a new deal request via a smart contract:

```jsx
const dealStatus = await ethers.getContractAt("DealStatus", contractInstance);
await dealStatus.submit(ethers.utils.toUtf8Bytes(newJob.cid));
```

#### **Conclusion**

By following this tutorial, you've learned how to create a programmable storage solution using the Lighthouse SDK and Filecoin. This enables you to build decentralized applications that leverage the power of the Filecoin network for data storage.
