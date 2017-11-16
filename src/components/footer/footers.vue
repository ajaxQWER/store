<template>
  <footer>
    <el-row class="footer">
      <el-row class="row footer-container">
        <div class="footer-nav">
          <div class="footer-nav-list" v-for="(item,index) in footer" :key="index">
            <h4 class="footer-nav-title">{{item.title}}</h4>
            <ul>
              <li v-for="(list,i) in item.lists" :key="i">
                <a :href="list.link" v-if="list.target" target="_blank" class="link">{{list.title}}</a>
                <router-link v-else :to="list.link" class="link">{{list.title}}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-info">
          <div>服务热线：028-67673333<br>服务时间：周一至周日 9:00-24:00</div>
          <div>意见反馈：gxdc@gjgxjj.com</div>
          <div class="qr-code">
            <img src="../../assets/images/QR_code.jpg" alt=""><span>扫码关注共享点餐</span>
          </div>

        </div>
      </el-row>
      <el-row>
        <div class="beian">
          <div class="copyright">鑫圆共享电子商务股份有限公司&copy;2017<br>蜀ICP备17032496号-4<br>
            <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51019002001128" class="beian-link">
              <img src="../../assets/images/beian-gov.png"/>川公网安备 51019002001128号</a>
          </div>
        </div>
      </el-row>
    </el-row>
  </footer>
</template>
<script>
  export default {
    name: 'footers',
    data: function() {
      return {
        footer: [{
          title: '用户帮助',
          lists: [{link: '/questions',title:'常见问题'}]
        },{
          title: '商务合作',
          lists: [{link: '/franchiseGuide',title:'加盟指南'},{link:'/marketPartnership',title:'市场合作'}]
        },{
          title: '关于我们',
          lists: [{link: '/aboutUs',title:'共享点餐介绍'},{link: '/contactUs',title:'联系我们'},{link: '/agreement',title:'用户注册协议'}]
        },{
          title: '其他',
          lists: [{link: '//support.gongxiangdiancan.com/process.pdf',title:'餐厅办证流程',target: true},{link: '//support.gongxiangdiancan.com/standard.pdf',
            title:'餐厅经营卫生标准',target: true},{link: '',title:'法律声明',target: true}]
        }]
      }
    }
  }
</script>
<style scoped>
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
