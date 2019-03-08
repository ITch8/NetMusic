<template>
	<div>
		<div ref="mescroll" class="mescroll">
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
					<ul class="list_container">
						<li v-for="(item,index) in songList" :key="index">
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
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Slider from 'components/base/slider/slider'
	import {getRecommend} from 'api/recommendAPI.js'
	import {RES_OK} from 'api/config.js'
	import MeScroll from 'mescroll.js'
	import 'mescroll.js/mescroll.min.css'
	
	export default {
		data(){
			return {
				mescroll:null,
				recommends:[],
				radioList:[],
				songList:[]
			}
		},
		mounted(){
			this.mescroll = new MeScroll(this.$refs.mescroll, {
			    down: {
			        callback: this._getRecommend
				},
				up:{
					use:false
				}
			})
		},
		created() {
		},
		methods:{
			_getRecommend(){
				getRecommend().then((res)=>{
					if(res.code  == RES_OK){
						console.log(res.data.slider);
						this.recommends = res.data.slider
						this.radioList = res.data.radioList
						this.songList = res.data.songList
						//数据渲染成功后,隐藏下拉刷新的状态
						this.$nextTick(() => {
						  this.mescroll.endSuccess(res.data.songList.length);
						})
					}else{
						this.mescroll.endErr();
					}
				}).catch((e)=>{
					//联网失败的回调,隐藏下拉刷新和上拉加载的状态;
			        this.mescroll.endErr();
				})
			}
		},
		 // 进入路由时,恢复列表状态
	  beforeRouteEnter (to, from, next) {  // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
		next(vm => {
		  if (vm.mescroll) {
			// 恢复到之前设置的isBounce状态
			if (vm.mescroll.lastBounce != null) vm.mescroll.setBounce(vm.mescroll.lastBounce)
			// 滚动到之前列表的位置 (注意:路由使用keep-alive才生效)
			if (vm.mescroll.lastScrollTop) {
			  vm.mescroll.setScrollTop(vm.mescroll.lastScrollTop)
			  setTimeout(() => { // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
				vm.mescroll.setTopBtnFadeDuration(0)// 设置回到顶部按钮显示时无渐显动画
			  }, 16)
			}
		  }
		})
	  },
	  // 离开路由时,记录列表状态
	  beforeRouteLeave (to, from, next) {  // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
		if (this.mescroll) {
		  this.mescroll.lastBounce = this.mescroll.optUp.isBounce// 记录当前是否禁止ios回弹
		  this.mescroll.setBounce(true) // 允许bounce
		  this.mescroll.lastScrollTop = this.mescroll.getScrollTop()// 记录当前滚动条的位置
		  this.mescroll.hideTopBtn(0)// 隐藏回到顶部按钮,无渐隐动画
		}
		next()
	  },
		components:{
			Slider
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

	.mescroll
		position: fixed
		width:100% 
		height:100% 
		top: 88px
		bottom: 80px
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