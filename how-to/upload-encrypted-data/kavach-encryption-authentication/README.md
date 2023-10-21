---
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# 🔐 Encryption Authentication

Encryption nodes require authentication to accept incoming requests. Users can use three ways to authenticate:

1. [Signed Message](method-1-signed-message.md)
2. [JWT Token](method-2-jwt.md)
3. [Passkey](method-3-passkey.md)

In the code example of file and text upload, the user must place the JWT or signed message generated above in place of signed\_message in the code example.
