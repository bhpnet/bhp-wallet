<template>
  <div class="mywallet">
    <div class="loading" v-show="loading">
      <van-loading color="#1989fa" class="loadImg" />
    </div>
    <div class="top">
      <div class="top1">
        <span v-text="$t('message.text45')">Wallet</span>
        <img @click="showPopup()" src="../assets/img/spread.png" alt />
      </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="asset asset1" v-show="walletType == 'BHP'">
        <img
          class="walletCode"
          @click="toReceiving()"
          src="../assets/img/qrCode.png"
          alt
        />
        <span class="walletName">{{ newWalletList.name }}</span>
        <p v-text="$t('message.text89')">Total assets</p>

        <h2>
          <span>{{ symbols }}</span>
          {{ (cnyPrice * newWalletValue).toFixed(2) }}
        </h2>
        <span class="addressMsg">{{ newWalletList.address }}</span>
      </div>
      <div class="asset asset2" v-show="walletType == 'BHP2'">
        <img
          class="walletCode"
          @click="toReceiving()"
          src="../assets/img/qrCode.png"
          alt
        />
        <span class="walletName">{{ newWalletList.name }}</span>
        <p v-text="$t('message.text89')">Total assets</p>

        <h2>
          <span>{{ symbols }}</span>
          {{ (cnyPrice * newWalletValue).toFixed(2) }}
        </h2>
        <span class="addressMsg">{{ newWalletList.address }}</span>
      </div>
      <div class="asset assetFIL" v-show="walletType == 'FIL'">
        <img
          class="walletCode"
          @click="toReceiving()"
          src="../assets/img/qrCode.png"
          alt
        />
        <span class="walletName">{{ newWalletList.name }}</span>
        <p v-text="$t('message.text89')">Total assets</p>
        <h2>
          <span>{{ symbols }}</span>
          {{ (cnyPrice * newWalletValue).toFixed(2) }}
        </h2>
        <span class="addressMsg">{{ newWalletList.address }}</span>
      </div>
      <div class="asset assetETH" v-show="walletType == 'ETH'">
        <img
          class="walletCode"
          @click="toReceiving()"
          src="../assets/img/qrCode.png"
          alt
        />
        <span class="walletName">{{ newWalletList.name }}</span>
        <p v-text="$t('message.text89')">Total assets</p>

        <h2>
          <span>{{ symbols }}</span>
          {{ (cnyPrice * newWalletValue).toFixed(2) }}
        </h2>
        <span class="addressMsg">{{ newWalletList.address }}</span>
      </div>
      <div class="asset assetBTC" v-show="walletType == 'BTC'">
        <img
          class="walletCode"
          @click="toReceiving()"
          src="../assets/img/qrCode.png"
          alt
        />
        <span class="walletName">{{ newWalletList.name }}</span>
        <p v-text="$t('message.text89')">Total assets</p>

        <h2>
          <span>{{ symbols }}</span>
          {{ (cnyPrice * newWalletValue).toFixed(2) }}
        </h2>
        <span class="addressMsg">{{ newWalletList.address }}</span>
      </div>

      <div class="transaction">
        <div class="box" @click="startRecognize()">
          <img src="../assets/img/Scan.png" alt />

          <span v-text="$t('message.text42')">扫一扫</span>
        </div>
        <div class="box" @click="toTransfer()">
          <img src="../assets/img/Send.png" alt />

          <span v-text="$t('message.text43')">转账</span>
        </div>
        <div class="box" @click="toReceiving()">
          <img src="../assets/img/Receive.png" alt />

          <span v-text="$t('message.text44')">收款</span>
        </div>
      </div>
    </van-pull-refresh>

    <h3 class="assetTitle">
      <span v-text="$t('message.text60')">Asset list</span>
      <img
        v-show="walletType == 'ETH'"
        @click="toETHlist()"
        src="../assets/img/addETH.png"
        alt
      />
    </h3>
    <ul class="assetsList" @click="toTransferRecords()">
      <li @click="toTransferRecords1(walletType)">
        <div class="assetName">
          <img :src="walletLogo" alt />
          <span>{{ walletType }}</span>
        </div>
        <div class="assetDiv" v-show="walletType == 'BHP'">
          <span>{{ valueSum1 ? valueSum1.toFixed(4) : 0 }}</span>
          <i>≈ {{ symbols }} {{ (cnyPrice * valueSum1).toFixed(2) }}</i>
        </div>
        <div class="assetDiv" v-show="walletType == 'BHP2'">
          <span>{{ valueSum2 ? valueSum2.toFixed(4) : 0 }}</span>
          <i>≈ {{ symbols }} {{ (cnyPrice * valueSum2).toFixed(2) }}</i>
        </div>
        <div class="assetDiv" v-show="walletType == 'ETH'">
          <span>{{ valueSumETH ? valueSumETH.toFixed(4) : 0 }}</span>
          <i>≈ {{ symbols }} {{ (cnyPrice * valueSumETH).toFixed(2) }}</i>
        </div>
        <div class="assetDiv" v-show="walletType == 'FIL'">
          <span>{{ valueSumFIL ? valueSumFIL.toFixed(4) : 0 }}</span>
          <i>≈ {{ symbols }} {{ (cnyPrice * valueSumFIL).toFixed(2) }}</i>
        </div>
        <div class="assetDiv" v-show="walletType == 'BTC'">
          <span>{{ valueSumBTC ? valueSumBTC.toFixed(4) : 0 }}</span>
          <i>≈ {{ symbols }} {{ (cnyPrice * valueSumBTC).toFixed(2) }}</i>
        </div>
      </li>

      <li
        @click="toTransferRecords1(walletType, v.name, v.ETHAsstesSum)"
        v-for="(v, i) of this.selectETHlist"
        :key="i"
        v-show="walletType == 'ETH'"
      >
        <div class="assetName">
          <img :src="v.logo" alt />
          <span>{{ v.name }}</span>
          <!-- <span v-show="false">{{v.a}}</span> -->
        </div>
        <div class="assetDiv">
          <span>{{ v.ETHAsstesSum ? v.ETHAsstesSum.toFixed(4) : 0 }}</span>
          <i
            >≈ {{ symbols }}
            {{ (v.price * v.ETHAsstesSum ? v.ETHAsstesSum : 0).toFixed(2) }}</i
          >
        </div>
      </li>
    </ul>
    <van-popup
      class="popup"
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '87% ' }"
    >
      <h2 v-text="$t('message.text38')">钱包列表</h2>
      <div class="maxDiv">
        <div class="main">
          <div
            v-show="walletRightType == 'ETH'"
            class="walletsBox walletsBoxETH"
          >
            <div
              v-for="(item, index) in this.allWalletListETH"
              :key="index"
              class="box"
              @click="changeWalletETH(index)"
            >
              <div
                class="rightTopImg"
                v-show="item.address == newWalletList.address"
              ></div>

              <span class="walletName">{{ item.name }}</span>
              <p>
                <span>{{ item.assets ? item.assets.toFixed(4) : 0 }}</span> ETH
              </p>
              <p class="address">
                <span>{{ item.address }}</span>
              </p>
            </div>
          </div>
          <div
            v-show="walletRightType == 'BHP'"
            class="walletsBox walletsBoxBHP"
          >
            <div
              v-for="(item, index) in this.allWalletList"
              :key="index"
              class="box"
              @click="changeWallet(index)"
            >
              <div
                class="rightTopImg"
                v-show="item.address == newWalletList.address"
              ></div>

              <span class="walletName">{{ item.name }}</span>
              <p>
                <span>{{ item.assets ? item.assets.toFixed(4) : 0 }}</span> BHP
              </p>
              <p class="address">
                <span>{{ item.address }}</span>
              </p>
            </div>
          </div>
          <div
            v-show="walletRightType == 'BHP2'"
            class="walletsBox walletsBoxBHP2"
          >
            <div
              v-for="(item, index) in this.allWalletList2"
              :key="index"
              class="box"
              @click="changeWallet2(index)"
            >
              <div
                class="rightTopImg"
                v-show="item.address == newWalletList.address"
              ></div>

              <span class="walletName">{{ item.name }}</span>
              <p>
                <span>{{ item.assets ? item.assets.toFixed(4) : 0 }}</span> BHP
              </p>
              <p class="address">
                <span>{{ item.address }}</span>
              </p>
            </div>
          </div>
          <div
            v-show="walletRightType == 'FIL'"
            class="walletsBox walletsBoxFIL"
          >
            <div
              v-for="(item, index) in this.allWalletListFIL"
              :key="index"
              class="box"
              @click="changeWalletFIL(index)"
            >
              <div
                class="rightTopImg"
                v-show="item.address == newWalletList.address"
              ></div>

              <span class="walletName">{{ item.name }}</span>
              <p>
                <span>{{ item.assets ? item.assets.toFixed(4) : 0 }}</span> FIL
              </p>
              <p class="address">
                <span>{{ item.address }}</span>
              </p>
            </div>
          </div>
          <div
            v-show="walletRightType == 'BTC'"
            class="walletsBox walletsBoxBTC"
          >
            <div
              v-for="(item, index) in this.allWalletListBTC"
              :key="index"
              class="box"
              @click="changeWalletBTC(index)"
            >
              <div
                class="rightTopImg"
                v-show="item.address == newWalletList.address"
              ></div>

              <span class="walletName">{{ item.name }}</span>
              <p>
                <span>{{ item.assets ? item.assets.toFixed(4) : 0 }}</span> BTC
              </p>
              <p class="address">
                <span>{{ item.address }}</span>
              </p>
            </div>
          </div>
          <div class="createOrLead">
            <div class="createOrLead1">
              <button @click="createWallet()">
                <img src="../assets/img/createWallet.png" />
                {{ $t("message.text16") }}
              </button>
              <button @click="leadWallet()" class="leadBtn">
                <img src="../assets/img/leadWallet.png" />
                {{ $t("message.text17") }}
              </button>
            </div>
          </div>
        </div>

        <div class="changeDiv">
          <img
            v-show="walletRightType == 'BTC'"
            @click="changeWalletsBox('BTC')"
            :class="walletRightType == 'BTC' ? 'active' : ''"
            src="../assets/img/BTC.png"
            alt
          />
          <img
            v-show="walletRightType != 'BTC'"
            @click="changeWalletsBox('BTC')"
            :class="walletRightType == 'BTC' ? 'active' : ''"
            src="../assets/img/BTC1.png"
            alt
          />
          <img
            v-show="walletRightType == 'ETH'"
            :class="walletRightType == 'ETH' ? 'active' : ''"
            @click="changeWalletsBox('ETH')"
            src="../assets/img/ETCsider.png"
            alt
          />
          <img
            v-show="walletRightType != 'ETH'"
            :class="walletRightType == 'ETH' ? 'active' : ''"
            @click="changeWalletsBox('ETH')"
            src="../assets/img/ETCsider1.png"
            alt
          />
          <!-- <img
            v-show="walletRightType == 'FIL'"
            @click="changeWalletsBox('FIL')"
            :class="walletRightType == 'FIL' ? 'active' : ''"
            src="../assets/img/FIL.png"
            alt
          />
          <img
            v-show="walletRightType != 'FIL'"
            @click="changeWalletsBox('FIL')"
            :class="walletRightType == 'FIL' ? 'active' : ''"
            src="../assets/img/FIL1.png"
            alt
          /> -->

          <img
            v-show="walletRightType == 'BHP'"
            :class="walletRightType == 'BHP' ? 'active' : ''"
            @click="changeWalletsBox('BHP')"
            src="../assets/img/logoBhp1Mini.png"
            alt
          />
          <img
            v-show="walletRightType != 'BHP'"
            :class="walletRightType == 'BHP' ? 'active' : ''"
            @click="changeWalletsBox('BHP')"
            src="../assets/img/BHPsider1.png"
            alt
          />
          <!-- <img
            v-show="walletRightType == 'BHP2'"
            @click="changeWalletsBox('BHP2')"
            :class="walletRightType == 'BHP2' ? 'active' : ''"
            src="../assets/img/BHP2sider.png"
            alt
          />
          <img
            v-show="walletRightType != 'BHP2'"
            @click="changeWalletsBox('BHP2')"
            :class="walletRightType == 'BHP2' ? 'active' : ''"
            src="../assets/img/BHP2sider1.png"
            alt
          /> -->
        </div>
      </div>
    </van-popup>
    <div id="bcid" :style="{ zIndex: zIndex }"></div>
    <div class="foot">
      <div class="menu">
        <div class="myWalletImg">
          <div>
            <img src="../assets/img/wallet.png" alt />
          </div>
          <span v-text="$t('message.text45')">钱包</span>
        </div>
        <div @click="toMyDapp()" class="myDappImg">
          <div>
            <img src="../assets/img/my1.png" alt />
          </div>
          <span v-text="$t('message.text46')">我的</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  allAssetes2,
  allAssetes,
  allAssetesETH,
  allAssetesFIL,
  allAssetesBTC,
  assetes,
  assetes2,
  assetETH,
  assetBTC,
  assetFIL,
} from "../assets/js/myWallet";
import { all_getPrice } from "../api/api";
const Web3 = require("web3");
import { Toast } from "vant";

