<template>
  <div class="addressManage">
    <div class="topImg">
      <img class="return" @click="clickReturn()" src="../assets/img/return1.png" alt />
      <img class="add" @click="addShow = true" src="../assets/img/add.png" alt />
    </div>
    <h2 style="font-weight:bold" v-text="$t('message.text5')">地址管理</h2>
    <ul>
      <van-swipe-cell class="swipeCell" v-for="(v,i) in this.addressList" :key="i">
        <li @click="toTransfer(v)">
          <span class="addName">{{v.addName}}</span>
          <span class="address">{{v.addAddress}}</span>
          <span class="address">{{v.addRemark}}</span>
        </li>
        <template #right>
          <van-button @click="deleteBtn(i)" square type="danger">
            <img src="../assets/img/deleteImg.png" alt />
            <span>{{$t('message.text24')}}</span>
          </van-button>
          <van-button @click="EditAddress(v,i)" square type="primary" class="lastBtn">
            <img src="../assets/img/editImg.png" alt />
            <span>{{$t('message.text25')}}</span>
          </van-button>
        </template>
      </van-swipe-cell>
    </ul>

    <van-popup v-model="addShow" position="bottom">
      <h2 v-text="$t('message.text49')">新增地址</h2>
      <ul>
        <li>
          <input
            @change="handleInput1"
            type="text"
            v-model="addName"
            :placeholder="$t('message.text62')"
          />
        </li>
        <li>
          <input type="text" v-model="addAddress" :placeholder="$t('message.text63')" />
        </li>

        <li>
          <input
            @blur="handleInput2"
            type="text"
            v-model="addRemark"
            :placeholder="$t('message.text64')"
          />
        </li>
      </ul>
      <!-- <button @click="saveAddAddress()" v-text="$t('message.text7')">保存</button> -->
      <div class="bottomDiv">
        <span @click="addShow = false">{{$t('message.text69')}}</span>
        <span @click="saveAddAddress()">{{$t('message.text68')}}</span>
      </div>
    </van-popup>

    <van-popup v-model="editShow" position="bottom">
      <h2 v-text="$t('message.text6')">编辑地址</h2>
      <ul>
        <li>
          <input
            @blur="handleInput3"
            type="text"
            v-model="editName"
            :placeholder="$t('message.text62')"
          />
        </li>
        <li>
          <input type="text" v-model="editAddress" :placeholder="$t('message.text63')" />
        </li>

        <li>
          <input
            @blur="handleInput4"
            type="text"
            v-model="editRemark"
            :placeholder="$t('message.text64')"
          />
        </li>
      </ul>
      <!-- <button  v-text="$t('message.text7')">保存</button> -->
      <div class="bottomDiv">
        <span @click="editShow = false">{{$t('message.text69')}}</span>
        <span @click="saveEditAddress()">{{$t('message.text68')}}</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      editShow: false,
      addShow: false,
      editName: "",
      editAddress: "",
      editRemark: "",

      addName: "",
      addAddress: "",
      addRemark: "",

      addressList: [],
      newAddressObject: {},
      index: ""
    };
  },
  created() {
    this.addressList = JSON.parse(localStorage.getItem("addressList")) || [];
    if (localStorage.getItem("lang") == "cn") {
      this.msg2 = "确认删除吗？";
      this.msg11 = "确认";
      this.msg33 = "取消";
    } else {
      this.msg2 = "Are you sure to delete?";
      this.msg11 = "Confirm";
      this.msg33 = "Cancel";
    }
  },
  methods: {
    handleInput1(e) {
      this.addName = e.target.value.substr(0, 12);
    },
    handleInput2(e) {
      this.addRemark = e.target.value.substr(0, 20);
    },
    handleInput3(e) {
      this.editName = e.target.value.substr(0, 12);
    },
    handleInput4(e) {
      this.editRemark = e.target.value.substr(0, 20);
    },

    toTransfer(val) {
      let that = this;

      if (that.$route.query.address1) {
        that.$router.push({
          path: "/indexHome/transfer",
          query: {
            address1: that.$route.query.address1,
            name: that.$route.query.name,
            toAddress: val.addAddress
          }
        });
      } else if (that.$route.query.address2) {
        that.$router.push({
          path: "/indexHome/transfer",
          query: {
            address2: that.$route.query.address2,
            name: that.$route.query.name,
            toAddress: val.addAddress
          }
        });
      } else if (that.$route.query.addressETH) {
        that.$router.push({
          path: "/indexHome/transfer",
          query: {
            addressETH: that.$route.query.addressETH,
            name: that.$route.query.name,
            toAddress: val.addAddress
          }
        });
      } else if (that.$route.query.addressFIL) {
        that.$router.push({
          path: "/indexHome/transfer",
          query: {
            addressFIL: that.$route.query.addressFIL,
            name: that.$route.query.name,
            toAddress: val.addAddress
          }
        });
      }else if (that.$route.query.addressBTC) {
        that.$router.push({
          path: "/indexHome/transfer",
          query: {
            addressBTC: that.$route.query.addressBTC,
            name: that.$route.query.name,
            toAddress: val.addAddress
          }
        });
      }
    },
    clickReturn() {
      this.$router.go(-1);
    },
    getAddressList() {
      this.addressList = JSON.parse(localStorage.getItem("addressList")) || [];
    },
    deleteBtn(index) {
      Dialog.confirm({
        message: this.msg2,
        confirmButtonText: this.msg11,
        cancelButtonText: this.msg33
      }).then(() => {
        for (let i in this.addressList) {
          if (index == i) {
            this.addressList.splice(i, 1);
            localStorage.setItem(
              "addressList",
              JSON.stringify(this.addressList)
            );
          }
        }
      });
    },
    saveAddAddress() {
      if (this.addAddress && this.addName) {
        this.addressList = JSON.parse(localStorage.getItem("addressList")) || [];
        this.newAddressObject["addName"] = this.addName;
        this.newAddressObject["addAddress"] = this.addAddress;
        this.newAddressObject["addRemark"] = this.addRemark;
        this.addressList = JSON.parse(localStorage.getItem("addressList")) || []; //||[]很重要
        this.addressList.push(this.newAddressObject);
        localStorage.setItem("addressList", JSON.stringify(this.addressList));
        this.getAddressList();
        this.addShow = false;
        this.newAddressObject = {};
        this.addName = "";
        this.addAddress = "";
        this.addRemark = "";
      }
    },
    EditAddress(v, i) {
      this.editName = v.addName;
      this.editAddress = v.addAddress;
      this.editRemark = v.addRemark;
      this.editShow = true;
      this.index = i;
    },
    saveEditAddress() {
      for (let i in this.addressList) {
        if (this.index == i) {
          this.addressList[i].addName = this.editName;
          this.addressList[i].addAddress = this.editAddress;
          this.addressList[i].addRemark = this.editRemark;
        }
      }
      localStorage.setItem("addressList", JSON.stringify(this.addressList));

      this.editShow = false;
    }
  }
};
</script>

