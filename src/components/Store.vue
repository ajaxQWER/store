<template>
  <div class="store">
    <headers></headers>
    <steps></steps>
    <el-row class="row store-content">
      <h2>店铺绑定手机号:{{loginPhoneNumber}}</h2>
      <el-form :model="store" :rules="rules" ref="store" label-width="100px">
        </el-form-item>
        <el-form-item class="normal-item" label="店铺名称" prop="shopName">
          <el-input v-model="store.shopName"></el-input>
        </el-form-item>
        <el-form-item class="small-item" label="联系电话" prop="takeOutPhone">
          <el-input v-model="store.takeOutPhone"></el-input>
        </el-form-item>
        <el-form-item class="small-item" label="联系人姓名" prop="name">
          <el-input v-model="store.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" prop="shopCategoryIdList">
          <el-select class="normal-item" v-model="store.shopCategoryIdList" multiple :multiple-limit="5" placeholder="请选择店铺分类">
            <el-option v-for="item in shopCategory" :key="item.shopCategoryId" :label="item.shopCategoryName" :value="item.shopCategoryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-radio class="radio" v-model="isAllDay" label="true">全天</el-radio>
          <el-radio class="radio" v-model="isAllDay" label="false">自定义</el-radio>
          <span v-if="isAllDay=='false'">
			<el-time-picker v-model="store.busBeginTime" placeholder="营业开始时间" prop="busBeginTime" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"></el-time-picker>
			<el-time-picker v-model="store.busEndTime" placeholder="营业结束时间" prop="busEndTime" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"></el-time-picker>
			</span>
        </el-form-item>
        <el-form-item label="店铺类型">
          <el-radio-group v-model="store.shopType">
            <el-radio class="radio" label="RESERVE">预定</el-radio>
            <el-radio class="radio" label="TAKEOUT">外卖</el-radio>
            <el-radio class="radio" label="RESERVE_TAKEOUT">预定加外卖</el-radio>
          </el-radio-group>
          	<el-input v-if="store.shopType != 'RESERVE'" class="fee" v-model="store.fee" placeholder="配送费"></el-input>
        </el-form-item>
        <el-form-item label="店铺位置">
          <el-select v-model.number="store.provinceId" filterable placeholder="省" prop="type" @change="selectCity">
            <el-option v-for="item in provinceList" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId">
            </el-option>
          </el-select>
          <el-select v-model.number="store.cityId" filterable placeholder="市" prop="type" @change="selectDistrict">
            <el-option v-for="item in cityList" :key="item.cityId" :label="item.cityName" :value="item.cityId">
            </el-option>
          </el-select>
          <el-select v-model.number="store.areaId" filterable placeholder="区/县" prop="type" ref="district">
            <el-option v-for="item in districtList" :key="item.areaId" :label="item.areaName" :value="item.areaId">
            </el-option>
          </el-select>
          <el-button type="primary" @click="position">定位</el-button>
        </el-form-item>
        <el-form-item class="large-item" label="详细地址" prop="address">
          <el-input v-model="store.address" placeholder="详细至街道和门牌号"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="amap-container">
            <el-amap-search-box class="search-box" :on-search-result="onSearchResult"></el-amap-search-box>
            <el-amap vid="amapDemo" :plugin="plugin" class="amap" :zoom="zoom" :center="mapCenter" :events="events">
              <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" :events="marker.events"></el-amap-marker>
            </el-amap>
          </div>
        </el-form-item>
        <el-form-item label="照片信息" prop="type">
            <div class="photo-info">
              <div class="photo-title">店铺LOGO</div>
              <div class="photo-upload">
                 <el-upload class="upload-demo" ref="logoUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadLogoUrl">
                 	<img v-if="store.logoUrl" :src="store.logoUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
            <div class="photo-info">
              <div class="photo-title">门脸照</div>
              <div class="photo-upload">
                <el-upload class="upload-demo" ref="shopFaceUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadShopFaceUrl">
                 	<img v-if="store.shopFaceUrl" :src="store.shopFaceUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
            <div class="photo-info">
              <div class="photo-title">店内照片</div>
              <div class="photo-upload">
                <el-upload class="upload-demo" ref="shopInnerUrl" action="" :auto-upload="false" :show-file-list="false" :on-change="uploadShopInnerUrl">
                 	<img v-if="store.shopInnerUrl" :src="store.shopInnerUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="btn-row row">
      <el-col class="tac">
        <router-link to="/index">
          <el-button size="large">返回上一步</el-button>
        </router-link>
        <el-button class="small-item" type="primary" size="large" @click="showStore">进行下一步</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { shopCategoryList, getProvinceList, getDistrictList, getCityListByProvinceId, addStoreStepOne, uploadFiles } from '@/api/api'
