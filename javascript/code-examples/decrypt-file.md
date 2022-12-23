# 🔐 Browser Decrypt File

Fetch file from lighthouse node and decrypt.

```javascript
import React from "react";
import {ethers} from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';

function App() {

  const [fileURL, setFileURL] = React.useState(null);

  const sign_auth_message = async() =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const publicKey = (await signer.getAddress()).toLowerCase();
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
    const signedMessage = await signer.signMessage(
      messageRequested
    );
    return({publicKey: publicKey, signedMessage: signedMessage});
  }

  /* Decrypt file */
  const decrypt = async() =>{
    // Fetch file encryption key
    const cid = "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3";
    const {publicKey, signedMessage} = await sign_auth_message();
    console.log(signedMessage)
    /*
      fetchEncryptionKey(cid, publicKey, signedMessage)
        Parameters:
          CID: CID of file to decrypt
          publicKey: public key of user who has access of file or owner
          signedMessage: message signed by owner of publicKey
    */
    const keyObject = await lighthouse.fetchEncryptionKey(
      cid,
      publicKey,
      signedMessage
    );

    // Decrypt file
    /*
      decryptFile(cid, key, mimeType)
        Parameters:
          CID: CID of file to decrypt
          key: key to decrypt file
          mimeType: default null, mime type of file
    */
   
    const fileType = "image/jpeg";
    const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key, fileType);
    console.log(decrypted)
    /*
      Response: blob
    */

    // View File
    const url = URL.createObjectURL(decrypted);
    console.log(url);
    setFileURL(url);
  }

  return (
    <div className="App">
      <button onClick={()=>decrypt()}>decrypt</button>
      {
        fileURL?
          <a href={fileURL} target="_blank">viewFile</a>
        :
          null
      }
    </div>
  );
}

export default App;
```
