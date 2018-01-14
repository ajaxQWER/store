<template>
    <div class="shopList">
        <headers></headers>
        <el-row class="row shop-content">
            <h3 class="shop-bind-phone">手机号{{regPhone}}绑定的店铺</h3>
            <div class="shop-title-row">
                <h5 class="shop-list-title">店铺列表</h5><el-button class="shop-add-btn" type="success" @click="addShop">添加店铺</el-button>
            </div>
            <el-table :data="shopList" border>
                <el-table-column label="店铺LOGO" width="135" align="center" prop="logo">
                    <template slot-scope="scope">
                        <div class="scope-wrap"><img class="shop-logo" :src="UPLOADURL + scope.row.logoUrl" alt=""></div>
                        
                    </template>
                </el-table-column>
                <el-table-column label="店铺名称" width="250" align="center" prop="shopName"></el-table-column>
                <el-table-column label="店铺地址" width="410" align="center" prop="address"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button class="shop-update-btn" @click="updataShop(scope.row.shopId)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>
<script>
import {getShopLists} from '@/api/api'
import headers from '@/components/header/headers'
export default {
    components: {
        headers: headers
    },
    data() {
        return {
            shopList: null,
            regPhone: sessionStorage.getItem('user')
        }
    },
    created: function() {
        sessionStorage.removeItem('shopId')
        getShopLists().then(res => {
            this.shopList = res;
        })
    },
    methods: {
        addShop: function () {
            this.$router.push({ path: 'base', query: { step: '0' } })
        },
        updataShop: function (shopId) {
            sessionStorage.setItem('shopId', shopId)
            this.$router.push({ path: 'base', query: { step: '0' } })
        }
    }
}

</script>
<style scoped>
.shopList {
    background-color: #ebebeb;
    height: 100%;
    box-sizing: border-box;
}
.shop-content {
    padding: 40px;
    box-sizing: border-box;
    background-color: #fff;
}
.shop-title-row {
    margin: 10px 0;
    overflow: hidden;
    zoom: 1;
}
.shop-bind-phone {
    font-size: 22px;
    margin-top: 0;
    margin-bottom: 40px;
}
.shop-list-title {
    width: 830px;
    font-size: 16px;
    font-weight: normal;
    display: inline-block;
    vertical-align: middle;
    margin: 0;
}
.shop-add-btn {
    width: 90px;
    display: inline-block;
    vertical-align: middle;
}
.scope-wrap {
    line-height: normal;
}
.shop-logo {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin: 10px 0;
}
.el-button.shop-update-btn:focus, .el-button.shop-update-btn:hover {
    color: #0bb745;
    background-color: #e8f6ec;
    border-color: #0bb745;
}
</style>
