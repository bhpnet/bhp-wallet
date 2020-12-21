<template>
  <div class="transferRecords">
    <img class="returnImg" @click="clickReturn()" src="../assets/img/return.png" alt />

    <img class="img" src="../assets/img/logoBhp2.png" alt />
    <p class="asset">{{$route.query.allBHP}} BHP</p>
    <span class="assetRmb">¥ {{parseFloat($route.query.BHPToRMB).toFixed(2)}}</span>

    <van-tabs v-model="active">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- <van-tab title="转出"> -->
        <ul>
          <li @click="toTransferDetails()" v-for="(v,i) of this.listTo" :key="i">
            <span>转出</span>
            <span>-120.00</span>
            <div>
              11：00
              <br />2020.12.27
            </div>
          </li>
        </ul>
        <p v-show="show1">暂无记录</p>
        <!-- </van-tab> -->
      </van-pull-refresh>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      isLoading: false,
      show1: false,
      listTo: []
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      
    });
  },
  created() {
    this.showEmptyLogo();
  },
  methods: {
    clickReturn() {
      this.$router.go(-1);
    },
    toTransferDetails() {
      this.$router.push({
        path: "transferDetails",
        query: { transferDetails: "transferDetails" }
      });
    },
    onRefresh() {
      setTimeout(() => {
        // this.Toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },
    showEmptyLogo() {
      if (this.listTo.length == "0") {
        this.show1 = true;
      }
    }
  }
};
</script>

<style lang="less" >
.transferRecords {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;

  .returnImg {
    width: 36px;
    height: 36px;
    padding: 46px 0 28px 90px;
    align-self: flex-start;
  }
  .img {
    width: 124px;
    height: 104px;
    padding-top: 146px;
  }
  .asset {
    font-size: 40px;
    font-family: Segoe UI;
    font-weight: bold;
    margin-top: 76px;
    margin-bottom: 28px;
    color: rgba(1, 6, 19, 1);
  }
  .assetRmb {
    font-size: 24px;
    font-family: Segoe UI;
    font-weight: 400;
    margin-bottom: 80px;
    color: rgba(1, 6, 19, 1);
  }
  //菜单头部暂无法修改样式

  .van-tabs__line {
    background: #000;
  }
  .van-tabs {
    width: 750px;
    font-family: Segoe UI;
    font-weight: bold;
    color: rgba(1, 6, 19, 1);
    .van-tabs__content {
      img {
        margin-left: 313px;
      }
    }

    .van-hairline--top-bottom::after {
      border-width: 0;
    }
    .van-tabs__nav {
      width: 408px;
    }
    .van-tab {
      font-size: 26px;
      color: #a2a8b7;
    }
    .van-tab--active {
      color: #000;
    }
    p {
      text-align: center;
      font-size: 26px;
    }
    ul,
    li {
      list-style: none;
      padding: 0;
    }
    ul {
      width: 750px;
      li {
        height: 100px;
        padding: 0 84px 0 98px;
        border-bottom: 2px solid rgba(234, 236, 239, 1);
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding-bottom: 16px;
        span {
          font-size: 28px;
          font-family: Segoe UI;
          font-weight: bold;

          color: rgba(1, 6, 19, 1);
        }
        div {
          text-align: right;
          font-size: 22px;
          font-family: Segoe UI;
          font-weight: 300;
          color: rgba(162, 168, 183, 1);
        }
      }
    }
  }
}
</style>