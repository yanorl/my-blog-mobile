<template>
    <section class="header-wrap">
        <header class="header-box">
            <nav>
                <router-link to="/" class="nav-item">
                    <img src="../assets/img/logo.png" alt="">
                </router-link>
                    <span  class="fr nav-item" @click="showMenu">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </span>
                    <router-link to="/search" class="fl nav-item">
                        <i class="fa fa-search " aria-hidden="true"></i>
                    </router-link>
            </nav>
        </header>
        <section class="menu-wrap">
            <div class="menu_box page_box  page_view page_view_left" :class="{'page_view_default': toggleClass}">
                <i class="back_box fa fa-times-circle" @click="hideMenu"></i>
                <div class="page_view_content fr">
                    <div class="menu-top">
                        <img src="../assets/img/no_signUp.png">
                        <div class="menu-top-list">
                            <template v-if="user">
                                <router-link to="/user" rel="nofollow">{{ user.getUsername() }}</router-link>
                            </template>
                            <template v-else>
                                <router-link to="/login" rel="nofollow">登录</router-link> |
                                <router-link to="/reg" rel="nofollow">注册</router-link>
                            </template>
                        </div>
                    </div>
                    <div class="my-user">
                        <ul class="clearfix">
                            <li>
                                <router-link to="/" rel="nofollow"><i class="fa fa-home"></i><br>首页</router-link>
                            </li>
                            <li>
                                <router-link to="/me" rel="nofollow"><i class="fa fa-book"></i><br>我的文章</router-link>
                            </li>
                            <li>
                                <router-link to="/article/create" rel="nofollow"><i class="fa fa-pencil-square-o"></i><br>发布文章</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="menu-list clearfix">
                        <ul class="clearfix">
                            <li v-for="menu in categorys" :key="menu.objectId">
                                <router-link :to="'/category?type='+menu.id"> {{ menu.get('name') }}</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'header-wrap',
    data() {
        return {
            toggleClass: false,
            categorys: [],
        };
    },
    created() {
        this.getCategory();
    },
    computed: mapState(['user']),
    mounted() {
        this.$router.afterEach((to, from) => {
            this.toggleClass = false;
        });
    },
    methods: {
        showMenu() {
            this.toggleClass = true;
        },
        hideMenu() {
            this.toggleClass = false;
        },
        getCategory() {
            const cq = new this.$api.SDK.Query('Category');
            cq.find().then((categorys) => {
                this.categorys = categorys;
                // console.log(this.categorys);
            }).catch(console.error)
        },
    }
};
</script>
<style lang="scss" scoped>
.header-wrap {
    height: px2rem(88);

    .header-box {
        width: 100%;
        height: px2rem(88);
        z-index: 4;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        padding: 0 px2rem(10);
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .12), 0 1px 4px rgba(0, 0, 0, .08);

        nav {
            height: 100%;
            position: relative;
            text-align: center;

            .nav-item {
                @include flex-center;
                font-weight: bold;
                height: 100%;
                width: px2rem(90);
                margin: 0 px2rem(10);

                i {
                    font-size: px2rem(38);
                }
            }
        }
    }

    .menu-wrap {
        .menu-top {
            @include flex-center;
            padding-bottom: px2rem(30);

            .menu-top-list {
                margin: 0 px2rem(30);
                @include flex-center;
                font-size: $text-size-imp;

                a {
                    font-size: $text-size-imp;
                    margin: 0 px2rem(20);
                    vertical-align: middle;
                    @include ellipsis;
                    display: inline-block;
                }
            }

            img {
                width: px2rem(150);
                height: px2rem(150);
            }
        }

        .my-user {
            border: 2px solid #dcdcdc;
            border-left: none;
            border-right: none;

            ul li {
                float: left;
                width: 33.3333%;
                text-align: center;
                color: #292929;
                font-size: $text-size;
                border-left: 2px solid #dcdcdc;

                &:first-child {
                    border-left: none;
                }

                a {
                    display: block;

                    padding: px2rem(30) 0;

                    i {
                        font-size: $text-size-imp;
                    }
                }
            }
        }

        .menu-list {
            margin: px2rem(30) 0;

            ul li {
                float: left;
                margin: px2rem(10);

                a {
                    padding: px2rem(20);
                    border: 1px solid #ccc;
                    border-radius: px2rem(10);
                    text-align: center;
                    background: #000;
                    color: #fff;
                    width: 100%;
                    font-weight: bold;
                    display: inline-block;
                    box-sizing: border-box;
                    font-size: $text-size;
                }
            }
        }

    }
}
</style>