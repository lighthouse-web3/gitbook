# Get uploads

Returns cid and filecost of all uploads by a publicKey

```javascript
/**
 * @param {string} publicKey wallet's public key
 * @return [object] array of file object
*/
const lighthouse = require('@lighthouse-web3/sdk');
const uploads = await lighthouse.getUploads('0x487fc2fE07c593EAb555729c3DD6dF85020B5160');

/* Returns:
    {
        data: {
          uploads: [
            {
              publicKey: '0xa3c960b3ba29367ecbcaf1430452c6cd7516f588',
              fileName: 'flow1.png',
              mimeType: 'image/png',
              txHash: '0x7c9ee1585be6b85bef471a27535fb4b8d7551340152c36c025743c36fd0d1acc',
              status: 'testnet',
              createdAt: 1662880331683,
              fileSizeInBytes: '31735',
              cid: 'QmZvWp5Xdyi7z5QqGdXZP63QCBNoNvjupF1BohDULQcicA',
              id: 'aaab8053-0f1e-4482-9f84-d413fad14266',
              lastUpdate: 1662883207149,
              encryption: true
            },  
          ]
        }
    }
*/
```
