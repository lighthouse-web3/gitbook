---
description: Checking Your Wallet Balance with Lighthouse
---

# Get Balance

If you're using the Lighthouse SDK and want to store files, you need to ensure you have sufficient balance in your wallet. Lighthouse supports various chains like MATIC, FTM, BSC, Optimism, and more. This guide will help you understand how to check your wallet's balance easily.

### 1. Why Check Your Wallet Balance?

Before you store files on Lighthouse, you should ensure you have enough tokens in your wallet. This is because file storage on Lighthouse requires tokens from specific blockchain chains.

### 2. Function Overview

Lighthouse provides a straightforward method to fetch the balance of your wallet:

```js
/**
 * Use this function to check the balance of your wallet.
 * 
 * @param {string} publicKey - Your wallet's public key.
 * 
 * @return {object} - An object detailing the wallet's balance.
 */
```

### 3. How to Check Balance: A Simple Guide

Here's a step-by-step example:

```javascript
// First, import the Lighthouse SDK
import lighthouse from '@lighthouse-web3/sdk';

// Use the function to get the balance
const publicKey = 'YOUR_WALLET_PUBLIC_KEY'; // Replace with your public key
const balance = await lighthouse.getBalance(publicKey);

// Display the balance details
console.log(balance);
```

After executing the code, you'll receive a response:

* **dataLimit**: This is the maximum amount of data you can store.
* **dataUsed**: This indicates how much data you've already stored.

Now you'll always know how much balance you have and can manage your file storage on Lighthouse efficiently!
