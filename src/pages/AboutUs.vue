<template>
  <div class="aboutUs">
    <img @click="clickReturn()" src="../assets/img/return1.png" alt />
    <h2 style="font-weight:bold" v-text="$t('message.text26')">关于我们</h2>
    <img class="logo" src="../assets/img/BHP2Logo.png" alt />
    <ul>
      <li @click="toAgreement()">
        <span v-text="$t('message.text27')">服务协议</span>
        <img src="../assets/img/to.png" alt />
      </li>
      <li @click="toPolicy()">
        <span v-text="$t('message.text28')">隐私政策</span>
        <img src="../assets/img/to.png" alt />
      </li>
      <li @click="toVersionLog()">
        <span v-text="$t('message.text29')">版本日志</span>
        <img src="../assets/img/to.png" alt />
      </li>
      <li>
        <span v-text="$t('message.text30')">当前版本</span>
        <span class="edition">
          <span v-text="$t('message.text701')">Beta</span>1.0.0
        </span>
      </li>
      <li @click="toWebsite()">
        <span v-text="$t('message.text66')">Website官网</span>
        <span class="edition">https://bhpnet.io</span>
      </li>
      <li>
        <span v-text="$t('message.text67')">Email邮箱</span>
        <span class="edition">support@bhpnet.io</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    toWebsite() {
      plus.runtime.openURL("https://bhpnet.io");
    },
    toVersionLog() {
      this.$router.push("/versionLog");
    },
    clickReturn() {
      this.$router.go(-1);
    },
    toAgreement() {
      // if (localStorage.getItem("lang") == "cn") {
      //   this.$router.push("/agreement");
      // } else {
      this.$router.push("/agreementEn");
      // }
    },
    toPolicy() {
      //   if (localStorage.getItem("lang") == "cn") {
      //     this.$router.push("/policy");
      //   } else {
      this.$router.push("/policyEn");
      // }
    }
  }
};
</script>

<style lang="less" scoped>
.aboutUs {
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
  .logo {
    padding: 0;
    margin-top: 26px;
    width: 172px;
    height: 172px;
    margin-bottom: 36px;
    align-self: center;
  }
  ul,
  li {
    list-style: none;
    padding: 0;
  }
  ul {
    width: 100%;

    li {
      height: 128px;
      border-bottom: 2px solid rgba(234, 236, 239, 1);
      margin: 0 73px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 32px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #393a49;
      }
      img {
        width: 50px;
        height: 50px;
        padding: 0;
      }
      .edition {
        font-size: 28px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #4377ff;
        span {
          color: #4377ff;
        }
      }
    }
  }
}
</style>