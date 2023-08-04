---
description: Authentication via JWT
---

# Method 2: JWT

## **Get JWT Token Endpoint**

This endpoint allows users to retrieve a JWT (JSON Web Token) after they've signed a message with their wallet, confirming their ownership of a specific address.

**Endpoint:**

```
https://encryption.lighthouse.storage/api/message/api/message/get-jwt
```

**Method:**

`POST`

**Request Body Parameters:**

* `address`: The wallet address that the user wants to prove ownership of.
* `signature`: The signature generated after signing the message provided by the previous endpoint (`/api/message/<walletAddress>`).

**Headers:**

* `"Content-Type": "application/json"`

***

**Success Response:**

Code**:** `200 OK`

Content**:**

```json
{
  "token": "<YOUR_JWT_TOKEN_HERE>"
}
```

***

**Error Responses:**

Code**:** `400 Bad Request`

Content**:**

```json
{
  "error": "Invalid address or signature"
}
```

***

**Notes & Usage:**

* After obtaining the message from the `/api/message/<walletAddress>` endpoint, users should sign it using their Ethereum-compatible or Solana wallets. This signed message (signature) and the wallet address should then be passed to this endpoint to retrieve the JWT token.
* The JWT token can be used for authentication in subsequent API calls within the Lighthouse Encryption system(recommend for multiple uploads or download on our encryption service).

***

{% hint style="info" %}
Ensure you store the received JWT token securely and do not expose it. This token serves as a proof of authentication and could be misused if obtained by malicious actors.
{% endhint %}

***

With the JWT token in hand, you can now authenticate and interact with other secured endpoints in the Lighthouse system. Always remember to include the JWT in the header of your requests where authentication is required.

***
