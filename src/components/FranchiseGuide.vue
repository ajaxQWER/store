<template>
  <div class="agreement">
    <header>
      <div class="back">
        <router-link to="/index" class="link">返回首页</router-link>
      </div>
    </header>
    <div class="us">
      <img src="../assets/images/us.png" alt="">
    </div>
    <div class="content">
      <img src="../assets/images/franchise-guide.jpg" alt="">
    </div>
    <div class="parten-foot">
      <img src="../assets/images/guide-foot.png" alt="">
    </div>
    <footers></footers>
  </div>
</template>
<script>
  import footers from  '@/components/footer/footers'
  export default {
    components: {
      footers: footers
    },
    data: function() {
      return {

      }
    },
  }
</script>
<style scoped>
  header{
    height: 148px;
    background: url(../assets/images/guide.jpg) no-repeat center;
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
  .us,.parten-foot{
    background-color: #f1f1f1;
    overflow: hidden;
    text-align: center;
  }
  .content{
    margin-top: 32px;
    background-color: #fff;
    text-align: center;
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
