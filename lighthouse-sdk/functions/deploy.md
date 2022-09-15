# Deploy



Used to deploy a file to Lighthouse. Use this function after the Get Quote function to get fee details and prepare file to be sent.&#x20;

CID returned by quote function needs to be sent here.

```javascript
/**
 * @param {string} path path to file.
 * @param {string} apiKey your api key.
 * @return {object} containing details of file uploaded.
 */

const lighthouse = require('@lighthouse-web3/sdk');
const deploy = await lighthouse.deploy('/home/cosmos/Desktop/wow.jpg', apiKey); // path, apiKey

/* Returns:
    {
      Hash: "QmYjsW76L3UQLXZzYdKyg1p9Qoof6HVo1BPCbS1SSDQoDX",
      Name: "testImage1.svg",
      Size: 15370
    }
*/
```
