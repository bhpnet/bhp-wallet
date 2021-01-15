<template>
  <div class="transferDetails">
    <img @click="clickReturn()" src="../assets/img/return1.png" alt />

    <img class="succesImg" src="../assets/img/succesDetails.png" alt />
    <span>Transfer succeeded</span>
    <span class="asset">- 2.32 BHP</span>
    <ul>
      <li>
        <span>哈希值</span>
        <span>jkdshjkdhuie2389eudui2dj2eh2dy389djkdshjkdhuie2389eudui2dj2eh</span>
      </li>
      <li>
        <span>转账地址</span>
        <span>jkdshjkdhuie2389eudui2dj2eh2dy389djkdshjkd</span>
      </li>
      <li>
        <span>收款地址</span>
        <span>jkdy389djkdshjkdhuie2389eudui2dj2eh2dy389diuiu</span>
      </li>
      <li>
        <span>手续费</span>
        <span>1.23 BHP</span>
      </li>
      <li>
        <span>备注</span>
        <span>已转，请查收</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    clickReturn() {
      if (this.$route.query.address1) {
        this.$router.replace({
          path: "/indexHome/myWallet",
          query: {
            address1: this.$route.query.address1,
          },
        });
      } else if (this.$route.query.address2) {
        this.$router.replace({
          path: "/indexHome/myWallet",
          query: {
            address2: this.$route.query.address2,
          },
        });
      } else if (this.$route.query.addressETH) {
        this.$router.replace({
          path: "/indexHome/myWallet",
          query: {
            addressETH: this.$route.query.addressETH,
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.transferDetails {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;

  img {
    width: 26px;
    height: 46px;
    padding: 46px 0 54px 40px;
    align-self: flex-start;
  }

  .succesImg {
    width: 311px;
    height: 201px;
    margin-left: 198px;
    padding: 0;
  }

  span {
    font-size: 48px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #4377ff;
  }
  .asset {
    font-size: 40px;
    font-family: Segoe UI;
    font-weight: bold;
    margin: 34px 0 70px;
  }
  ul,
  li {
    list-style: none;
    padding: 0;
  }
  ul {
    width: 100%;
    li {
      margin: 0 75px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 110px;
      border-bottom: 1px #e6e9ed solid;

      span:first-child {
        width: 138px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #393a49;
      }
      span:last-child {
        width: 490px;
        word-break: break-all;
        font-size: 24px;
        line-height: 33px;
        color: #999999;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
      }
    }
  }
  button {
    width: 630px;
    height: 70px;
    background: rgba(1, 6, 19, 1);
    outline: none;
    font-size: 28px;
    font-family: Segoe UI;
    font-weight: 400;
    color: rgba(244, 245, 249, 1);
    border-radius: 10px;
    margin-top: 135px;
  }
}
</style>
