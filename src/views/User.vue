<template>
    <section class="user-wrap">
        <div class="user-header">
            <h2>我的</h2>
            <div class="user-header-content clearfix">
                <div class="user-img-box fl">
                    <img src="../assets/img/no_signUp.png">
    			</div>
                    <div class="user-text fl">
                        <template v-if="user">
                             <p><i class="fa fa-user-o" aria-hidden="true"></i> {{ user.getUsername() }}</p>
                             <p class="user-email"><i class="fa fa-envelope-o" aria-hidden="true"></i> {{ user.getEmail()| plusXing }}</p>
                        </template>
                         <template v-else>
                             <p><i class="fa fa-user-o" aria-hidden="true"></i> 请登录</p>
                         </template>
                       
                    </div>
                    <div class="login-out fr">
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
            <div class="user-content">
                <div class="nav-list">
                    <ul>
                        <li>
                            <router-link to="/me" class="nav-items">
                                <i class="fa fa-book" aria-hidden="true"></i>
                                <span>
        						我的文章
        					</span>
                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                            </router-link>
                        </li>
                         <li>
                            <router-link to="/managearticlelist" class="nav-items">
                                <i class="fa fa-folder" aria-hidden="true"></i>
                                <span>
                                文章管理
                            </span>
                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/article/create" class="nav-items">
                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                <span>
        						发布文章
        					</span>
                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="nav-list">
                    <ul>
                        <li>
                            <router-link to="" class="nav-items">
                                <i class="fa fa-commenting-o" aria-hidden="true"></i>
                                <span>
        						消息
        					</span>
                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="" class="nav-items">
                                <i class="fa fa-key" aria-hidden="true"></i>
                                <span>
        						修改密码
        					</span>
                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="nav-list">
                    <ul>
                        <li>
                            <div class="nav-items" @click="heandleExit">
                                <i class="fa fa-sign-out" aria-hidden="true"></i>
                                <span>
        						退出
        					</span>
                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
    </section>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'user-wrap',
    data() {
        return {};
    },
    computed: mapState(['user']),
    methods: {
        ...mapActions(['exit']),
        heandleExit() {
            this.exit();
            this.$api.SDK.User.logOut() // SDK 的退出
             this.$router.push({ path: '/' });
            console.log('成功退出');

        },
    }
};
</script>
<style lang="scss" scoped>
.user-header {
    background: #000;
    color: $text-color-imp;

    h2 {
        padding: px2rem(30) 0;
        font-size: $text-size-h;
        font-weight: bold;
        text-align: center;
        margin: 0;
    }

    .user-header-content {
        padding: 0 px2rem(30) px2rem(30);
        display: flex;
        align-items: center;
        font-size: $text-size-h;

        .user-img-box {
            img {
                width: px2rem(150);
            }
        }

        .user-text {
            padding-left: px2rem(30);
            flex: 2;

            .user-email {
                border-radius: 10px;
                background: #444;
                border: 1px solid #ccc;
                display: inline-block;
                padding: 0 px2rem(10);
                margin-top: px2rem(10);
            }
        }
    }
}

.nav-list {
    margin-bottom: px2rem(20);

    ul li {
        background: #fff;
        padding: 0 px2rem(50);

        .nav-items {
            font-size: $text-size-h;
            display: flex;

            i {
                font-size: px2rem(50);
                vertical-align: middle;
                padding: px2rem(30) 0;
            }

            span {
                display: block;
                border-bottom: 2px solid #f5f5f5;
                padding: px2rem(30) 0;
                margin-left: px2rem(30);
                flex: 2;

                i {
                    padding: 0;
                }
            }
        }
    }
}
</style>