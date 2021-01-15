import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bipList: [],
    privateKey: '',
    newLeadWallet: {},
    newCreateWalletBHP: {},
    newCreateWalletBHP2: {},
    newCreateWalletETH: {},
    newCreateWalletFIL: {},
    newCreateWalletBTC: {},
    walletType: ''
  },
  mutations: {
    getBipList(state, bipList) {
      state.bipList = bipList
    },
    getPrivateKey(state, privateKey) {
      state.privateKey = privateKey
    },
    getNewLeadWallet(state, newLeadWallet) {
      state.newLeadWallet = newLeadWallet
    },

    getNewCreateWalletBHP(state, newCreateWalletBHP) {
      state.newCreateWalletBHP = newCreateWalletBHP
    },
    getNewCreateWalletBHP2(state, newCreateWalletBHP2) {
      state.newCreateWalletBHP2 = newCreateWalletBHP2
    },
    getNewCreateWalletETH(state, newCreateWalletETH) {
      state.newCreateWalletETH = newCreateWalletETH
    },
    getNewCreateWalletFIL(state, newCreateWalletFIL) {
      state.newCreateWalletFIL = newCreateWalletFIL
    },
    getNewCreateWalletBTC(state, newCreateWalletBTC) {
      state.newCreateWalletBTC = newCreateWalletBTC
    },
    getWalletType(state, walletType) {
      state.walletType = walletType
    }
  },
  actions: {},
  modules: {}
})