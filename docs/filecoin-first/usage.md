---
hidden: true
icon: gear-complex
---

# Usage

Filecoin first service will allow users to directly create deal with filecoin miner without uploading file to Lighthouse IPFS. Users need not pay for IPFS usage and directly store their files with Filecoin miners just by providing us with CID.

How to use Filecoin First:

1 - Create an API key

```
// Get authentication message
curl 'https://filecoin-first.lighthouse.storage/api/v1/user/get_auth_message?publicKey=${YOUR_PUBLIC_KEY}'

// Sign the message and call
curl 'https://filecoin-first.lighthouse.storage/api/v1/user/create_api_key?publicKey=${YOUR_PUBLIC_KEY}&signature=${SIGNED_MESSAGE}'
```

2 - Start sending CIDs

```
// Now you just have to start sending CIDs
curl 'https://filecoin-first.lighthouse.storage/api/v1/pin/add_cid?cid=PUT_CID' -H 'Authorization: Bearer API_KEY'
```

3 - Check for Filecoin Deals

Deals can be checked using the same endpoint mentioned in [Filecoin deal](../how-to/check-for-filecoin-deals.md) section of how to. It can take upto 2 days for deals to get created.

4 - File Retrieval

Files can be retrieved form the miner using [Lassie](https://github.com/filecoin-project/lassie) or public gateway like ipfs.io and dweb.link



