---
description: Solana NFT Minting with Lighthouse Storage and Metaplex
---

# 🪙 Minting NFTs on Solana

## Solana NFT Minting with Lighthouse Storage and Metaplex

In this tutorial, we'll demonstrate how to mint an NFT on Solana using the Metaplex library and store associated data on the Lighthouse storage platform. Let's dive in.

### What is Lighthouse?

Lighthouse stands out in the realm of digital storage, offering a perpetual file storage protocol. Traditional models often burden users with recurrent payments and ongoing maintenance, but Lighthouse reshapes this narrative, enabling users to pay once and secure their files indefinitely. Built atop the decentralized capabilities of IPFS and Filecoin, Lighthouse combines the strengths of both to offer features like genuine perpetual storage, robust encryption, a dedicated IPFS gateway for swift file retrieval, payment flexibility across various tokens, and efficient image optimization. Particularly for NFTs on Solana, Lighthouse ensures that digital assets associated with tokens remain accessible and unchanged, offering an optimal solution for projects prioritizing long-term, reliable storage.

### Prerequisites

* Node.js environment
* Solana CLI tools
* A Solana wallet
* Lighthouse account and API key

### Initial Setup

**1. Install Necessary Dependencies**

Install the required libraries:

```bash
yarn add @solana/web3.js @metaplex-foundation/js @lighthouse-web3/sdk dotenv fs
# or
npm install @solana/web3.js @metaplex-foundation/js @lighthouse-web3/sdk dotenv fs
```

**2. Obtain Lighthouse API Key**

There are two primary methods to get an API key from Lighthouse:

**Method 1: Using Lighthouse SDK and Wallet**

*   **Set Up Lighthouse SDK and Wallet**

    * Install the SDK globally:

    ```bash
    npm install -g @lighthouse-web3/sdk
    ```

    * Generate a Lighthouse wallet. Safeguard the provided **Public Key** and **Private Key**:

    ```bash
    lighthouse-web3 create-wallet
    ```

    * Obtain the API key:

    ```bash
    lighthouse-web3 api-key --new
    ```

**Method 2: Via Lighthouse Web Dashboard**

