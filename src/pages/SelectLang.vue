<template>
  <div class="selectLang">
    <div class="top">
      <img @click="clickReturn()" src="../assets/img/return1.png" alt />
      <h2 style="font-weight: bold" v-text="$t('message.text100')">Multilingualism</h2>
    </div>
    <ul>
      <li @click="toCNorEN('cn')">
        <span>简体中文</span>
        <img src="../assets/img/gou.png" v-show="'cn' == lang" />
      </li>
      <li @click="toCNorEN('en')">
        <span>English</span>
        <img src="../assets/img/gou.png" v-show="'en' == lang" />
      </li>
      <li @click="toCNorEN('ko')">
        <span>한국어</span>
        <img src="../assets/img/gou.png" v-show="'ko' == lang" />
      </li>
      <li @click="toCNorEN('ja')">
        <span>日本語</span>
        <img src="../assets/img/gou.png" v-show="'ja' == lang" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: "",
    };
  },
  created() {
    this.lang = localStorage.getItem("lang");
  },
  methods: {
    clickReturn() {
      this.$router.go(-1);
    },
    toCNorEN(e) {
      this.lang = e;
      localStorage.setItem("lang", e);
      this.$i18n.locale = e;
    },
  },
};
</script>

<style lang="less" scoped>
.selectLang {
  .top {
    display: flex;
    align-items: center;

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
      margin: 0;
    }
  }
  ul {
    padding: 0 40px;
    list-style: none;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 84px;
      list-style: none;
      border-bottom: 1px solid #e6e9ed;
      span {
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #393a49;
      }
      img {
        width: 38px;
        height: 26px;
      }
    }
  }
}
</style>
