<template>
  <div class="staking">
    <img class="return" @click="clickReturn()" src="../assets/img/return1.png" alt />
    <h2 style="font-weight:bold">staking</h2>
    <div class="top">
      <button class="btnActive delegations">My Delegations</button>
      <button class="validators">Validators</button>
    </div>
    <div class="msgDiv">
      <div class="topAddress">ywuuwhhs...hjsj</div>
      <div class="topAsset">
        231432.00
        <span>≈￥346363342.23</span>
      </div>
      <div class="msgMain">
        <div class="box">
          <h4>Available</h4>
          <p>
            13231.00
            <span>BHP</span>
          </p>
        </div>
        <div class="box">
          <h4>Gelegations</h4>
          <p>
            13231.00
            <span>BHP</span>
          </p>
        </div>
        <div class="box">
          <h4>Rewards</h4>
          <p>
            13231.00
            <span>BHP</span>
          </p>
        </div>
        <div class="box">
          <h4>Undelegating</h4>
          <p>
            13231.00
            <span>BHP</span>
          </p>
        </div>
      </div>
    </div>

    <div class="reinvestAndTutorial">
      <div class="reinvest">
        <img src="../assets/img/reinvest.png" alt />
        <span>Reinvest</span>
      </div>
      <div class="tutorial">
        <img src="../assets/img/tutorial.png" alt />Tutorial
      </div>
    </div>
    <div class="delegationsOrUnbanding">
      <span class="active">Delegations</span>
      <span>Unbanding</span>
    </div>
    <ul class="DelegationsUl">
      <li>
        <div class="imgBG">
          <img src="../assets/img/dunkirk.png" alt />
        </div>

        <div class="validators">
          Validators
          <span>Dunkirk</span>
        </div>
        <div class="amount">
          amount
          <span>1230</span>
        </div>
        <div class="rewards">
          Rewards
          <span>2510</span>
        </div>
        <div class="redemptionOrTransfer">
          <button class="redemption">Redemption</button>
          <button class="transfer">Transfer</button>
        </div>
      </li>
      <li>
        <div class="imgBG">
          <img src="../assets/img/zumwalt.png" alt />
        </div>

        <div class="validators">
          Validators
          <span>Zumwalt</span>
        </div>
        <div class="amount">
          amount
          <span>1230</span>
        </div>
        <div class="rewards">
          Rewards
          <span>2510</span>
        </div>
        <div class="redemptionOrTransfer">
          <button class="redemption">Redemption</button>
          <button class="transfer">Transfer</button>
        </div>
      </li>
      <li>
        <div class="imgBG">
          <img src="../assets/img/apollo.png" alt />
        </div>

        <div class="validators">
          Validators
          <span>Apollo</span>
        </div>
        <div class="amount">
          amount
          <span>1230</span>
        </div>
        <div class="rewards">
          Rewards
          <span>2510</span>
        </div>
        <div class="redemptionOrTransfer">
          <button class="redemption">Redemption</button>
          <button class="transfer">Transfer</button>
        </div>
      </li>
      <li>
        <div class="imgBG">
          <img src="../assets/img/sputnik.png" alt />
        </div>

        <div class="validators">
          Validators
          <span>Sputnik 1</span>
        </div>
        <div class="amount">
          amount
          <span>1230</span>
        </div>
        <div class="rewards">
          Rewards
          <span>2510</span>
        </div>
        <div class="redemptionOrTransfer">
          <button class="redemption">Redemption</button>
          <button class="transfer">Transfer</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods:{
    clickReturn(){
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="less" scoped>
.staking {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .return {
    width: 26px;
    height: 46px;
    padding: 46px 0 54px 40px;
    align-self: flex-start;
  }
  h2 {
    font-size: 48px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #000;
    padding-left: 42px;
    margin: 0 0 40px;
    align-self: flex-start;
  }
  .top {
    width: 584px;
    padding: 0 8px;
    height: 84px;
    border-radius: 42px;
    border: 3px solid #4377ff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    button {
      width: 292px;
      height: 68px;
      background: #fff;
      border-radius: 34px;
      border: none;
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #4377ff;
    }
    .btnActive {
      background: #4377ff;
      color: #fff;
    }
  }
  .msgDiv {
    width: 610px;
    padding: 0 30px;
    height: 407px;
    background: #4377ff;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .topAddress {
      height: 33px;
      font-size: 24px;
      font-family: PingFangSC-Light, PingFang SC;
      font-weight: 300;
      color: #ffffff;
      line-height: 33px;
      padding: 0 40px;
      margin: 30px 0 10px;
    }
    .topAsset {
      height: 67px;
      width: 530px;
      margin-bottom: 18px;
      padding: 0 40px;
      padding-bottom: 22px;
      font-size: 48px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 67px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.19);
      span {
        font-size: 24px;
        font-family: ArialMT;
        color: #ffffff;
        line-height: 28px;
      }
    }
    .msgMain {
      width: 530px;
      align-self: center;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: flex-start;
      .box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        h4 {
          height: 33px;
          font-size: 24px;
          font-family: PingFangSC-Light, PingFang SC;
          font-weight: 300;
          color: #ffffff;
          line-height: 33px;
          margin: 0 0 10px;
        }
        p {
          height: 45px;
          font-size: 32px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 45px;
          margin: 0 0 20px;

          span {
            font-size: 24px;
          }
        }
      }
    }
  }
  .reinvestAndTutorial {
    width: 670px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0;
    .reinvest,
    .tutorial {
      width: 325px;
      height: 83px;
      background: #f5f8ff;
      border-radius: 18px;
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #4377ff;
      img {
        margin-right: 17px;
        width: 45px;
        height: 45px;
      }
    }
  }
  .delegationsOrUnbanding {
    align-self: flex-start;
    padding-left: 44px;
    span {
      height: 31px;
      font-size: 28px;
      font-family: ArialMT;
      color: #999999;
      line-height: 32px;
      margin-right: 30px;
    }
    .active {
      font-size: 32px;
      font-family: Arial-BoldMT, Arial;
      font-weight: bold;

      color: #393a49;
    }
  }
  .DelegationsUl {
    list-style: none;
    padding: 0;
    width: 670px;
    li {
      list-style: none;
      height: 138px;
      border-bottom: 1px solid rgba(230, 233, 237, 1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .imgBG {
        width: 86px;
        height: 86px;
        border-radius: 50%;

        background: #f5f8ff;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 47px;
        }
      }
      .validators,
      .amount,
      .rewards,
      .redemptionOrTransfer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-family: ArialMT;
        color: #999999;
        line-height: 23px;
        span {
          height: 27px;
          font-size: 24px;
          font-family: Arial-BoldMT, Arial;
          font-weight: bold;
          color: #393a49;
          margin-top: 13px;
        }
      }
      .redemptionOrTransfer {
        button {
          width: 145px;
          height: 44px;
          background: #4377ff;
          border-radius: 24px;
          border: none;
          padding: 0;
          font-size: 20px;
          font-family: ArialMT;
          color: #ffffff;
          line-height: 23px;
        }
        .transfer {
          border: 2px solid #4377ff;
          margin-top: 6px;
          color: #4377ff;
          background: #fff;
        }
      }
    }
    li:last-child {
      border-bottom: none;
    }
  }
}
</style>