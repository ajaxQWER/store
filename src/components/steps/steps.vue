<template>
	<el-row class="steps">
		<el-col class="row">
			<div class="row step-bar">
				<el-steps :active="active" finish-status="success" :align-center="true">
					<el-step v-for="(step, index) in stepObj" :title="step.title" :status="step.status"  :key="index"></el-step>
				</el-steps>
			</div>
			<!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
		</el-col>
	</el-row>
</template>
<script>
export default {
	name: 'steps',
	data() {
		return {
		  	active: 0,
		  	stepObj: [{
		  		title: '门店信息',
		  		status: 'finish'
		  	},{
		  		title: '资质信息',
		  		status: 'wait'
		  	},{
		  		title: '结算信息',
		  		status: 'wait'
		  	},]
		};
	},
	created: function(){
		if(this.$route.query.step){
			this.active = +this.$route.query.step;
			for(var i = 0; i < this.active; i++){
				this.stepObj[i]['status'] = 'success';		
			}
			this.stepObj[this.active]['status'] = 'finish';
		}
	},
	methods: {
		next: function() {
		  	if (this.active < this.stepObj.length) {
			    this.stepObj[this.active]['status'] = 'success'
			    this.active++
			    if(this.active < this.stepObj.length){
				    this.stepObj[this.active]['status'] = 'finish'
			    }
		  	}
		}
	}
}
</script>
<style scoped>
	.steps{
		background-color: #626262;
	}
	.step-bar{
		padding-left: 12.5%;
		padding-top: 15px;
	}
	.el-step__head.is-text.is-finish {
	    background-color: #0bb745;
	    border-color: #0bb745;
	}
	.el-step__title.is-finish {
	    color: #0bb745;
	}
	
</style>