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
 
Parameters Description:
num_copies: the total number of copies to be created for same file, i.e. num_copies=3 imply store file with 3 different storage provider

repair_threshold: after how many epoch(from the epoch deal initiate) should the sector storing particular file considered broken. Say, If miner fails to provide proof of your file for 28800 epoch(10 days approx) then create another copy of same file and consider current copy broken.

renew_threshold: after how many epoch(from the epoch deal initiate) should deal be renewed with same or another miner.

miner: you can provider address of any miner of your choice we will initiate deal with them. In testnet the miners are limited and we recommend t017840.

Note: this functionality is currently supported on calibration net, providing "network": 'calibration' is necessary else the deal will get created on mainnet.
```
{% endcode %}

