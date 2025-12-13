# 🤝 Account Delegation

### Introduction to Account Delegation

Account Delegation enables a user (the “owner”) to grant another account permission to access and decrypt all of their encrypted files stored in Lighthouse. This feature is ideal for shared workspaces, recovery workflows, or any scenario where secure file access must be temporarily or permanently delegated without re-encrypting data or re-uploading assets.

### How Account Delegation Works in Lighthouse

The delegation flow involves three core steps:

1. **Authenticate as Owner**\
   The owner signs an authentication message with their private key to obtain a JWT or signed bearer token from Lighthouse Kavach service.
2. **Set Delegation Permissions**\
   The owner calls the `setAllFilesAccess` endpoint, passing the delegate’s address and the token. Lighthouse updates its access-control registry, allowing the delegate to retrieve shared encryption keys for CID belonging to the owner.
3. **Delegate Decrypts Files**\
   The delegate signs their own auth message, then calls the `retrieveSharedKey` endpoint with the owner’s address, the target CID, and their token. Lighthouse returns the shard of the master encryption key, which the delegate combines using Lighthouse Kavach and uses to decrypt the file.

### Demo

[Checkout how to use Account Delegation in Lighthouse](how-to/encryption-features/account-delegation-tutorial.md)
