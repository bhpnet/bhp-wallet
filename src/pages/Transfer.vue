<template>
  <div class="transfer">
    <van-number-keyboard
      :show="show"
      theme="custom"
      extra-key="."
      close-button-text="OK"
      v-model="inputAmount"
      @blur="checkAmount()"
      safe-area-inset-bottom
    />
    <div class="loading" v-show="loading">
      <van-loading color="#1989fa" class="loadImg" vertical>
        <!-- <span
          v-text="$t('message.text74')"
        >转账交易已发起,大约需要15秒,请耐心等待...Transfer transaction has been initiated. It will take about 15 seconds. Please wait patiently</span>-->
      </van-loading>
    </div>
    <div class="topImg">
      <img @click="clickReturn()" src="../assets/img/return1.png" alt />
    </div>

    <h2>
      <span style="font-weight: bold" v-text="$t('message.text50')">转账</span>
      <i>
        <img class="logo" :src="logoImg" alt />
        {{ $route.query.name }}
      </i>
    </h2>
    <div class="selectDiv">
      <select @change="selectChange()" v-show="walletType == 'ETH'" v-model="selectValue">
        <option value="ETH" selected="selected">ETH</option>
        <option v-for="(v, i) of this.selectETHlist" :value="v.name" :key="i">
          {{ v.name }}
        </option>
      </select>
      <i v-show="walletType == 'ETH'"></i>
    </div>
    <div class="inputAddress">
      <div class="inputLable">
        <span v-text="$t('message.text51')">地址</span>
        <div class="rightImg">
          <div class="rightImg1">
            <img @click="toAddressList()" src="../assets/img/address.png" alt />
            <img
              @click="toStartRecognize()"
              clss="secondImg"
              src="../assets/img/transaction3.svg"
              alt
            />
          </div>
        </div>
      </div>
      <input
        type="text"
        :placeholder="$t('message.text51')"
        @blur="checkAddress()"
        v-model="inputAddress"
      />
    </div>
    <div class="inputAmount">
      <div>
        <span v-show="prompt1" v-text="$t('message.text57')">地址不能为空</span>
      </div>
      <span class="inputLable" v-text="$t('message.text52')">付款数量</span>
      <input
        type="text"
        :placeholder="$t('message.text53')"
        readonly="readonly"
        unselectable="on"
        onfocus="this.blur()"
        :value="inputAmount"
        @click="toNumberKeyboard()"
      />
      <span class="BHPspan" v-show="walletType != 'ETH'">{{ bhpmsg.asset }}</span>
    </div>
    <div class="inputRemark">
      <div>
        <span style="color: #31cc31">
          <span style="color: #31cc31" v-text="$t('message.text65')">可用</span>
          {{ amount }} {{ bhpmsg.asset }}
        </span>
        <span v-show="prompt2" v-text="$t('message.text58')">只能为小数或整数</span>
        <span v-show="prompt4" v-text="$t('message.text59')">BHP余额不足</span>
      </div>
      <span class="inputLable" v-text="$t('message.text54')">备注</span>
      <input
        type="text"
        :placeholder="$t('message.text55')"
        @blur="checkRemark()"
        v-model="inputRemark"
      />
    </div>
    <div class="inputCost">
      <div>
        <span v-show="prompt3" v-text="$t('message.text55')">最多可输入50字符</span>
      </div>
      <span class="inputLable" v-text="$t('message.text56')">网络费用</span>
      <span v-if="walletType == 'ETH'" class="cost" @click="costSelectETH()">
        {{ ((gasPrice * gasLimit) / Math.pow(10, 9)).toFixed(6) }} ETH
        <i ref="costI"></i>
      </span>
      <span v-else-if="walletType == 'BTC'" class="cost" @click="costSelectBTC()"
        >{{ (((selcetSatoshi / 1e3) * bytes) / 1e8).toFixed(8) }} BTC<i ref="costI"></i
      ></span>
      <span v-else-if="walletType != 'ETH' && walletType != 'BTC'" class="cost">{{
        bhpmsg.fee
      }}</span>
    </div>
    <div v-show="walletType == 'ETH'" class="fee">
      Gas Price ( {{ gasPrice }} GWEI) * Gas Limit( {{ gasLimit }} )
    </div>
    <div v-show="walletType == 'BTC'" class="fee">
      {{ selcetSatoshi / 1000 }} sat/b * {{ bytes }} bytes
    </div>
    <van-radio-group
      v-show="radioShowBTC"
      @change="selcetRadioBTC()"
      v-model="selcetSatoshiRadio"
    >
      <van-radio :name="Satoshi.high_fee_per_kb">
        <span v-text="$t('message.text102')">快速</span>
        {{ Satoshi.high_fee_per_kb / 1000 }} sat/b
        <span class="timer">
          ≈ 30
          <span v-text="$t('message.text106')">分钟</span>
        </span>
      </van-radio>
      <van-radio :name="Satoshi.medium_fee_per_kb">
        <span v-text="$t('message.text103')">一般</span>
        {{ Satoshi.medium_fee_per_kb / 1000 }} sat/b
        <span class="timer">
          ≈ 60
          <span v-text="$t('message.text106')">分钟</span>
        </span>
      </van-radio>
      <van-radio checked :name="Satoshi.low_fee_per_kb">
        <span v-text="$t('message.text104')"> 缓慢</span>
        {{ Satoshi.low_fee_per_kb / 1000 }} sat/b
        <span class="timer">
          > 60
          <span v-text="$t('message.text106')">分钟</span>
        </span>
      </van-radio>
      <van-radio :name="10000">
        <span v-text="$t('message.text105')">自定义</span>
      </van-radio>
    </van-radio-group>
    <van-radio-group v-show="radioShow" v-model="gasLimitRadio" @change="selcetRadio()">
      <van-radio :name="transferSpeed.fastest">
        <span v-text="$t('message.text101')">最快</span>
        {{ transferSpeed.fastest }}GWEI
        <span class="timer">
          ＜0.5
          <span v-text="$t('message.text106')">分钟</span>
        </span>
      </van-radio>
      <van-radio :name="transferSpeed.fast">
        <span v-text="$t('message.text102')">快速</span>
        {{ transferSpeed.fast }}GWEI
        <span class="timer">
          ＜2
          <span v-text="$t('message.text106')">分钟</span>
        </span>
      </van-radio>
      <van-radio checked :name="transferSpeed.standard">
        <span v-text="$t('message.text103')">一般</span>
        {{ transferSpeed.standard }}GWEI
        <span class="timer">
          ＜5
          <span v-text="$t('message.text106')">分钟</span>
        </span>
      </van-radio>
      <van-radio :name="transferSpeed.safeLow">
        <span v-text="$t('message.text104')">缓慢</span>
        {{ transferSpeed.safeLow }}GWEI
        <span class="timer">
          ＜30
          <span v-text="$t('message.text106')">分钟</span>
        </span>
      </van-radio>
      <van-radio :name="10">
        <span v-text="$t('message.text105')">自定义</span>
      </van-radio>
    </van-radio-group>
    <div class="gasInput" v-show="radioInputShowBTC">
      <p>sat/b</p>
      <input type="text" v-model="satoshiCustom" @input="inputsatoshiCustom()" />
    </div>

    <div class="gasInput" v-show="radioInputShow">
      <p>Gas Price</p>
      <input type="text" v-model="gasPriceCustom" @input="inputGasPrice()" />
      <p>
        Gas Limit
        <span v-show="lastLowShow" class="lastLow" v-text="$t('message.text107')"
          >*gasLimit费用不能低于21000</span
        >
      </p>

      <input type="text" @input="inputLimit()" v-model="gasLimitCustom" />
    </div>

    <button @click="clickNext()" v-text="$t('message.text36')">下一步</button>

    <van-popup class="popupPWD" v-model="show1">
      <span v-text="$t('message.text11')">密码</span>
      <input type="password" :placeholder="$t('message.text3')" v-model="password" />

      <div class="bottomDiv">
        <span @click="show1 = false" v-text="$t('message.text69')">Cancel</span>
        <span @click="surePWD()" v-text="$t('message.text68')">OK</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
