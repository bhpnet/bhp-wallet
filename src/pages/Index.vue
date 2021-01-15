<template>
  <div class="home">
    <div @click="toOpenSelect()" class="language">
      <span class="selectSpan">{{ language }}</span>
      <i></i>
      <div v-show="hide" class="selectDiv">
        <div class="selectDiv1">
          <span :class="lang == 'cn' ? 'active' : ''" @click="toCNorEN('cn', '简体中文')"
            >简体中文</span
          >
          <span :class="lang == 'en' ? 'active' : ''" @click="toCNorEN('en', 'English')"
            >English</span
          >
          <span :class="lang == 'ko' ? 'active' : ''" @click="toCNorEN('ko', '한국어')"
            >한국어</span
          >
          <span :class="lang == 'ja' ? 'active' : ''" @click="toCNorEN('ja', '日本語')"
            >日本語</span
          >
        </div>
      </div>
    </div>
    <img src="../assets/img/logo.png" alt />
    <p>
      Hello,
      <br />Welcome to BHP Wallet
    </p>

    <button @click="createWallet()" v-text="$t('message.text16')">创建钱包</button>
    <button class="leadBtn" @click="leadWallet()" v-text="$t('message.text17')">
      导入钱包
    </button>
  </div>
</template>

<script>
export default {
  created() {
    this.lang = localStorage.lang == undefined ? "en" : localStorage.lang;
    localStorage.setItem("lang", this.lang);
    switch (this.lang) {
      case "cn":
        this.language = "简体中文";
        break;
      case "en":
        this.language = "English";
        break;
      case "ko":
        this.language = "한국어";
        break;
      case "ja":
        this.language = "日本語";
        break;
    }
    this.allWalletList = JSON.parse(localStorage.getItem("accounts")) || [];
    this.allWalletList2 = JSON.parse(localStorage.getItem("accounts2")) || [];
    this.allWalletListFIL = JSON.parse(localStorage.getItem("accountsFIL")) || [];
    this.allWalletListBTC = JSON.parse(localStorage.getItem("accountsBTC")) || [];
    this.allWalletListETH = JSON.parse(localStorage.getItem("accountsETH")) || [];
    if (
      this.allWalletList.length != 0 ||
      this.allWalletListETH.length != 0 ||
      this.allWalletListBTC.length != 0
      // ||this.allWalletList2.length != 0 ||
      // this.allWalletListFIL.length != 0
    ) {
      this.$router.replace({
        path: "/indexHome/myWallet",
        query: {
          address: "OpenToIndexHome",
        },
      });
    } else {
      this.status = true;
    }
  },
  data() {
    return {
      allWalletList: [],
      allWalletList2: [],
      allWalletListETH: [],
      allWalletListFIL: [],
      allWalletListBTC: [],
      language: "English",
      lang: "en",
      status: false,
      hide: false,
    };
  },
  methods: {
    toOpenSelect() {
      this.hide = !this.hide;
    },
    createWallet() {
      if (this.status) {
        this.$router.push({
          path: "/createWallet",
          query: {
            createWallet: "createWalletAll",
          },
        });
      } else {
        this.$router.push("/changeCreateWallet");
      }
    },
    leadWallet() {
      this.$router.push("/changeLeadWallet");
    },
    toCNorEN(e, language) {
      this.lang = e;
      this.language = language;
      localStorage.setItem("lang", e);
      this.$i18n.locale = e;
      this.hide = true;
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding: 0 70px;
  background: url("../assets/img/createBanner.png") no-repeat;
  background-size: 100% 100%;

  .language {
    width: 180px;
    height: 53px;
    align-self: flex-end;
    margin-top: 26px;
    background: #fff;
    border-radius: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    i {
      display: block;
      border: 8px solid #4377ff;
      height: 0;
      width: 0;
      border-top: 10px solid #4377ff;
      border-color: #4377ff transparent transparent transparent;
      margin-left: 6px;
      position: relative;
      top: 4px;
    }
    .selectSpan {
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #4377ff;
    }
    .selectDiv {
      position: absolute;
      width: 141px;
      height: 184px;
      top: 47px;
      left: 20px;
      background: url("../assets/img/selectImg.png") no-repeat;
      background-size: cover;
      .selectDiv1 {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #393a49;
          display: block;
          width: 100%;
          padding: 4px 0;
          position: relative;
          top: 4px;
          text-align: center;
        }
        .active {
          background: #4377ff;
          color: #fff;
        }
      }
    }
  }
  img {
    width: 170px;
    height: 63px;
    align-self: flex-start;
    margin: 130px 0 110px;
  }
  p {
    height: 190px;
    font-size: 48px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #ffffff;
    line-height: 100px;
    letter-spacing: 1px;
    align-self: flex-start;
    margin: 0 0 160px;
  }
  button {
    margin-bottom: 60px;
    width: 610px;
    height: 88px;
    background: #ffffff;
    border-radius: 44px;
    font-size: 32px;
    font-family: ArialMT;
    color: #4377ff;
    border: none;
    padding: 0;
    outline: none;
  }
  .leadBtn {
    color: #ffffff;
    background: rgba(0, 0, 0, 0);
    border: 3px solid #ffffff;
    box-sizing: border-box;
  }
}
</style>
