# Key Functions and Variables

**Lighthouse.sol** is the main smart contract of the Lighthouse project written in solidity programming language. It is currently deployed on the rinkeby test network (soon available on main-network). Below is the list on the key functions and variables in the smart contracts.

### Functions

It has the following 4 main functions -&#x20;

1. **store** function takes in an IPFS cid and config as arguments and is also is a payable function (accepting ETH):

```javascript
function store(string calldata cid, string calldata config)
    external
    payable
{
    uint fileCost = msg.value;
    requests[msg.sender][cid] = Content(cid, config, fileCost);
    emit StorageRequest(msg.sender, cid, config, msg.value);
}
```

As you can see, the store function emits a StorageRequest event with the key parameters. These events are listened to by the Lighthouse node.

{% hint style="info" %}
&#x20;IPFS cid needs to be available on public network or one can use Lighthouse API endpoint to upload a file to retrieve one to use here.
{% endhint %}

2\. **requestStorageStatus** function takes in an IPFS cid as argument and it’s purpose is to request the storage status and publish it on chain. The storage status is only published if a cid already has a deal on the filecoin network.&#x20;

```javascript
function requestStorageStatus(string calldata cid) 
    external
{
    emit StorageStatusRequest(msg.sender, cid);
}
```

The above function emits a storageStatusRequest event passing in the caller and cid. This event is listened by the lighthouse node which processes this input and interacts with the filecoin network.

3\. **publishStorageStatus** function can only be called by the owner address of the smart contract via oracle in response to the events received by the node from the previous requestStorageStatus function

```javascript
function publishStorageStatus(string calldata cid, string calldata dealIds, bool active) 
    external
{
    require(msg.sender == owner);
    statuses[cid] = Status(dealIds, active);
}
```

4\. **getPaid** function can only be called by the owner address of the smart contract. The purpose of this function is to pay the miner addresses who are storing the users or applications data. The amount paid to miners are mainly accrued by the value passed in the store function discussed above.

```javascript
function getPaid(uint amount, address payable recipient)
    external
{
    require(msg.sender == owner);
    recipient.transfer(amount);
}
```

### Variables

Variables in **Lighthouse.sol** contains key on-chain data that can be queried by users and applications:

1. **requests** is a mapping from address and cid to _Content_ which is a struct containing cid, config and fileCost.&#x20;

```javascript
mapping(address => mapping(string => Content)) public requests;
```

2\. **statuses** is a mapping from cid to _Status_ which is a struct containing deal IDs and active status of the cid-

```javascript
mapping(string => Status) public statuses;
```
