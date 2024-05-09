// function getTokenUrl (token) {
//     return `${token.rest}/cosmwasm/wasm/v1/contract/${token.contract}/smart/eyJ0b2tlbl9pbmZvIjoge319`
// }

// async function getTokenData (endpoint) {
//     try {
//         let data = await fetch(getTokenUrl(endpoint.token));
//         const json = await data.json();
//         return json.data;
//     } catch (err) {
//         throw Error(`could not fetch data: ${err}`)
//     }
// }

module.exports = {
    calculatePrice: (rate, price) => (rate * price),
    calculateMarketCap: (price, supply) => (price * (supply / 1_000_000)),
    getGravediggerUrl: (gravedigger) => (
        `${gravedigger.rest}/cosmwasm/wasm/v1/contract/${gravedigger.contract}/smart/eyJzdGF0ZSI6e319`
    ),
    getBondedAssetUrl: (id) => (
        `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
    ),
    getBondedAssetData: async function getBondedAssetData (endpoint) {
        try {
            let data = await fetch(this.getBondedAssetUrl(endpoint.assetID));
            const json = await data.json();
            return json[endpoint.assetID].usd;
        } catch (err) {
            throw Error(`could not fetch data: ${err}`);
        }
    },
    getGravediggerData: async function getGravediggerData (endpoint) {
        let out;
        let data = await fetch(this.getGravediggerUrl(endpoint.gravedigger));
        try {
            const json = await data.json();
            out = json.data;
        } catch (err) {
            throw err;
        }
        return out;
    },
    processData: function processData (results, token) {
        const out = Object.assign({}, token);
        out.price = this.calculatePrice(results.gravedigger.exchange_rate, results.bondedAssetPrice);
        out.total_supply = results.gravedigger.total_usteak;
        out.circulating_supply = results.gravedigger.total_usteak;
        out.marketcap = this.calculateMarketCap(out.price, out.total_supply);
        return out;
    }
}