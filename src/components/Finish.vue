<template>
  <div class="finish">
    <headers></headers>
    <el-row class="row finish-content">
    	<div class="finish-tips">
    		<div class="left-image">
    			<img src="../assets/images/finish-img.jpg" alt="">
    		</div>
    		<div class="right-info">
    			<h3>提交成功，审核中…</h3>
    			<p>我们将尽快进行审核，请保持手机号{{user}}畅通</p>
		        <el-button class="back-btn" size="large" type="primary" @click="backHome">返回首页</el-button>
    		</div>
    	</div>
    </el-row>
  </div>
</template>
<script>
import headers from '@/components/header/headers'
export default {
  name: 'finish',
  components: {
    headers: headers
  },
  data() {
    return {
    	user: ''
    }
  },
  created: function() {
  	try {
	  	var user = sessionStorage.getItem('user');
  		this.user = user
  	}catch (e){
  		console.log(e)
  	}
  },
  methods: {
  	backHome: function(){
  		this.$router.push('/index')
  	}
  }
}

</script>
<style>
.finish {
	height: 100%;
  background-color: #ebebeb;
}

.finish a {
  text-decoration: none;
  color: #fff;
}

.finish-content {
  background-color: #fff;
  padding: 40px 50px;
  min-height: 650px;
}
.finish-tips{
	width: 800px;
	margin: 150px auto;
	overflow: hidden;
	zoom: 1;
}
.left-image{
	float: left;
}
.right-info{
	float: left;
	text-align: center;
	padding: 0 80px;
}
.right-info h3{
	color: #0bb745;
	font-size: 22px;
	font-weight: 400;
}
.right-info p{
	color: #666;
	font-size: 14px;
}
.back-btn{
	width: 180px;
	margin-top: 90px;
}
</style>
