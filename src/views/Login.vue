<template>
    <div class="login-wrap">
        <div class="login-box">
            <h1>欢迎登录 Yan 博客体验系统</h1>
            <div class="top_hat"></div>
            <div class="login-content">
                <!-- logo -->
                <div class="logo-wrap">
                    <div class="logo-box">
                        <i class="fa fa-hacker-news" aria-hidden="true"></i>
                    </div>
                </div>
                <!-- 登录的表达 -->
                <form class="form-box">
                    <div class="input-box">
                        <div class="input-group" :class="{ active: act_index === 1, error: errors.has('user_name') }">
                            <label for="user_name">账号:</label>
                            <input @blur.prevent="iosBlur" v-validate="'required'" data-vv-as="账号" @focus=" act_index = 1 " name="user_name" type="text" id="user_name" v-model="user_name" placeholder="用户名" required />
                        </div>
                        <small v-show="errors.has('user_name')" class="field-text is-danger">{{ errors.first('user_name') }}</small>
                    </div>
                    <div class="input-box relative">
                        <div class="input-group" :class="{ active: act_index === 2, error: errors.has('login_password')  }">
                            <label for="login_password">密码:</label>
                            <input ref="password" @blur.prevent="iosBlur" v-validate="{ required: true, password: true, max: 12, min: 6 }" data-vv-as="密码" @focus=" act_index = 2 " name="login_password" type="password" id="login_password" v-model="login_password" placeholder="请输入密码" required />
                            <div class="eye-password" id="eye-password">
                                <i @click="eyePassword" class="fa" :class="{'fa-eye-slash' : !eye, 'fa-eye': eye }" aria-hidden="true"></i>
                            </div>
                        </div>
                        <small v-show="errors.has('login_password')" class="field-text is-danger">{{ errors.first('login_password') }}</small>
                    </div>
                    <div class="ck-row">
                        <div class="ckbox_wrap" @click="remembSet" :class="{ active : rememb }">
                            <i class="fa" :class="{ 'fa-check-square-o': rememb, 'fa-square-o': !rememb }" aria-hidden="true"></i>
                            <span>记住密码</span>
                        </div>
                        <div @click="autologinSet" class="ckbox_wrap" :class="{ active : autologin }">
                            <i class="fa" :class="{ 'fa-check-square-o': autologin, 'fa-square-o': !autologin }" aria-hidden="true"></i>
                            <span>自动登录</span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="btn-wrap" @click='loginBtnClick'>
                <p>登录</p>
            </div>
            <div class="text-link clearfix">
                <router-link to="/reg" class="fl"><i class="fa fa-registered" aria-hidden="true"></i> 注册</router-link>
                <router-link to="/emailverification" class="fr"><i class="fa fa-key" aria-hidden="true"></i> 忘记密码？</router-link>
            </div>
        </div>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip> 
    </div>
</template>
<script>
import alertTip from '@/components/common/AlertTip'

