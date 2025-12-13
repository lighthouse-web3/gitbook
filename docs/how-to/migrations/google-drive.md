---
description: Migration using Google Drive.
---

# ☁️ Google Drive

## Migrate Google Drive Files to Lighthouse

Use Case: Transfer files from your Google Drive into Lighthouse’s permanent, encrypted, and agent-accessible storage. Ideal for AI agents, public file access, and decentralized data workflows.

### Step 0: Clone & Set Up the Migration CLI Tool

First, clone the Lighthouse Migration CLI tool and install dependencies:

```sh
# Clone the repository
git clone https://github.com/lighthouse-web3/lighthouse-migration-tooling.git
cd light-house-migration-tooling

# Install dependencies
npm install

# Build the project
npm run build

# Link the CLI globally
npm link
```



### 🔐 Step 1: Setup Environment & Authentication

#### 1.1 Get Credentials

* Lighthouse API Key:[ files.lighthouse.storage](https://files.lighthouse.storage/)
* Google OAuth Client ID & Secret: via[ Google Cloud Console](https://console.cloud.google.com/apis/credentials)

#### 1.2 Create a .env File

```sh
cp .env.example .env
# Then edit .env to include:
LIGHTHOUSE_API_KEY=your_lighthouse_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

```

#### 1.3 Authenticate with Google Drive

```
lh auth init
```

* Opens browser for Google login
* Grants Drive access to the CLI
* Stores tokens securely in your OS keyring
* Supports automatic refresh for future sessions\


Check status

```sh
lh auth status
```

✅ Expected:

✔ Authenticated | your-email@gmail.com | Valid token\


### Step 2: Browse & Analyze Google Drive

List folders:

```sh
lh list folders --search "Photos"
```

List files:

```sh
lh list files --extension pdf
lh list files --folder 1abc123xyz
```

Analyze a dry-run migration (no upload yet):

```sh
lh migrate drive --folders 1abc123xyz --analyze
```

### Step 3: Migrate Files to Lighthouse

Migrate an entire folder:

```sh
lh migrate drive --folders 1abc123xyz
```

Migrate specific file types:

```sh
lh migrate drive --folders 1abc123xyz --include pdf,jpg
```

Filter by file size, type, or ID:

```sh
lh migrate drive \
  --folders 1abc123xyz \
  --include pdf \
  --exclude tmp,log \
  --max 100

```

Migrate individual files:

```sh
lh migrate drive --files 1xyz789,1uvw456
```

