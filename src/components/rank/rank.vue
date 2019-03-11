<template>
	<div>
		<div ref="mescroll" class="mescroll">
			<div class="mod_topic">
				<ul>
					<li class="topic_item" v-for="(item,index) in topList" :key="index">
						<div class="topic_main">
							<a class="topic_media">
								<img :src="item.picUrl" />
								<span class="listen_count"><i class="icon icon_listen"></i> {{item.listenCount | favirate}}万</span>
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
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	
	import {getTopList} from 'api/commonApi.js'
	import {RES_OK} from 'api/config.js'
	import MeScroll from 'mescroll.js'
	import 'mescroll.js/mescroll.min.css'
	
	export default{
		data(){
			return {
				topList:[],
				mescroll:null
			}
		},
		mounted() {
			this.mescroll = new MeScroll(this.$refs.mescroll, {
			    down: {
			        callback: this._getTopList
				},
				up:{
					use:false
				}
			})
		},
		methods:{
			_getTopList(){
				getTopList().then((res)=>{
					if(res.code  == RES_OK){
						console.log(res.data.topList);
						this.topList = res.data.topList
						//数据渲染成功后,隐藏下拉刷新的状态
						this.$nextTick(() => {
						  this.mescroll.endSuccess(res.data.topList.length);
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
