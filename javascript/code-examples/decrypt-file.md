# 🔐 Browser Decrypt File

Fetch file from lighthouse node and decrypt.

```javascript
import './App.css';
import React from "react";
import axios from "axios";
import {ethers} from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function App() {

  const sign_auth_message = async() =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const publicKey = (await signer.getAddress()).toLowerCase();
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
    const signed_message = await signer.signMessage(
      messageRequested
    );
    return(signed_message);
  }

  /* Decrypt file */
  const decrypt = async() =>{
    // Fetch file encryption key
    const cid = "Qmd53SEY9BwL4cr81jgZBmv2Qhpaqv87SJonUtPdfsigPH";
    const publicKey = "0x201Bcc3217E5AA8e803B41d1F5B6695fFEbD5CeD";
    const signed_message = await sign_auth_message();

    /*
      fetchEncryptionKey(cid, publicKey, signedMessage)
        Parameters:
          CID: CID of file to decrypt
          publicKey: public key of user who has access of file or owner
          signedMessage: message signed by owner of publicKey
    */
    const key = await lighthouse.fetchEncryptionKey(
      cid,
      publicKey,
      signed_message
    );

    // Decrypt file
    /*
      decryptFile(cid, key, mimeType)
        Parameters:
          CID: CID of file to decrypt
          key: key to decrypt file
          mimeType: default null, mime type of file
    */
   
    const decrypted = await lighthouse.decryptFile(cid, key);
    /*
      Response: blob
    */
  }

  return (
    <div className="App">
      <button onClick={()=>decrypt()}>decrypt</button>
    </div>
  );
}

export default App;
```
