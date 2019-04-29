<template>
    <div class="manage-article-list-wrap">
        <div class="breadcrumbs">
            <ul class="clearfix">
                <li>
                    <router-link to="/user" title="个人中心">个人中心</router-link>
                </li>
                <li>
                    <p>
                        文章管理
                    </p>
                </li>
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
                    <div class="oprator clearfix">
                        <router-link :to="{name:'EditArticle', params:{id:article.id}}" class="oprator-list">
                            <span><i class="fa fa-pencil" aria-hidden="true"></i></span>
                        </router-link>
                        <div class="oprator-list destroy">
                            <span  @click="destroy(article.id)">
                                    <i class="fa fa-trash-o " aria-hidden="true"></i>
                                </span>
                        </div>
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
import { mapGetters } from 'vuex';
import alertTip from '@/components/common/AlertTip'

export default {
    name: 'manage-article-list-wrap',
    data() {
        return {
            articles: [],
            busy: true,
            page: 1,
            pageSize: 6,
            infinite: false,
            del: false,
            showAlert: false,
            alertText: null
        };
    },
    created() {
        this.match(false)
    },
    watch: {
        del: {
            handler(newValue, oldValue) {
                this.page = 1;
                this.articles = [];
                this.match(false);
                this.del = false;
            },
            deep: true

        },
    },
    computed: {
        ...mapGetters(['uid'])
    },
    components: {
        alertTip
    },
    methods: {
        match(boolean) {
            let flag = this.$route.query.type || this.$route.query.cid || this.$route.path;
            let uid = this.uid;
            this.$vLoading.show();
            this.getMyArticles(uid, this.pageSize, boolean);
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
        //获取数据
        getMyArticles(uid, number, boolean) {
            let uidObj = this.getAuthorObj(uid);
            const q = this.query(number);
            q.equalTo('author', uidObj);
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
        },
        destroy(ids) {
            var aritcleDel = this.$api.SDK.Object.createWithoutData('Article', ids);
            aritcleDel.destroy().then(() => {
                this.del = true;
                this.$router.replace({ path: '/managearticlelist' });
            }, function(error) {
                if (error) {
                    this.showAlert = true;
                    this.alertText = error.rawMessage;
                }
            })
        },
    },
};
</script>
<style lang="scss">
.oprator {
    .oprator-list {
        float: left;
        padding: px2rem(10) px2rem(25);
        border-radius: px2rem(10);
        background: #000;
        color: #fff;
        margin: 0 px2rem(15);

        &.destroy {
            background: $error-color;
        }

        i {
            font-size: $text-size;

        }

    }
}
</style>