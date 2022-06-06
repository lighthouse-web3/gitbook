## Browser
Pushing file to lighthouse node using nodejs.

```javascript
// Deploy file
const lighthouse = require('lighthouse-web3');

const deploy = async() =>{
  const path = "/mnt/c/Users/cosmos/Desktop/projects/testing/status.js";	//Give absolute path
  const apiKey = process.env.API_KEY;

  const response = await lighthouse.deploy(path, apiKey);
  // Display response
  console.log(response);
}

deploy()
```
