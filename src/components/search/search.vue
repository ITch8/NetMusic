<template>
	<div>
		<scroll ref="scroll" class="scroll" :data="hotkey">
			<div class="mod_search_bar">
				<div class="search_bar_cont">
					<form class="search_form">
						<input v-model="search" class="search_input" placeholder="搜索歌曲、歌单、专辑" />
						<span class="icon icon_search">搜索</span>
						<span v-show="isDelete" class="icon icon_delete">删除</span>
					</form>
				</div>
				<div v-show="isCancel" class="search_bar_tip_text">取消</div>
			</div>
			<div class="mod_search_record" v-show="isClean">
				<ul></ul>
				<p class="record_handle">
					<a href="javascript:;">清除搜索记录</a>
				</p>
			</div>
			<div class="mod_search_result">
				<h3 class="result_tit">热门搜索</h3>
				<div class="result_tags">
					<a class="tag_s tag_hot">{{special_key}}</a>
					<a class="tag_s" v-for="(item,index) in hotkey" :key="index">{{item.k}}</a>
				</div>
			</div>
		</scroll>
	</div>
</template>

<script>
	
	import {getHotkey} from 'api/commonApi.js'
	import {RES_OK} from 'api/config.js'
	import Scroll from 'components/base/scroll/scroll'
	
	export default{
		data(){
			return{
				search:'',
				isDelete:false,
				isCancel:false,
				isClean:false,
				hotkey:[],
				special_key:''
			}
		},
		mounted(){
			this._getHotKey()
		},
		methods:{
			_getHotKey(){
				getHotkey().then((res)=>{
					if(res.code  == RES_OK){
						console.log(res.data.hotkey);
						this.special_key = res.data.special_key
						this.hotkey = res.data.hotkey
					}
				})
			}
		},
		components:{
			Scroll
		}
	}
	
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .scroll
  	position: fixed
  	width:100% 
  	height:100%
  	top: 88px
	.mod_search_bar
		background: #f4f4f4
		padding: 10px
		display: -webkit-box
		-webkit-box-orient: horizontal
		-webkit-box-align: center
		.search_bar_cont
			position: relative
			border-radius: 8px
			background: #fff
			height: 20px
			padding: 8px 12px 8px 35px
			-webkit-box-flex: 1
		.search_input
			height: 20px
			line-height: 20px
			width: 100%
			color: rgba(0,0,0,.3)
			border: none
			-webkit-appearance: none
			font-size: 14px
		.icon_search
			position: absolute
			top: 9px
			left: 10px
			width: 18px
			height: 18px
			background-repeat: no-repeat
			background-size: cover
			text-indent: -999px
		.icon_delete
			position: absolute
			top: 9px
			right: 12px
			width: 18px
			height: 18px
			background: #b1b1b1
			text-indent: -9999px
			border-radius: 99px
		.search_bar_tip_text
			padding-right: 10px
			padding-left: 10px
			font-size: 14px
			height: 36px
			line-height: 36px
	.mod_search_record
		li
			border-top: 1px solid #ededed
			padding: 0 15px
			.record_main
				position: relative
				display: block
				height: 44px
				line-height: 44px
				.iocn_clock
					position: absolute
					left: 0
					top: 12px
					width: 20px
					height: 20px
					text-indent: -999px
				.record_con
					position: absolute
					left: 40px
					right: 50px
					display: block
					height: 44px
					line-height: 44px
					color: #000
					font-size: 14px
					white-space: nowrap
					overflow: hidden
					text-overflow: ellipsis
				.icon_close
					position: absolute
					right: 0
					top: 12px
					width: 20px
					height: 20px
		.record_handle
			text-align: center
			height: 44px
			line-height: 44px
	.mod_search_result
		background: #fff
		padding: 15px 15px 10px 15px
		.result_tit
			color: rgba(0,0,0,.6)
			margin-bottom: 8px
		.result_tags
			font-size: 0
		.tag_s
			display: inline-block
			font-size: 14px
			padding: 0 10px
			height: 30px
			line-height: 30px
			color: #000
			border: 1px solid rgba(0,0,0,.6)
			border-radius: 99px
			word-break: keep-all
			margin-bottom: 10px
			margin-right: 14px
		.tag_hot
			color: #fc4524
			border-color: #fc4524
			
</style>
