# Browser Decrypt File

Fetch file from lighthouse node and decrypt.

```javascript
import './App.css';
import React from "react";
import axios from "axios";
import {ethers} from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';
import decryptFile from './decryptFile';
import share from './share';
// import keypair from './getKP'

function App() {

  const [img, setImg] = React.useState(null);

  /* Decrypt file */
  const decrypt = async() =>{
    // get file encrypted password
    const cid = "QmcnzVoLcFcLzwUyjgtVmf2JQbPL5gbffNhjQFxre8aYvU";
    
    // Decrypt password
    /*
      lighthouse.decryptPassword(fileEncryptionKey, nonce, encryptionPublicKey, secretKey)
      Note:
        File details for user can be fetched from get request
          https://api.lighthouse.storage/api/encryption/get_encrypted_uploads?publicKey=${publicKey}
        File details contains fileEncryptionKey, nonce along with CID

        encryptionPublicKey: is the encryption public key of user who shared file, if not shared its users own encryption key
    */
    const filePassword = lighthouse.decryptPassword("eZbXrSSqIHt3IXJL7tw0gZHWpLOvxmW8WKR1+SzIDzmLYzCgKfDfh9IzTDbTzRGIq7McrQ==", "e6lS2GoqicvK7UXymLrU1VNLKZeDpZcx", "ucN0bseYBo79jUH5Q67VPPHPDW3RDZzIrx0N9FLI4hU=", localStorage.getItem("secretKey"));

    // Decrypt file
    const decrypted = await decryptFile(cid, filePassword); // Blob response

    const fileURL = URL.createObjectURL(decrypted);
    setImg(fileURL);
  }

  return (
    <div className="App">
      <button onClick={()=>decrypt()}>decrypt</button>
      <img alt="output" id="the-image" src={img} />
    </div>
  );
}

export default App;
```
