<template>
    <div class="show-article">
        <div class="breadcrumbs">
            <ul class="clearfix" v-if="article">
                <li>
                    <router-link to="/" title="首页">首页</router-link>
                </li>
                <li>
                    <router-link :to="'/category?type='+ article.get('category').get('objectId')" title="article.get('category').get('name')">{{ article.get('category').get('name')}}</router-link>
                </li>
                <li>
                    <p>
                    	{{ article.get('title')|substr(0,20) }}
                    </p>
                </li>
            </ul>
        </div>
        <div class="list-wrap">
            <div class="list-content">
                <ul class="clearfix">
                    <li class="item-box" v-if="article">
                        <h2 class="item-title">{{ article.get('title') }}</h2>
                        <div class="item-meta">
                            <span>作者: {{ article.get('author').get('username') }}</span>
                            <span>日期: {{ FormatLocaDate(article.get('createdAt')) }}</span>
                            <span>分类: {{ article.get('category').get('name') }}</span>
                        </div>
                        <div class="item-content" v-html="article.get('content')">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'show-article',
    data() {
        return {
            article: null,
        };
    },
    created() {
        const id = this.$route.params.id;
        this.$vLoading.show();
        this.getArticle(id);
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        getArticle(id) {
            const q = new this.$api.SDK.Query('Article');
            q.include('author');
            q.include('category');
            q.get(id).then((article) => {
                this.article = article;
                this.$vLoading.hide();
            }).catch(this.fail)
        },
        fail(error) {
            alert(error);
            this.$vLoading.hide();
        },
        destroy() {
            this.article.destroy().then(() => {
                alert('删除成功');
                this.$router.replace({ path: '/' });
            })
        },
        FormatLocaDate(val) {
            var data = new Date(val);
            var str = '';
            str += data.getFullYear() + '-';

            if ((data.getMonth() + 1) < 10) {
                str += '0' + (data.getMonth() + 1) + '-';
            } else {
                str += (data.getMonth() + 1) + '-';
            }

            if (data.getDate() < 10) {
                str += '0' + data.getDate();
            } else {
                str += data.getDate();
            }
            return str;
        },
    }
};
</script>
<style lang="scss">
.breadcrumbs {
    background-color: #fff;
    margin: px2rem(20) 0;

    ul li {
        float: left;
        margin: 0 px2rem(20);
        padding: px2rem(20) px2rem(5);
        position: relative;
        color: $text-color;
        font-size: $text-size;
		p{
			@include ellipsis;
		}
        a {
            position: relative;
            display: block;
            font-size: $text-size;
            font-weight: bold;
            text-align: center;
            color: $link-color;
            text-transform: uppercase;

            &:after {
                content: '';
                display: block;
                position: absolute;
                top: px2rem(10);
                right: px2rem(-20);
                width: px2rem(10);
                height: px2rem(10);
                border-right: 2px solid $link-color;
                border-bottom: 2px solid $link-color;
                transform: rotate(-45deg);
            }
        }
    }
}
</style>