<template>
    <section class="menu-wrap">
        <div class="menu_box page_box  page_view page_view_left" id="menu-box">
            <i class="back_box fa fa-times-circle" id="back-box"></i>
            <div class="page_view_content fr">
            	<div class="menu-top">
            		<img src="../assets/img/no_signUp.jpg">
            		<router-link to="/login"  rel="nofollow">去登录</router-link>
            	</div>
            	<div class="menu-list">
            		<ul>
            			<li>
            				<a href="">testtesttesttesttest</a>
            			</li>
            			<li>
            				<a href="">test</a>
            			</li>
            			<li>
            				<a href="">testtesttesttesttest</a>
            			</li>
            		</ul>
            	</div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'menu-wrap',
    data() {
        return {};
    }
};
</script>
<style lang="scss" scoped>
	.menu-top{
		a{
			font-size: $text-size-imp;
	    	margin-left: px2rem(20);
	    	vertical-align: middle;
	    }
	    img{
	    	width: px2rem(150);
	    	height: px2rem(150);
	    }
	}
	.menu-list{
		margin: px2rem(30) 0;
		ul li{
		    float: left;
		    margin: px2rem(10);
		    a{
		    	padding: px2rem(20);
			    border: 1px solid #ccc;
			    border-radius: px2rem(10);
			    text-align: center;
			    background: #000;
			    color: #fff;
			    width: 100%;
			    font-weight: bold;
			    display: inline-block;
			    box-sizing: border-box;
			    font-size: $text-size;
		    }
		}
	}

</style>