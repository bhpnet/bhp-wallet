import {
    bhp_getBalance,
    bhp2_getBalance,
    eth_getBalance,
    btc_getBalance
} from "../../api/api";

export async function allAssetes(that) {
    that.valueSum1 = 0;
    for (let i in that.allWalletList) {
        await bhp_getBalance(that.allWalletList[i].address).then(res => {
            if (res.data.result.balance.length > 0) {
                that.allWalletList[i].assets = parseFloat(
                    res.data.result.balance[0].amount
                );
                that.valueSum1 += that.allWalletList[i].assets;
            } else {
                that.allWalletList[i].assets = 0;
            }
        });
    }
    localStorage.setItem("accounts", JSON.stringify(that.allWalletList));
}
export async function allAssetesBTC(that) {
    that.valueSumBTC = 0;

    for (let i in that.allWalletListBTC) {
        await btc_getBalance(that.allWalletListBTC[i].address).then((res) => {
            if (res.data.balance) {
                that.allWalletListBTC[i].assets = parseFloat(res.data.balance / Math.pow(10, 8))


                that.valueSumBTC += that.allWalletListBTC[i].assets;
            } else {
                that.allWalletListBTC[i].assets = 0;
            }
        });

    }
    localStorage.setItem("accountsBTC", JSON.stringify(that.allWalletListBTC));
}
export async function allAssetesFIL(that) {
    const {
        HttpJsonRpcConnector,
        HttpJsonRpcWalletProvider
    } = require('filecoin.js')
    that.valueSumFIL = 0;
    for (let i in that.allWalletListFIL) {
        const connector = new HttpJsonRpcConnector({
            url: "https://mrpc.bhpnet.io/fil/rpc/v0",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.fzpHtg9VFX1K8s5vbyrHpGoWYEcJESybHziADoLw5Wc"
        });
        let rpc = new HttpJsonRpcWalletProvider(connector);
        let res = await rpc.getBalance(that.allWalletListFIL[i].address);
        if (res) {
            that.allWalletListFIL[i].assets = parseFloat(res / Math.pow(10, 18));
            that.valueSumFIL += that.allWalletListFIL[i].assets;
        } else {
            that.allWalletListFIL[i].assets = 0;
        }
    }
    localStorage.setItem(
        "accountsFIL",
        JSON.stringify(that.allWalletListFIL)
    );
}
export async function allAssetes2(that) {
    that.valueSum2 = 0;
    for (let i in that.allWalletList2) {
        await bhp2_getBalance(that.allWalletList2[i].address).then(res => {
            if (res.data.result.value.coins.length > 0) {
                that.allWalletList2[i].assets = parseFloat(
                    res.data.result.value.coins[0].amount / 100000000
                );
                that.valueSum2 += that.allWalletList2[i].assets;
            } else {
                that.allWalletList2[i].assets = 0;
            }
        });
    }
    localStorage.setItem("accounts2", JSON.stringify(that.allWalletList2));
}
export async function allAssetesETH(that) {
    that.valueSumETH = 0;
    for (let i in that.allWalletListETH) {
        await eth_getBalance(that.allWalletListETH[i].address).then(res => {
            if (res.data.result) {
                that.allWalletListETH[i].assets =
                    parseInt(res.data.result, 16) / Math.pow(10, 18);
                that.valueSumETH += that.allWalletListETH[i].assets;
            } else {
                that.allWalletListETH[i].assets = 0;
            }
        });
    }
    that.loading = false;
    localStorage.setItem(
        "accountsETH",
        JSON.stringify(that.allWalletListETH)
    );
}

export function assetETH(that, address) {
    eth_getBalance(address).then(res => {
        if (res.data.result) {
            that.newWalletValue =
                parseInt(res.data.result, 16) / Math.pow(10, 18);
        } else {
            that.newWalletValue = 0;
        }
    });
}
export function assetBTC(that, address) {
    btc_getBalance(address).then((res) => {
        if (res.data.balance) {
            that.newWalletValue = parseFloat(res.data.balance / Math.pow(10, 8))
            if (that.newWalletValue == 0) {
                that.newWalletValue = 0;
            }
        } else {
            that.newWalletValue = 0;
        }
    });

}
export async function assetFIL(that, address) {
    const {
        HttpJsonRpcConnector,
        HttpJsonRpcWalletProvider
    } = require('filecoin.js')
    const connector = new HttpJsonRpcConnector({
        url: "https://mrpc.bhpnet.io/fil/rpc/v0",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.fzpHtg9VFX1K8s5vbyrHpGoWYEcJESybHziADoLw5Wc"
    });
    let rpc = new HttpJsonRpcWalletProvider(connector);
    let res = await rpc.getBalance(address);
    if (res) {
        that.newWalletValue = parseFloat(res / Math.pow(10, 18));
    } else {
        that.newWalletValue = 0;
    }
}
export function assetes(that, address) {
    bhp_getBalance(address).then(res => {
        if (res.data.result.balance.length > 0) {
            res.data.result.balance.forEach((v, i) => {
                v.asset = that.getAssetName(v.asset);
            });

            that.newWalletValue = res.data.result.balance[0].amount;
        } else {
            that.newWalletValue = 0;
        }
        that.loading = false;
    });
}
export function assetes2(that, address) {
    bhp2_getBalance(address).then(res => {
        if (res.data.result.value.coins.length > 0) {
            that.newWalletValue = parseFloat(
                res.data.result.value.coins[0].amount / 100000000
            );
        } else {
            that.newWalletValue = 0;
        }
    });
}