import steps from '@/components/steps/steps'
import headers from '@/components/header/headers'
export default {
  name: 'index1',
  components: {
    steps: steps,
    headers: headers
  },
  data() {
    var that = this;
    return {
      store: {
        shopName: '',
        takeOutPhone: '',
        name: '',
        provinceId: null,
        cityId: null,
        areaId: null,
        busBeginTime: '',
        busEndTime: '',
        address: '',
        longitude: 0,
        latitude: 0,
        shopType: 'RESERVE_TAKEOUT',
        shopCategoryIdList: [],
        shopFaceUrl: 'http://photo.gjgxjj.com:8083/xymall/upload/goods_detail_wap/96f70062-b666-4672-af43-f56550320b66.jpg',
        shopInnerUrl: '',
        logoUrl: '',
        fee: ''
      },
      loginPhoneNumber: '',
      isAllDay: 'true',
      province: [],
      city: [],
      district: [],
      zoom: 14,
      mapCenter: [0, 0],
      markers: [],
      plugin: [{
        pName: 'ToolBar',
        position: 'RT'
      }, {
        pName: 'Geolocation',
        events: {
          init(o) {
            o.getCityInfo((status, result) => {
              that.mapCenter = result.center;
              that.$nextTick();
            })
          }
        }
      }],
      events: {
        click: function(e) {
          var lnglat = e.lnglat;
          that.store.longitude = lnglat.lng;
          that.store.latitude = lnglat.lat;
          that.markers = [{
            position: [e.lnglat.lng, e.lnglat.lat],
            events: {
              click: function(e) {
                var geocoder = new AMap.Geocoder({
                  city: that.store.cityId
                });
                geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], function(status, result) {
                  if (status === 'complete' && result.info === 'OK') {
                    if (result && result.regeocode) {
                      that.store.address = result.regeocode.formattedAddress
                    }
                  }
                });
              }
            }
          }];
          var geocoder = new AMap.Geocoder({
            city: that.store.cityId
          });
          geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                that.store.address = result.regeocode.formattedAddress
              }
            }
          });
        }
      },
      shopCategory: [],
      provinceList: [],
      cityList: [],
      districtList: [],
      rules: {
        shopName: [
          { required: true, message: '请输入店铺名称' }
        ],
        takeOutPhone: [
          { required: true, message: '请输入店铺联系电话' }
        ],
        name: [
          { required: true, message: '请输入店铺联系人' }
        ],
        shopCategoryIdList: [
          { type: 'array', required: true, message: '请选择店铺分类' }
        ],
        busBeginTime: [
          { required: true, message: '请选择营业开始时间' }
        ],
        busEndTime: [
          { required: true, message: '请选择营业结束时间' }
        ],
        address: [
          { required: true, message: '请输入详细地址' }
        ]
      }
    };
  },
  methods: {
    selectCity: function() {
      getCityListByProvinceId(this.store.provinceId).then(res => {
        this.cityList = res;
      })
    },
    selectDistrict: function() {
      getDistrictList(this.store.cityId).then(res => {
        this.districtList = res;
      })
    },
    onSearchResult: function(pois) {
      var that = this;
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        pois.forEach(poi => {
          let { lng, lat } = poi;
          lngSum += lng;
          latSum += lat;
          that.markers.push({
            position: [lng, lat],
            events: {
              click: function(e) {
                var geocoder = new AMap.Geocoder();
                geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], function(status, result) {
                  if (status === 'complete' && result.info === 'OK') {
                    if (result && result.regeocode) {
                      that.store.address = result.regeocode.formattedAddress
                    }
                  }
                });
              }
            }
          });
        });
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        this.mapCenter = [center.lng, center.lat];
      }
    },
    position: function() {
      var that = this;
      if (!that.store.cityId) {
        console.log('no cityId')
        that.$message({
        	type: 'error',
        	message: '请选择店铺所在省-市-区后再搜索'
        })
        return;
      }
      //行政区域搜索
      var district = new AMap.DistrictSearch({
      		level: 'district',
         	subdistrict: 0,
			showbiz:false
      });

      district.search(that.$refs.district.query, function(status, result) {
      	console.log(result)
        if (status === 'complete' && result.info === 'OK') {
          var districtList = result.districtList;
          that.mapCenter = [districtList[0]['center'].lng, districtList[0]['center'].lat];
        }
      });
    },
    showStore: function() {
      if(this.isAllDay == 'true'){
      	this.store.busBeginTime = '00:00:00';
      	this.store.busEndTime = '23:59:59'
      }
      console.log(this.store)
      addStoreStepOne(this.store).then(res=>{
      	console.log(res)
      	this.$router.push({path: 'qualification', query: {step: '1'}})
      })

    },
    uploadLogoUrl: function(e){
    	var file = e.raw;
    	var fd = new FormData();
    	fd.append('file', file);
    	fd.path = '/store';
    	uploadFiles(fd).then(data => {
    	    console.log(data)
    	    this.store.logoUrl = data.originalUrl;
    	}).catch(err => {
    	    console.log(err)
    	})
    },
    uploadShopFaceUrl: function(e){
    	var file = e.raw;
    	var fd = new FormData();
    	fd.append('file', file);
    	fd.path = '/store';
    	uploadFiles(fd).then(data => {
    	    console.log(data)
    	    this.store.shopFaceUrl = data.originalUrl;
    	}).catch(err => {
    	    console.log(err)
    	})
    },
    uploadShopInnerUrl: function(e){
    	var file = e.raw;
    	var fd = new FormData();
    	fd.append('file', file);
    	fd.path = '/store';
    	uploadFiles(fd).then(data => {
    	    console.log(data)
    	    this.store.shopInnerUrl = data.originalUrl;
    	}).catch(err => {
    	    console.log(err)
    	})
    }

  },
  created: function() {
  	this.loginPhoneNumber = sessionStorage.getItem('user')
    shopCategoryList().then(res => {
      this.shopCategory = res.list;
    })
    getProvinceList().then(res => {
      this.provinceList = res;
    })

  }
}

</script>
<style scoped>
.store {
  background-color: #ebebeb;
}

.store-content {
  background-color: #fff;
  padding: 40px 50px;
  min-height: 650px;
}

.fee{
	width: 300px;
}
.amap-container {
  position: relative;
  height: 500px;
}

.search-box {
  position: absolute;
  top: 15px;
  left: 10px;
}
.photo-info{
	width: 600px;
	/* height: 80px; */
	border-bottom: 1px solid #000;
}
.photo-title,.photo-upload{
	display: inline-block;
	vertical-align: middle;
}
.photo-title{
	width: 90px;
	height: 100%;
	line-height: 90px;
	text-align: center;
	font-size: 12px;
	background-color: #dedede;
	color: #666;
}
.upload-demo{
	width: 100px;
	height: 60px;
	/* height: 90px; */
	margin-left: 10px;
	background-color: #dedede;
}

 .avatar-uploader-icon {
   font-size: 28px;
   color: #8c939d;
   width: 100px;
   height: 60px;
   line-height: 60px;
   text-align: center;
   vertical-align: middle;
 }
 .avatar {
   width: 100%;
   height: 100%;
   display: block;
 }
</style>
