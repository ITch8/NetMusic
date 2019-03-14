<template>
	<div class="s_singers">
		<scroll ref="scroll" class="scroll" :data="singers">
			<ul>
				<li class="s_singers_item" v-for="(item,index) in singers" :key="index" @click="detail(item)">
					<div class="s_main">
						<a href="javascript:;" class="s_pic">
							<img v-lazy="item.singer_pic" />
						</a>
						<div class="s_info">
							{{item.singer_name}} ({{item.country}})
						</div>
					</div>
				</li>
			</ul>
		</scroll>
	</div>
</template>

<script type="text/ecmascript-6">
	import {getSingerList} from 'api/singer.js'
	import {RES_OK} from 'api/config.js'
	import Scroll from 'components/base/scroll/scroll'
	import Vue from 'vue'
	import VueLazyload  from 'vue-lazyload'
	
	Vue.use(VueLazyload,{
		preLoad:1.3,
		error:require('common/image/person_default.png'),
		loading:require('common/image/person_default.png'),
		attempt:1
	})
	
	export default{
		data(){
			return{
				singers:[]
			}
		},
		mounted(){
			this._getSingers()
		},
		methods:{
			_getSingers(){
				getSingerList().then((res)=>{
					this.singers = res.singerList.data.singerlist
					console.log(JSON.stringify(this.singers[0]))
				})
			},
			detail(item){
				this.$router.push({path:'/singer_detail',query:{singermid:item.singer_mid,singer_pic:item.singer_pic}})
			}
		},
		components:{
			Scroll
		}
	}
	
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.s_singers
		margin:10px
		padding:0 15px
		.scroll
			position: fixed
			width:100% 
			height:100%
			top: 88px
		li
			margin: 15px 0
			overflow:hidden
			.s_main
				display:-webkit-box
				background:$color-text
				img
					width:60px
					height:60px
					border-radius:60px
				.s_info
					position:relative
					-webkit-box-flex:1
					display:-webkit-box
					-webkit-box-align:center
					-webkit-box-pack:justify
					left:20px
					font-size:$font-size-medium
					color:$color-text-333
	
</style>
