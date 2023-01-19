---
description: Pushing file to lighthouse from browser. The example below uses ReactJS
---

# ⬆ Browser Upload

**Step 1:** **Follow this** [**React documentation**](https://reactjs.org/docs/create-a-new-react-app.html) **and Create a new react app using the following command**&#x20;

```
npx create-react-app lighthouse-app
```

and go into the new repository using

```
cd lighthouse-app
```

**Step 2:** **Install the Lighthouse SDK**

```
npm i @lighthouse-web3/sdk
```

**Step 3: Copy and paste the following code example into src/App.js file**

Get the API Key from [Lighthouse Files Dapp](https://files.lighthouse.storage/) and insert it into the upload function as a parameter below.

Note: for production use, set the API Key to the .env file and don't publish your API Key publically

```javascript
import React from "react";
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

**Step 4: As a final step, run the following command to view your react site in the browser**

```
npm start
```

You can now upload a file by clicking the upload button and viewing the link to the file in the browser console.
