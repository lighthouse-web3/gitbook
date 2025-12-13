---
description: Type of Access Control conditions supported
---

# 📃 Access Control Conditions

1. NFTs and Tokens
   * ERC20
   * ERC721
   * ERC1155
2. Custom Contracts deployed
3. Native chain token (like ETH)
4. Time-based Access

Here are examples of how various access conditions can be applied.

### 1. EVM Conditions

{% code lineNumbers="true" %}
```javascript
/*
    id here represent condition number
    chain is the blockchain network on which conditions should be applied
    method is the name of the function to invoke
    standardContractType is the type of contract, can be ERC20, ERC1155, ERC721 or Custom
    returnValueTest is what to test from functions response >, ==, < 
    parameters if the function takes any parameter as input mention it
    inputArrayType type of parameter that the function is taking as input
    outputType is the type of response returned by the function
*/

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

### 2. Solana Conditions

{% code lineNumbers="true" %}
```javascript
/*
    id here represent condition number
    chain is the blockchain network on which conditions should be applied (DEVNET,TESTNET,MAINNET)
    method is the name of the function to invoke (  getBlockHeight,getBalance,getLastBlockTime,getTokenAccountsByOwner)
    standardContractType is the type of contract, can be spl-token or custom.

    In case of spl-token , pdaInterface is also passed to the condition object with parameter (selector and offset)
    returnValueTest is what to test from functions response >, ==, < 
    parameters if the function takes any parameter as input mention it
    inputArrayType type of parameter that the function is taking as input
    outputType is the type of response returned by the function
*/

//balance condition
{
   id: 1,
   chain: "DEVNET",
   method: "getBalance",
   standardContractType: "",
   contractAddress: "<address>",
   returnValueTest: { comparator: ">=", value: "1" },
   parameters: [":userAddress"],
}

//spl-token condition

{
   id: 1,
   chain: "DEVNET",
   method: "getTokenAccountsByOwner",
   standardContractType: "spl-token",
   contractAddress: "<address>",
   pdaInterface: { selector: "amount", offset: "0" },
 returnValueTest: { comparator: ">=", value: "1" },
   parameters: [":userAddress"],
}
```
{% endcode %}

### 3. Coreum Conditions

{% code lineNumbers="true" %}
```javascript
/*
    id here represent condition number
    chain is the blockchain network on which conditions should be applied (Coreum_Mainnet,Coreum_Testnet,Coreum_Devnet)
    method is the name of the function to invoke (  getFtsByAddress,getNftsByAddress,getLastBlockTime)
    standardContractType is the type of contract, can only be custom || "".

    In case of getNftsByAddress, classid is passed instead of contractAddress. 
    In case of getFtsByAddress, denom is passed instead of contractAddress.
 
    returnValueTest is what to test from functions response >, ==, < 
    parameters if the function takes any parameter as input mention it
    inputArrayType type of parameter that the function is taking as input
    outputType is the type of response returned by the function
*/

//getFtsByAddress condition


{
   id: 1,
   chain: "Coreum_Mainnet",
   method: "getFtsByAddress",
   standardContractType: "",
   denom : "ucore",
   returnValueTest: { comparator: ">=", value: "1" },
   parameters: [":userAddress"],
}

//getNftsByAddress condition


{
   id: 1,
   chain: "Coreum_Mainnet",
   method: "getNftsByAddress",
   standardContractType: "",
   classid: "nft_classid",
   returnValueTest: { comparator: ">=", value: "1" },
   parameters: [":userAddress"],
}
```
{% endcode %}

### 4. Radix Conditions

{% code lineNumbers="true" %}
```javascript
/*
    id here represent condition number
    chain is the blockchain network on which conditions should be applied (Radix_Mainnet)
    method is the name of the function to invoke (getFtsByAddress,getNftsByAddress)
    standardContractType is the type of contract, can only be custom || "".

    In case of getNftsByAddress, resourceAddress represents the contract address of the NFT. 
    In case of getFtsByAddress, resourceAddress represents the contract address of the Token 
    (eg. resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd
for xrd mainnet )
 
    returnValueTest is what to test from functions response >, ==, < 
    parameters if the function takes any parameter as input mention it
    inputArrayType type of parameter that the function is taking as input
    outputType is the type of response returned by the function
*/

//getFtsByAddress condition

{
  id: 1,
  chain: "Radix_Mainnet",
  method: "getFtsByAddress",
  standardContractType: "",
  resourceAddress : "resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd",
  returnValueTest: { comparator: ">=", value: "1" },
}

```
{% endcode %}
