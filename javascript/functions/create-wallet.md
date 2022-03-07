# Create Wallet

Creates a new wallet to be used on EVM chains like polygon, ftm, bsc, etc.

```javascript
/* Parameters:
    password - a password to encrypt private key */

const lighthouse = require('lighthouse-web3');
const wallet = await lighthouse.createWallet("bazooka"); // password is parameter here

/* Returns: wallet object
    {
      privateKey: '0x34829a41858a649f0dac7448ccd518bcf12248da20b0544cb520f57a1f7be17c',
      publicKey: '0x3BD80c68c88f43924d7b1E5402D8d0b839A7072B',
      privateKeyEncrypted: 'U2FsdGVkX19hc2ZxPNhtfFWzv9Acf+XUIrdP/n6XLqzInhGGMudH5l9DDPkHjMccCclA4E2DCDY87ZEWr7ETnB3WSBffr+3/sFREBfkSh0z+G6ToV0ixfXMC1pkyWhmW'
    } 
*/
```

The user can send tokens to this wallet's public address to be used for fees to store files. Initially, there are no protocol fees, but only transaction fees associated with the polygon network which is minimal
