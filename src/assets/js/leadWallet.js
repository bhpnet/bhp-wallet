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
        that.inputMnemonic = that.inputMnemonic.replace(/\s+/g, " ")
        that.inputMnemonic = that.inputMnemonic.replace(/(^\s*)|(\s*$)/g, "")
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
                    const BHP_PREFIX = "bhp";
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


                    let phrase = Utils.encryptContent(
                        account.phrase,
                        that.inputPwd
                    );
                    account.phrase = phrase;
                    let privateKey = Utils.encryptContent(
                        account.privateKey,
                        that.inputPwd
                    );
                    account.name = that.inputName;
                    account.privateKey = privateKey;
                    that.accounts2 =
                        JSON.parse(localStorage.getItem("accounts2")) || [];
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
                                that.$store.commit("getWalletType", "BHP2");
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
                    var accountETH = ethers.Wallet.fromMnemonic(
                        that.inputMnemonic
                    );
                    let key = accountETH.privateKey.substr(2)
                    let acct = new Bhp.wallet.Account(key);
                    that.createWalletObj["address"] = acct._address;
                    that.createWalletObj["name"] = that.inputName;


                    that.createWalletObj["privateKey"] = Utils.encryptContent(
                        acct._privateKey,
                        that.inputPwd
                    );
                    that.createWalletObj["phrase"] = Utils.encryptContent(
                        that.inputMnemonic,
                        that.inputPwd
                    );
                    that.accounts =
                        JSON.parse(localStorage.getItem("accounts")) || [];
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
                                that.$store.commit("getWalletType", "BHP");
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
                    );
                    that.createWalletObj["address"] = accountETH.address;
                    that.createWalletObj["name"] = that.inputName;
                    that.createWalletObj["phrase"] = accountETH.mnemonic.phrase;
                    that.createWalletObj["privateKey"] = accountETH.privateKey;


                    let phrase = Utils.encryptContent(
                        that.createWalletObj["phrase"],
                        that.inputPwd
                    );
                    that.createWalletObj["phrase"] = phrase;
                    let privateKey = Utils.encryptContent(
                        that.createWalletObj["privateKey"],
                        that.inputPwd
                    );
                    that.createWalletObj["privateKey"] = privateKey;
                    that.accounts =
                        JSON.parse(localStorage.getItem("accountsETH")) || [];
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
                                that.$store.commit("getWalletType", "ETH");
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
                    } = require('filecoin.js')
                    const seed = bip39.mnemonicToSeed(that.inputMnemonic);
                    const master = bip32.fromSeed(await seed);
                    const child = master.derivePath("44'/461'/0'/0/0");
                    let MyPrivateKey = child.privateKey.toString("hex");
                    const connector = new HttpJsonRpcConnector({
                        url: "https://mrpc.bhpnet.io/fil/rpc/v0",
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


                    let phrase = Utils.encryptContent(
                        that.inputMnemonic,
                        that.inputPwd
                    );
                    that.createWalletObj["phrase"] = phrase;
                    let privateKey = Utils.encryptContent(
                        MyPrivateKey,
                        that.inputPwd
                    );
                    that.createWalletObj["privateKey"] = privateKey;
                    that.accounts =
                        JSON.parse(localStorage.getItem("accountsFIL")) || [];
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
                                that.$store.commit("getWalletType", "FIL");
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


                    that.createWalletObj["privateKey"] = Utils.encryptContent(
                        wif,
                        that.inputPwd
                    );
                    that.createWalletObj["phrase"] = Utils.encryptContent(
                        that.inputMnemonic,
                        that.inputPwd
                    );

                    that.accounts =
                        JSON.parse(localStorage.getItem("accountsBTC")) || [];
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
                                that.$store.commit("getWalletType", "BTC");
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
                that.leadPrivateKey = that.leadPrivateKey.replace(/(^\s*)|(\s*$)/g, "")
                try {
                    if (that.$route.query.leadWallet == "leadWallet2") {}
                    if (that.$route.query.leadWallet == "leadWalletFIL") {} else if (that.$route.query.leadWallet == "leadWallet1") {

                        let acct = new Bhp.wallet.Account(that.leadPrivateKey);
                        that.createWalletObj["address"] = acct._address;
                        that.createWalletObj["name"] = that.inputName;


                        that.createWalletObj["privateKey"] = Utils.encryptContent(
                            acct._privateKey,
                            that.inputPwd
                        );

                        that.accounts =
                            JSON.parse(localStorage.getItem("accounts")) || [];
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
                                    that.$store.commit("getWalletType", "BHP");
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
                        if (that.leadPrivateKey.length == 64 || that.leadPrivateKey.length == 66) {
                            if (that.leadPrivateKey.substr(0, 2) != "0x") {
                                that.leadPrivateKey = "0x" + that.leadPrivateKey;
                            }
                            var accountETH = new ethers.Wallet(that.leadPrivateKey);
                            that.createWalletObj["address"] = accountETH.address;
                            that.createWalletObj["name"] = that.inputName;
                            that.createWalletObj["privateKey"] = accountETH.privateKey;


                            let privateKey = Utils.encryptContent(
                                that.createWalletObj["privateKey"],
                                that.inputPwd
                            );
                            that.createWalletObj["privateKey"] = privateKey;
                            that.accounts =
                                JSON.parse(localStorage.getItem("accountsETH")) || [];
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
                                        that.$store.commit("getWalletType", "ETH");
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

                        that.createWalletObj["privateKey"] = Utils.encryptContent(
                            that.leadPrivateKey,
                            that.inputPwd
                        );
                        that.accounts =
                            JSON.parse(localStorage.getItem("accountsBTC")) || [];
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
                                    that.$store.commit("getWalletType", "BTC");
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