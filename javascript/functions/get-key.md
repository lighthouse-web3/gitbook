# Get Key

Decrypts private key for a given private key and password. This is used to make transaction to store files

```javascript
/**
 * @param {string} key - private-key encrypted
 * @param {string} password - password used for encryption 
 * @return {object} public key and private key
*/
const lighthouse = require('lighthouse-web3');
const wallet = await lighthouse.getKey('U2FsdGVkX1933kiJs9iyvuGQBpZe0dHrzesudwpk5Pco08q+QTA08HgjzAlCTD1C1Ro3P3gFgIc9lgWkv8cPSjJjBexgGHFXq1TUS8S9ivgy4qz6/bY8TAMa/qXF8Fc3', 'bazooka')

/* Returns: wallet object
    {
      privateKey: '0xd7f1e7ccf6e3620327d3b29c57018d076305148eec487c57d8121beac0067895',
      publicKey: '0x1Ec09D4B3Cb565b7CCe2eEAf71CC90c9b46c5c26'
    } 
*/
```
