<template>
  <div class="transferRecords1">
    <img @click="clickReturn()" src="../assets/img/return1.png" alt />
    <div class="mainBox">
      <div class="mainBox1">
        <div class="box">
          <div class="box1">
            <span>Total assets</span>
            <h2>
              {{ totalAssets ? totalAssets.toFixed(4) : 0 }}
              <span>{{ iteam }}</span>
            </h2>
          </div>
        </div>
        <div class="box2">
          <img src="../assets/img/prompt.png" alt />
          <p v-text="$t('message.text75')">
            To protect your privacy, BHP wallet temporarily does not support
            viewing transaction records. Please check the transaction records in
            the Explorer.
          </p>
        </div>

        <button @click="toExplorer()">
          <span>GO</span>
        </button>
        <p class="bottomP">Explorer : {{ url + address }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      totalAssets: 0,
      iteam: "",
      url: "",
      address: "",
      msg1: "Copy succeeded!",
      msg2: "Copy failed! ",
    };
  },

  created() {
    this.address =
      this.$route.query.address1 ||
      this.$route.query.address2 ||
      this.$route.query.addressETH ||
      this.$route.query.addressBTC ||
      this.$route.query.addressFIL;

    if (this.$route.query.address1) {
      this.allWalletList = JSON.parse(localStorage.getItem("accounts")) || [];
      this.iteam = "BHP";
      this.url = "https://nexp.bhpa.io/#/registerAdd?registerAdd=";
    } else if (this.$route.query.addressFIL) {
      this.allWalletList =
        JSON.parse(localStorage.getItem("accountsFIL")) || [];
      this.iteam = "FIL";
      this.url = "https://filscout.io/zh/pc/account?id=";
    } else if (this.$route.query.address2) {
      this.allWalletList = JSON.parse(localStorage.getItem("accounts2")) || [];
      this.iteam = "BHP";
      this.url = "https://scan.bhpnet.io/account/";
    } else if (this.$route.query.addressETH) {
      if (this.$route.query.name) {
        this.iteam = this.$route.query.name;
        this.totalAssets = parseFloat(this.$route.query.ETHAsstesSum)
      } else {
        this.allWalletList =
          JSON.parse(localStorage.getItem("accountsETH")) || [];
        this.iteam = "ETH";
      }
      this.url = "https://www.oklink.com/eth/address/";
    } else if (this.$route.query.addressBTC) {
      this.allWalletList =
        JSON.parse(localStorage.getItem("accountsBTC")) || [];
      this.iteam = "BTC";
      this.url = "https://www.blockchain.com/btc/address/";
    }
    for (let i in this.allWalletList) {
      this.totalAssets += this.allWalletList[i].assets;
    }
  },
  methods: {
    clipboardSuccessHandler({ value, event }) {
      Toast.success(this.msg1);
    },

    clipboardErrorHandler({ value, event }) {
      Toast.fail(this.msg2);
    },
    clickReturn() {
      this.$router.go(-1);
    },
    toExplorer() {
      plus.runtime.openURL(this.url + this.address);
    },
  },
};
</script>

<style lang="less" >
.transferRecords1 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;

  img {
    width: 26px;
    height: 46px;
    padding: 46px 0 54px 40px;
    align-self: flex-start;
  }

  .mainBox {
    position: absolute;
    margin-top: 350px;
    width: 750px;
    .mainBox1 {
      width: 100%;
      background: url("../assets/img/recordsBanner.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      padding-top: 81px;
      .box {
        width: 670px;
        position: absolute;
        border-radius: 23px;
        z-index: -1;
        top: -210px;
        background: #4377ff;
        .box1 {
          width: 670px;
          height: 294px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;

          span {
            font-size: 28px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            margin: 42px 0 19px;
          }
          h2 {
            font-size: 48px;
            height: 48px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ffffff;
            margin: 0 0 163px;
            span {
              font-size: 32px;
              margin-right: 10px;
              position: relative;
              top: -5px;
            }
          }
        }
      }
      .box2 {
        width: 566px;
        height: 293px;
        padding: 40px 52px 0 52px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        background: #ffffff;
        box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.06);
        border-radius: 23px;
        img {
          width: 60px;
          height: 60px;
          padding: 0;
          align-self: center;
        }
        p {
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          margin: 13px 0 0;
          line-height: 40px;
          text-align: center;
          padding: 0 37px;
        }
      }
    }
  }
  button {
    width: 640px;
    height: 88px;
    background: #4377ff;
    border-radius: 44px;
    margin-top: 106px;
    margin-bottom: 26px;
    font-size: 32px;
    font-family: ArialMT;
    color: #ffffff;
    padding: 0;
    outline: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 32px;
      height: 32px;
      margin-right: 10px;
      padding: 0;
      position: relative;
      top: 4px;
    }
  }
  .bottomP {
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4377ff;
    width: 640px;
    word-break: break-all;
    text-align: center;
  }
}
</style>