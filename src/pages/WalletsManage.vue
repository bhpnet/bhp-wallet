<template>
  <div class="walletsManage">
    <div class="loading" v-show="loading">
      <van-loading color="#1989fa" class="loadImg" />
    </div>
    <img @click="clickReturn()" src="../assets/img/return1.png" alt />
    <h2 style="font-weight:bold" v-text="$t('message.text1')">钱包管理</h2>
    <div class="maxDiv">
      <div class="main">
        <van-swipe-cell
          v-show="walletType=='ETH'"
          class="swipeCell"
          v-for="(v,i) of this.allWalletListETH"
          :key="v.address"
        >
          <div class="box ETHbox" @click="showTrue(i)">
            <div class="walletName">
              <span>{{v.name}}</span>
              <i class="BHPi" v-text="$t('message.text90')">Backup</i>
            </div>

            <p>
              <span>{{v.assets?v.assets.toFixed(4):0}}</span> ETH
            </p>
            <p class="address">
              <img src="../assets/img/copy.png" alt />

              <span>{{v.address}}</span>
            </p>
          </div>

          <template #right>
            <van-button square type="danger" @click="deleteWalletETH(v,i)">
              <img src="../assets/img/deleteImg.png" alt />
              <span>{{$t('message.text24')}}</span>
            </van-button>
          </template>
        </van-swipe-cell>
        <van-swipe-cell
          v-show="walletType=='BTC'"
          class="swipeCell"
          v-for="(v,i) of this.allWalletListBTC"
          :key="v.address"
        >
          <div class="box BTCbox" @click="showTrue(i)">
            <div class="walletName">
              <span>{{v.name}}</span>
              <i class="BHPi" v-text="$t('message.text90')">Backup</i>
            </div>

            <p>
              <span>{{v.assets?v.assets.toFixed(4):0}}</span> BTC
            </p>
            <p class="address">
              <img src="../assets/img/copy.png" alt />

              <span>{{v.address}}</span>
            </p>
          </div>

          <template #right>
            <van-button square type="danger" @click="deleteWalletBTC(v,i)">
              <img src="../assets/img/deleteImg.png" alt />
              <span>{{$t('message.text24')}}</span>
            </van-button>
          </template>
        </van-swipe-cell>
        <van-swipe-cell
          v-show="walletType=='BHP'"
          class="swipeCell"
          v-for="(v,i) of this.allWalletList"
          :key="v.address"
        >
          <div class="box BHPbox" @click="showTrue(i)">
            <div class="walletName">
              <span>{{v.name}}</span>
              <i class="BHPi" v-text="$t('message.text90')">Backup</i>
            </div>

            <p>
              <span>{{v.assets?v.assets.toFixed(4):0}}</span> BHP
            </p>
            <p class="address">
              <img src="../assets/img/copy.png" alt />

              <span>{{v.address}}</span>
            </p>
          </div>

          <template #right>
            <van-button square type="danger" @click="deleteWallet1(v,i)">
              <img src="../assets/img/deleteImg.png" alt />
              <span>{{$t('message.text24')}}</span>
            </van-button>
          </template>
        </van-swipe-cell>

        <van-swipe-cell
          v-show="walletType=='BHP2'"
          class="swipeCell"
          v-for="(v,i) of this.allWalletList2"
          :key="v.address"
        >
          <div class="box BHP2box" @click="showTrue(i)">
            <div class="walletName">
              <span>{{v.name}}</span>

              <i class="BHP2i" v-text="$t('message.text90')">Backup</i>
            </div>

            <p>
              <span>{{v.assets?v.assets.toFixed(4):0}}</span> BHP
            </p>
            <p class="address">
              <img src="../assets/img/copy.png" alt />

              <span>{{v.address}}</span>
            </p>
          </div>

          <template #right>
            <van-button square type="danger" @click="deleteWallet2(v,i)">
              <img src="../assets/img/deleteImg.png" alt />
              <span>{{$t('message.text24')}}</span>
            </van-button>
          </template>
        </van-swipe-cell>

        <van-swipe-cell
          v-show="walletType=='FIL'"
          class="swipeCell"
          v-for="(v,i) of this.allWalletListFIL"
          :key="v.address"
        >
          <div class="box FILbox" @click="showTrue(i)">
            <div class="walletName">
              <span>{{v.name}}</span>

              <i class="FILi" v-text="$t('message.text90')">Backup</i>
            </div>

            <p>
              <span>{{v.assets?v.assets.toFixed(4):0}}</span> BHP
            </p>
            <p class="address">
              <img src="../assets/img/copy.png" alt />

              <span>{{v.address}}</span>
            </p>
          </div>

          <template #right>
            <van-button square type="danger" @click="deleteWalletFIL(v,i)">
              <img src="../assets/img/deleteImg.png" alt />
              <span>{{$t('message.text24')}}</span>
            </van-button>
          </template>
        </van-swipe-cell>
      </div>
      <div class="changeDiv">
        <img
          v-show="walletType=='BTC'"
          :class="walletType=='BTC'?'active':''"
          @click="changeWalletsBox('BTC')"
          src="../assets/img/BTC.png"
          alt
        />
        <img
          v-show="walletType!='BTC'"
          :class="walletType=='BTC'?'active':''"
          @click="changeWalletsBox('BTC')"
          src="../assets/img/BTC1.png"
          alt
        />
        <img
          v-show="walletType=='ETH'"
          :class="walletType=='ETH'?'active':''"
          @click="changeWalletsBox('ETH')"
          src="../assets/img/ETCsider.png"
          alt
        />
        <img
          v-show="walletType!='ETH'"
          :class="walletType=='ETH'?'active':''"
          @click="changeWalletsBox('ETH')"
          src="../assets/img/ETCsider1.png"
          alt
        />
        <!-- <img
          v-show="walletType=='FIL'"
          :class="walletType=='FIL'?'active':''"
          @click="changeWalletsBox('FIL')"
          src="../assets/img/FIL.png"
          alt
        />
        <img
          v-show="walletType!='FIL'"
          :class="walletType=='FIL'?'active':''"
          @click="changeWalletsBox('FIL')"
          src="../assets/img/FIL1.png"
          alt
        /> -->
        <img
          v-show="walletType=='BHP'"
          :class="walletType=='BHP'?'active':''"
          @click="changeWalletsBox('BHP')"
          src="../assets/img/BHPsider.png"
          alt
        />
        <img
          v-show="walletType!='BHP'"
          :class="walletType=='BHP'?'active':''"
          @click="changeWalletsBox('BHP')"
          src="../assets/img/BHPsider1.png"
          alt
        />
        <!-- <img
          v-show="walletType=='BHP2'"
          @click="changeWalletsBox('BHP2')"
          :class="walletType=='BHP2'?'active':''"
          src="../assets/img/BHP2sider.png"
          alt
        />
        <img
          v-show="walletType!='BHP2'"
          @click="changeWalletsBox('BHP2')"
          :class="walletType=='BHP2'?'active':''"
          src="../assets/img/BHP2sider1.png"
          alt
        /> -->
      </div>
    </div>
    <div class="createOrLead">
      <div class="createOrLead1">
        <button @click="createWallet()">
          <img src="../assets/img/createWallet.png" />
          {{$t('message.text16')}}
        </button>
        <button @click="leadWallet()" class="leadBtn">
          <img src="../assets/img/leadWallet.png" />
          {{$t('message.text17')}}
        </button>
      </div>
    </div>
    <van-popup v-model="show" position="bottom">
      <ul class="backUp">
        <li v-show="hideKey" @click="backUpKey()" v-text="$t('message.text3500')"></li>
        <li @click="backUpBip()" v-text="$t('message.text35')"></li>
        <li @click="show = false" v-text="$t('message.text04')" style="color:#FF3D3D"></li>
      </ul>
    </van-popup>

    <van-popup class="popupPWD" v-model="show1">
      <span v-text="$t('message.text11')">密码</span>
      <input type="password" :placeholder="$t('message.text3')" v-model="pass" />

      <div class="bottomDiv">
        <span @click="show1 = false" v-text="$t('message.text69')">Cancel</span>
        <span @click="surePWD1()" v-text="$t('message.text68')">OK</span>
      </div>
    </van-popup>
    <van-popup class="popupPWD" v-model="show2">
      <span v-text="$t('message.text11')">密码</span>
      <input type="password" :placeholder="$t('message.text3')" v-model="pass" />
      <div class="bottomDiv">
        <span @click="show2 = false" v-text="$t('message.text69')">Cancel</span>
        <span @click="surePWD2()" v-text="$t('message.text68')">OK</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  deleteETH,
  deleteBTC,
  deleteFIL,
  deleteBHP,
  deleteBHP2,
  surePWDPrivateKey,
  surePWDMnemonic
} from "../assets/js/index";
export default {
  created() {
    if (localStorage.getItem("lang") == "cn") {
      this.msg = "密码错误！";
      this.msg1 = "暂不支持该功能！";
      this.msg2 = "确认删除吗？";
      this.msg11 = "确认";
      this.msg33 = "取消";
    } else {
      this.msg = "Password error!";
      this.msg1 = "This function is not supported at the moment!";
      this.msg2 = "Are you sure to delete?";
      this.msg11 = "Confirm";
      this.msg33 = "Cancel";
    }
    this.allWalletList = JSON.parse(localStorage.getItem("accounts")) || [];
    this.allWalletList2 = JSON.parse(localStorage.getItem("accounts2")) || [];
    this.allWalletListBTC =
      JSON.parse(localStorage.getItem("accountsBTC")) || [];
    this.allWalletListFIL =
      JSON.parse(localStorage.getItem("accountsFIL")) || [];
    this.allWalletListETH =
      JSON.parse(localStorage.getItem("accountsETH")) || [];
    if (this.allWalletListETH.length != 0) {
      this.walletType = "ETH";
    }
    //  else if (this.allWalletList2.length != 0) {
    //   this.walletType = "BHP2";
    //   // this.hideKey = false;进页面默认显示 才写上
    // } else if (this.allWalletListFIL.length != 0) {
    //   this.walletType = "FIL";
    //   // this.hideKey = false;
    // } 
    else if (this.allWalletListBTC.length != 0) {
      this.walletType = "BTC";
    } else {
      this.walletType = "BHP";
    }

    if (
      this.allWalletList.length == 0 &&
      this.allWalletListETH.length == 0 &&
      this.allWalletListBTC.length == 0 
      // &&this.allWalletList2.length == 0 &&
      // this.allWalletListFIL.length == 0
    ) {
      this.$router.replace("/");
    }
  },
  methods: {
    deleteWalletETH(v, i) {
      deleteETH(this, i);
    },
    deleteWalletBTC(v, i) {
      deleteBTC(this, i);
    },
    deleteWalletFIL(v, i) {
      deleteFIL(this, i);
    },
    deleteWallet1(v, i) {
      deleteBHP(this, i);
    },
    deleteWallet2(v, i) {
      deleteBHP2(this, i);
    },
    changeWalletsBox(val) {
      this.walletType = val;
      if (val == "BHP2" || val == "FIL") {
        this.hideKey = false;
      } else {
        this.hideKey = true;
      }
    },
    createWallet() {
      this.$router.push("/changeCreateWallet");
    },
    leadWallet() {
      this.$router.push("/changeLeadWallet");
    },
    showTrue(i) {
      this.show = true;
      this.index = i;
    },
    clickReturn() {
      this.$router.go(-1);
    },
    backUpKey() {
      this.show1 = true;
      this.show = false;
    },
    backUpBip() {
      this.show2 = true;
      this.show = false;
    },
    //备份私钥输入密码
    surePWD1() {
      surePWDPrivateKey(this);
    },
    //备份助记词输入密码
    surePWD2() {
      surePWDMnemonic(this);
    }
  },
  data() {
    return {
      show: false,
      show1: false,
      show2: false,
      showDelete: false,
      pass: "",
      index: "",
      allWalletList: [],
      loading: false,
      walletType: "BHP",
      allWalletList: [],
      allWalletList2: [],
      allWalletListETH: [],
      allWalletListBTC: [],
      allWalletListFIL: [],
      msg: "Password error!",
      msg1: "This function is not supported at the moment!",
      msg2: "Are you sure to delete?",
      msg11: "Confirm",
      msg33: "Cancel",
      hideKey: true //若是BHP2.0，就隐藏备份私钥
    };
  }
};
</script>

