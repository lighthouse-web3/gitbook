---
description: 'Secure File Sharing using Lighthouse SDK: A Step-by-Step Guide'
---

# 🔐 Secure File Sharing

## **Introduction to Secure File Sharing with Lighthouse SDK**

In the realm of decentralized technology and applications, ensuring secure and efficient file-sharing has always been a top priority. Lighthouse, a notable player in this domain, has developed a robust SDK that aids developers in achieving this. This SDK leverages blockchain principles and IPFS, which stands for InterPlanetary File System, to ensure that files shared across networks are not only secure but also immutable and tamper-proof.

## **Why is this important?**

In traditional file-sharing systems, there's a central server where files are stored. This poses several challenges: from server downtimes to the risk of central point failures and vulnerabilities. IPFS and blockchain, as adopted by Lighthouse, circumvent these challenges by storing files across a network, ensuring redundancy and security.

Moreover, with the increasing emphasis on privacy and data protection regulations worldwide, tools like the Lighthouse SDK empower developers to build applications that prioritize user data security. By using encryption and decentralized storage, we can ensure that our users' files remain confidential, accessible only by intended recipients.

## **What will you learn in this tutorial?**

This tutorial will guide you step-by-step on how to integrate the Lighthouse SDK into your Node.js application. By the end, you'll be able to securely share encrypted files with specified recipients, leveraging Lighthouse's decentralized storage and Ethereum's robust authentication mechanisms. Whether you're a seasoned developer or just starting out in the world of decentralized apps, this guide aims to make the process straightforward and intuitive.

**Let's get started by setting the foundation for our file-sharing application!**

## **Preparation:**

### **Prerequisites:**

* Ensure you have Node.js installed. If not, [**download it here**](https://nodejs.org/en/download/).

#### **1. Set Up Lighthouse SDK and Wallet:**

*   Install the SDK globally:

    ```bash
    npm install -g @lighthouse-web3/sdk
    ```
*   Generate a new Lighthouse wallet. Safeguard the provided **`Public Key`** and **`Private Key`**:

    ```bash
    lighthouse-web3 create-wallet
    ```

#### 2. Project Environment Configuration:

*   Create and navigate to a new directory for your endeavour:

    ```bash
    mkdir lighthouse-encryption && cd lighthouse-encryption
    ```
*   Commence a new Node.js project:

    ```bash
    npm init -y
    ```
*   Install the necessary local packages:

    ```bash
    npm install dotenv ethers
    ```

#### 3. Enhancing Security:

* Generate a **`.env`** file within your project directory.
*   Populate **`.env`** with your Lighthouse private key:

    ```makefile
    PRIVATE_KEY=Your_Private_Key
    ```
* To maintain security, add **`.env`** to your **`.gitignore`** file, especially vital if using a version control platform.

***

## **Implementation:**

### **1. Setting the Groundwork:**

Within your project directory:

* Construct a file named **`fileSharing.js`**.

### **2. Import and Initialization:**

In **`fileSharing.js`**, write:

```jsx
import * as dotenv from 'dotenv';
dotenv.config();
import { ethers } from "ethers";
import lighthouse from '@lighthouse-web3/sdk';
```

### **3. Message Signing Function:**

This helper function will assist in the authentication process:

```jsx
const signAuthMessage = async (publicKey, privateKey) => {
  const provider = new ethers.JsonRpcProvider();
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
  const signedMessage = await signer.signMessage(messageRequested);
  return signedMessage;
}
```

### **4. File Sharing Procedure:**

Implement the function to handle file sharing via Lighthouse SDK

_To ensure clarity and simplicity, let's break down the file sharing procedure into three distinct points:_

#### **4.1 Initialize Variables:**

Set up the fundamental variables required for our function. Each variable holds specific data crucial for the operation:

```jsx
const cid = "QmS2NzycJoA7De33qMWwqyE2w3BL1i396qfwZiHBb1KuZh";
// CID: Unique identifier for content on IPFS.

const publicKey = "0x5D62F371206306F1ebd4573803F70772f1153186";
// PublicKey: Your Lighthouse identity.

const privateKey = process.env.PRIVATE_KEY;
// PrivateKey: Secured key for authentication, stored away from the codebase.

const receiverPublicKey = ["0xea447D81825282D3ec02772f1ab045ec6227F3e4"];
// ReceiverPublicKey: Intended recipient's Lighthouse identity.

```

#### **4.2 Authenticate and Sign the Message:**

With our variables set, the next step is to authenticate our actions by signing the message:

```jsx
const signedMessage = await signAuthMessage(publicKey, privateKey);
// SignedMessage: A verified authentication message for security.
```

#### **4.3 Share the File:**

Having our signed message and our initialized variables, we're ready to share our encrypted file securely:

```jsx
const shareResponse = await lighthouse.shareFile(
  publicKey,
  receiverPublicKey,
  cid,
  signedMessage
);
// ShareFile: Lighthouse function to securely share your file.

console.log(shareResponse);
// ResponseOutput: Shows the result of the file-sharing action.

// To view the shared file, navigate to:
// <https://files.lighthouse.storage/viewFile/><cid>
```

In the event of an error or an issue during this process, the catch block will capture and display it for our reference:

```jsx
} catch (error) {
    console.log(error);
}
```

Lastly, initiate the function:

```jsx
shareFile();
```

### **Full Code for Secure File Sharing using Lighthouse SDK:**

```jsx
import * as dotenv from 'dotenv';
dotenv.config();
import { ethers } from "ethers";
import lighthouse from '@lighthouse-web3/sdk';

const signAuthMessage = async (publicKey, privateKey) => {
  const provider = new ethers.JsonRpcProvider();
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
  const signedMessage = await signer.signMessage(messageRequested);
  return signedMessage;
};

const shareFile = async () => {
  try {
    const cid = "QmS2NzycJoA7De33qMWwqyE2w3BL1i396qfwZiHBb1KuZh";
    // CID: Unique identifier for content on IPFS.

    const publicKey = "0x5D62F371206306F1ebd4573803F70772f1153186";
    // PublicKey: Your Lighthouse identity.

    const privateKey = process.env.PRIVATE_KEY;
    // PrivateKey: Secured key for authentication, stored away from the codebase.

    const signedMessage = await signAuthMessage(publicKey, privateKey);
    // SignedMessage: A verified authentication message for security.

    const receiverPublicKey = ["0xea447D81825282D3ec02772f1ab045ec6227F3e4"];
    // ReceiverPublicKey: Intended recipient's Lighthouse identity.

    const shareResponse = await lighthouse.shareFile(
      publicKey,
      receiverPublicKey,
      cid,
      signedMessage
    );
    // ShareFile: Lighthouse function to securely share your file.

    console.log(shareResponse);
    // ResponseOutput: Shows the result of the file-sharing action.

    // Navigate to view the shared file:
    // <https://files.lighthouse.storage/viewFile/><cid>
  } catch (error) {
    console.log(error);
  }
};

shareFile();
```

### **5. Running the Script:**

Execute the script:

```bash
node fileSharing.js
```

Observe the file-sharing response and ensure you can access the CID link to validate the secure file sharing.

## **Wrap-Up:**

Congratulations! You've adeptly shared an encrypted file using the Lighthouse SDK. Always prioritize the security of your private and API keys.
