---
description: Using Go SDK to Update Content with Lighthouse IPNS
---

# Using Go SDK

**Step 0:** Get API keys from Lighthouse as explained in the [main tutorial](./#step-0-getting-your-lighthouse-api-key-files-lighthouse-storage).

**Step 1:** Install the Lighthouse Go SDK:

```bash
go get github.com/lighthouse-web3/lighthouse-go-sdk
```

**Step 2:** Import the Lighthouse package and set up your API key:

```go
package main

import (
    "context"
    "fmt"
    "log"
    "os"

    "github.com/lighthouse-web3/lighthouse-go-sdk/lighthouse"
)

func main() {
    client := lighthouse.NewClient(nil,
        lighthouse.WithAPIKey(os.Getenv("LIGHTHOUSE_API_KEY")),
    )

    ctx := context.Background()
}
```

**Step 3:** Generate an IPNS key using the Lighthouse Go SDK:

```go
// Generate a new IPNS key
k, err := client.IPNS().GenerateKey(ctx, "my-key")
if err != nil {
    log.Fatal(err)
}
fmt.Println("IPNS Key:", k.IPNSName, k.IPNSId)
```

This will return an IPNS name and ID, which we will use in the next steps.

**Step 4:** Publish the content using the generated IPNS key and the CID:

```go
// Publish a CID to the key (use k.IPNSName, not the original keyName)
pub, err := client.IPNS().PublishRecord(ctx, "YOUR_CID", k.IPNSName)
if err != nil {
    log.Fatal(err)
}
fmt.Println("IPNS Publish:", pub.Name, pub.Value)
```

**Note:** When publishing, use `k.IPNSName` (the IPNS name hash returned from `GenerateKey`), not the original `keyName`. If you have existing keys, you may want to use those for publishing, as newly generated keys may need a moment to be fully available.

You will receive a response containing the IPNS name and the link to access the published content.

**Step 5:** Get all IPNS keys associated with your Lighthouse account:

```go
// List keys
keys, err := client.IPNS().ListKeys(ctx)
if err != nil {
    log.Fatal(err)
}
fmt.Println("Keys:", len(keys))
```

This step allows you to retrieve a list of all IPNS keys associated with your account.

**Step 6:** (Optional) Remove an IPNS key:

```go
// Remove a key (use k.IPNSName, not the original keyName)
_, err = client.IPNS().RemoveKey(ctx, k.IPNSName)
if err != nil {
    log.Fatal(err)
}
```

This step enables you to remove an IPNS key if necessary.
