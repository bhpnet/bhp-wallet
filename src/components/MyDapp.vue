<template>
  <div class="myDapp">
    <h2 style="font-weight: bold" v-text="$t('message.text46')">Me</h2>
    <div class="topDiv">
      <div @click="toMyAddress()" class="box">
        <img src="../assets/img/addressList.png" alt />
        <span v-text="$t('message.text47')">Address Book</span>
      </div>
      <div @click="toMywallets()" class="box">
        <img src="../assets/img/manage.png" alt />
        <span v-text="$t('message.text1')">Manage Wallet</span>
      </div>
    </div>
    <ul>
      <li @click="toLanguage()">
        <img src="../assets/img/language.png" alt />
        <span v-text="$t('message.text99')" class="language"> language </span>
      </li>
      <li @click="toAboutUs()">
        <img src="../assets/img/aboutUs.png" alt />
        <span v-text="$t('message.text26')">关于我们</span>
      </li>
      <li @click="toUpdate()">
        <img src="../assets/img/update.png" alt />
        <span v-text="$t('message.text026')">检查更新</span>
      </li>
    </ul>
    <div class="foot">
      <div class="menu">
        <div @click="toMyWallet()" class="myWalletImg">
          <div>
            <img src="../assets/img/wallet1.png" alt />
          </div>
          <span v-text="$t('message.text45')">钱包</span>
        </div>
        <div class="myDappImg">
          <div>
            <img src="../assets/img/my.png" alt />
          </div>
          <span v-text="$t('message.text46')">我的</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "myWallet2",

  data() {
    return {
      tab: "",
      wgtVersion: "1.0.0",
    };
  },
  created() {
    this.tab =
      localStorage.getItem("lang") == undefined
        ? "en"
        : localStorage.getItem("lang");
  },
  methods: {
    toUpdate() {
      // 获取本地应用资源版本号
      let that = this;

      var wgtVersion = Number(this.wgtVersion.replace(/[.]/g, ""));
      axios.get("https://mrpc.bhpnet.io/app/checkVersion.json").then((res) => {
        if (res.data.data) {
          // console.log(
          //   "安装包：" + Number(res.data.data.version.replace(/[.]/g, "")),
          //   "本机版本：" + wgtVersion);
          if (Number(res.data.data.version.replace(/[.]/g, "")) > wgtVersion) {
            location.reload(); //发现新版本，刷新页面
          } else {
            alert("This is the latest version");
          }
        }
      });
    },
    toLanguage() {
      this.$router.push("/selectLang");
    },
    toMyWallet() {
      if (this.$route.query.walletType) {
        this.$router.go(-1);
      } else {
        //否则可能不带参数回首页，比如点了myDapp的钱包管理
        this.$router.replace({
          path: "/indexHome/myWallet",
          query: {
            address: "OpenToIndexHome",
          },
        });
      }
    },

    toMyAddress() {
      this.$router.push("/addressManage");
    },
    toMywallets() {
      this.$router.push("/walletsManage");
    },
    toAboutUs() {
      this.$router.push("/aboutUs");
    },
  },
};
</script>

<style lang="less" scoped>
.myDapp {
  background: #fff;
  height: 100vh;
  h2 {
    font-size: 48px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #000;
    margin: 0 0 47px 40px;
    padding-top: 18px;
  }

  .topDiv {
    padding: 0 38px;
    display: flex;
    justify-content: space-between;
    .box {
      width: 310px;
      height: 177px;
      background: #4377ff;
      box-shadow: 0px 3px 9px 0px rgba(67, 119, 255, 0.4);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 55px;
        margin-bottom: 10px;
      }
      span {
        height: 40px;
        font-size: 28px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 40px;
        letter-spacing: 2px;
      }
    }
  }
  ul {
    list-style: none;
    padding-left: 0;
    margin: 0;

    li {
      list-style: none;
      height: 109px;
      margin: 0 40px;
      border-bottom: 1px solid rgba(234, 236, 239, 1);
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      padding-bottom: 20px;
      img {
        height: 50px;
        margin: 0 24px 0 0;
      }
      span {
        font-size: 32px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #393a49;
        line-height: 55px;
      }
      .language {
        i {
          font-style: normal;
          color: #ccc;
          margin: 0 30px;
        }
        i:first-child {
          margin-left: 0;
        }
        .tab {
          color: rgba(1, 6, 19, 1);
        }
      }
    }
  }
  .myWalletImg,
  .myDappImg {
    padding: 20px;
  }

  .foot {
    height: 104px;
    position: fixed;
    width: 100%;
    border-top: 1px solid rgba(234, 236, 239, 1);
    bottom: 0;
    left: 0;
    z-index: 99;
    background: #fff;
    .menu {
      display: flex;
      padding: 0 146px;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 42px;
          height: 42px;
          margin-bottom: 6px;
        }
        span {
          font-size: 28px;
          font-family: Segoe UI;
          font-weight: 400;
          color: rgba(1, 6, 19, 1);
        }
      }
    }
  }
}
</style>