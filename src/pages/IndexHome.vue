<template>
  <div class="indexHome">
     <keep-alive include="myWallet1">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "myWallet",

};
</script>

<style lang="less" scoped>
  .indexHome{
    width: 100%;
    height: 100%;
  }
</style>