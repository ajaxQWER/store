<template>
  <el-row class="row">
    <el-col>
		<h1>hello world</h1>
		<router-link to="/store?step=0">home</router-link>
		<router-link to="/qualification?step=1">index1</router-link>
		<router-link to="/delivery?step=2">index2</router-link>
		<router-link to="/settlement?step=3">index2</router-link>
    </el-col>
  </el-row>
</template>
<script>
import headers from '@/components/header/headers'
export default {
  components: {
    headers: headers
  },
  data: function() {
    return {}
  }
}

</script>
