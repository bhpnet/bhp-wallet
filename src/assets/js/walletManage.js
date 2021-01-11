const bip39 = require("bip39");
import Utils from "./utils.js";
import {
    Toast
} from "vant";
import {
    Dialog
} from "vant";
export function deleteETH(that, i) {
    for (let index in that.allWalletListETH) {
        if (index == i) {
            Dialog.confirm({
                    message: that.msg2,
                    confirmButtonText: that.msg11,
                    cancelButtonText: that.msg33
                })
                .then(() => {
                    that.allWalletListETH.splice(i, 1);
                    that.walletType = "BHP"; //用来让值变化，更新视图
                    that.walletType = "ETH"; //恢复本来的值
                    localStorage.setItem(
                        "accountsETH",
                        JSON.stringify(that.allWalletListETH)
                    );
                    if (that.allWalletListETH.length == 0) {
                        that.$router.go(0);
                    }
                    if (
                        that.allWalletList.length == 0 &&
                        that.allWalletList2 == 0 &&
                        that.allWalletListBTC == 0 &&
                        that.allWalletListFIL == 0 &&
                        that.allWalletListETH == 0
                    ) {
                        that.$router.replace("/");
                    }
                })
                .catch(() => {});
        }
    }
}
export function deleteBTC(that, i) {
    for (let index in that.allWalletListBTC) {
        if (index == i) {
            Dialog.confirm({
                    message: that.msg2,
                    confirmButtonText: that.msg11,
                    cancelButtonText: that.msg33
                })
                .then(() => {
                    that.allWalletListBTC.splice(i, 1);
                    that.walletType = "BHP"; //用来让值变化，更新视图
                    that.walletType = "BTC"; //恢复本来的值
                    localStorage.setItem(
                        "accountsBTC",
                        JSON.stringify(that.allWalletListBTC)
                    );
                    if (that.allWalletListBTC.length == 0) {
                        that.$router.go(0);
                    }
                    if (
                        that.allWalletList.length == 0 &&
                        that.allWalletList2 == 0 &&
                        that.allWalletListBTC == 0 &&
                        that.allWalletListFIL == 0 &&
                        that.allWalletListETH == 0
                    ) {
                        that.$router.replace("/");
                    }
                })
                .catch(() => {});
        }
    }
}
export function deleteFIL(that, i) {
    for (let index in that.allWalletListFIL) {
        if (index == i) {
            Dialog.confirm({
                    message: that.msg2,
                    confirmButtonText: that.msg11,
                    cancelButtonText: that.msg33
                })
                .then(() => {
                    that.allWalletListFIL.splice(i, 1);
                    that.walletType = "BHP"; //用来让值变化，更新视图
                    that.walletType = "FIL"; //恢复本来的值
                    localStorage.setItem(
                        "accountsFIL",
                        JSON.stringify(that.allWalletListFIL)
                    );
                    if (that.allWalletListFIL.length == 0) {
                        that.$router.go(0);
                    }
                    if (
                        that.allWalletList.length == 0 &&
                        that.allWalletList2 == 0 &&
                        that.allWalletListFIL == 0 &&
                        that.allWalletListBTC == 0 &&
                        that.allWalletListETH == 0
                    ) {
                        that.$router.replace("/");
                    }
                })
                .catch(() => {});
        }
    }
}
export function deleteBHP(that, i) {
    for (let index in that.allWalletList) {
        if (index == i) {
            Dialog.confirm({
                    message: that.msg2,
                    confirmButtonText: that.msg11,
                    cancelButtonText: that.msg33
                })
                .then(() => {
                    that.allWalletList.splice(i, 1);
                    that.walletType = "ETH";

                    that.walletType = "BHP";
                    localStorage.setItem(
                        "accounts",
                        JSON.stringify(that.allWalletList)
                    );
                    if (that.allWalletList.length == 0) {
                        that.$router.go(0);
                    }

                    if (
                        that.allWalletList.length == 0 &&
                        that.allWalletList2 == 0 &&
                        that.allWalletListBTC == 0 &&
                        that.allWalletListFIL == 0 &&
                        that.allWalletListETH == 0
                    ) {
                        that.$router.replace("/");
                    }
                })
                .catch(() => {});
        }
    }
}
export function deleteBHP2(that, i) {
    for (let index in that.allWalletList2) {
        if (index == i) {
            Dialog.confirm({
                    message: that.msg2,
                    confirmButtonText: that.msg11,
                    cancelButtonText: that.msg33
                })
                .then(() => {
                    that.allWalletList2.splice(i, 1);
                    that.walletType = "BHP";

                    that.walletType = "BHP2";
                    localStorage.setItem(
                        "accounts2",
                        JSON.stringify(that.allWalletList2)
                    );
                    if (that.allWalletList2.length == 0) {
                        that.$router.go(0);
                    }

                    if (
                        that.allWalletList.length == 0 &&
                        that.allWalletList2 == 0 &&
                        that.allWalletListBTC == 0 &&
                        that.allWalletListFIL == 0 &&
                        that.allWalletListETH == 0
                    ) {
                        that.$router.replace("/");
                    }
                })
                .catch(() => {});
        }
    }
}
//备份私钥输入密码
export function surePWDPrivateKey(that) {
    try {
        if (that.walletType == "BHP") {

            let privateKey = Utils.decryptContent(
                that.allWalletList[that.index].privateKey,
                that.pass
            );
            that.$store.commit(
                "getPrivateKey",
                privateKey
            );
            that.$router.push("/backUpPrivateKey1");
            that.pass = "";
        } else if (that.walletType == "ETH") {

            let privateKey = Utils.decryptContent(
                that.allWalletListETH[that.index].privateKey,
                that.pass
            );
            that.$store.commit(
                "getPrivateKey",
                privateKey.substr(2)
            );
            that.$router.push("/backUpPrivateKey1");
            that.pass = "";
        } else if (that.walletType == "BTC") {

            let privateKey = Utils.decryptContent(
                that.allWalletListBTC[that.index].privateKey,
                that.pass
            );
            that.$store.commit(
                "getPrivateKey",
                privateKey
            );
            that.$router.push({
                path: "/backUpPrivateKey1", //看去钱包主页，还是跳转去详情页面
                query: {
                    exportBTC: 'WIF',
                },
            });
            that.pass = "";
        }
    } catch (err) {
        Toast.fail(err);
        that.pass = "";
    }

}
//备份助记词输入密码
export function surePWDMnemonic(that, i) {
    that.$store.commit("getWalletType", ""); //备份助记词状态清空
    try {
        if (that.walletType == "BHP") {
            if (that.allWalletList[that.index].phrase) {
                let phrase = Utils.decryptContent(
                    that.allWalletList[that.index].phrase,
                    that.pass
                );
                that.$store.commit("getBipList", phrase.split(" "));
                that.$router.push({
                    path: "/backUp1",
                    query: {
                        backUpBip: "backUpBip"
                    }
                });
                that.pass = "";
            } else {
                that.pass = "";
                that.show2 = false
                alert('The wallet has no mnemonics!')
            }

        } else if (that.walletType == "BHP2") {
            if (that.allWalletList2[that.index].phrase) {

                let phrase = Utils.decryptContent(
                    that.allWalletList2[that.index].phrase,
                    that.pass
                );

                that.$store.commit("getBipList", phrase.split(" "));
                that.$router.push({
                    path: "/backUp1",
                    query: {
                        backUpBip: "backUpBip"
                    }
                });
            } else {
                that.pass = "";
                that.show2 = false
                alert('The wallet has no mnemonics!')
            }
        } else if (that.walletType == "FIL") {
            if (that.allWalletListFIL[that.index].phrase) {

                let phrase = Utils.decryptContent(
                    that.allWalletListFIL[that.index].phrase,
                    that.pass
                );
                that.$store.commit("getBipList", phrase.split(" "));
                that.$router.push({
                    path: "/backUp1",
                    query: {
                        backUpBip: "backUpBip"
                    }
                });

            } else {
                that.pass = "";
                that.show2 = false
                alert('The wallet has no mnemonics!')
            }
        } else if (that.walletType == "ETH") {
            if (that.allWalletListETH[that.index].phrase) {

                let phrase = Utils.decryptContent(
                    that.allWalletListETH[that.index].phrase,
                    that.pass
                );

                that.$store.commit("getBipList", phrase.split(" "));
                that.$router.push({
                    path: "/backUp1",
                    query: {
                        backUpBip: "backUpBip"
                    }
                });

            } else {
                that.pass = "";
                that.show2 = false
                alert('The wallet has no mnemonics!')
            }
        } else if (that.walletType == "BTC") {
            if (that.allWalletListBTC[that.index].phrase) {

                let phrase = Utils.decryptContent(
                    that.allWalletListBTC[that.index].phrase,
                    that.pass
                );

                that.$store.commit("getBipList", phrase.split(" "));
                that.$router.push({
                    path: "/backUp1",
                    query: {
                        backUpBip: "backUpBip"
                    }
                });
            } else {
                that.pass = "";
                that.show2 = false
                alert('The wallet has no mnemonics!')
            }
        }
    } catch (err) {
        Toast.fail(that.msg);
        that.pass = "";
    }
}