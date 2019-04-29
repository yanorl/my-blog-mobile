<template>
    <div class="search-wrap">
        <div class="breadcrumbs">
            <ul class="clearfix">
                <li>
                    <router-link to="/" title="首页">首页</router-link>
                </li>
                <li>
                    <p>
                        搜索文章
                    </p>
                </li>
            </ul>
        </div>
        <div class="search-bar">
            <div class="search-bar-inner">
                <i class="fa fa-search"></i>
                <input @focus="changeCancel" v-model="searchTitle" ref="searchCore" type="search" placeholder="搜索" class="search-bar-core">
            </div>
            <span v-if="searchCancel" @click="clickCancel" class="search-bar-cancel">取消</span>
        </div>
        <div class="list-content">
            <ul class="clearfix">
                <li class="item-box" v-for="article in filteredBlogs">
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
    </div>
</template>
<script>
// @ is an alias to /src
export default {
    name: 'search-wrap',
    data() {
        return {
            articles: [],
            searchTitle: '',
            searchCancel: false
        };
    },
    created() {
        this.init()
    },
    watch: {
        ['$route.query']() {
            // console.log('re render');
            this.articles = [];
            this.init();
        },
    },
    computed: {
        filteredBlogs: function() {
            return this.articles.filter((blog) => {
                return blog.get('title').match(this.searchTitle);
            })
        }
    },
    methods: {
        init() {
            this.$vLoading.show();
            const q = this.query();
            this.setArticles(q);
        },
        //数据操作
        query() {
            let q = new this.$api.SDK.Query('Article');
            q.include('category');
            q.include('author');
            q.addDescending('createdAt'); // 新创建的在前面
            return q;
        },
        setArticles(q) {
            q.find().then((articles) => {
                var createdAt = articles.id;
                this.articles = articles;
                this.$vLoading.hide();
            }).catch(this.fail);
        },
        fail(error) {
            alert(error);
            this.$vLoading.hide();
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
        changeCancel() {
            this.searchCancel = true;
        },
        clickCancel() {
            this.searchTitle = "";
        }

    }
};
</script>
<style lang="scss">
.search-bar {
    display: flex;
    align-items: center;
    position: relative;
    background-color: #d9d9d9;
    box-sizing: border-box;
    padding: px2rem(16) px2rem(20);
    margin-bottom: px2rem(20);
    z-index: 1;
    font-size: $text-size;

    .search-bar-inner {
        display: flex;
        align-items: center;
        background-color: #fff;
        border-radius: px2rem(5);
        flex: 1;
        height: px2rem(56);
        padding: px2rem(10) px2rem(15);

        i {
            font-size: $text-size;
            color: #d9d9d9;
            margin-right: px2rem(10);
        }

        input.search-bar-core {
            border: 0;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            outline: 0;
            font-size: $text-size;
        }
    }

    .search-bar-cancel {
        color: $link-color;
        margin-left: px2rem(20);
        text-decoration: none;
    }
}
</style>