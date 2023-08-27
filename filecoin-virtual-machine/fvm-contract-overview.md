---
description: >-
  A concise guide detailing the functionalities and methods within the FVM
  Contract on the Calibration Testnet.
---

# FVM Contract Overview

### Lighthouse Contract Address

**Calibration Testnet**: `0x27235FbFee0F5519A8786EA7Fc13258234aC1847`

#### Functions for Lighthouse Nodes

<table><thead><tr><th width="62">#</th><th width="178">Function Name</th><th>Purpose</th><th>Key Parameters</th><th>Outcome</th></tr></thead><tbody><tr><td>1</td><td><code>setDealDetails</code></td><td>Saves file info and related deal details.</td><td><code>_fileId</code>, <code>_dealId</code>, <code>_isMigrated</code>, <code>_cid</code></td><td>Announces if the file's migration was successful or not.</td></tr></tbody></table>

#### Functions for Developers

<table><thead><tr><th width="69">#</th><th width="208">Function Name</th><th width="159">Purpose</th><th width="155">Key Parameters</th><th>Outcome</th></tr></thead><tbody><tr><td>1</td><td><code>verify</code></td><td>Confirms a deal and file by the aggregator.</td><td><code>_fileId</code>, <code>_dealId</code>, <code>_proof</code>, <code>_verifierData</code></td><td>Announces when a request is done and records the deal ID.</td></tr><tr><td>2</td><td><code>storeData</code></td><td>Keeps a file using its link.</td><td><code>_fileLink</code></td><td>Shares info about the saved file.</td></tr><tr><td>3</td><td><code>getDealDetails</code></td><td>Gives the deal ID for a certain file.</td><td><code>_fileId</code></td><td>-</td></tr><tr><td>4</td><td><code>checkMigration</code></td><td>Checks if a file was transferred.</td><td><code>_fileId</code></td><td>Tells if the file was saved or not.</td></tr><tr><td>5</td><td><code>checkDealExpire</code></td><td>Checks if a deal is over.</td><td><code>_dealId</code></td><td>-</td></tr><tr><td>6</td><td><code>getTimeToDealExpire</code></td><td>Calculates time left before a deal ends.</td><td><code>_dealId</code></td><td>-</td></tr><tr><td>7</td><td><code>getDeals</code></td><td>Gives all deal IDs for a file.</td><td><code>_fileLink</code></td><td>-</td></tr><tr><td>8</td><td><code>getLatestFileId</code></td><td>Gets the current fileId, symbolizing saved files.</td><td>None</td><td>-</td></tr><tr><td>9</td><td><code>getFileDetails</code></td><td>Offers info about a file.</td><td><code>_fileId</code></td><td>Shows file's user, link, deal ID, transfer status, and content ID.</td></tr></tbody></table>
