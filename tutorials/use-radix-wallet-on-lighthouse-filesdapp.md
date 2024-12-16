---
icon: square-root
---

# Use Radix Wallet on Lighthouse Filesdapp

1.  **Login Using Radix Wallet**\
    \
    The Login Dialog on [files.lighthouse.storage](https://files.lighthouse.storage) now supports the use of Radix Wallet for user authentication, alongside other supported wallets.\
    \
    You should have :

    * **Radix Browser Extension**: Installed and configured.
    * **Valid Account** on Radix Mobile Wallet.

    \
    Steps to Login :&#x20;

    * Navigate to the **Login Dialog** on the platform
    * Select **Radix Wallet** from the list of available wallets.
    * A connection request will be triggered on the Radix Browser Extension.
    * Authenticate the request via your Radix Mobile Wallet.
    * Upon successful login, users can access all Lighthouse features as described below.\


    <figure><img src="../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>
2.  **Features Accessible After Login**

    \
    Once authenticated with Radix Wallet, users gain access to the following features :

    * **Upload Files**: Store files securely on the Lighthouse platform.
    * **Create Migrations**: Migrate data or files seamlessly between systems.
    * **Generate API** **Keys**: Generate API keys for programmatic access to Lighthouse features.\
      &#x20;

    <figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>
3.  **Using the Encryption Module (Lighthouse Kavach)**\
    \
    To access Lighthouse’s **encryption module** for advanced file management, users must generate a **JWT key** by signing an authentication message via their Radix Mobile Wallet.\
    \
    Steps to Use Encryption :

    * Initiate the encryption process on the platform.
    * A prompt will request you to sign an authentication message using your Radix Mobile Wallet.
    * Upon signing, a JWT key will be generated.
    * Using the generated JWT key, users can:
      * Upload encrypted files.
      * Set up token gating.
      * Share files with other users using their public address (cross-chain and cross-wallet supported).



    <img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXdl0wgUts3y4MDVekN_j0pxix4ysNGAhgOqYtgvtW7hYJnsHEDu-ccuIzvVOiOivY_76P3CNhLh87gZjIZxdNirvDdQ6Ch8fhnw6R3dOi7t4u6jXI_E601YrRqWa2_N9J8ZBH3yzw?key=MFacNzw0LEM42HocoKk85YsR" alt="" data-size="original">



4.  **Token Gating**\
    \
    Token gating allows restricting access to files based on ownership of specific tokens or NFTs.\


    **Token Gating Parameters** :

    * Select one of the following **Method :**&#x20;
      * getFTsByAddress: For token-based gating.
      * getNFTByAddress: For NFT-based gating.
    * Resource Address: Specify the relevant token or NFT address.\

5. &#x20;**Payment with RDX Token**\
   \
   Users can now purchase Lighthouse plans using RDX tokens, seamlessly integrating payment via the Radix Wallet.\
   \
   Steps to Pay with RDX Tokens:
   * Navigate to the Plans and Pricing section on the platform.
   * Select your desired plan.
   * Choose Pay with RDX as the payment method.
   * Confirm the payment request via your Radix Wallet.