const Bhpnet = require("bhp-js-sdk");
const ethers = require("ethers");

const bhp2_validateaddress = (address, hrp) => {
  const DECODED_ADDRESS_LEN = 20;
  try {
    if (!address.startsWith(hrp)) {
      return false;
    }
    const decodedAddress = _bech32.decode(address);
    const decodedAddressLength = Buffer.from(_bech32.fromWords(decodedAddress.words))
      .length;
    if (decodedAddressLength === DECODED_ADDRESS_LEN && decodedAddress.prefix === hrp) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};
const Bhp = require("../assets/js/bhp-js/bhp-browser");
import {
  bhp_getBalance,
  bhp_sendTransaction,
  bhp_validateaddress,
  bhp2_getBalance,
  bhp2_sendTransaction,
  eth_getBalance,
  eth_sign,
  eth_sendTransaction,
  eth_getGasPrice,
  fil_validateaddress,
  btc_getBalance,
  btc_sendTransaction,
  btc_getSatoshis,
  btc_validateaddress
} from "../api/api";
import Utils from "../assets/js/utils.js";
import { Toast, DropdownMenu, DropdownItem, RadioGroup, Radio } from "vant";
const _bech32 = require("bech32");

import BigNumber from "bigNumber";
const Web3 = require("web3");
const Tx = require("ethereumjs-tx");
const Bitcoin = require("bitcoinjs-lib");
const network = Bitcoin.networks.bitcoin;
export default {
  data() {
    return {
      show: false,
      radioShow: false,
      radioShowBTC: false,
      radioInputShow: false,
      radioInputShowBTC: false,
      lastLowShow: false,
      selectETHlist: [],
      selectValue: "ETH",
      contractAbi: [
        {
          constant: true,
          inputs: [],
          name: "mintingFinished",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "name",
          outputs: [{ name: "", type: "string" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_spender", type: "address" },
            { name: "_value", type: "uint256" },
          ],
          name: "approve",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "totalSupply",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_from", type: "address" },
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
          ],
          name: "transferFrom",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [{ name: "", type: "uint8" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "cap",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "unpause",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_to", type: "address" },
            { name: "_amount", type: "uint256" },
          ],
          name: "mint",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "_value", type: "uint256" }],
          name: "burn",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "paused",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_spender", type: "address" },
            { name: "_subtractedValue", type: "uint256" },
          ],
          name: "decreaseApproval",
          outputs: [{ name: "success", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "finishMinting",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [],
          name: "pause",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "owner",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "symbol",
          outputs: [{ name: "", type: "string" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
          ],
          name: "transfer",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_spender", type: "address" },
            { name: "_addedValue", type: "uint256" },
          ],
          name: "increaseApproval",
          outputs: [{ name: "success", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            { name: "_owner", type: "address" },
            { name: "_spender", type: "address" },
          ],
          name: "allowance",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [{ name: "newOwner", type: "address" }],
          name: "transferOwnership",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "burner", type: "address" },
            { indexed: false, name: "value", type: "uint256" },
          ],
          name: "Burn",
          type: "event",
        },
        { anonymous: false, inputs: [], name: "Pause", type: "event" },
        { anonymous: false, inputs: [], name: "Unpause", type: "event" },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "to", type: "address" },
            { indexed: false, name: "amount", type: "uint256" },
          ],
          name: "Mint",
          type: "event",
        },
        { anonymous: false, inputs: [], name: "MintFinished", type: "event" },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "owner", type: "address" },
            { indexed: true, name: "spender", type: "address" },
            { indexed: false, name: "value", type: "uint256" },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "from", type: "address" },
            { indexed: true, name: "to", type: "address" },
            { indexed: false, name: "value", type: "uint256" },
          ],
          name: "Transfer",
          type: "event",
        },
      ],
      bhpmsg: {
        fee: "0.0001 BHP",
        asset: "BHP",
      },
      transferSpeed: "",

      btcFee: 0,
      bytes: "",
      Satoshi: "",
      selcetSatoshi: "", //btc设置的速率
      selcetSatoshiRadio: "", //选择框的value
      satoshiCustom: 10, //btc自定义速率
      gasPrice: "",
      gasLimit: 21000,
      gasPriceCustom: 10,
      gasLimitCustom: 21000,
      gasLimitRadio: "", //eth选择框的value
      logoImg: "",
      account_number: "",
      sequence: "",
      loading: false,
      prompt1: false,
      prompt2: false,
      prompt3: false,
      prompt4: false,
      localAddress: "",
      inputAddress: "",
      inputAmount: "",
      inputRemark: "",
      inputCost: "",
      show1: false,
      walletType: "",
      password: "",
      allWalletList: [],
      allWalletList2: [],
      allWalletListETH: [],
      allWalletListFIL: [],
      allWalletListBTC: [],
      amount: 0,
      unspent: [],
      txrefs: [],
      allAmount: 0, //BTCUTXO总额
      txHex: "",
      inputs: [],
      _privateKey: "",
      privateKey: "",
      phrase: "",
      msg: "No Network!",
      msg1: "Transfer initiated",
      msg2: "Password error!",
      msg3: "Please enter the correct address!",
      msg4: "Transaction error!",
      img: require("../assets/img/open.png"),
    };
  },
  async created() {
    localStorage.getItem("lang") == undefined ? "en" : localStorage.getItem("lang");
    if (localStorage.getItem("lang") == "cn") {
      this.msg = "暂无网络！";
      this.msg1 = "转账已发起";
      this.msg2 = "密码错误！";
      this.msg3 = "请输入正确的地址！";
      this.msg4 = "交易错误！";
    } else {
      this.msg = "No Network!";
      this.msg1 = "Transfer initiated";
      this.msg2 = "Password error!";
      this.msg3 = "Please enter the correct address!";
      this.msg4 = "Transaction error!";
    }
    if (!navigator.onLine) {
      Toast.fail(this.msg);
    }
    if (this.$route.query.toAddress) {
      this.inputAddress = this.$route.query.toAddress;
    }
    this.selectETHlist = JSON.parse(localStorage.getItem("selectETHlist"));
    this.allWalletList = JSON.parse(localStorage.getItem("accounts"));
    this.allWalletList2 = JSON.parse(localStorage.getItem("accounts2"));
    this.allWalletListETH = JSON.parse(localStorage.getItem("accountsETH"));
    this.allWalletListFIL = JSON.parse(localStorage.getItem("accountsFIL"));
    this.allWalletListBTC = JSON.parse(localStorage.getItem("accountsBTC"));

    if (this.$route.query.address1) {
      this.logoImg = require("../assets/img/logoBhp1Mini.png");
      this.walletType = "BHP";
      this.bhpmsg = {
        fee: "0.0001 BHP",
        asset: "BHP",
      };
      this.localAddress = this.$route.query.address1;
      for (let i in this.allWalletList) {
        if (this.localAddress == this.allWalletList[i].address) {
          this.privateKey = this.allWalletList[i].privateKey;
        }
      }
      this.asset(this.localAddress);
    } else if (this.$route.query.address2) {
      this.logoImg = require("../assets/img/BHP2sider.png");

      this.walletType = "BHP2";

      this.bhpmsg = {
        fee: "0.006 BHP",
        asset: "BHP",
      };
      this.localAddress = this.$route.query.address2;
      for (let i in this.allWalletList2) {
        if (this.localAddress == this.allWalletList2[i].address) {
          this.privateKey = this.allWalletList2[i].privateKey;
        }
      }
      this.asset2(this.localAddress);
    } else if (this.$route.query.addressFIL) {
      this.logoImg = require("../assets/img/FIL.png");
      this.walletType = "FIL";
      this.bhpmsg = {
        fee: "0.001 FIL",
        asset: "FIL",
      };
      this.localAddress = this.$route.query.addressFIL;
      for (let i in this.allWalletListFIL) {
        if (this.localAddress == this.allWalletListFIL[i].address) {
          this.privateKey = this.allWalletListFIL[i].privateKey;
          this.phrase = this.allWalletListFIL[i].phrase;
        }
      }
      this.assetFIL(this.localAddress);
    } else if (this.$route.query.addressBTC) {
      this.logoImg = require("../assets/img/BTC.png");
      this.walletType = "BTC";
      this.bhpmsg = {
        fee: "0.0001 BTC",
        asset: "BTC",
      };
      this.localAddress = this.$route.query.addressBTC;
      btc_getSatoshis().then((res) => {
        if (res.data) {
          this.Satoshi = res.data;

          this.selcetSatoshiRadio = this.Satoshi.medium_fee_per_kb;
          this.btcFee = (this.bytes * this.selcetSatoshi) / 1e11;
        }
      });
      for (let i in this.allWalletListBTC) {
        if (this.localAddress == this.allWalletListBTC[i].address) {
          this.privateKey = this.allWalletListBTC[i].privateKey;
          this.phrase = this.allWalletListBTC[i].phrase;
        }
      }
      this.assetBTC(this.localAddress);
    } else if (this.$route.query.addressETH) {
      this.logoImg = require("../assets/img/ETCsider.png");
      this.walletType = "ETH";
      this.bhpmsg = {
        fee: "0.0021 ETH",
        asset: "ETH",
      };

      //获取ETH gasPrice
      eth_getGasPrice().then((res) => {
        if (res.data) {
          this.transferSpeed = res.data;
          this.gasLimitRadio = this.transferSpeed.standard;
        }
      });
      this.localAddress = this.$route.query.addressETH;

      for (let i in this.allWalletListETH) {
        if (this.localAddress == this.allWalletListETH[i].address) {
          this.privateKey = this.allWalletListETH[i].privateKey;
        }
      }
      this.assetETH(this.localAddress);
    }
  },
  methods: {
    toNumberKeyboard() {
      this.show = true;
    },
    inputLimit() {
      this.gasLimit = this.gasLimitCustom;
      if (this.gasLimitCustom < 21000) {
        this.lastLowShow = true;
      } else {
        this.lastLowShow = false;
      }
    },
    costSelectETH() {
      this.radioShow = !this.radioShow;
      if (this.radioShow) {
        this.img = require("../assets/img/open.png");
      } else {
        this.img = require("../assets/img/close.png");
      }

      this.$refs.costI.style.backgroundImage = "url(" + this.img + ")";
      this.$refs.costI.style.backgroundSize = "cover";
    },
    costSelectBTC() {
      this.radioShowBTC = !this.radioShowBTC;
      if (this.radioShowBTC) {
        this.img = require("../assets/img/open.png");
      } else {
        this.img = require("../assets/img/close.png");
      }

      this.$refs.costI.style.backgroundImage = "url(" + this.img + ")";
      this.$refs.costI.style.backgroundSize = "cover";
    },
    selcetRadio() {
      //进入页面就会触发，赋值

      this.gasPriceCustom = 10;
      this.gasLimitCustom = 21000;
      this.lastLowShow = false;
      if (this.gasLimitRadio != "10") {
        this.gasPrice = this.gasLimitRadio;
        this.radioInputShow = false;
      } else {
        this.gasPrice = this.gasPriceCustom;
        this.radioInputShow = true;
      }
    },
    selcetRadioBTC() {
      this.selcetSatoshi = this.selcetSatoshiRadio;

      // //进入页面就会触发，赋值
      // this.satoshiCustom = 10000;
      if (this.selcetSatoshiRadio != "10000") {
        this.radioInputShowBTC = false;
      } else {
        this.selcetSatoshi = this.satoshiCustom * 1000;
        this.radioInputShowBTC = true;
      }
    },
    inputsatoshiCustom() {
      this.selcetSatoshi = this.satoshiCustom * 1000;
    },
    inputGasPrice() {
      this.gasPrice = this.gasPriceCustom;
    },
    async selectChange() {
      if (this.selectValue == "ETH") {
        this.assetETH(this.localAddress);
        this.bhpmsg.asset = "ETH";
        this.gasLimit = 21000;
      } else {
        this.gasLimit = 60000;
        let web3;
        if (typeof web3 !== "undefined") {
          web3 = await new Web3(web3.currentProvider);
        } else {
          web3 = await new Web3(
            new Web3.providers.HttpProvider(
              "https://mrpc.bhpnet.io/eth"
            )
          );
        }
        let that = this;
        for (let i in that.selectETHlist) {
          if (that.selectETHlist[i].name == that.selectValue) {
            let myContract = new web3.eth.Contract(
              that.contractAbi,
              that.selectETHlist[i].address
            );
            await myContract.methods
              .balanceOf(that.localAddress)
              .call({ from: that.localAddress }, function (error, result) {
                if (!error) {
                  that.amount = parseFloat(
                    result / Math.pow(10, that.selectETHlist[i].decimals)
                  ).toFixed(4);
                  that.bhpmsg.asset = that.selectETHlist[i].name;
                } else {
                }
              });
          }
        }
      }
    },
    changeWalletsBox(val) {
      this.walletType = val;
    },

    //获取FIL资产
    async assetFIL() {
      const { HttpJsonRpcConnector, HttpJsonRpcWalletProvider } = require("filecoin.js");
      const connector = new HttpJsonRpcConnector({
        url: "https://mrpc.bhpnet.io/fil/rpc/v0",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.fzpHtg9VFX1K8s5vbyrHpGoWYEcJESybHziADoLw5Wc",
      });
      //查询资产
      let rpc = new HttpJsonRpcWalletProvider(connector);
      let res = await rpc.getBalance(this.localAddress);
      if (res) {
        this.amount = parseFloat(res / Math.pow(10, 18)).toFixed(4);
      } else {
        this.amount = 0;
      }
    },
    //获取BTC资产
    assetBTC(address) {
      btc_getBalance(address).then((res) => {
        if (res.data.txrefs) {
          this.txrefs = res.data.txrefs;
          this.bytes = this.txrefs.length * 148 + 2 * 34 + 10;
          this.amount = 0;
          for (let i in this.txrefs) {
            this.amount += this.txrefs[i].value;
          }
          this.amount = parseFloat(this.amount / Math.pow(10, 8)).toFixed(8);
          this.txrefs = res.data.txrefs || [];
          if (this.amount == 0) {
            this.amount = 0;
          }
        } else {
          this.amount = 0;
          this.bytes = 0;
        }
      });
    },
    //获取以太坊资产
    assetETH(address) {
      eth_getBalance(address).then((res) => {
        if (res.data.result) {
          this.amount = (parseInt(res.data.result, 16) / Math.pow(10, 18)).toFixed(4);
        } else {
          this.amount = 0;
        }
      });
    },
    //查询BHP余额和UTXO
    asset(address) {
      bhp_getBalance(address).then((res) => {
        if (res.data.result) {
          this.amount = parseFloat(res.data.result.balance[0].amount).toFixed(4);
          this.unspent = res.data.result.balance[0].unspent;
        }
      });
    },
    //查询BHP2.0
    asset2(address) {
      bhp2_getBalance(address).then((res) => {
        if (res.data.result.value.coins.length > 0) {
          this.amount = (
            parseFloat(res.data.result.value.coins[0].amount) / 100000000
          ).toFixed(4);
          this.account_number = res.data.result.value.account_number;
          this.sequence = res.data.result.value.sequence;
        }
      });
    },

    MakeTransaction1() {
      var that = this;
      let privateKey = Utils.decryptContent(this.privateKey, this.password);
     
        for (let i in this.unspent) {
          var input = {
            //交易输入
            prevHash: this.unspent[i].txid, //交易ID
            prevIndex: this.unspent[i].n, //UTXO索引
            assetId: "13f76fabfe19f3ec7fd54d63179a156bafc44afc53a7f07a7a15f6724c0aa854", //资产ID 这里是BHP资产对应的ID号
            value: this.unspent[i].value, //UTXO金额
            address: this.localAddress, //UTXO所属地址
          };
          this.inputs.push(input);
        }
        var config = {
          inputs: this.inputs, //交易输入
          assetId: "13f76fabfe19f3ec7fd54d63179a156bafc44afc53a7f07a7a15f6724c0aa854", //转账资产ID
          toAddress: this.inputAddress, //转账目标地址
          value: parseFloat(this.inputAmount), //转账金额
          changeAddress: this.localAddress, //转账找零地址
          bhpFeeAddress: this.localAddress, //转代币时收取手续费的地址，暂时未收取手续费，可忽略
          priKeys: [privateKey], //所有输入地址的私钥，用于交易签名，未传入私钥则返回未签名的交易数据
        };
        that.loading = true;

        config = Bhp.api.makeTransaction(config);
        this.txHex = config.txHex;
        bhp_sendTransaction(this.txHex)
          .then((res) => {
            // setTimeout(() => {
            that.loading = false;
            Toast.success(that.msg1);

            that.$router.replace({
              path: "/transferRecords1", //看去钱包主页，还是跳转去详情页面
              query: {
                address1: that.$route.query.address1,
              },
            });
            // }, 15000);
          })
          .catch((err) => {
            Toast.fail(this.msg4);
            this.password = "";
            this.loading = false;
          });
      this.password = "";
    },
    //BTC转账
    MakeTransactionBTC() {
      let privateKey = Utils.decryptContent(this.privateKey, this.password);

        var previousTransaction = {
          tx: [],
        };
        this.allAmount = 0;
        for (let i in this.txrefs) {
          var input = {
            txid: this.txrefs[i].tx_hash,
            amount: this.txrefs[i].value,
            vout: this.txrefs[i].tx_output_n,
          };
          previousTransaction.tx.push(input); //全部零钱UTXO
          this.allAmount += input.amount;
        }
        // console.log(this.allAmount);

        let stx = this.buildTransaction(
          previousTransaction,
          parseFloat(this.inputAmount),
          this.inputAddress,
          privateKey
        );
        // console.log(stx);
        let that = this;
        that.loading = true;

        // BTC广播交易========================================
        btc_sendTransaction(stx)
          .then((res) => {
            // setTimeout(() => {
            that.loading = false;
            Toast.success(that.msg1);

            that.$router.replace({
              path: "/transferRecords1", //看去钱包主页，还是跳转去详情页面
              query: {
                addressBTC: that.$route.query.addressBTC,
              },
            });
            // }, 15000);
          })
          .catch((err) => {
            Toast.fail(this.msg4);
            this.password = "";
            this.loading = false;
          });
      this.password = "";
    },
    btcToSatoshi(btcAmount) {
      return btcAmount * 1e8;
    },
    //BTC发送交易
    buildTransaction(previousTransaction, amount, toAddress, privateKey) {
      const tx = new Bitcoin.TransactionBuilder(network);
      // 弃用警告：TransactionBuilder将在将来删除。 （v6.x.x或更高版本），请改用Psbt类。用法示例可在我们的Github上的transaction-psbt.js集成测试文件中找到。 psbt.ts和psbt.js文件中也提供了高级解释
      // TransactionBuilder签名方法参数将在v6中更改，请使用TxbSignArg接口
      const amountSatoshis = parseInt(this.btcToSatoshi(amount)); //转账出去的钱
      const balanceSatoshis = this.allAmount; //总资产
      const feeSatoshis = this.btcToSatoshi(
        (((this.selcetSatoshi / 1e3) * this.bytes) / 1e8).toFixed(8)
      ); //手续费
      const fromAddress = this.localAddress; //找零地址
      const change = balanceSatoshis - feeSatoshis - amountSatoshis; //找零回来的钱
      // console.log(balanceSatoshis, feeSatoshis, amountSatoshis, change);
      const wallet = Bitcoin.ECPair.fromWIF(privateKey, network);
      const pubKey = wallet.publicKey;
      const p2sh = Bitcoin.payments.p2sh({
        redeem: Bitcoin.payments.p2wpkh({
          pubkey: pubKey,
          network: network,
        }),
        network: network,
      });
      for (let i in this.txrefs) {
        tx.addInput(previousTransaction.tx[i].txid, previousTransaction.tx[i].vout);
      }

      tx.addOutput(fromAddress, change);
      tx.addOutput(toAddress, amountSatoshis);

      for (let i in this.txrefs) {
        tx.sign(
          parseInt(i),
          wallet,
          p2sh.redeem.output,
          null,
          previousTransaction.tx[i].amount
        );
      }
      return tx.build().toHex();
    },
    //FIL转账
    async MakeTransactionFIL() {
      const { MnemonicWalletProvider, HttpJsonRpcConnector } = require("filecoin.js");

      let phrase = Utils.decryptContent(this.phrase, this.password);
      
        const connector = new HttpJsonRpcConnector({
          url: "https://mrpc.bhpnet.io/fil/rpc/v0",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.fzpHtg9VFX1K8s5vbyrHpGoWYEcJESybHziADoLw5Wc",
        });
        const hdWalletMnemonic = phrase;
        const hdWalletPassword = "";
        const hdDerivationPath = `m/44'/461'/0'/0/0`;
        const walletProvider = new MnemonicWalletProvider(
          connector,
          hdWalletMnemonic,
          hdWalletPassword,
          hdDerivationPath
        );
        const message = await walletProvider.createMessage({
          From: this.localAddress,
          // To: "f3v23xwqycr7myhmu7ccfdreqssqozb2zxzatffkv7cdmtpoaobbfc5vi74e7mzc4jlxvvzzj5cuemzyqedsxq",
          To: this.inputAddress,
          Value: new BigNumber((this.inputAmount * Math.pow(10, 18)).toString()),
        });
        let that = this;
        let signMessage = await walletProvider.signMessage(message);
        that.loading = true;

        const msgCid = await walletProvider
          .sendSignedMessage(signMessage)
          .then((res) => {
            that.loading = false;

            if (res["/"]) {
              Toast.success(that.msg1);
              that.$router.replace({
                path: "/transferRecords1",
                query: {
                  addressFIL: that.$route.query.addressFIL,
                },
              });
            }
          })
          .catch((err) => {
            Toast.fail(this.msg4);
            this.password = "";
            this.loading = false;
          });
      this.password = "";

    },
    //2.0转账
    MakeTransaction2() {
      var that = this;
      let crypto = Bhpnet.getCrypto("cosmos");
      let fees = { denom: "abhp", amount: 600000 };
      let gas = 200000;

      let privateKey = Utils.decryptContent(this.privateKey, this.password);

        let builder = Bhpnet.getBuilder("cosmos");
        let tx = {
          chain_id: "testing",
          from: this.localAddress,
          account_number: this.account_number,
          sequence: this.sequence,
          fees: fees,
          gas: gas,
          type: Bhpnet.config.cosmos.tx.transfer.type,
          //mode: Bhpnet.config.iris.mode.try,
          memo: this.inputRemark,
          msg: {
            to: this.inputAddress,
            coins: [
              {
                denom: "abhp",
                amount: parseFloat(this.inputAmount * 100000000),
              },
            ],
          },
        };
        this.loading = true;
        let stdTx = builder.buildAndSignTx(tx, privateKey);
        bhp2_sendTransaction(JSON.stringify(stdTx.GetData()))
          .then((res) => {
            // setTimeout(() => {
            that.loading = false;
            Toast.success(that.msg1);
            that.$router.replace({
              path: "/transferRecords1",
              query: {
                address2: that.$route.query.address2,
              },
            });
            // }, 15000);
          })
          .catch((err) => {
            Toast.fail(this.msg4);
            this.password = "";
            this.loading = false;
          });
      this.password = "";
    },
    //ETH转账
    async MakeTransactionETH() {
      var that = this;
      let flog = true;

      try {
        // 在this.MakeTransactionETH()调用外写也要报错，要在这里写try
        var privateKey = Utils.decryptContent(this.privateKey, this.password);
      } catch (err) {
        Toast.fail(this.msg2);
        this.password = "";
        flog = false;
      }
      if (flog) {
          that.loading = true;
          if (that.selectValue == "ETH") {
            let wallet = new ethers.Wallet(privateKey); //用私钥导入的没有助记词
            var provider = new ethers.providers.JsonRpcProvider(
              "https://mrpc.bhpnet.io/eth"
            );

            let num = parseFloat(this.inputAmount * 1000000000000000000);
            var activeWallet = wallet.connect(provider);
            activeWallet
              .sendTransaction({
                to: this.inputAddress,
                value: "0x" + num.toString(16),
                gasPrice: "0x" + (that.gasLimit * 1000000).toString(16),
                gasLimit: that.gasLimit,
              })
              .then(function (tx) {
                that.loading = false;

                // setTimeout(()=>{
                Toast.success(that.msg1);
                that.$router.replace({
                  path: "/transferRecords1",
                  query: {
                    addressETH: that.$route.query.addressETH,
                  },
                });
                // }, 15000);
              })
              .catch((err) => {
                that.loading = false;
                Toast.fail(that.msg4);
                that.password = "";
              });
          } else {
            for (let i in that.selectETHlist) {
              if (that.selectValue == that.selectETHlist[i].name) {
                await that.transfer(
                  that.localAddress,
                  that.inputAddress,
                  that.inputAmount,
                  privateKey.substr(2),
                  that.selectETHlist[i].address, //合约地址
                  that.selectETHlist[i].decimals //合约资产精度
                );
              }
            }
          }
        this.password = "";
      }
    },
    //ETH代币转账: 发送人地址 接受人地址 金额 当前账户私钥,代币合约地址
    async transfer(
      fromAddress,
      toAddress,
      balance,
      privateKey,
      contractAddress,
      decimals
    ) {
      let web3;
      if (typeof web3 !== "undefined") {
        web3 = await new Web3(web3.currentProvider);
      } else {
        web3 = await new Web3(
          new Web3.providers.HttpProvider(
            "https://mrpc.bhpnet.io/eth"
          )
        );
      }
      // 定义合约
      let that = this;
      let myContract = new web3.eth.Contract(that.contractAbi, contractAddress);
      // ethGasLimit
      await web3.eth
        .getTransactionCount(fromAddress, web3.eth.defaultBlock.pending)
        .then(function (nonce) {
          // console.log("\n当前账户" + fromAddress + "转账" + balance + "给" + toAddress);
          const Ether = Math.pow(10, parseInt(decimals)); //==================================================

          let balanceEth = new BigNumber(parseFloat(balance) * Ether); //转换成ETH的最小单位数量
          //代币转账
          // data的组成，由：0x + 要调用的合约方法的function signature + 要传递的方法参数，每个参数都为64位(对transfer来说，第一个是接收人的地址去掉0x，第二个是代币数量的16进制表示，去掉前面0x，然后补齐为64位)
          let data =
            "0x" +
            "a9059cbb" +
            that.addPreZero(toAddress.substr(2)) +
            that.addPreZero(web3.utils.toHex(balanceEth).substr(2));
          let rawTx = {
            nonce: web3.utils.toHex(nonce++),
            gasLimit: web3.utils.toHex(that.gasLimit),
            gasPrice: web3.utils.toHex(1e9) * that.gasPrice, //web3.utils.toHex(1e9) = 1 GWEI = 0.000000001 ETH //一般可调节
            // 注意这里是代币合约地址
            to: contractAddress,
            from: fromAddress,
            // 调用合约转账value这里留空
            value: "0x00",
            // data的组成，由：0x + 要调用的合约方法的function signature + 要传递的方法参数，每个参数都为64位(对transfer来说，第一个是接收人的地址去掉0x，第二个是代币数量的16进制表示，去掉前面0x，然后补齐为64位)
            data: data,
          };

          let tx = new Tx(rawTx);
          let keyBuf = Buffer.from(privateKey, "hex");
          //对交易进行签名
          tx.sign(keyBuf);
          // if (tx.verifySignature()) {
          //   console.log("Signature 检测成功!");
          // }
          let serializedTx = tx.serialize().toString("hex");
          that.loading = true;

          web3.eth.sendSignedTransaction(
            "0x" + serializedTx.toString("hex"),
            function (err, transactionHash) {
              // console.log("转账金额(小单位)：" + balanceEth);
              if (!err) {
                // console.log("\n 交易hash：" + transactionHash);
                that.loading = false;

                Toast.success(that.msg1);
                that.$router.replace({
                  path: "/transferRecords1",
                  query: {
                    addressETH: that.$route.query.addressETH,
                  },
                });
              } else {
                that.loading = false;
                Toast.fail(err);
              }
            }
          );
        })
        .catch((err) => {
          Toast.fail(that.msg4);
          that.password = "";
          that.loading = false;
        });
    },
    // 补齐64位，不够前面用0补齐
    addPreZero(num) {
      let t = (num + "").length,
        s = "";
      for (let i = 0; i < 64 - t; i++) {
        s += "0";
      }
      return s + num;
    },
    createWallet() {
      this.$router.push("/changeCreateWallet");
    },
    leadWallet() {
      this.$router.push("/changeLeadWallet");
    },
    async surePWD() {
      this.show1 = false;
      if (this.$route.query.address1) {
        bhp_validateaddress(this.inputAddress).then((res) => {
          //1.0地址输错，转账方法不会报错，就先校验地址。2.0输错地址，方法会报错，除了密码错误，就只会是地址错误
          // console.log(res.data.result.isvalid);
          if (res.data.result.isvalid) {
            try {
              //解密密码输出会报错
              //1.0转账方法
              this.MakeTransaction1();
            } catch (err) {
              this.loading = false;
              Toast.fail(this.msg2);
              this.password = "";
            }
          } else {
            Toast.fail(this.msg3);
          }
        });
      } else if (this.$route.query.addressFIL) {
        fil_validateaddress(this.inputAddress).then((res) => {
          //验证地址是否正确
          if (res.data.result) {
            try {
              //FIL转账方法
              this.MakeTransactionFIL();
            } catch (err) {
              this.loading = false;
              Toast.fail(this.msg2);
              this.password = "";
            }
          } else {
            Toast.fail(this.msg3);
          }
        });
      } else if (this.$route.query.address2) {
        if (bhp2_validateaddress(this.inputAddress, "bhp")) {
          try {
            //2.0转账方法
            this.MakeTransaction2();
          } catch (err) {
            this.loading = false;
            Toast.fail(this.msg2);
            this.password = "";
          }
        } else {
          Toast.fail(this.msg3);
        }
      } else if (this.$route.query.addressETH) {
        if (ethers.utils.isAddress(this.inputAddress)) {
          try {
            this.MakeTransactionETH();
          } catch (err) {
            this.loading = false;
            Toast.fail(this.msg2);
            this.password = "";
          }
        } else {
          Toast.fail(this.msg3);
        }
      } else if (this.$route.query.addressBTC) {
          btc_validateaddress(this.inputAddress)
          .then((res) => {
            console.log(res);
            try {
              this.MakeTransactionBTC();
            } catch (err) {
              this.loading = false;
              Toast.fail(this.msg2);
              this.password = "";
            }
          })
          .catch((err) => {
            console.log(err);
            Toast.fail(this.msg3);
            this.password = "";
          });
      }
    },
    toAddressList() {
      if (this.$route.query.address1) {
        this.$router.push({
          path: "/addressManage",
          query: {
            name: this.$route.query.name,
            address1: this.$route.query.address1,
          },
        });
      } else if (this.$route.query.addressFIL) {
        this.$router.push({
          path: "/addressManage",
          query: {
            name: this.$route.query.name,
            addressFIL: this.$route.query.addressFIL,
          },
        });
      } else if (this.$route.query.address2) {
        this.$router.push({
          path: "/addressManage",
          query: {
            name: this.$route.query.name,
            address2: this.$route.query.address2,
          },
        });
      } else if (this.$route.query.addressETH) {
        this.$router.push({
          path: "/addressManage",
          query: {
            name: this.$route.query.name,
            addressETH: this.$route.query.addressETH,
          },
        });
      } else if (this.$route.query.addressBTC) {
        this.$router.push({
          path: "/addressManage",
          query: {
            name: this.$route.query.name,
            addressBTC: this.$route.query.addressBTC,
          },
        });
      }
    },
    toStartRecognize() {
      if (this.$route.query.address1) {
        this.$router.push({
          path: "/indexHome/startRecognize",
          query: {
            name: this.$route.query.name,
            address1: this.$route.query.address1,
          },
        });
      } else if (this.$route.query.addressFIL) {
        this.$router.push({
          path: "/indexHome/startRecognize",
          query: {
            name: this.$route.query.name,
            addressFIL: this.$route.query.addressFIL,
          },
        });
      } else if (this.$route.query.address2) {
        this.$router.push({
          path: "/indexHome/startRecognize",
          query: {
            name: this.$route.query.name,
            address2: this.$route.query.address2,
          },
        });
      } else if (this.$route.query.addressETH) {
        this.$router.push({
          path: "/indexHome/startRecognize",
          query: {
            name: this.$route.query.name,
            addressETH: this.$route.query.addressETH,
          },
        });
      } else if (this.$route.query.addressBTC) {
        this.$router.push({
          path: "/indexHome/startRecognize",
          query: {
            name: this.$route.query.name,
            addressBTC: this.$route.query.addressBTC,
          },
        });
      }
    },
    clickReturn() {
      this.$router.go(-1);
    },
    clickNext() {
      if (
        this.inputAddress &&
        this.inputAmount &&
        !this.prompt1 &&
        !this.prompt2 &&
        !this.prompt3 &&
        !this.prompt4 &&
        !this.lastLowShow //ETH手续费不低于21000
      ) {
        this.show1 = true;
      }
    },
    checkAddress() {
      var regstr = /^\S+$/;
      if (!regstr.test(this.inputAddress)) {
        this.prompt1 = true;
      } else {
        this.prompt1 = false;
      }
    },
    checkAmount() {
      this.show = false;
      this.inputAmount = this.inputAmount.match(/^\d*(\.?\d{0,4})/g)[0] || ""; //只能是最多四位小数的整数或小数
      var regstr = /^\d+(\.\d{0,4})?$/;
      if (parseFloat(this.amount) > parseFloat(this.inputAmount)) {
        this.prompt4 = false;
      } else {
        // this.prompt4 = true; //余额不足
      }
      if (!regstr.test(this.inputAmount)) {
        this.prompt2 = true; //小数或整数
        this.prompt4 = false;
      } else {
        this.prompt2 = false;
      }
      if (this.inputAmount == 0) {
        this.inputAmount = "";
      }
    },
    checkRemark() {
      var regstr = /^.{0,50}$/;
      if (!regstr.test(this.inputRemark)) {
        this.prompt3 = true;
      } else {
        this.prompt3 = false;
      }
    },
  },
};
</script>

