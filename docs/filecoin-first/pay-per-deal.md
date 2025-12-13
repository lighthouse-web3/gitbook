---
hidden: true
---

# 💰 Pay Per Deal

All deals created by Filecoin First are perpetual imply, deals are renewed with miner before it gets expired for long term storage of data. Users can pay once and store the files for long duration of time.

Users can pay for whatever amount of data they wish to store on Filecoin without buying any dedicated plan. Lighthouse uses endowment pool for managing funds such that deals can be renewed with Filecoin miners without asking for recurring payments from the user.

In order to store data of Filecoin users will have to deposit funds in Lighthouse endowment pool address: [`0x0E8b07CefDC0363cA6e0Ca06093c2596746f7d3d`](https://filfox.info/en/address/0x0E8b07CefDC0363cA6e0Ca06093c2596746f7d3d)  and dollar amount will be credit against their wallet address that can be used for deal creation. Users can refer to this [gist](https://gist.github.com/parva-jain/16429130fc2958c286287db8fe8ae28a) for depositing funds. To check balance user can use given API

```
// Get balance
curl 'https://filecoin-first.lighthouse.storage/api/v1/user/get_profile' -H 'Authorization: API_KEY'
```

