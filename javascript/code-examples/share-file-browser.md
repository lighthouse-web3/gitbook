# 🤝 Share Private File

To get started with sharing the private files, make sure you already have a file CID that you want to share, or else follow a previous code example => "Browser Encryption Upload"

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

**Step 3.1:** Paste the CID of the file you want to decrypt in the `shareFile` function below as the _cid_ variable.&#x20;

**Step 3.2:** Paste the wallet address of the user to share the file to in the `shareFile` function below as _publicKeyUserB_ variable

```javascript
import React from "react";
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function App() {

  const signAuthMessage = async() =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const publicKey = (await signer.getAddress()).toLowerCase();
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
    const signedMessage = await signer.signMessage(
      messageRequested
    );
    return({publicKey: publicKey, signedMessage: signedMessage});
  }

  const shareFile = async() =>{
    const cid = "QmVkbVeTGA7RHgvdt31H3ax1gW3pLi9JfW6i9hDdxTmcGK";

    // Then get auth message and sign
    // Note: the owner of the file should sign the message.
    const {publicKey, signedMessage} = await signAuthMessage();

    const publicKeyUserB = ["0x201Bcc3217E5AA8e803B41d1F5B6695fFEbD5CeD"];
    
    const res = await lighthouse.shareFile(
      publicKey,
      publicKeyUserB,
      cid,
      signedMessage
    );

    console.log(res)
    /*
      data: {
        cid: "QmTTa7rm2nMjz6wCj9pvRsadrCKyDXm5Vmd2YyBubCvGPi",
        shareTo: ["0x201Bcc3217E5AA8e803B41d1F5B6695fFEbD5CeD"],
        status: "Success"
      }
    */
    /*Visit: 
        https://files.lighthouse.storage/viewFile/<cid>  
      To view encrypted file
    */
  }

  return (
    <div className="App">
      <button onClick={()=>shareFile()}>share file</button>
    </div>
  );
}

export default App;
```

**Step 4: As a final step, run the following command to view your react site in the browser**

```
npm start
```

You can now share the file by clicking the **share file** button and signing from the wallet. View the console.log to view the data object containing the CID of the shared file and wallet address given access.

**Step 5: Share the file link**

The following URL can be shared to view the file **https://files.lighthouse.storage/viewFile/\<cid>** (insert cid here).&#x20;
