---
description: Getting Started with Lighthouse Go SDK - Store Files Permanently
icon: g
cover: ../.gitbook/assets/go-banner.png
coverY: 0
---

# Use Go SDK

## Introduction

Welcome to the beginner's tutorial on using the Lighthouse Go SDK for perpetual and decentralized file storage. With the integration of IPFS, Filecoin, and smart contracts on various blockchain networks, Lighthouse ensures data permanence, enhanced security, and cost-efficiency. This tutorial will guide you through the essential steps of leveraging the Lighthouse Go SDK to manage files perpetually on the decentralized network.

## Why Lighthouse Go SDK?

This innovative approach utilizes the robustness of IPFS and the storage capacity of Filecoin's miner network, file permanence and redundancy. Let's dive into the Lighthouse Go SDK to harness the power of perpetual decentralized file storage.

## Prerequisites

Before starting with the Lighthouse Go SDK, ensure you have the following:

1. Basic knowledge of Go programming.
2. Go installed on your computer (version 1.23 or higher).
3. A Lighthouse API token. If you haven't obtained one yet, sign up on the Lighthouse website to get your API token.

_**Note: If you already have Lighthouse API key, skip Step 0 and go to**_ [#step-1-install-the-lighthouse-python-sdk](use-go-sdk.md#step-1-install-the-lighthouse-python-sdk "mention")

#### **Step 0:** Getting your lighthouse API key [Files-Lighthouse-storage](https://files.lighthouse.storage/):

1. Go on [https://files.lighthouse.storage/](https://files.lighthouse.storage/) and Click on Login

<figure><img src="../.gitbook/assets/Python_2.png" alt="" width="563"><figcaption></figcaption></figure>

2. Select any of the login method and perform verification steps

<figure><img src="../.gitbook/assets/Python_3.png" alt="" width="563"><figcaption></figcaption></figure>

3. Click on API Key on the left side panel on the dashboard.

<figure><img src="../.gitbook/assets/Python_4.png" alt="" width="563"><figcaption></figcaption></figure>

4. Insert name for your API

<figure><img src="../.gitbook/assets/Python_5.png" alt="" width="494"><figcaption></figcaption></figure>

5. Copy the API Key

<figure><img src="../.gitbook/assets/Python_6.png" alt="" width="368"><figcaption></figcaption></figure>

***

### **Step 1:** Install the Lighthouse Go SDK

Begin by installing the Lighthouse Go SDK via go get, allowing you to interact with the Lighthouse protocol seamlessly:

```bash
go get github.com/lighthouse-web3/lighthouse-go-sdk
```

### **Step 2:** Import the Lighthouse Go SDK and Initialize

After installing the SDK, import the required libraries and initialize the Lighthouse client with your API token:

```go
package main

import (
    "context"
    "os"

    "github.com/lighthouse-web3/lighthouse-go-sdk/lighthouse"
)

func main() {
    // Replace "YOUR_API_TOKEN" with your actual Lighthouse API token
    // Or set LIGHTHOUSE_API_KEY environment variable
    client := lighthouse.NewClient(nil,
        lighthouse.WithAPIKey(os.Getenv("LIGHTHOUSE_API_KEY")),
    )
}
```

### **Step 3:** Upload a File

Next, let's upload a file to Lighthouse. We can use the `UploadFile` function for this purpose. We'll demonstrate both regular file upload and file upload with progress tracking:

```go
# Regular file upload
package main

import (
    "context"
    "fmt"
    "log"
    "os"

    "github.com/lighthouse-web3/lighthouse-go-sdk/lighthouse"
    "github.com/lighthouse-web3/lighthouse-go-sdk/lighthouse/schema"
)

func main() {
    client := lighthouse.NewClient(nil,
        lighthouse.WithAPIKey(os.Getenv("LIGHTHOUSE_API_KEY")),
    )

    ctx := context.Background()

    // Regular file upload
    sourceFilePath := "./path/to/your/file"
    upload, err := client.Storage().UploadFile(ctx, sourceFilePath)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("Regular File Upload Successful!")
    fmt.Printf("File CID: %s\n", upload.Hash)

    // File upload with progress tracking
    taggedSourceFilePath := "./path/to/your/file"
    uploadWithProgress, err := client.Storage().UploadFile(ctx, taggedSourceFilePath,
        schema.WithProgress(func(p schema.Progress) {
            fmt.Printf("\rUploading: %.1f%%", p.Percent())
        }),
    )
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("\nFile Upload with Progress Successful!")
    fmt.Printf("File CID: %s\n", uploadWithProgress.Hash)
}
```

### **Step 4:** Get Upload Information

After uploading a file, you might want to retrieve its information, such as the Content Identifier (CID). We can use the `List` function to get all uploaded files or the `Info` function for a specific file:

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

    // List all uploaded files
    listUploads, err := client.Files().List(ctx, nil)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("Upload Information:")
    for _, file := range listUploads.Data {
        fmt.Printf("CID: %s, File Name: %s\n", file.CID, file.Name)
    }

    // Get information for a specific file by CID
    // Replace "YOUR_CID_TO_CHECK" with the actual CID you want to check
    fileCIDToCheck := "YOUR_CID_TO_CHECK"
    fileInfo, err := client.Files().Info(ctx, fileCIDToCheck)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("File Info - Name: %s, Size: %d bytes\n", fileInfo.FileName, fileInfo.FileSizeInBytes)
}
```

### **Step 5:** Retrieve a File

Files stored on Lighthouse can be accessed via their CID through IPFS gateways. Here's how you can retrieve file information and access files:

```go
package main

import (
    "context"
    "fmt"
    "io"
    "log"
    "net/http"
    "os"

    "github.com/lighthouse-web3/lighthouse-go-sdk/lighthouse"
)

func main() {
    client := lighthouse.NewClient(nil,
        lighthouse.WithAPIKey(os.Getenv("LIGHTHOUSE_API_KEY")),
    )

    ctx := context.Background()

    // Replace "YOUR_CID_TO_RETRIEVE" with the actual CID of the file you want to retrieve
    fileCID := "YOUR_CID_TO_RETRIEVE"

    // Get file info first
    fileInfo, err := client.Files().Info(ctx, fileCID)
    if err != nil {
        log.Fatal(err)
    }

    // Retrieve file from IPFS gateway
    destinationPath := "./downloaded_file"
    ipfsGatewayURL := fmt.Sprintf("https://gateway.lighthouse.storage/ipfs/%s", fileCID)

    req, err := http.NewRequestWithContext(ctx, "GET", ipfsGatewayURL, nil)
    if err != nil {
        log.Fatal(err)
    }
    
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        log.Fatal(err)
    }
    defer resp.Body.Close()

    out, err := os.Create(destinationPath)
    if err != nil {
        log.Fatal(err)
    }
    defer out.Close()

    _, err = io.Copy(out, resp.Body)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("File retrieved successfully! Saved to: %s\n", destinationPath)
    fmt.Printf("File Name: %s, Size: %d bytes\n", fileInfo.FileName, fileInfo.FileSizeInBytes)
}
```

### **Step 6:** Check Deal Status

Lighthouse allows you to check the status of a file's deal on the network. This can be useful to ensure that the file is accessible and replicated. Use the `Status` function to check the deal status:

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

    // Replace "YOUR_CID_TO_CHECK_STATUS" with the actual CID whose deal status you want to check
    fileCIDToCheckStatus := "YOUR_CID_TO_CHECK_STATUS"
    dealStatus, err := client.Deals().Status(ctx, fileCIDToCheckStatus)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("Deal Status:")
    for _, deal := range dealStatus {
        fmt.Printf("Deal ID: %d, Status: %s, Storage Provider: %s\n", deal.DealID, deal.DealStatus, deal.StorageProvider)
    }
}
```

