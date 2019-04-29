<template>
    <div class="login-wrap">
        <div class="login-box">
            <h1>欢迎注册 Yan 博客体验系统</h1>
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
                        <div class="input-group" :class="{ active: act_index === 1, error: errors.has('login_email') }">
                            <label for="login_email">邮箱:</label>
                            <input @blur.prevent="iosBlur" v-validate="'required|email'" data-vv-as="邮箱" @focus=" act_index = 1 " name="login_email" type="email" id="login_email" v-model="login_email" placeholder="请输入邮箱名" required />
                        </div>
                        <small v-show="errors.has('login_email')" class="field-text is-danger">{{ errors.first('login_email') }}</small>
                    </div>
                    <div class="input-box">
                         <div class="input-group" :class="{ active: act_index === 4, error: errors.has('user_name') }">
                            <label for="user_name">用户名:</label>
                            <input @blur.prevent="iosBlur" v-validate="'required'" data-vv-as="用户名" @focus=" act_index = 4 " name="user_name" type="text" id="user_name" v-model="user_name" placeholder="请输入用户名" required />
                        </div>
                        <small v-show="errors.has('user_name')" class="field-text is-danger">{{ errors.first('user_name') }}</small>
                    </div>
                    <div class="input-box relative">
                        <div class="input-group" :class="{ active: act_index === 2, error: errors.has('login_password')  }">
                            <label for="login_password">密码:</label>
                            <input @blur.prevent="iosBlur" ref="password1" v-validate="{ required: true, password: true, max: 12, min: 6 }" data-vv-as="密码" @focus=" act_index = 2 " name="login_password" type="password" id="login_password" v-model="login_password" placeholder="请输入密码" required />
                        </div>
                        <small v-show="errors.has('login_password')" class="field-text is-danger">{{ errors.first('login_password') }}</small>
                    </div>
                    <div class="input-box relative">
                        <div class="input-group" :class="{ active: act_index === 3, error: errors.has('login_rp_password')  }">
                            <label for="login_rp_password">确认密码:</label>
                            <input @blur.prevent="iosBlur" ref="password2" v-validate="{'required': 'true', 'is': login_password}" data-vv-as="确认密码" @focus=" act_index = 3 " name="login_rp_password" type="password" id="login_rp_password" v-model="login_rp_password" placeholder="请再次输入密码" required />
                            <div class="eye-password" id="eye-password">
                                <i @click="eyePassword" class="fa" :class="{'fa-eye-slash' : !eye, 'fa-eye': eye }" aria-hidden="true"></i>
                            </div>
                        </div>
                        <small v-show="errors.has('login_rp_password')" class="field-text is-danger">{{ errors.first('login_rp_password') }}</small>
                    </div>
                    <!--   <div class="ck-row">
                        <div class="ckbox_wrap" @click="remembSet" :class="{ active : rememb }">
                            <i class="fa" :class="{ 'fa-check-square-o': rememb, 'fa-square-o': !rememb }" aria-hidden="true"></i>
                            <span>记住密码</span>
                        </div>
                        <div @click="autologinSet" class="ckbox_wrap" :class="{ active : autologin }">
                            <i class="fa" :class="{ 'fa-check-square-o': autologin, 'fa-square-o': !autologin }" aria-hidden="true"></i>
                            <span>自动登录</span>
                        </div>
                    </div> -->
                </form>
            </div>
            <div class="btn-wrap" @click='loginBtnClick'>
                <p>注册</p>
            </div>
            <div class="text-link clearfix">
                <router-link to="/login" class="fr"><i class="fa fa-sign-in" aria-hidden="true"></i> 已有账号？</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import alertTip from '@/components/common/AlertTip'
export default {
    name: 'registered-wrap',
    data() {
        return {
            act_index: 1,
            user_name: "",
            login_email: "",
            login_password: "",
            login_rp_password: "",
            eye: false,
            rememb: false,
            autologin: false,
            showAlert: false,
            alertText: null
        };
    },
      mounted() {
        this.iosBlur();
    },
    components:{
        alertTip
    },
    methods: {
        eyePassword() {
            this.eye = !this.eye;
            if (this.eye) {
                this.$refs.password1.type = "text";
                this.$refs.password2.type = "text";
            } else {
                this.$refs.password1.type = "password";
                this.$refs.password2.type = "password";
            }
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
                    let user = new this.$api.SDK.User();
                    user.setUsername(this.user_name);
                    user.setPassword(this.login_password);
                    user.setEmail(this.login_email);

                    user.signUp().then((loginUser) => {
                        this.$store.commit('setUser', loginUser); // 保存到 Vuex 中
                        this.$router.push({ path: '/user' }) //跳转到个人中心
                        this.$vLoading.hide();
                    }).catch(error => {
                       this.showAlert = true;
                        this.alertText = "error.rawMessage";
                       this.$vLoading.hide();
                    })
                }

            });
        }
    }
};
</script>
<style lang="scss" scoped>
</style>