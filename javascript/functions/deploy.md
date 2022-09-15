# Deploy

Used to deploy a file to Lighthouse. Use this function after the Get Quote function to get fee details and prepare file to be sent.

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
      data: {
        Name: 'flow1.png',
        Hash: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
        Size: '31735'
      }
    }
*/
```
