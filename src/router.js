import Vue from "vue";
import Router from "vue-router";
import store from "./store/";


import Home from "./views/Home.vue";
import ArticleList from "./views/List.vue";
import ManageArticleList from "./views/ManageArticleList.vue";
import Login from "./views/Login.vue";
import Reg from "./views/Registered.vue";
import User from "./views/User.vue";
import Search from "./views/Search.vue";
import PasswordReset from "./views/reset/PasswordReset.vue";
import EmailVerification from "./views/reset/EmailVerification.vue";
import ShowArticle from "./views/article/ShowArticle.vue";
import EditArticle from "./views/article/EditArticle.vue";
import CreateArticle from "./views/article/CreateArticle.vue";




Vue.use(Router);


const constantRoutes = [{
        path: "/",
        name: "ArticleList",
        component: ArticleList
    },
    {
        path: "/search",
        name: "search",
        component: Search
    },
    {
        path: "/home",
        name: "home",
        component: Home
    },
    {
        path: "/about",
        name: "about",
        component: () =>
            import( /* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
        path: "/helloworld",
        name: "helloworld",
        component: () =>
            import( /* webpackChunkName: "about" */ "./components/HelloWorld.vue")
    },
    {
        path: "/emailverification",
        name: "EmailVerification",
        component: EmailVerification
    },
    {
        path: "/passwordreset",
        name: "PasswordReset",
        component: PasswordReset
    },
    {
        path: "/me",
        name: "ArticleList",
        component: ArticleList,
        meta: {
            needLogin: true
        }
    },
    {
        path: "/category",
        name: "ArticleList",
        component: ArticleList
    },
    {
        path: '/article/create',
        name: 'CreateArticle',
        component: CreateArticle,
        meta: {
            needLogin: true
        }
    },
    {
        path: '/article/:id',
        name: 'ShowArticle',
        component: ShowArticle,
    },
    {
        path: '/article/:id/edit',
        name: 'EditArticle',
        component: EditArticle,
        meta: {
            needLogin: true
        }
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            alreadyLogin: true
        }
    },
    {
        path: "/reg",
        name: "reg",
        component: Reg,
        meta: {
            alreadyLogin: true
        }
    },
    {
        path: "/user",
        name: "user",
        component: User,
        meta: {
            needLogin: true
        }
    },
    {
        path: "/managearticlelist",
        name: "ManageArticleList",
        component: ManageArticleList,
        meta: {
            needLogin: true
        }
    }
];

const router = new Router({
    mode: 'history',
    routes: constantRoutes
})


//vue router 页面跳转默认回到顶部
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});


//判断是否登陆
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.needLogin)) {
        if (!store.state.user) {
            alert('请先登录');
            next({
                path: '/login'
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.alreadyLogin)) {
        if (store.state.user) {
            next({
                path: '/user'
            })
        } else {
            next();
        }
    } else {
        next() // 确保一定要调用 next()
    }
})


export default router