1. Visit [Files-Lighthouse-Storage](https://files.lighthouse.storage/) and click on "Login".
2. Choose a login method and complete the verification steps.
3. Click on "API Key" on the dashboard's left side panel.
4. Name your API key.
5. Copy the provided API key for later use.

**3. Wallet Setup:**

Create a Solana wallet and acquire some Devnet SOL for transaction fees. Save the wallet's secret to `solanawallet.json` in your project directory. Use the [Solana File System Wallet](https://docs.solana.com/wallet-guide/file-system-wallet) (Keypair written to the solanawallet.json) and airdrop some SOL to it. To create a Solana wallet and fund it:

1.  **Install the Solana CLI Tools:** The Solana command-line tools provide several utilities to help you create and manage your Solana wallet.

    ```bash
    sh -c "$(curl -sSfL https://release.solana.com/v1.10/install)"
    ```
2.  **Create a Solana Wallet:** Once the installation is complete, you can create your Solana wallet.

    ```bash
    solana-keygen new --outfile solanawallet.json
    ```

    This command will generate a new keypair and save it into solanawallet.json. Make sure to keep your seed phrase in a secure place; it's the only way to recover your wallet. You will also find `pubkey`, this is also your `WALLET_ADDRESS`.
3.  **Airdrop SOL to Your Wallet:** Before you can start minting or making transactions, you need some SOL in your wallet for transaction fees.

    ```bash
    solana airdrop 1 [WALLET_ADDRESS] --url https://api.devnet.solana.com
    ```

    Replace \[WALLET\_ADDRESS] with your wallet address. This command will airdrop 1 SOL to your wallet from the Solana Devnet.

**3. Save Your API Key**

Store your API key in a `.env` file in your project root:

```makefile
API_KEY=your_lighthouse_api_key_here
WALLET_ADDRESS=your_solana_wallet_address_here
```

Ensure to include `.env` in your `.gitignore` to avoid exposing your key.

***

### Minting your NFT

The process of minting your NFT involves preparing your asset files, uploading them to Lighthouse, creating metadata for your NFT, and then using the Metaplex library to mint the NFT on the Solana blockchain.

#### 1. Initialize Environment and Imports:

Set up your script with the necessary imports and load your environment variables.

```js
import fs from 'fs';
import lighthouse from '@lighthouse-web3/sdk';
import { Metaplex, keypairIdentity } from '@metaplex-foundation/js';
import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';
import * as dotenv from 'dotenv';

dotenv.config();
```

#### 2. Upload image to lighthouse:

This function uploads an image file to Lighthouse Storage and returns the URL where the image is accessible.

```js
async function uploadImageToLighthouse(imagePath, apiKey) {
  const imageUploadResponse = await lighthouse.upload(imagePath, apiKey);
  if (!imageUploadResponse.data.Hash) {
    throw new Error('Failed to upload image to Lighthouse');
  }
  return `https://gateway.lighthouse.storage/ipfs/${imageUploadResponse.data.Hash}`;
}
```

#### 3. Upload metadata to lighthouse:

This function first writes the metadata to a local file, then uploads that file to Lighthouse Storage, and returns the URL of the uploaded metadata.

```js
async function uploadMetadataToLighthouse(metadata, apiKey) {
  const metadataFilePath = "./metadata.json";
  fs.writeFileSync(metadataFilePath, JSON.stringify(metadata));
  try {
    const metadataUploadResponse = await lighthouse.upload(metadataFilePath, apiKey);
    if (!metadataUploadResponse.data.Hash) {
      throw new Error('Failed to upload metadata to Lighthouse');
    }
    return `https://gateway.lighthouse.storage/ipfs/${metadataUploadResponse.data.Hash}`;
  } finally {
    fs.unlinkSync(metadataFilePath);
  }
}
```

#### 4. Mint the NFT:

This function mints the NFT on the Solana blockchain using the Metaplex SDK and logs the resulting mint address.

```js
async function mintNFT(metadataUrl, nftMetadata) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync("./solanawallet.json"))));
  
  const metaplex = new Metaplex(connection);
  metaplex.use(keypairIdentity(keypair));

  const mintNFTResponse = await metaplex.nfts().create({
    uri: metadataUrl,
    name: nftMetadata.name,
    sellerFeeBasisPoints: nftMetadata.sellerFeeBasisPoints,
    symbol: nftMetadata.symbol,
  });

  console.log("Minted NFT Address:", mintNFTResponse.nft.mint.address.toString());
  return mintNFTResponse.nft.mint.address.toString();
}
```

#### 5. Orchestrate the Minting Process:

This orchestrator function uses the above helper functions to upload an image and metadata to Lighthouse, then mints the NFT with the uploaded metadata URL.

```js
async function uploadAndMintNFT() {
  const apiKey = process.env.API_KEY;
  const imagePath = "uploads/lighthouse.png"; // Ensure this path is correct
  const nftMetadata = {
    // Replace with your NFT's metadata
    name: "Lighthouse Storage NFT #1",
    symbol: "LSNFT",
    description: "A description about my lighthouse NFT #1",
    sellerFeeBasisPoints: 500,
    externalUrl: "",
    creators: [{ address: process.env.WALLET_ADDRSS, share: 100 }],
  };

  try {
    const imageUrl = await uploadImageToLighthouse(imagePath, apiKey);
    console.log("Image URL:", imageUrl);

    nftMetadata.image = imageUrl;
    nftMetadata.properties = {
      files: [{ uri: imageUrl, type: "image/png" }],
      category: "image",
      creators: nftMetadata.creators,
    };

    const metadataUrl = await uploadMetadataToLighthouse(nftMetadata, apiKey);
    console.log("Metadata URL:", metadataUrl);

    await mintNFT(metadataUrl, nftMetadata);
  } catch (error) {
    console.error("An error occurred during the NFT creation process:", error);
    throw error;
  }
}
```

#### 5. Running the Script:

After defining all functions, call the uploadAndMintNFT() function to start the process. Handle any errors appropriately.

```js
uploadAndMintNFT().catch(console.error);
```

### Complete Script:

Here is the entire script combining all the functions:

```js
import fs from 'fs';
import lighthouse from '@lighthouse-web3/sdk';
import { Metaplex, keypairIdentity } from '@metaplex-foundation/js';
import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';
import * as dotenv from 'dotenv';

