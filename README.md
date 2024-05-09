# Backbone off-chain "oracle"

## Strategy example

```JavaScript
module.exports = {
    path: "", // end-point path to be used
    assetID: "", // coingecko asset id for getting the bonded asset value
    gravedigger: {
        contract: "", // address for the gravedigger contract that represents this backbone asset
        rest: "" // rest api to use
    },
    token: {
        name: "", // full name of the backbone asset
        symbol: "", // symbol of the asset
        decimals: 6, // decimals of the asset
        total_supply: 0, // this is filled later on
        circulating_supply: 0, // this is filled later on
        contract_address: "" // contract address or token factory address
    }
}
```

## Response example

```JSON
{
    "name": "BackBone Labs Liquid Staked HUAHUA",
    "symbol": "bHUAHUA",
    "decimals": 6,
    "total_supply": "1165622841090915",
    "circulating_supply": "1165622841090915",
    "contract_address": "chihuahua1jz5n4aynhpxx7clf2m8hrv9dp5nz83k67fgaxhy4p9dfwl6zssrq3ymr6w",
    "price": 0.00014754727212168092,
    "marketcap": 171984.47052568806
}
```