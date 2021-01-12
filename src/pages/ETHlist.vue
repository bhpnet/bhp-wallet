<template>
  <div class="ETHlist">
    <div class="loading" v-show="loading">
      <van-loading color="#1989fa" class="loadImg" size="24px" vertical></van-loading>
    </div>
    <div class="ETHlist1">
      <van-popup
        class="popup"
        v-model="showBottom"
        position="bottom"
        :style="{ height: '18%',width:'100% '}"
      >
        <ul>
          <li>
            <van-swipe-cell class="swipeCell" :disabled="true">
              <img class="logoImg" :src="searchBottom.logo" alt />
              <div class="main">
                <h3>{{searchBottom.name}}</h3>
                <span>{{addressEllipsis(searchBottom.address)}}</span>
              </div>
              <img
                v-show="!searchBottom.status"
                @click="addSearch()"
                class="addImg"
                src="../assets/img/addETH.png"
                alt
              />
              <img
                v-show="searchBottom.status"
                class="addImg"
                src="../assets/img/sure.png"
                alt
              />

              <template #right>
                <van-button square type="danger" @click="deleteWalletETH()">
                  <img src="../assets/img/deleteImg.png" alt />
                  <span>{{$t('message.text24')}}</span>
                </van-button>
              </template>
            </van-swipe-cell>
          </li>
        </ul>
      </van-popup>
      <div class="top">
        <div class="top1">
          <img class="return1" @click="clickReturn()" src="../assets/img/return1.png" alt />
          <div class="inpDiv">
            <input type="text" v-model="contractAbiAddress" placeholder="Enter contract addre" />
            <img class="search" src="../assets/img/search.png" alt />
          </div>
          <button @click="addContractAbi()" class="searchBtn">搜索</button>
        </div>
      </div>
      <ul class="mainUl">
        <li v-for="(v,i) of this.ETHlist" :key="i">
          <van-swipe-cell class="swipeCell" :disabled="v.status==false">
            <img class="logoImg" :src="v.logo" alt />
            <div class="main">
              <h3>{{v.name}}</h3>
              <span>{{addressEllipsis(v.address)}}</span>
            </div>
            <img
              v-show="!v.status"
              @click="addWalletETH(v,i)"
              class="addImg"
              src="../assets/img/addETH.png"
              alt
            />
            <img
              @click="cancelWalletETH(v,i)"
              v-show="v.status"
              class="addImg"
              src="../assets/img/sure.png"
              alt
            />

            <template #right>
              <van-button square type="danger" @click="deleteWalletETH(v,i)">
                <img src="../assets/img/deleteImg.png" alt />
                <span>{{$t('message.text24')}}</span>
              </van-button>
            </template>
          </van-swipe-cell>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { Dialog } from "vant";
const Web3 = require("web3");
const ethers = require('ethers')

