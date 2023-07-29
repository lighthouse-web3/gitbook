---
description: Lighthouse CLI tool to interact with the protocol
cover: >-
  https://images.unsplash.com/photo-1569531115477-5e9a74a6a8ca?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxOTcwMjR8MHwxfHNlYXJjaHwzfHxvdmVydmlld3xlbnwwfHx8fDE2NjMwNzI2MTQ&ixlib=rb-1.2.1&q=80
coverY: 0
---

# 📃 Overview

:tools:**Installation**

Install the npm package globally on your system

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

Run the following command in your CLI to see every function

```
lighthouse-web3 --help
```

The following commands are available with the Lighthouse CLI tool

1. `wallet` - Returns wallet public address and connected network
2. `create-wallet` - Creates a new wallet
3. `import-wallet` - Imports an existing wallet
4. `wallet-forget` - Remove previously saved wallet
5. `reset-password` - Change your password
6. `balance` - Get the current balance of your wallet and data usage
7. `upload` - Upload a file
8. `upload-encrypted` - Upload a file with encryption
9. `decrypt-file` - Decrypt and download the file
10. `share-file` - Share direct access to the file
11. `revoke-access` - Revoke direct access to the file
12. `deal-status` - Get storage Filecoin deal status
13. `get-uploads` - Get details of files uploaded
14. `api-key` - Get a new API key

:frame\_photo:**CLI Commands**

<figure><img src="../.gitbook/assets/Screenshot 2023-01-18 at 4.12.21 PM.png" alt=""><figcaption><p>Lighthouse CLI Commands</p></figcaption></figure>

:globe\_with\_meridians:**Switch Chain**

The following smart contract chains are currently supported for payments, verifiable proof, encryption, and access control -

**Mainnet**

1. Ethereum (ethereum)
2. Polygon (polygon)
3. Solana (solana)
4. Binance (binance)
5. Fantom (fantom)
6. Optimism (optimism)
7. To support any other chain, ping us on [Lighthouse Discord](https://discord.com/invite/c4a4CGCdJG)

**Testnets**

1. Mumbai Testnet (polygon-testnet)
2. FantomTest (fantom-testnet)
3. BSCTest (binance-testnet)
4. Optimism Testnet Kovan (optimism-testnet)&#x20;
5. OptimismGoerli (optimism-testnet)
6. Shardeum Liberty 2.x
7. Calibration (Filecoin-testnet)
8. Goerli
9. Rinkeby

To switch to a mainnet network, use the following command as an example -

```
lighthouse-web3 --network polygon
```

To switch to a testnet network, use the following command as an example -

```
lighthouse-web3 --network fantom-testnet
```
