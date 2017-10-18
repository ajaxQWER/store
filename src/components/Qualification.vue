<template>
  <div class="qualification">
    <headers></headers>
    <steps></steps>
    <el-row class="row qualification-content">
      <el-row class="license">
        <el-form :model="license" ref="license" label-width="100px">
          <el-form-item class="normal-item" label="证件类型" prop="">
            <el-select v-model="license.a" placeholder="请选择证件类型">
              <el-option v-for="item in licenseObj" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="normal-item" label="真实姓名" prop=" ">
            <el-input v-model="license.readyName"></el-input>
          </el-form-item>
          <el-form-item class="normal-item" label="证件号码" prop="idCardNum">
            <el-input v-model="license.idCardNum"></el-input>
          </el-form-item>
          <el-form-item class="normal-item" label="证件照片" prop="">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row class="license">
        <el-form :model="license" ref="license" label-width="100px">
          <el-form-item class="normal-item" label="主体资质" prop="">
            营业执照
          </el-form-item>
          <el-form-item class="normal-item" label="单位名称" prop="">
            <el-input v-model="license.a"></el-input>
          </el-form-item>
          <el-form-item class="normal-item" label="法定代表人" prop="">
            <el-input v-model="license.a"></el-input>
          </el-form-item>
          <el-form-item class="normal-item" label="注册号" prop="">
            <el-input v-model="license.a"></el-input>
          </el-form-item>
          <el-form-item class="normal-item" label="注册地址" prop="">
            <el-input v-model="license.a"></el-input>
          </el-form-item>
          <el-form-item class="normal-item" label="有效期" prop="">
            <span>是否长期</span>
            <el-switch v-model="license.b" on-text="是" off-text="否">
            </el-switch>
            <el-date-picker
			      v-model="license.a"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
          </el-form-item>
          <el-form-item class="normal-item" label="证件照片" prop="">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row class="license">
        <el-form :model="license" ref="license" label-width="100px">
          <el-form-item class="normal-item" label="行业资质" prop="">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-form-item>
          <el-form-item class="normal-item" label="单位名称" prop="">
            <el-input v-model="license.a"></el-input>
          </el-form-item>
          <el-form-item class="normal-item" label="法定代表人" prop="">
            <el-input v-model="license.a"></el-input>
          </el-form-item>
          <el-form-item class="normal-item" label="许可证编号" prop="">
            <el-input v-model="license.a"></el-input>
          </el-form-item>
          <el-form-item class="normal-item" label="许可证地址" prop="">
            <el-input v-model="license.a"></el-input>
          </el-form-item>
          <el-form-item class="normal-item" label="有效期" prop="">
            <span>是否长期</span>
            <el-switch v-model="license.b" on-text="是" off-text="否"></el-switch>
            <el-date-picker
			      v-model="license.a"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
          </el-form-item>
          <el-form-item class="normal-item" label="资质照片" prop="">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-row>
    </el-row>
      <el-row class="btn-row row">
        <el-col class="tac">
          <router-link to="/store?step=0">
            <el-button size="large">返回上一步</el-button>
          </router-link>
          <router-link to="/settlement?step=2">
            <el-button class="small-item" type="primary" size="large">进行下一步</el-button>
          </router-link>
        </el-col>
      </el-row>
  </div>
</template>
<script>
import steps from '@/components/steps/steps'
import headers from '@/components/header/headers'
export default {
  name: 'qualification',
  components: {
    steps: steps,
    headers: headers
  },
  data() {
    return {
      license: {
        readyName: '',
        idCardNum: '',
        a: '',
        b: true
      },
      licenseObj: [{
        value: '身份证',
        label: 0,
      }, {
        value: '港澳居民来往内地通行证',
        label: 1
      }, {
        value: '台胞证',
        label: 2
      }, {
        value: '护照',
        label: 3
      }]
    }
  }
}

</script>
<style>
	.qualification{
		background-color: #ebebeb;
	}
	.qualification a{
		text-decoration: none;
		color: #fff;
	}
	.qualification-content{
		background-color: #fff;
		padding: 40px 50px;
		min-height: 650px;
	}
</style>
