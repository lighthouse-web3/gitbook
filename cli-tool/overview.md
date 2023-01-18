---
description: Lighthouse CLI tool to interact with the protocol
cover: >-
  https://images.unsplash.com/photo-1569531115477-5e9a74a6a8ca?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxOTcwMjR8MHwxfHNlYXJjaHwzfHxvdmVydmlld3xlbnwwfHx8fDE2NjMwNzI2MTQ&ixlib=rb-1.2.1&q=80
coverY: 0
---

# 📃 Overview

:tools:**Installation**

Install the package globally on your system using our npm package

```
npm install -g @lighthouse-web3/sdk
```

{% hint style="info" %}
in case you had our old package installed, you will need to uninstall that before installing the above package.
{% endhint %}

:x:**To uninstall the old package, run the following command:**

```
npm uninstall -g lighthouse-web3
```

:page\_facing\_up:**Commands**

The following commands are available with the Lighthouse CLI tool

1. `wallet` - Returns public key and connected network
2. `create-wallet` - Creates a new wallet
3. `import-wallet` - Imports an existing wallet
4. `wallet-forget` - Remove previously saved wallet
5. `balance` - Get the current balance of your wallet and data usage
6. `upload` - Upload a file to Lighthouse
7. `upload-encrypted` - Upload an encrypted file
8. `decrypt-file` - Decrypt and download the file
9. `share-file` - Share direct access to the file
10. `revoke-access` - Revoke direct access to the file
11. `status` - Get metadata of a file CID
12. `get-uploads` - Get details of files uploaded
13. `api-key` - Get a new API key

:frame\_photo:**CLI screenshot**

<figure><img src="../.gitbook/assets/Screenshot 2022-09-13 at 6.16.15 PM.png" alt=""><figcaption></figcaption></figure>

### :globe\_with\_meridians:**Switch Chain**

The following smart contract chains are currently supported for payments, verifiable proof -

1. Ethereum (ethereum)
2. Polygon (polygon)
3. Solana (solana)
4. Binance (binance)
5. Fantom (fantom)
6. Mumbai testnet (polygon-testnet)
7. FVM (wallaby-testnet)
8. Fantom Testnet (fantom-testnet)
9. Binance Testnet (binance-testnet)

To switch to a mainnet network, use the following command as an example -

```
lighthouse-web3 --network polygon
```

To switch to a testnet network, use the following command as an example -

```
lighthouse-web3 --network fantom-testnet
```
