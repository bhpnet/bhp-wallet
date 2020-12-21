<template>
  <div class="backUpPrivateKey1">
    <img @click="clickReturn()" src="../assets/img/return1.png" alt />
    <h2 style="font-weight:bold" v-text="$t('message.text80')">导出私钥</h2>
    <p
      class="topPrompt"
      v-text="$t('message.text76')"
    >拥有私钥即拥有您的钱包资产，私钥一旦丢失，将无法找回您的资产，建议使用笔纸正确抄写，并存放至安全的地方。</p>
    <div class="privateKey">{{privateKey}}</div>
    <button
      class="copy"
      v-clipboard="privateKey"
      v-clipboard:success="clipboardSuccessHandler"
      v-clipboard:error="clipboardErrorHandler"
    >
      <span v-text="$t('message.text78')">复制私钥</span>
    </button>
    <button @click="clickNext()" v-text="$t('message.text79')">返回主页</button>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      privateKey: "",
      msg1: "Copy succeeded!",
      msg2: "Copy failed! "
    };
  },
  created() {
    this.privateKey = this.$store.state.privateKey;
    if (localStorage.getItem("lang") == "cn") {
      this.msg1 = "复制成功！";
      this.msg2 = "复制失败！";
      this.msg3 = "导出的私钥格式为WIF";
    } else {
      this.msg1 = "Copy succeeded!";
      this.msg2 = "Copy failed! ";
      this.msg3 = "The exported private key format is WIF";
    }
    if(this.$route.query.exportBTC){
      Toast(this.msg3)
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
    clickNext() {
      this.$router.replace({
        path: "/indexHome/myWallet",
        query: {
          address: "OpenToIndexHome"
        }
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
    margin: 0 0 436px;
  }
  .privateKey {
    width: 568px;
    display: flex;
    align-items: center;
    height: 84px;
    padding:0 38px;
    align-self: center;
    word-break:break-all ;
    background: #f5f8ff;
    border-radius: 36px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #393a49;
    line-height: 32px;
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