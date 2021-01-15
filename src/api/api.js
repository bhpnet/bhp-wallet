import axios from 'axios'
const IP = 'https://mrpc.bhpnet.io'

export function all_getPrice(exchange, coinName_usdt) {
    return axios.get(IP + "/exchange-api/getPrice", {
        params: {
            exchangeName: exchange,
            symbol: coinName_usdt
        }
    })
}

export function bhp_getBalance(address) {
    return axios.post(IP + "/bhp", {
        jsonrpc: "2.0",
        id: 1,
        method: "getunspents",
        params: [address, "0x13f76fabfe19f3ec7fd54d63179a156bafc44afc53a7f07a7a15f6724c0aa854"]
    })
}

export function bhp_validateaddress(address) {
    return axios.post(IP + "/bhp", {
        "jsonrpc": "2.0",
        "method": "validateaddress",
        "params": [address],
        "id": 1
    })
}

export function bhp_sendTransaction(tx) {
    return axios.post(IP + "/bhp", {
        jsonrpc: "2.0",
        method: "sendrawtransaction",
        params: [tx],
        id: 1
    })
}

export function eth_getBalance(address) {
    return axios.post(
        IP + "/eth", {
            "jsonrpc": "2.0",
            "method": "eth_getBalance",
            "params": [address, "latest"],
            "id": 1
        })
}

export function eth_getGasPrice() {
    return axios.get("https://www.etherchain.org/api/gasPriceOracle")
}

export function btc_getBalance(address) {
    return axios.get(
        IP + "/btc/addrs/" + address, {
            params: {
                unspentOnly: true
            }
        })
}

export function btc_sendTransaction(tx) {
    return axios.post(IP + "/btc/broadcast", {
        tx: tx
    })
}

export function btc_getSatoshis() {
    return axios.get(IP + "/btc")
}

export function btc_validateaddress(address) {
    return axios.get(IP + "/btc/addrs/" + address + "/balance")
}

export function fil_validateaddress(address) {
    return axios.post(IP + "/fil/rpc/v0", {
        "jsonrpc": "2.0",
        "method": "Filecoin.WalletValidateAddress",
        "params": [address],
        "id": 3
    })
}