# 🔑 Access Control Browser

**Step 1:** **Follow this** [**Browser Upload with Encryption**](https://docs.lighthouse.storage/lighthouse-1/lighthouse-sdk/code-examples/browser-frontend/browser-with-encryption) **to upload encrypted file to lighthouse IPFS node**&#x20;

**Step 2:** **Use The given code example to apply access condition to file**&#x20;

Note: refer the [access conditions section](https://docs.lighthouse.storage/lighthouse-1/lighthouse-sdk/code-examples/access-conditions) for more examples of kind of conditions you can apply.
Note: for production use, set the API Key to the .env file and don't publish your API Key publically

```javascript
import React from "react";
import {ethers} from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function App() {

  const encryptionSignature = async() =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
    const signedMessage = await signer.signMessage(messageRequested);
    return({
      signedMessage: signedMessage,
      publicKey: address
    });
  }

  const applyAccessConditions = async(e) =>{
    const cid = "QmZkEMF5y5Pq3n291fG45oyrmX8bwRh319MYvj7V4W4tNh";

    // Conditions to add
    const conditions = [
      {
        id: 1,
        chain: "Optimism",
        method: "getBlockNumber",
        standardContractType: "",
        returnValueTest: {
          comparator: ">=",
          value: "13349"
        },
      },
    ];

    const aggregator = "([1])";
    const {publicKey, signedMessage} = await encryptionSignature();

    /*
      accessCondition(publicKey, cid, signedMessage, conditions, aggregator)
        Parameters:
          publicKey: owners public key
          CID: CID of file to decrypt
          signedMessage: message signed by owner of publicKey
          conditions: should be in format like above
          aggregator: aggregator to apply on conditions
    */
    const response = await lighthouse.accessCondition(
      publicKey,
      cid,
      signedMessage,
      conditions,
      aggregator
    );

    console.log(response);
    /*
      {
        data: {
          cid: "QmZkEMF5y5Pq3n291fG45oyrmX8bwRh319MYvj7V4W4tNh",
          status: "Success"
        }
      }
    */
  }

  return (
    <div className="App">
      <button onClick={()=>{applyAccessConditions()}}>Apply Access Consitions</button>
    </div>
  );
}

export default App;
```
