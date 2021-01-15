<template>
  <div class="receiving">
    <img @click="clickReturn()" src="../assets/img/return1.png" alt />
    <h2 style="font-weight: bold" v-text="$t('message.text44')">收款</h2>

    <van-popup
      class="popup"
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '80% ' }"
    >
      <h2 v-text="$t('message.text38')">钱包列表</h2>
    </van-popup>
    <div class="walletName">{{ $route.query.name }}</div>
    <div ref="qrCodeUrl" class="codeImg">
      <img class="qrLogo" :src="qrImg" alt />
    </div>

    <span class="addressMain">{{ address }}</span>
    <div class="bottomDiv">
      <button
        class="copy"
        v-clipboard="address"
        v-clipboard:success="clipboardSuccessHandler"
        v-clipboard:error="clipboardErrorHandler"
      >
        <img src="../assets/img/copy.png" alt />
        <span v-text="$t('message.text40')">复制地址</span>
      </button>
      <!-- <button class="share">
        <img src="../assets/img/share.png" alt />
        <span v-text="$t('message.text41')">分享</span>
      </button>-->
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import { Toast } from "vant";

export default {
  name: "myWallet3",
  data() {
    return {
      show: false,
      allWalletList: [],
      msg1: "Copy succeeded!",
      msg2: "Copy failed! ",
      qrImg: "",
    };
  },
  created() {
    if (localStorage.getItem("lang") == "cn") {
      this.msg1 = "复制成功！";
      this.msg2 = "复制失败！";
    } else {
      this.msg1 = "Copy succeeded!";
      this.msg2 = "Copy failed! ";
    }
    if (this.$route.query.walletType == "BHP") {
      this.qrImg = require("../assets/img/qrcodeBHP.png");
    } else if (this.$route.query.walletType == "BHP2") {
      this.qrImg = require("../assets/img/qrcodeBHP2.png");
    } else if (this.$route.query.walletType == "ETH") {
      this.qrImg = require("../assets/img/ETCsider.png");
    } else if (this.$route.query.walletType == "FIL") {
      this.qrImg = require("../assets/img/FIL.png");
    } else if (this.$route.query.walletType == "BTC") {
      this.qrImg = require("../assets/img/BTC.png");
    }
    this.address = this.$route.query.address;
  },
  mounted() {
    this.creatQrCode(this.address);
  },
  methods: {
    clipboardSuccessHandler({ value, event }) {
      Toast.success(this.msg1);
    },

    clipboardErrorHandler({ value, event }) {
      Toast.fail(this.msg2);
    },

    creatQrCode(address) {
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: address,
        width: 198,
        height: 198,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
    createWallet() {
      this.$router.push("/createWallet");
    },
    leadWallet() {
      this.$router.push("/leadWallet");
    },
    clickReturn() {
      this.$router.go(-1);
    },
    showPopup() {
      this.show = true;
    },
  },
};
</script>

<style lang="less" scoped>
.receiving {
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
    margin: 0 0 34px;
  }
  .top {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 100px;
    span {
      font-size: 28px;
      font-family: Arial;
      font-weight: bold;

      color: rgba(1, 6, 19, 1);
    }
  }
  .walletName {
    padding-top: 26px;
    font-size: 48px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #393a49;
    align-self: center;
    margin-bottom: 36px;
  }
  .popup {
    align-self: center;
    .createOrLead {
      position: fixed;
      width: 472px;
      padding: 0 60px;

      bottom: 60px;
      left: 0;
      .createOrLead1 {
        display: flex;
        justify-content: space-between;
        width: 472px;
        height: 70px;
        button {
          width: 196px;
          height: 70px;
          background: rgba(1, 6, 19, 1);
          font-size: 24px;
          font-family: Segoe UI;
          font-weight: 400;
          color: rgba(244, 245, 249, 1);
          border-radius: 10px;
          outline: none;
          display: block;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          margin: 0;
          img {
            width: 32px;
            height: 32px;
            padding: 0;
          }
        }
        .leadBtn {
          width: 196px;
          height: 70px;
          border: 2px solid rgba(1, 6, 19, 1);
          border-radius: 10px;
          background: #fff;
          color: rgba(1, 6, 19, 1);
        }
      }
    }
    h2 {
      font-size: 60px;
      font-family: Segoe UI;
      font-weight: bold;
      line-height: 80px;
      color: rgba(1, 6, 19, 1);
      padding: 164px 0 60px 62px;
      margin: 0;
    }

    .main {
      border-top: 1px solid rgba(234, 236, 239, 1);
      width: 100%;
      padding-top: 54px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .walletsBox {
        overflow: auto;
        height: calc(100vh - 520px);

        .box {
          width: 472px;
          height: 230px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 6px 12px rgba(141, 127, 127, 0.16);
          border-radius: 10px;
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          position: relative;
          .rightTopImg {
            position: absolute;
            top: 10px;
            right: 20px;
            width: 30px;
            height: 30px;
            background: url("../assets/img/right.png");
            background-size: 100% 100%;
          }

          p {
            padding-left: 38px;
            font-size: 26px;
            font-family: Segoe UI;
            font-weight: bold;
            color: rgba(1, 6, 19, 1);

            span {
              font-size: 32px;
              margin-right: 30px;
            }
          }
          .addressPopup {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 38px;
            margin-bottom: 16px;
            img {
              width: 60px;
              height: 60px;
              padding: 0;
            }
            span {
              font-size: 20px;
              font-family: Segoe UI;
              font-weight: 300;
              line-height: 20px;
              color: rgba(162, 168, 183, 1);
              word-break: break-all;
              margin-right: 0;
            }
          }
        }
      }
    }
  }
  .addressMain {
    margin: 30px 0 100px;
    align-self: center;
    font-size: 30px;
    width: 540px;
    line-height: 40px;
    word-break: break-all;
    color: #999999;
    text-align: center;
  }
  .codeImg {
    margin: 0 auto;
    margin-top: 0;
    position: relative;
    .qrLogo {
      position: absolute;
      width: 100px;
      height: 100px;
      left: 50%;
      margin-left: -50px !important;
      top: 50%;
      margin-top: -50px !important;
    }
    img {
      width: 396px;
      height: 396px;
      padding: 0;
      margin: 0 !important;
    }
  }
  .bottomDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    button {
      width: 300px;
      height: 82px;
      background: #4377ff;
      border-radius: 41px;
      padding: 0;
      outline: none;

      border: 2px solid #4377ff;
      display: flex;
      background: rgba(0, 0, 0, 0);
      justify-content: center;
      align-items: center;
      img {
        width: 32px;
        height: 32px;
        margin-right: 4px;
        padding: 0;
      }
      span {
        font-size: 28px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #4377ff;
      }
    }
    .copy {
      border: none;
      background: #4377ff;
      span {
        color: #fff;
      }
    }
  }
}
</style>
