import axios from 'axios'
const IP = 'https://rpc.bhpa.io'
//查询资产
export function getasset(address) {
    return axios.post('https://rpc.bhpa.io', {
        jsonrpc: "2.0",
        method: "getaccountstate",
        params: [address],
        id: 1
    })
}
//获取行情数据，币价
export function getPrice(exchange, eth_usdt) {
    return axios.get("https://api.bhpa.io/exchange/api/getPrice", { params: { exchangeName: exchange, symbol: eth_usdt } })
}
//获取1.0钱包余额和UTXO
export function getbalance(address) {
    return axios.post("https://rpc.bhpa.io", { jsonrpc: "2.0", id: 1, method: "getunspents", params: [address, "0x13f76fabfe19f3ec7fd54d63179a156bafc44afc53a7f07a7a15f6724c0aa854"] })
}
//1.0广播
export function sendrawtransaction(txHex) {
    return axios.post("https://rpc.bhpa.io", {
        jsonrpc: "2.0",
        method: "sendrawtransaction",
        params: [txHex],
        id: 1
    })
}
//2.0获取账户信息
export function getAccounts(address) {
    return axios.get("http://rpc.bhpnet.io/auth/accounts/" + address, { params: {} })
}

// 广播交易
export function broadcastTrading(json) {
    return axios.post("http://rpc.bhpnet.io/txs", json)
}
//以太坊查询余额
export function eth_getBalance(address) {
    return axios.post(
        "https://mainnet.infura.io/v3/7016d0346d5b46aba5b559a6edd3547d"
        , { "jsonrpc": "2.0", "method": "eth_getBalance", "params": [address, "latest"], "id": 1 })
}


//BTC查询余额和Utxo
export function btc_getBalanceAndUTXO(address) {
    return axios.get(
        "https://api.blockcypher.com/v1/btc/main/addrs/"+address,{ params: { unspentOnly: true } })
}
// BTC广播交易
export function sendBTC(stx) {
    return axios.post("http://47.244.216.20:16969/api/sendrawtransaction", {
        tx: stx
      })
}
// BTC手续费
export function BTCSatoshis() {
    return axios.get("https://api.blockcypher.com/v1/btc/main")
}

//BHP1.0验证地址
export function validateaddress(address) {
    return axios.post('https://rpc.bhpa.io', {
        "jsonrpc": "2.0",
        "method": "validateaddress",
        "params": [address],
        "id": 1
    })
}
//获取ETH  gasPrice
export function gasPriceOracle() {
    return axios.get("https://www.etherchain.org/api/gasPriceOracle")
}

//FIL验证地址
export function filWalletValidateAddress(address) {
    return axios.post('api/rpc/v0', {
        "jsonrpc": "2.0", "method": "Filecoin.WalletValidateAddress",
        "params": [address], "id": 3
    })
}
