# 🛡️ zkTLS

## Introduction to zkTLS

**zkTLS (Zero-Knowledge Transport Layer Security)** is a cryptographic protocol that uses **Zero-Knowledge Proofs (ZKPs)** to verify data authenticity without revealing sensitive information. It enhances privacy compared to traditional **TLS (Transport Layer Security)** by confirming key details like user identity or data origin without exposing the actual data. This is particularly useful for **web3 applications** where privacy is crucial.

Currently, Lighthouse supports zkTLS proof generation via the Reclaim Protocol, with plans to being agnostic of zkTLS providers in the future

## How zkTLS Works in Lighthouse

The integration of zkTLS with decentralized storage enables secure, verifiable access to encrypted data stored on IPFS. Here is an outline of how it works:

1. **Proof Generation :** Users generate zero-knowledge proofs (ZKPs) using a zkTLS provider, such as Reclaim Protocol. These proofs can be based on verifiable data, like a user’s physical location or other verifiable attributes.
2. **Proof Submission and Verification :** The generated zkTLS proof is submitted to the Lighthouse Threshold Network, where it is verified by decentralized nodes. Lighthouse ensures the proof meets predefined access conditions (such as verifying location or identity) .&#x20;
3. **Access to Encrypted Data :** Once the zkTLS proof is verified, Lighthouse grants access to the encrypted data stored on decentralized networks.

## Demo

[Checkout how to use zkTLS in lighthouse](https://docs.lighthouse.storage/lighthouse-1/how-to/encryption-features/access-control-with-zktls)