### **Step 7:** Manage Files (Pin and Delete)

Pin a CID with a display name, and delete by file ID (you can obtain IDs from the List endpoint):

```go
package main

import (
    "context"
    "log"
    "os"

    "github.com/lighthouse-web3/lighthouse-go-sdk/lighthouse"
)

func main() {
    client := lighthouse.NewClient(nil,
        lighthouse.WithAPIKey(os.Getenv("LIGHTHOUSE_API_KEY")),
    )

    ctx := context.Background()

    // Pin a file by CID with a name shown in dashboard
    if err := client.Files().Pin(ctx, "YOUR_CID", "my-file-name"); err != nil {
        log.Fatal(err)
    }

    // Delete a file by ID (get IDs from Files().List)
    if err := client.Files().Delete(ctx, "YOUR_FILE_ID"); err != nil {
        log.Fatal(err)
    }
}
```

### **Step 8:** List Files with Pagination

Use the `lastKey` cursor returned by the previous page to fetch the next page:

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

    var lastKey *string
    for page := 1; page <= 3; page++ { // example: first 3 pages
        lst, err := client.Files().List(ctx, lastKey)
        if err != nil {
            log.Fatal(err)
        }

        fmt.Printf("Page %d — %d file(s)\n", page, len(lst.Data))
        for _, f := range lst.Data {
            fmt.Printf("ID: %s  CID: %s  Name: %s\n", f.ID, f.CID, f.Name)
        }

        if lst.LastKey == nil || *lst.LastKey == "" {
            break // no more pages
        }
        lastKey = lst.LastKey
    }
}
```

### **Step 9:** Additional Upload Methods

Besides `UploadFile`, the SDK provides helpers for different sources:

```go
package main

import (
    "bytes"
    "context"
    "fmt"
    "log"
    "os"
    "strings"

    "github.com/lighthouse-web3/lighthouse-go-sdk/lighthouse"
)

func main() {
    client := lighthouse.NewClient(nil,
        lighthouse.WithAPIKey(os.Getenv("LIGHTHOUSE_API_KEY")),
    )

    ctx := context.Background()

    // UploadReader — stream any reader
    r := strings.NewReader("hello from reader")
    res1, err := client.Storage().UploadReader(ctx, "note.txt", int64(r.Len()), r)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("UploadReader CID:", res1.Hash)

    // UploadText equivalent — using UploadReader with strings.NewReader
    text := "hello"
    textReader := strings.NewReader(text)
    res2, err := client.Storage().UploadReader(ctx, "greet.txt", int64(len(text)), textReader)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("UploadText (via UploadReader) CID:", res2.Hash)

    // UploadBuffer equivalent — using UploadReader with bytes.NewReader
    data := []byte("buffer payload")
    dataReader := bytes.NewReader(data)
    res3, err := client.Storage().UploadReader(ctx, "buf.bin", int64(len(data)), dataReader)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("UploadBuffer (via UploadReader) CID:", res3.Hash)
}
```

## Conclusion

Congratulations! You have successfully learned how to interact with the Lighthouse API for file upload, retrieval, and checking deal status using the Go SDK. You can now integrate Lighthouse into your own applications to manage files securely and efficiently. Keep exploring the Lighthouse documentation to discover more features and functionalities offered by the platform.

Remember to handle exceptions appropriately in your applications, and make sure to secure your API token to protect your data on the Lighthouse platform. Happy coding!
