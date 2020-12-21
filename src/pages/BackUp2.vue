<template>
  <div class="backUp2">
    <img @click="clickReturn()" src="../assets/img/return1.png" alt />
    <h2 style="font-weight:bold" v-text="$t('message.text35')">备份助记词</h2>
    <p v-text="$t('message.text121')" >BHP Wallet不会储存您的助记词，助记词一旦丢失，BHP Wallet无法帮您找回。</p>
    <p v-text="$t('message.text122')" >请将下面助记词按照顺序抄写在纸上，并妥善保管在安全的地方。</p>

    <div class="mnemonicWords">
      <div v-for="(v,i) of this.list" :key="i">{{v}}</div>
    </div>
    
    <button @click="clickNext()" v-text="$t('message.text36')">下一步</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        //助记词数组
      ]
    };
  },
  created() {
    this.list = this.$store.state.bipList;
  },
  methods: {
    clickReturn() {
      this.$router.go(-1);
    },
    clickNext() {
      if (this.$route.query.backUpBip) {
        this.$router.push({
          path: "/backUp3",
          query: {
            backUpBip: "backUpBip"
          }
        });
      } else {
        this.$router.push("/backUp3");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.backUp2 {
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
  p,
  .mnemonicWords,
  button {
    width: 630px;
    align-self: center;
  }
  p {
    font-size: 28px;
    font-family: Segoe UI;
    font-weight: 400;
    line-height: 36px;
    color: rgba(1, 6, 19, 1);
    margin: 0 0 20px 0;
  }
  .mnemonicWords {
    width: 670px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    align-self: center;
    margin-top:50px;

    div {
      width: 151px;
      height: 72px;
      margin-bottom: 24px;
      background: #e7f1ff;
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #4377ff;
    }
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
    margin-top: 40px;
  }
}
</style>