<style lang="less" scoped>
.addressManage {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;

  .van-popup {
    height: 490px;
    border-radius: 24px 24px 0px 0px;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    h2 {
      font-size: 48px;
      font-family: Arial-BoldMT, Arial;
      font-weight: normal;
      color: #393a49;
      margin: 0;
      padding: 40px 0 0 40px;
    }

    ul,
    li {
      list-style: none;
      padding: 0;
    }
    ul {
      width: 100%;

      li {
        margin: 0 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        border-bottom: 1px solid rgba(91, 103, 133, 0.3);

        color: rgba(162, 168, 183, 1);
        input {
          padding: 0;
          height: 80px;
          border: none;
          width: 100%;
          background: rgba(0, 0, 0, 0);
          font-size: 28px;
          font-family: Arial;
          font-weight: 400;
        }
      }
    }
    button {
      width: 630px;
      height: 70px;
      background: rgba(255, 255, 255, 1);
      opacity: 1;
      border-radius: 10px;
      font-size: 28px;
      font-family: Segoe UI;
      font-weight: bold;
      outline: none;
      padding: 0;
      border: none;
      color: rgba(1, 6, 19, 1);
      align-self: center;
      margin-top: 98px;
    }
    .bottomDiv {
      width: 100%;
      height: 105px;
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
        color: #3d7fff;
      }
      span:first-child {
        color: #ff3d3d;
        border-right: 1px solid #ccc;
      }
    }
  }
  .topImg {
    width: 100%;
    padding: 46px 0 28px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 36px;
      height: 36px;
    }
    .return {
      padding-left: 40px;
      width: 24px;
      height: 44px;
    }
    .add {
      padding-right: 40px;
      width: 50px;
      height: 50px;
    }
  }

  h2 {
    font-size: 50px;
    font-family: Segoe UI;
    font-weight: bold;
    color: rgba(1, 6, 19, 1);
    padding-left: 40px;
    margin: 0 0 30px;
  }
  ul,
  li {
    list-style: none;
    padding: 0;
  }
  ul {
    // padding: 0 38px;
    width: 100%;
    .swipeCell {
      height: 249px;
      width: 100%;
      margin-bottom: 30px;

      li {
        width: 600px;
        padding: 0 30px 0 40px;
        margin: 0 auto;
        background: #1677ff;

        box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.1);
        border-radius: 22px;
        display: flex;
        height: 239px;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .addName {
          font-size: 30px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #fff;
          word-break: break-all;
          margin-bottom: 0px;
        }
        .address {
          font-size: 24px;
          font-family: Segoe UI;
          font-weight: 300;
          line-height: 20px;
          word-break: break-all;
          color: #fff;
          word-break: break-all;
          margin-top: 16px;
        }
      }
      .van-button {
        width: 163px;
        height: 239px !important;
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
          display: block;
          margin: 0 auto;
        }
      }
      .lastBtn {
        background: #4377ff;
        border: none;
        margin-left: 20px;
      }
    }
  }
}
</style>