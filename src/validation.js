import Vue from "vue";
import VeeValidate, {Validator}  from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'  //加载语言包应该写成这个样子
import VueI18n from 'vue-i18n';
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_CN',
})
Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    zh_CN
  }
});
Validator.extend('password', {
  getMessage: field => field + '最少6位，包括至少1个字母、特殊字符、数字',
  validate: value => {
    return  /^.*(?=.{6,})(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*? ]).*$/.test(value)
  }
});
