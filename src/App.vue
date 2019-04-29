<template>
    <div id="app">
        <my-header></my-header>
        <main>
            <router-view />
        </main>
        <my-footer></my-footer>
        <my-go-top></my-go-top>
        <!-- set progressbar -->
        <!-- <vue-progress-bar></vue-progress-bar> -->
    </div>
</template>
<script>
import MyHeader from '@/components/Header';
import MyFooter from '@/components/Footer';
import MyGoTop from '@/components/common/GoTop';


export default {
    name: 'app',
    data() {
        return {};
    },
    components: {
        MyHeader,
        MyFooter,
        MyGoTop
    },
    mounted() {
        this.$vLoading.hide();
    },
    created() {
        // console.log(this.$store);
        // console.log(this.$api);
       this.$vLoading.show();
        //  hook the progress bar to start before we move router-view
        this.$router.beforeEach((to, from, next) => {
            this.$vLoading.show();
            next()
        })
        //  hook the progress bar to finish after we've finished moving router-view
        this.$router.afterEach((to, from) => {
            //  finish the progress bar
           this.$vLoading.hide();
        })
    },
    methods:{
         
    }
};

</script>
<style lang="scss">
html,
body,
#app {
    height: 100%;
    min-height: 100%;
    width: 100%;
    background: #f5f5f5;
}

main {
    height: 100%;
}

.field-text.is-danger {
    color: #f22435;
    font-size: px2rem(20);
}
</style>