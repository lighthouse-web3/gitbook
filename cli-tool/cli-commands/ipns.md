# ipns

List of commands for using IPNS

```
lighthouse-web3 ipns --generate-key
Returns:
ipnsName: ca9e19dcf8e54e86a4dce40b155ffcad
ipnsId: k51qzi5uqu5dlk72k0t8c80gg8c4lb9bzd0jsd9xtauso88hfkx9ytgm05caao

lighthouse-web3 ipns --publish --key=ca9e19dcf8e54e86a4dce40b155ffcad --cid=QmWC9AkGa6vSbR4yizoJrFMfmZh4XjZXxvRDknk2LdJffc
Returns:
Published:
Visit: https://gateway.lighthouse.storage/ipns/k51qzi5uqu5dlk72k0t8c80gg8c4lb9bzd0jsd9xtauso88hfkx9ytgm05caao

lighthouse-web3 ipns --list
Returns:
List of ipns records:

  Key:     ca9e19dcf8e54e86a4dce40b155ffcad
  IPNS ID: k51qzi5uqu5dlk72k0t8c80gg8c4lb9bzd0jsd9xtauso88hfkx9ytgm05caao
  CID:     QmWC9AkGa6vSbR4yizoJrFMfmZh4XjZXxvRDknk2LdJffc
  
lighthouse-web3 ipns --remove ca9e19dcf8e54e86a4dce40b155ffcad
Returns:
Record Removed!!!
```

