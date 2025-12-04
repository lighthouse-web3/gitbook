---
description: >-
  Upload files to IPFS using x402 payment protocol - Pay per use file storage
  with automatic payment handling
---

# 🔗 x402 Pay-Per-Use File Upload

## Introduction

x402 is a payment protocol that enables pay-per-use APIs, allowing developers to charge users for each API request using on-chain payments. This tutorial demonstrates how to upload files to IPFS via Lighthouse using the x402 payment system, where you pay only for what you use instead of maintaining a subscription or API key balance.

Traditional file upload APIs typically require users to maintain API key balances or subscriptions, which can be cumbersome for occasional users or applications with variable usage patterns. The x402 protocol eliminates these barriers by enabling micro-payments for each upload, making it ideal for pay-as-you-go scenarios.

### Why Use x402 for File Uploads?

The x402 payment protocol offers several advantages over traditional API key-based systems:

* **Pay-as-you-go**: Only pay for actual file uploads, no subscription fees
* **No balance management**: No need to pre-fund API key balances
* **Transparent pricing**: Dynamic pricing based on file size
* **Blockchain-native**: Uses USDC on Base Sepolia (testnet) or Base (mainnet)
* **Automatic payment handling**: The `x402-fetch` library handles the entire payment flow

### What Will You Learn?

This tutorial will guide you step-by-step on how to:

1. Set up your environment for x402 payments
2. Configure a wallet client for making payments
3. Upload files to IPFS using x402 payment protocol
4. Handle retry scenarios for failed uploads

### Prerequisites

Before starting this tutorial, ensure you have:

1. **Node.js** (v18 or higher) installed on your system
2. **A wallet** with USDC on Base Sepolia testnet (for testing)
3. **Basic knowledge** of JavaScript/TypeScript and Node.js
4. **Lighthouse API Key**&#x20;

#### Getting Testnet USDC

For testing on Base Sepolia, you can obtain testnet USDC from:

