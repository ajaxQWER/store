<template>
  <div class="settlement">
    <headers></headers>
    <steps></steps>
    <el-row class="row settlement-content">
      <el-form :model="settlement" ref="settlement" label-width="100px">
        <el-form-item class="large-item" label="真实姓名" prop="bankNum">
          <el-input v-model="settlement.bankNum"></el-input>
        </el-form-item>
        <el-form-item label="所属银行" prop="bankNum">
        	<el-select v-model.number="settlement.bankNum" filterable placeholder="市" prop="type">
                <el-option v-for="item in city" :key="item.userId" :label="item.base.name" :value="item.userId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="开户城市" prop="city">
            <el-select v-model.number="settlement.bankNum" filterable placeholder="省" prop="type">
                <el-option v-for="item in province" :key="item.userId" :label="item.base.name" :value="item.userId">
                </el-option>
            </el-select>
        	<el-select v-model.number="settlement.bankNum" filterable placeholder="市" prop="type">
                <el-option v-for="item in city" :key="item.userId" :label="item.base.name" :value="item.userId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item class="normal-item" label="开户支行" prop="bankNum">
          <el-input v-model="settlement.bankNum"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="btn-row row">
	    <el-col class="tac">
	      <router-link to="/qualification?step=1">
	        <el-button size="large">返回上一步</el-button>
	      </router-link>
	      <router-link to="#">
	        <el-button class="small-item" type="primary" size="large">提交信息</el-button>
	      </router-link>
	    </el-col>
  	</el-row>
  </div>
</template>
<script>
import steps from '@/components/steps/steps'
import headers from '@/components/header/headers'
export default {
  name: 'index2',
  components: {
    steps: steps,
    headers: headers
  },
  data() {
    return {
    	settlement: {
    		bankNum: ''
    	}
    }
  }
}

</script>
<style>
	.settlement{
		background-color: #ebebeb;
	}
	.settlement a{
		text-decoration: none;
		color: #fff;
	}
	.settlement-content{
		background-color: #fff;
		padding: 40px 50px;
		min-height: 650px;
	}
</style>