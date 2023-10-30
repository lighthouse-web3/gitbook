---
description: Solana NFT Minting with Lighthouse Storage and Metaplex
---

# 🪙 Minting NFTs on Solana

In this tutorial, we'll demonstrate how to mint an NFT on Solana using the Metaplex library and store associated data on the Lighthouse storage platform. Let's dive in.

### What is Lighthouse?

Lighthouse stands out in the realm of digital storage, offering a perpetual file storage protocol. Traditional models often burden users with recurrent payments and ongoing maintenance, but Lighthouse reshapes this narrative, enabling users to pay once and secure their files indefinitely. Built atop the decentralized capabilities of IPFS and Filecoin, Lighthouse combines the strengths of both to offer features like genuine perpetual storage, robust encryption, a dedicated IPFS gateway for swift file retrieval, payment flexibility across various tokens, and efficient image optimization. Particularly for NFTs on Solana, Lighthouse ensures that digital assets associated with tokens remain accessible and unchanged, offering an optimal solution for projects prioritizing long-term, reliable storage.

### Prerequisites

* Node.js environment
* Solana CLI tools
* A Solana wallet
* QuickNode API endpoint (or another Solana RPC endpoint)
* Lighthouse account and API key

### Initial Setup

#### 1. Install Necessary Dependencies

Install the required libraries:

```bash
yarn add @solana/web3.js @metaplex-foundation/js @lighthouse-web3/sdk dotenv
# or
npm install @solana/web3.js @metaplex-foundation/js @lighthouse-web3/sdk dotenv
```

#### 2. Obtain Lighthouse API Key

There are two primary methods to get an API key from Lighthouse:

#### Method 1: Using Lighthouse SDK and Wallet

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

#### Method 2: Via Lighthouse Web Dashboard

