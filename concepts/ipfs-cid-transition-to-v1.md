# IPFS CID Transition to v1

### What is IPFS CID?

A Content Identifier (CID) in the InterPlanetary File System (IPFS) is a unique identifier used to point to content stored on the IPFS network. CIDs are generated based on the content itself, ensuring that each piece of content has a unique identifier. This enables efficient and reliable content addressing.

### CID v0 and v1

CID v0 starts looks like this

`QmNXczfQCr2qgDHYBUyyugF91KNTYEt1ccNMjt1138XYYF`

while CID v1 looks like

`bafybeififl7roehkjj7zt5lgngnzvtgbwzgot4iflatwrxjhiloriudse4P`



Files will still be accessed at [https://gateway.lighthouse.storage/ipfs/](https://gateway.lighthouse.storage/ipfs/QmWFAWckqnxT2wjCChDw47FYEty34MixKzq3kEiVXmAGR3){CID} for both new and old files. Though, for new files we will now return CID v1

### Why is the switch from CID v0 to CID v1 necessary?

The switch to CID v1 is necessary to stay updated with IPFS's current standards. CID v1 offers enhanced flexibility, better readability, and supports a wider range of hash functions, making it more future proof.

### **What about my old files with CID v0**

Existing files with CID v0 will continue to work, but any new content added to the system will be assigned CID v1 by default. This ensures backward compatibility while taking advantage of the improvements offered by CID v1.

### How will the transition affect users?

For the most part, users should experience little to no disruption. However, it is important to update any hardcoded CID references to ensure compatibility with the new standard.

### Additional Resources

* [IPFS CID Documentation](https://docs.ipfs.io/concepts/content-addressing/#identifier-formats)

### Contact Information

For any issues or questions related to the CID transition, please reach out to:

* [Support on Telegram ](https://t.me/LighthouseStorage)
* [Support on Discord](https://discord.com/invite/c4a4CGCdJG)

### Conclusion

Adopting CID v1 is a strategic upgrade for Lighthouse, ensuring better integration, improved performance, and alignment with the latest IPFS capabilities. By preparing and undertaking this transition, Lighthouse reiterates its commitment to innovation and reliability.

Thank you for your cooperation and understanding as we work to improve our services.



Last Published: 13th June 2024
