import { getasset, getAccounts, eth_getBalance,btc_getBalanceAndUTXO } from "../../api/api";

//查询各个1.0钱包的资产
export async function allAssetes(that) {
    that.valueSum1 = 0;
    for (let i in that.allWalletList) {
        await getasset(that.allWalletList[i].address).then(res => {
            if (res.data.result.balances.length > 0) {
                that.allWalletList[i].assets = parseFloat(
                    res.data.result.balances[0].value
                );
                that.valueSum1 += that.allWalletList[i].assets;
            } else {
                that.allWalletList[i].assets = 0;
            }
        });
    }
    localStorage.setItem("accounts", JSON.stringify(that.allWalletList)); //给转账和 收款页面的所有钱包余额展示，不用多次调用查询每个钱包的接口
}
//查询各个BTC钱包的资产
export async function allAssetesBTC(that) {
    that.valueSumBTC = 0;
    
    for (let i in that.allWalletListBTC) {
        await btc_getBalanceAndUTXO(that.allWalletListBTC[i].address).then((res) => {
            if (res.data.balance) {
                that.allWalletListBTC[i].assets = parseFloat(res.data.balance / Math.pow(10, 8))
                
              
              that.valueSumBTC += that.allWalletListBTC[i].assets;
            } else {
                that.allWalletListBTC[i].assets = 0;
            }
          });
       
    }
    localStorage.setItem("accountsBTC", JSON.stringify(that.allWalletListBTC)); //给转账和 收款页面的所有钱包余额展示，不用多次调用查询每个钱包的接口
}
//查询各个FIL钱包的资产
export async function allAssetesFIL(that) {
    const  {HttpJsonRpcConnector,HttpJsonRpcWalletProvider} = require('filecoin.js')//防止进页面就卡顿
    that.valueSumFIL = 0;
    for (let i in that.allWalletListFIL) {
        const connector = new HttpJsonRpcConnector({
            url: "api/rpc/v0",
            token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.fzpHtg9VFX1K8s5vbyrHpGoWYEcJESybHziADoLw5Wc"
        });
        //查询资产
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
    ); //给转账和 收款页面的所有钱包余额展示，不用多次调用查询每个钱包的接口
}
//查询各个2.0钱包的资产
export async function allAssetes2(that) {
    that.valueSum2 = 0;
    for (let i in that.allWalletList2) {
        await getAccounts(that.allWalletList2[i].address).then(res => {
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
    localStorage.setItem("accounts2", JSON.stringify(that.allWalletList2)); //给转账和 收款页面的所有钱包余额展示，不用多次调用查询每个钱包的接口
}
//查询各个ETH钱包的资产
export async function allAssetesETH(that) {
    that.valueSumETH = 0;
    for (let i in that.allWalletListETH) {
        await eth_getBalance(that.allWalletListETH[i].address).then(res => {
            if (res.data.result) {
                that.allWalletListETH[i].assets =
                    parseInt(res.data.result, 16) / Math.pow(10, 18); //parseInt(xxx,16)16进制转成10进制

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
    ); //给转账和 收款页面的所有钱包余额展示，不用多次调用查询每个钱包的接口
}

//获取以太坊资产
export function assetETH(that,address) {
    eth_getBalance(address).then(res => {
        if (res.data.result) {
            that.newWalletValue =
                parseInt(res.data.result, 16) / Math.pow(10, 18); //parseInt(xxx,16)16进制转成10进制
        } else {
            that.newWalletValue = 0;
        }
    });
}
//获取BTC资产
export function assetBTC(that,address) {
        btc_getBalanceAndUTXO(address).then((res) => {
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
//获取FIL资产
export async function assetFIL(that,address) {
    const  {HttpJsonRpcConnector,HttpJsonRpcWalletProvider} = require('filecoin.js')//防止进页面就卡顿
    const connector = new HttpJsonRpcConnector({
        url: "api/rpc/v0",
        token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.fzpHtg9VFX1K8s5vbyrHpGoWYEcJESybHziADoLw5Wc"
    });
    //查询资产
    let rpc = new HttpJsonRpcWalletProvider(connector);
    let res = await rpc.getBalance(address);
    if (res) {
        that.newWalletValue = parseFloat(res / Math.pow(10, 18));
    } else {
        that.newWalletValue = 0;
    }
}
//获取地址资产
export function assetes(that,address) {
    getasset(address).then(res => {
        if (res.data.result.balances.length > 0) {
            res.data.result.balances.forEach((v, i) => {
                v.asset = that.getAssetName(v.asset);
            });

            that.newWalletValue = res.data.result.balances[0].value;
        } else {
            that.newWalletValue = 0;
        }
        that.loading = false;
    });
}
//获取地址资产2.0
export function Accounts(that,address) {
    // that.newWalletValue = 0;
    getAccounts(address).then(res => {
        if (res.data.result.value.coins.length > 0) {
            that.newWalletValue = parseFloat(
                res.data.result.value.coins[0].amount / 100000000
            );
        } else {
            that.newWalletValue = 0;
        }
    });
}
