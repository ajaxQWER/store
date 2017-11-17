<template>
  <div class="agreement" v-loading="loading">
    <header>
      <div class="back">
        <div class="header-content">
            <img src="../assets/images/logo-white.png" class="logo" alt="">
            <router-link to="/index" class="link">
                <div class="tohome">首页</div>
            </router-link>
            <!--<div class="application">手机应用</div>-->
            <!--<div class="rules">规则中心</div>-->
        </div>
      </div>
    </header>

    <el-row class="content">
      <el-row class="tac">
        <h5>常见问题</h5>
        <el-col :span="24">
          <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen"
                   background-color="rgba(241,241,241,0)">
            <el-menu-item v-for="(item,index) in articles" :key="index" :index="formatIndex(index)" @click="showContent(index)">
              <span slot="title">{{item.articleTitle}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <el-row class="wrap" v-if="articles">
        <h4>{{articles[id].articleTitle}}</h4>
        <el-row v-html="articles[id].articleContent" v-if="articles[id]"></el-row>
      </el-row>
    </el-row>
    <footers></footers>
  </div>
</template>
<script>
  import footers from  '@/components/footer/footers'
  import {getArticleByArticleCategoryIdId} from '@/api/api'
  export default {
    components: {
      footers: footers
    },
    data: function() {
      return {
        loading: true,
        articles: null,
        id: 0,
        activeIndex: '1'
      }
    },
    created: function () {
      console.time('test');
      getArticleByArticleCategoryIdId().then(res=>{
        console.log(res);
        this.loading = false;
        this.articles = res.list;
        console.timeEnd('test');
      })
    },
    methods: {
      handleOpen: function(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose: function(key, keyPath) {
        console.log(key, keyPath);
      },
      formatIndex: function(index){
        console.log(index)
        return index+1 + '';
      },
      showContent: function (index) {
        this.id = index;
        this.activeIndex = index + 1 + ''
      }
    }
  }
</script>
<style scoped>
  .agreement{
    background-color: #f7f7f7;
  }
  h4{
    font-size: 18px;
    text-align: left;
    line-height: 40px;
    color: #000;
    font-weight: bold;
    margin: 0;
  }
  h5{
    font-size: 16px;
    text-align: left;
    line-height: 40px;
    color: #fff;
    margin: 0;
    padding-left: 20px;
    background-color: #06b745;
  }

  header{
    height: 60px;
    line-height: 1;
    background-color: #06b745;
    color: #fff;
  }
  .back{
    width: 890px;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 auto;
  }

  .header-content{
    width: 890px;
    margin: 0 auto;
  }
  .logo{
    width: 65px;
    height: 50px;
    display: block;
    float: left;
  }
  header .tohome{
    display: block;
    float: left;
    font-size: 18px;
    color: #fff;
    margin: 15px 0 0 65px;
  }
  .rules, .application{
    float: right;
    margin-right: 40px;
    font-size: 14px;
    line-height: 45px;
  }
  .application{
    margin-right: 115px;
  }
  .content{
    background-color: #f7f7f7;
    width: 890px;
    margin: 0 auto;
    padding-right: 200px;
    position: relative;
  }
  .tac{
    width: 200px;
    text-align: left;
    position: absolute;
    right: 0;
    top: 0;
  }
  .el-menu-item{
    color: #999;
    background-color: #f7f7f7;
  }
  .el-menu-item:hover{
    background-color: rgba(255,255,255,0);
  }
  .el-menu-item.is-active {
    color: #999;
    background-color: #fff;
  }
  .wrap{
    width: 100%;
    padding: 10px 40px 50px;
    background-color: #fff;
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

  @media (min-width: 1260px){
    .back,.header-content,.content{
      width: 1100px;
    }
  }
</style>
