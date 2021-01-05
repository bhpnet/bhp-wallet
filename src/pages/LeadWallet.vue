<template>
  <div class="leadWallet">
    <div class="loading" v-show="loading">
      <van-loading color="#1989fa" class="loadImg" />
    </div>
    <img @click="clickReturn()" src="../assets/img/return1.png" alt />
    <h2 style="font-weight:bold" v-text="$t('message.text17')">导入钱包</h2>
    <div class="mnemonicSpan">
      <span
        v-show="BHP2Hide"
        :class="spanActive=='leadPrivateKey'?'spanActive':''"
        @click="tabActive('leadPrivateKey')"
        v-text="$t('message.text83')"
      >PrivateKey</span>
      <span
        :class="spanActive=='助记词'?'spanActive':''"
        @click="tabActive('助记词')"
        v-text="$t('message.text18')"
      >助记词</span>
    </div>
    <div class="mnemonicWords" v-show="!WordsOrkeystore">
      <textarea class="tarea" @input="toFocusWords()"  v-model="inputMnemonic" :placeholder="$t('message.text108')"></textarea>
      <input class="passwordInput" ref="hideInputWords" type="password" v-model="inputMnemonic" :placeholder="$t('message.text108')">
    </div>
    <div class="mnemonicWords leadPrivateKey" v-show="WordsOrkeystore">
      <textarea class="tarea" @input="toFocusKey()"  v-model="leadPrivateKey" :placeholder="$route.query.leadWallet=='leadWalletBTC'?$t('message.text84'):$t('message.text844')"></textarea>
      <input class="passwordInput" ref="hideInputKey" type="password" v-model="leadPrivateKey" :placeholder="$route.query.leadWallet=='leadWalletBTC'?$t('message.text84'):$t('message.text844')">
    </div>
    <h3 v-text="$t('message.text82')">Reset wallet name and password</h3>
    <div class="inputName">
      <span class="inputLable" v-text="$t('message.text9')">钱包名称</span>
      <div class="inputDiv">
        <input
          type="text"
          :placeholder="$t('message.text10')"
          @blur="checkName()"
          v-model="inputName"
        />
        <img src="../assets/img/leadName.png" alt />
      </div>
    </div>
    <div class="inputPwd">
      <div class="erorrDiv">
        <span v-show="prompt1" v-text="$t('message.text10')">中文，英文字母和数字及下划线(4-10位)</span>
      </div>
      <span class="inputLable" v-text="$t('message.text11')">密码</span>
      <div class="inputDiv">
        <input
          type="password"
          :placeholder="$t('message.text13')"
          @blur="checkPwd()"
          v-model="inputPwd"
        />
        <img src="../assets/img/leadPass.png" alt />
      </div>
    </div>
    <div class="inputAgainPwd">
      <div class="erorrDiv">
        <span v-show="prompt2" v-text="$t('message.text13')">字符为8~30，包含数字和字母</span>
      </div>

      <span class="inputLable" v-text="$t('message.text14')">确认密码</span>
      <div class="inputDiv">
        <input
          type="password"
          :placeholder="$t('message.text15')"
          @input="checkAgainPwd()"
          v-model="inputAgainPwd"
        />
        <img src="../assets/img/leadPass.png" alt />
      </div>
    </div>
    <div class="erorr">
      <span v-show="prompt3" v-text="$t('message.text61')">两次密码输入不相同</span>
    </div>
    <button @click="toClickNext()" v-text="$t('message.text36')">下一步</button>
  </div>
</template>

<script>
import { clickNext } from "../assets/js/leadWallet";

export default {
  data() {
    return {
      loading: false,
      BHP2Hide: true,
      prompt1: false,
      prompt2: false,
      prompt3: false,
      inputName: "",
      inputPwd: "",
      inputAgainPwd: "",
      spanActive: "助记词",
      leadPrivateKey: "", //私钥
      WordsOrkeystore: false,
      createWalletObj: {},
      accounts: [],
      inputMnemonic: '', //输入框数组
      flag: false, //判断钱包名字是否重复和助记词是否都填写
      flag1: false, //导入时钱包有重名的，确认后直接跳首页，新钱包就去确认导入页面
      msg1:
        "The wallet already exists. If you continue importing, you will overwrite the original wallet. Are you sure you want to continue ?",
      msg2: "Please enter the correct mnemonic",
      msg3: "Please enter 24 mnemonics",
      msg4: "Please enter leadPrivateKey",
      msg5: "leadPrivateKey error!",
    };
  },

  created() {
    
    if (
      this.$route.query.leadWallet == "leadWallet2" ||
      this.$route.query.leadWallet == "leadWalletFIL"
    ) {
      //FIL和2.0没有私钥导入
      this.BHP2Hide = false;
    }
    if (localStorage.getItem("lang") == "cn") {
      this.msg1 =
        "此导入的钱包已存在，确认继续导入吗？会保留新钱包，覆盖原钱包";
      this.msg2 = "请输入正确的助记词";
      this.msg3 = "请输入24个助记词";
      this.msg4 = "请输入 leadPrivateKey";
      this.msg5 = "请输入正确的私钥！";
    } else {
      this.msg1 =
        "The wallet already exists. If you continue importing, you will overwrite the original wallet. Are you sure you want to continue ?";
      this.msg2 = "Please enter the correct mnemonic";
      this.msg3 = "Please enter 24 mnemonics";
      this.msg4 = "Please enter leadPrivateKey";
      this.msg5 = "leadPrivateKey error!";
    
    }
  },
  methods: {
    toFocusWords(){
      this.$refs.hideInputWords.focus()
    },
    toFocusKey(){
      this.$refs.hideInputKey.focus()
    },
    toClickNext() {
      clickNext(this);
    },
    clickReturn() {
      this.$router.go(-1);
    },
    tabActive(val) {
      this.spanActive = val;
      if (val == "助记词") {
        this.WordsOrkeystore = false;
      } else {
        this.WordsOrkeystore = true;
      }
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
      var regstr = /^[0-9a-zA-Z]{8,30}$/;
      if (!regstr.test(this.inputPwd)) {
        this.prompt2 = true;
      } else {
        this.prompt2 = false;
      }
    },
    checkAgainPwd() {
      if (this.inputAgainPwd != this.inputPwd) {
        this.prompt3 = true;
      } else {
        this.prompt3 = false;
      }
    }
  }
};
</script>

