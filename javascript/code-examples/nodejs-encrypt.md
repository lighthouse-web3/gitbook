# NodeJS Encryption

Pushing file to lighthouse node with encryption using nodejs.

```javascript
const lighthouse = require('@lighthouse-web3/sdk');

const deployEncrypted = async() =>{
  const path = "/mnt/c/Users/ravis/Pictures/Screenshots/flow1.png";	//Give absolute path
  const apiKey = process.env.apiKey;
  const publicKey = "0xa3c960b3ba29367ecbcaf1430452c6cd7516f588"
  const encryptionPublicKey = "GIcjiRmaW7rIxFP6iMDenzApDEFf12D8/vT+AW4WzHU=";
  const fileEncryptionKey = "2221693f-af73-4ce0-b04f-16f4c9267596";
  const secretKey = "s7Y+o6+SkUMfkGngFoQmM6zkABE+lwCiXg4E3VFfpjc=";

  /* Encrypt file encryption key -
      input - 
        fileEncryptionKey: key using which file is encrypted
        encryptionPublicKey: users encryption public key
        secretKey: users secret key
      Note encryptionPublicKey, secretKey can be generated from getEncryptionKeyPair() method of package
      returns - 
        {
          encryptedFileEncryptionKey: "x8ehs1FkPHt9BEYhu60sdG080AtGqey1IIIrbvWm5pdAD8T+6nbfKMOuokseB2YE+o5Hrg==",
          nonce: "vYUirT+CdMAC8K1oMfFtPgAtUoHdY+MY"
        }
  */
  const encryptedKey = lighthouse.encryptKey(fileEncryptionKey, encryptionPublicKey, secretKey);

  const response = await lighthouse.uploadEncrypted(
    path,
    apiKey,
    publicKey,
    encryptionPublicKey,
    fileEncryptionKey,
    encryptedKey.encryptedFileEncryptionKey,
    encryptedKey.nonce
  );
  // Display response
  /*
    {
      Name: 'flow1.png',
      Hash: 'QmQqfuFH77vsau5xpVHUfJ6mJQgiG8kDmR62rF98iSPRes',
      Size: '31735'
    }
  */
  console.log(response);
}

deployEncrypted()
```