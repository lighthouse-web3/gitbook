# 🔐 Browser Encryption Upload

Pushing file to lighthouse node from browser with encryption.

```javascript
import './App.css';
import React from "react";
import axios from "axios";
import ethers from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function App() {

  const [img, setImg] = React.useState(null);
  const [cid, setCid] = React.useState(null);

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

  /* Deploy file along with encryption */
  const deployEncrypted = async(e) =>{
    // Get bearer token
    const signingResponse = await sign_message();
    const accessToken = (await axios.post(`https://api.lighthouse.storage/api/auth/verify_signer`, {
      publicKey: signingResponse.address,
      signedMessage: signingResponse.signedMessage
    })).data.accessToken;

    const publicKey = signingResponse.address;

    /*
       uploadEncrypted(e, publicKey, accessToken)
       - e: js event
       - publicKey: wallets public key
       - accessToken: token to upload
       - signedMessage: message signed by owner of publicKey
    */
    const encryptionSignature = await encryptionSignature();
    const response = await lighthouse.uploadEncrypted(
      e,
      publicKey,
      accessToken,
      encryptionSignature
    );
    console.log(response);
    /*
      output:
        {
          Name: "main-qimg-6282220880e320c7889fec27a20e2eee-lq.jpg",
          Size: "44561",
          Hash: "QmcnzVoLcFcLzwUyjgtVmf2JQbPL5gbffNhjQFxre8aYvU"
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
