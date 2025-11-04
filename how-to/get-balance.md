# 💰 Get Balance

Users can check their account balance with the given command. It returns the data limit and current usage in bytes.

{% tabs %}
{% tab title="JS SDK" %}
```javascript
const getBalance = async() => {
  /*
    @param {string} apiKey - your api key.
  */
  const apiKey = 'YOUR_API_KEY';
  const balance = await lighthouse.getBalance(apiKey);
  
  /* Sample Response (Unit is Bytes)
      {data: { dataLimit: 687194767360, dataUsed: 7012827847 }}
  */
}
```
{% endtab %}

{% tab title="API" %}
```bash
curl https://api.lighthouse.storage/api/user/user_data_usage?publicKey=<publicKey>
```
{% endtab %}

{% tab title="CLI" %}
```bash
lighthouse-web3 balance
```
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

    balance, err := client.User().Balance(ctx)
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("Data Limit: %d bytes\n", balance.DataLimit)
    fmt.Printf("Data Used: %d bytes\n", balance.DataUsed)
    fmt.Printf("Remaining: %d bytes\n", balance.DataLimit-balance.DataUsed)
}
```
{% endtab %}
{% endtabs %}
