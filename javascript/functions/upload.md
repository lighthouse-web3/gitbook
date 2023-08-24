# Upload

Used to upload a file to Lighthouse.

```javascript
/**
 * @param {string} path to file.
 * @param {string} apiKey your API key.
 * @param {boolean} multi if multiple files are to be uploaded at once.
 * @return {object} containing details of the file uploaded.
 */
 // Both file and folder are supported by the upload function
import lighthouse from '@lighthouse-web3/sdk'
const uploadResponse = await lighthouse.upload(
  '/home/cosmos/Desktop/wow.jpg', 
  apiKey,
  false,
  null
); // path, apiKey

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

{% code overflow="wrap" %}
```
Note:
deal parameters: A JSON can be provided with the following parameters: 
 {
    "num_copies": 2, // max 3
    "repair_threshold": 28800, // default 10 days (28800)
    "renew_threshold": 240, //2880 epoch per day, default 28800, min 240(2 hours)
    "miner": ["t017840", "t017819"], // give your own miners, default []
    "network": 'calibration' // default calibration
 }
Note: this functionality is currently supported on calibration net, providing "network": 'calibration' is necessary else the deal will get created on mainnet.
```
{% endcode %}
