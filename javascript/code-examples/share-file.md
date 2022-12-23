# 🤝 Share Private File

Share file to another user.

```javascript
import React from "react";
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function App() {

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

  const shareFile = async() =>{
    const cid = "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3";

    // Then get auth message and sign
    const {publicKey, signedMessage} = await sign_auth_message();

    const publicKeyUserB = "0x201Bcc3217E5AA8e803B41d1F5B6695fFEbD5CeD";
    
    const res = await lighthouse.shareFile(
      publicKey,
      publicKeyUserB,
      cid,
      signedMessage
    );

    console.log(res)
    /*
      data: {
        cid: "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3",
        shareTo: "0x201Bcc3217E5AA8e803B41d1F5B6695fFEbD5CeD"
      }
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
