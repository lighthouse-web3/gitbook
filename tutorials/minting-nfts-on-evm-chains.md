---
description: 'NFT Creation with Lighthouse: A Step-by-Step Guide'
---

# 🎨 Minting NFTs on EVM Chains

### Introduction to NFTs, IPFS, and Lighthouse

#### What are NFTs?

NFTs, or Non-Fungible Tokens, are unique digital tokens representing ownership or proof of authenticity for specific items or content on the blockchain. They are unique, meaning no two NFTs are identical, each possessing distinct attributes or information.

#### A Glimpse into Lighthouse and IPFS

Lighthouse offers a perpetual file storage solution built atop IPFS and Filecoin. In this enhanced guide, we delve deeper into utilizing Lighthouse for NFT metadata storage, ensuring durability and accessibility.

### A Comprehensive Guide to Creating and Minting an NFT

#### Step 1: Get the Tools

To kickstart the process, ensure the installation and accessibility of these essential tools:

* [Node.js](https://nodejs.org/) installed for executing JavaScript code.
* A cryptocurrency wallet like [MetaMask](https://metamask.io/download.html) for handling Ethereum transactions. Learn how to [retrieve your private key from MetaMask here](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key)
*   To interact with the Ethereum blockchain, you’ll need an API key from Infura. Here’s how to obtain it:

    1. Visit [Infura’s official website](https://infura.io/).
    2. Click on the “Sign Up” button if you are a new user or “Log In” if you already have an account.
    3. Once logged in, go to the Dashboard and click on “Create New Project”.
    4. Enter a name for your project and click "Create".
    5. Upon creation, you'll be provided with the keys and endpoints. The keys include the `PROJECT ID`, `PROJECT SECRET`, and the endpoints for different Ethereum networks.

    Ensure to note down the `PROJECT ID` and `PROJECT SECRET`, and the endpoint URL you intend to use (for example, the Ropsten Testnet URL if you are deploying on the Ropsten network).

#### Step 2: Write Your Smart Contract

Craft a Solidity smart contract to define and manage your NFT. Here is a basic example using OpenZeppelin's libraries for an ERC721 token:

```solidity
// NFT.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("MyNFT", "NFT") Ownable() {
    }

    function createNFT(
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _tokenIds.increment();
        return newTokenId;
    }
}
```

#### Step 3: Compile the Contract

Use Solidity compiler (solc) to compile the contract. Install Solc and other dependecies via npm:

```bash
npm install -g solc npm install @openzeppelin/contracts@4.9.0
```

Compile the contract using the following command:

```bash
solcjs --bin --abi --include-path node_modules --base-path . NFT.sol
```

This will generate the binary and ABI needed to deploy the contract.

#### Step 4: Generate Your Lighthouse API Key

Before proceeding to upload your file to IPFS via Lighthouse, you need an API key. Follow these steps to generate one:

1. Visit [Lighthouse's official website](https://lighthouse.storage/).
2. Click on the “Get Started” or “Login” button.
3. Once logged in, navigate to the "API" section in your account dashboard.
4. Click on “Generate API Key”. You might need to verify your email address if you haven’t already.
5. Label your API key for easy identification and click “Create”. Your new API key will be displayed.
6. Make sure to copy and store your API key in a safe place, as it won’t be shown again.

_**Note**: You can also generate the API key from_ [_CLI_](https://docs.lighthouse.storage/lighthouse-1/how-to/create-an-api-key)

#### Step 5: Upload Your File to IPFS using Lighthouse

Utilize the Lighthouse SDK to upload files to IPFS seamlessly. Remember to replace `'YOUR_API_KEY_HERE'` with your actual Lighthouse API key.

```jsx
// uploadToIPFS.js

import lighthouse from '@lighthouse-web3/sdk';

async function uploadFile() {
const apiKey = 'YOUR_API_KEY_HERE';
const filePath = './path/to/your/file.jpg';
const uploadResponse = await lighthouse.upload(filePath, apiKey);
console.log('File uploaded to IPFS via Lighthouse:', uploadResponse);
}

uploadFile();
```

#### Step 6: Upload Your NFT Metadata

Create a JSON file embedding the file link from the previous step, ensuring your NFT's metadata is well-documented and accessible.

```json
{
    "name": "My NFT",
    "description": "A description of my NFT",
    "image": "<https://gateway.lighthouse.storage/ipns/Qm>....."
}
```

#### Step 7: Deploy the Contract Using Ethers.js on the Mumbai Testnet

Here’s a detailed step using ethers.js to deploy your contract on the Mumbai testnet. Replace `'YOUR_INFURA_PROJECT_ENDPOINT'` and `'YOUR_INFURA_PROJECT_ENDPOINT'` appropriately.

```jsx
// deployContract.js

import { ethers } from 'ethers';
import fs from 'fs';

const contractABI = JSON.parse(fs.readFileSync('.Path/to/the/NFT_sol_NFT.abi').toString());
const bytecode = fs.readFileSync('.Path/to/the/NFT_sol_NFT.bin').toString();
const infuraProjectEndpoint = "YOUR_INFURA_PROJECT_ENDPOINT"

async function deployContract() {
    try {
        const privateKey = 'WALLET_PRIVATE_KEY';
        const provider = new ethers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/${infuraProjectEndpoint}`);
        const wallet = new ethers.Wallet(privateKey, provider);
        const ContractFactory = new ethers.ContractFactory(contractABI, bytecode, wallet);

        const deploymentTransaction = ContractFactory.getDeployTransaction();
        const txResponse = await wallet.sendTransaction(deploymentTransaction);

        console.log('Transaction Hash:', txResponse.hash);

        const receipt = await txResponse.wait();

        console.log('Contract deployed at:', receipt.contractAddress);
    } catch (error) {
        console.error("Deployment failed:", error);
    }
}

deployContract();
```

#### Step 8: Mint Your NFT Using Ethers.js

This step provides an example code snippet to mint your NFT using ethers.js. Adapt the placeholders with actual values.

```jsx
// mintNFT.js

import { ethers } from 'ethers';
import fs from 'fs';

const infuraProjectEndpoint = "YOUR_INFURA_PROJECT_ENDPOINT"

async function mintNFT() {
    const provider = new ethers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/${infuraProjectEndpoint}`);
    const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const contractABI = JSON.parse(fs.readFileSync('./path/to/ABI.json').toString());

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tokenId = await contract.createNFT('YOUR_METADATA_CID_LINK');
    console.log('NFT Minted, Token ID:', tokenId.toString());
}

mintNFT();
```

#### Step 9: Verify Your NFT

To verify your NFT, use a blockchain explorer like [Etherscan](https://sepolia.etherscan.io/). Input your contract address, and explore the transactions and minted NFTs. Each NFT's distinct token ID and ownership records enhance transparency and authenticity.

### Conclusion

This comprehensive guide aims to simplify the process of creating, minting, and verifying NFTs, spotlighting the Lighthouse and IPFS integration for metadata storage. Enjoy your NFT creation journey, exploring the endless possibilities within the digital collectible universe!
