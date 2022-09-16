# Get Access Conditions

Get access conditions for encrypted files

```javascript
const lighthouse = require('@lighthouse-web3/sdk');

const accessConditions = async() =>{
  const cid = "QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s";
  const response = await lighthouse.getAccessConditions(cid);

  // Display response
  console.log(response);
  /*
  Response: case access condition present
    {
      data: {
        aggregator: '([1] and [2])',
        conditions: [ [Object], [Object] ],
        cid: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s'
      }
    }
    
    Case when no access condition present
    { data: { cid: 'QmQ4RtiVh43E1QUKq2aNcSAzLv5WELxwdnncj3Mjp4PCUk' } }
    
    Case when CID not found - Error Code 400
  */
}

accessConditions()



```
