# 🤝 Share Private File

Share file to another user.

```javascript
import './App.css';
import React from "react";
import axios from "axios";
import ethers from 'ethers';
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

  const shareFile = async() =>{
    const cid = "QmSRGNKtP88vQzkQH9azFs8x4S8RUr6sKsqeHuHUevV6dG";

    // Then get auth message and sign
    const signed_message = await sign_auth_message();

    const publicKeyUserB = "0xC88C729Ef2c18baf1074EA0Df537d61a54A8CE7b";
    
    const res = await lighthouse.shareFile(
      localStorage.getItem("publicKey"),
      publicKeyUserB,
      cid,
      signed_message
    );

    console.log(res) // String: "Shared"
  }

  return (
    <div className="App">
      <button onClick={()=>decrypt()}>decrypt</button>
    </div>
  );
}

export default App;
```
