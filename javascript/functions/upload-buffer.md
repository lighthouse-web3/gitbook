# Buffer Upload

Used to upload a buffer/streams to Lighthouse.

```javascript
/**
 * @param {string} buffer or stream.
 * @param {string} apiKey your API key.
 * @return {object} containing details of the file uploaded.
 */

import lighthouse from '@lighthouse-web3/sdk'
const uploadResponse = await lighthouse.uploadBuffer(buffer, apiKey); // buffer/stream, apiKey

/* Returns:
    {
      data: {
        Name: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
        Hash: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
        Size: '31735'
      }
    }
*/
```
