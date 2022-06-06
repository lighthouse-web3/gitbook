## Browser
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
    const address = await signer.getAddress();
    const message = (await axios.get(`https://api.lighthouse.storage/api/auth/get_message?publicKey=${address}`)).data;
    const signed_message = await signer.signMessage(message);
    return({
      signed_message: signed_message,
      address: address
    });
  }

  const deploy = async(e) =>{
    const signing_response = await sign_message();
    console.log(await lighthouse.deploy(e, null, signing_response.address, signing_response.signed_message));
  }

  return (
    <div className="App">
      <input onChange={e=>deploy(e)} type="file" />
    </div>
  );
}

export default App;
```