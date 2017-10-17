<template>
    <el-row>
        <steps></steps>
        <h1>{{msg}}</h1>
    </el-row>
</template>
<script>
import steps from '@/components/steps/steps'
export default {
    components: {
        steps: steps
    },
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
