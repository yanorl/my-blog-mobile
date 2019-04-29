<template>
    <div class="password-reset-wrap login-wrap">
        <div class="login-box">
            <h1>重置密码</h1>
            <div class="top_hat"></div>
            <div class="login-content">
                <!-- logo -->
                <div class="logo-wrap">
                    <div class="logo-box">
                        <i class="fa fa-hacker-news" aria-hidden="true"></i>
                    </div>
                </div>
                <form class="form-box">
                    <div class="input-box relative">
                        <div class="input-group" :class="{ active: act_index === 1, error: errors.has('login_password')  }">
                            <label for="login_password">新密码:</label>
                            <input @blur.prevent="iosBlur" ref="password1" v-validate="{ required: true, password: true, max: 12, min: 6 }" data-vv-as="新密码" @focus=" act_index = 1 " name="login_password" type="password" id="login_password" v-model="login_password" placeholder="请输入新密码" required />
                        </div>
                        <small v-show="errors.has('login_password')" class="field-text is-danger">{{ errors.first('login_password') }}</small>
                    </div>
                    <div class="input-box relative">
                        <div class="input-group" :class="{ active: act_index === 2, error: errors.has('login_rp_password')  }">
                            <label for="login_rp_password">再次输入:</label>
                            <input @blur.prevent="iosBlur" ref="password2" v-validate="{'required': 'true', 'is': login_password}" data-vv-as="再次输入密码" @focus=" act_index = 2 " name="login_rp_password" type="password" id="login_rp_password" v-model="login_rp_password" placeholder="请再次输入新密码" required />
                            <div class="eye-password" id="eye-password">
                                <i @click="eyePassword" class="fa" :class="{'fa-eye-slash' : !eye, 'fa-eye': eye }" aria-hidden="true"></i>
                            </div>
                        </div>
                        <small v-show="errors.has('login_rp_password')" class="field-text is-danger">{{ errors.first('login_rp_password') }}</small>
                    </div>
                </form>
            </div>
            <div class="btn-wrap" @click='PasswordResetBtnClick'>
                <p>重置</p>
            </div>
        </div>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip> 
    </div>
</template>
<script>
import alertTip from '@/components/common/AlertTip'
export default {
    name: 'password-reset-wrap',
    data() {
        return {
            act_index: 1,
             login_password: "",
            login_rp_password: "",
            eye: false,
            showAlert: false,
            alertText: null,
        };
    },
    mounted() {
        this.iosBlur();
    },
    create(){
         var tokens = location.search.match(/token=(\w*)/);
          if(tokens&&tokens[1]){
            this.token = tokens[1];
          }
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
        PasswordResetBtnClick() {
            //判断当前是否校验全部通过

            this.$validator.validateAll().then((result) => {
                if (result) {
                    // 弹出等待的遮罩 层,防止二次点击.
                     this.$vLoading.show();
                     var token = location.search.match(/token=(\w*)/);
                      if(token&&token[1]){
                        token = token[1];
                    }
                     console.log(token);
                    this.$api.SDK.User.save(this.login_password,token).then((loginUser) => {
                        this.showAlert = true;
                        this.alertText = "密码重置成功";

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