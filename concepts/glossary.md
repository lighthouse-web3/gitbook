# Glossary

## **Perpetual Storage**

A system that allows users to pay once for file storage with the intention that the files will be stored indefinitely. It's part of a solution to the problem of clients needing to pay for long-term storage upfront or regularly renew storage deals.

## **IPFS (InterPlanetary File System)**

A peer-to-peer network that facilitates file storage with built-in economic incentives and cryptography to ensure files are stored reliably over time. Filecoin allows users to pay storage providers—computers responsible for storing files and proving their correct and ongoing storage. Unlike centralized storage solutions, Filecoin operates in open markets for storing and retrieving files, allowing anyone to participate. It is built on IPFS but adds an incentive layer to ensure content is stored and accessed reliably. Filecoin supports a range of data types and is used for various applications, such as Web3 NFT storage, permanent incentivized storage, and as a cost-effective archival solution for Web2 datasets ([Link](https://docs.ipfs.tech/concepts/what-is-ipfs/)).

## **Filecoin**

An open-source, public cryptocurrency and digital payment system that aims to provide a blockchain-based cooperative digital storage and data retrieval method. It allows users to rent out unused hard drive space and is backed by a blockchain that records commitments with transactions in its native currency, FIL ([Link](https://docs.filecoin.io/)).

## **Smart Contracts**

Contracts coded to execute automatically when certain conditions are met. In the context of Lighthouse, they are used to manage storage policies and payments across multiple blockchains.

## **Encryption**

The process of converting data into a code to prevent unauthorized access. Lighthouse allows encrypted data storage, maintaining privacy and security.

## **Token-gated Applications**

Applications where access to certain features or content is restricted and requires possession of specific cryptographic tokens, which can be managed via smart contracts.

## **Custom IPFS Gateway**

A dedicated gateway that Lighthouse provides to serve and retrieve files quickly, especially optimized for multimedia content.

## **Non-EVM Chains**

Blockchains that do not use the Ethereum Virtual Machine for executing smart contracts. Lighthouse plans to deploy smart contracts on various chains, including non-EVM ones like Solana.

## **Image Optimization**

The process of adjusting the size of images stored on Lighthouse via the IPFS to optimize bandwidth usage and improve loading times.

## **Verifiable Storage Proofs**

Evidence that confirms a file is being stored by a particular miner or within the network, enhancing transparency and trust in the storage process.

## **Vendor Lock-in**

A situation where a customer is dependent on a single manufacturer or supplier for products or services and cannot easily move to another vendor. Lighthouse aims to eliminate this through its decentralized storage model.

## **FVM (Filecoin Virtual Machine)**

A virtual machine similar to the Ethereum Virtual Machine, which will enable smart contracts to run on the Filecoin network.

## **Distributed Hash Table (DHT)**

A decentralized system of user-operators in IPFS who hold a portion of the overall data, allowing for resilient file storage and sharing.

## RAAS

**RaaS (Replication, Renewal, and Repair as a Service)**: A feature of programmatic storage on Filecoin, enabled by the Filecoin Virtual Machine (FVM). RaaS allows users to replicate data by storing a user-defined number of replicas, renew on-chain storage deals automatically upon expiry, and repair data in faulted sectors, supporting the goal of perpetual data storage on Filecoin​ ([Link](https://docs.filecoin.io/smart-contracts/programmatic-storage/raas)).

## **Podsi (Proof of Deal Sub-piece Inclusion)**:

A proof mechanism in Filecoin’s aggregated deal-making workflow, ensuring that sub-piece data uploads are verifiably included in an associated deal. PoDSI generates proof for each sub-piece CID and stores it in an off-chain database, consisting of an inclusion proof of a sub-tree indicating the size and position of the sub-piece in the larger aggregated data piece, and an inclusion proof of the double leaf data segment descriptor, which describes the sub-piece within the larger data segment index contained in a deal​ ([Link](https://docs.filecoin.io/smart-contracts/programmatic-storage/aggregated-deal-making#proof-of-deal-sub-piece-inclusion-podsi)).\
