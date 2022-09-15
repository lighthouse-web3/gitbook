# ⬆ Browser-Upload

Pushing file to lighthouse node from browser. Example below uses React.js

```javascript
import React from "react";
import axios from "axios";
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function App() {

  const sign_message = async () => {
    window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
      console.log("Account Connected: " + res[0]);
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress(); //users public key
    const message = (await axios.get(`https://api.lighthouse.storage/api/auth/get_message?publicKey=${address}`)).data; //Get message
    const signedMessage = await signer.signMessage(message); //Sign message
    return({
      signedMessage: signedMessage,
      address: address
    });
  }

  const deploy = async(e) =>{
    // Sign message for authentication
    const signingResponse = await sign_message();

    // Get a temporary access token
    const accessToken = (await axios.post(`https://api.lighthouse.storage/api/auth/verify_signer`, {
      publicKey: signingResponse.address,
      signedMessage: signingResponse.signedMessage
    })).data.accessToken;

    // Push file to lighthouse node
    const output = await lighthouse.deploy(e, accessToken);
    console.log('File Status:', output);
    /*
      output:
        {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

      console.log('Visit at https://ipfs.io/ipfs/' + output.Hash);
  }

  return (
    <div className="App">
      <input onChange={e=>deploy(e)} type="file" />
    </div>
  );
}

export default App;
```
