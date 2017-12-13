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
  	<footers></footers>
  	<div class="modal" v-show="showDialog">
  		<div class="modal-dialog">
	  		<div class="modal-body">
	  			<span class="modal-close" @click="closeModal"></span>
	  			<h3>申请入驻共享点餐</h3>
	  				<el-form label-width="80px">
	  					<el-form-item label="手机号">
		  					<div class="modal-input">
		  						<el-input v-model="phoneNumber" placeholder="请输入手机号" :maxlength="11" @change="checkValue"></el-input>
		  					</div>
	  					</el-form-item>
	  					<el-form-item label="主体资质">
		  					<div class="modal-input">
		  						<el-select v-model="subjectDocument" placeholder="请选择主体资质" class="select">
		  						    <el-option
		  						      v-for="(item,index) in subjectDocumentList"
		  						      :key="index"
		  						      :label="item.label"
		  						      :value="item.value">
		  						    </el-option>
		  						  </el-select>
		  					</div>
		  				</el-form-item>
	  					<el-form-item label="注册号">
		  					<div class="modal-input">
		  						<el-input v-model="regNumber" placeholder="请输入主体资质注册号" @change="checkValue"></el-input>
		  					</div>
	  					</el-form-item>
	  					<el-form-item label="验证码">
		  					<div class="modal-input">
		  						<el-input class="verification-input" v-model="verificationCode" placeholder="请输入短信验证码" :maxlength="4" @change="checkValue"></el-input>
		  						<el-button class="get-code" @click="getCode" :disabled="isClickGetCode">获取验证码</el-button>
		  					</div>
	  					</el-form-item>
	  				</el-form>
  				<div class="modal-input">
  					<el-button class="modal-btn" @click="login" :disabled="canLogin">立即入驻</el-button>
  				</div>
  				<div class="protocol-tips">
  					<label for="protocol"><input type="checkbox" id="protocol" class="protocol-checkbox" v-model="checked">我已阅读并已同意<a href="/notice" target="_blank">《共享点餐商家入驻告知书》</a></label>
  				</div>
	  		</div>
  		</div>
  	</div>
  </el-row>
</template>
<script>
  import footers from  '@/components/footer/footers'
  import {openStoreLoginBySMSCode,getPhoneCode} from '@/api/api'
export default {
  components: {
    footers: footers
  },
  data: function() {
    return {
    	loginRules: {

    	},
    	phoneNumber: '',
        verificationCode: '',
        subjectDocument: null,
        regNumber: null,
    	checked: true,
    	showDialog: false,
    	isClickGetCode: false,
    	canLogin: true,
    	subjectDocumentList: [{
            label: '营业执照',
            value: 'BUSINESS_LICENSE'
        }, {
            label: '事业单位法人证书',
            value: 'LEGAL_PERSON_CERTIFICATE_OF_INSTITUTION'
        }, {
            label: '民办非企业单位登记证书',
            value: 'REGISTRATION_CERTIFICATE_OF_PRIVATE_NON_ENTERPRISE_UNITS'
        }, {
            label: '社会团体法人登记证书',
            value: 'SOCIAL_ORGANIZATION_LEGAL_PERSON_REGISTRATION_CERTIFICATE'
        }]
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
		  	e.target.innerText = i + 's后重发'
  		}, 1000)
  	},
  	checkValue: function(){
  		this.canLogin = (this.phoneNumber && this.phoneNumber.length == 11 ? (this.verificationCode && this.verificationCode.length == 4 ? false : true) : true)
  	},
  	login: function(){
  		if(!this.checked){
  			this.$message({
  				type: 'info',
  				message: '请阅读并同意《共享点餐商家入驻告知书》'
  			})
  			return;
  		}
  		var param = {
  			code: this.verificationCode,
  			regNumber: this.regNumber,
  			subjectDocument: this.subjectDocument,
  			sellerName: this.phoneNumber
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
		font-size: 18px;
		text-align: center;
		/*font-weight: normal;*/
	}
	.modal-input{
		/*padding: 15px 0;*/
		overflow: hidden;
		zoom: 1;
	}
	.verification-input{
		width: 140px;
		float: left;
	}
	.get-code{
		width: 100px;
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
		margin-bottom: 20px;
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
	.select{
		width: 100%;
	}
</style>
