---
description: 'Token Gating NFTs with Lighthouse: A Step-by-Step guide'
---

# 🔑 Token Gating NFTs

Token gating is a powerful concept in the world of NFTs (Non-Fungible Tokens), enabling creators to grant access to digital content based on NFT ownership. In this tutorial, we'll demonstrate how to implement token gating using Lighthouse, a service that provides decentralized storage solutions on IPFS and Filecoin.

## **Prerequisites**

Before proceeding, make sure you have the following:

* Node.js installed on your system.
* A text editor or IDE to write your code.
* Basic knowledge of JavaScript and Node.js.
* A Lighthouse account with API access.
* Familiarity with NFT minting on EVM chains. If you need to brush up on this, check out Lighthouse's official documentation on [Minting NFTs on EVM Chains](https://docs.lighthouse.storage/lighthouse-1/tutorials/minting-nfts-on-evm-chains).

### **Step 1: Setting Up Your Project**

Start by creating a new directory for your project and initialize a new Node.js application.

```bash
mkdir lighthouse-token-gating
cd lighthouse-token-gating
npm init -y
```

### **Step 2: Installing Dependencies**

Install the necessary Node.js packages.

```bash
npm install dotenv ethers @lighthouse-web3/sdk
```

### **Step 3: Code Setup**

We'll use modern JavaScript (ES6) syntax, which requires us to either save our files with the **`.mjs`** extension or set **`"type": "module"`** in the **`package.json`** file. For this tutorial, we'll choose the former option.

```jsx
import * as dotenv from 'dotenv';
dotenv.config();
import ethers from "ethers";
import lighthouse from '@lighthouse-web3/sdk';
```

### **Step 4: Authenticating with Lighthouse**

Create an authentication function that signs a message using a private key, which is necessary for interacting with the Lighthouse SDK.

```jsx
const signAuthMessage = async (publicKey, privateKey) => {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(privateKey, provider);
  const authMessage = await lighthouse.getAuthMessage(publicKey);
  return await wallet.signMessage(authMessage.data.message);
};
```

### **Step 5: Token Gating Implementation**

Implement the access control function which will be responsible for token gating using NFTs.

```jsx
const tokenGating = async () => {
  const cid = 'YOUR_CONTENT_CID'; // Replace with your content's CID on IPFS.
  const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your wallet's public key.
  const privateKey = process.env.PRIVATE_KEY; // Stored securely in your .env file.

  const conditions = [
    {
      // Define your conditions here based on the token gating requirements.
      id: 1,
      chain: 'Ethereum', // Chain where the NFT resides.
      contractAddress: 'YOUR_NFT_CONTRACT_ADDRESS', // Replace with your NFT's contract address.
      standardContractType: 'ERC721', // ERC721 or ERC1155 depending on your NFT.
      method: 'balanceOf',
      parameters: [
        publicKey, // Address to check the balance for.
      ],
      returnValueTest: {
        comparator: '>',
        value: '0', // The user should own at least one NFT.
      },
    },
  ];

  const aggregator = '([1])'; // Logical aggregator for conditions.

  const signedMessage = await signAuthMessage(publicKey, privateKey);

  // Apply the token gating conditions to your content.
  const response = await lighthouse.applyAccessCondition(
    publicKey,
    cid,
    signedMessage,
    conditions,
    aggregator
  );

  console.log(response);
};

tokenGating().catch(console.error);
```

### **Step 6: Setting Up Environment Variables**

Create a **`.env`** file to securely store your private key and any other sensitive information.

```
# .env file
PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://your_rpc_url_here
```

Be sure to replace **`your_wallet_private_key`** with your actual private key and **`your_rpc_url_here`** with your Ethereum node's RPC URL.

### **Step 7: Running Your Application**

Finally, run your Node.js application to apply the token gating to your content.

```bash
node app.js
```

If everything is set up correctly, your terminal should output a success message indicating that the access control has been applied.

### **Conclusion**

You've now learned how to set up token gating for your NFTs using Lighthouse and Node.js. This method can be expanded to include more complex conditions, enabling a wide array of access control scenarios for your digital content.

Remember that while this tutorial provides the basis for token gating with NFTs, always ensure to test thoroughly and handle user private information with utmost security.

Happy coding!
