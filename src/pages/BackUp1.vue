<template>
  <div class="backUp1">
    <img @click="clickReturn()" src="../assets/img/return1.png" alt />
    <h2 style="font-weight: bold" v-text="$t('message.text31')">立即备份</h2>
    <p class="topPrompt" v-text="$t('message.text114')">
      助记词用于恢复或重置钱包钱包密码。垃圾清理、文件误删、卸载BHP
      Wallet都有可能导致您的钱包丢失。
    </p>
    <div class="noScreenshot">
      <img src="../assets/img/noScreenshot.png" alt />
      <span v-text="$t('message.text33')">请勿截图</span>
    </div>
    <p v-text="$t('message.text115')" style="color: #4377ff">
      BHP Wallet不会储存您的助记词，助记词一旦丢失，BHP
      Wallet无法帮您找回。为了您的资产安全，请您务必按照以下操作进行备份：
    </p>
    <p v-text="$t('message.text116')"></p>
    <p v-text="$t('message.text117')"></p>
    <p v-text="$t('message.text118')"></p>
    <div class="btnDiv">
    <div class="btnDiv1">
      <button @click="toBackUp()" v-text="$t('message.text31')">立即备份</button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Wallet will not be created without backup!",
    };
  },
  created() {
    if (localStorage.getItem("lang") == "cn") {
      this.msg = "未完成备份将不会生成钱包!";
    } else {
      this.msg = "Wallet will not be created without backup!";
    }
  },
  methods: {
    clickReturn() {
      if (this.$route.query.backUpBip) {
        this.$router.go(-1);
      } else {
        if (confirm(this.msg)) {
          this.$router.replace("/");
        }
      }
    },
    toBackUp() {
      if (this.$route.query.backUpBip) {
        this.$router.push({
          path: "/backUp2",
          query: {
            backUpBip: "backUpBip",
          },
        });
      } else {
        this.$router.push("/backUp2");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.backUp1 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-bottom: 150px;
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
  .topPrompt,
  .noScreenshot,
  button {
    width: 670px;
    align-self: center;
  }
  .topPrompt {
    font-size: 28px;
    font-family: Segoe UI;
    font-weight: 400;
    line-height: 38px;
    color: rgba(1, 6, 19, 1);
    margin: 0;
  }
  .noScreenshot {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 562px;
    height: 332px;
    border-radius: 15px;
    border: 5px solid #4377ff;
    margin: 60px 0;
    img {
      width: 128px;
      height: 128px;
      padding: 65px 0 30px 0;
    }
    span {
      font-size: 32px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #4377ff;
    }
  }
  p {
    font-size: 28px;
    width: 670px;
    margin: 0 auto;
    margin-top: 20px;
    font-family: Segoe UI;
    font-weight: 400;
    line-height: 38px;
    color: rgba(1, 6, 19, 1);
  }
  .btnDiv {
    width: 100%;
    height: 130px;
    background: #fff;
    position: fixed;
    bottom: 0;
  .btnDiv1 {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
      
    }
    }
  }
}
</style>
