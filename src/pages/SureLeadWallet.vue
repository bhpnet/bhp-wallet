<template>
  <div class="sureLeadWallet">
    <img @click="clickReturn()" src="../assets/img/return1.png" alt />
    <h2 style="font-weight:bold" v-text="$t('message.text17')">导入钱包</h2>

    <div class="assetMsg">
      <span class="walletname" style="color:#000">{{newLeadWallet.name}}</span>
      <span v-text="$t('message.text20')">资产余额</span>
      <span class="money">{{assetName}} {{this.value}}</span>
      <span v-text="$t('message.text19')">钱包地址</span>
      <p class="address">{{newLeadWallet.address}}</p>
    </div>
    <button class="firstBtn" @click="sureLead()" v-text="$t('message.text21')">确认导入</button>
    <button @click="toUpdate()" v-text="$t('message.text22')">返回修改</button>
  </div>
</template>

<script>
import { getasset, getAccounts, eth_getBalance, btc_getBalanceAndUTXO } from "../api/api";
import ethers from "ethers";
import Utils from "../assets/js/utils.js";
import { HttpJsonRpcConnector, HttpJsonRpcWalletProvider } from "filecoin.js";
export default {
  data() {
    return {
      newLeadWallet: {},
      accounts: [],
      assetName: "",
      value: 0
    };
  },
  created() {
    this.newLeadWallet = this.$store.state.newLeadWallet;
    if (this.$route.query.address2) {
      this.Accounts(this.newLeadWallet.address);
    } else if (this.$route.query.address1) {
      this.assetes(this.newLeadWallet.address);
    } else if (this.$route.query.addressETH) {
      this.assetETH(this.newLeadWallet.address);
    } else if (this.$route.query.addressFIL) {
      this.assetFIL(this.newLeadWallet.address);
    } else if (this.$route.query.addressBTC) {
      this.assetBTC(this.newLeadWallet.address);
    }
  },
  methods: {
    //获取BTC资产余额
    assetBTC(address) {
      btc_getBalanceAndUTXO(address).then(res => {
        if (res.data.balance) {
          this.value = parseFloat(res.data.balance/Math.pow(10,8)).toFixed(4);
          if (this.value == 0) {
            this.value = 0;
          }
          this.assetName = "BTC";
        } else {
          this.value = 0;
          this.assetName = "BTC";
        }
      });
    },
    //获取FIL资产
    async assetFIL(address) {
      const connector = new HttpJsonRpcConnector({
        url: "api/rpc/v0",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.fzpHtg9VFX1K8s5vbyrHpGoWYEcJESybHziADoLw5Wc"
      });
      //查询资产
      let rpc = new HttpJsonRpcWalletProvider(connector);
      let res = await rpc.getBalance(address);
      if (res) {
        this.value = parseFloat(res / Math.pow(10, 18)).toFixed(4);
        if (this.value == 0) {
          this.value = 0;
        }
        this.assetName = "FIL";
      } else {
        this.value = 0;
        this.assetName = "FIL";
      }
    },
    //获取以太坊资产
    assetETH(address) {
      eth_getBalance(address).then(res => {
        if (res.data.result) {
          this.value = (
            parseInt(res.data.result, 16) / Math.pow(10, 18)
          ).toFixed(4);
          if (this.value == 0) {
            this.value = 0;
          }
          this.assetName = "ETH";
        } else {
          this.value = 0;
          this.assetName = "ETH";
        }
      });
    },
    //获取地址资产
    assetes(address) {
      //钱包1.0查询余额
      getasset(address).then(res => {
        if (res.data.result.balances.length > 0) {
          res.data.result.balances.forEach((v, i) => {
            v.asset = this.getAssetName(v.asset);
          });
          this.value = parseFloat(res.data.result.balances[0].value).toFixed(4);
          if (this.value == 0) {
            this.value = 0;
          }
          this.assetName = "BHP";
        } else {
          this.value = 0;
          this.assetName = "BHP";
        }
      });
    },
    Accounts(address) {
      //钱包2.0查询余额
      getAccounts(address).then(res => {
        if (res.data.result.value.coins.length > 0) {
          this.value = (
            parseFloat(res.data.result.value.coins[0].amount) / 100000000
          ).toFixed(4);
          if (this.value == 0) {
            this.value = 0;
          }
          this.assetName = "BHP";
        } else {
          this.value = 0;
          this.assetName = "BHP";
        }
      });
    },
    clickReturn() {
      this.$router.go(-1);
    },
    sureLead() {
      if (this.$route.query.address1) {
        this.accounts = JSON.parse(localStorage.getItem("accounts")) || []; //||[]很重要
        this.accounts.push(this.newLeadWallet);
        localStorage.setItem("accounts", JSON.stringify(this.accounts));
        this.$router.replace({
          path: "/indexHome/myWallet",
          query: {
            address1: this.newLeadWallet.address
          }
        });
      } else if (this.$route.query.address2) {
        this.accounts = JSON.parse(localStorage.getItem("accounts2")) || []; //||[]很重要
        this.accounts.push(this.newLeadWallet);
        localStorage.setItem("accounts2", JSON.stringify(this.accounts));
        this.$router.replace({
          path: "/indexHome/myWallet",
          query: {
            address2: this.newLeadWallet.address
          }
        });
      } else if (this.$route.query.addressETH) {
        this.accounts = JSON.parse(localStorage.getItem("accountsETH")) || []; //||[]很重要
        this.accounts.push(this.newLeadWallet);
        localStorage.setItem("accountsETH", JSON.stringify(this.accounts));
        this.$router.replace({
          path: "/indexHome/myWallet",
          query: {
            addressETH: this.newLeadWallet.address
          }
        });
      } else if (this.$route.query.addressBTC) {
        this.accounts = JSON.parse(localStorage.getItem("accountsBTC")) || []; //||[]很重要
        this.accounts.push(this.newLeadWallet);
        localStorage.setItem("accountsBTC", JSON.stringify(this.accounts));
        this.$router.replace({
          path: "/indexHome/myWallet",
          query: {
            addressBTC: this.newLeadWallet.address
          }
        });
      } else if (this.$route.query.addressFIL) {
        this.accounts = JSON.parse(localStorage.getItem("accountsFIL")) || []; //||[]很重要
        this.accounts.push(this.newLeadWallet);
        localStorage.setItem("accountsFIL", JSON.stringify(this.accounts));
        this.$router.replace({
          path: "/indexHome/myWallet",
          query: {
            addressFIL: this.newLeadWallet.address
          }
        });
      }
    },
    getAssetName(assetId) {
      switch (assetId) {
        case "0x07d8f52825899ce08dc2d3d8f4eda62dcaef0035719fcaa267fcdef6bd70c95c":
          return "BCNX";
          break;
        case "0x13f76fabfe19f3ec7fd54d63179a156bafc44afc53a7f07a7a15f6724c0aa854":
          return "BHP";
          break;
        case "0x2175cd1114136407eed988ba2b498cc51cb33d75b283674c3d9ce4f2336e1c6d":
          return "HUSDT";
          break;
        case "0x25649bf8df8c8eb3ce565db6ccb18fb873de9d1378e2d5714ceb8c0ab444d326":
          return "HETH";
          break;
        case "0xa60b5dbb2b50022e3179a5a129b4d90bbb5bf5caabc40893fcdb83703e751225":
          return "BHPGas";
          break;
        case "0xb58f03b3a33a82b2928fd04b2d9fefd514580a0ce0a094fb13602c2e3277005e":
          return "HLTC";
          break;
        case "0xe0f40ba2958954555e2e5b0dd4e9591d923e2913a036cc301b32d5b7e1144667":
          return "TH";
          break;
        case "0xf06e0b6c3ed5aea2a4ece4df0dab3c074805347650dba18d9deb3189dd5aea68":
          return "HBTC";
          break;
      }
    },
    toUpdate() {
      this.$router.push("/leadWallet");
    }
  }
};
</script>

