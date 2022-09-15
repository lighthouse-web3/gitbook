# Create Wallet




Creates a new wallet to be used on EVM chains like polygon, ftm, bsc, optimism etc.

```javascript
/* Parameters:
    password - a password to encrypt wallet */

const lighthouse = require('@lighthouse-web3/sdk');
const wallet = await lighthouse.createWallet("bazooka"); // password is parameter here

/* Returns: encrypted wallet object */
```

The user can send tokens to this wallet's public address to be used for fees to store files. Initially, there are no protocol fees, but only transaction fees associated with the polygon network which is minimal