* [QuickNode Base Sepolia Faucet](https://faucet.quicknode.com/base/sepolia)
* Base Sepolia testnet faucets

### Step 1: Install Required Packages

Begin by installing the necessary packages for x402 payment integration:

```bash
npm install x402-fetch viem dotenv
```

### Step 2: Set Up Project Environment

Create a `.env` file in your project root:

```env
API_URL=http://91.98.152.92
TEST_PRIVATE_KEY=0xYourPrivateKeyHere
LIGHTHOUSE_API_KEY=your_lighthouse_api_key_here
```

### Step 3: Upload File Function

Create an upload function that reads a file and uploads it with x402 payment:

```javascript
import { wrapFetchWithPayment } from 'x402-fetch'
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { baseSepolia } from 'viem/chains'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'

dotenv.config()

const API_URL = process.env.API_URL || 'http://91.98.152.92'
const UPLOAD_ENDPOINT = `${API_URL}/api/x402/upload`

async function uploadFile(filePath) {
  try {
    // Set up wallet client
    const account = privateKeyToAccount(process.env.TEST_PRIVATE_KEY)
    const walletClient = createWalletClient({
      account,
      chain: baseSepolia, // Use 'base' for mainnet
      transport: http(),
    })

    // Read file from filesystem
    const fileBuffer = readFileSync(filePath)
    const fileName = filePath.split('/').pop() || `upload-${Date.now()}.txt`

    // Wrap fetch with payment handler
    const fetchWithPayment = wrapFetchWithPayment(fetch, walletClient)

    // Upload file with automatic payment
    const response = await fetchWithPayment(UPLOAD_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'x-file-name': fileName,
        'lighthouse-api-key': process.env.LIGHTHOUSE_API_KEY,
      },
      body: fileBuffer,
    })

    if (response.ok) {
      const result = await response.json()
      console.log('✅ Upload Successful!')
      console.log(`CID: ${result.cid}`)
      console.log(`File Size: ${result.fileSize} bytes`)
      console.log(`Amount Paid: ${result.amount}`)
      return result
    } else {
      const errorText = await response.text()
      throw new Error(`Upload failed: ${errorText}`)
    }
  } catch (error) {
    console.error('Error:', error.message)
    throw error
  }
}
```

### Step 4: Retry Upload Function

If an upload fails after payment, use the retry function with the previous payment transaction hash:

```javascript
const RETRY_ENDPOINT = `${API_URL}/api/x402/retry-upload`

async function retryUpload(filePath, previousPaymentTxHash) {
  try {
    // Set up wallet client
    const account = privateKeyToAccount(process.env.TEST_PRIVATE_KEY)
    const walletClient = createWalletClient({
      account,
      chain: baseSepolia,
      transport: http(),
    })

    // Read file from filesystem
    const fileBuffer = readFileSync(filePath)
    const fileName = filePath.split('/').pop() || `upload-${Date.now()}.txt`

    // Wrap fetch with payment handler
    const fetchWithPayment = wrapFetchWithPayment(fetch, walletClient)

    // Retry upload with payment proof
    const response = await fetchWithPayment(RETRY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'x-file-name': fileName,
        'x-payment-tx-hash': previousPaymentTxHash,
        'lighthouse-api-key': process.env.LIGHTHOUSE_API_KEY,
      },
      body: fileBuffer,
    })

    if (response.ok) {
      const result = await response.json()
      console.log('✅ Retry Successful!')
      console.log(`CID: ${result.cid}`)
      return result
    } else {
      const errorText = await response.text()
      throw new Error(`Retry failed: ${errorText}`)
    }
  } catch (error) {
    console.error('Error:', error.message)
    throw error
  }
}
```

### Understanding the Payment Flow

The x402 payment flow works as follows:

1. **Initial Request**: Client makes POST request to `/api/x402/upload`
2. **402 Response**: Server responds with 402 Payment Required and payment details
3. **Payment Transaction**: Client submits USDC payment transaction on-chain
4. **Confirmation**: Wait for transaction confirmation on the blockchain
5. **Retry with Proof**: Client retries request with payment proof in `X-PAYMENT` header
6. **Upload**: Server verifies payment and uploads file to IPFS via Lighthouse
7. **Response**: Server returns CID and file details

The `x402-fetch` library automatically handles steps 2-5, making the process seamless.

### API Endpoints

#### POST `/api/x402/upload`

Upload a file to IPFS with x402 payment.

**Headers:**

* `Content-Type: application/octet-stream` (required)
* `lighthouse-api-key: <your-api-key>` (required)
* `x-file-name: <filename>` (optional, defaults to timestamp)

**Request Body:**

* Raw file buffer (binary data)

**Response (200 OK):**

```json
{
  "name": "filename.txt",
  "cid": "QmHash...",
  "fileSize": 1024,
  "amount": "1000"
}
```

#### POST `/api/x402/retry-upload`

Retry a failed upload using a previous payment transaction.

**Headers:**

* `Content-Type: application/octet-stream` (required)
* `x-file-name: <filename>` (optional)
* `x-payment-tx-hash: <previous-tx-hash>` (required)
* `lighthouse-api-key: <your-api-key>` (optional)

**Request Body:**

* Raw file buffer (binary data)

**Response:** Same as `/upload` endpoint

### Pricing

The x402 API uses dynamic pricing based on file size:

* **Minimum price**: $0.0001 per request
* **Price per MB**: Configurable (default: $0.01 per MB)
* **Payment**: USDC on Base Sepolia (testnet) or Base (mainnet)

The price is calculated automatically based on your file size before payment is requested.

### Summary

In this tutorial, you learned how to:

* Set up your environment for x402 payments
* Configure a wallet client for making payments
* Upload files to IPFS using x402 payment protocol
* Handle retry scenarios for failed uploads

The x402 protocol enables pay-per-use file uploads to IPFS via Lighthouse, eliminating the need for API key balance management and subscriptions. With automatic payment handling through the `x402-fetch` library, you can seamlessly integrate pay-as-you-go file storage into your applications.
