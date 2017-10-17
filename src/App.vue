<template>
	<transition name="fade" mode="out-in">
	  	<router-view></router-view>
	</transition>
</template>
<script>
export default {
	data() {
	    return {

	    };
	},

	methods: {

	}
}

</script>
<style>
html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0px;
  padding: 0px;
  background-size: cover;
  font-family: Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}

#app {
  width: 100%;
}
header {
    height: 60px;
    line-height: 60px;
    background-color: #009dec;
    color: #fff;
}
.row{
	width: 1000px;
	margin: 0 auto;
}
.tac{
	text-align: center;
}
.tal{
	text-align: left;
}
.tar{
	text-align: right;
}
img.thumb[lazy=error] {
  background: url(assets/images/default.jpg) no-repeat center center;
  background-size: cover;
}

img.thumb[lazy=loading] {
  background: url(assets/images/loading.svg) no-repeat center center #eaeaea;
  background-size: cover;
}

</style>