1. Visit [Files-Lighthouse-Storage](https://files.lighthouse.storage/) and click on "Login".
2. Choose a login method and complete the verification steps.
3. Click on "API Key" on the dashboard's left side panel.
4. Name your API key.
5. Copy the provided API key for later use.

#### 3. Save Your API Key

Store your API key in a `.env` file in your project root:

```bash
API_KEY=YOUR_LIGHTHOUSE_API_KEY
```

Ensure to include `.env` in your `.gitignore` to avoid exposing your key.

#### 4. Wallet Setup:

Create a Solana wallet and acquire some Devnet SOL for transaction fees. Save the wallet's secret to `solanawallet.json` in your project directory. Use the [Solana File System Wallet](https://docs.solana.com/wallet-guide/file-system-wallet) (Keypair written to the solanawallet.json) and airdrop some SOL to it. To create a Solana wallet and fund it:

1.  **Install the Solana CLI Tools:** The Solana command-line tools provide several utilities to help you create and manage your Solana wallet.

    ```bash
    sh -c "$(curl -sSfL <https://release.solana.com/v1.10/install>)"
    ```
2.  **Create a Solana Wallet:** Once the installation is complete, you can create your Solana wallet.

    ```bash
    solana-keygen new --outfile solanawallet.json
    ```

    This command will generate a new keypair and save it into solanawallet.json. Make sure to keep your seed phrase in a secure place; it's the only way to recover your wallet.
3.  **Airdrop SOL to Your Wallet:** Before you can start minting or making transactions, you need some SOL in your wallet for transaction fees.

    ```bash
    solana airdrop 1 [WALLET_ADDRESS] --url <https://devnet.solana.com>
    ```

    Replace \[WALLET\_ADDRESS] with your wallet address. This command will airdrop 1 SOL to your wallet from the Solana Devnet.

***

### Minting your NFT

#### 1. Dependencies setup:

At the top of your script, import the necessary libraries, and load environment variable:

```jsx
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import * as fs from "fs";
import secret from "./solanawallet.json";
import * as dotenv from "dotenv";
import lighthouse from "@lighthouse-web3/sdk";
dotenv.config();
```

#### 2. Solana Configuration:

Set up a connection to a Solana RPC node and load your Solana wallet.

```jsx
const QUICKNODE_RPC = "YOUR_SOLANA_RPC_URL";
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);
const WALLET = Keypair.fromSecretKey(new Uint8Array(secret));
```

#### 3. Metaplex Configuration:

Configure the Metaplex library to work with your Solana connection and wallet.

```jsx
const METAPLEX = Metaplex.make(SOLANA_CONNECTION)
  .use(keypairIdentity(WALLET))
  .use(bundlrStorage({
    address: "<https://devnet.bundlr.network>",
    providerUrl: QUICKNODE_RPC,
    timeout: 60000,
  }));
```

#### 4. Configuration Settings:

Specify the settings and attributes for your NFT.

```jsx
const CONFIG = {
  uploadPath: "uploads/",
  imgFileName: "lighthouse.png",
  imgType: "image/png",
  imgName: "Lighthouse_Upload",
  description: "Lighthouse Storage",
  attributes: [
    { trait_type: "Color", value: "Black" },
    { trait_type: "Type", value: "Logo" },
  ],
  sellerFeeBasisPoints: 500, //500 bp = 5%
  symbol: "LHS",
  creators: [{ address: WALLET.publicKey, share: 100 }],
};
```

#### 5. Uploading Files to Lighthouse:

Define a function that uploads files to Lighthouse storage.

```jsx
async function uploadToLighthouse(filePath) {
  const apiKey = process.env.API_KEY;
  const response = await lighthouse.upload(filePath, apiKey);
  const uri = "<https://gateway.lighthouse.storage/ipfs/>" + response.data.Hash;
  return uri;
}
```

#### 6. Create Metadata:

Define a function to generate metadata for your NFT.

```jsx
function createMetadataFile(content) {
  const filePath = "metadata.json";
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  return filePath;
}
```

#### 7. Minting the NFT:

Define a function that uses the Metaplex library to mint an NFT.

```jsx
async function mintNft(metadataUri, name, sellerFee, symbol, creators) {
  const { nft } = await METAPLEX.nfts().create(
    {
      uri: metadataUri,
      name: name,
      sellerFeeBasisPoints: sellerFee,
      symbol: symbol,
      creators: creators,
      isMutable: false,
    },
    { commitment: "finalized" }
  );
  console.log(`   Success!🎉`);
  console.log(
    `   Minted NFT: <https://explorer.solana.com/address/${nft.address}?cluster=devnet`>
  );
}
```

#### 8. Execution:

Define the main function that puts everything together and executes the process.

```jsx
async function main() {
  console.log(
    `Minting ${      CONFIG.imgName    } to an NFT in Wallet ${WALLET.publicKey.toBase58()}.`
  );

  // Upload image and get its URI
  const imgUri = await uploadToLighthouse(
    CONFIG.uploadPath + CONFIG.imgFileName
  );

  // Create metadata content based on provided configuration and image URI
  const metadataContent = {
    name: CONFIG.imgName,
    description: CONFIG.description,
    image: imgUri,
    attributes: CONFIG.attributes,
    properties: {
      files: [
        {
          type: CONFIG.imgType,
          uri: imgUri,
        },
      ],
    },
    sellerFeeBasisPoints: CONFIG.sellerFeeBasisPoints,
    symbol: CONFIG.symbol,
    creators: CONFIG.creators,
  };

  // Create metadata.json file and get its path
  const metadataFilePath = createMetadataFile(metadataContent);

  // Upload metadata.json and get its URI
  const metadataUri = await uploadToLighthouse(metadataFilePath);

  // Delete metadata.json file from local filesystem
  fs.unlinkSync(metadataFilePath);

  // Mint the NFT with the uploaded metadata URI
  mintNft(
    metadataUri,
    CONFIG.imgName,
    CONFIG.sellerFeeBasisPoints,
    CONFIG.symbol,
    CONFIG.creators
  );
}

// Execute the main function
main();
```

### Conclusion

Lighthouse offers a robust decentralized storage solution that integrates seamlessly with blockchain platforms like Solana. When minting NFTs, it's essential to have a reliable storage mechanism for the digital assets, and Lighthouse fits the bill perfectly, ensuring the assets' permanence, integrity, and authenticity.
