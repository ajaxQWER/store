<template>
    <div class="settlement">
        <headers></headers>
        <steps></steps>
        <el-row class="row settlement-content">
            <el-form :model="settlement" ref="settlement" label-width="100px">
                <el-form-item class="normal-item required" label="开户人">
                    <el-input v-model="settlement.openName"></el-input>
                </el-form-item>
                <el-form-item class="large-item required" label="银行卡号">
                    <el-input v-model="settlement.bankNumber" @blur="getBankCardInfo"></el-input>
                </el-form-item>
                <el-form-item class="required" label="所属银行">{{settlement.bankHouse}}</el-form-item>
                <el-form-item label="开户城市" class="required">
                    <el-select v-model.number="settlement.provinceId" filterable placeholder="省" prop="type" @change="selectCity">
                        <el-option v-for="item in province" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId">
                        </el-option>
                    </el-select>
                    <el-select v-model.number="settlement.cityId" filterable placeholder="市" prop="type">
                        <el-option v-for="item in city" :key="item.cityId" :label="item.cityName" :value="item.cityId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="normal-item required" label="开户支行">
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
import { getProvinceList, getCityListByProvinceId, getBankCardInfoByCardNumber, saveShopSettleInfo, getShopSettleInfo } from '@/api/api'
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
                provinceId: '',
                cityId: '',
                openName: ''
            },
            province: [],
            city: []
        }
    },
    created: function() {
        getShopSettleInfo().then(res => {
            console.log(res)
            if (res.openName) {
                this.settlement.openName = res.openName
            }
            if (res.bankHouse) {
                this.settlement.bankHouse = res.bankHouse
            }
            if (res.bankNumber) {
                this.settlement.bankNumber = res.bankNumber
            }
            if (res.openBank) {
                this.settlement.openBank = res.openBank
            }
            if (res.provinceId) {
                this.settlement.provinceId = res.provinceId
            }
            if (res.cityId) {
                this.settlement.cityId = res.cityId
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
        selectCity: function() {
            getCityListByProvinceId(this.settlement.provinceId).then(res => {
                console.log(res)
                this.city = res;
            })
        },
        save: function() {
            if (!this.settlement.openName) {
                this.$message({
                    type: 'error',
                    message: '请输入开户人'
                })
                return;
            }
            if (!this.settlement.bankNumber) {
                this.$message({
                    type: 'error',
                    message: '请输入银行卡号'
                })
                return;
            }
            if (!this.settlement.provinceId) {
                this.$message({
                    type: 'error',
                    message: '请选择开户省份'
                })
                return;
            }
            if (!this.settlement.cityId) {
                this.$message({
                    type: 'error',
                    message: '请选择开户城市'
                })
                return;
            }
            if (!this.settlement.openBank) {
                this.$message({
                    type: 'error',
                    message: '请输入开户支行'
                })
                return;
            }
            saveShopSettleInfo(this.settlement).then(res => {
                console.log(res)
                this.$router.push({ path: 'waitAduit', query: { step: '3' } })
            })
        },
        getBankCardInfo: function() {
            if (!this.settlement.bankNumber) {
                return;
            }
            getBankCardInfoByCardNumber(this.settlement.bankNumber).then(res => {
                console.log(res)
                this.settlement.bankHouse = res.showapi_res_body.bankName
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
