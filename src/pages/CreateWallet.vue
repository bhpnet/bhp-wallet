<template>
  <div class="createWallet">
    <div class="createWallet1">
      <div class="loading" v-show="loading">
        <van-loading color="#fff" class="loadImg" vertical>{{ msg }}</van-loading>
      </div>
      <img @click="clickReturn()" src="../assets/img/return.png" alt />
      <h2 style="font-weight: bold" v-text="$t('message.text8')">创建钱包</h2>
      <div class="inputName">
        <img src="../assets/img/acc.png" alt />

        <span class="inputLable" v-text="$t('message.text9')">钱包名称</span>
        <input
          type="text"
          :placeholder="$t('message.text10')"
          @blur="checkName()"
          v-model="inputName"
        />
      </div>
      <div class="inputPwd">
        <img src="../assets/img/pass.png" alt />
        <div class="msgDiv">
          <span v-show="prompt1" v-text="$t('message.text10')"
            >中文，英文字母和数字及下划线(4-10位)</span
          >
        </div>
        <span class="inputLable" v-text="$t('message.text11')">密码</span>
        <input
          type="password"
          :placeholder="$t('message.text13')"
          @blur="checkPwd()"
          v-model="inputPwd"
        />
      </div>
      <div class="inputAgainPwd">
        <img src="../assets/img/pass.png" alt />

        <div class="msgDiv">
          <span v-show="prompt2" v-text="$t('message.text13')"
            >字符为8~30，包含数字和字母</span
          >
        </div>

        <span class="inputLable" v-text="$t('message.text14')">确认密码</span>
        <input
          type="password"
          :placeholder="$t('message.text15')"
          @input="checkAgainPwd()"
          v-model="inputAgainPwd"
        />
      </div>
      <div class="erorr">
        <span v-show="prompt3" v-text="$t('message.text61')">两次密码输入不相同</span>
      </div>

      <button @click="toCreateWallet()" v-text="$t('message.text16')">创建钱包</button>
      <div v-text="$t('message.text17')" class="toLead" @click="leadWallet()">
        导入钱包
      </div>
    </div>
  </div>
