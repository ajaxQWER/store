<template>
  <el-row class="index">
  	<el-row class="banner">
  		<el-row class="row">
  			<div class="banner-top">
  				<div class="left-item">
  					<img src="../assets/images/logo.png" alt=""><span>共享点餐</span>
  				</div>
  				<div class="right-item">
  					<a href="javascript:void(0);">客户端下载</a>
  					<a href="javascript:void(0);">在线客服</a>
  				</div>
  			</div>
  			<!-- <h2>加入共享点餐 开店赚大钱</h2> -->
  			<div class="tac">
  				<img src="../assets/images/banner-text.png" alt="">
  			</div>
  			<!-- <ul>
  				<li v-for="(data,index) in datas" :key="index">
  					<div class="item">
  						<span class="number">{{data.number}}</span>
  						<span class="unit">{{data.unit}}</span>
  					</div>
  					<div class="des">{{data.description}}</div>
  				</li>
  			</ul> -->
  			<el-row class="open-store">
  				<el-button class="open-by-self-help" @click="showModal">自助开店</el-button>
  				<p class="tips">填写完整门店信息，24小时极速开店</p>
  			</el-row>
  		</el-row>
  	</el-row>
  	<el-row class="shop-joined">
  		<div class="row">
			<p class="invite">他们已入驻，你呢？</p>
			<ul>
				<li v-for="n in 8" :key="n"><img :src="'../static/images/shop-icon'+n+'.png'" alt=""></li>
			</ul>
		</div>
  	</el-row>
  	<el-row class="row design-idea"></el-row>
  	<el-row class="footer">
  		<el-row class="row footer-container">
  			<div class="footer-nav">
  				<div class="footer-nav-list" v-for="(item,index) in footer" :key="index">
  					<h4 class="footer-nav-title">{{item.title}}</h4>
  					<ul>
  						<li v-for="(list,i) in item.lists" :key="i">{{list}}</li>
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
  	<div class="modal" v-show="showDialog">
  		<div class="modal-dialog">
	  		<div class="modal-body">
	  			<span class="modal-close" @click="closeModal"></span>
	  			<h3>申请入驻共享点餐</h3>
  					<div class="modal-input">
  						<el-input v-model="phoneNumber" placeholder="请输入手机号" :maxlength="11" @change="checkValue"></el-input>
  					</div>
  					<div class="modal-input">
  						<el-input class="verification-input" v-model="verificationCode" placeholder="请输入短信验证码" :maxlength="4" @change="checkValue"></el-input>
  						<el-button class="get-code" @click="getCode" :disabled="isClickGetCode">获取验证码</el-button>
  					</div>
  				<div class="modal-input">
  					<el-button class="modal-btn" @click="login" :disabled="canLogin">立即入驻</el-button>
  				</div>
  				<div class="protocol-tips">
  					<label for="protocol"><input type="checkbox" id="protocol" class="protocol-checkbox" v-model="checked">我已阅读并已同意<a href="" target="_blank">《共享点餐网上订餐平台服务协议》</a></label>
  				</div>
	  		</div>
  		</div>
  	</div>
  </el-row>
</template>
<script>
import {openStoreLoginBySMSCode,getPhoneCode} from '@/api/api'
export default {
  data: function() {
    return {
    	datas:[{
    		number: '24',
    		unit: '小时',
    		description: '极速开店'
    	},{
    		number: '130',
    		unit: '万',
    		description: '优质商家'
    	},{
    		number: '2000',
    		unit: '城市',
    		description: '全国覆盖'
    	},{
    		number: '2.6',
    		unit: '亿',
    		description: '累计用户'
    	}],
    	footer: [{
    		title: '用户帮助',
    		lists: ['服务中心','常见问题']
    	},{
    		title: '商务合作',
    		lists: ['加盟指南','市场合作']
    	},{
    		title: '关于我们',
    		lists: ['共享点餐介绍','加入我们','联系我们','服务协议']
    	},{
    		title: '其他',
    		lists: ['餐厅办证流程','餐厅经营卫生标准']
    	}],
    	loginRules: {

    	},
    	phoneNumber: '',
		verificationCode: '',
    	checked: true,
    	showDialog: false,
    	isClickGetCode: false,
    	canLogin: true
    }
  },
  methods: {
  	showModal: function(){
  		this.showDialog = true;
  	},
  	closeModal: function(){
  		this.showDialog = false;
  	},
  	getCode: function(e){
  		var _this = this;
  		if(this.phoneNumber.length == 11){
  			getPhoneCode(this.phoneNumber).then(()=>{
  				_this.isClickGetCode = true;
  			})
  		}else{
  			this.$message({
  				type: 'error',
  				message: '请输入正确的手机号码'
  			})
  			return;
  		}
  		var i = 60;
  		var codeInterval = setInterval(function() {
  		  	i--;
		  	if(i == 0){
		  		clearInterval(codeInterval)
		  		_this.isClickGetCode = false;
		  		e.target.innerText = '获取验证码';
		  		return;
		  	}
		  	e.target.innerText = i + 's后重新获取'
  		}, 1000)
  	},
  	checkValue: function(){
  		this.canLogin = (this.phoneNumber && this.phoneNumber.length == 11 ? (this.verificationCode && this.verificationCode.length == 4 ? false : true) : true)
  	},
  	login: function(){
  		if(!this.checked){
  			this.$message({
  				type: 'info',
  				message: '请阅读并同意《共享点餐网上订餐平台服务协议》'
  			})
  			return;
  		}
  		var param = {
  			code: this.verificationCode, //"8904",
  			secretkey: "string",
  			sellerName: this.phoneNumber //"18382130767"
  		}
  		openStoreLoginBySMSCode(param).then(res => {
  			console.log(res)
  			sessionStorage.setItem('jwt', res.jwt);
  			sessionStorage.setItem('shopId', res.seller.shopId);
  			sessionStorage.setItem('user', this.phoneNumber);

  			this.showDialog = false;
  			this.phoneNumber = '';
  			this.verificationCode = '';
  			this.isClickGetCode = false;
  			this.canLogin = true;

			this.$router.push({ path: 'store', query: { step: '0' }})
  		})
  	}
  }
}

