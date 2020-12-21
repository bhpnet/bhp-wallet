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
export function delete1(that, i) {
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
export function delete2(that, i) {
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
            let sha256 = require("js-sha256").sha256
            let key1 = sha256(that.pass)
            key1 = Utils.encryptECB(key1, that.pass)

            function fn3(num, length) {
                return (num + Array(length).join('0')).slice(0, length);
            }
            let key2 = fn3(key1, 16)
            let privateKey = Utils.decrypt(
                that.allWalletList[that.index].privateKey,
                key2,
                that.pass
            );
            let address = that.allWalletList[that.index].address;
            if (privateKey.indexOf(address) != -1) {
                that.$store.commit(
                    "getPrivateKey",
                    privateKey.substr(address.length)
                );
                that.$router.push("/backUpPrivateKey1");
            } else {
                Toast.fail(that.msg);
            }
            that.pass = "";
        } else if (that.walletType == "ETH") {
            let sha256 = require("js-sha256").sha256
            let key1 = sha256(that.pass)
            key1 = Utils.encryptECB(key1, that.pass)

            function fn3(num, length) {
                return (num + Array(length).join('0')).slice(0, length);
            }
            let key2 = fn3(key1, 16)
            let privateKey = Utils.decrypt(
                that.allWalletListETH[that.index].privateKey,
                key2,
                that.pass
            );
            let address = that.allWalletListETH[that.index].address;
            if (privateKey.indexOf(address) != -1) {
                that.$store.commit(
                    "getPrivateKey",
                    privateKey.substr(address.length + 2)
                );
                that.$router.push("/backUpPrivateKey1");
            } else {
                Toast.fail(that.msg);
            }
            that.pass = "";
        } else if (that.walletType == "BTC") {
            let sha256 = require("js-sha256").sha256
            let key1 = sha256(that.pass)
            key1 = Utils.encryptECB(key1, that.pass)

            function fn3(num, length) {
                return (num + Array(length).join('0')).slice(0, length);
            }
            let key2 = fn3(key1, 16)
            let privateKey = Utils.decrypt(
                that.allWalletListBTC[that.index].privateKey,
                key2,
                that.pass
            );
            let address = that.allWalletListBTC[that.index].address;
            if (privateKey.indexOf(address) != -1) {
                that.$store.commit(
                    "getPrivateKey",
                    privateKey.substr(address.length)
                );
                that.$router.push({
                    path: "/backUpPrivateKey1", //看去钱包主页，还是跳转去详情页面
                    query: {
                        exportBTC: 'WIF',
                    },
                });
            } else {
                Toast.fail(that.msg);
            }
            that.pass = "";
        }
    } catch (err) {
        Toast.fail(that.msg);
        that.pass = "";
    }

}
//备份助记词输入密码
export function surePWDMnemonic(that, i) {
    that.$store.commit("getWalletType", ""); //备份助记词状态清空
    try {

        if (that.walletType == "BHP") {
            if (that.allWalletList[that.index].phrase) {
                let sha256 = require("js-sha256").sha256
                let key1 = sha256(that.pass)
                key1 = Utils.encryptECB(key1, that.pass)

                function fn3(num, length) {
                    return (num + Array(length).join('0')).slice(0, length);
                }
                let key2 = fn3(key1, 16)
                let phrase = Utils.decrypt(
                    that.allWalletList[that.index].phrase,
                    key2,
                    that.pass
                );
                let address = that.allWalletList[that.index].address;
                if (phrase.indexOf(address) != -1) {
                    phrase = phrase.substr(address.length);
                    that.$store.commit("getBipList", phrase.split(" "));
                    that.$router.push({
                        path: "/backUp1",
                        query: {
                            backUpBip: "backUpBip"
                        }
                    });
                } else {
                    Toast.fail(that.msg);
                    that.pass = "";
                }
            } else {
                that.pass = "";
                that.show2 = false
                alert('The wallet has no mnemonics!')
            }

        } else if (that.walletType == "BHP2") {
            if (that.allWalletList2[that.index].phrase) {
                let sha256 = require("js-sha256").sha256
                let key1 = sha256(that.pass)
                key1 = Utils.encryptECB(key1, that.pass)

                function fn3(num, length) {
                    return (num + Array(length).join('0')).slice(0, length);
                }
                let key2 = fn3(key1, 16)//K2是根据客户输的K1密码 双加密，并取16字符得来的
                let phrase = Utils.decrypt(
                    that.allWalletList2[that.index].phrase,
                    key2,//以前Key2是写死的，密码不管输什么都会解密一段字符出来，不会报错，现在 key2和that.pass都输错 代码就会报错，
                    that.pass
                );
                let address = that.allWalletList2[that.index].address;
                if (phrase.indexOf(address) != -1) {
                    phrase = phrase.substr(address.length);
                    that.$store.commit("getBipList", phrase.split(" "));
                    that.$router.push({
                        path: "/backUp1",
                        query: {
                            backUpBip: "backUpBip"
                        }
                    });
                } else {
                    Toast.fail(that.msg);
                    that.pass = "";
                }
            } else {
                that.pass = "";
                that.show2 = false
                alert('The wallet has no mnemonics!')
            }
        } else if (that.walletType == "FIL") {
            if (that.allWalletListFIL[that.index].phrase) {
                let sha256 = require("js-sha256").sha256
                let key1 = sha256(that.pass)
                key1 = Utils.encryptECB(key1, that.pass)

                function fn3(num, length) {
                    return (num + Array(length).join('0')).slice(0, length);
                }
                let key2 = fn3(key1, 16)
                let phrase = Utils.decrypt(
                    that.allWalletListFIL[that.index].phrase,
                    key2,
                    that.pass
                );
                let address = that.allWalletListFIL[that.index].address;
                if (phrase.indexOf(address) != -1) {
                    phrase = phrase.substr(address.length);
                    that.$store.commit("getBipList", phrase.split(" "));
                    that.$router.push({
                        path: "/backUp1",
                        query: {
                            backUpBip: "backUpBip"
                        }
                    });
                } else {
                    Toast.fail(that.msg);
                    that.pass = "";
                }
            } else {
                that.pass = "";
                that.show2 = false
                alert('The wallet has no mnemonics!')
            }
        } else if (that.walletType == "ETH") {
            if (that.allWalletListETH[that.index].phrase) {
                let sha256 = require("js-sha256").sha256
                let key1 = sha256(that.pass)
                key1 = Utils.encryptECB(key1, that.pass)

                function fn3(num, length) {
                    return (num + Array(length).join('0')).slice(0, length);
                }
                let key2 = fn3(key1, 16)
                let phrase = Utils.decrypt(
                    that.allWalletListETH[that.index].phrase,
                    key2,
                    that.pass
                );
                let address = that.allWalletListETH[that.index].address;

                if (phrase.indexOf(address) != -1) {
                    phrase = phrase.substr(address.length);
                    that.$store.commit("getBipList", phrase.split(" "));
                    that.$router.push({
                        path: "/backUp1",
                        query: {
                            backUpBip: "backUpBip"
                        }
                    });
                } else {
                    Toast.fail(that.msg);
                    that.pass = "";
                }
            } else {
                that.pass = "";
                that.show2 = false
                alert('The wallet has no mnemonics!')
            }
        } else if (that.walletType == "BTC") {
            if (that.allWalletListBTC[that.index].phrase) {
                let sha256 = require("js-sha256").sha256
                let key1 = sha256(that.pass)
                key1 = Utils.encryptECB(key1, that.pass)

                function fn3(num, length) {
                    return (num + Array(length).join('0')).slice(0, length);
                }
                let key2 = fn3(key1, 16)
                let phrase = Utils.decrypt(
                    that.allWalletListBTC[that.index].phrase,
                    key2,
                    that.pass
                );
                let address = that.allWalletListBTC[that.index].address;

                if (phrase.indexOf(address) != -1) {
                    phrase = phrase.substr(address.length);
                    that.$store.commit("getBipList", phrase.split(" "));
                    that.$router.push({
                        path: "/backUp1",
                        query: {
                            backUpBip: "backUpBip"
                        }
                    });
                } else {
                    Toast.fail(that.msg);
                    that.pass = "";
                }
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