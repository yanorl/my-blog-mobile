<template>
    <div class="email-verification-wrap login-wrap">
        <div class="login-box">
            <h1>欢迎找回 Yan 博客体验系统密码</h1>
            <div class="top_hat"></div>
            <div class="login-content">
                <!-- logo -->
                <div class="logo-wrap">
                    <div class="logo-box">
                        <i class="fa fa-hacker-news" aria-hidden="true"></i>
                    </div>
                </div>
                <form class="form-box">
                      <div class="input-box">
                        <div class="input-group" :class="{ active: act_index === 1, error: errors.has('login_email') }">
                            <label for="login_email">邮箱:</label>
                            <input @blur.prevent="iosBlur" v-validate="'required|email'" data-vv-as="邮箱" @focus=" act_index = 1 " name="login_email" type="email" id="login_email" v-model="login_email" placeholder="请输入邮箱名" required />
                        </div>
                        <small v-show="errors.has('login_email')" class="field-text is-danger">{{ errors.first('login_email') }}</small>
                    </div>
                </form>
            </div>
            <div class="btn-wrap" @click='EmailBtnClick'>
                <p>提交</p>
            </div>
        </div>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip> 
    </div>
</template>
<script>
import alertTip from '@/components/common/AlertTip'
export default {
    name: 'email-verification-wrap',
    data() {
        return {
            act_index: 1,
            login_email:'',
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
        EmailBtnClick() {
            //判断当前是否校验全部通过
            this.$validator.validateAll().then((result) => {
                if (result) {
                    // 弹出等待的遮罩 层,防止二次点击.
                     this.$vLoading.show();
                    this.$api.SDK.User.requestPasswordReset(this.login_email).then((loginUser) => {
                        this.showAlert = true;
                        this.alertText = "已发送一份重置密码的指令到你的邮箱";
                        this.$vLoading.hide();
                        // this.$router.push({ path: '/login' }) 
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
</style>