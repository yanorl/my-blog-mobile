<template>
    <div id="goTop">
        <div class="goTop" v-show="goTopShow" @click="goTop">
            <i class="fa fa-angle-up"></i>
        </div>
    </div>
</template>
<script>
export default {
    name: "goTop",
    data() {
        return {
            scrollTop: "",
            goTopShow: false
        };
    },
    watch: {
        scrollTop(val) {
            if (this.scrollTop > 500) {
                this.goTopShow = true;
            } else {
                this.goTopShow = false;
            }
        }
    },
    methods: {
        handleScroll() {
            this.scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            if (this.scrollTop > 500) {
                this.goTopShow = true;
            }
        },
        goTop() {
            let timer = null,
                _that = this;
            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(function fn() {
                if (_that.scrollTop > 0) {
                    _that.scrollTop -= 100;
                    document.body.scrollTop = document.documentElement.scrollTop =
                        _that.scrollTop;
                    timer = requestAnimationFrame(fn);
                } else {
                    cancelAnimationFrame(timer);
                    _that.goTopShow = false;
                }
            });
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>
<style scoped lang="scss">
.goTop {
    position: fixed;
    right: px2rem(40);
    bottom: px2rem(60);
    width: px2rem(80);
    height: px2rem(80);
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .4);
    border: 1px solid rgba(0, 0, 0, .2);
    background: rgba(0, 0, 0, .5);
    padding: px2rem(10);
    cursor: pointer;
    @include flex-center;

    i {
        font-size: $i-size;
        color: #fff;
    }

    &:active i {
        color: rgba(51, 153, 255, 1);
    }
}
</style>