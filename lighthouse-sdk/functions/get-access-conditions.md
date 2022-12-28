# Get Access Conditions

Get access conditions for encrypted files

```javascript
/*
 * @param {cid} cid.
 * @return {object} containing details of access conditions.
*/

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
        aggregatorSolana: '([1] and [2] and [3])',
        conditions: [ [Object], [Object] ],
        conditionsSolana: [ [Object], [Object], [Object] ],
        sharedTo: [],
        owner: '0xa3c960b3ba29367ecbcaf1430452c6cd7516f588',
        cid: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s'
      }
    }
    
    Case when no access condition present
    {
      data: {
        conditions: [],
        conditionsSolana: [],
        sharedTo: [],
        owner: '0xae0c1e25dc9dbb782f67757a236e5335d7670407',
        cid: 'QmQ4RtiVh43E1QUKq2aNcSAzLv5WELxwdnncj3Mjp4PCUk'
      }
    }
    
    Case when CID not found - Error Code 400
  */
}

accessConditions()



```
