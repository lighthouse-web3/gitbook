# FVM Contract

### Lighthouse contract address:&#x20;

Calibration Testnet: `0xAD978E56d3264673bA8705c1e7b2f00932345B1D`

### Contract Functions

<mark style="color:blue;">**A)**</mark> To be called by Lighthouse Nodes

<table><thead><tr><th width="68" data-type="number">#</th><th width="148">Method</th><th width="301">Parameters</th><th>Method Description</th></tr></thead><tbody><tr><td>1</td><td>verifyPodsi</td><td><p>_fileId : unit <br>_dealId : uin64 <br>_proof : InclusionProof  </p><p>_verifierData : InclusionVerifierData</p></td><td>A function that serves as a callback function called by the aggregator. It receives various parameters related to the deal and file. It emits the CompleteAggregatorRequest event and saves the deal ID for the file.</td></tr><tr><td>2</td><td>setDealDetails</td><td><p>_fileId : uint <br>_dealId : uint</p><p>_isMigrated : bool</p></td><td>A public function used to store the file ID against the deal ID. It is called by the lighthouse aggregator backend. It emits the DealNotCreated event if the migration of the file fails and the DealCreated event if the migration is successful.</td></tr></tbody></table>



<mark style="color:blue;">**B)**</mark> To be called by Developer

<table><thead><tr><th width="62.00000000000003">#</th><th width="161">Method</th><th width="170">Parameters</th><th>Parameter Description</th><th>Method Description</th></tr></thead><tbody><tr><td>1</td><td>storeData</td><td>_fileLink : bytes</td><td>Link of the file user wants to store</td><td>A public function used to store a file with its link. It takes the file link as input and emits the DataInfo event with the details of the file.</td></tr><tr><td>2</td><td>getDealId</td><td>_fileId : uint</td><td>Unique ID of the file</td><td>A public function that allows users to get the deal ID associated with a given file ID</td></tr><tr><td>3</td><td>checkMigration</td><td>_fileId : uint</td><td>Unique ID of the file</td><td>A public function that checks whether a file is successfully migrated. It returns true if the file is stored and false if it's not stored.</td></tr><tr><td>4</td><td>checkDealExpire</td><td>_dealId : uint64</td><td>Deal ID of the file</td><td>A public function that checks if a deal with a given deal ID has expired or not.</td></tr><tr><td>5</td><td>getTimeToDealExpire</td><td>_dealId : uint64</td><td>Deal ID of the file</td><td>A public function that calculates the time left before a deal with a given deal ID expires.</td></tr><tr><td>6</td><td>getDeals</td><td>_fileLink : bytes</td><td>File link of the file</td><td>A public function that returns an array of all deal IDs associated with a given file link.</td></tr><tr><td>7</td><td>getLatestFileId</td><td>none</td><td>none</td><td>A public function that returns the current fileId, which represents the total number of files stored in the contract</td></tr><tr><td>8</td><td>getFileDetails</td><td>_fileId : uint</td><td>Unique ID of the file</td><td>A public function that provides details about a file with a given fileId. It returns the user address, file link, associated deal ID, and whether the file is successfully migrated.</td></tr></tbody></table>

