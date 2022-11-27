# Access Conditions

Here are examples of how various access conditions can be applied.

{% code lineNumbers="true" %}
```javascript
// NFT based access
// If user own atleast one NFT of given contract deployed on bsc test chain.
{
    id: 1,
    chain: "wallaby",
    method: "balanceOf",
    standardContractType: "ERC20",
    contractAddress: "0x1a6ceedD39E85668c233a061DBB83125847B8e3A",
    returnValueTest: { comparator: ">=", value: "1" },
    parameters: [":userAddress"],
}

// Custom Contract
// If output of get function of given contract deployed on matic mumbai chain is 1.
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
// If user own atleast 1 Eth
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

// Time based access
// Can access if current block is greater than 133493
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
