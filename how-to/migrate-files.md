---
description: Migrating backup files to Lighthouse Storage
---

# 📦 Migrate Files

Migrating files, especially in large quantities, can be a daunting task. However, by utilizing scripts, the process can be automated and made much smoother. In this guide, we will go over a simple migration script to move files from a local directory to Lighthouse storage.



{% tabs %}
{% tab title="JS Script" %}
### 🖥️ Using the JavaScript Script:

### 1. Prerequisites:

Ensure you have the required modules installed: `os, axios, node-json-db, form-data, fs-extra, mime-types, and path`

Install them via npm:

```bash
npm install axios node-json-db form-data fs-extra mime-types
```

### 2. Understanding the Script:

#### 2.1. Configuration and Initial Setup

Firstly, the required modules are imported. Configuration databases `record` and `record2` are set up for logging upload responses. These are useful for tracking upload progress and responses.

```javascript
const os = require("os");
const axios = require("axios");
const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
const FormData = require("form-data");
const { createReadStream } = require("fs-extra");
const mime = require("mime-types");
const path = require("path");
const { readdir, stat } = require("fs-extra");
const record = new JsonDB(
  new Config(process.env.d1 || "uploadFull.json", true, true, "/")
);
const record2 = new JsonDB(
  new Config(process.env.d1 || "upload.json", true, true, "/")
);

const BASEURL = "https://node.lighthouse.storage";
const BASE_DIR = "./backup/";
```

#### 2.2. Walking Through Directories

The `walk` function is a recursive function to traverse through folders and subfolders to get all file paths. This ensures every file, irrespective of its depth in the folder structure, gets uploaded.

```javascript
async function walk(dir) {
  let results = [];
  const files = await readdir(dir);

  for (const file of files) {
    const filePath = `${dir}/${file}`;
    const _stat = await stat(filePath);

    if (_stat.isDirectory()) {
      results = results.concat(await walk(filePath));
    } else {
      results.push(filePath);
    }
  }
  return results;
}
```

#### 2.3. Uploading Files

The `upload` function manages the process of uploading the files. To handle a large number of files, they're split into chunks, and each chunk is uploaded sequentially. The function accepts `sourcePath` (where the files are), your Lighthouse `API token`, a `multi` flag (to wrap files in a directory), and an optional `chunkSize`.

```javascript
const upload = async (sourcePath, APItoken, multi, chunkSize = 10) => {
  const endpoint = BASEURL + `/api/v0/add?wrap-with-directory=${multi}`;
  const files = await walk(sourcePath);
  const mimeType = mime.lookup(sourcePath);

  const chunks = [];
  for (let i = 0; i < files.length; i += chunkSize) {
    chunks.push(files.slice(i, i + chunkSize));
  }
  let count = 0;
  const results = {};

  for (const chunk of chunks) {
    const data = new FormData();

    chunk.forEach((file) => {
      data.append("file", createReadStream(file), {
        filename: path.basename(file.split("?")[0]),
      });
    });

    let response = await axios.post(endpoint, data, {
      withCredentials: true,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {
        "Content-type": `multipart/form-data; boundary= ${data.getBoundary()}`,
        Encryption: "false",
        "Mime-Type": `${mimeType}`,
        Authorization: "Bearer " + APItoken,
      },
    });

    if (typeof response.data === "string" && multi) {
      response.data = JSON.parse(
        `[${response.data.slice(0, -1)}]`.split("\n").join(",")
      );
    } else {
      const temp = response.data.split("\n");
      response.data = JSON.parse(temp[temp.length - 2]);
    }

    results[`Chunk: ${count}`] = response.data;
    console.log(`Chunk: ${count}`);
    await record.push(`/${count}`, response.data);
    count++;
  }

  return results;
};
```

#### 2.4. Initiating the Upload

The `uploadBackup` function serves as the script's entry point. It attempts to upload files from the `BASE_DIR` and logs the response or any errors encountered.

```javascript
const uploadBackup = async () => {
  try {
    const result = await upload(
      BASE_DIR,
      "LIGHTHOUSE_API_KEY",
      true
    );
    await record2.push("/", result);
  } catch (error) {
    console.error("error", error);
  }
};

uploadBackup();
```

### 3. Using the Migration Script:

#### 3.1. Setting Environment Variables

Before running the script, ensure you set the `d1` environment variable if you wish to override the default database filenames (`uploadFull.json` and `upload.json`).

#### 3.2. Running the Script

Execute the script using:

```bash
node migrateFiles.js
```

This will start the migration process, uploading files in chunks. After each chunk is uploaded, you'll see logs in the console.
{% endtab %}

{% tab title="UI (Files Dapp)" %}
### 🖥️ Using the Files Dapp:

### Step 1: Access the Platform

Navigate to [Files Dapp](https://files.lighthouse.storage/) and either register for a new account or log in if you already have one.

### Step 2: Initiate Migration

Click on the `migration` option in the left panel.

<figure><img src="../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

### Step 3: Create a New Migration

Select the `Create Migration` button to start the process.

### Step 4: Provide Files

Enter the CID (Content Identifier) for your content. Alternatively, if you have multiple CIDs, you can upload a CSV file with all the CIDs listed.

<figure><img src="../.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>

### Step 5: Execute Migration

Click on the `Migrate` button and patiently wait for the process to conclude. Once completed, all your migrated files will be accessible through your dashboard.
{% endtab %}

{% tab title="API" %}
```bash
curl -X POST -H "Authorization: Bearer API_KEY" \
  -F "file1=@./path/to/file1" \
  -F "file2=@./path/to/file2" \
  ...
  -F "fileN=@./path/to/fileN" \
  https://node.lighthouse.storage/api/v0/add
```
{% endtab %}

{% tab title="CLI" %}
```bash
find ./backup -type f -print0 | xargs -0 -I {} curl -X POST \
  -H "Authorization: Bearer c9a776bf.253b7e973fad446a9acec26004915d91" \
  -F "file=@{}" \
  https://node.lighthouse.storage/api/v0/add
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="Tips and Notes" %}
* Ensure the backup folder (or folder specified in `BASE_DIR`) contains the files you want to upload.
* For security, consider parameterizing the token instead of hardcoding it.
* Adjust `chunkSize` in the `upload` function to control how many files get uploaded in each request.
{% endtab %}

{% tab title="Potential Enhancements" %}
* Error Handling: Implement a retry mechanism for failed uploads.
* Token Management: Integrate a system to refresh the token if it expires.
* Logging: Incorporate a more detailed logging system to keep track of successful and failed uploads.
{% endtab %}
{% endtabs %}