</template>
<script>
import {
  createWallet1,
  createWallet2,
  createWalletFIL,
  createWalletBTC,
  createWalletETH,
  createMnemonic,
} from "../assets/js/createWallet";
export default {
  data() {
    return {
      loading: false,
      prompt1: false,
      prompt2: false,
      prompt3: false,
      inputName: "",
      inputPwd: "",
      flag: false,
      inputAgainPwd: "",
      phrase: "",
      createWalletObj: {},
      createWalletObjETH: {},
      createWalletObjFIL: {},
      createWalletObjBTC: {},
      msg: "Being created...",
    };
  },
  created() {
    if (localStorage.getItem("lang") == "cn") {
      this.msg = "钱包创建中...";
    } else {
      this.msg = "Being created...";
    }
  },
  methods: {
    async toCreateWallet() {
      if (
        this.inputName &&
        this.inputPwd &&
        this.inputAgainPwd &&
        !this.prompt1 &&
        !this.prompt2 &&
        !this.prompt3
      ) {
        if (!this.flag) {
          this.loading = true;

          if (this.$route.query.createWallet == "createWallet1") {
            let mnemonic = createMnemonic();
            createWallet1(this, mnemonic);
          } else if (this.$route.query.createWallet == "createWallet2") {
          } else if (this.$route.query.createWallet == "createWalletETH") {
            let mnemonic = createMnemonic();

            createWalletETH(this, mnemonic);
          } else if (this.$route.query.createWallet == "createWalletBTC") {
            let mnemonic = createMnemonic();
            createWalletBTC(this, mnemonic);
          } else if (this.$route.query.createWallet == "createWalletFIL") {
          } else if (this.$route.query.createWallet == "createWalletAll") {
            let mnemonic = createMnemonic();
            await createWalletETH(this, mnemonic);
            await createWalletBTC(this, mnemonic);
            await createWallet1(this, mnemonic);
            this.$store.commit("getWalletType", "All");
          }
          this.loading = false;
          this.$router.push("/backUp1");
        }
      } else {
        if (this.inputName.length == 0) {
          this.prompt1 = true;
        }
        if (this.inputPwd.length == 0) {
          this.prompt2 = true;
        }
        if (this.inputAgainPwd.length == 0) {
          this.prompt3 = true;
        }
      }
    },

    clickReturn() {
      this.$router.go(-1);
    },

    leadWallet() {
      this.$router.push("/changeLeadWallet");
    },
    checkName() {
      var regstr = /[\u4e00-\u9fa5_a-zA-Z0-9_]{1,10}/;
      if (!regstr.test(this.inputName)) {
        this.prompt1 = true;
      } else {
        this.prompt1 = false;
      }
    },
    checkPwd() {
      this.prompt3 = true;
      var regstr = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/;
      if (!regstr.test(this.inputPwd)) {
        this.prompt2 = true;
      } else {
        this.prompt2 = false;
      }
      this.checkAgainPwd();
    },
    checkAgainPwd() {
      if (this.inputAgainPwd != this.inputPwd) {
        this.prompt3 = true;
      } else {
        this.prompt3 = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.createWallet {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: url("../assets/img/createBanner.png") no-repeat;
  background-size: cover;
  .createWallet1 {
    position: relative;
    height: 100vh;
    overflow-y: auto;
    .loading {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.1);
      z-index: 999;
      .loadImg {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .van-loading__spinner {
        width: 80px;
        height: 80px;
        margin: 0 auto;
      }
      .van-loading__text {
        color: #fff;
        font-size: 30px;
      }
    }
    img {
      width: 26px;
      height: 46px;
      padding: 46px 0 54px 40px;
    }
    h2 {
      font-size: 48px;
      font-family: Arial-BoldMT, Arial;
      font-weight: normal;
      color: #ffffff;
      padding-left: 42px;
      margin: 0 0 142px;
    }
    .erorr {
      padding: 0 40px;
      color: #fb2904;
      font-size: 22px;
      font-family: Segoe UI;
      font-weight: 400;
      height: 30px;
      margin-left: 40px;
    }
    button {
      width: 640px;
      height: 88px;
      background: #ffffff;
      padding: 0;
      display: block;
      margin: 0 auto;
      border-radius: 44px;
      font-size: 32px;
      font-family: ArialMT;
      color: #4377ff;
      align-self: center;
      border: none;
      outline: none;
      margin-top: 80px;
      margin-bottom: 40px;
    }
    .toLead {
      font-size: 24px;
      font-family: ArialMT;
      color: #ffffff;
      line-height: 28px;
      align-self: center;
      text-decoration: underline;
      text-align: center;
    }

    .inputName,
    .inputPwd,
    .inputAgainPwd {
      padding: 0 45px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      img {
        position: absolute;
        width: 38px;
        height: 44px;
        bottom: 22px;
        left: 98px;
        padding: 0;
      }
      div {
        height: 70px;
      }
      span {
        font-size: 22px;
        font-family: Segoe UI;
        font-weight: 400;
        margin-left: 40px;
        color: #ccc;
      }
      .msgDiv {
        span {
          color: #fb2904;
        }
      }
      .inputLable {
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        padding-bottom: 20px;
      }
      input {
        font-size: 24px;
        border: none;
        outline: none;
        padding: 0;
        width: 660px;
        height: 88px;
        text-indent: 117px;
        color: #fff;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 44px;
      }
      input::-webkit-input-placeholder {
        color: #ccc;
      }
      input::-moz-placeholder {
        color: #ccc;
      }
      input:-moz-placeholder {
        color: #ccc;
      }
      input:-ms-input-placeholder {
        color: #ccc;
      }
    }
    .inputName {
      justify-content: space-between;
      .inputLable {
        margin-top: 0;
      }
    }
  }
}
</style>
