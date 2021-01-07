<template>
  <div id="app">
    <!-- <router-view :key="$route.fullPath" /> -->
    <!-- <keep-alive include="myWallet"> -->
      <router-view />
    <!-- </keep-alive> -->
    <van-overlay :show="show">
      <div class="wrapper">
        <div class="wrapper1">
          <div class="block">
            <div class="top">
              <h2 v-text="$t('message.text92')">发现新版本</h2>
              <span>V{{version}}</span>
            </div>

            <div class="content" v-show="showEnOrCn">
              <p v-for="(v,i) in this.content_cn" :key="i">{{v}}</p>
            </div>
            <div class="content" v-show="!showEnOrCn">
              <p v-for="(v,i) in this.content_en" :key="i">{{v}}</p>
            </div>

            <div class="btn">
              <div class="btn1">
                <button @click="show = false" v-text="$t('message.text94')">取消</button>
                <button @click="toUpdates()" v-text="$t('message.text95')">立即更新</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>


<script>
import axios from "axios";
import { Dialog } from "vant";
import { Overlay } from "vant";
export default {
  data() {
    return {
      show: false,
      msg1: "Check for updates",
      msg2: "A new version has been found. Update it？",
      msg3: "Download the update file",
      msg4: "Download the update file succeeded:",
      msg5: "Download failed!",
      msg6: "Install the update files",
      msg7: "The update file installed successfully!",
      msg8: "The application resources update completed!",
      msg9: "Failed to install the update files",
      msg10: "cancel",
      msg11: "confirm",
      showEnOrCn: false,
      content_cn: [],
      content_en: [],
      version:''
    };
  },
  created() {
    if (localStorage.getItem("lang") == "cn") {
      this.msg1 = "检查更新";
      this.msg2 = "发现新版本，是否更新发现新版本？";
      this.msg3 = "下载更新文件";
      this.msg4 = "下载更新文件成功:";
      this.msg5 = "下载失败！";
      this.msg6 = "安装更新文件";
      this.msg7 = "更新文件安装成功！";
      this.msg8 = "应用资源更新完成！";
      this.msg9 = "安装更新文件失败";
      this.msg10 = "取消";
      this.msg11 = "更新";
      this.showEnOrCn = true;
    } else {
      this.msg1 = "Check for updates";
      this.msg2 = "A new version has been found Update it?";
      this.msg3 = "Download the update file";
      this.msg4 = "Download the update file succeeded:";
      this.msg5 = "Download failed!";
      this.msg6 = "Install the update files";
      this.msg7 = "The update file installed successfully!";
      this.msg8 = "The application resources update completed!";
      this.msg9 = "Failed to install the update files";
      this.msg10 = "cancel";
      this.msg11 = "confirm";
      this.showEnOrCn = false;
    }

    // 获取本地应用资源版本号
    let that = this;
    document.addEventListener("plusready", function() {//只能进入app触发或者刷新时触发
      plus.runtime.getProperty(plus.runtime.appid, function(inf) {
        var wgtVersion = Number(inf.version.replace(/[.]/g, ""));
        axios.get("https://api.bhpnet.io/app/checkVersion").then(res => {
          if (res.data.data) {
            that.content_cn = res.data.data.content_cn;
            that.content_en = res.data.data.content_en;
            console.log(
              "安装包：" + Number(res.data.data.version.replace(/[.]/g, "")),
              "本机版本：" + wgtVersion,
              typeof Number(res.data.data.version.replace(/[.]/g, "")),
              typeof wgtVersion
            );
            if (
              Number(res.data.data.version.replace(/[.]/g, "")) > wgtVersion
            ) {
              that.version = res.data.data.version
              that.show = true;
            }
          }
        });
      });
    });
  },
  methods: {
    toUpdates() {
      this.downWgt();
      this.show = false;
    },
    downWgt() {
      let that = this;
      var wgtUrl = "https://bhpnet.io/app/io.bhpnet.wallet.wgt";
      plus.nativeUI.showWaiting(that.msg3 + "...");
      plus.downloader
        .createDownload(
          wgtUrl,
          {
            filename: "_doc/update/"
          },
          function(d, status) {
            if (status == 200) {
              console.log(that.msg4 + d.filename);
              that.installWgt(d.filename); //安装wgt包
            } else {
              // console.log("下载失败！");
              plus.nativeUI.alert(that.msg5);
            }
            plus.nativeUI.closeWaiting();
          }
        )
        .start();
    },

    installWgt(path) {
      let that = this;
      plus.nativeUI.showWaiting(that.msg6 + "...");
      plus.runtime.install(
        path,
        {},
        function() {
          plus.nativeUI.closeWaiting();
          console.log("安装wgt文件成功！");
          plus.nativeUI.alert(that.msg8, function() {
            plus.runtime.restart();
          });
        },
        function(e) {
          plus.nativeUI.closeWaiting();
          console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
          plus.nativeUI.alert(that.msg9 + "[" + e.code + "]：" + e.message);
        }
      );
    }
  }
};
</script>

<style lang="less">

html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.van-toast__text{
    line-height: 36px;
  }
.van-overlay {
  z-index: 999 !important;
}
.wrapper {
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // z-index: 999;
  .wrapper1 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}

.block {
  width: 709px;
  height: 736px;
  background: url("./assets/img/alertBanner.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  .top {
    padding-top: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    h2 {
      margin: 0;
      height: 67px;
      font-size: 40px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 67px;
      letter-spacing: 3px;
    }
    span {
      height: 33px;
      font-size: 24px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 33px;
      letter-spacing: 2px;
      margin-top: 5px;
    }
  }

 .content {
    margin-top: 90px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    padding: 0 120px;
    color: #393a49;
    height: 240px;
    overflow-y: scroll;
    word-break: break-all;
    overflow: hidden scroll; 
    p {
    font-size: 20px;
    line-height: 28px;
    margin: 0 0 6px;
    }
  }

  .btn {
    position: absolute;
    bottom: 40px;
    width: 100%;
    .btn1 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      button {
        width: 229px;
        height: 68px;
        background: #d8d8d8;
        border-radius: 34px;
        padding: 0;
        border: none;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #393a49;
        letter-spacing: 2px;
      }
      button:last-child {
        background: linear-gradient(225deg, #32a0ff 0%, #4377ff 100%);
        color: #ffffff;
        margin-left: 21px;
      }
    }
  }
}
.van-toast {
  width: 40% !important;
  font-size: 30px !important;
}
.van-dialog {
  width: 70% !important;
}
.van-dialog__header {
  font-size: 34px;
}
.van-dialog__message {
  font-size: 30px !important;
  padding: 50px 10px !important;
  line-height: 34px !important;
}
.van-button {
  font-size: 30px !important;
  height: 80px !important;
}
</style>
