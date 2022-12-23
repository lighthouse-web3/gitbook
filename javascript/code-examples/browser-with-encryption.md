# 🔐 Browser Encryption Upload

Pushing file to lighthouse node from browser with encryption.

```javascript
import React from "react";
import axios from "axios";
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function App() {

  const sign_message = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const res = await axios.get(`https://api.lighthouse.storage/api/auth/get_message?publicKey=${address}`);
    const message = res.data;
    const signedMessage = await signer.signMessage(message);
    return({
      message: message,
      signedMessage: signedMessage,
      address: address
    });
  }

  const encryptionSignature = async() =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
    const signedMessage = await signer.signMessage(messageRequested);
    return(signedMessage);
  }

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  /* Deploy file along with encryption */
  const deployEncrypted = async(e) =>{
    // Get authentication token
    const signingResponse = await sign_message();
    const accessToken = (await axios.post(`https://api.lighthouse.storage/api/auth/verify_signer`, {
      publicKey: signingResponse.address,
      signedMessage: signingResponse.signedMessage
    })).data.accessToken;

    const publicKey = signingResponse.address;

    /*
       uploadEncrypted(e, publicKey, accessToken, uploadProgressCallback)
       - e: js event
       - publicKey: wallets public key
       - accessToken: token to upload
       - signedMessage: message signed by owner of publicKey
       - uploadProgressCallback: function to get progress (optional)
    */
    const sig = await encryptionSignature();
    const response = await lighthouse.uploadEncrypted(
      e,
      publicKey,
      accessToken,
      sig,
      progressCallback
    );
    console.log(response);
    /*
      output:
        {
          Name: "c04b017b6b9d1c189e15e6559aeb3ca8.png",
          Size: "318557",
          Hash: "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"
        }
      Note: Hash in response is CID.
    */
  }

  return (
    <div className="App">
      <input onChange={e=>deployEncrypted(e)} type="file" />
    </div>
  );
}

export default App;
```
