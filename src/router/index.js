import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Index.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/createWallet',
    name: 'createWallet',
    component: () => import('../pages/CreateWallet.vue')
  },
  {
    path: '/leadWallet',
    name: 'leadWallet',
    component: () => import('../pages/LeadWallet.vue')
  },
  {
    path: '/sureLeadWallet',
    name: 'sureLeadWallet',
    component: () => import('../pages/SureLeadWallet.vue')
  },

  {
    path: '/backUp1',
    name: 'backUp1',
    component: () => import('../pages/BackUp1.vue')
  },
  {
    path: '/backUp2',
    name: 'backUp2',
    component: () => import('../pages/BackUp2.vue')
  },
  {
    path: '/backUp3',
    name: 'backUp3',
    component: () => import('../pages/BackUp3.vue')
  },
  {
    path: '/indexHome',
    name: 'indexHome',
    component: () => import('../pages/IndexHome.vue'),
    children: [
      {
        path: 'myWallet',
        name: 'myWallet',
        component: () => import('../components/MyWallet.vue'),
      },
      {
        path: 'myDapp',
        name: 'myDapp',
        component: () => import('../components/MyDapp.vue')
      },
      {
        path: 'receiving',
        name: 'receiving',
        component: () => import('../pages/Receiving.vue')
      },
      {
        path: 'transfer',
        name: 'transfer',
        component: () => import('../pages/Transfer.vue')
      },
      {
        path: 'startRecognize',
        name: 'startRecognize',
        component: () => import('../components/StartRecognize.vue')
      },
    ]
  },
  {
    path: '/walletsManage',
    name: 'walletsManage',
    component: () => import('../pages/WalletsManage.vue')
  },
  {
    path: '/transferRecords',
    name: 'transferRecords',
    component: () => import('../pages/TransferRecords.vue')
  },
  {
    path: '/transferRecords1',
    name: 'transferRecords1',
    component: () => import('../pages/TransferRecords1.vue')
  },
  {
    path: '/aboutUs',
    name: 'aboutUs',
    component: () => import('../pages/AboutUs.vue')
  },
  {
    path: '/transferDetails',
    name: 'transferDetails',
    component: () => import('../pages/TransferDetails.vue')
  },
  {
    path: '/addressManage',
    name: 'addressManage',
    component: () => import('../pages/AddressManage.vue')
  },

  {
    path: '/agreement',
    name: 'agreement',
    component: () => import('../pages/Agreement.vue')
  },
  {
    path: '/agreementEn',
    name: 'agreementEn',
    component: () => import('../pages/AgreementEn.vue')
  },
  {
    path: '/policy',
    name: 'policy',
    component: () => import('../pages/Policy.vue')
  },
  {
    path: '/policyEn',
    name: 'policyEn',
    component: () => import('../pages/PolicyEn.vue')
  },
  {
    path: '/changeLeadWallet',
    name: 'changeLeadWallet',
    component: () => import('../pages/ChangeLeadWallet.vue')
  },
  {
    path: '/changeCreateWallet',
    name: 'changeCreateWallet',
    component: () => import('../pages/ChangeCreateWallet.vue')
  },
  {
    path: '/versionLog',
    name: 'versionLog',
    component: () => import('../pages/VersionLog.vue')
  },
  {
    path: '/backUpPrivateKey1',
    name: 'backUpPrivateKey1',
    component: () => import('../pages/BackUpPrivateKey1.vue')
  },
  {
    path: '/backUpPrivateKey2',
    name: 'backUpPrivateKey2',
    component: () => import('../pages/BackUpPrivateKey2.vue')
  },
  {
    path: '/staking',
    name: 'staking',
    component: () => import('../pages/Staking.vue')
  },
  {
    path: '/ETHlist',
    name: 'ETHlist',
    component: () => import('../pages/ETHlist.vue')
  },
  {
    path: '/selectLang',
    name: 'selectLang',
    component: () => import('../pages/SelectLang.vue')
  },


]

const router = new VueRouter({
  routes
})

export default router