dotenv.config();

async function uploadImageToLighthouse(imagePath, apiKey) {
  const imageUploadResponse = await lighthouse.upload(imagePath, apiKey);
  if (!imageUploadResponse.data.Hash) {
    throw new Error('Failed to upload image to Lighthouse');
  }
  return `https://gateway.lighthouse.storage/ipfs/${imageUploadResponse.data.Hash}`;
}

async function uploadMetadataToLighthouse(metadata, apiKey) {
  const metadataFilename = "./metadata.json";
  fs.writeFileSync(metadataFilename, JSON.stringify(metadata));
  try {
    const metadataUploadResponse = await lighthouse.upload(metadataFilename, apiKey);
    if (!metadataUploadResponse.data.Hash) {
      throw new Error('Failed to upload metadata to Lighthouse');
    }
    return `https://gateway.lighthouse.storage/ipfs/${metadataUploadResponse.data.Hash}`;
  } finally {
    fs.unlinkSync(metadataFilename);
  }
}

async function mintNFT(metadataUrl, nftMetadata) {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync("./solanawallet.json"))));
  
  const metaplex = new Metaplex(connection);
  metaplex.use(keypairIdentity(keypair));

  const mintNFTResponse = await metaplex.nfts().create({
    uri: metadataUrl,
    name: nftMetadata.name,
    sellerFeeBasisPoints: nftMetadata.sellerFeeBasisPoints,
    symbol: nftMetadata.symbol,
  });

  console.log("Minted NFT Address:", mintNFTResponse.nft.mint.address.toString());
  return mintNFTResponse.nft.mint.address.toString();
}

async function uploadAndMintNFT() {
  const apiKey = process.env.API_KEY;
  const imagePath = "uploads/lighthouse.png"; // Ensure this path is correct
  const nftMetadata = {
    // Replace with your NFT's metadata
    name: "Lighthouse Storage NFT #1",
    symbol: "LSNFT",
    description: "A description about my lighthouse NFT #1",
    sellerFeeBasisPoints: 500,
    externalUrl: "",
    creators: [{ address: process.env.WALLET_ADDRESS, share: 100 }],
  };

  try {
    const imageUrl = await uploadImageToLighthouse(imagePath, apiKey);
    console.log("Image URL:", imageUrl);

    nftMetadata.image = imageUrl;
    nftMetadata.properties = {
      files: [{ uri: imageUrl, type: "image/png" }],
      category: "image",
      creators: nftMetadata.creators,
    };

    const metadataUrl = await uploadMetadataToLighthouse(nftMetadata, apiKey);
    console.log("Metadata URL:", metadataUrl);

    await mintNFT(metadataUrl, nftMetadata);
  } catch (error) {
    console.error("An error occurred during the NFT creation process:", error);
    throw error;
  }
}

uploadAndMintNFT().catch(console.error);
```

### Conclusion

Lighthouse offers a robust decentralized storage solution that integrates seamlessly with blockchain platforms like Solana. When minting NFTs, it's essential to have a reliable storage mechanism for the digital assets, and Lighthouse fits the bill perfectly, ensuring the assets' permanence, integrity, and authenticity.
