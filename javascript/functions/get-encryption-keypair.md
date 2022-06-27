# Get Balance



This method returns the current balance of your wallet. Your wallet needs to have Matic/FTM/BSC/Optimism ETH or other chain tokens to store your files on Lighthouse

```javascript
/**
 * @param {string} publicKey wallet's public key.
 * @param {string} accessToken users access token or api key.
 * @return {object} publicKey and secretKey for encrypting and decrypting file.
*/
const lighthouse = require('@lighthouse-web3/sdk');
const keypair = await lighthouse.getEncryptionKeyPair('0xA3C960B3BA29367ecBCAf1430452C6cd7516F588', '7dc7f8f2d52f450698503bc8cddc7629');

/* Returns: publicKey and secretKey
    { 
      publicKey: GIcjiRmaW7rIxFP6iMDenzApDEFf12D8/vT+AW4WzHU=,
      secretKey: s7Y+o6+SkUMfkGngFoQmM6zkABE+lwCiXg4E3VFfpjc=
    }
*/
```
