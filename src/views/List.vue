<template>
    <div class="list-wrap">
        <my-banner></my-banner>
        <div class="breadcrumbs" v-if="breadcrumbs">
            <ul class="clearfix">
                <template v-if="breadcrumbsMe">
                    <li>
                        <router-link to="/user" title="个人中心">个人中心</router-link>
                    </li>
                    <li>
                        我的文章
                    </li>
                </template>
                <template v-else-if="articles[0]">
                    <li>
                        <router-link to="/" title="首页">首页</router-link>
                    </li>
                    <li>
                        <p>
                            {{ articles[0].get('category').get('name')|substr(0,100)}}
                        </p>
                    </li>
                </template>
            </ul>
        </div>
        <div class="list-content">
            <ul class="clearfix">
                <li class="item-box" v-for="article in articles">
                    <h2 class="item-title">
                    <router-link :to="{ name:'ShowArticle', params: { id: article.id }}" :title="article.get('title')">{{ article.get('title') }}</router-link>
                </h2>
                    <div class="item-meta">
                        <span>作者: {{ article.get('author').get('username') }}</span>
                        <span>日期: {{ FormatLocaDate(article.get('createdAt')) }}</span>
                        <span>分类: {{ article.get('category').get('name') }}</span>
                    </div>
                    <div class="item-content" v-html="$options.filters.substr(article.get('content'),0,300)">
                    </div>
                    <div class="more-box">
                        <router-link :to="{ name:'ShowArticle', params: { id: article.id }}" :title="article.get('title')" class="btn">阅读全文</router-link>
                    </div>
                </li>
            </ul>
        </div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
            <div class="infinite-content" v-if="infinite">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <span  ref="infiniteLoadingText">加载中...</span>
            </div>
        </div>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip> 
    </div>
</template>
<script>
// @ is an alias to /src
import MyBanner from "@/components/Banner";
import alertTip from '@/components/common/AlertTip'

import { mapState, mapGetters } from 'vuex';
export default {
    name: 'list-wrap',
    data() {
        return {
            breadcrumbs: true,
            breadcrumbsMe: false,
            articles: [],
            busy: true,
            page: 1,
            pageSize: 3,
            infinite: false,
             showAlert: false,
            alertText: null
        };
    },
    components: {
        MyBanner,
        alertTip
    },
    created() {
        this.showBreadCrumbs(),
            this.match(false)
    },
    watch: {
        ['$route.query']() {
            // console.log('re render');
            this.page = 1;
            this.articles = [];
            this.match(false);
            this.showBreadCrumbs();
        },
    },
    computed: {
        ...mapState(['user']),
        ...mapGetters(['uid'])
    },
    methods: {
        showBreadCrumbs() {
            (this.$route.path == '/') ? (this.breadcrumbs = false) : (this.breadcrumbs = true);
            (this.$route.path == '/me') ? (this.breadcrumbsMe = true) : (this.breadcrumbsMe = false);
        },
        match(boolean) {
            let flag = this.$route.query.type || this.$route.query.cid || this.$route.path;
            let uid = this.uid;
            this.$vLoading.show();
            switch (flag) {
                case '/me':
                    this.getMyArticles(uid, this.pageSize, boolean);
                    break;
                case '/':
                    this.getAllArticles(this.pageSize, boolean);
                    break;
                default:
                    this.getCategoryArticle(flag, this.pageSize, boolean);
            }
        },
        //数据操作
        query(number) {
            let currentPage = parseInt(this.page) > 0 ? parseInt(this.page) : 1;
            let pageSize = parseInt(this.pageSize) > 0 ? parseInt(this.pageSize) : 5;
            // 要跳过多少条
            let skip = (currentPage - 1) * pageSize;

            let q = new this.$api.SDK.Query('Article');
            q.include('category');
            q.include('author');
            q.addDescending('createdAt'); // 新创建的在前面
            q.limit(number);
            q.skip(skip);
            return q;
        },
        setArticles(q, boolean) {
            q.find().then((articles) => {
                if (articles.length) {
                    if (boolean) {
                        // 多次加载数据
                        this.articles = this.articles.concat(articles); //concat数组串联进行合并
                        this.$vLoading.hide();
                        this.busy = false;
                    } else {
                        // 第一次加载数据
                        var createdAt = articles.id;
                        this.articles = articles;
                        this.$vLoading.hide();
                        // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
                        this.busy = false;
                        this.infinite = false;
                    }
                } else {
                    // this.$refs.infiniteLoadingText.innerHTML = "没有了";
                    this.busy = true;
                    this.$vLoading.hide();
                    this.infinite = false;
                }
            }).catch(this.fail);
        },
        fail(error) {
            // this.$message.error(error);
             this.showAlert = true;
            this.alertText = error;
            this.$vLoading.hide();
        },
        getAuthorObj(uid) {
            return this.$api.SDK.Object.createWithoutData('Author', uid);
        },
        getCategoryObj(id) {
            return this.$api.SDK.Object.createWithoutData('Category', id);
        },
        //获取数据
        getMyArticles(uid, number, boolean) {
            let uidObj = this.getAuthorObj(uid);
            const q = this.query(number);
            q.equalTo('author', uidObj);
            this.setArticles(q, boolean);
        },
        getAllArticles(number, boolean) {
            const q = this.query(number);
            this.setArticles(q, boolean);
        },
        getCategoryArticle(cid, number, boolean) {
            let cateObj = this.getCategoryObj(cid);
            const q = this.query(number);
            q.equalTo('category', cateObj);
            this.setArticles(q, boolean);
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
        loadMore: function() {
            this.busy = true;
            this.infinite = true;
            // 多次加载数据
            setTimeout(() => {
                this.page++;
                this.match(true);
            }, 1000);
        }
    },
};
</script>
<style lang="scss">
.list-wrap .breadcrumbs{
    margin-top:0;
}
.list-content {
    &>ul>li {
        margin-bottom: px2rem(20);
        padding: px2rem(20);
        background: #FFF;
        box-shadow: 0 0 px2rem(5) rgba(0, 0, 0, 0.2);

        h2.item-title {
            font-size: $text-size-h;
            margin: px2rem(10) 0;
            @include ellipsis;
            color: $link-color;
        }

        .item-meta {
            @include ellipsis;
            font-size: $text-size;
            color: $text-color;
            padding-bottom: px2rem(10);
            margin-bottom: px2rem(10);
            border-bottom: 2px dashed #ddd;

            span {
                margin-right: px2rem(20);
            }
        }

        .item-content {
            font-size: $text-size;
            line-height: 1.5;
            margin-bottom: px2rem(10);
            overflow: hidden;

            * {
                font-size: $text-size !important;
                font-family: 'PingFang SC', '\5b8b\4f53', 'Helvetica Neue', Arial, 'Liberation Sans', FreeSans, 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif !important;
                line-height: 1.4 !important;
                width: 100% !important;

                img {
                    max-width: 100%;
                }
            }

            pre,
            pre code {
                display: block;
                padding: px2rem(10);
                margin: px2rem(10) 0;
                background: #002b36;
                color: #839496;
                white-space: pre-wrap;
            }

            a {
                color: $link-color;
            }

            img {
                max-width: 100%;
            }
        }

        .more-box {
            text-align: right;
            margin: px2rem(10) 0;

            .btn {
                font-size: $text-size-small;
                background: #000;
                color: #fff;
                border-radius: px2rem(10);
                padding: px2rem(10);
            }
        }
    }
}

.infinite-content {
    text-align: center;
    color: $text-color;
    font-size: $text-size;

    i {
        vertical-align: middle;
    }
}
</style>