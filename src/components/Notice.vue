<template>
    <div class="notice" v-loading="loading">
        <header>
            <div class="back">
                <router-link to="/index" class="link">返回首页</router-link>
            </div>
        </header>
        <el-row class="content">
            <el-row class="wrap">
                <el-row v-html="article.articleContent" v-if="article"></el-row>
            </el-row>
        </el-row>
        <footers></footers>
    </div>
</template>
<script>
    import footers from  '@/components/footer/footers'
    import {getNoticeArticleById} from '@/api/api'
    export default {
        components: {
            footers: footers
        },
        data: function() {
            return {
                loading: true,
                article: null
            }
        },
        created: function () {
            console.time('test')
            getNoticeArticleById('11').then(res=>{
                console.log(res);
                this.loading = false;
                this.article = res;
                console.timeEnd('test')
            })
        }
    }
</script>
<style scoped>
    .notice{
        background-color: #e6e6e6;
    }
    header{
        height: 148px;
        background: url(../assets/images/notice.png) no-repeat center;
        background-size: cover;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .back{
        width: 1200px;
        text-align: right;
    }
    .back .link{
        font-size: 16px;
        color: #fff;
    }
    .content{
        margin-top: 32px;
        background-color: #fff;
        overflow: hidden;
    }
    .wrap{
        width: 57.3%;
        margin: 20px auto 40px;
    }
    .footer-nav-list ul{
        list-style: none;
        padding: 0;
    }
    .footer-nav-list li{
        font-size: 14px;
        margin: 10px 0;
    }
    .row{
        width: 1160px;
    }
    .link{
        text-decoration: none;
        color:  #666;
    }
    .footer-info{
        width: 300px;
        padding-left: 100px;
    }
    .footer-info div:not(:last-child){
        line-height: 2;
        margin-bottom: 20px;
    }
    .qr-code img{
        width: 100px;
        height: 100px;
    }
    .qr-code span{
        vertical-align: bottom;
        margin-left: 20px;
    }
    .beian-link img{
        vertical-align: middle;
    }
</style>
