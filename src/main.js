import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n/i18n'
Vue.config.productionTip = false
import Clipboard from 'v-clipboard'
Vue.use(Clipboard)
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { Locale } from 'vant';
import enUS from 'vant/lib/locale/lang/en-US';
Locale.use('en-US', enUS);

new Vue({
  router,
  store,
  i18n,

  render: h => h(App)
}).$mount('#app')
