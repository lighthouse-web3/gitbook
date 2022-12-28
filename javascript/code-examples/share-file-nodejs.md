# 🤝 Share Private File

Share file to another user.

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

const shareFile = async() =>{
  const cid = "Qma7Na9sEdeM6aQeu6bUFW54HktNnW2k8g226VunXBhrn7";
  const publicKey = "0xa3c960b3ba29367ecbcaf1430452c6cd7516f588";
  const privateKey = process.env.PRIVATE_KEY;

  const signed_message = await sign_auth_message(publicKey, privateKey);
  const publicKeyUserB = ["0x487fc2fE07c593EAb555729c3DD6dF85020B5160"];

  const shareResponse = await lighthouse.shareFile(
    publicKey,
    publicKeyUserB,
    cid,
    signedMessage
  );

  console.log(shareResponse)
  /*
    {
      data: {
        cid: 'Qma7Na9sEdeM6aQeu6bUFW54HktNnW2k8g226VunXBhrn7',
        shareTo: [ '0x487fc2fE07c593EAb555729c3DD6dF85020B5160' ],
        status: 'Success'
      }
    }
  */
  /*Visit: 
      https://files.lighthouse.storage/viewFile/<cid>  
    To view encrypted file
  */
}

shareFile()
```