export default {
  name: "myWallet1",
  data() {
    return {
      isLoading: false,
      loading: false,
      timer: 0,
      show: false,
      show2: true,
      codeUrl: "",
      scan: "",
      zIndex: -1,
      allWalletList: [],
      allWalletList2: [],
      allWalletListETH: [],
      allWalletListFIL: [],
      allWalletListBTC: [],
      newWalletList: {}, //当前的钱包
      valueSum1: 0, //钱包余额之和
      valueSum2: 0,
      valueSumETH: 0,
      valueSumFIL: 0,
      valueSumBTC: 0,
      newWalletValue: 0, //当前钱包币余额
      cnyPrice: 0, //币价
      walletType: "", //控制钱包主页相关参数
      walletRightType: "", //控制切换钱包的列表
      walletLogo: "",
      symbols: "",
      msg: "No Network!",
      selectETHlist: [
        {
          logo: require("../assets/img/USDT.png"),
          name: "USDT",
          address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
          status: true,
          decimals: 18,
          ETHAsstesSum: 0,
          price: 0, //以太坊多资产币价
        },
      ],
    };
  },
  async created() {
      this.loading = true
    
    // console.log(parseInt('0x2263cd620d727a00',16))16进制转10进制
    // // new ethers.Wallet('privateKey');//用私钥导入的没有助记词
    this.$store.commit("getWalletType", ""); //备份助记词状态清空，不然备份会添加重复的钱包
    localStorage.setItem(
      "lang",
      localStorage.lang == undefined ? "en" : localStorage.lang
    );
    if (localStorage.getItem("lang") == "cn") {
      this.msg = "暂无网络！";
    } else {
      this.msg = "No Network!";
    }
    if (!navigator.onLine) {
      Toast.fail(this.msg);
      this.loading = false
    }
    if (JSON.parse(localStorage.getItem("selectETHlist"))) {
      this.selectETHlist = JSON.parse(localStorage.getItem("selectETHlist"));
    } else {
      localStorage.setItem("selectETHlist", JSON.stringify(this.selectETHlist));
    }
    this.allWalletList = JSON.parse(localStorage.getItem("accounts")) || [];
    this.allWalletList2 = JSON.parse(localStorage.getItem("accounts2")) || [];
    this.allWalletListFIL =
      JSON.parse(localStorage.getItem("accountsFIL")) || [];
    this.allWalletListETH =
      JSON.parse(localStorage.getItem("accountsETH")) || [];
    this.allWalletListBTC =
      JSON.parse(localStorage.getItem("accountsBTC")) || [];
    if (this.$route.query.address == "OpenToIndexHome") {
      //打开应用跳转进入最新钱包或者备份完钱包跳转到钱包

      if (this.allWalletListETH.length != 0) {
        this.walletLogo = require("../assets/img/ETCsider.png");
        this.walletType = "ETH";
        this.walletRightType = "ETH";
        this.newWalletList = this.allWalletListETH.pop();
        this.newWalletList.assets = 0;
        this.allWalletListETH.push(this.newWalletList);
        localStorage.setItem(
          "accountsETH",
          JSON.stringify(this.allWalletListETH)
        );
        //ETH的查询资产方法和币价方法
        assetETH(this, this.newWalletList.address);
        this.getPrice("huoBiExchange", "eth_usdt");
        for (let i in this.selectETHlist) {
          this.getETHCoin(this.selectETHlist[i]);
        }
      } else if (this.allWalletList2.length != 0) {
        this.walletLogo = require("../assets/img/logoBhp2.png");
        this.walletType = "BHP2";
        this.walletRightType = "BHP2";
        this.newWalletList = this.allWalletList2.pop();
        this.newWalletList.assets = 0;
        this.allWalletList2.push(this.newWalletList);
        localStorage.setItem("accounts2", JSON.stringify(this.allWalletList2));
        //2.0的方法
        assetes2(this, this.newWalletList.address);
        this.getPrice("digfinExchange", "bhp_usdt");
      } else if (this.allWalletListBTC.length != 0) {
        this.walletLogo = require("../assets/img/BTC.png");
        this.walletType = "BTC";
        this.walletRightType = "BTC";
        this.newWalletList = this.allWalletListBTC.pop();
        this.newWalletList.assets = 0;
        this.allWalletListBTC.push(this.newWalletList);
        localStorage.setItem(
          "accountsBTC",
          JSON.stringify(this.allWalletListBTC)
        );
        //的查询资产方法和币价方法
        assetBTC(this, this.newWalletList.address);
        this.getPrice("huoBiExchange", "btc_usdt");
      } else if (this.allWalletListFIL.length != 0) {
        this.walletLogo = require("../assets/img/FIL.png");
        this.walletType = "FIL";
        this.walletRightType = "FIL";
        this.newWalletList = this.allWalletListFIL.pop();
        this.newWalletList.assets = 0;
        this.allWalletListFIL.push(this.newWalletList);
        localStorage.setItem(
          "accountsFIL",
          JSON.stringify(this.allWalletListFIL)
        );
        //FIL的查询资产方法和币价方法
        assetFIL(this, this.newWalletList.address);
        this.getPrice("huoBiExchange", "fil_usdt");
      } else {
        //this.allWalletList2.length == 0 && this.allWalletListETH.length == 0 && this.allWalletListFIL.length == 0
        this.walletLogo = require("../assets/img/logoBhp1Mini.png");
        this.walletType = "BHP";
        this.walletRightType = "BHP";
        this.newWalletList = this.allWalletList.pop();
        this.newWalletList.assets = 0; //最新的钱包资产写个零站位，item.assets.toFixed(2)报错
        this.allWalletList.push(this.newWalletList);
        localStorage.setItem("accounts", JSON.stringify(this.allWalletList));
        assetes(this, this.newWalletList.address);
        this.getPrice("digfinExchange", "bhp_usdt"); //===========================================
      }
    } else if (this.$route.query.address1) {
      //切换钱包刷新页面不丢失===============
      this.walletLogo = require("../assets/img/logoBhp1Mini.png");
      this.walletType = "BHP";
      this.walletRightType = "BHP";
      for (let i in this.allWalletList) {
        if (this.allWalletList[i].address == this.$route.query.address1) {
          this.newWalletList = this.allWalletList[i];
        }
      }
      assetes(this, this.newWalletList.address);
      this.getPrice("okExchange");
    } else if (this.$route.query.address2) {
      this.walletLogo = require("../assets/img/logoBhp2.png");
      this.walletType = "BHP2";
      this.walletRightType = "BHP2";
      for (let i in this.allWalletList2) {
        if (this.allWalletList2[i].address == this.$route.query.address2) {
          this.newWalletList = this.allWalletList2[i];
        }
      }
      assetes2(this, this.newWalletList.address);
      this.getPrice("okExchange");
      //2.0的查询资产方法
    } else if (this.$route.query.addressETH) {
      this.walletLogo = require("../assets/img/ETCsider.png");
      this.walletType = "ETH";
      this.walletRightType = "ETH";
      for (let i in this.allWalletListETH) {
        if (this.allWalletListETH[i].address == this.$route.query.addressETH) {
          this.newWalletList = this.allWalletListETH[i];
        }
      }
      assetETH(this, this.newWalletList.address);
      this.getPrice("okExchange", "eth_usdt");
      for (let i in this.selectETHlist) {
        this.getETHCoin(this.selectETHlist[i]);
      }
    } else if (this.$route.query.addressBTC) {
      this.walletLogo = require("../assets/img/BTC.png");
      this.walletType = "BTC";
      this.walletRightType = "BTC";
      for (let i in this.allWalletListBTC) {
        if (this.allWalletListBTC[i].address == this.$route.query.addressBTC) {
          this.newWalletList = this.allWalletListBTC[i];
        }
      }
      assetBTC(this, this.newWalletList.address);
      this.getPrice("okExchange", "btc_usdt");
    } else if (this.$route.query.addressFIL) {
      this.walletLogo = require("../assets/img/FIL.png");
      this.walletType = "FIL";
      this.walletRightType = "FIL";
      for (let i in this.allWalletListFIL) {
        if (this.allWalletListFIL[i].address == this.$route.query.addressFIL) {
          this.newWalletList = this.allWalletListFIL[i];
        }
      }
      assetFIL(this, this.newWalletList.address);
      this.getPrice("okExchange", "fil_usdt");
    }
    // allAssetes2(this);
    allAssetes(this); //进入钱包管理可能会没资产信息
    allAssetesETH(this);
    //进入页面不加载fil
    allAssetesBTC(this);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    toETHlist() {
      this.$router.push("/ETHlist");
    },
    //获取以太坊代币
    async getETHCoin(oneOfETHlist) {
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
      let contractAbi = [
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
      ];
      // 定义合约
      let myContract = new web3.eth.Contract(contractAbi, oneOfETHlist.address);
      await this.getOtherERC(myContract, oneOfETHlist);
    },
    //查询代币名称,总余额，精度
    async getOtherERC(currentContract, oneOfETHlist) {
      for (let i in this.selectETHlist) {
        if (this.selectETHlist[i].address == oneOfETHlist.address) {
          //获取币价========================================================
          all_getPrice("huoBiExchange", oneOfETHlist.name + "_usdt").then((res) => {
            if (res.data.data) {
              if (localStorage.getItem("lang") == "cn") {
                this.selectETHlist[i].price = res.data.data.cnyPrice;
                this.symbols = "¥";
              } else {
                this.selectETHlist[i].price = res.data.data.usdPrice;
                this.symbols = "$";
              }
            } else {
              this.selectETHlist[i].price = 0;
            }
          });
          //address合约地址
          switch (oneOfETHlist.address) {
            case "0x6b175474e89094c44da98b954eedeac495271d0f":
              this.selectETHlist[i].logo = require("../assets/img/Dai.png");
              break;
            case "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599":
              this.selectETHlist[i].logo = require("../assets/img/Wrapped.png");
              break;
            case "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e":
              this.selectETHlist[i].logo = require("../assets/img/YFI.png");
              break;
            case "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984":
              this.selectETHlist[i].logo = require("../assets/img/UNI.png");
              break;
            case "0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83":
              this.selectETHlist[i].logo = require("../assets/img/YFII.png");
              break;
            case "0x80fB784B7eD66730e8b1DBd9820aFD29931aab03":
              this.selectETHlist[i].logo = require("../assets/img/LEND.png");
              break;
            case "0x514910771af9ca656af840dff83e8264ecf986ca":
              this.selectETHlist[i].logo = require("../assets/img/LINK.png");
              break;
            case "0xdac17f958d2ee523a2206206994597c13d831ec7":
              this.selectETHlist[i].logo = require("../assets/img/USDT.png");
              break;
            case "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48":
              this.selectETHlist[i].logo = require("../assets/img/USDC.png");
              break;
            case "0xc00e94cb662c3520282e6f5717214004a7f26888":
              this.selectETHlist[
                i
              ].logo = require("../assets/img/Compound.png");
              break;
            default:
              this.selectETHlist[i].logo = require("../assets/img/WEIZHI.png");
              break;
          }
          await currentContract.methods["decimals"]().call(
            { from: oneOfETHlist.address },
            function (error, decimals) {
              if (!error) {
                oneOfETHlist.decimals = decimals;
              }
            }
          );
          this.selectETHlist[i].ETHAsstesSum = 0;
          let that = this;
          for (let index in this.allWalletListETH) {
            await currentContract.methods
              .balanceOf(this.allWalletListETH[index].address)
              .call(
                { from: this.allWalletListETH[index].address },
                function (error, result) {
                  if (!error) {
                    that.selectETHlist[i].ETHAsstesSum += parseFloat(
                      result / Math.pow(10, that.selectETHlist[i].decimals)
                    );
                  } else {
                    that.selectETHlist[i].ETHAsstesSum = 0;
                  }
                }
              );
          }
        }
      }

      localStorage.setItem("selectETHlist", JSON.stringify(this.selectETHlist));
    },
    //切换eth钱包
    async changeWalletETH(index) {
      this.show = false;
      this.walletLogo = require("../assets/img/ETCsider.png");
      this.walletType = "ETH";
      for (let i in this.allWalletListETH) {
        if (this.allWalletListETH[i].address == this.$route.query.addressETH) {
          this.newWalletList = this.allWalletListETH[i];
        }
      }
      this.$router.replace({
        path: "/indexHome/myWallet",
        query: {
          addressETH: this.allWalletListETH[index].address,
        },
      });
      this.newWalletList = this.allWalletListETH[index];
      //查询资产和币价方法

      assetETH(this, this.newWalletList.address);
      this.getPrice("huoBiExchange", "eth_usdt");
      // for (let i in this.selectETHlist) {
      //   this.getETHCoin(this.selectETHlist[i]);
      // }
    },
    //切换FIL钱包
    changeWalletFIL(index) {
      this.show = false;
      this.walletLogo = require("../assets/img/FIL.png");
      this.walletType = "FIL";
      for (let i in this.allWalletListFIL) {
        if (this.allWalletListFIL[i].address == this.$route.query.addressFIL) {
          this.newWalletList = this.allWalletListFIL[i];
        }
      }
      this.$router.replace({
        path: "/indexHome/myWallet",
        query: {
          addressFIL: this.allWalletListFIL[index].address,
        },
      });
      this.newWalletList = this.allWalletListFIL[index];
      //查询资产和币价方法
      assetFIL(this, this.newWalletList.address);
      this.getPrice("huoBiExchange", "fil_usdt");

      //===========================
    },
    //切换BTC钱包
    changeWalletBTC(index) {
      this.show = false;
      this.walletLogo = require("../assets/img/BTC.png");
      this.walletType = "BTC";
      for (let i in this.allWalletListBTC) {
        if (this.allWalletListBTC[i].address == this.$route.query.addressBTC) {
          this.newWalletList = this.allWalletListBTC[i];
        }
      }
      this.$router.replace({
        path: "/indexHome/myWallet",
        query: {
          addressBTC: this.allWalletListBTC[index].address,
        },
      });
      this.newWalletList = this.allWalletListBTC[index];
      //查询资产和币价方法
      assetBTC(this, this.newWalletList.address);
      this.getPrice("huoBiExchange", "btc_usdt");

      //===========================
    },
    //1.0切换钱包
    changeWallet(index) {
      this.show = false;
      this.walletLogo = require("../assets/img/logoBhp1Mini.png");
      this.walletType = "BHP";
      for (let i in this.allWalletList) {
        if (this.allWalletList[i].address == this.$route.query.address1) {
          this.newWalletList = this.allWalletList[i];
        }
      }
      this.$router.replace({
        path: "/indexHome/myWallet",
        query: {
          address1: this.allWalletList[index].address,
        },
      });
      this.newWalletList = this.allWalletList[index];
      assetes(this, this.newWalletList.address);
      this.getPrice("digfinExchange", "bhp_usdt");
    },
    //2.0切换钱包
    changeWallet2(index) {
      this.show = false;
      for (let i in this.allWalletList2) {
        if (this.allWalletList2[i].address == this.$route.query.address2) {
          this.newWalletList = this.allWalletList2[i];
        }
      }
      this.walletLogo = require("../assets/img/logoBhp2.png");
      this.walletType = "BHP2";
      this.$router.replace({
        path: "/indexHome/myWallet",
        query: {
          address2: this.allWalletList2[index].address,
        },
      });
      this.newWalletList = this.allWalletList2[index];
      assetes2(this, this.newWalletList.address);
      this.getPrice("digfinExchange", "bhp_usdt");
    },
    toTransferRecords1(val, name, ETHAsstesSum) {
      if (val == "BHP") {
        this.$router.push({
          path: "/transferRecords1",
          query: {
            address1: this.newWalletList.address,
          },
        });
      } else if (val == "FIL") {
        this.$router.push({
          path: "/transferRecords1",
          query: {
            addressFIL: this.newWalletList.address,
          },
        });
      } else if (val == "BHP2") {
        this.$router.push({
          path: "/transferRecords1",
          query: {
            address2: this.newWalletList.address,
          },
        });
      }else if (val == "BTC") {
        this.$router.push({
          path: "/transferRecords1",
          query: {
            addressBTC: this.newWalletList.address,
          },
        });
      } else if (val == "ETH") {
        if ((name !="ETH")) {
          this.$router.push({
            path: "/transferRecords1",
            query: {
              addressETH: this.newWalletList.address,
              name: name,
              ETHAsstesSum: ETHAsstesSum,
            },
          });
        } else {
          this.$router.push({
            path: "/transferRecords1",
            query: {
              addressETH: this.newWalletList.address,
            },
          });
        }
      }
    },
    onRefresh() {
      this.timer = setTimeout(() => {
        this.isLoading = false;
        location.reload();
      }, 1000);
    },
    changeWalletsBox(val) {
      this.walletRightType = val;
      if (val == "FIL") {
        allAssetesFIL(this); //进入fil钱包再加载
      }
    },
    toWalletsManage() {
      this.$router.push("/walletsManage");
    },
    //获取币价
    getPrice(exchange, usdt) {
      all_getPrice(exchange, usdt).then((res) => {
        if (res.data.data) {
          if (localStorage.getItem("lang") == "cn") {
            this.cnyPrice = res.data.data.cnyPrice;
            this.symbols = "¥";
          } else {
            this.cnyPrice = res.data.data.usdPrice;
            this.symbols = "$";
          }
        } else {
          this.cnyPrice = 0;
        }
      });
    },
    getAssetName(assetId) {
      switch (assetId) {
        case "0x07d8f52825899ce08dc2d3d8f4eda62dcaef0035719fcaa267fcdef6bd70c95c":
          return "BCNX";
          break;
        case "0x13f76fabfe19f3ec7fd54d63179a156bafc44afc53a7f07a7a15f6724c0aa854":
          return "BHP";
          break;
        case "0x2175cd1114136407eed988ba2b498cc51cb33d75b283674c3d9ce4f2336e1c6d":
          return "HUSDT";
          break;
        case "0x25649bf8df8c8eb3ce565db6ccb18fb873de9d1378e2d5714ceb8c0ab444d326":
          return "HETH";
          break;
        case "0xa60b5dbb2b50022e3179a5a129b4d90bbb5bf5caabc40893fcdb83703e751225":
          return "BHPGas";
          break;
        case "0xb58f03b3a33a82b2928fd04b2d9fefd514580a0ce0a094fb13602c2e3277005e":
          return "HLTC";
          break;
        case "0xe0f40ba2958954555e2e5b0dd4e9591d923e2913a036cc301b32d5b7e1144667":
          return "TH";
          break;
        case "0xf06e0b6c3ed5aea2a4ece4df0dab3c074805347650dba18d9deb3189dd5aea68":
          return "HBTC";
          break;
      }
    },
    toMyDapp() {
      this.$router.push({
        path: "/indexHome/myDapp",
        query: {
          address: this.newWalletList.address,
          walletType: this.walletType,
        },
      });
    },
    createWallet() {
      this.show = false; //主页有缓存，不然返回主页会自动打开侧边栏
      this.$router.push("/changeCreateWallet");
    },
    leadWallet() {
      this.show = false;
      this.$router.push("/changeLeadWallet");
    },
    toTransferRecords() {},
    showPopup() {
      this.show = true;
    },
    toReceiving() {
      //还要把钱包类型也传过去=======================
      this.$router.push({
        path: "/indexHome/receiving",
        query: {
          address: this.newWalletList.address,
          name: this.newWalletList.name,
          walletType: this.walletType,
        },
      });
    },
    toTransfer() {
      //这里要判断各种情况==================比如新进入的钱包，切换的钱包
      if (this.walletType == "BHP") {
        this.$router.push({
          path: "/indexHome/transfer",
          query: {
            address1: this.newWalletList.address,
            name: this.newWalletList.name,
          },
        });
      } else if (this.walletType == "BHP2") {
        this.$router.push({
          path: "/indexHome/transfer",
          query: {
            address2: this.newWalletList.address,
            name: this.newWalletList.name,
          },
        });
      } else if (this.walletType == "ETH") {
        this.$router.push({
          path: "/indexHome/transfer",
          query: {
            addressETH: this.newWalletList.address,
            name: this.newWalletList.name,
          },
        });
      } else if (this.walletType == "FIL") {
        this.$router.push({
          path: "/indexHome/transfer",
          query: {
            addressFIL: this.newWalletList.address,
            name: this.newWalletList.name,
          },
        });
      } else if (this.walletType == "BTC") {
        this.$router.push({
          path: "/indexHome/transfer",
          query: {
            addressBTC: this.newWalletList.address,
            name: this.newWalletList.name,
          },
        });
      }
    },
    startRecognize() {
      //这里要判断各种情况========
      if (this.walletType == "BHP") {
        this.$router.push({
          path: "/indexHome/startRecognize",
          query: {
            address1: this.newWalletList.address,
            name: this.newWalletList.name,
          },
        });
      } else if (this.walletType == "BHP2") {
        this.$router.push({
          path: "/indexHome/startRecognize",
          query: {
            address2: this.newWalletList.address,
            name: this.newWalletList.name,
          },
        });
      } else if (this.walletType == "ETH") {
        this.$router.push({
          path: "/indexHome/startRecognize",
          query: {
            addressETH: this.newWalletList.address,
            name: this.newWalletList.name,
          },
        });
      } else if (this.walletType == "FIL") {
        this.$router.push({
          path: "/indexHome/startRecognize",
          query: {
            addressFIL: this.newWalletList.address,
            name: this.newWalletList.name,
          },
        });
      } else if (this.walletType == "BTC") {
        this.$router.push({
          path: "/indexHome/startRecognize",
          query: {
            addressBTC: this.newWalletList.address,
            name: this.newWalletList.name,
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.mywallet {
  overflow: auto;
  padding-top: 88px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  min-height: calc(100vh - 88px);
  .active {
    font-weight: 700;
    color: #000;
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
      justify-content: center;
      align-items: center;
    }
    .van-loading__spinner {
      width: 80px;
      height: 80px;
      margin: 0 auto;
    }
  }
  .popup {
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
        }
      }
      .main {
        width: 100%;
        // height: 600px;
        overflow: auto;
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
        .walletsBoxBTC {
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
  .top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    background: #fff;
    box-shadow: 6px 12px 12px rgba(58, 107, 252, 0.05);

    .top1 {
      padding: 0 40px;
      height: 88px;
      padding-top: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      span {
        font-size: 48px;
        font-family: Arial-BoldMT, Arial;
        font-weight: bold;
        color: #393a49;
        letter-spacing: 1px;
      }
      img {
        width: 48px;
        height: 38px;
      }
    }
  }
  .asset {
    display: flex;
    height: 352px;
    border-radius: 21px;
    width: 630px;
    margin-top: 30px;
    margin-bottom: 40px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background: url("../assets/img/walletBanner1.png") no-repeat;
    background-size: 100% 100%;
    padding-left: 40px;
    // box-shadow: 6px 12px 12px #ddd;
    box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.12);
    position: relative;
    .addressMsg {
      font-size: 20px;
      width: 500px;
      word-break: break-all;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);
      margin-top: 20px;
    }

    .walletName {
      height: 27px;
      font-size: 24px;
      font-family: ArialMT;
      color: #000;
      margin: 56px 0 56px;
      align-self: flex-start;
    }
    .walletManege {
      position: absolute;
      top: 40px;
      right: 40px;
      width: 50px;
      height: 50px;
    }
    .walletCode {
      position: absolute;
      bottom: 40px;
      right: 40px;
      width: 50px;
      height: 50px;
    }
    p {
      margin: 0 0 10px;
      font-size: 28px;
      font-family: ArialMT;
      color: #ffffff;
      line-height: 32px;
      letter-spacing: 1px;
    }

    h2 {
      margin: 0 0 10px;
      height: 67px;
      font-size: 48px;
      font-family: Arial-BoldMT, Arial;
      font-weight: bold;
      color: #ffffff;
      line-height: 69px;
      letter-spacing: 2px;
      span {
        font-size: 32px;
        position: relative;
        top: -4px;
      }
    }
    span {
      height: 33px;
      font-size: 24px;
      font-family: ArialMT;
      color: #ffffff;
      line-height: 28px;
    }
  }
  .asset2 {
    background: url("../assets/img/walletBanner2.png") no-repeat;
    background-size: 100% 100%;
  }
  .assetFIL {
    background: url("../assets/img/walletBannerFIL.png") no-repeat;
    background-size: 100% 100%;
  }
  .assetETH {
    background: url("../assets/img/walletBannerETH.png") no-repeat;
    background-size: 100% 100%;
  }
  .assetBTC {
    background: url("../assets/img/walletBannerBTC.png") no-repeat;
    background-size: 100% 100%;
  }
  .transaction {
    display: flex;
    padding: 0 40px;
    justify-content: space-between;
    align-items: center;
    margin-right: 0;
    .box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      img {
        width: 112px;
        height: 112px;
        margin-bottom: 16px;
        box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.12);
        border-radius: 50%;
      }
      span {
        font-size: 28px;
        font-family: ArialMT;
        color: #7d8697;
      }
    }
  }
  .assetTitle {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    width: 660px;
    font-size: 32px;
    font-family: Arial-BoldMT, Arial;
    font-weight: bold;
    color: #393a49;
    line-height: 37px;
    margin: 30px 0;
    align-self: flex-start;
    img {
      width: 40px;
      height: 40px;
      padding: 20px 0 20px 20px;
    }
  }
  .assetsList {
    list-style: none;
    padding: 0;
    margin: 0;
    padding-bottom: 120px;
    li {
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // padding: 0 70px;
      width: 670px;
      height: 128px;
      background: #ffffff;
      box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.12);
      border-radius: 16px;
      margin-bottom: 30px;

      .assetName {
        font-size: 32px;
        font-family: Arial-BoldMT, Arial;
        font-weight: bold;
        color: #393a49;

        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 72px;
          height: 72px;
          margin-left: 40px;
          margin-right: 20px;
        }
      }
      .assetDiv {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-right: 40px;
        span {
          font-size: 32px;
          font-family: Arial-BoldMT, Arial;
          font-weight: bold;
          color: #393a49;
        }
        i {
          font-size: 24px;
          font-family: ArialMT;
          color: #999999;
          line-height: 28px;
          font-style: normal;
          text-align: center;
        }
      }
    }
    li:last-child {
      margin-bottom: 6px;
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
    z-index: 1;
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