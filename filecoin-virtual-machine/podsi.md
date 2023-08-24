# PoDSI

### What is PoDSI

Proof of data segment inclusion is used to prove that your file is in the deal created by the aggregator node. The aggregator provides aggregated files, piece CID, inclusion proof, and proof of sub-tree. You can use the given API to get the proof

`https://api.lighthouse.storage/api/lighthouse/get_proof?cid=<cid>`

Replace the CID with your CID, and in case of testnet, add another query parameter \&network=testnet

### How to verify inclusion:

1. Call the verify function of the contract(`0x27235FbFee0F5519A8786EA7Fc13258234aC1847`) with the proofSubtree, proofIndex, and verifierData, it will return commPa and sizePa. The commPa and SizePa should match the pieceCID and pieceSize.&#x20;
   1. **Note**: pieceCID and pieceSize are in the string will have to be converted into hex for matching
2. Verifier data is your file's data aggregated with other files. The above steps prove the given verifier data computes to correct piece cid.&#x20;
3. Now, you must verify that the verifier data shown is the data generated from your file. For that, you must compute the PieceCid of your file and match it with the verifier data provided.
4. Now it's clear that your file is part of the aggregated file sent to the miner for making the deal. Deal can be verified using filfox (example: [https://filfox.info/en/deal/23410543](https://filfox.info/en/deal/23410543)); here, you can match the piece cid with the piece cid received from API.
