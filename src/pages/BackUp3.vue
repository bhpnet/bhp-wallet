<template>
  <div class="backUp3">
    <img @click="clickReturn()" src="../assets/img/return1.png" alt />
    <h2 style="font-weight: bold" v-text="$t('message.text35')">备份助记词</h2>
    <p v-text="$t('message.text119')"></p>
    <p v-text="$t('message.text120')"></p>

    <div class="mnemonicWords mnemonicWords1">
      <div v-for="(v, i) of list1" :key="i" @click="ReturnBackUp(v)">{{ v }}</div>
    </div>
    <div class="mnemonicWords mnemonicWords2">
      <div v-for="(v, i) of list2" :key="i" @click="toBackUp(v)">{{ v }}</div>
    </div>
    <button @click="clickSure" v-text="$t('message.text4')">确认</button>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      listWords: [],
      list1: [],
      list2: [],
      msg1: "Wrong order of mnemonics!",
      msg2: "Backup succeeded!",
    };
  },
  created() {
    if (localStorage.getItem("lang") == "cn") {
      this.msg1 = "助记词顺序错误！";
      this.msg2 = "备份成功！";
    } else {
      this.msg1 = "Wrong order of mnemonics!";
      this.msg2 = "Backup succeeded!";
    }
    this.listWords = this.$store.state.bipList;
    this.list2 = Object.assign([], this.listWords);
    this.list2.sort(this.randomsort);
  },
  methods: {
    randomsort(a, b) {
      return Math.random() > 0.5 ? -1 : 1;
    },
    clickReturn() {
      this.$router.go(-1);
    },
    clickSure() {
      if (this.list1.every((v, i) => v == this.listWords[i]) && this.list1.length != 0) {
        Toast.success(this.msg2);
        if (this.$store.state.walletType == "BHP") {
          this.saveWalletBHP();
          this.$router.replace({
            path: "/indexHome/myWallet",
            query: {
              address1: this.$store.state.newCreateWalletBHP.address,
            },
          });
        } else if (this.$store.state.walletType == "BHP2") {
          this.saveWalletBHP2();
          this.$router.replace({
            path: "/indexHome/myWallet",
            query: {
              address2: this.$store.state.newCreateWalletBHP2.address,
            },
          });
        } else if (this.$store.state.walletType == "ETH") {
          this.saveWalletETH();
          this.$router.replace({
            path: "/indexHome/myWallet",
            query: {
              addressETH: this.$store.state.newCreateWalletETH.address,
            },
          });
        } else if (this.$store.state.walletType == "BTC") {
          this.saveWalletBTC();
          this.$router.replace({
            path: "/indexHome/myWallet",
            query: {
              addressBTC: this.$store.state.newCreateWalletBTC.address,
            },
          });
        } else if (this.$store.state.walletType == "FIL") {
          this.saveWalletFIL();
          this.$router.replace({
            path: "/indexHome/myWallet",
            query: {
              addressFIL: this.$store.state.newCreateWalletFIL.address,
            },
          });
        } else if (this.$store.state.walletType == "All") {
          this.saveWalletBHP();
          this.saveWalletBHP2();
          this.saveWalletETH();
          this.saveWalletBTC();
          this.saveWalletFIL();
          this.$router.replace({
            path: "/indexHome/myWallet",
            query: {
              addressETH: this.$store.state.newCreateWalletETH.address,
            },
          });
        } else {
          this.$router.replace({
            path: "/indexHome/myWallet",
            query: {
              address: "OpenToIndexHome",
            },
          });
        }
      } else {
        Toast.fail(this.msg1);
      }
    },
    saveWalletBHP() {
      let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
      accounts.push(this.$store.state.newCreateWalletBHP);
      localStorage.setItem("accounts", JSON.stringify(accounts));
    },
    saveWalletBHP2() {
      let accounts = JSON.parse(localStorage.getItem("accounts2")) || [];
      accounts.push(this.$store.state.newCreateWalletBHP2);
      localStorage.setItem("accounts2", JSON.stringify(accounts));
    },
    saveWalletETH() {
      let accounts = JSON.parse(localStorage.getItem("accountsETH")) || [];
      accounts.push(this.$store.state.newCreateWalletETH);
      localStorage.setItem("accountsETH", JSON.stringify(accounts));
    },
    saveWalletBTC() {
      let accounts = JSON.parse(localStorage.getItem("accountsBTC")) || [];
      accounts.push(this.$store.state.newCreateWalletBTC);
      localStorage.setItem("accountsBTC", JSON.stringify(accounts));
    },
    saveWalletFIL() {
      let accounts = JSON.parse(localStorage.getItem("accountsFIL")) || [];
      accounts.push(this.$store.state.newCreateWalletFIL);
      localStorage.setItem("accountsFIL", JSON.stringify(accounts));
    },
    toBackUp(v) {
      this.list1.push(v);
      this.list2.splice(this.list2.indexOf(v), 1);
    },
    ReturnBackUp(v) {
      this.list2.push(v);
      this.list1.splice(this.list1.indexOf(v), 1);
    },
  },
};
</script>

<style lang="less" scoped>
.backUp3 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

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
    margin: 0 0 34px;
  }
  p,
  .mnemonicWords,
  button {
    width: 670px;
    align-self: center;
  }
  p {
    font-size: 28px;
    font-family: Segoe UI;
    font-weight: 400;
    line-height: 38px;
    color: rgba(1, 6, 19, 1);
    margin: 0;
    margin-bottom: 15px;
  }
  .mnemonicWords {
    width: 670px;
    margin-top: 12px;
    display: flex;
    padding: 10px;
    padding-bottom: 0;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    border: 2px solid #4377ff;
    border-radius: 17px;
    margin-top: 50px;
    div {
      width: 151px;
      height: 72px;
      background: #e7f1ff;
      border-radius: 15px;
      margin-bottom: 20px;
      margin-right: 22px;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #4377ff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    div:nth-child(4n) {
      margin-right: 0;
    }
  }
  .mnemonicWords1 {
    height: 290px;
  }

  .mnemonicWords2 {
    border: none;
    margin-top: 40px;
    div {
      margin-bottom: 11px;
    }
  }
  button {
    width: 640px;
    height: 88px;
    background: #4377ff;
    border-radius: 44px;
    outline: none;
    border: none;
    font-size: 32px;
    font-family: ArialMT;
    color: #ffffff;
    margin-top: 60px;
    margin-bottom: 70px;
  }
}
</style>