<style lang="less">
.transfer {
  position: relative;
  height: 100%;
  .van-key {
    font-size: 40px;
    height: 80px;
  }
  .van-key--large,
  .van-key--delete {
    height: 164px;
  }
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
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        font-size: 32px;
        color: #1989fa;
        text-align: center;
      }
    }
    .van-loading__spinner {
      width: 80px;
      height: 80px;
      margin: 0 auto;
    }
  }
  .van-radio {
    padding: 0 70px;
    padding-top: 31px;
    position: relative;
    height: 34px;
    .van-radio__label {
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    }
    .timer {
      position: absolute;
      left: 500px;
      font-size: 24px;
      height: 24px;
      bottom: 0;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    }
  }
  .active {
    font-weight: 700;
    color: #000;
  }
  .topImg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 46px 40px 54px 40px;
    img {
      height: 46px;
    }
  }

  h2 {
    padding: 0 42px;
    margin: 0 0 34px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 48px;
      color: #000;

      font-family: Arial-BoldMT, Arial;
    }
    i {
      display: flex;
      // padding-left: 80px;
      justify-content: flex-start;
      align-items: center;
      font-size: 28px;
      font-style: normal;
      .logo {
        margin-right: 12px;
        height: 46px;
        width: 46px;
      }
    }
  }

  .selectDiv {
    position: relative;
    width: 632px;
    margin: 0 auto;
    background: #f9f9f9;
    border-radius: 16px;
    select {
      width: 610px;
      height: 86px;
      font-size: 32px;
      line-height: 55px;
      background: rgba(255, 255, 255, 0);
      border: none;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #1a1a1a;
      padding: 0;
      outline: none;
      background: rgba(0, 0, 0, 0);
      margin-left: 22px;
    }
    i {
      position: absolute;
      right: 6px;
      width: 0;
      height: 6px;
      display: block;
      border: 12px solid #111;
      border-color: #111 transparent transparent transparent;
      top: 50%;
      margin-top: -7px;
    }
  }

  .popup {
    align-self: center;
    .createOrLead {
      position: fixed;
      width: 100%;
      border-top: 1px solid #ccc;

      bottom: 60px;
      left: 0;
      .createOrLead1 {
        display: flex;
        justify-content: space-between;
        padding: 0 30px;
        margin-top: 20px;
        height: 70px;
        button {
          width: 268px;
          height: 85px;
          background: #3d7fff;
          border-radius: 51px;
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          outline: none;
          border: none;
          display: block;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0;
          img {
            width: 32px;
            height: 32px;
            padding: 0;
            margin-right: 8px;
          }
        }
        .leadBtn {
          background: rgba(0, 0, 0, 0);
          color: #3d7fff;
          border: 3px solid #3d7fff;
        }
      }
    }

    h2 {
      font-size: 60px;
      font-family: Segoe UI;
      font-weight: bold;
      line-height: 80px;
      color: rgba(1, 6, 19, 1);
      padding: 107px 0 43px 41px;
      margin: 0;
    }
    .maxDiv {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .changeDiv {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 130px;
        color: #333;
        img {
          width: 62px;
          height: 62px;
          margin-bottom: 40px;
          padding: 0;
        }
      }
      .main {
        width: 518px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        border-right: 1px solid #e6e9ed;
        .walletsBoxBHP {
          .box {
            background: url("../assets/img/BHPchange.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .walletsBoxBHP2 {
          .box {
            background: url("../assets/img/BHP2change.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .walletsBoxETH {
          .box {
            background: url("../assets/img/ETHchange.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .walletsBoxFIL {
          .box {
            background: url("../assets/img/FILchange.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .walletsBoxFIL {
          .box {
            background: url("../assets/img/BTCchange.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .walletsBox {
          overflow: auto;
          max-height: calc(100vh - 400px);

          .box {
            width: 448px;
            height: 192px;
            box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.1);
            border-radius: 22px;
            margin-bottom: 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            position: relative;
            .rightTopImg {
              position: absolute;
              top: 20px;
              right: 20px;
              width: 40px;
              height: 40px;
              background: url("../assets/img/right.png");
              background-size: 100% 100%;
            }
            .walletName {
              padding-left: 38px;
              padding-top: 18px;
              font-size: 28px;
              font-family: Arial;
              font-weight: 400;
              color: #fff;
            }
            p {
              padding-left: 38px;
              font-size: 26px;
              font-family: Segoe UI;
              font-weight: bold;
              color: #fff;
              margin: 10px 0;

              span {
                font-size: 32px;
                margin-right: 30px;
              }
            }
            .address {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0 38px;
              margin-bottom: 16px;
              img {
                width: 40px;
                height: 40px;
                margin-right: 20px;
                padding: 0;
              }
              span {
                font-size: 20px;
                font-family: Segoe UI;
                font-weight: 300;
                line-height: 20px;
                color: #fff;
                word-break: break-all;
                margin-right: 0;
              }
            }
          }
        }
      }
    }
  }
  .popupPWD {
    width: 630px;
    height: 364px;
    background: rgba(255, 255, 255, 1);

    border-radius: 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    span {
      align-self: flex-start;
      padding: 60px 0 32px 72px;
      font-size: 32px;
      font-family: Segoe UI;
      font-weight: normal;

      color: #333;
    }
    input {
      width: 486px;
      height: 62px;
      border: none;
      padding: 0;
      border-radius: 22px;
      background: rgba(0, 0, 0, 0.1);
      margin-bottom: 62px;
      text-indent: 20px;
      font-size: 22px;
    }
    .bottomDiv {
      width: 100%;
      height: 80px;
      border-top: 1px solid #ccc;
      display: flex;
      justify-content: center;
      position: fixed;
      bottom: 0;
      span {
        display: flex;
        width: 50%;
        height: 100%;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        padding: 0;
        color: #3d7fff;
      }
      span:first-child {
        color: #ff3d3d;
        border-right: 1px solid #ccc;
      }
    }
  }
  .gasInput {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding-left: 98px;
    p {
      height: 33px;
      width: 577px;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #393a49;
      line-height: 33px;
      margin: 20px 0 6px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .lastLow {
        height: 33px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ff3d3d;
        line-height: 33px;
        margin: 0;
      }
    }
    input {
      width: 577px;
      height: 67px;
      border-radius: 16px;
      border: 2px solid #f9f9f9;
      text-indent: 20px;
    }
  }
  .inputAddress,
  .inputAmount,
  .inputRemark,
  .inputCost {
    margin: 0 auto;
    padding-bottom: 12px;
    width: 600px;
    border-bottom: 2px solid rgba(234, 236, 239, 1);
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    div {
      height: 70px;
      padding-top: 16px;
    }
    span {
      font-size: 22px;
      font-family: Segoe UI;
      font-weight: 400;
      margin-right: 20px;
      color: rgba(38, 75, 171, 1);
    }
    .inputLable,
    .cost {
      font-size: 28px;
      color: rgba(1, 6, 19, 1);
      padding-bottom: 12px;
    }
    .cost {
      position: relative;
      display: flex;
      align-items: center;
      margin-right: 0;
      i {
        position: absolute;
        right: 0;
        bottom: 20px;
        display: block;
        width: 27px;
        height: 16px;
        background: url("../assets/img/close.png") no-repeat;
        background-size: cover;
      }
    }
    input {
      width: 600px;
      height: 52px;
      font-size: 24px;
      border: none;
      outline: none;
      padding: 0;
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
  .fee {
    padding: 0 70px;

    height: 31px;
    font-size: 28px;
    font-family: ArialMT;
    color: #999999;
    line-height: 32px;
    margin-top: 23px;
  }
  .inputAddress {
    padding-top: 28px;
    height: 110px;
    justify-content: space-between;
    .inputLable {
      position: relative;

      margin-top: 0;
      span {
        font-size: 28px;
        color: rgba(1, 6, 19, 1);
        padding-bottom: 12px;
      }
      .rightImg {
        position: absolute;
        width: 110px;
        top: 40px;
        right: 0px;

        .rightImg1 {
          width: 110px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0;

          img {
            width: 40px;
            height: 40px;
            padding: 0;
          }
          .secondImg {
            width: 36px;
            height: 36px;
          }
        }
      }
    }
    input {
      width: 440px;
    }
  }

  .inputAmount {
    position: relative;
    input {
      width: 520px;
    }
    .BHPspan {
      position: absolute;
      right: 0;
      margin-right: 0;
      bottom: 20px;
      font-size: 28px;
      font-family: Arial;
      font-weight: bold;
      color: rgba(1, 6, 19, 1);
    }
    .selectSpan {
      outline: none;
      border-radius: 10px;
      font-size: 20px;
      option {
        border: none;
        border-radius: 10px;
      }
    }
  }
  button {
    width: 630px;
    height: 88px;
    background: #4377ff;
    border-radius: 44px;
    display: block;
    margin: 0 auto;
    padding: 0;
    outline: none;
    border: none;
    font-size: 32px;
    font-family: ArialMT;
    color: #ffffff;
    margin-top: 80px;
    margin-bottom: 55px;
  }
}
</style>
