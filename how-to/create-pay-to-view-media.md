---
description: >-
  In this example, file owners let only those who access a particular file who
  have minted NFT from the contract defined by the owner in access conditions.
---

# 💸 Create Pay to View Media

**Step 1:** The user uploads an encrypted file to the Lighthouse IPFS node. Refer to this NodeJS [Encryption Upload](../javascript/code-examples/nodejs-encrypt.md) **** or ReactJS [Browser Encryption Upload](../javascript/code-examples/browser-with-encryption.md) code example**.**&#x20;

Lighthouse node returns an IPFS CID/Hash for the encrypted file.



**Step 2:** Suppose the user(file owner) wants only people who buy an NFT from a particular collection to access the encrypted file; he applies access control to the encrypted file.&#x20;

For example, in the case of NFT

```
// If a user owns at least one NFT of a given contract deployed on the Shardeum chain.
{
    id: 1,
    chain: "shardeum",
    method: "balanceOf",
    standardContractType: "ERC721",
    contractAddress: "0x93a347e0fe192a31a0c81e23b4238489043a97f8",
    returnValueTest: { comparator: ">=", value: "1" },
    parameters: [":userAddress"],
}
```

[Check code example](https://docs.lighthouse.storage/lighthouse-1/lighthouse-sdk/code-examples/nodejs-backend/access-control-node)

After applying the access condition, only the user who owns NFT from that particular collection can get access to the file.&#x20;

Note: access conditions are not only restricted to NFT. Users can apply custom contracts, time-based, and native token-based conditions also.

****

**Step 3:** [Lighthouse view URL](https://files.lighthouse.storage/viewFile/Qmbgib2DXXYTvXh1o8vgDzi4PiAgqgP98RZyMGB97esh2L) can be used to view the encrypted file and displays it at the user end, or the user can build a custom decryption view page, refer to this [code example](https://docs.lighthouse.storage/lighthouse-1/lighthouse-sdk/code-examples/browser-frontend/decrypt-file).



**Step 4:** NFT can also be made a soul-bound token (SBT) so that the owner is not able to transfer to any other address
