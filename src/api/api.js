import axios from 'axios'
// const IP = 'https://rpc.bhpa.io'

// all 获取所有币种币价
export function all_getPrice(exchange, coinName_usdt) {
    return axios.get("https://api.bhpa.io/exchange/api/getPrice", {
        params: {
            exchangeName: exchange,
            symbol: coinName_usdt
        }
    })
}

// bhp1.0查询余额和UTXO
export function bhp_getBalance(address) {
    return axios.post("https://rpc.bhpa.io", {
        jsonrpc: "2.0",
        id: 1,
        method: "getunspents",
        params: [address, "0x13f76fabfe19f3ec7fd54d63179a156bafc44afc53a7f07a7a15f6724c0aa854"]
    })
}

// bhp1.0验证地址
export function bhp_validateaddress(address) {
    return axios.post('https://rpc.bhpa.io', {
        "jsonrpc": "2.0",
        "method": "validateaddress",
        "params": [address],
        "id": 1
    })
}

// bhp1.0广播
export function bhp_sendTransaction(tx) {
    return axios.post("https://rpc.bhpa.io", {
        jsonrpc: "2.0",
        method: "sendrawtransaction",
        params: [tx],
        id: 1
    })
}
// bhp2.0查询余额
export function bhp2_getBalance(address) {
    return axios.get("https://rpc.bhpnet.io/auth/accounts/" + address, {
        params: {}
    })
}

// bhp2.0 广播交易
export function bhp2_sendTransaction(tx) {
    return axios.post("https://rpc.bhpnet.io/txs", tx)
}

// eth 查询余额
export function eth_getBalance(address) {
    return axios.post(
        "https://mainnet.infura.io/v3/7016d0346d5b46aba5b559a6edd3547d", {
            "jsonrpc": "2.0",
            "method": "eth_getBalance",
            "params": [address, "latest"],
            "id": 1
        })
}

// eth 查询gasPrice
export function eth_getGasPrice() {
    return axios.get("https://www.etherchain.org/api/gasPriceOracle")
}

// btc 查询余额和Utxo
export function btc_getBalance(address) {
    return axios.get(
        "https://api.blockcypher.com/v1/btc/main/addrs/" + address, {
            params: {
                unspentOnly: true
            }
        })
}
// btc 广播交易
export function btc_sendTransaction(tx) {
    return axios.post("https://47.244.216.20:16969/api/sendrawtransaction", {
        tx: tx
    })
}
// btc 手续费
export function btc_getSatoshis() {
    return axios.get("https://api.blockcypher.com/v1/btc/main")
}

// btc 验证地址
export function btc_validateaddress(address) {
    return axios.get("https://api.blockcypher.com/v1/btc/main/addrs/" + address + "/balance")
}

// fil 验证地址
export function fil_validateaddress(address) {
    return axios.post('api/rpc/v0', {
        "jsonrpc": "2.0",
        "method": "Filecoin.WalletValidateAddress",
        "params": [address],
        "id": 3
    })
}