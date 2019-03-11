<template>
	<div></div>
</template>

<script type="text/ecmascript-6">
	import {getSings} from 'api/sing.js'
		
		
		export default{
			data(){
				return{
					sings:[]
				}
			},
			mounted() {
				this._getSings()
			},
			methods:{
				_getSings(){
					getSings().then(res=>{
						console.log(res)
					})
				}
			}
		}
		
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	
	
	
</style>
