<template>
    <div class="swiper-wrap">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) of BannerList" :key="index">
                <img :src="item.imageUrl">
                <div class="title" :class="item.titleColor" v-if="item.typeTitle">
                    {{item.typeTitle}}
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name: 'swiper-wrap',
    data() {
        return {
            BannerList: [
            	{imageUrl:require("../assets/img/banner1.jpg"),titleColor:"red", typeTitle:"banner1"},
            	{imageUrl:require("../assets/img/banner2.jpg"),titleColor:"blue", typeTitle:"banner2"}
            ],
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                },
                on: {},
                autoplay: {
                    disableOnInteraction: false
                }
            }
        }
    },
    created() {
        
    },
    components: {
        swiper,
        swiperSlide
    },
    methods: {
    }
};
</script>
<style lang="scss">
.swiper-wrap {
  // margin-bottom: .4rem;
  padding: 0.3rem;
  .swiper-container {
    border-radius: 0.2rem;
    overflow: hidden;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
  .swiper-pagination-bullet {
    width: 0.12rem;
    height: 0.12rem;
    background: #fff;
  }
  .swiper-pagination-bullet-active {
    background: #d65132;
  }
  .title {
    position: absolute;
    right: 0;
    bottom: 0;
    height: .4rem;
    padding: 0 .2rem;
    line-height: .4rem;
    color: #fff;
    font-size: .2rem;
    border-top-left-radius: .2rem;
    border-bottom-right-radius: .2rem;
    z-index: 10;
    &.red {
      background-color: #de615f;
    }
    &.blue {
      background-color: #60a2ee;
    }
  }
}
</style>