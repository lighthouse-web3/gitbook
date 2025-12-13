# Web Sockets \[deprecated]

All Lighthouse node interactions can be done using web sockets which allows users and applications to upload files to IPFS to get CIDs, calculate cost of storage to filecoin, get storage info for a file on the filecoin network, get file size etc.

```javascript
// recommended package for websocket
npm install socket.io-client@2.4.0
```

* **Upload File**

To upload a file using web sockets, first event sent is to create and open a file with a specific name and path on the server side, after which another events starts sending data in chunks.

Then two events listen for the output data, the MoreData event returns the data containing the chunk number uploaded and the percent of data uploaded. The FileDownloaded event represents another file getting downloaded

```javascript
// create and open a file on the server side
socket.emit(“Start”, { name: Name, size: Size, path: Path });

// upload data of that file in chunks
socket.emit(“Upload”, { name: Name, data: Data, path: Path });

// listen for upload of chunks of data, iterate over chunk number
socket.on(“MoreData”), (data) => {
    console.log(data); // data = { Place: chunkNumber, Percent: percentUploaded}
});

// listen to event for full file upload
socket.on(“FileDownloaded”, () => {
    filesProcessed += 1; // another file downloaded from the list of files being uploaded
    if (filesProcessed === totalFiles) {
        socket.emit(“GetCid”, pathToFile);
    }
});

// get cid of folder containing all files uploaded wrapped into a common folder
// in response to GetCid event emitted
socket.on(“FolderCid”, (data) => {
    console.log(data.cid);
});
```

* **Get Storage Info** - emit a cid to get the storage info back from the lighthouse node

```javascript
var socket = new io(“http://13.233.207.237:3002”);

// emit cid to get storage info
socket.emit(“cid”, cid);

// listen for storage info
socket.on(“storageInfo”, (info) => {
    console.log(info);
});
```

* **Get CID size** - emit a GetCidSize event to get back the size of that cid.&#x20;

```javascript
// emit event with cid as data
socket.emit(“GetCidSize”, cid);

// listen for CidSize event
socket.on(“CidSize”, (data) =>  {
    console.log(data); // size of cid in bytes
});
```

{% hint style="info" %}
The cid has to be available on public ipfs network or on the local ipfs instance of the lighthouse node when a file was previously uploaded to get cid.
{% endhint %}

* **Get storage cost** -&#x20;

One can refer to storage cost on filecoin network from [https://file.app](https://file.app) and also contains the comparisons to storage costs from other web2 alternatives.

* **Get list of all active deals and stored cids** -

\[ TO-DO ]&#x20;
