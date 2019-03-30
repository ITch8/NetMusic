<template>
	<scroll class="recommend" ref="recommend" :data="songList">
		<div class="recommend-content">
			<div v-if="recommends.length" class="slider-wrapper">
				<slider>
					<div v-for="(item,index) in recommends" :key="index">
						<a :href="item.linkUrl">
							<img :src="item.picUrl" />
						</a>
					</div>
				</slider>
			</div>
			<div class="recommend-list mod_twocol_list">
				<h1 class="list-title">电台</h1>
				<ul class="list_container">
					<li v-for="(item,index) in radioList" :key="index">
						<div class="list_main">
							<div class="list_media">
								<img class="video_list__media_img"  :src="item.picUrl" alt="item.Ftitle"/>
								<span class="icon icon-play-mini"></span>
							</div>
							<div class="list_info">
								<h3 class="list_tit tit_two_row">{{item.Ftitle}}</h3>
							</div>
						</div>
					</li>
				</ul>
				<h1 class="list-title .mod_twocol_list">热门歌单</h1>
				<ul class="list_container" ref="list">
					<li v-for="(item,index) in songList" :key="index" @click="toRadio(item)">
						<a class="list_main" href="javascript:">
							<div class="list_media">
								<img class="video_list__media_img"  :src="item.picUrl" alt="item.Ftitle"/>
								<span class="listen_count">
									<i class="icon icon-favorite"> {{item.accessnum | favirate}}</i> 万
								</span>
								<span class="icon icon-play-mini"></span>
							</div>
							<div class="list_info">
								<h3 class="list_tit">{{item.songListDesc}}</h3>
								<p class="list_text">{{item.songListAuthor}}</p>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</scroll>
</template>

<script>
	import Slider from 'components/base/slider/slider'
	import Scroll from 'components/base/scroll/scroll'
	import {getRecommend} from 'api/commonApi.js'
	import {RES_OK} from 'api/config.js'
	import {playListMixin} from 'common/js/mixin'
	
	export default {
		mixins:[playListMixin],
		data(){
			return {
				recommends:[],
				radioList:[],
				songList:[]
			}
		},
		mounted(){
			this._getRecommend()
		},
		methods:{
			_getRecommend(){
				getRecommend().then((res)=>{
					if(res.code  == RES_OK){
						this.recommends = res.data.slider
						this.radioList = res.data.radioList
						this.songList = res.data.songList
					}else{
					}
				}).catch((e)=>{
				})
			},
			toRadio(item){
				let id  = item.id
				this.$router.push({path:'/radio',query:{disstid:item.id}})
			},
			handlePlayList(playlist){//当底部播放器存在时 改变播放列表的padding_bottom
				let padding_bottom  = playlist.length > 0 ? '60px' : ''
				this.$refs.list.style.paddingBottom = padding_bottom
			}
		},
		components:{
			Slider,
			Scroll
		},
		filters:{
			favirate(num){
				return Math.ceil(Number(num || 0)/10000)
			}
		}
	}
	
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  
.recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    height:100%
    overflow:scroll
	.recommend-content
		overflow: hidden
		padding-bottom:80px
		.slider-wrapper
			position: relative
			width: 100%
			overflow: hidden
		.recommend-list
			margin-left: 10px
			margin-right: 10px
			.list-title
				height: 35px
				line-height: 35px
				text-align: center
				font-size: $font-size-medium
				color: $color-theme
			.list_container
				overflow: hidden
				margin-right: -8px
			li
			  float:left
			  width:50%
			  -webkit-box-sizing: border-box;
			  padding-right: 8px
			  margin-bottom: 10px
			  overflow: hidden
			.list_main
				display: block
				background: #fff
				line-height:0
				.list_media
					position: relative
					margin-bottom: 5px
					&:before
						content: "";
						display: block;
						padding-top: 100%;
					&:after
						content:""
						position:absolute
						left:0
						bottom:0
						width:100%
						height:30px
						z-index:2
						background: rgba(0,0,0,0.4);
					img
						position: absolute
						top: 0
						left: 0
						display: block
						width: 100%
						z-index: 1
						vertical-align:bottom
					.icon-play-mini
						position: absolute
						display: block
						z-index: 10
						right:5px
						bottom:5px
						color:$color-text
					.listen_count
						left: 5px
						bottom: 7px
						display: block
						line-height: 12px
						font-size:12px
						color: $color-text
						position:absolute
						z-index:10
					.icon-favorite
						width:10px
						height:10px
				.list_info
					padding: 0 7px 5px
					color: #000
					.list_tit
						height: 36px
						line-height: 18px
						white-space: normal
						word-wrap: break-word
						font-size:$font-size-medium
						overflow: hidden
						text-overflow: ellipsis
						font-weight: 400
						white-space:nowrap
						overflow:hidden
						text-overflow:ellipsis
						font-weight:400
						font-size:12px
					.list_text
						white-space:nowrap
						text-overflow:ellipsis
						font-weight:400
						font-size:12px
							
		.loading-container
			position: absolute
			width: 100%
			top: 50%
			transform: translateY(-50%)
</style>