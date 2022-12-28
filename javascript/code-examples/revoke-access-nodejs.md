# 🚫 Revoke File Access

Revoke file access from an user.

```javascript
const {ethers} = require("ethers");
const lighthouse = require('@lighthouse-web3/sdk');

const sign_auth_message = async(publicKey, privateKey) =>{
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message
  const signedMessage = await signer.signMessage(messageRequested);
  return(signedMessage)
}

const revokeAccess = async() =>{
  const cid = "Qma7Na9sEdeM6aQeu6bUFW54HktNnW2k8g226VunXBhrn7";
  const publicKey = "0xa3c960b3ba29367ecbcaf1430452c6cd7516f588";
  const privateKey = process.env.PRIVATE_KEY;

  const signed_message = await sign_auth_message(publicKey, privateKey);
  const publicKeyUserB = "0x487fc2fE07c593EAb555729c3DD6dF85020B5160";

  const revokeResponse = await lighthouse.revokeFileAccess(
    publicKey,
    publicKeyUserB,
    cid,
    signedMessage
  );

  console.log(revokeResponse)
  /*
    {
      data: {
        cid: 'Qma7Na9sEdeM6aQeu6bUFW54HktNnW2k8g226VunXBhrn7',
        revokeTo: '0x487fc2fE07c593EAb555729c3DD6dF85020B5160',
        status: 'Success'
      }
    }
  */
}

revokeAccess()
```