export default {
  data() {
    return {
      loading: false,
      showBottom: false,
      searchBottom: {},
      msg2: "Are you sure to delete?",
      msg1: "Confirm",
      msg3: "Cancel",
      msg4: "Enter contract addre",
      msg5: "Added successfully!",
      msg6: "Add failed!",
      contractAbiAddress: "",
      obj: { name: "", logo: "", status: false, address: "" },
      selectETHlist: [
        {
          logo: require("../assets/img/USDT.png"),
          name: "USDT",
          address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
          status: true
        },
     
      ],
      ETHlist: [
        {
          logo: require("../assets/img/Dai.png"),
          name: "Dai",
          address: "0x6b175474e89094c44da98b954eedeac495271d0f",
          status: false
        },
        {
          logo: require("../assets/img/Wrapped.png"),
          name: "WBTC",
          address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
          status: false
        },
        {
          logo: require("../assets/img/YFI.png"),
          name: "YFI",
          address: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
          status: false
        },
        {
          logo: require("../assets/img/UNI.png"),
          name: "UNI",
          address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
          status: false
        },
        {
          logo: require("../assets/img/YFII.png"),
          name: "YFII",
          address: "0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83",
          status: false
        },
        {
          logo: require("../assets/img/LEND.png"),
          name: "LEND",
          address: "0x80fB784B7eD66730e8b1DBd9820aFD29931aab03",
          status: false
        },
        {
          logo: require("../assets/img/LINK.png"),
          name: "LINK",
          address: "0x514910771af9ca656af840dff83e8264ecf986ca",
          status: false
        },
        {
          logo: require("../assets/img/USDT.png"),
          name: "USDT",
          address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
          status: true
        },
        {
          logo: require("../assets/img/USDC.png"),
          name: "USDC",
          address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          status: false
        },
        {
          logo: require("../assets/img/Compound.png"),
          name: "COMP",
          address: "0xc00e94cb662c3520282e6f5717214004a7f26888",
          status: false
        }
      ]
    };
  },
  created() {
    if (JSON.parse(localStorage.getItem("selectETHlist"))) {
      this.selectETHlist = JSON.parse(localStorage.getItem("selectETHlist"));
    } else {
      localStorage.setItem("selectETHlist", JSON.stringify(this.selectETHlist));
    }
    if (JSON.parse(localStorage.getItem("ETHlist"))) {
      this.ETHlist = JSON.parse(localStorage.getItem("ETHlist")); //列表页面默认显示的ETH列表
    } else {
      localStorage.setItem("ETHlist", JSON.stringify(this.ETHlist));
    }
    if (localStorage.getItem("lang") == "cn") {
      this.msg2 = "确认删除吗？";
      this.msg1 = "确认";
      this.msg3 = "取消";
      this.msg4 = "请输入合约地址";
      this.msg5 = "添加成功！";
      this.msg6 = "添加失败！";
      this.msg7 = "请输入正确的合约地址！";
    } else {
      this.msg2 = "Are you sure to delete?";
      this.msg1 = "Confirm";
      this.msg3 = "Cancel";
      this.msg4 = "Enter contract addre";
      this.msg5 = "Added successfully!";
      this.msg6 = "Add failed!";
      this.msg7 = "Please enter the correct contract address!";
    }
  },
  methods: {
    clickReturn() {
      this.$router.go(-1);
    },

    async addContractAbi() {
      if (ethers.utils.isAddress(this.contractAbiAddress)) {
        this.loading = true;
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
        await web3.eth.getCode(this.contractAbiAddress).then(res => {
          if (res === "0x") {
            Toast.fail(this.msg7);
            this.loading = false;
          } else {
            let contractAddress = this.contractAbiAddress;
            // 定义合约abi
            let contractAbi = [
              {
                constant: true,
                inputs: [],
                name: "mintingFinished",
                outputs: [{ name: "", type: "bool" }],
                payable: false,
                stateMutability: "view",
                type: "function"
              },
              {
                constant: true,
                inputs: [],
                name: "name",
                outputs: [{ name: "", type: "string" }],
                payable: false,
                stateMutability: "view",
                type: "function"
              },
              {
                constant: false,
                inputs: [
                  { name: "_spender", type: "address" },
                  { name: "_value", type: "uint256" }
                ],
                name: "approve",
                outputs: [{ name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function"
              },
              {
                constant: true,
                inputs: [],
                name: "totalSupply",
                outputs: [{ name: "", type: "uint256" }],
                payable: false,
                stateMutability: "view",
                type: "function"
              },
              {
                constant: false,
                inputs: [
                  { name: "_from", type: "address" },
                  { name: "_to", type: "address" },
                  { name: "_value", type: "uint256" }
                ],
                name: "transferFrom",
                outputs: [{ name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function"
              },
              {
                constant: true,
                inputs: [],
                name: "decimals",
                outputs: [{ name: "", type: "uint8" }],
                payable: false,
                stateMutability: "view",
                type: "function"
              },
              {
                constant: true,
                inputs: [],
                name: "cap",
                outputs: [{ name: "", type: "uint256" }],
                payable: false,
                stateMutability: "view",
                type: "function"
              },
              {
                constant: false,
                inputs: [],
                name: "unpause",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function"
              },
              {
                constant: false,
                inputs: [
                  { name: "_to", type: "address" },
                  { name: "_amount", type: "uint256" }
                ],
                name: "mint",
                outputs: [{ name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function"
              },
              {
                constant: false,
                inputs: [{ name: "_value", type: "uint256" }],
                name: "burn",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function"
              },
              {
                constant: true,
                inputs: [],
                name: "paused",
                outputs: [{ name: "", type: "bool" }],
                payable: false,
                stateMutability: "view",
                type: "function"
              },
              {
                constant: false,
                inputs: [
                  { name: "_spender", type: "address" },
                  { name: "_subtractedValue", type: "uint256" }
                ],
                name: "decreaseApproval",
                outputs: [{ name: "success", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function"
              },
              {
                constant: true,
                inputs: [{ name: "_owner", type: "address" }],
                name: "balanceOf",
                outputs: [{ name: "balance", type: "uint256" }],
                payable: false,
                stateMutability: "view",
                type: "function"
              },
              {
                constant: false,
                inputs: [],
                name: "finishMinting",
                outputs: [{ name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function"
              },
              {
                constant: false,
                inputs: [],
                name: "pause",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function"
              },
              {
                constant: true,
                inputs: [],
                name: "owner",
                outputs: [{ name: "", type: "address" }],
                payable: false,
                stateMutability: "view",
                type: "function"
              },
              {
                constant: true,
                inputs: [],
                name: "symbol",
                outputs: [{ name: "", type: "string" }],
                payable: false,
                stateMutability: "view",
                type: "function"
              },
              {
                constant: false,
                inputs: [
                  { name: "_to", type: "address" },
                  { name: "_value", type: "uint256" }
                ],
                name: "transfer",
                outputs: [{ name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function"
              },
              {
                constant: false,
                inputs: [
                  { name: "_spender", type: "address" },
                  { name: "_addedValue", type: "uint256" }
                ],
                name: "increaseApproval",
                outputs: [{ name: "success", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function"
              },
              {
                constant: true,
                inputs: [
                  { name: "_owner", type: "address" },
                  { name: "_spender", type: "address" }
                ],
                name: "allowance",
                outputs: [{ name: "", type: "uint256" }],
                payable: false,
                stateMutability: "view",
                type: "function"
              },
              {
                constant: false,
                inputs: [{ name: "newOwner", type: "address" }],
                name: "transferOwnership",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function"
              },
              {
                inputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "constructor"
              },
              {
                anonymous: false,
                inputs: [
                  { indexed: true, name: "burner", type: "address" },
                  { indexed: false, name: "value", type: "uint256" }
                ],
                name: "Burn",
                type: "event"
              },
              { anonymous: false, inputs: [], name: "Pause", type: "event" },
              { anonymous: false, inputs: [], name: "Unpause", type: "event" },
              {
                anonymous: false,
                inputs: [
                  { indexed: true, name: "to", type: "address" },
                  { indexed: false, name: "amount", type: "uint256" }
                ],
                name: "Mint",
                type: "event"
              },
              {
                anonymous: false,
                inputs: [],
                name: "MintFinished",
                type: "event"
              },
              {
                anonymous: false,
                inputs: [
                  { indexed: true, name: "owner", type: "address" },
                  { indexed: true, name: "spender", type: "address" },
                  { indexed: false, name: "value", type: "uint256" }
                ],
                name: "Approval",
                type: "event"
              },
              {
                anonymous: false,
                inputs: [
                  { indexed: true, name: "from", type: "address" },
                  { indexed: true, name: "to", type: "address" },
                  { indexed: false, name: "value", type: "uint256" }
                ],
                name: "Transfer",
                type: "event"
              }
            ];
            // 定义合约
            let myContract = new web3.eth.Contract(
              contractAbi,
              contractAddress
            );
            this.getOtherERCSymbol(myContract);
          }
        });
      } else {
        Toast.fail(this.msg7);
      }
    },
    getOtherERCSymbol(currentContract, address) {
      let that = this;
      // 获取代币符号
      let flag = true;
      currentContract.methods
        .symbol()
        .call({ from: address }, function(error, result) {
          if (!error) {
            // console.log(result);
            that.obj.name = result;
            that.obj.address = that.contractAbiAddress;
            switch (that.contractAbiAddress) {
              case "0x6b175474e89094c44da98b954eedeac495271d0f":
                that.obj.logo = require("../assets/img/Dai.png");
                break;
              case "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599":
                that.obj.logo = require("../assets/img/Wrapped.png");
                break;
              case "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e":
                that.obj.logo = require("../assets/img/YFI.png");
                break;
              case "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984":
                that.obj.logo = require("../assets/img/UNI.png");
                break;
              case "0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83":
                that.obj.logo = require("../assets/img/YFII.png");
                break;
              case "0x80fB784B7eD66730e8b1DBd9820aFD29931aab03":
                that.obj.logo = require("../assets/img/LEND.png");
                break;
              case "0x514910771af9ca656af840dff83e8264ecf986ca":
                that.obj.logo = require("../assets/img/LINK.png");
                break;
              case "0xdac17f958d2ee523a2206206994597c13d831ec7":
                that.obj.logo = require("../assets/img/USDT.png");
                break;
              case "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48":
                that.obj.logo = require("../assets/img/USDC.png");
                break;
              case "0xc00e94cb662c3520282e6f5717214004a7f26888":
                that.obj.logo = require("../assets/img/Compound.png");
                break;
              default:
                that.obj.logo = require("../assets/img/WEIZHI.png");
                break;
            }
            that.obj.status = false;
            for (let index in that.ETHlist) {
              if (that.ETHlist[index].address == that.obj.address) {
                that.obj.status = true; //判断搜索的是不是已经添加过了，状态要赋值
              }
            }
            that.searchBottom = that.obj; //搜索的东西显示到搜索列表上
            that.contractAbiAddress = "";
            that.loading = false;
            that.showBottom = true;
          } else {
            Toast.fail(that.msg6);
          }
        });
    },
    addWalletETH(v, i) {
      for (let index in this.ETHlist) {
        if (index == i) {
          if (!this.ETHlist[index].status) {
            //状态为false才可以添加
            this.ETHlist[index].status = true;

            this.selectETHlist.push(this.ETHlist[index]);
            localStorage.setItem(
              "selectETHlist",
              JSON.stringify(this.selectETHlist)
            );
          }
        }
      }
      localStorage.setItem("ETHlist", JSON.stringify(this.ETHlist)); //添加之后也要同步改变本地存储ETHlist的staus
    },
    addSearch() {
      let that = this;
      let flag = false
      if (!that.searchBottom.status) {
        that.searchBottom.status = true; //把状态改成添加
        //如果不重复，就添加，重复就更改
        for(let i in this.ETHlist) {
          if(that.ETHlist[i].address == that.searchBottom.address){
            that.ETHlist[i].status = true
            flag = true
            that.selectETHlist.push(that.searchBottom);//同时添加进selectETHlist
          }
        }
        if(!flag){
        that.ETHlist.push(that.searchBottom);
        that.selectETHlist.push(that.searchBottom);
        }
        localStorage.setItem(
          "selectETHlist",
          JSON.stringify(that.selectETHlist)
        );
        localStorage.setItem("ETHlist", JSON.stringify(that.ETHlist));
        Toast.success(that.msg5);
      }
    },
    cancelWalletETH(v, i) {
      for (let index in this.ETHlist) {
        if (index == i) {
          if (this.ETHlist[index].status) {
            this.ETHlist[index].status = false;

            for (let index1 in this.selectETHlist) {
              if (this.selectETHlist[index1].address == this.ETHlist[index].address) {
                this.selectETHlist.splice(index1, 1);
                localStorage.setItem(
                  "selectETHlist",
                  JSON.stringify(this.selectETHlist)
                );
              }
            }
          }
        }
      }
      localStorage.setItem("ETHlist", JSON.stringify(this.ETHlist));
    },
    deleteWalletETH(v, i) {
      for (let index in this.ETHlist) {
        if (index == i) {
          Dialog.confirm({
            message: this.msg2,
            confirmButtonText: this.msg1,
            cancelButtonText: this.msg3
          })
            .then(() => {
              for (let index1 in this.selectETHlist) {
                
                if (
                  this.selectETHlist[index1].address == this.ETHlist[index].address
                ) {
                  this.selectETHlist.splice(index1, 1);
                  localStorage.setItem(
                    "selectETHlist",
                    JSON.stringify(this.selectETHlist)
                  );
                }
              }
              this.ETHlist.splice(i, 1); //写后面，不然会影响上面索引顺序
              localStorage.setItem("ETHlist", JSON.stringify(this.ETHlist));
            })
            .catch(() => {});
        }
      }
    },
    addressEllipsis(addressMsg) {
      if (typeof addressMsg != "undefined") {
        //不写，搜索之后会报错Cannot read property 'substr' of undefined"
        let address = addressMsg;
        address =
          address.substr(0, 8) +
          "..." +
          address.substr(address.length - 11, address.length);
        return address;
      } else {
        let address = "";
        return address;
      }
    }
  }
};
</script>

<style lang="less" >
.ETHlist {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
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
  .ETHlist1 {
    position: relative;
    height: 100vh;
    overflow-y: auto;
    .top {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 99;
      .top1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #ffffff;
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.18);
        .return1 {
          width: 26px;
          height: 46px;
          padding: 22px 0 22px 40px;
        }
        .inpDiv {
          width: 470px;
          height: 66px;
          background: #f0f2f5;
          border-radius: 33px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          input {
            border: none;
            background: rgba(0, 0, 0, 0);
            outline: none;
            padding: 0;
            height: 66px;
            margin-left: 111px;
          font-size: 24px;
            width: 330px;
          }
          .search {
            position: absolute;
            left: 58px;
            top: 17px;
            width: 33px;
            height: 33px;
          }
        }
        .searchBtn {
          width: 127px;
          height: 66px;
          background: #4377ff;
          border-radius: 33px;
          margin-right: 40px;
          border: none;
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
    .mainUl {
      height: calc(100vh - 100px);
      padding-top: 88px;
    }
    ul {
      overflow: auto;
      list-style: none;
      padding: 0 40px 0 40px;
      li {
        list-style: none;
        position: relative;
        border-bottom: 1px solid rgba(230, 233, 237, 1);
        height: 140px;
        .swipeCell {
          width: 100%;
          height: 140px;

          .van-swipe-cell__wrapper {
            width: 100% !important;
            height: 140px;

            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          .van-button {
            width: 163px;
            height: 140px !important;
            background: #ff3d3d;
            box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.1);

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
          .logoImg {
            width: 82px;
            height: 82px;
            padding: 0;
            margin-right: 16px;
          }
          .main {
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            align-items: flex-start;
            h3 {
              height: 40px;
              font-size: 28px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #393a49;
              line-height: 40px;
              margin: 0;
            }
            span {
              height: 33px;
              font-size: 24px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
              line-height: 33px;
            }
          }
          .addImg {
            width: 44px;
            padding: 0;
            height: 44px;
            position: absolute;
            top: 48px;
            right: 0;
          }
        }
      }
      li:last-child {
        border-bottom: none;
      }
    }
    .feeter {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 140px;
      background: #ffffff;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.18);
      .feeter1 {
        height: 140px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          width: 640px;
          height: 88px;
          background: #4377ff;
          border-radius: 44px;
          font-size: 32px;
          font-family: ArialMT;
          color: #ffffff;
          line-height: 37px;
          padding: 0;
          border: none;
        }
      }
    }
  }
}
</style>