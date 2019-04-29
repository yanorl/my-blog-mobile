<template>
    <div class="edit-article-wrap">
        <div class="breadcrumbs">
            <ul class="clearfix">
                <li>
                    <router-link to="/" title="首页">首页</router-link>
                </li>
                <li>
                    <p>
                        修改博客内容
                    </p>
                </li>
            </ul>
        </div>
        <div class="article-box">
            <div class="article-content">
                <form class="form-box">
                    <div class="form-group required">
                        <label class="label-box">
                            <p>文章分类:</p>
                            <select v-model="form.category">
                                <option disabled>选择分类</option>
                                <option v-for="cate in categorys" :key="cate.id" :label="cate.get('name')" :value="cate">{{ cate.get('name') }}</option>
                            </select>
                        </label>
                    </div>
                    <div class="form-group required">
                        <label class="label-box">
                            <p>文章标题:</p>
                            <input @blur.prevent="iosBlur" v-validate="'required'" data-vv-as="文章标题" type="text" placeholder="请输入文章标题" name="form_title" v-model="form.title" class="input-box" :class="{ error: errors.has('form_title') }">
                            <small v-show="errors.has('form_title')" class="field-text is-danger">{{ errors.first('form_title') }}</small>
                        </label>
                    </div>
                    <div class="form-group required">
                        <label class="label-box">
                            <p>文章内容:</p>
                            <div class="editor-box" ref="eidtContent" contenteditable="true">
                            </div>
                            <small v-if="validate.error" class="field-text is-danger">正文怎能没有内容呢？</small>
                        </label>
                    </div>
                </form>
                <div class="btn-wrap" @click='CreateBtnClick'>
                    <p>发布文章</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'edit-article-wrap',
    data() {
        return {
            categorys: [],
            form: {
                category: null,
                title: ''
            },
            validate: {
                error: false
            }
        }
    },
    created() {
        this.getCategory();
        this.getArticle();
    },
    computed: mapState(['user']),
    methods: {
        content() {
            return this.$refs.eidtContent.innerHTML;
        },
        validateContent() {
            if (this.content() == "") {
                this.validate.error = true;
                this.$refs.eidtContent.style.borderColor = "#f44336";
            } else {
                this.validate.error = false;
                this.$refs.eidtContent.style.borderColor = '#e2e2e2';
            }
        },
        getCategory() {
            const cq = new this.$api.SDK.Query('Category');
            cq.find().then((categorys) => {
                this.categorys = categorys;
                this.form.category = categorys[0];
            }).catch(console.error)
        },

        setArticle() {
            const article = this.article;
            article.set('author', this.user);
            article.set('title', this.form.title);
            article.set('content', this.content());
            article.set('category', this.form.category);
            return article;
        },
        getArticle() {
            const id = this.$route.params.id;
            let q = new this.$api.SDK.Query('Article');
            q.include('category');
            q.get(id).then((article) => {
                this.article = article;

                this.form.title = article.get('title');
                const cid = article.get('category').id;
                const index = this.categorys.findIndex(c => c.id == cid);
                this.form.category = this.categorys[index];
                this.$refs.eidtContent.innerHTML = article.get('content');
                this.$vLoading.hide();
            })
        },
        save(article) {
            article.save().then((article) => {
                const message = `文章《${article.get('title')}》修改成功`;
                alert(message);
                this.$vLoading.hide();
                this.$router.replace({ name: "ShowArticle", params: { id: article.id } });
            }).catch(error => {
                alert(error);
                this.$vLoading.hide();
            });
        },
        CreateBtnClick() {
            //判断当前是否校验全部通过
            this.$validator.validateAll().then((result) => {
                this.validateContent();
                if (result) {
                    const article = this.setArticle();
                    this.save(article);
                } else {
                    this.$vLoading.hide();
                    return false;
                }
            })
        }
    }
}
</script>
<style lang="scss">
</style>