<template>
    <footer class="footer-wrap">

        <div class="fixed-bottom-btn">
            <a href="javascript:;" id="return-to-top" class="scroll-top">
           	 	<i class="fa fa-chevron-up"></i>
        	</a>
        </div>
    </footer>
</template>
<script>
export default {
    name: 'footer-wrap',
    data() {
        return {};
    }
};
</script>
<style lang="scss" scoped>
	.fixed-bottom-btn {
	    position: fixed;
	    right: px2rem(10);
	    bottom: px2rem(200);
	    z-index: 999;
	    a{
	    	border-radius: 50%;
		    background: rgba(0, 0, 0, .5);
		    display: none;
		    width: px2rem(80);
		    height: px2rem(80);
		    line-height: px2rem(80);
		    margin: px2rem(10) 0;
		    text-align: center;
		    box-shadow: 0 2px px2rem(10) rgba(0, 0, 0, .4);
		    border: 1px solid rgba(0, 0, 0, .2);
		    position: relative;
		    i{
		    	color: #fff;
    			font-size: $text-size-imp;
		    }
	    }
	}
</style>