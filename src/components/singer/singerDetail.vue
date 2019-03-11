<template>
	<div class="s_detail">
		<div ref="mescroll" class="mescroll">
			<img src="../../common/image/person_default.png" />
			<ul>
				<li class="s_singer_item" v-for="(item,index) in sings" :key="index">
					<div class="qui_list__order">
						<span class="qui_list__decimal">{{index + 1}}</span>
					</div>
					<div class="qui_list__bd">
						<div class="qui_list__box">
							<h3 class="qui_list__txt"><span class="qui_list__txt">{{item.title}}</span></h3>
							<p class="qui_list__desc"><span class="qui_list__txt">{{item.desc}}</span></p>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {getSingerDetail} from 'api/singer.js'
	import MeScroll from 'mescroll.js'
	import 'mescroll.js/mescroll.min.css'
	import {RES_OK} from 'api/config.js'
	
	export default{
		data(){
			return{
				singermid:'002J4UUk29y8BY',
				singer_pic:'',
				singer_name:'',
				sings:[],
				mescroll:null,
				num:5,
				page:0
			}
		},
		mounted(){
			this.mescroll = new MeScroll(this.$refs.mescroll, {
			    down: {
			        callback: this.downCb
				},
				up:{
					auto:false,
					callback:this.upCb
				}
			})
		},
		methods:{
			downCb(){
				this.page = 0
				this._getSingerDetail(true)
			},
			upCb(){
				this.page++
				this._getSingerDetail()
			},
			_getSingerDetail(isDown){
				getSingerDetail(this.singermid,this.page*this.num,this.num).then((res)=>{
					console.log(this.page)
					if(res.code == RES_OK){
						if(isDown){
							this.sings = res.data.list || []
							//数据渲染成功后,隐藏下拉刷新的状态
							this.$nextTick(() => {
							  this.mescroll.endSuccess(res.data.list.length);
							})
						}else{
							let arr = res.data.list || []
							if(this.page == 0) this.sings = []
							this.sings.concat(arr || [])
							// 数据渲染成功后,隐藏下拉刷新的状态
							this.$nextTick(() => {
							  this.mescroll.endSuccess(arr.length,arr.length >= this.num )
							})
						}
					}else{
						this.mescroll.endErr()
					}
					console.log(this.singers.length)
				}).catch(err=>{
					this.mescroll.endErr()
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
	}
	
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	
	.s_detail
		.mescroll
			img
				width:100%
				height:200px
			li
				position:relative
				display:-webkit-box
				padding:10px 16px
				.qui_list__order
					display: -webkit-box
					-webkit-box-orient: vertical
					-webkit-box-pack: center
					-webkit-box-align: center
					width: 45px
					margin-right: -16px
				.qui_list__bd 
					position: relative
					-webkit-box-flex: 1
					display: -webkit-box
					-webkit-box-align: center
					padding: 10px 16px
					overflow: hidden
					.qui_list__box
						-webkit-box-flex: 1
						display: -webkit-box
						-webkit-box-orient: vertical
						.qui_list__tit
							font-size: 16px
							color: #000
							.qui_list__txt
								display: block
								max-width: 100%
								overflow: hidden
								white-space: nowrap
								text-overflow: ellipsis
			li:nth-child(-n+3)
				.qui_list__decimal
					color: #FF400B;
</style>
