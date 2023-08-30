# Deal Status

Get filecoin deal status of files pushed on Lighthouse.

```javascript
/** 
 * @param {string} cid - cid of a file previously stored 
 * @return {object} containing the status of file
*/

const lighthouse = require('@lighthouse-web3/sdk');
const status = await lighthouse.dealStatus('bafkreia4ruswe7ghckleh3lmpujo5asrnd7hrtu5r23zjk2robpcoend34')

/* Returns: 
   data: [
        {
          chainDealID: '23410543',
          endEpoch: '3082739',
          publishCID: 'bafy2bzacedcnpdjwdibrqw6wisnyc7lepswfqs5q6jwwtgch4kahhwjutdaia',
          storageProvider: 'f022352',
          dealStatus: 'Announcing',
          bundleId: '5a9075d4-eaf5-4709-bc9d-7cf0df9169ea',
          dealUUID: 'd99c306b-2d88-410a-a1cb-8cc4de4e515a',
          startEpoch: '2564339',
          providerCollateral: '3.024 mFIL',
          lastUpdate: 1675077221346,
          dealId: 23410543,
          miner: 'f022352',
          content: 239214
        }
   ]
*/
```

