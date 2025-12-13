# MCP Protocol

## Lighthouse MCP Server

Use Case: The Lighthouse MCP Server is a Model Context Protocol (MCP)-compliant backend that allows AI agents to interact with decentralized storage through the Lighthouse network. It exposes a standardized set of tools for file management, dataset handling, and IPFS integration — enabling trusted, encrypted data workflows for AI systems.\


### Step 0: Clone & Set Up the MCP Agent Tool

First, clone the Lighthouse MCP Agent&#x20;

```sh
# Clone the repository
git clone https://github.com/lighthouse-web3/lighthouse-agent-tooling.git
cd lighthouse-agent-tooling


# Install dependencies
pnpm install

# Build the MCP server 
pnpm run build --filter @lighthouse-tooling/mcp-server

```

### 🔐 Step 1: Setup Environment & Authentication

#### 1.1 Get Credentials

* Lighthouse API Key:[ files.lighthouse.storage](https://files.lighthouse.storage/)

#### 1.2 Set Environment Variables

```sh
export LIGHTHOUSE_API_KEY="your-lighthouse-api-key"
export LOG_LEVEL="info"
```

#### 1.3 Start The Server&#x20;

```sh
pnpm run dev --filter @lighthouse-tooling/mcp-server
```

By default, the server starts locally and listens for incoming MCP client connections.\


## Available MCP Tools

### 1. lighthouse\_upload\_file

Uploads a file to Lighthouse’s decentralized network, with optional encryption.

Parameters

* filePath (string, required) – Path to file on local disk.
* encrypt (boolean, optional) – Whether to encrypt before upload.
* accessConditions (object, optional) – Define file access rules.\


Example :&#x20;

```sh
{
  "filePath": "./data/model.bin",
  "encrypt": true
}
```

### 2. lighthouse\_create\_dataset

Creates a structured dataset with metadata and grouped files.

Parameters

* name (string, required) – Dataset name.
* description (string, optional) – Description for reference.
* files (array, required) – Array of file paths.
* metadata (object, optional) – Additional metadata (version, tags).

Example :&#x20;

```sh
{
  "name": "training-v1",
  "description": "Image training dataset",
  "files": ["./images/train.zip", "./labels.csv"]
}
```

### 3. lighthouse\_fetch\_file

Retrieves a file by its CID and optionally decrypts it locally.

Parameters

* cid (string, required) – IPFS CID.
* outputPath (string, optional) – Destination path.
* decrypt (boolean, optional) – Whether to decrypt.

Example:

```sh
{
  "cid": "QmYwAPJzv5CZsnA...",
  "decrypt": true
}
```

### Programmatic Usage

You can embed the MCP server into a custom Node.js environment.

Example:

```sh
import { LighthouseMCPServer } from "@lighthouse-tooling/mcp-server";

const server = new LighthouseMCPServer({
  lighthouseApiKey: process.env.LIGHTHOUSE_API_KEY,
  logLevel: "info",
  enableMetrics: true,
});

await server.start();
console.log("Server running...");

```

### Testing

Tests include:

* Unit tests for each service
* Integration tests for tool calls
* Performance validation

```sh
# Run all tests
pnpm test --filter @lighthouse-tooling/mcp-server

# With coverage
pnpm run test:coverage --filter @lighthouse-tooling/mcp-server

```
