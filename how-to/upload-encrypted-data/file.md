---
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# 📁 File

This example demonstrates uploading files to Lighthouse, which are encrypted at the user's end while it's getting uploaded. The encryption key is split into five parts using BLS cryptography and stored independently in five nodes.

{% tabs %}
{% tab title="JS SDK" %}
#### Method 1: Node JS

```javascript
import lighthouse from '@lighthouse-web3/sdk';

/**
 * This function lets you upload a file to Lighthouse with encryption enabled.
 * 
 * @param {string} path - Location of your file.
 * @param {string} apiKey - Your unique Lighthouse API key.
 * @param {string} publicKey - User's public key for encryption.
 * @param {string} signedMessage - A signed message used for authentication at encryption nodes.
 * 
 * @return {object} - Returns details of the encrypted uploaded file.
 */

const pathToFile = '/home/cosmos/Desktop/wow.jpg';
const apiKey = 'YOUR_API_KEY_HERE';
const publicKey = 'YOUR_PUBLIC_KEY_HERE';
const signedMessage = 'YOUR_SIGNED_MESSAGE_HERE';

const response = await lighthouse.uploadEncrypted(pathToFile, apiKey, publicKey, signedMessage);

console.log(response);
```

#### Method 2: Browser

```javascript
import React, { useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";

function App() {
  const [file, setFile] = useState(null);

  // Define your API Key (should be replaced with secure environment variables in production)
  const apiKey = process.env.REACT_APP_API_KEY;

  // Function to sign the authentication message using Wallet
  const signAuthMessage = async () => {
    // Check for Wallet (e.g., MetaMask) integration
    if (window.ethereum) {
      try {
        // Request user's Wallet account
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length === 0) {
          throw new Error("No accounts returned from Wallet.");
        }
        const signerAddress = accounts[0];

        // Fetch a message from Lighthouse to sign
        const { message } = (await lighthouse.getAuthMessage(signerAddress))
          .data;

        // Use Wallet to sign the fetched message
        const signature = await window.ethereum.request({
          method: "personal_sign",
          params: [message, signerAddress],
        });

        // Return both the signature and signer's address
        return { signature, signerAddress };
      } catch (error) {
        console.error("Error signing message with Wallet", error);
        return null;
      }
    } else {
      console.log("Please install Wallet!");
      return null;
    }
  };

  // Function to upload the encrypted file
  const uploadEncryptedFile = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    try {
      const authResult = await signAuthMessage();
      if (!authResult) {
        console.error("Failed to sign the message.");
        return;
      }

      const { signature, signerAddress } = authResult;

      // Upload the encrypted file with the signed message
      const output = await lighthouse.uploadEncrypted(
        file, // List of array of files
        apiKey,
        signerAddress,
        signature
      );
      console.log("Encrypted File Status:", output);

      // If successful, log the URL for accessing the file
      if (output.data && output.data[0] && output.data[0].Hash) {
        console.log(
          "Visit at https://gateway.lighthouse.storage/ipfs/" +
            output.data[0].Hash
        );
      }
    } catch (error) {
      console.error("Error uploading encrypted file:", error);
    }
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="App">
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadEncryptedFile} disabled={!file}>
        Upload Encrypted File
      </button>
    </div>
  );
}

export default App;
```
{% endtab %}

{% tab title="CLI" %}
```bash
lighthouse-web3 upload-encrypted <path>
```
{% endtab %}
{% endtabs %}
