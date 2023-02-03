# Upload

Used to upload a file to Lighthouse.

```javascript
/**
 * @param {string} path to file.
 * @param {string} apiKey your api key.
 * @return {object} containing details of file uploaded.
 */
 // Both file and folder supported by upload function
const lighthouse = require('@lighthouse-web3/sdk');
const uploadResponse = await lighthouse.upload('/home/cosmos/Desktop/wow.jpg', apiKey); // path, apiKey

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
