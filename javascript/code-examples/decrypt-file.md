# Browser Decrypt File

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
    const messageRequested = await lighthouse.getAuthMessage(publicKey);
    const signed_message = await signer.signMessage(
      messageRequested
    );
    return(signed_message);
  }

  /* Decrypt file */
  const decrypt = async() =>{
    // Fetch file encryption key
    const cid = "Qmd53SEY9BwL4cr81jgZBmv2Qhpaqv87SJonUtPdfsigPH";
    const signed_message = await sign_auth_message();

    const key = await lighthouse.fetchEncryptionKey(
      cid,
      "0x201Bcc3217E5AA8e803B41d1F5B6695fFEbD5CeD",
      signed_message
    );

    // Decrypt file
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
