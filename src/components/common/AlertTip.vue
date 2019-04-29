 <template>
    <div class="alet_container">
	    <section class="tip_text_container">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            <p class="tip_text">{{alertText}}</p>
            <div class="confrim" @click="closeTip">确认</div>
        </section>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
               
            }
        },
        mounted(){
      
        },
        props: ['alertText'],
        methods: {
            closeTip(){
                this.$emit('closeTip')
            }
        }
    }
</script>

<style lang="scss" scoped>
    //宽高
@mixin wh($width, $height){
    width: $width;
    height: $height;
}
//字体大小，颜色
@mixin sc($size, $color){
    font-size: $size;
    color: $color;
}
	@keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }
    .alet_container{
    	position: fixed;
    	top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
        background:rgba(0,0,0,0.5);
    }
    .tip_text_container{
        position: absolute;
        left:0;
        right:0;
        top:0;
        bottom: 0;
        margin:auto;
        width: px2rem(550);
        height: min-content;
        animation: tipMove .4s ;
        background-color: rgba(255,255,255,1);
        border: 1px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px;
        border-radius: px2rem(10);
        i{
            font-size: px2rem(100);
            margin-top:px2rem(35);
            color: #f8cb86;
        }
        .tip_text{
            @include sc($text-size-imp, $text-color);
            text-align: center;
            margin-top:px2rem(35);
            padding: 0 px2rem(15);
        }
        .confrim{
            @include sc($text-size-imp, $text-color-imp);
            font-weight: bold;
           margin-top:px2rem(35);
            background-color: #4cd964;
            width: 100%;
            text-align: center;
            padding: px2rem(20) 0;
            border: 1px;
            border-bottom-left-radius: px2rem(10);
            border-bottom-right-radius: px2rem(10);
        }
    }
    
</style>
