<template>
  <div class="store">
    <headers></headers>
    <steps></steps>
    <el-row class="row store-content">
    	<h2>店铺绑定手机号:{{store.phoneNum?store.phoneNum:'13666666666'}}</h2>
      <el-form :model="store" :rules="rules" ref="store" label-width="100px">
        </el-form-item>
        <el-form-item class="normal-item" label="店铺名称" prop="shopName">
          <el-input v-model="store.shopName"></el-input>
        </el-form-item>
        <el-form-item class="small-item" label="联系电话" prop="phone">
          <el-input v-model="store.phone"></el-input>
        </el-form-item>
        <el-form-item class="small-item" label="联系人姓名" prop="boss">
          <el-input v-model="store.boss"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" prop="shopCategory">
          <el-select v-model="store.shopCategory" multiple :multiple-limit="5" placeholder="请选择店铺分类">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-radio class="radio" v-model="isAllDay" label="1">全天</el-radio>
          <el-radio class="radio" v-model="isAllDay" label="0">自定义</el-radio>
          <span v-show="isAllDay=='0'">
	          <el-time-picker v-model="store.beginTime" placeholder="营业开始时间" prop="beginTime"></el-time-picker>
	          <el-time-picker v-model="store.endTime" placeholder="营业结束时间" prop="endTime"></el-time-picker>
          </span>
        </el-form-item>
        <el-form-item label="店铺位置">
        	<el-select v-model.number="store.provinceId" filterable placeholder="省" prop="type">
                <el-option v-for="item in province" :key="item.userId" :label="item.base.name" :value="item.userId">
                </el-option>
            </el-select>
        	<el-select v-model.number="store.cityId" filterable placeholder="市" prop="type">
                <el-option v-for="item in city" :key="item.userId" :label="item.base.name" :value="item.userId">
                </el-option>
            </el-select>
        	<el-select v-model.number="store.areaId" filterable placeholder="区" prop="type">
                <el-option v-for="item in district" :key="item.userId" :label="item.base.name" :value="item.userId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="store.address" placeholder="详细至街道和门牌号"></el-input>
        </el-form-item>
        <el-form-item label="">
          <div class="amap">
	          <el-amap vid="amapDemo" :plugin="plugin" class="amap" :zoom="zoom" :center="mapCenter" :events="events">
	              <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker"></el-amap-marker>
	          </el-amap>
	      </div>
		</el-form-item>
        <!-- <el-form-item label="店铺照片" prop="type">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺Logo" prop="type">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item> -->
      </el-form>
    </el-row>
    <el-row class="row">
      <el-col class="tac">
      	<el-button size="large"><router-link to="/index">返回上一步</router-link></el-button>
      	<el-button class="small-item" type="primary" size="large"><router-link to="/qualification?step=1">进行下一步</router-link></el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import steps from '@/components/steps/steps'
import headers from '@/components/header/headers'
import { AMapManager } from 'vue-amap'
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
        phone: '',
        boss: '',
        shopCategory: [],
        provinceId: 0,
        cityId: 0,
        areaId: 0,
        beginTime: '00:00:00',
        endTime: '00:00:00',
        address: '',
        longitude: 0,
        latitude: 0,
      },
      isAllDay: '1',
      province: [],
      city: [],
      district: [],
      zoom: 14,
      mapCenter: [0, 0],
      markers: [],
      plugin: [{
          pName: 'ToolBar'
      }, {
          pName: 'Geolocation',
          events: {
              init(o) {
                  // o 是高德地图定位插件实例
                  o.getCurrentPosition((status, result) => {
                      if (result && result.position) {
                      	console.log(result)
                          that.store.longitude = result.position.lng;
                          that.store.latitude = result.position.lat;
                          that.mapCenter = [result.position.lng, result.position.lat];
                          that.store.address = result.formattedAddress
                          that.$nextTick();
                      }
                  });
              },
              click: function(e){
              	console.log(e)
              }
          }
      }],
      events: {
        click: function(e) {
            var lnglat = e.lnglat;
            that.store.longitude = lnglat.lng;
            that.store.latitude = lnglat.lat;
            that.markers = [
                [e.lnglat.lng, e.lnglat.lat]
            ];
            var geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
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
      rules: {
        shopName: [
          { required: true, message: '请输入店铺名称' }
        ],
        phone: [
          { required: true, message: '请输入店铺联系电话' }
        ],
        boss: [
          {required: true, message: '请输入店铺联系人' }
        ],
        shopCategory: [
          { type: 'array', required: true, message: '请选择店铺分类' }
        ],
        beginTime: [
          { required: true, message: '请选择营业开始时间' }
        ],
        endTime: [
          { required: true, message: '请选择营业结束时间' }
        ],
        address: [
          { required: true, message: '请输入详细地址' }
        ]
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}

</script>
<style>
.store {
  background-color: #ebebeb;
}
.store a{
	text-decoration: none;
	color: #fff;
}
.el-button--default a{
	color: #333;
}

.store-content {
  background-color: #fff;
  padding: 40px 50px;
}

.small-item {
  width: 300px;
}

.normal-item {
  width: 400px;
}

.large-item {
  width: 500px;
}
.amap {
    height: 500px;
}


</style>
