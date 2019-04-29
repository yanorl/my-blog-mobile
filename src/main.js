import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/";
import api from './api';


import vLoading from './components/common/loading/index.js'
Vue.use(vLoading)


// 引入表单验证
import { VeeValidate, Veeconfig } from './validation';

import './lib/hotcss/hotcss.js';
import './assets/css/_reset.css';
import './assets/font-awesome-4.7.0/css/font-awesome.min.css';

import './components/common/vue-global/index.js';

//引入mint-ui的样式
// import 'mint-ui/lib/style.css'

// 注册全局
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)


Vue.config.productionTip = false;

localStorage.setItem('debug', 'leancloud*') // 开启调试模式

// -------------------------------------

const user = api.SDK.User.current()

if (user) {
    store.commit('setUser', user);
}


Vue.mixin({
    beforeCreate() {
        if (!this.$api) {
            this.$api = api;
        }
    }
});




new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");