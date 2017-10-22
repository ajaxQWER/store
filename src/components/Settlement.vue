<template>
  <div class="settlement">
    <headers></headers>
    <steps></steps>
    <el-row class="row settlement-content">
      <el-form :model="settlement" ref="settlement" label-width="100px">
        <el-form-item class="large-item" label="银行卡号" prop="bankNum">
          <el-input v-model="settlement.bankNumber" @blur="getBankCardInfo"></el-input>
        </el-form-item>
        <el-form-item label="所属银行" prop="bankNum">{{settlement.bankHouse}}</el-form-item>
        <el-form-item label="开户城市" prop="city">
          <el-select v-model="settlement.provinceId" filterable placeholder="省" prop="type" @change="selectCity">
            <el-option v-for="item in province" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId">
            </el-option>
          </el-select>
          <el-select v-model="settlement.cityId" filterable placeholder="市" prop="type">
            <el-option v-for="item in city" :key="item.cityId" :label="item.cityName" :value="item.cityId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="normal-item" label="开户支行" prop="bankNum">
          <el-input v-model="settlement.openBank"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="btn-row row">
      <el-col class="tac">
        <router-link to="/qualification?step=1">
          <el-button size="large">返回上一步</el-button>
        </router-link>
        <el-button class="small-item" type="primary" size="large" @click="save">提交信息</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getProvinceList, getCityListByProvinceId, getBankCardInfoByCardId, saveShopSettleInfo, getShopSettleInfo } from '@/api/api'
import steps from '@/components/steps/steps'
import headers from '@/components/header/headers'
export default {
  name: 'settlement',
  components: {
    steps: steps,
    headers: headers
  },
  data() {
    return {
      settlement: {
        bankHouse: "",
        bankNumber: "",
        openBank: "",
        provinceId: 0,
        cityId: 0
      },
      province: [],
      city: []
    }
  },
  created: function() {
    getShopSettleInfo().then(res=>{
        console.log(res)
        this. settlement = {
            bankHouse: res.bankHouse,
            bankNumber: res.bankNumber,
            openBank: res.openBank,
            provinceId: res.provinceId,
            cityId: res.cityId
        }
    })
    getProvinceList().then(res => {
        console.log(res)
      this.province = res;
    })
   getCityListByProvinceId(this.settlement.provinceId).then(res => {
       this.city = res;
     })
  },
  methods: {
    selectCity: function(){
        getCityListByProvinceId(this.settlement.provinceId).then(res=>{
            console.log(res)
            this.city = res;
        })
    },
    save: function() {
        console.log(this.settlement)
        // return;
        saveShopSettleInfo(this.settlement).then(res => {
            console.log(res)
            this.$router.push({path: 'waitAduit', query: {step: '3'}})
        })
    },
    getBankCardInfo: function(){
        getBankCardInfoByCardId(this.settlement.bankNumber).then(res=>{
            console.log(res)
            this.settlement.bankHouse = res.bank
        })
    }
  }
}

</script>
<style>
.settlement {
  background-color: #ebebeb;
}

.settlement a {
  text-decoration: none;
  color: #fff;
}

.settlement-content {
  background-color: #fff;
  padding: 40px 50px;
  min-height: 650px;
}

</style>
