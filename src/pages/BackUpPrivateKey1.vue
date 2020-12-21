<template>
  <div class="backUpPrivateKey1">
    <img @click="clickReturn()" src="../assets/img/return1.png" alt />
    <h2 style="font-weight:bold" v-text="$t('message.text80')">导出私钥</h2>
    <p class="topPrompt" v-text="$t('message.text76')">拥有私钥即拥有您的钱包资产，私钥一旦丢失，将无法找回您的资产，建议使用笔纸正确抄写，并存放至安全的地方。</p>
    <div class="noScreenshot">
      <img src="../assets/img/noScreenshot.png" alt />
      <span v-text="$t('message.text33')">请勿截图</span>
    </div>
    <p v-text="$t('message.text77')">私钥用于恢复或重置钱包密码，为了保障您钱包资产安全，请立即备份您的钱包私钥。</p>

    <button @click="toBackUp()" v-text="$t('message.text81')">导出</button>
  </div>
</template>

<script>
export default {
  methods: {
    clickReturn() {
        this.$router.go(-1);
    },
    toBackUp() {
        this.$router.push({
                path: "/backUpPrivateKey2", //看去钱包主页，还是跳转去详情页面
                query: {
                  exportBTC: this.$route.query.exportBTC,
                },
              });
    }
  }
};
</script>

<style lang="less" scoped>
.backUpPrivateKey1 {
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
    font-family: Segoe UI;
    font-weight: 400;
    line-height: 38px;
    color: rgba(1, 6, 19, 1);
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
  }
}
</style>