---
description: Authentication via Signed Message
---

# Method 1: Signed Message

This endpoint allows for the retrieval of a message that users can sign to prove their ownership of a specific wallet address.

***

**Endpoint:**

```
https://encryption.lighthouse.storage/api/message/<walletAddress>
```

**Method:**

`GET`

**URL Parameters:**

* `wallet Address`: The specific wallet address for which the user wants to prove ownership.

***

**Success Response:**

Code**:** `200 OK`

Content**:**

```json
[
  {
    "message": "<Message to sign>"
  }
]
```

***

**Error Responses:**

Code**:** `400 Bad Request`

Content**:**

```json
{
  "message": "Invalid address"
}
```

***

**Notes & Usage:**

* The user should sign the provided message using their private key related to the wallet address in question. This signed message can then be used to verify the user's ownership of that specific wallet address.
* The system might send multiple identical messages for redundancy and verification purposes.
* Messages can be signed using both Ethereum-compatible wallets and Solana wallets.

***

{% hint style="info" %}
Always handle the message securely and avoid exposing your private keys during the signing process.
{% endhint %}

***
