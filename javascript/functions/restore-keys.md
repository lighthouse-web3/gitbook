# Restore Keys



Create new private-key encryption using private-key and new password

```javascript
/**
 * @param {string} privateKey - wallet's private key
 * @param {string} password - password used for encryption
 * @return {object} containing encrypted private key and input keys
*/
const lighthouse = require('lighthouse-web3');
const wallet = await lighthouse.restoreKeys('0xd7f1e7ccf6e3620327d3b29c57018d076305148eec487c57d8121beac0067895', 'bazooka')

/* Returns: wallet object
    {
      publicKey: '0x1Ec09D4B3Cb565b7CCe2eEAf71CC90c9b46c5c26',
      privateKey: '0xd7f1e7ccf6e3620327d3b29c57018d076305148eec487c57d8121beac0067895',
      privateKeyEncrypted: 'U2FsdGVkX1933kiJs9iyvuGQBpZe0dHrzesudwpk5Pco08q+QTA08HgjzAlCTD1C1Ro3P3gFgIc9lgWkv8cPSjJjBexgGHFXq1TUS8S9ivgy4qz6/bY8TAMa/qXF8Fc3'
    } 
*/
```