export default {
    name: 'login-wrap',
    data() {
        return {
            act_index: 1,
            user_name: "",
            login_password: "",
            eye: false,
            rememb: false,
            autologin: false,
            showAlert: false,
            alertText: null
        };
    },
    components:{
        alertTip
    },
    mounted() {
        this.iosBlur();
        var data = JSON.parse(localStorage.getItem("Login_data"));
        if (data) {
            this.user_name = data.user_name;
            this.login_password = data.login_password;;
            this.rememb = data.rememb;
            this.autologin = data.autologin;
        }

        //强制执行验证
        // this.$validator.validate();
        if (this.autologin) {
            this.loginBtnClick();
        }
    },
    methods: {
        eyePassword() {
            this.eye = !this.eye;
            if (this.eye) {
                this.$refs.password.type = "text";
            } else {
                this.$refs.password.type = "password";
            }
            // this.eye && (this.$refs.password.type = "text"); 
            // this.eye || (this.$refs.password.type = "password"); 
        },
        autologinSet() {
            //设置当前autologin为true或者false
            this.autologin = !this.autologin;
            //另外设置 rememb的值
            this.autologin && (this.rememb = true);
        },
        remembSet() {
            this.rememb = !this.rememb;
            this.rememb || (this.autologin = false);
        },
        loginBtnClick() {
            //判断当前是否校验全部通过
            this.$validator.validateAll().then((result) => {
                if (result) {
                    // 弹出等待的遮罩 层,防止二次点击.
                     this.$vLoading.show();
                    this.$api.SDK.User.logIn(this.user_name, this.login_password).then((loginUser) => {
                        this.$vLoading.hide();
                        //记住用户密码
                        localStorage.setItem('Login_data', JSON.stringify({
                            rememb: this.rememb,
                            autologin: this.autologin,
                            user_name: this.rememb ? this.user_name : "",
                            login_password: this.rememb ? this.login_password : ""
                        }))
                        this.$store.dispatch('login', loginUser); // 保存到 Vuex 中
                        this.$router.push({ path: '/user' }); //跳转到个人中心
                    }).catch(error => {
                        this.showAlert = true;
                        this.alertText = error.rawMessage;
                        this.$vLoading.hide();
                    })
                }

            });
        }
    }
};
</script>
<style lang="scss">
h1 {
    text-align: center;
    font-size: px2rem(36);
    height: px2rem(36);
    padding: 0 0 px2rem(44) 0;
    line-height: px2rem(36);
    color: $text-color-imp;
    box-sizing: content-box;
}

@mixin login_btn {
    background-color: #fff;
    border-radius: px2rem(20);
}

.login-wrap {
    background-color: #000;
    height: auto;
    min-height: 100%;
    padding-bottom: px2rem(30);
    .login-box {
        width: px2rem(650);
        margin: 0 auto;
        // height: 100%;
         padding: px2rem(60) 0;
        .top_hat {
            width: px2rem(537);
            height: px2rem(18);
            background-color: #eee;
            margin: 0 auto;
            border-radius: px2rem(18) px2rem(18) 0 0;
        }
        .login-content {
            @include login_btn;
            padding: 0 px2rem(30) px2rem(80);
            box-sizing: border-box;

            .logo-wrap {
                padding: px2rem(80) 0;
                text-align: center;
                .logo-box i {
                    font-size: px2rem(190);
                }
            }
            .input-box {
                color: $text-color;
                margin: 0 auto px2rem(30);
                .input-group {
                    border: 2px solid #e2e2e2;
                    border-radius: px2rem(20);
                    font-size: $text-size-h;
                    line-height: px2rem(80);
                    padding: 0 px2rem(20);
                    margin-bottom: px2rem(15);
                    input {
                        border: 0 none;
                        font-size: $text-size;
                        line-height: px2rem(80);
                        padding-left: 1em;
                        width: px2rem(395);
                    }
                    .eye-password {
                        position: absolute;
                        top: 0;
                        right: px2rem(36);
                    }
                }
            }

            .input-group.active {
                color: $act-color;
                border: 2px solid $act-color;
            }
            .input-group.error {
                color: $error-color;
                border: 2px solid $error-color;
            }
            .ck-row {
                color: $text-color;
                margin: 0 auto 0.64rem;
                font-size: $text-size;
                display: flex;
                justify-content: space-around;
                .ckbox_wrap {
                    padding-top: px2rem(8);
                    i::before {
                        vertical-align: middle;
                        display: inline-block;
                        height: px2rem(30);
                        width: px2rem(30);
                        font-size: px2rem(30);
                    }
                }
                .ckbox_wrap.active {
                    color: $act-color;
                }
            }
        }
        .btn-wrap {
            @include login_btn;
            font-weight: 700;
            letter-spacing: px2rem(10);
            height: px2rem(100);
            text-align: center;
            line-height: px2rem(100);
            font-size: $text-size-imp;
            color: $act-color;
            margin-top: px2rem(20);
        }
        .text-link {
            margin-top: px2rem(20);
            a {
                font-size: $text-size-mid;
                font-weight: bold;
                color: $text-color-imp;
                line-height: 1.4;
                i.fa-registered {
                    font-size: px2rem(22);
                    vertical-align: top;
                }
            }
        }
    }
}
</style>