<style lang="less" scoped>
.walletsManage {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .active {
    font-weight: 700;
    color: #000;
  }
  .maxDiv {
    width: 100%;
    display: flex;
    justify-content: space-between;
    // max-height: calc(100vh - 550px);

    .main {
      max-height: calc(100vh - 400px);
      overflow: auto;
      width: 610px;
      border-right: 1px solid #e6e9ed;
      .swipeCell {
        width: 100%;
        height: 234px;
        margin-bottom: 30px;
        .box {
          width: 548px;
          height: 234px;
          // background: blue;
          box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.1);
          border-radius: 22px;
          margin-bottom: 30px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          .walletName {
            padding: 0 38px;
            width: 460px;
            padding-top: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              font-size: 28px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #fff;
            }
            i {
              display: block;
              width: 120px;
              height: 40px;
              background: #fff;
              border-radius: 18px;
              line-height: 40px;
              text-align: center;
              font-style: normal;
              font-size: 20px;
            }
            .BHPi {
              color: #31b2cc;
            }
            .BHP2i {
              color: #4377ff;
            }
            .ETCi {
              color: #31b2cc;
            }
            .FILi {
              color: #43c1ca;
            }
          }
          p {
            padding-left: 38px;
            font-size: 36px;
            height: 60px;
            font-family: Arial-BoldMT, Arial;
            font-weight: normal;
            color: #fff;
            margin-top: 8px;
            margin-bottom: 8px;
            span {
              font-size: 48px;
              color: #fff;
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
              margin-right: 30px;
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
        .BHPbox {
          background: url("../assets/img/BHPchange.png") no-repeat;
          background-size: 100% 100%;
        }
        .BHP2box {
          background: url("../assets/img/BHP2change.png") no-repeat;
          background-size: 100% 100%;
        }
        .ETHbox {
          background: url("../assets/img/ETHchange.png") no-repeat;
          background-size: 100% 100%;
        }
        .FILbox {
          background: url("../assets/img/FILchange.png") no-repeat;
          background-size: 100% 100%;
        }
        .BTCbox {
          background: url("../assets/img/BTCchange.png") no-repeat;
          background-size: 100% 100%;
        }

        .van-button {
          width: 163px;
          height: 234px !important;
          background: #ff3d3d;
          box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.1);
          border-radius: 22px;
          outline: none;
          margin-left: 6px;
          span {
            font-size: 32px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ffffff;
          }
          img {
            width: 44px;
            height: 44px;
            padding: 0;
            display: block;
            margin: 0 auto;
          }
        }
      }
    }
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
  }

  .createOrLead {
    position: fixed;
    width: 630px;
    padding: 0 60px;
    border-top: 1px solid #ccc;

    bottom: 60px;
    left: 0;
    .createOrLead1 {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      width: 630px;
      height: 70px;
      button {
        width: 288px;
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
  .van-popup {
    // height: 354px;
    background: #ffffff;
    box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.12);
    border-radius: 24px 24px 0px 0px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .backUp {
      padding: 0;
      list-style: none;
      width: 100%;
      li {
        width: 100%;
        height: 115px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 115px;
        text-align: center;
        padding: 0;
        list-style: none;
      }
      li {
        border-bottom: 1px solid #e6e9ed;
      }
      li:last-child {
        border-bottom: none;
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
}
</style>