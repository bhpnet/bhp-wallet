<template>
  <div class="changeCreateWallet">
    <img class="topImg" @click="clickReturn()" src="../assets/img/return.png" alt />
    <h2 style="font-weight:bold" v-text="$t('message.text8')">Create Wallet</h2>
    <button @click="toCreateWalletBTC()">
      <img src="../assets/img/BTC.png" alt />
      <span>BTC</span>
    </button>
    <button @click="toCreateWalletETH()">
      <img src="../assets/img/ETCsider.png" alt />
      <span>Ethereum</span>
    </button>

    <!-- <button @click="toCreateWalletFIL()">
      <img src="../assets/img/FIL.png" alt />
      <span>FIL</span>
    </button> -->
    <button @click="toCreateWallet1()">
      <img src="../assets/img/logoBhp1Mini.png" alt />
      <span>BHP</span>
    </button>

    <!-- <button @click="toCreateWallet2()">
      <img src="../assets/img/logoBhp2Mini.png" alt />
      <span>BHP2</span>
    </button> -->
  </div>
</template>

<script>
const bitcoin = require("bitcoinjs-lib");
export default {
  data() {
    return {};
  },
  mounted() {
   
  },
  methods: {
    toCreateWalletETH() {
      this.$router.push({
        path: "/createWallet",
        query: {
          createWallet: "createWalletETH"
        }
      });
    },
    toCreateWalletBTC() {
      this.$router.push({
        path: "/createWallet",
        query: {
          createWallet: "createWalletBTC"
        }
      });
    },
    toCreateWalletFIL() {
      this.$router.push({
        path: "/createWallet",
        query: {
          createWallet: "createWalletFIL"
        }
      });
    },
    toCreateWallet1() {
      this.$router.push({
        path: "/createWallet",
        query: {
          createWallet: "createWallet1"
        }
      });
    },
    clickReturn() {
      this.$router.go(-1);
    },
    toCreateWallet2() {
      this.$router.push({
        path: "/createWallet",
        query: {
          createWallet: "createWallet2"
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.changeCreateWallet {
  height: 100%;
  background: url("../assets/img/createBanner.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .topImg {
    width: 26px;
    height: 46px;
    padding: 46px 0 54px 40px;
  }
  h2 {
    font-size: 48px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #fff;
    padding-left: 42px;
    margin: 0 0 98px;
  }
  button {
    width: 640px;
    height: 112px;
    border: none;
    transition: all 0.2s linear;
    outline: none;
    padding: 0;
    background: #ffffff;
    border-radius: 68px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 50px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #4377ff;
    letter-spacing: 4px;
    margin-bottom: 50px;
    align-self: center;

    img {
      margin-right: 16px;
      margin-left: 120px;
      width: 60px;
      padding: 0;
    }
    span {
      width: 300px;
      text-align: center;
    }
  }
  button:hover {
    transform: scale(0.95);
    opacity: 0.8;
  }
}
</style>