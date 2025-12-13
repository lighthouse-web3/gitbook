---
hidden: true
---

# ✅ Deal Verification

Deals and file inclusion can be verified using the following steps.

#### Step 1: Use the Contract to Verify:

{% hint style="success" %}
the successful return of calling `complete` (i.e. the call doesn’t revert) means that the deal’s proof is verified successfully by the smart contract and the mapping of the deals between cid and (miner\_id, deal\_id) are updated in the smart contract&#x20;
{% endhint %}

* You can call the **complete function** located here: \
  `0x4015c3E5453d38Df71539C0F7440603C69784d7a` to verify the successful inclusion of your in the live filecoin deal. Code for this smart contract can be found [here](https://github.com/lighthouse-web3/raas-starter-kit/blob/main/contracts/DealStatus.sol)

{% hint style="info" %}
Lighthouse currently calls this complete function in calibration testnet for all the files submitted through `submitRaaS` function of our deployed contract.
{% endhint %}

* Submit your proof details, specifically: proofSubtree, proofIndex, and verifierData.&#x20;

```javascript
//sample pseudocode for testnet
let response = await axios.get("https://api.lighthouse.storage/api/lighthouse/get_proof", {
    params: {
        cid: lighthouse_cid,
        network: "testnet" // Change the network to mainnet when ready
    }
})
const responseBody = response.body.data.dealInfo;
// contractInstance is the address of the contract you deployed or the aggregator-hosted RaaS address above.
const dealStatus = await ethers.getContractAt("DealStatus", contractInstance);
//Call complete function for the file you want to upload to the Filecoin network in the following way.
await dealStatus.complete(transactionId, responseBody.dealId, "t017840", responseBody.proof.inclusionProof, responseBody.proof.verifierData);
```

* Complete function would emit event with two things: "commPa" and "sizePa". Think of these as your file's unique fingerprints.
* These fingerprints (pieceCID and pieceSize) might look like regular text. You'll need to change them into a code-like format, known as hex, before you compare.

#### Step 2: Double-Check Your File's Data:

* This verifier data is like a mixed salad of your file combined with others. The first step confirmed that the salad has the right ingredients.
* Now, it's time to be certain that the main ingredient in the salad is indeed your file. Do this by grabbing your file's unique PieceCid and comparing it with the verifier data given.

#### Step 3: Check Live Deal on Explorer:

* You're almost done! You've just ensured your file is part of a bigger bundle handed to a miner.
* Need more peace of mind? Head on over to [FilFox](https://calibration.filfox.info/en/deal/133652). Here, make sure the `dealId` you received is live 🚀
