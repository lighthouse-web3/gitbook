# ⬆ Browser-Upload

Pushing file to lighthouse node from browser. Example below uses React.js

```javascript
import React from "react";
import axios from "axios";
import {ethers} from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function App() {

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const deploy = async(e) =>{
    // Push file to lighthouse node
    const output = await lighthouse.upload(e, "YOUR_API_KEY", progressCallback);
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

      console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
  }

  return (
    <div className="App">
      <input onChange={e=>deploy(e)} type="file" />
    </div>
  );
}

export default App;
```
