<template>
    <div class="create-article-wrap">
        <div class="breadcrumbs">
            <ul class="clearfix">
                <li>
                    <router-link to="/" title="首页">首页</router-link>
                </li>
                <li>
                    <p>
                        编辑博客
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
    name: 'create-article-wrap',
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
        createArticle() {
            const article = new this.$api.SDK.Object('Article');
            article.set('author', this.user);
            article.set('title', this.form.title);
            article.set('content', this.content());
            article.set('category', this.form.category);
            return article;
        },
        setACL(article) {
            // 设置访问权限
            // https://leancloud.cn/docs/acl-guide.html#单用户权限设置
            let acl = new this.$api.SDK.ACL();
            acl.setPublicReadAccess(true);
            acl.setWriteAccess(this.user, true);
            article.setACL(acl);
        },
        save(article) {
            article.save().then((article) => {
                const message = `文章《${article.get('title')}》发布成功`;
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
                    const article = this.createArticle();
                    this.setACL(article);
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
.article-box {
    background: #fff;
    padding: px2rem(20);

    .article-content {
        .form-box {
            font-size: $text-size;

            .form-group {
                margin-top: px2rem(20);
                display: block;

                p {
                    font-weight: bold;
                }

                select {
                    height: px2rem(60);
                    line-height: px2rem(60);
                    width: 100%;
                    margin-top: px2rem(20);
                    padding: px2rem(10);
                    border-radius: px2rem(10);
                    font-size: $text-size;
                }

                input,
                textarea {
                    @extend select;
                    border: 2px solid #e2e2e2;
                    color: #757575;

                    &.error {
                        color: $error-color;
                        border: 2px solid $error-color;
                    }
                }

                .editor-box {
                    margin-top: px2rem(20);
                    padding: px2rem(20);
                    width: 100%;
                    min-height: px2rem(400);
                    border: 2px solid #e2e2e2;
                    border-radius: px2rem(10);
                    user-select: text;

                    * {
                        font-size: $text-size-small !important;
                        font-family: 'PingFang SC', '\5b8b\4f53', 'Helvetica Neue', Arial, 'Liberation Sans', FreeSans, 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif !important;
                        line-height: 1.4 !important;
                        user-select: text;
                        width: 100% !important;

                        img {
                            max-width: 100%;
                        }
                    }
                }

                &.required {
                    .label-box>p:before {
                        content: '* ';
                        color: $error-color;
                        font-weight: bold;
                    }
                }
            }
        }

        .btn-wrap {
            font-weight: 700;
            letter-spacing: px2rem(10);
            text-align: center;
            font-size: $text-size;
            color: $text-color-imp;
            margin-top: px2rem(20);
            background: #000;
            padding: px2rem(20);
            border-radius: px2rem(10);

        }
    }
}
</style>