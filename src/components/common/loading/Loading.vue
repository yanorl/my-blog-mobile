<template>
    <div class="loading-wrap" v-if="isShow">
        <div class="loading-bg"></div>
        <div class="loading-box">
            <div class="loader" v-if="isShow">
                <div class="loader-inner pacman">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "loading-wrap",
    data() {
        return {
            isShow: false // 控制是否显示
        };
    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.loading-bg{
      background: rgba(0, 0, 0, 0.3);
    height: 100%;
        position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
        z-index: 9999;
}
.loading-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999;
}

.loader {
    box-sizing: border-box;
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 25%;
    align-items: center;
    justify-content: center;
}

.pacman {
    position: relative;
}

.pacman>div:nth-child(2) {
    animation: pacman-balls 1s 0s infinite linear;
}

.pacman>div:nth-child(3) {
    animation: pacman-balls 1s 0.33s infinite linear;
}

.pacman>div:nth-child(4) {
    animation: pacman-balls 1s 0.66s infinite linear;
}

.pacman>div:nth-child(5) {
    animation: pacman-balls 1s 0.99s infinite linear;
}

.pacman>div:first-of-type {
    width: 0px;
    height: 0px;
    border-right: px2rem(50) solid transparent;
    border-top: px2rem(50) solid $link-color;
    border-left: px2rem(50) solid $link-color;
    border-bottom: px2rem(50) solid $link-color;
    border-radius: px2rem(50);
    animation: rotate_pacman_half_up 0.5s 0s infinite;
}

.pacman>div:nth-child(2) {
    width: 0px;
    height: 0px;
    border-right: px2rem(50) solid transparent;
    border-top: px2rem(50) solid $link-color;
    border-left: px2rem(50) solid $link-color;
    border-bottom: px2rem(50) solid $link-color;
    border-radius: px2rem(50);
    animation: rotate_pacman_half_down 0.5s 0s infinite;
    margin-top: px2rem(-100);
}

.pacman>div:nth-child(3),
.pacman>div:nth-child(4),
.pacman>div:nth-child(5),
.pacman>div:nth-child(6) {
    background-color: $link-color;
    width: px2rem(30);
    height: px2rem(30);
    border-radius: 100%;
    position: absolute;
    transform: translate(0, px2rem(-6.25));
    top: px2rem(50);
    left: px2rem(150);
}

@-webkit-keyframes rotate_pacman_half_up {
    0% {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg);
    }

    50% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }

    100% {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg);
    }
}

@keyframes rotate_pacman_half_up {
    0% {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg);
    }

    50% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }

    100% {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg);
    }
}

@-webkit-keyframes rotate_pacman_half_down {
    0% {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    50% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }
}

@keyframes rotate_pacman_half_down {
    0% {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    50% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }
}

@-webkit-keyframes pacman-balls {
    75% {
        opacity: 0.7;
    }

    100% {
        -webkit-transform: translate(px2rem(-100), px2rem(-6.25));
        transform: translate(px2rem(-100), px2rem(-6.25));
    }
}

@keyframes pacman-balls {
    75% {
        opacity: 0.7;
    }

    100% {
        -webkit-transform: translate(px2rem(-100), px2rem(-6.25));
        transform: translate(px2rem(-100), px2rem(-6.25));
    }
}
</style>