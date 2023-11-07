---
description: How to Upload Encrypted Files on Lighthouse
---

# 🛡 Upload Encrypted Files

When it comes to storing files on a public network like IPFS (InterPlanetary File System), security is a paramount concern. Anyone across the globe can view files uploaded to IPFS due to its public nature. But what if you could secure your files on this public network? Lighthouse, along with its encryption SDK called **Kavach**, makes this possible. This tutorial will guide you through the steps to securely upload your files to IPFS with encryption.

## **Understanding Lighthouse Encryption with Kavach**

**Kavach** is an Encryption SDK developed by the Lighthouse team. It provides the necessary tools to create decentralized applications with a focus on security, leveraging distributed key shards and threshold cryptography.

### **Features of Kavach:**

* Randomized key shard generation for enhanced security.
* Support for shard keys including private keys and other security keys.
* Key Reconstruction capabilities from shards.
* TypeScript support, offering strong typing for JavaScript developers.
* Optional storage of shards on Lighthouse Encryption Key storage, distributed across 5 nodes for redundancy.

You can find the SDK on GitHub at [https://github.com/lighthouse-web3/encryption-sdk](https://github.com/lighthouse-web3/encryption-sdk).

## **Getting Started with Lighthouse Encryption**

Before we dive into uploading files, you'll need a few things:

1. **API Key**: This is your unique identifier when interacting with Lighthouse services.
2. **Public Key**: A cryptographic key that's paired with a private key. For our purposes, this will be your wallet's public key.
3. **Signed Message**: A message that you've signed with your private key to authenticate your identity.

Let's walk through how to get each of these.

### **Obtaining Your API Key and Public Key**

To start using the Lighthouse services, you need to set up your environment:

1.  Install the Lighthouse SDK globally on your system via npm:

    ```bash
    npm install -g @lighthouse-web3/sdk
    ```
2.  After installation, you can run the Lighthouse CLI tool to access various functions. Use this command to see all available functions:

    ```bash
    lighthouse-web3 --help
    ```
3.  You can get your wallet information by running:

    ```bash
    lighthouse-web3 wallet
    ```

    This will return your wallet's `public address` and the connected network, which will act as your public key for encryption.
4.  If you need to create a new wallet or import an existing one, you can use:

    ```bash
    lighthouse-web3 create-wallet
    ```

    or

    ```bash
    lighthouse-web3 import-wallet
    ```
5.  To obtain a new API key:

    ```bash
    lighthouse-web3 api-key
    ```

### **Signing the Authentication Message**

For server-side signing of the authentication message, you'll need to use the **`ethers.js`** library. This is a secure method to sign messages because it doesn't expose your private key in client-side code.

Here is a step-by-step guide:

1.  **Install `ethers.js`**: Make sure you have the **`ethers.js`** library installed in your project.

    <pre class="language-bash"><code class="lang-bash"><strong>npm install ethers
    </strong></code></pre>
2.  **Use the Signing Function**: Here's the function you can use to sign an authentication message with a user's public and private keys:

    ```javascript
    const { ethers } = require('ethers');
    const lighthouse = require('@lighthouse-web3/sdk'); // Assume this SDK provides the getAuthMessage function

    /**
     * Signs an authentication message using a user's private key.
     *
     * @param {string} publicKey - The user's public key.
     * @param {string} privateKey - The user's private key.
     * @return {Promise<string>} - The signed message.
     */
    const signAuthMessage = async (publicKey, privateKey) => {
      // Initialize ethers provider (assuming you are using a local or hosted Ethereum node)
      const provider = new ethers.JsonRpcProvider('**RPC_ENDPOINT**');

      // Create a new Wallet instance
      const signer = new ethers.Wallet(privateKey, provider);

      // Get the message to sign from Lighthouse (assuming the getAuthMessage function exists and works as expected)
      const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;

      // Sign the message
      const signedMessage = await signer.signMessage(messageRequested);

      return signedMessage;
    };
    ```

    Remember to replace 'RPC\_ENDPOINT' with the URL of your Ethereum node.

## **Uploading Encrypted Files to IPFS**

Once you have your API Key, Public Key, and a Signed Message, you're ready to securely upload your files to IPFS.

### **Using `uploadEncrypted`**

This function will encrypt your file before uploading it to IPFS:

```jsx
async function uploadEncryptedFile(pathToFile, apiKey, publicKey, privateKey) {
  try {
    const signedMessage = await signAuthMessage(publicKey, privateKey);
    const response = await lighthouse.uploadEncrypted(pathToFile, apiKey, publicKey, signedMessage);
    console.log('File uploaded successfully:', response);
    return response;
  } catch (error) {
    console.error('Failed to upload encrypted file:', error);
    throw error;
  }
}
```

### **Using `textUploadEncrypted`**

For text-based content, you may use a similar function:

```jsx
async function uploadEncryptedText(yourText, apiKey, publicKey, privateKey) {
  try {
    const signedMessage = await signAuthMessage(publicKey, privateKey);
    const response = await lighthouse.textUploadEncrypted(yourText, apiKey, publicKey, signedMessage);
    console.log('Text uploaded successfully:', response);
    return response;
  } catch (error) {
    console.error('Failed to upload encrypted text:', error);
    throw error;
  }
}
```

Invoke these function with the necessary parameters:

```jsx
// Call the upload function for files
uploadEncryptedFile(pathToFile, apiKey, publicKey, privateKey);

// or

// Call the upload function for text
uploadEncryptedText(yourText, apiKey, publicKey, privateKey);
```

Remember to refer to the Lighthouse official documentation for further details on the process, additional features, best practices, and to keep up with any updates to the service:

* For a step-by-step guide on how to upload encrypted data and understand authentication with Kavach Encryption, visit the [Kavach Encryption Authentication](https://docs.lighthouse.storage/lighthouse-1/how-to/upload-encrypted-data/kavach-encryption-authentication) documentation.
* To learn more about the available encryption features and how to leverage them in your applications, check out the [Encryption Features](https://docs.lighthouse.storage/lighthouse-1/how-to/encryption-features) section.

Exploring these resources will give you a deeper insight into the encryption process, the principles behind it, and how to effectively use the Lighthouse and Kavach SDKs to secure your data on the decentralized web.

## **Conclusion**

Security in a decentralized environment is complex but crucial, and with tools like Lighthouse and the Kavach encryption SDK, developers are empowered to protect their data while leveraging the benefits of decentralized storage systems like IPFS. Whether you're handling sensitive documents, personal data, or simply ensuring the confidentiality of your digital assets, understanding and implementing robust encryption methods is key. Always stay updated with the latest security practices and integrate them into your development workflow to safeguard your and your users' data integrity.

Happy coding, and stay secure
