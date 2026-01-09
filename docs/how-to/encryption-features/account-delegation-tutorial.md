# 👬 Account Delegation Tutorial

Adding access control with account delegation for encrypted files involves two primary steps: granting access permissions to a delegate's address and retrieving the necessary decryption keys to access the files.​

### Step 1: Owner Grants Delegation Access

The owner authorizes a delegate to access all their encrypted files by sending access permissions to all five Lighthouse nodes

```javascript
import * as dotenv from 'dotenv'
dotenv.config()
import { ethers } from "ethers"
import axios from "axios";
import kavach from "@lighthouse-web3/kavach";

const signAuthMessage = async (privateKey) => {
  const signer = new ethers.Wallet(privateKey);
  const authMessage = await kavach.getAuthMessage(signer.address);
  const signedMessage = await signer.signMessage(authMessage.message);
  const { JWT } = await kavach.getJWT(signer.address, signedMessage);
  return JWT;
};

const delegateAccess = async () => {
  const publicKey = "0xa3c960b3ba29367ecbcaf1430452c6cd7516f588"; //Your public key
  const delegateAddress = "0x487fc2fE07c593EAb555729c3DD6dF85020B5160" //Receiver public key 
  const ownerPrivateKey = process.env.PRIVATE_KEY_WALLET1;
  const JWT = await signAuthMessage(ownerPrivateKey);
  const nodeIds = [1, 2, 3, 4, 5];

  for (const nodeId of nodeIds) {
    const response = await fetch(`https://encryption.lighthouse.storage/api/setAllFilesAccess/${nodeId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${JWT}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        address: publicKey,
        allFilesAccess: [delegateAddress]
      })
    });

    const data = await response.json();
    console.log(`response: `, data);
  }
};

delegateAccess().catch(console.error);

```

### Step 2: Delegate Retrieves Shared Key & Decrypts Files

The delegate retrieves the shared encryption key from all five nodes and decrypts the desired file.​

```javascript
import * as dotenv from 'dotenv'
dotenv.config()
import { ethers } from "ethers";
import fs from "fs";
import lighthouse from '@lighthouse-web3/sdk'
import kavach from "@lighthouse-web3/kavach"

const signAuthMessage = async(privateKey) =>{
    const signer = new ethers.Wallet(privateKey)
    const authMessage = await kavach.getAuthMessage(signer.address)
    const signedMessage = await signer.signMessage(authMessage.message)
    const { JWT, error } = await kavach.getJWT(signer.address, signedMessage)
    return(JWT)
  }

const retrieveAndDecrypt = async () => {
  const nodeIds = [1, 2, 3, 4, 5];
  const shards = [];
  const delegatePrivateKey = process.env.PRIVATE_KEY_WALLET2;
  const delegateAddress = "0x487fc2fE07c593EAb555729c3DD6dF85020B5160";
  const ownerAddress = "0xa3c960b3ba29367ecbcaf1430452c6cd7516f588";
  const cid = "bafkreictu4jrfdjuf426xjstyvn37bknkxkpfhpzblsisjya9gmoudsltq"
  const JWT = await signAuthMessage(delegatePrivateKey, delegateAddress);

  for (const nodeId of nodeIds) {
    const response = await fetch(`https://encryption.lighthouse.storage/api/retrieveSharedKey/${nodeId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${JWT}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        address: delegateAddress,
        cid: cid,
        ownerAddress: ownerAddress
      })
    });

    const data = await response.json();
    shards.push(data.payload);
  }

  // Combine shards to reconstruct the encryption key
  const { masterKey: key, error: recoverError } = await kavach.recoverKey(shards);

  // Decrypt the file using the reconstructed encryption key
  const decrypted = await lighthouse.decryptFile(cid, key);
  fs.createWriteStream("fileName.png").write(Buffer.from(decrypted))
  console.log("File decrypted successfully.");
};
retrieveAndDecrypt().catch(console.error);
```

