---
description: In this example, file owners let only those access a particular file who have minted NFT from contract defined by him in access conditions.
---

# ⬆ Pay per view
**Step 1:**
User uploads file with encryption to lighthouse IPFS node [**Upload Encrypted link**](https://docs.lighthouse.storage/lighthouse-1/lighthouse-sdk/code-examples/nodejs-backend/nodejs-encrypt)
Lighthouse node returns a CID/Hash for the encrypted file.

**Step 2:**
Suppose the user(file owner) wants only people who own NFT from a perticular collection to be able to access the encrypted file, he applies access control to the the encrypted file. For example in case of NFT

```
// If a user owns at least one NFT of a given contract deployed Shardeum chain.
{
    id: 1,
    chain: "shardeum",
    method: "balanceOf",
    standardContractType: "ERC20",
    contractAddress: "0x93a347e0fe192a31a0c81e23b4238489043a97f8",
    returnValueTest: { comparator: ">=", value: "1" },
    parameters: [":userAddress"],
}
```
[Check code example](https://docs.lighthouse.storage/lighthouse-1/lighthouse-sdk/code-examples/nodejs-backend/access-control-node)

After applying the access condition only the user who owns NFT from that particular collection can get access to the file.
Note: access conditions are not only restricted to NFT users can apply custom contract, time based, native token based conditions also

**Step 3:**
[Lighthouse view URL](https://files.lighthouse.storage/viewFile/Qmbgib2DXXYTvXh1o8vgDzi4PiAgqgP98RZyMGB97esh2L) can be used that decrypts the file and displays it at users end or user can code his own decryption and view page referring to given [code example](https://docs.lighthouse.storage/lighthouse-1/lighthouse-sdk/code-examples/browser-frontend/decrypt-file) 
