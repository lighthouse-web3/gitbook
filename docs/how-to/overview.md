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

<figure><img src="/img/Screenshot 2023-10-20 195553.png" alt=""><figcaption></figcaption></figure>

## Go SDK CLI Tool

The Lighthouse Go SDK includes a CLI tool (`lhctl`) that you can install directly from the published Go module.

:tools:**Installation**

Install the CLI tool using Go:

```
go install github.com/lighthouse-web3/lighthouse-go-sdk/cmd/lhctl@latest
```

This will install `lhctl` to your `$GOPATH/bin` or `$GOBIN` directory. Make sure this directory is in your `PATH` to use it directly.

Alternatively, if you prefer to build from source:

```
git clone https://github.com/lighthouse-web3/lighthouse-go-sdk.git
cd lighthouse-go-sdk
go build -o lhctl ./cmd/lhctl
```

**Authentication**

Set your API key in the environment before running commands:

```
export LIGHTHOUSE_API_KEY=YOUR_API_KEY
```

:page\_facing\_up:**Commands**

1. **Upload a file**

```bash
lhctl --upload ./path/to/file
```

2. **List uploaded files**

```bash
lhctl --list
```

With pagination cursor (from previous output):

```bash
lhctl --list --last-key <cursor>
```

3. **Get file info by CID**

```bash
lhctl --info <cid>
```

4. **Delete a file by ID (use --list to find IDs)**

```bash
lhctl --delete <id>
```

5. **Check Filecoin deal status by CID**

```bash
lhctl --deals <cid>
```

6. **IPNS - Handle Mutable Data**

**Generate a key:**

```bash
lhctl --ipns-generate <keyName>
```

This will return an IPNS Name (hash) and IPNS ID. Use the IPNS Name for publish and remove operations.

**Publish a CID to a key:**

```bash
lhctl --ipns-publish <cid>:<ipnsName>
```

**Note:** Use the IPNS Name (hash) returned from `--ipns-generate` or shown in `--ipns-list`, not the original `keyName`.

**List keys:**

```bash
lhctl --ipns-list
```

**Remove a key:**

```bash
lhctl --ipns-remove <ipnsName>
```

**Note:** Use the IPNS Name (hash) from `--ipns-list`, not the original `keyName`.

#### **CLI Commands**

Run the following command to see all available commands:

```bash
lhctl --help
```

<figure><img src="/img/go-cli.png" alt=""><figcaption></figcaption></figure>
