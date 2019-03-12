<template>
  <div id="app">
		 <h-header></h-header>
		 <tabs></tabs>
		 <keep-alive>
			<router-view></router-view>
		 </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
	 import HHeader from '@/components/header/h-header.vue'
	 import Tabs from '@/components/tabs/tabs.vue'
	
		export default {
			name: 'App',
			components:{
				HHeader,
				Tabs
			}
		}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
	@import "~common/stylus/variable"


	#app
		color: $color-theme
	
</style>
