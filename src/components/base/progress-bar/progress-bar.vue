<template>
	<div class="progress-bar" ref="progressBar">
		<div class="bar-innner">
			<div class="progress" ref="progress"></div>
			<div class="progress-btn-wrapper"><div class="progress-btn"></div></div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default{
	name:'progress-bar',
	data(){
		return{
			percent:{
				type:Number,
				default:0
			}
		}
	},
	watch:{
		percent(newPercent){
			if(newPercent > 0){
				const barWidth = this.$refs.progressBar.clientWidth - 16 //总宽度
				const offsetW = newPercent * barWidth  //进度宽度
				this.$refs.progress.style.width = offsetW
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
