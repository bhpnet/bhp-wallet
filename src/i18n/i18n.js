
import Vue from 'vue'
// import locale from 'element-ui/lib/locale';
import VueI18n from 'vue-i18n'
import messages from './langs'
Vue.use(VueI18n)
// 从localStorage获取语言选择。
const i18n = new VueI18n({
    locale: localStorage.lang || 'en', //初始选择默认 cn 中文
    messages,
    silentTranslationWarn: true,
})
// locale.i18n((key, value) => i18n.t(key, value)) //兼容element

export default i18n
