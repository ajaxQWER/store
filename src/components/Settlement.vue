<template>
	<div class="settlement">
        <headers></headers>
         <steps></steps>
        <el-row class="row">
            <h1>{{msg}}</h1>
        </el-row>
        <el-row class="row">
            <el-col>
                <router-link to="/store?step=0">home</router-link>
                <router-link to="/qualification?step=1">index1</router-link>
                <router-link to="/delivery?step=2">index2</router-link>
                <router-link to="/settlement?step=3">index2</router-link>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import steps from '@/components/steps/steps'
import headers from '@/components/header/headers'
export default {
	name: 'index2',
	components: {
		steps: steps,
		headers: headers
	},
	data() {
		return {
			msg: 'hello222'
		}
	}
}

</script>