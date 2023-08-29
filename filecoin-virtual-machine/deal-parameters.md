# Deal Parameters

When uploading a file, you can customize how it's stored in Lighthouse using the **deal parameters**:

**num\_copies**: Decide how many backup copies you want for your file. The Max limit is 3. For instance, if set to 3, your file will be stored by 3 different storage providers.

**repair\_threshold**: Determines the time a storage sector is considered "broken" if a provider fails to confirm they still have your file. It's measured in "epochs", with 28800 epochs being roughly 10 days.

**renew\_threshold**: Specifies when your storage deal should be renewed. It's also measured in epochs.

**miner**: If you have preferred miners, list their addresses here. For testing, it's recommended to use t017840.

**network**: This should always be set to 'calibration' (for RAAS services to function) unless you want to use the mainnet.

**add\_mock\_data**: This field is used to make smaller files reach the minimum file size accepted on the Lighthouse calibration test network (1 MB). If your file is less than the minimum size, `add_mock_data` will append a mock file to ensure it meets the storage requirements. The value indicates the size in MB. For instance, if your file is 256KB, the add\_mock\_data should be set to 2 to the minimum target.

Example:

```
// Sample JSON of deal parameters
const dealParams = {
  num_copies: 2,
  repair_threshold: 28800,
  renew_threshold: 240,
  miner: ["t017840"],
  network: 'calibration',
  add_mock_data: 2
};
```

```
# Use cases
// This will use default values of other parameters.
const dealParam_default = {
	"network":"calibration"
}

// If user wants to bundle 4MB dummy file with their data
const dealParam_mock = {
	"add_mock_data": 4,
	"network":"calibration"
}

// specifying null will disable functionality of specified field
const dealParam_ignore = {
	"num_copies":null,
	"repair_threshold":null,
	"renewal_threshold":null,
	"network":"calibration"
}
```

**Friendly Tip**: The term "epoch" can be thought of as a time unit in filecoin under which various operations occur like PoST PoRep..., with 2880 epochs being equivalent to a day.
