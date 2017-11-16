<template>
  <div class="about">
    <header>
      <div class="back">
        <router-link to="/index" class="link">返回首页</router-link>
      </div>
    </header>
    <div class="content">
      <img src="../assets/images/contact.jpg" alt="">
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
    height: 506px;
    background: url(../assets/images/contact-us.jpg) no-repeat center;
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
    line-height: 60px;
    color: #fff;
  }
  .content{
    background-color: #fff;
  }
  .content img{
    display: block;
    width: 1200px;
    margin: 0 auto;
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
