---
description: Using IPNS to handle mutable data
---

# 🔄 IPNS - Handle Mutable Data

IPNS (InterPlanetary Name System) is a system that allows you to create mutable pointers to data in the IPFS network. In simpler terms, it's like a dynamic address that always points to the latest version of your content. Using the Lighthouse SDK, you can easily create, publish, fetch, and remove IPNS records.

### 1. What is IPNS?

Think of IPNS as a dynamic domain name for your content on IPFS. While IPFS hashes are static and change when content changes, IPNS provides a static address that can be updated to point to new content.

### 2. Basic steps involved

1. Create an IPNS key
2. Map the IPNS key with a CID
3. In case of CID change just update the mapping, the IPNS key remains the same
4. View the file using: \
   [https://gateway.lighthouse.storage/ipns/k51qzi5uqu5dlr99jbwpbli7iqtdd60c8hk0wgrsxyvzu3lhymapd1rn4npdd8/](https://gateway.lighthouse.storage/ipns/k51qzi5uqu5dlr99jbwpbli7iqtdd60c8hk0wgrsxyvzu3lhymapd1rn4npdd8/)

{% tabs %}
{% tab title="JS SDK" %}
#### Step 1: Create a New IPNS Key

```javascript
const keyResponse = await lighthouse.generateKey(apiKey)
/* Sample response
{
  data: {
    "ipnsName": "6cda213e3a534f8388665dee77a26458",
    "ipnsId": "k51qzi5uqu5dm6uvby6428rfpcv1vcba6hxq6vcu52qtfsx3np4536jkr71gnu"
  }
}
*/
```

Upon successful creation, you will receive an IPNS name and its corresponding ID.

#### Step 2: Publish an IPFS Hash to IPNS

```javascript
const pubResponse = await lighthouse.publishRecord(
  "YOUR_IPFS_HASH", // replace with your IPFS hash
  keyResponse.data.ipnsName,
  apiKey
)
/* Sample response
{
  data: {
    "Name": "k51qzi5uqu5dm6uvby6428rfpcv1vcba6hxq6vcu52qtfsx3np4536jkr71gnu",
    "Value": "/ipfs/Qmd5MBBScDUV3Ly8qahXtZFqyRRfYSmUwEcxpYcV4hzKfW"
  }
}
*/
```

The response will show the IPNS name and the IPFS path it points to.

#### Step 3: Retrieve All IPNS Keys

```javascript
const allKeys = await lighthouse.getAllKeys(apiKey)
/* Sample response
{
  data: [
    {
      "ipnsName": "6cda213e3a534f8388665dee77a26458",
      "ipnsId": "k51qzi5uqu5dm6uvby6428rfpcv1vcba6hxq6vcu52qtfsx3np4536jkr71gnu",
      "publicKey": "0xc88c729ef2c18baf1074ea0df537d61a54a8ce7b",
      "cid": "Qmd5MBBScDUV3Ly8qahXtZFqyRRfYSmUwEcxpYcV4hzKfW",
      "lastUpdate": 1684855771773
    }
  ]
}
*/
```

#### Step 4: Remove an IPNS Key

```javascript
const pubResponse = await lighthouse.publishRecord("YOUR_IPFS_HASH",ipns_name,apiKey)
```

#### Step 5: Update an IPNS Key

```javascript
const removeRes = await lighthouse.removeKey(keyResponse.data.ipnsName, apiKey)
/* Sample Response
{
  data: { 
    Keys: [
      {
        "Name": "3090a315e92c495ea36444f2bbaeefaf",
        "Id": "k51qzi5uqu5dm8gfelll8own1epd9osmlig49il5mmphkrcxbnhydkmx101x15"
      }
    ]
  }
}
*/
```
{% endtab %}

{% tab title="API" %}
```bash
# Generate Key
curl -H 'Authorization: Bearer API_KEY' 'https://api.lighthouse.storage/api/ipns/generate_key'

# Publish CID
curl -H 'Authorization: Bearer API_KEY' 'https://api.lighthouse.storage/api/ipns/publish_record?cid=<cid>&keyName=<key>'

# Get All Keys
curl -H 'Authorization: Bearer API_KEY' 'https://api.lighthouse.storage/api/ipns/get_ipns_records'

# Remove Key
curl -H 'Authorization: Bearer API_KEY' 'https://api.lighthouse.storage/api/ipns/remove_key?keyName=<keyName>'
```
{% endtab %}

{% tab title="CLI" %}
```bash
lighthouse-web3 ipns --generate-key
#Returns:
#ipnsName: ca9e19dcf8e54e86a4dce40b155ffcad
#ipnsId: k51qzi5uqu5dlk72k0t8c80gg8c4lb9bzd0jsd9xtauso88hfkx9ytgm05caao

lighthouse-web3 ipns --publish --key=ca9e19dcf8e54e86a4dce40b155ffcad --cid=QmWC9AkGa6vSbR4yizoJrFMfmZh4XjZXxvRDknk2LdJffc
#Returns:
#Published:
#Visit: https://gateway.lighthouse.storage/ipns/k51qzi5uqu5dlk72k0t8c80gg8c4lb9bzd0jsd9xtauso88hfkx9ytgm05caao

lighthouse-web3 ipns --list
#Returns:
#List of ipns records:
#  Key:     ca9e19dcf8e54e86a4dce40b155ffcad
#  IPNS ID: k51qzi5uqu5dlk72k0t8c80gg8c4lb9bzd0jsd9xtauso88hfkx9ytgm05caao
#  CID:     QmWC9AkGa6vSbR4yizoJrFMfmZh4XjZXxvRDknk2LdJffc
  
lighthouse-web3 ipns --remove ca9e19dcf8e54e86a4dce40b155ffcad
#Returns:
#Record Removed!!!
```
{% endtab %}

{% tab title="Go SDK" %}
**Step 1: Create a New IPNS Key**

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

    // Generate a new IPNS key
    k, err := client.IPNS().GenerateKey(ctx, "my-key")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("IPNS Name: %s\n", k.IPNSName)
    fmt.Printf("IPNS ID: %s\n", k.IPNSId)
}
```

Upon successful creation, you will receive an IPNS name and its corresponding ID.

**Step 2: Publish an IPFS Hash to IPNS**

```go
// Publish a CID to the key (use k.IPNSName, not the original keyName)
pub, err := client.IPNS().PublishRecord(ctx, "YOUR_IPFS_HASH", k.IPNSName)
if err != nil {
    log.Fatal(err)
}
fmt.Printf("IPNS Name: %s\n", pub.Name)
fmt.Printf("IPFS Path: %s\n", pub.Value)
```

The response will show the IPNS name and the IPFS path it points to.

**Step 3: Retrieve All IPNS Keys**

```go
// List all IPNS keys
keys, err := client.IPNS().ListKeys(ctx)
if err != nil {
    log.Fatal(err)
}
fmt.Printf("Total keys: %d\n", len(keys))
for _, key := range keys {
    fmt.Printf("IPNS Name: %s, IPNS ID: %s\n", key.IPNSName, key.IPNSId)
}
```

**Step 4: Update an IPNS Key**

To update an IPNS key, simply publish a new CID to the same IPNS name:

```go
// Update the IPNS key to point to a new CID
pub, err := client.IPNS().PublishRecord(ctx, "NEW_IPFS_HASH", k.IPNSName)
if err != nil {
    log.Fatal(err)
}
fmt.Printf("Updated IPNS: %s -> %s\n", pub.Name, pub.Value)
```

**Step 5: Remove an IPNS Key**

```go
// Remove a key (use k.IPNSName, not the original keyName)
_, err = client.IPNS().RemoveKey(ctx, k.IPNSName)
if err != nil {
    log.Fatal(err)
}
fmt.Println("IPNS key removed successfully")
```
{% endtab %}
{% endtabs %}



