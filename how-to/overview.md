---
description: Lighthouse CLI tool to interact with the protocol
---

# 💻 Use CLI Tools

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

<figure><img src="../.gitbook/assets/Screenshot 2023-10-20 195553.png" alt=""><figcaption></figcaption></figure>
