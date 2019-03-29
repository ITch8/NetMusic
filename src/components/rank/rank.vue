<template>
	<div>
		<scroll ref="scroll" class="scroll" :data="topList">
			<div class="mod_topic">
				<ul ref="list">
					<li class="topic_item" v-for="(item,index) in topList" :key="index">
						<div class="topic_main">
							<a class="topic_media">
								<img :src="item.picUrl" />
								<span class="listen_count"><i class="icon icon_listen"></i> {{item.listenCount | favirate}}W</span>
							</a>
							<div class="topic_info">
								<div class="topic_cont">
									<h3 class="topic_tit">{{item.topTitle}}</h3>
									<p v-for="(item,index) in item.songList" :key="index">
										{{index + 1}}
										<span class="text_name">{{item.songname}} - {{item.singername}}</span>
									</p>
								</div>
								<i class="topic_arrow"></i>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</scroll>
	</div>
</template>

<script type="text/ecmascript-6">
	
	import {getTopList} from 'api/commonApi.js'
	import Scroll from 'components/base/scroll/scroll'
	import {RES_OK} from 'api/config.js'
	import {playListMixin} from 'common/js/mixin'
	
	export default{
		mixins:[playListMixin],
		data(){
			return {
				topList:[]
			}
		},
		mounted() {
			this._getTopList()
		},
		methods:{
			_getTopList(){
				getTopList().then((res)=>{
					if(res.code  == RES_OK){
						console.log(res.data.topList);
						this.topList = res.data.topList
					}
				}).catch((e)=>{
				})
			},
			handlePlayList(playlist){//当底部播放器存在时 改变播放列表的padding_bottom
				let padding_bottom  = playlist.length > 0 ? '70px' : ''
				this.$refs.list.style.paddingBottom = padding_bottom
			}
		},
		filters:{
			favirate(num){
				return Math.ceil(Number(num || 0)/10000)
			}
		},
		components:{
			Scroll
		}
	}
	
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	
	.scroll
		position: fixed
		width:100% 
		height:100%
		top: 88px
		.mod_topic
			margin:10px
			background: #f4f4f4
			padding-bottom: 70px
			li
				margin-bottom:10px
				overflow:hidden
			.topic_info
				position: relative
				-webkit-box-flex: 1
				display: -webkit-box
				-webkit-box-align: center
				-webkit-box-pack: center
			.topic_cont
				-webkit-box-flex: 1
				margin: 0 10px 0 15px
				p
					overflow: hidden
					white-space: nowrap
					text-overflow: ellipsis
					margin: 5px 0
				.text_name
					color: #000
					margin-left: 8px
					margin-right: 5px
					font-size:$font-size-small
			.topic_arrow
				position: absolute
				right: 10px
				top: 50%
				margin-top: -4px
				width: 6px
				height: 6px
				border-right: 1px solid #b2b2b2
				border-bottom: 1px solid #b2b2b2
				-webkit-transform: rotate(-45deg)
			.topic_tit
				font-size: 16px
				color: #000
				font-weight: 400
				margin-bottom: 15px
			.topic_main
				display:-webkit-box
				background:#fff
				padding: 5px 0
			.topic_media
				position: relative
				width: 100px
				height: 100px
				display: block
				&:after
					content: ""
					position: absolute
					left: 0
					bottom: 0
					width: 100%
					height: 100px
					z-index:1
					background:rgba(0,0,0,0.4)
				img
					display:block
					width:100px
					height:100px
				.listen_count
					left:5px
					bottom:7px
					line-height: 12px
					color: #fff
					opacity: .6
					font-size: 9px
					z-index: 10
				.icon-play,.listen_count
					position:absolute
					display:block
	
</style>