<style lang="less" >

.leadWallet {
  position: relative; //安卓用flex，唤起输入法会把页面挤扁
  padding-bottom: 44px;
  
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
  }
  .mnemonicSpan {
    padding-left: 60px;
    span {
      margin-right: 36px;
      color: #5b6785;
      font-size: 32px;
      font-family: Segoe UI;
      font-weight: 400;
      display: inline-block;
      height: 64px;
      padding: 0 10px;
      line-height: 48px;
      border-bottom: none;
    }
    .spanActive {
      font-weight: bold;
      color: #3d7fff;
      border-bottom: 4px solid #3d7fff;
    }
  }
  h3 {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #393a49;
    line-height: 45px;
    letter-spacing: 1px;
    margin: 30px 0;
    padding-left: 40px;
  }
  .mnemonicWords {
    width: 630px;
    height: 428px;
    margin: 0 auto;
    margin-top: 22px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    align-self: center;
    padding: 24px;
    border: 2px solid rgba(234, 236, 239, 1);
    div {
      width: 140px;
      height: 52px;
      background: #e7f1ff;
      font-size: 24px;
      font-family: Segoe UI;
      font-weight: 400;
      input {
        width: 144px;
        height: 52px;
        outline: none;
        border: none;
        padding: 0;
        background: #e7f1ff;
        text-indent: 10px;
        color: #000;
      }
    }
    .tarea {
      width: 100%;
      font-size: 30px;
      height: 100%;
      resize: none;
      outline: none;
      border: none;
      line-height: 30px;
    }
     .passwordInput{
      position: absolute;
      z-index: -1;
      color:transparent;//隐藏光标
      caret-color:transparent;
      text-indent: -999em;//段落缩进IOS
      margin-left: -100%
      // text-shadow: 0 0 0 #000//显示文字;
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
    color: #000;
    padding-left: 42px;
    margin: 0 0 34px;
  }
  .erorr {
    padding: 0 90px;
    color: rgba(38, 75, 171, 1);
    font-size: 22px;
    font-family: Segoe UI;
    font-weight: 400;
    height: 30px;
  }
  button {
    width: 640px;
    height: 88px;
    background: #4377ff;
    border-radius: 44px;
    font-size: 32px;
    font-family: Segoe UI;
    font-weight: bold;
    color: rgba(244, 245, 249, 1);
    align-self: center;
    border: none;
    outline: none;
    padding: 0;
    margin: 0 auto;
    margin-top: 30px;
    display: block;
  }

  .inputName,
  .inputPwd,
  .inputAgainPwd {
    margin: 0 75px;
    border-bottom: 2px solid rgba(234, 236, 239, 1);
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .erorrDiv {
      height: 70px;
    }
    span {
      font-size: 22px;
      font-family: Segoe UI;
      font-weight: 400;

      color: rgba(38, 75, 171, 1);
    }
    .inputLable {
      font-size: 28px;
      color: rgba(1, 6, 19, 1);
    }
    .inputDiv {
      position: relative;
      img {
        width: 31px;
        height: 36px;
        bottom: 10px;
        position: absolute;
        left: 0;
        padding: 0;
      }
      input {
        text-indent: 50px;
        width: 570px;
        height: 52px;
        font-size: 24px;
        border: none;
        outline: none;
        padding: 0;
        padding-top: 12px;
      }
    }

    input::-webkit-input-placeholder {
      color: rgba(162, 168, 183, 1);
    }
    input::-moz-placeholder {
      color: rgba(162, 168, 183, 1);
    }
    input:-moz-placeholder {
      color: rgba(162, 168, 183, 1);
    }
    input:-ms-input-placeholder {
      color: rgba(162, 168, 183, 1);
    }
  }
  .inputName {
    padding-top: 20px;
    height: 110px;
    justify-content: space-between;
    .inputLable {
      margin-top: 0;
    }
  }
}
</style>