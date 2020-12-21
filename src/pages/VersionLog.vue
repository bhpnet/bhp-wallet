<template>
  <div class="versionLog">
    <img @click="clickReturn()" src="../assets/img/return1.png" alt />
    <h2 style="font-weight:bold" v-text="$t('message.text70')">版本日志</h2>
    
    <span class="bate"><span v-text="$t('message.text701')">Beta</span>0.3.0</span>
    <p v-text="$t('message.text112')"></p>
    <p v-text="$t('message.text113')"></p>

    <span class="bate"><span v-text="$t('message.text701')">Beta</span>0.2.1</span>
    <p v-text="$t('message.text109')"></p>
    <p v-text="$t('message.text110')"></p>
    <p v-text="$t('message.text111')"></p>

    <span class="bate"><span v-text="$t('message.text701')">Beta</span>0.2.0</span>
    <p v-text="$t('message.text96')"></p>
    <p v-text="$t('message.text97')"></p>
    <p v-text="$t('message.text98')"></p>

    <span class="bate"><span v-text="$t('message.text701')">Beta</span>0.1.3</span>
    <p v-text="$t('message.text91')"></p>

    <span class="bate"><span v-text="$t('message.text701')">Beta</span>0.1.2</span>
    <p v-text="$t('message.text85')"></p>
    <p v-text="$t('message.text86')"></p>
    <p v-text="$t('message.text87')"></p>
    <p v-text="$t('message.text88')"></p>

    <span class="bate"><span v-text="$t('message.text701')">Beta</span>0.1.1</span>
    <p v-text="$t('message.text71')">Create/manage your B</p>
    <p v-text="$t('message.text72')">Transactions such as money transfers can be made on BHP</p>
    <p v-text="$t('message.text73')">More exciting waiting for you to discover</p>
    
    

    
    
  </div>
</template>

<script>
export default {
  methods: {
    clickReturn() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.versionLog {
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
    margin: 0;
  }
  .bate {
    font-size: 32px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    padding-left: 42px;
    color: #4377ff;
    margin-top:30px;
  }
  p {
    font-size: 28px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #393a49;
    padding-left: 42px;
    line-height: 40px;
    margin: 10px 0;
  }
}
</style>