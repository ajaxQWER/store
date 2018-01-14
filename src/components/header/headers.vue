<template>
  <header>
    <el-row class="row">
      <el-col :span="8">
        <router-link to="/index" class="index">共享点餐商户中心</router-link>
        <!-- <span class="notification">点击查看《xxx》</span> -->
      </el-col>
      <el-col class="tar" :span="8" :offset="8">
        <!-- <span>如开店过程遇到任何问题，请咨询<a href="#">在线客服</a></span> -->
        <span>如开店过程遇到任何问题，请咨询客服</span>
      </el-col>
    </el-row>
  </header>
</template>
<script>
export default {
  name: 'headers',
  data: function() {
    return {};
  }
}

</script>
<style scoped>
.index{
  font-size: 22px;
}
  header a{
    color: #fff;
    text-decoration: none;
  }
</style>
