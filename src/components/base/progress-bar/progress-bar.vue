<template>
	<div class="progress-bar" ref="progressBar" @click="clickProgress">
		<div class="bar-inner">
			<div class="progress" ref="progress"></div>
			<div class="progress-btn-wrapper">
				<div ref="btn" class="progress-btn" @touchstart.prevent="pTouchstart" @touchmove.prevent="pTouchMove" @touchend.prevent="pTouchEnd"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	name:'progress-bar',
	data(){
		return{
			touch:{}
		}
	},
	props:['pers'],
	methods: {
		clickProgress(e){//点击选择播放进度
			this._setOffset(e.offsetX)
			this._setPlayerProgress()
		},
		pTouchstart(e){
			this.touch.inits = true
			this.touch.startX = e.touches[0].pageX  //开始位置
			this.touch.left = this.$refs.progress.clientWidth //左边偏移量
		},
		pTouchMove(e){
			if(!this.touch.inits){
				return
			}
			const deltaX = e.touches[0].pageX - this.touch.startX
			const offSetWidth = Math.min(this.$refs.progressBar.clientWidth - 16,Math.max(0,this.touch.left + deltaX))
			this._setOffset(offSetWidth)
		},
		pTouchEnd(){
			this.touch.inits = false
			//更新播放器的播放进度
			this._setPlayerProgress()
		},
		_setOffset(width){//设置偏移量
			this.$refs.progress.style.width = `${width}px`   //进度宽度
			this.$refs.btn.style.left = `${width+8}px`
		},
		_setPlayerProgress(){
			const barWidth = this.$refs.progressBar.clientWidth - 16 //总宽度
			const persent = this.$refs.progress.clientWidth / barWidth
			this.$emit('setPlayerPersent',persent)
		}
	},
	watch:{
		pers(val){
			if(val > 0 && !this.touch.inits){
				const barWidth = this.$refs.progressBar.clientWidth - 16 //总宽度
				const offProgress = val * barWidth
				this._setOffset(offProgress)
			}
		}
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	
.progress-bar
	height: 30px
	.bar-inner
		position:relative
		top:13px
		height:4px
		background:rgba(0,0,0,0.3)
		.progress
			position: absolute
			height: 100%
			background: $color-theme
		.progress-btn-wrapper
			position: absolute
			left: -8px
			top: -13px
			width: 30px
			height: 30px
			.progress-btn
				position: relative
				top: 7px
				left: 7px
				box-sizing: border-box
				width: 16px
				height: 16px
				border: 3px solid $color-text
				border-radius: 50%
				background: $color-theme
</style>
