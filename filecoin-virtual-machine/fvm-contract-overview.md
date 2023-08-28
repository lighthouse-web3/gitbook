---
description: >-
  A concise guide detailing the functionalities and methods within the FVM
  Contract on the Calibration Testnet.
---

# FVM Contract Overview

### Lighthouse Contract Address

**Calibration Testnet**: `0x27235FbFee0F5519A8786EA7Fc13258234aC1847`

#### Functions for Developers

<table><thead><tr><th width="69">#</th><th width="196">Function Name</th><th width="174">Purpose</th><th width="155">Key Parameters</th><th>Outcome</th></tr></thead><tbody><tr><td>1</td><td><code>submit</code></td><td>Function that submits a new request to the oracle</td><td><code>_fileLink</code></td><td><code>Event: SubmitAggregatorRequest</code></td></tr><tr><td>2</td><td><code>getAllDeals</code></td><td>Get all deal IDs for a specified cid</td><td><code>_cid</code></td><td><code>Deal[]</code></td></tr><tr><td>3</td><td><code>getActiveDeals</code></td><td>return all the _cid's active dealIds</td><td><code>_cid</code></td><td><code>Deal[]</code></td></tr><tr><td>4</td><td><code>getExpiringDeals</code></td><td>return all the deals' dealIds if they are expiring within <code>epochs</code></td><td><code>_cid</code></td><td><code>Deal[]</code></td></tr></tbody></table>
