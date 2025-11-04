# 📌 Pin CID

A user can create an additional copy of your file in the IPFS network or migrate a file to the Lighthouse IPFS node pinning service can be used.

{% tabs %}
{% tab title="API" %}
A POST request has to be made with cid(required) and fileName(optional) parameters. API key is required for authentication.

{% code overflow="wrap" %}
```bash
curl -X POST -H 'Authorization: Bearer API_KEY' -H "Content-Type: application/json" -d '{"cid": "QmWC9AkGa6vSbR4yizoJrFMfmZh4XjZXxvRDknk2LdJffc","fileName": "abc.png"}' https://api.lighthouse.storage/api/lighthouse/pin
```
{% endcode %}
{% endtab %}

{% tab title="Go SDK" %}
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

    cid := "QmWC9AkGa6vSbR4yizoJrFMfmZh4XjZXxvRDknk2LdJffc"
    fileName := "abc.png" // Optional

    // Pin a CID with a display name
    err := client.Files().Pin(ctx, cid, fileName)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("CID %s pinned successfully with name: %s\n", cid, fileName)
}
```
{% endtab %}
{% endtabs %}
