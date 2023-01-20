# 🔐 Browser Decrypt File

To get started with file decryption, make sure you already have a file CID that you want to decrypt, or else follow the previous code example => "Browser Encryption Upload"

**Step 1:** **Follow this** [**React documentation**](https://reactjs.org/docs/create-a-new-react-app.html) **and Create a new react app using the following command**&#x20;

```
npx create-react-app lighthouse-app
```

and go into the new repository using

```
cd lighthouse-app
```

**Step 2.1:** **Install the Lighthouse SDK**&#x20;

```
npm i @lighthouse-web3/sdk
```

**Step 2.2:** **Install the ethers library**&#x20;

Also, install the ethers library to trigger wallet-related functions like signing.

```
npm i ethers
```

**Step 3: Copy and paste the following code example into src/App.js file**

The following code will decrypt an image file previously uploaded to Lighthouse with encryption. You need to have a browser wallet like Metamask to sign from your wallet.

**Step 3.1:** Paste the CID of the file you want to decrypt in the `decrypt` function below as the _cid_ variable.&#x20;

```javascript
import React from "react";
import {ethers} from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function App() {

  const [fileURL, setFileURL] = React.useState(null);

  const sign_auth_message = async() =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const publicKey = (await signer.getAddress()).toLowerCase();
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
    const signedMessage = await signer.signMessage(
      messageRequested
    );
    return({publicKey: publicKey, signedMessage: signedMessage});
  }

  /* Decrypt file */
  const decrypt = async() =>{
    // Fetch file encryption key
    const cid = "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"; //replace with your IPFS CID
    const {publicKey, signedMessage} = await sign_auth_message();
    console.log(signedMessage)
    /*
      fetchEncryptionKey(cid, publicKey, signedMessage)
        Parameters:
          CID: CID of the file to decrypt
          publicKey: public key of the user who has access to file or owner
          signedMessage: message signed by the owner of publicKey
    */
    const keyObject = await lighthouse.fetchEncryptionKey(
      cid,
      publicKey,
      signedMessage
    );

    // Decrypt file
    /*
      decryptFile(cid, key, mimeType)
        Parameters:
          CID: CID of the file to decrypt
          key: the key to decrypt the file
          mimeType: default null, mime type of file
    */
   
    const fileType = "image/jpeg";
    const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key, fileType);
    console.log(decrypted)
    /*
      Response: blob
    */

    // View File
    const url = URL.createObjectURL(decrypted);
    console.log(url);
    setFileURL(url);
  }

  return (
    <div className="App">
      <button onClick={()=>decrypt()}>decrypt</button>
      {
        fileURL?
          <a href={fileURL} target="_blank">viewFile</a>
        :
          null
      }
    </div>
  );
}

export default App;
```

**Step 4: As a final step, run the following command to view your react site in the browser**

```
npm start
```

You can now decrypt the file by clicking the decrypt button and signing from the wallet. A **View File** hyperlink will pop up after decryption, and you can successfully view the file.
