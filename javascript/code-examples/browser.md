# Browser

Pushing file to lighthouse node from browser.

```javascript
import React from "react";
import axios from "axios";
import { ethers } from 'ethers';
import lighthouse from 'lighthouse-web3';

function App() {

  const sign_message = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress(); //users public key
    const message = (await axios.get(`https://api.lighthouse.storage/api/auth/get_message?publicKey=${address}`)).data; //Get message
    const signed_message = await signer.signMessage(message); //Sign message
    return({
      signed_message: signed_message,
      address: address
    });
  }

  const deploy = async(e) =>{
    // Sign message for authentication
    const signing_response = await sign_message();

    // Push file to lighthouse node
    console.log(await lighthouse.deploy(e, null, signing_response.address, signing_response.signed_message));
    /*
      output:
        {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
    */
  }

  return (
    <div className="App">
      <input onChange={e=>deploy(e)} type="file" />
    </div>
  );
}

export default App;
```
