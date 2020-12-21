import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bipList:[],
    privateKey:'',
    newLeadWallet:{},
    newCreateWalletBHP:{},
    newCreateWalletBHP2:{},
    newCreateWalletETH:{},
    newCreateWalletFIL:{},
    newCreateWalletBTC:{},
    walletType:''
  },
  mutations: {
    getBipList(state,bipList){
      state.bipList = bipList//备份的助记词
    },
    getPrivateKey(state,privateKey){
      state.privateKey = privateKey//备份的私钥
    },
    getNewLeadWallet(state,newLeadWallet){//确认导入页面导入新创建的钱包
      state.newLeadWallet = newLeadWallet
    },
   
    getNewCreateWalletBHP(state,newCreateWalletBHP){
      state.newCreateWalletBHP = newCreateWalletBHP//新创建钱包数据，备份成功再存本地
    },
    getNewCreateWalletBHP2(state,newCreateWalletBHP2){
      state.newCreateWalletBHP2 = newCreateWalletBHP2//新创建钱包数据，备份成功再存本地
    },
    getNewCreateWalletETH(state,newCreateWalletETH){
      state.newCreateWalletETH = newCreateWalletETH//新创建钱包数据，备份成功再存本地
    },
    getNewCreateWalletFIL(state,newCreateWalletFIL){
      state.newCreateWalletFIL = newCreateWalletFIL//新创建钱包数据，备份成功再存本地
    },
    getNewCreateWalletBTC(state,newCreateWalletBTC){
      state.newCreateWalletBTC = newCreateWalletBTC//新创建钱包数据，备份成功再存本地
    },
    getWalletType(state,walletType){
      state.walletType = walletType//判断备份完之后该跳转哪个链的首页
    }
  },
  actions: {
  },
  modules: {
  }
})