</script>
<style scoped>
	.index{
		overflow: hidden;
	}
	.row{
		width: 1200px;
		margin: 0 auto;
	}
	.banner{
		height: 600px;
		background: url(../assets/images/banner.jpg) no-repeat;
		background-size: cover;
		color: #fff;
	}
	.banner-top{
		overflow: hidden;
		zoom: 1;
		line-height: 120px;
		margin-bottom: 40px;
	}
	.left-item{
		float: left;
	}
	.left-item img,
	.left-item span{
		vertical-align: middle;
	}
	.left-item span{
		font-size: 30px;
		margin-left: 20px;
	}
	.right-item{
		float: right;
	}
	.right-item a{
		color: #fff;
		font-size: 18px;
		text-decoration: none;
		margin: 0 20px;
	}
	.banner h2{
		font-size: 60px;
		font-weight: 300;
		text-align: center;
		margin: 20px auto;
	}
	.banner ul{
		overflow: hidden;
		zoom: 1;
		list-style: none;
		padding: 0;
	}
	.banner li{
		float: left;
		padding: 0 41px;
		position: relative;
	}
	.banner li:not(:first-child):before{
		content: '';
		display: inline-block;
		position: absolute;
		width: 2px;
		height: 80px;
		background-color:  #ffd200;
		left: 0;
		top: 50%;
		margin-top: -40px;
	}
	.number{
		font-size: 100px;
		color: #ffd200;
		font-weight: 500;
	}
	.unit{
		font-size: 30px;
		color: #ffd200;
	}
	.des{
		text-align: center;
		font-size: 22px;
	}
	.open-store{
		margin-top: 50px;
		text-align: center;
	}
	.open-by-self-help{
		width: 300px;
		height: 60px;
		font-size: 34px;
		border-radius: 10px;
		background-color: #ffd200;
	}
	.open-by-self-help:hover{
		border: none;
	}
	.tips{
		font-size: 18px;
	}
	.shop-joined{
		background-color: #e6e6e6;
		padding-top: 10px;
	}
	.invite{
		text-align: center;
		font-size: 22px;
		color: #666;
	}
	.shop-joined ul{
		list-style: none;
		overflow: hidden;
		zoom: 1;
		padding: 0;
		width: 880px;
		margin: 30px auto;
	}
	.shop-joined li{
		float: left;
		width: 80px;
		height: 80px;
		border-right: 50%;
		overflow: hidden;
		margin: 0 15px;
	}
	.design-idea{
		height: 570px;
		background: url(../assets/images/design-idea.jpg) no-repeat;
		background-size: cover;
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
	.modal{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.7)
	}
	.modal-dialog{
		width: 450px;
		margin: 300px auto;
		position: relative;
	}
	.modal-close{
		display: inline-block;
		width: 30px;
		height: 30px;
		position: absolute;
		right: -5px;
		top: -10px;
		cursor: pointer;
	}
	.modal-close:before{
		content: '';
		display: inline-block;
		width: 2px;
		height: 30px;
		background-color: #ccc;
		position: absolute;
		top: 0;
		left: 50%;
		margin-left: -1px;
		transform: rotate(-45deg)
	}
	.modal-close:after{
		content: '';
		display: inline-block;
		width: 2px;
		height: 30px;
		background-color: #ccc;
		position: absolute;
		top: 0;
		left: 50%;
		margin-left: -1px;
		transform: rotate(45deg)
	}
	.modal-body{
		width: 330px;
		padding: 30px;
		margin: 0 auto;
		background-color: #fff;
	}
	.modal-body h3{
		font-size: 16px;
		font-weight: normal;
	}
	.modal-input{
		padding: 15px 0;
		overflow: hidden;
		zoom: 1;
	}
	.verification-input{
		width: 200px;
		float: left;
	}
	.get-code{
		width: 120px;
		float: right;
	}
	.get-code.is-disabled{
		color: #a0a9b3;
	}
	.modal-btn{
		width: 100%;
		height: 45px;
		background-color: #0bb745;
		border: none;
		color: #fff;
	}
	.modal-btn.is-disabled{
		background-color: #eee;
		color: #999;
	}
	.protocol-tips{
		font-size: 12px;
	}
	.protocol-checkbox{
		vertical-align: middle;
		cursor: pointer;
	}
	.protocol-tips a{
		font-size: 12px;
		text-decoration: none;
		color: #0bb745;
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