# 📄 Access Control Conditions

Type of Access Control conditions supported&#x20;

1. NFTs and Tokens
   * ERC20
   * ERC721
   * ERC1155
2. Custom Contracts deployed
3. Native chain token (like ETH)
4. Time-based Access

Here are examples of how various access conditions can be applied.

{% code lineNumbers="true" %}
```javascript
// NFT based access
// Example, if a user owns atleast one NFT of given NFT contract deployed on wallaby testnet chain.
{
    id: 1,
    chain: "wallaby",
    method: "balanceOf",
    standardContractType: "ERC721",
    contractAddress: "0x1a6ceedD39E85668c233a061DBB83125847B8e3A",
    returnValueTest: { comparator: ">=", value: "1" },
    parameters: [":userAddress"],
}

// Custom Contract
// Example, If the output of the get function of a given contract deployed on polygon mumbai chain is 1.
{
    id: 1,
    chain: "Mumbai",
    method: "get",
    standardContractType: "Custom",
    contractAddress: "0x019e5A2Eb07C677E0173CA789d1b8ed4384e59A5",
    returnValueTest: {
	comparator: "==",
	value: "1"
    },
    parameters: [],
    inputArrayType: [],
    outputType: "uint256"
}

// Native Token
// Example, If the user owns at least 1 Eth
{
    id: 1,
    chain: "Ethereum",
    method: "getBalance",
    standardContractType: "",
    returnValueTest: {
        comparator: ">=",
	value: "1000000000000000000"
    }
}

// Time-based access
// Example, Can access file if the current block is greater than 133493
{
    id: 1,
    chain: "Optimism",
    method: "getBlockNumber",
    standardContractType: "",
    returnValueTest: {
        comparator: ">",
            value: "133493"
     },
}
```
{% endcode %}
