const Bhp = require("./bhp-js/bhp-browser");
const bip39 = require("bip39");
const ethers = require('ethers')
import {
    Toast
} from "vant";
import Utils from "./utils.js";
const sig = require("@kava-labs/sig");
const bip32 = require("bip32");
import * as bitcoin from "bitcoinjs-lib";

export async function clickNext(that) {
    if (that.spanActive == "助记词") {
        that.inputMnemonic = that.inputMnemonic.replace(/\s+/g, " ") //去多余空格
        that.inputMnemonic = that.inputMnemonic.replace(/(^\s*)|(\s*$)/g, "") //去两边空格
        if (
            that.inputName &&
            that.inputPwd &&
            that.inputAgainPwd &&
            !that.prompt1 &&
            !that.prompt2 &&
            !that.prompt3
        ) {
            if (bip39.validateMnemonic(that.inputMnemonic)) {
                if (that.$route.query.leadWallet == "leadWallet2") {
                    //钱包2.0导入
                    const BHP_PREFIX = "bhp";
                    // const MNEMONIC_LEN = 256;
                    const DERIVATION_PATH = "m/44'/547'/0'/0/0";

                    function Bytes2Str(arr) {
                        var str = "";
                        for (var i = 0; i < arr.length; i++) {
                            var tmp = arr[i].toString(16);
                            if (tmp.length == 1) {
                                tmp = "0" + tmp;
                            }
                            str += tmp;
                        }
                        return str;
                    }
                    const masterKey = sig.createMasterKeyFromMnemonic(
                        that.inputMnemonic
                    );
                    const keyPair = sig.createKeyPairFromMasterKey(
                        masterKey,
                        DERIVATION_PATH
                    );
                    const account = {
                        address: sig.createAddress(keyPair.publicKey, BHP_PREFIX),
                        phrase: that.inputMnemonic,
                        privateKey: Bytes2Str(keyPair.privateKey),
                        publicKey: Bytes2Str(keyPair.publicKey)
                    };
                    let sha256 = require("js-sha256").sha256
                    let key1 = sha256(that.inputPwd)
                    key1 = Utils.encryptECB(key1, that.inputPwd)

                    function fn3(num, length) {
                        return (num + Array(length).join('0')).slice(0, length);
                    }
                    let key2 = fn3(key1, 16)
                    let phrase = Utils.encrypt(
                        account.address + account.phrase,
                        key2,
                        that.inputPwd
                    );
                    account.phrase = phrase;
                    let privateKey = Utils.encrypt(
                        account.address + account.privateKey,
                        key2,
                        that.inputPwd
                    );
                    account.name = that.inputName;
                    account.privateKey = privateKey;
                    that.accounts2 =
                        JSON.parse(localStorage.getItem("accounts2")) || []; //||[]很重要
                    //去除地址重复的
                    for (let i in that.accounts2) {
                        if (that.accounts2[i].address == account.address) {
                            that.flag1 = true;
                            if (confirm(that.msg1)) {
                                that.accounts2.splice(i, 1);
                                that.accounts2.push(account);
                                localStorage.setItem(
                                    "accounts2",
                                    JSON.stringify(that.accounts2)
                                );
                                that.$store.commit("getWalletType", "BHP2"); //新导入的钱包进入首页显示新创建的钱包
                                that.$router.replace({
                                    path: "/indexHome/myWallet",
                                    query: {
                                        address2: account.address
                                    }
                                });
                            } else {
                                that.$router.go(0);
                            }
                        }
                    }
                    //进入确认导入页面
                    if (!that.flag1) {
                        that.$store.commit("getNewLeadWallet", account);

                        that.$router.push({
                            path: "/sureLeadWallet",
                            query: {
                                address2: account.address
                            }
                        });
                    }
                } else if (that.$route.query.leadWallet == "leadWallet1") {
                    //导入钱包1.0页面跳转过来的
                    //钱包1.0导入 用的ETH的助记词转私钥，因12个助记词转私钥，1.0不能用该私钥生成钱包
                    // let key = bip39.mnemonicToEntropy(that.inputMnemonic);
                    var accountETH = ethers.Wallet.fromMnemonic(
                        that.inputMnemonic
                    );
                    let key = accountETH.privateKey.substr(2)
                    let acct = new Bhp.wallet.Account(key); //1.0不会生成助记词
                    that.createWalletObj["address"] = acct._address;
                    that.createWalletObj["name"] = that.inputName;
                    let sha256 = require("js-sha256").sha256
                    let key1 = sha256(that.inputPwd)
                    key1 = Utils.encryptECB(key1, that.inputPwd)

                    function fn3(num, length) {
                        return (num + Array(length).join('0')).slice(0, length);
                    }
                    let key2 = fn3(key1, 16)
                    that.createWalletObj["privateKey"] = Utils.encrypt(
                        acct._address + acct._privateKey,
                        key2,
                        that.inputPwd
                    );
                    that.createWalletObj["phrase"] = Utils.encrypt(
                        acct._address + that.inputMnemonic,
                        key2,
                        that.inputPwd
                    );
                    that.accounts =
                        JSON.parse(localStorage.getItem("accounts")) || []; //||[]很重要
                    //去除地址重复的
                    for (let i in that.accounts) {
                        if (that.accounts[i].address == acct._address) {
                            that.flag1 = true;
                            if (confirm(that.msg1)) {
                                that.accounts.splice(i, 1);
                                that.accounts.push(that.createWalletObj);
                                localStorage.setItem(
                                    "accounts",
                                    JSON.stringify(that.accounts)
                                );
                                that.$store.commit("getWalletType", "BHP"); //新导入的钱包进入首页显示新创建的钱包
                                that.$router.replace({
                                    path: "/indexHome/myWallet",
                                    query: {
                                        address1: that.createWalletObj.address
                                    }
                                });
                            } else {
                                that.$router.go(0);
                            }
                        }
                    }

                    //进入确认导入页面
                    if (!that.flag1) {
                        that.$store.commit("getNewLeadWallet", that.createWalletObj);

                        that.$router.push({
                            path: "/sureLeadWallet",
                            query: {
                                address1: acct._address
                            }
                        });
                    }
                } else if (that.$route.query.leadWallet == "leadWalletETH") {
                    var accountETH = ethers.Wallet.fromMnemonic(
                        that.inputMnemonic
                    ); //可以用助记词导入钱包
                    that.createWalletObj["address"] = accountETH.address;
                    that.createWalletObj["name"] = that.inputName;
                    that.createWalletObj["phrase"] = accountETH.mnemonic.phrase;
                    that.createWalletObj["privateKey"] = accountETH.privateKey;
                    let sha256 = require("js-sha256").sha256
                    let key1 = sha256(that.inputPwd)
                    key1 = Utils.encryptECB(key1, that.inputPwd)

                    function fn3(num, length) {
                        return (num + Array(length).join('0')).slice(0, length);
                    }
                    let key2 = fn3(key1, 16)
                    let phrase = Utils.encrypt(
                        accountETH.address + that.createWalletObj["phrase"],
                        key2,
                        that.inputPwd
                    );
                    that.createWalletObj["phrase"] = phrase;
                    let privateKey = Utils.encrypt(
                        accountETH.address + that.createWalletObj["privateKey"],
                        key2,
                        that.inputPwd
                    );
                    that.createWalletObj["privateKey"] = privateKey;
                    that.accounts =
                        JSON.parse(localStorage.getItem("accountsETH")) || []; //||[]很重要

                    //去除地址重复的
                    for (let i in that.accounts) {
                        if (that.accounts[i].address == accountETH.address) {
                            that.flag1 = true;
                            if (confirm(that.msg1)) {
                                that.accounts.splice(i, 1);
                                that.accounts.push(that.createWalletObj);
                                localStorage.setItem(
                                    "accountsETH",
                                    JSON.stringify(that.accounts)
                                );
                                that.$store.commit("getWalletType", "ETH"); //新导入的钱包进入首页显示新创建的钱包
                                that.$router.replace({
                                    path: "/indexHome/myWallet",
                                    query: {
                                        addressETH: accountETH.address
                                    }
                                });
                            } else {
                                that.$router.go(0);
                            }
                        }
                    }

                    //进入确认导入页面
                    if (!that.flag1) {
                        that.$store.commit("getNewLeadWallet", that.createWalletObj);
                        that.$router.push({
                            path: "/sureLeadWallet",
                            query: {
                                addressETH: accountETH.address
                            }
                        });
                    }
                } else if (that.$route.query.leadWallet == "leadWalletFIL") {
                    const {
                        HttpJsonRpcConnector,
                        MnemonicWalletProvider
                    } = require('filecoin.js') //防止进页面就卡顿
                    const seed = bip39.mnemonicToSeed(that.inputMnemonic);
                    const master = bip32.fromSeed(await seed);
                    const child = master.derivePath("44'/461'/0'/0/0");
                    let MyPrivateKey = child.privateKey.toString("hex");
                    const connector = new HttpJsonRpcConnector({
                        url: "https://192.168.1.174:5001",
                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.Pwmjx-FTuJb5PQvZ2XCr991jy8N17nfAupWvScY9Qw4"
                    });
                    const hdWalletMnemonic = that.inputMnemonic;
                    const hdWalletPassword = "";
                    const hdDerivationPath = `m/44'/461'/0'/0/0`;
                    const walletProvider = new MnemonicWalletProvider(
                        connector,
                        hdWalletMnemonic,
                        hdWalletPassword,
                        hdDerivationPath
                    );
                    let myAddress = await walletProvider.getDefaultAccount();

                    that.createWalletObj["address"] = myAddress;
                    that.createWalletObj["name"] = that.inputName;
                    let sha256 = require("js-sha256").sha256
                    let key1 = sha256(that.inputPwd)
                    key1 = Utils.encryptECB(key1, that.inputPwd)

                    function fn3(num, length) {
                        return (num + Array(length).join('0')).slice(0, length);
                    }
                    let key2 = fn3(key1, 16)
                    let phrase = Utils.encrypt(
                        myAddress + that.inputMnemonic,
                        key2,
                        that.inputPwd
                    );
                    that.createWalletObj["phrase"] = phrase;
                    let privateKey = Utils.encrypt(
                        myAddress + MyPrivateKey,
                        key2,
                        that.inputPwd
                    );
                    that.createWalletObj["privateKey"] = privateKey;
                    that.accounts =
                        JSON.parse(localStorage.getItem("accountsFIL")) || []; //||[]很重要

                    //去除地址重复的
                    for (let i in that.accounts) {
                        if (that.accounts[i].address == myAddress) {
                            that.flag1 = true;
                            if (confirm(that.msg1)) {
                                that.accounts.splice(i, 1);
                                that.accounts.push(that.createWalletObj);
                                localStorage.setItem(
                                    "accountsFIL",
                                    JSON.stringify(that.accounts)
                                );
                                that.$store.commit("getWalletType", "FIL"); //新导入的钱包进入首页显示新创建的钱包
                                that.$router.replace({
                                    path: "/indexHome/myWallet",
                                    query: {
                                        addressFIL: myAddress
                                    }
                                });
                            } else {
                                that.$router.go(0);
                            }
                        }
                    }

                    //进入确认导入页面
                    if (!that.flag1) {
                        that.$store.commit("getNewLeadWallet", that.createWalletObj);
                        that.$router.push({
                            path: "/sureLeadWallet",
                            query: {
                                addressFIL: myAddress
                            }
                        });
                    }
                } else if (that.$route.query.leadWallet == "leadWalletBTC") {
                    const network = bitcoin.networks.bitcoin;
                    let seed = await bip39.mnemonicToSeed(that.inputMnemonic);
                    let node = bip32.fromSeed(seed, network);

                    // sw 隔离见证
                    const swPath = "m/49'/0'/0'/0/0";
                    let wif = node.derivePath(swPath).toWIF();
                    let p2wpkh = bitcoin.payments.p2sh({
                        redeem: bitcoin.payments.p2wpkh({
                            pubkey: node.derivePath(swPath).publicKey,
                            network: network
                        })
                    })

                    that.createWalletObj["address"] = p2wpkh.address;
                    that.createWalletObj["name"] = that.inputName;
                    let sha256 = require("js-sha256").sha256
                    let key1 = sha256(that.inputPwd)
                    key1 = Utils.encryptECB(key1, that.inputPwd)

                    function fn3(num, length) {
                        return (num + Array(length).join('0')).slice(0, length);
                    }
                    let key2 = fn3(key1, 16)
                    that.createWalletObj["privateKey"] = Utils.encrypt(
                        p2wpkh.address + wif,
                        key2,
                        that.inputPwd
                    );
                    that.createWalletObj["phrase"] = Utils.encrypt(
                        p2wpkh.address + that.inputMnemonic,
                        key2,
                        that.inputPwd
                    );

                    that.accounts =
                        JSON.parse(localStorage.getItem("accountsBTC")) || []; //||[]很重要

                    //去除地址重复的
                    for (let i in that.accounts) {
                        if (that.accounts[i].address == p2wpkh.address) {
                            that.flag1 = true;
                            if (confirm(that.msg1)) {
                                that.accounts.splice(i, 1);
                                that.accounts.push(that.createWalletObj);
                                localStorage.setItem(
                                    "accountsBTC",
                                    JSON.stringify(that.accounts)
                                );
                                that.$store.commit("getWalletType", "BTC"); //新导入的钱包进入首页显示新创建的钱包
                                that.$router.replace({
                                    path: "/indexHome/myWallet",
                                    query: {
                                        addressBTC: p2wpkh.address
                                    }
                                });
                            } else {
                                that.$router.go(0);
                            }
                        }
                    }

                    //进入确认导入页面
                    if (!that.flag1) {
                        that.$store.commit("getNewLeadWallet", that.createWalletObj);
                        that.$router.push({
                            path: "/sureLeadWallet",
                            query: {
                                addressBTC: p2wpkh.address
                            }
                        });
                    }
                }
            } else {
                Toast.fail(that.msg2);
            }

        } else {
            if (that.inputName.length == 0) {
                that.prompt1 = true;
            }
            if (that.inputPwd.length == 0) {
                that.prompt2 = true;
            }
            if (that.inputAgainPwd.length == 0) {
                that.prompt3 = true;
            }
        }
    } else if (that.spanActive == "leadPrivateKey") {
        if (
            that.inputName &&
            that.inputPwd &&
            that.inputAgainPwd &&
            !that.prompt1 &&
            !that.prompt2 &&
            !that.prompt3
        ) {
            if (that.leadPrivateKey) {
                that.leadPrivateKey = that.leadPrivateKey.replace(/(^\s*)|(\s*$)/g, "") //去两边空格
                try {
                if (that.$route.query.leadWallet == "leadWallet2") {
                    //=========暂无此功能
                }
                if (that.$route.query.leadWallet == "leadWalletFIL") {
                    //=========暂无此功能
                } else if (that.$route.query.leadWallet == "leadWallet1") {
                    //导入钱包1.0页面跳转过来的
                    //钱包1.0导入

                    let acct = new Bhp.wallet.Account(that.leadPrivateKey); //1.0不会生成助记词
                    that.createWalletObj["address"] = acct._address;
                    that.createWalletObj["name"] = that.inputName;
                    let sha256 = require("js-sha256").sha256
                    let key1 = sha256(that.inputPwd)
                    key1 = Utils.encryptECB(key1, that.inputPwd)

                    function fn3(num, length) {
                        return (num + Array(length).join('0')).slice(0, length);
                    }
                    let key2 = fn3(key1, 16)
                    that.createWalletObj["privateKey"] = Utils.encrypt(
                        acct._address + acct._privateKey,
                        key2,
                        that.inputPwd
                    );

                    that.accounts =
                        JSON.parse(localStorage.getItem("accounts")) || []; //||[]很重要
                    //去除地址重复的
                    for (let i in that.accounts) {
                        if (that.accounts[i].address == acct._address) {
                            that.flag1 = true;
                            if (confirm(that.msg1)) {
                                that.accounts.splice(i, 1);
                                that.accounts.push(that.createWalletObj);
                                localStorage.setItem(
                                    "accounts",
                                    JSON.stringify(that.accounts)
                                );
                                that.$store.commit("getWalletType", "BHP"); //新导入的钱包进入首页显示新创建的钱包
                                that.$router.replace({
                                    path: "/indexHome/myWallet",
                                    query: {
                                        address1: that.createWalletObj.address
                                    }
                                });
                            } else {
                                that.$router.go(0);
                            }
                        }
                    }

                    //进入确认导入页面
                    if (!that.flag1) {
                        that.$store.commit("getNewLeadWallet", that.createWalletObj);

                        that.$router.push({
                            path: "/sureLeadWallet",
                            query: {
                                address1: acct._address
                            }
                        });
                    }
                } else if (that.$route.query.leadWallet == "leadWalletETH") {
                    if (that.leadPrivateKey.length == 64 || that.leadPrivateKey.length == 66) { //0x10~0x19可以导入钱包

                        if (that.leadPrivateKey.substr(0, 2) != "0x") {
                            that.leadPrivateKey = "0x" + that.leadPrivateKey;
                        }
                        //要有0x才可以成功导入ETH钱包
                        var accountETH = new ethers.Wallet(that.leadPrivateKey);
                        that.createWalletObj["address"] = accountETH.address;
                        that.createWalletObj["name"] = that.inputName;
                        that.createWalletObj["privateKey"] = accountETH.privateKey;
                        let sha256 = require("js-sha256").sha256
                    let key1 = sha256(that.inputPwd)
                    key1 = Utils.encryptECB(key1, that.inputPwd)

                    function fn3(num, length) {
                        return (num + Array(length).join('0')).slice(0, length);
                    }
                    let key2 = fn3(key1, 16)
                        let privateKey = Utils.encrypt(
                            accountETH.address + that.createWalletObj["privateKey"],
                            key2,
                            that.inputPwd
                        );
                        that.createWalletObj["privateKey"] = privateKey;
                        that.accounts =
                            JSON.parse(localStorage.getItem("accountsETH")) || []; //||[]很重要

                        //去除地址重复的
                        for (let i in that.accounts) {
                            if (that.accounts[i].address == accountETH.address) {
                                that.flag1 = true;
                                if (confirm(that.msg1)) {
                                    that.accounts.splice(i, 1);
                                    that.accounts.push(that.createWalletObj);
                                    localStorage.setItem(
                                        "accountsETH",
                                        JSON.stringify(that.accounts)
                                    );
                                    that.$store.commit("getWalletType", "ETH"); //新导入的钱包进入首页显示新创建的钱包
                                    that.$router.replace({
                                        path: "/indexHome/myWallet",
                                        query: {
                                            addressETH: accountETH.address
                                        }
                                    });
                                } else {
                                    that.$router.go(0);
                                }
                            }
                        }
                        //进入确认导入页面
                        if (!that.flag1) {
                            that.$store.commit("getNewLeadWallet", that.createWalletObj);
                            that.$router.push({
                                path: "/sureLeadWallet",
                                query: {
                                    addressETH: accountETH.address
                                }
                            });
                        }
                    } else {
                        Toast.fail(that.msg5);

                    }

                } else if (that.$route.query.leadWallet == "leadWalletBTC") {
                    const network = bitcoin.networks.bitcoin;
                    // SW
                    const keyPair = bitcoin.ECPair.fromWIF(
                        that.leadPrivateKey, network
                    );
                    const p2wpkh = bitcoin.payments.p2sh({
                        redeem: bitcoin.payments.p2wpkh({
                            pubkey: keyPair.publicKey,
                            network: network
                        })
                    });
                    that.createWalletObj["address"] = p2wpkh.address;
                    that.createWalletObj["name"] = that.inputName;
                    let sha256 = require("js-sha256").sha256
                    let key1 = sha256(that.inputPwd)
                    key1 = Utils.encryptECB(key1, that.inputPwd)

                    function fn3(num, length) {
                        return (num + Array(length).join('0')).slice(0, length);
                    }
                    let key2 = fn3(key1, 16)
                    that.createWalletObj["privateKey"] = Utils.encrypt(
                        p2wpkh.address + that.leadPrivateKey,
                        key2,
                        that.inputPwd
                    );
                    that.accounts =
                        JSON.parse(localStorage.getItem("accountsBTC")) || []; //||[]很重要

                    //去除地址重复的
                    for (let i in that.accounts) {
                        if (that.accounts[i].address == p2wpkh.address) {
                            that.flag1 = true;
                            if (confirm(that.msg1)) {
                                that.accounts.splice(i, 1);
                                that.accounts.push(that.createWalletObj);
                                localStorage.setItem(
                                    "accountsBTC",
                                    JSON.stringify(that.accounts)
                                );
                                that.$store.commit("getWalletType", "BTC"); //新导入的钱包进入首页显示新创建的钱包
                                that.$router.replace({
                                    path: "/indexHome/myWallet",
                                    query: {
                                        addressBTC: p2wpkh.address
                                    }
                                });
                            } else {
                                that.$router.go(0);
                            }
                        }
                    }

                    //进入确认导入页面
                    if (!that.flag1) {
                        that.$store.commit("getNewLeadWallet", that.createWalletObj);
                        that.$router.push({
                            path: "/sureLeadWallet",
                            query: {
                                addressBTC: p2wpkh.address
                            }
                        });
                    }
                }

                } catch (err) {
                    Toast.fail(that.msg5);
                }
            } else {
                Toast.fail(that.msg4);
            }
        } else {
            if (that.inputName.length == 0) {
                that.prompt1 = true;
            }
            if (that.inputPwd.length == 0) {
                that.prompt2 = true;
            }
            if (that.inputAgainPwd.length == 0) {
                that.prompt3 = true;
            }
        }
    }
}