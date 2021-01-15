const Bhp = require("./bhp-js/bhp-browser");
const bip39 = require("bip39");
const sig = require("@kava-labs/sig");
import Utils from "./utils.js";
const ethers = require('ethers')
const bip32 = require("bip32");
import * as bitcoin from "bitcoinjs-lib";

export function createMnemonic() {
    const MNEMONIC_LEN = 128;
    const generateMnemonic = () => bip39.generateMnemonic(MNEMONIC_LEN);
    let randomMnemonic = generateMnemonic();
    return randomMnemonic;
}

export async function createWalletFIL(that, mnemonic) {
    const {
        HttpJsonRpcConnector,
        MnemonicWalletProvider
    } = require('filecoin.js')
    const seed = bip39.mnemonicToSeed(mnemonic);
    const master = bip32.fromSeed(await seed);
    const child = master.derivePath("44'/461'/0'/0/0");
    let privateKey = child.privateKey.toString("hex");
    const connector = new HttpJsonRpcConnector({
        url: "https://mrpc.bhpnet.io/fil/rpc/v0",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.kTsgZxZWsgUpCDk0LYSYIcxTNRO6h3VtlQYGBIZ-knM"
    });
    const hdWalletMnemonic = mnemonic;
    const hdWalletPassword = "";
    const hdDerivationPath = `m/44'/461'/0'/0/0`;
    const walletProvider = new MnemonicWalletProvider(
        connector,
        hdWalletMnemonic,
        hdWalletPassword,
        hdDerivationPath
    );
    let myAddress = await walletProvider.getDefaultAccount();
    that.createWalletObjFIL["address"] = myAddress;
    that.createWalletObjFIL["name"] = that.inputName;

    that.createWalletObjFIL["privateKey"] = Utils.encryptContent(
        privateKey,
        that.inputPwd
    );
    that.createWalletObjFIL["phrase"] = Utils.encryptContent(
        mnemonic,
        that.inputPwd
    );
    that.$store.commit("getBipList", mnemonic.split(" "));
    that.$store.commit("getNewCreateWalletFIL", that.createWalletObjFIL);
    that.$store.commit("getWalletType", "FIL");
}
export function createWallet1(that, mnemonic) {
    var accountETH = ethers.Wallet.fromMnemonic(mnemonic);
    let key = accountETH.privateKey.substr(2)
    let acct = new Bhp.wallet.Account(key);
    that.createWalletObj["address"] = acct._address;
    that.createWalletObj["name"] = that.inputName;
    that.createWalletObj["privateKey"] = Utils.encryptContent(
        acct._privateKey,
        that.inputPwd
    );
    that.createWalletObj["phrase"] = Utils.encryptContent(
        mnemonic,
        that.inputPwd
    );
    that.$store.commit("getBipList", mnemonic.split(" "));
    that.$store.commit("getNewCreateWalletBHP", that.createWalletObj);
    that.$store.commit("getWalletType", "BHP");
}
export function createWalletETH(that, mnemonic) {
    var accountETH = ethers.Wallet.fromMnemonic(mnemonic);
    that.createWalletObjETH["address"] = accountETH.address;
    that.createWalletObjETH["name"] = that.inputName;
    that.createWalletObjETH["phrase"] = accountETH.mnemonic.phrase;
    that.createWalletObjETH["privateKey"] = accountETH.privateKey;
    that.phrase = accountETH.mnemonic.phrase;
    that.$store.commit("getBipList", that.phrase.split(" "));

    let phrase = Utils.encryptContent(
        that.createWalletObjETH["phrase"],
        that.inputPwd
    );
    that.createWalletObjETH["phrase"] = phrase;

    let privateKey = Utils.encryptContent(
        that.createWalletObjETH["privateKey"],
        that.inputPwd
    );

    that.createWalletObjETH["privateKey"] = privateKey;
    that.$store.commit("getNewCreateWalletETH", that.createWalletObjETH);
    that.$store.commit("getWalletType", "ETH");
}
export function createWallet2(that, mnemonic) {
    const BHP_PREFIX = "bhp";
    const MNEMONIC_LEN = 256;
    const DERIVATION_PATH = "m/44'/547'/0'/0/0";
    const generateMnemonic = () => bip39.generateMnemonic(MNEMONIC_LEN);

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

    const masterKey = sig.createMasterKeyFromMnemonic(mnemonic);
    const keyPair = sig.createKeyPairFromMasterKey(
        masterKey,
        DERIVATION_PATH
    );
    const account2 = {
        address: sig.createAddress(keyPair.publicKey, BHP_PREFIX),
        phrase: mnemonic,
        privateKey: Bytes2Str(keyPair.privateKey),
        publicKey: Bytes2Str(keyPair.publicKey)
    };
    that.$store.commit("getBipList", account2.phrase.split(" "));
    account2.name = that.inputName;

    let phrase = Utils.encryptContent(
        account2.phrase,
        that.inputPwd
    );
    account2.phrase = phrase;
    let privateKey = Utils.encryptContent(
        account2.privateKey,
        that.inputPwd
    );
    account2.privateKey = privateKey;
    that.$store.commit("getNewCreateWalletBHP2", account2);
    that.$store.commit("getWalletType", "BHP2");
}
export async function createWalletBTC(that, mnemonic) {
    const network = bitcoin.networks.bitcoin;
    let seed = await bip39.mnemonicToSeed(mnemonic);
    let node = bip32.fromSeed(seed, network);

    const swPath = "m/49'/0'/0'/0/0";
    let wif = node.derivePath(swPath).toWIF();


    let p2wpkh = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({
            pubkey: node.derivePath(swPath).publicKey,
            network: network
        })
    })
    that.createWalletObjBTC["address"] = p2wpkh.address;
    that.createWalletObjBTC["name"] = that.inputName;

    that.createWalletObjBTC["privateKey"] = Utils.encryptContent(
        wif,
        that.inputPwd
    );

    that.createWalletObjBTC["phrase"] = Utils.encryptContent(
        mnemonic,
        that.inputPwd
    );
    that.$store.commit("getBipList", mnemonic.split(" "));
    that.$store.commit("getNewCreateWalletBTC", that.createWalletObjBTC);
    that.$store.commit("getWalletType", "BTC");
}