import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    'quick-start',
    {
      type: 'category',
      label: 'How To',
      collapsed: false,
      items: [
        'how-to/create-an-api-key',
        {
          type: 'category',
          label: 'Upload Data',
          items: [
            'how-to/upload-data/index',
            'how-to/upload-data/file',
            'how-to/upload-data/text-json',
            'how-to/upload-data/buffer',
          ],
        },
        {
          type: 'category',
          label: 'Upload Encrypted Data',
          items: [
            'how-to/upload-encrypted-data/index',
            'how-to/upload-encrypted-data/file',
            'how-to/upload-encrypted-data/text-json',
            {
              type: 'category',
              label: 'Kavach Encryption Authentication',
              items: [
                'how-to/upload-encrypted-data/kavach-encryption-authentication/index',
                'how-to/upload-encrypted-data/kavach-encryption-authentication/method-1-signed-message',
                'how-to/upload-encrypted-data/kavach-encryption-authentication/method-2-jwt',
                'how-to/upload-encrypted-data/kavach-encryption-authentication/method-3-passkey',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Encryption Features',
          items: [
            'how-to/encryption-features/index',
            'how-to/encryption-features/share-file',
            'how-to/encryption-features/revoke-access',
            'how-to/encryption-features/get-access-conditions',
            'how-to/encryption-features/access-control-node',
            'how-to/encryption-features/chains-supported',
            'how-to/encryption-features/access-control-conditions',
            {
              type: 'category',
              label: 'Decrypt File',
              items: [
                'how-to/encryption-features/decrypt-file/index',
                'how-to/encryption-features/decrypt-file/decrypt-file',
                'how-to/encryption-features/decrypt-file/nodejs-decrypt-file',
              ],
            },
            'how-to/encryption-features/access-control-with-zktls',
            'how-to/encryption-features/account-delegation-tutorial',
          ],
        },
        'how-to/list-files',
        'how-to/delete-file',
        'how-to/file-info',
        'how-to/create-a-datacoin',
        'how-to/using-pdp-with-lighthouse',
        'how-to/get-balance',
        'how-to/retrieve-file',
        'how-to/check-for-filecoin-deals',
        'how-to/ipns-handle-mutable-data',
        {
          type: 'category',
          label: 'Migrations',
          items: [
            'how-to/migrations/index',
            'how-to/migrations/ipfs-provider',
            'how-to/migrations/google-drive',
          ],
        },
        'how-to/pin-cid',
        'how-to/pay-per-use',
        'how-to/resize-image',
        'how-to/overview',
        {
          type: 'category',
          label: 'AI',
          items: ['how-to/ai/index', 'how-to/ai/mcp-protocol'],
        },
      ],
    },
    'zktls',
    'account-delegation',
    {
      type: 'category',
      label: 'Filecoin First',
      items: [
        'filecoin-first/usage',
        'filecoin-first/pay-per-deal',
        'filecoin-first/section-a',
        'filecoin-first/section-b',
        'filecoin-first/podsi',
        'filecoin-first/deal-verification',
        'filecoin-first/self-hosted-raas',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        'tutorials/create-pay-to-view-media',
        'tutorials/use-python-sdk',
        'tutorials/use-go-sdk',
        {
          type: 'category',
          label: 'Update Content with Lighthouse IPNS',
          items: [
            'tutorials/update-content-with-lighthouse-ipns/index',
            'tutorials/update-content-with-lighthouse-ipns/using-node.js-sdk',
            'tutorials/update-content-with-lighthouse-ipns/using-go-sdk',
          ],
        },
        'tutorials/video-player',
        'tutorials/document-verification-with-podsi',
        'tutorials/minting-nfts-on-evm-chains',
        'tutorials/minting-nfts-on-solana',
        'tutorials/programmable-storage-with-lighthouse-sdk-and-filecoin',
        'tutorials/secure-file-sharing',
        'tutorials/upload-encrypted-files',
        'tutorials/token-gating-and-custom-contract',
        'tutorials/token-gating-nfts',
        'tutorials/pushing-file-metadata-onchain',
        'tutorials/use-radix-wallet-on-lighthouse-filesdapp',
        'tutorials/x402-pay-per-use-file-upload',
      ],
    },
    {
      type: 'category',
      label: 'Interacting with Smart Contracts',
      items: [
        'interacting-with-smart-contracts/key-functions',
        'interacting-with-smart-contracts/code-examples',
      ],
    },
    {
      type: 'category',
      label: 'Interacting with Node',
      items: ['interacting-with-node/web-sockets'],
    },
    {
      type: 'category',
      label: 'JavaScript Functions',
      items: [
        'javascript/functions/add-cid',
        'javascript/functions/get-encryption-keypair',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: ['concepts/glossary', 'concepts/ipfs-cid-transition-to-v1'],
    },
    {
      type: 'category',
      label: 'Support',
      items: ['support/contact'],
    },
  ],
};

export default sidebars;