<style lang="less" scoped>
.sureLeadWallet {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;

  img {
    width: 26px;
    height: 46px;
    padding: 46px 0 54px 40px;
  }
  h2 {
    font-size: 48px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #000;
    padding-left: 42px;
    margin: 0 0 100px;
  }

  .assetMsg,
  button {
    width: 630px;
    align-self: center;
  }

  .assetMsg {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 50px 36px 0 36px;
    height: 300px;
    width: 610px;
    background: url("../assets/img/walletBanner.png") no-repeat;
    background-size: 100% 100%;
    .walletname {
      margin-bottom: 20px;
    }
    .address {
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      width: 630px;
      margin: 0px 0 0;
      color: rgba(255, 255, 255, 0.6);
    }
    span {
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
    .money {
      margin: 6px 0 10px;
      font-size: 48px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
    }
  }
  button {
    width: 640px;
    height: 88px;
    background: rgba(0, 0, 0, 0);
    border-radius: 44px;
    font-size: 32px;
    font-family: ArialMT;
    color: #4377ff;
    align-self: center;
    outline: none;
    border: 3px solid #4377ff;
  }
  .firstBtn {
    margin-top: 202px;
    background: #4377ff;
    color: rgba(244, 245, 249, 1);
    margin-bottom: 50px;
    border: none;
  }
}
</style>