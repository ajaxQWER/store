<template>
  <div class="agreement" v-loading="loading">
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
    <el-row class="footer">
      <el-row class="row footer-container">
        <div class="footer-nav">
          <div class="footer-nav-list" v-for="(item,index) in footer" :key="index">
            <h4 class="footer-nav-title">{{item.title}}</h4>
            <ul>
              <li v-for="(list,i) in item.lists" :key="i">
                <router-link :to="list.link" class="link">{{list.title}}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-info">
          <div>服务热线：028-67673333<br>服务时间：周一至周日 9:00-24:00</div>
          <div>意见反馈：gxdc@gjgxjj.com</div>
          <div class="qr-code">
            <img src="../assets/images/QR_code.jpg" alt=""><span>扫码关注共享点餐</span>
          </div>

        </div>
      </el-row>
      <el-row>
        <div class="beian">
          <div class="copyright">鑫圆共享电子商务股份有限公司&copy;2017<br>蜀ICP备17032496号-4<br>
            <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51019002001128" class="beian-link">
              <img src="../assets/images/beian-gov.png"/>川公网安备 51019002001128号</a>
          </div>
        </div>
      </el-row>
    </el-row>
  </div>
</template>
<script>
  import {getArticleById} from '@/api/api'
  export default {
    data: function() {
      return {
        footer: [{
          title: '用户帮助',
          lists: [{link: '',title:'服务中心'},{link: '',title:'常见问题'}]
        },{
          title: '商务合作',
          lists: [{link: '/franchiseGuide',title:'加盟指南'},{link:'/marketPartnership',title:'市场合作'}]
        },{
          title: '关于我们',
          lists: [{link: '/aboutUs',title:'共享点餐介绍'},{link: '/contactUs',title:'联系我们'},{link: '/agreement',title:'服务协议'}]
        },{
          title: '其他',
          lists: [{link: '',title:'餐厅办证流程'},{link: '',title:'餐厅经营卫生标准'}]
        }],
        loading: true,
        article: null
      }
    },
    created: function () {
      console.time('test')
      getArticleById().then(res=>{
        console.log(res);
        this.loading = false;
        this.article = res;
        console.timeEnd('test')
      })
    }
  }
</script>
<style scoped>
  .agreement{
    background-color: #e6e6e6;
  }
  header{
    height: 148px;
    background: url(../assets/images/agreement.jpg) no-repeat center;
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
  .footer{
    background-color: #ccc;
    padding-top: 60px;
    padding-bottom: 60px;
    color:  #666;
  }
  .footer-container{
    overflow: hidden;
    zoom: 1;
  }
  .footer-nav{
    overflow: hidden;
    zoom: 1;
    float: left;
    padding-right: 50px;
    border-right: 1px dashed #b3b3b3;
  }
  .footer-info{
    float: right;
  }
  .footer-nav-list{
    float: left;
    margin: 0 45px;
  }
  .footer-nav-title{
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 40px;
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
  /*备案*/
  .beian{
    width: 300px;
    margin: 30px auto;
    color: #666;
    text-align: center;
    line-height: 1.5;
  }
  .beian-link{
    text-decoration: none;
    color: #666;
  }
  .beian-link img{
    vertical-align: middle;
  }
</style>
