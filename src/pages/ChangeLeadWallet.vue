<template>
  <div class="changeLeadWallet">
    <img class="topImg" @click="clickReturn()" src="../assets/img/return.png" alt />
    <h2 style="font-weight:bold" v-text="$t('message.text17')">Lead Wallet</h2>
     <button @click="toLeadWalletBTC()">
      <img src="../assets/img/BTC.png" alt />

      <span>BTC</span>
    </button>
    <button @click="toLeadWalletETH()">
      <img src="../assets/img/ETCsider.png" alt />

      <span>Ethereum</span>
    </button>
   
    <!-- <button @click="toLeadWalletFIL()">
      <img src="../assets/img/FIL.png" alt />
      <span>FIL</span>
    </button> -->
    <button @click="toLeadWallet1()">
      <img src="../assets/img/logoBhp1Mini.png" alt />
      <span>BHP</span>
    </button>
    <!-- <button @click="toLeadWallet2()">
      <img src="../assets/img/logoBhp2Mini.png" alt />
      <span>BHP2</span>
    </button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toLeadWalletETH() {
      this.$router.push({
        path: "/leadWallet",
        query: {
          leadWallet: "leadWalletETH"
        }
      });
    },
    toLeadWalletBTC() {
      this.$router.push({
        path: "/leadWallet",
        query: {
          leadWallet: "leadWalletBTC"
        }
      });
    },
     toLeadWalletFIL() {
      this.$router.push({
        path: "/leadWallet",
        query: {
          leadWallet: "leadWalletFIL"
        }
      });
    },
    toLeadWallet1() {
      this.$router.push({
        path: "/leadWallet",
        query: {
          leadWallet: "leadWallet1"
        }
      });
    },
    clickReturn() {
      this.$router.go(-1);
    },
    toLeadWallet2() {
      this.$router.push({
        path: "/leadWallet",
        query: {
          leadWallet: "leadWallet2"
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.changeLeadWallet {
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
    display: block;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 50px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #4377ff;
    line-height: 58px;
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