# PoDSI: A Simple Overview

### What is PoDSI?

**Proof of Data Segment Inclusion (PoDSI)** is like a certificate of authenticity. It assures that your file is safely tucked inside a special package, known as a "deal", made by the aggregator node. This aggregator combines several files, gives them a unique ID, offers proof of their inclusion, and even throws in a mini-proof of the entire package's structure.

Want a hands-on way to see this proof for your file? Here's how:

Just click on [this link](https://api.lighthouse.storage/api/lighthouse/get\_proof?cid=%3Ccid%3E) and make sure to swap `<cid>` with your specific file's CID.

**Quick Tip**: If you're in experimentation mode, just add `&network=testnet` to the link.

### Steps to Confirm Your File's Inclusion:

#### 1. Use the Contract to Verify:

* Dive into the **verify function** located here: `0x27235FbFee0F5519A8786EA7Fc13258234aC1847`.
* Submit your proof details, specifically: proofSubtree, proofIndex, and verifierData.
* What you'll get in return are two things: "commPa" and "sizePa". Think of these as your file's unique fingerprints.
* **Heads up**: These fingerprints (pieceCID and pieceSize) might look like regular text. You'll need to change them into a code-like format, known as hex, before you compare.

#### 2. Double-Check Your File's Data:

* This verifier data is like a mixed salad of your file combined with others. The first step confirmed that the salad has the right ingredients.
* Now, it's time to be certain that the main ingredient in the salad is indeed your file. Do this by grabbing your file's unique PieceCid and comparing it with the verifier data given.

#### 3. Seal the Deal:

* You're almost done! You've just ensured your file is part of a bigger package that was handed to a miner.
* Need more peace of mind? Head on over to [filfox](https://filfox.info/en/deal/23410543). Here, just make sure the package's unique tag (the piece cid) aligns with what you've been provided earlier.
