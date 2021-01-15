<template>
  <div class="scan">
    <div class="top">
      <img @click="clickReturn()" src="../assets/img/return1.png" alt />
    </div>
    <div id="bcid">
      <div style="height: 40%"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
let scan = null;

export default {
  data() {
    return {
      codeUrl: ""
    };
  },
  created() {},
  mounted() {
    this.startRecognize();
    this.startScan()
  },
  beforeDestroy() {
    this.closeScan();
  },
  methods: {
    clickReturn() {
      this.closeScan();
      this.$router.go(-1);
    },
        startRecognize() {
      let that = this;
      if (!window.plus) return;
      var filter;
      var styles = {frameColor: "#4377FF",scanbarColor: "#4377FF"};      scan = new plus.barcode.Barcode('bcid',filter,styles);
      scan.onmarked = onmarked;
      that.startScan()

      function onmarked(type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = "QR";
            break;
          case plus.barcode.EAN13:
            type = "EAN13";
            break;
          case plus.barcode.EAN8:
            type = "EAN8";
            break;
          default:
            type = "其它" + type;
            break;
        }
        result = result.replace(/\n/g, "");
        that.codeUrl = result;
        that.closeScan();
        if (that.$route.query.address1) {
          that.$router.replace({
            path: "/indexHome/transfer",
            query: {
              address1: that.$route.query.address1,
              name: that.$route.query.name,
              toAddress: that.codeUrl
            }
          });
        } else if (that.$route.query.address2) {
          that.$router.replace({
            path: "/indexHome/transfer",
            query: {
              address2: that.$route.query.address2,
              name: that.$route.query.name,
              toAddress: that.codeUrl
            }
          });
        } else if (that.$route.query.addressFIL) {
          that.$router.replace({
            path: "/indexHome/transfer",
            query: {
              addressFIL: that.$route.query.addressFIL,
              name: that.$route.query.name,
              toAddress: that.codeUrl
            }
          });
        }else if (that.$route.query.addressETH) {
          that.$router.replace({
            path: "/indexHome/transfer",
            query: {
              addressETH: that.$route.query.addressETH,
              name: that.$route.query.name,
              toAddress: that.codeUrl
            }
          });
        }else if (that.$route.query.addressBTC) {
          that.$router.replace({
            path: "/indexHome/transfer",
            query: {
              addressBTC: that.$route.query.addressBTC,
              name: that.$route.query.name,
              toAddress: that.codeUrl
            }
          });
        }
      }
    },
        startScan() {
      if (!window.plus) return;
      scan.start();
    },
        cancelScan() {
      if (!window.plus) return;
      scan.cancel();
    },
        closeScan() {
      if (!window.plus) return;
      scan.close();
    }
  }
};
</script>
<style lang="less">
.scan {
  height: 100%;
  #bcid {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 100px;
    bottom: 0;
    text-align: center;
    color: #fff;
    background: #ccc;
  }
  .top {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 2;
    img {
      width: 26px;
      height: 46px;
      padding: 28px 0 54px 40px;
    }
  }
}
</style>
