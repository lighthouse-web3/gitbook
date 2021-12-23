# import-wallet

Used to import an existing wallet to CLI

1. To import using the private key

```
lighthouse-web3 import-wallet --key <private_key>
```

&#x20; 2\. To import using wallet file

```
lighthouse-web3 import-wallet --path <path_to_wallet_file>
```

The wallet file is a json with the following format

```
{
    "privateKey": "<private_key>",
    "publicKey": "<public_key>"
}
```

