<template>
	<div>
		<div class="count_box">
			<div class="count_box__desc">歌曲
				<span class="count_box__number">共{{data && data.length}}首</span>
			</div>
		</div>
		<ul class="qui_list">
			<li class="js_play_song qui_list__item" v-for="(item,index) in data" :key="index" @click="_clickItem(item,index)">
				<div class="qui_list__bd">
					<div class="qui_list__box">
						<h3 class="qui_list__tit"><span class="qui_list__txt">{{item.name}}</span></h3>
						<p class="qui_list__desc"><span class="qui_list__txt">{{item.singer_name}}·{{item.album_title}}</span></p>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapActions} from 'vuex'
	
	export default {
		name:'song-list',
		props:{
			data:{
				type:Array,
				default:null
			}
		},
		methods:{
			_clickItem(item,index){//选中播放
				this.selectPlay({
					list:this.data,
					index:index
				})
			},
			...mapActions([
				'selectPlay'
			])
		},
		computed: {
			
		},
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.count_box
		position: relative
		display: -webkit-box
		-webkit-box-align: center
		height: 54px
		margin: 0 16px -10px
		.count_box__desc
			font-size:13px
			color:#777
			.count_box__number
				margin-left:5px
	.qui_list
		overflow:hidden
		.qui_list__item
			position:relative
			display:-webkit-box
			.qui_list__bd
				position:relative
				-webkit-box-flex:1
				display:-webkit-box
				-webkit-box-align:center
				padding:10px 16px
				overflow:hidden
				.qui_list__box
					-webkit-box-flex:1
					display:-webkit-box
					-webkit-box-orient:vertical
					.qui_list__tit
						font-size:16px
						color:#000
					.qui_list__txt
						display:block
						max-width:100%
						overflow:hidden
						white-space:nowrap
						text-overflow:ellipsis
					.qui_list__desc, .qui_list__tit
						display:-webkit-box
						-webkit-box-align:center
						overflow:hidden
					.qui_list__tit
						.qui_list__txt
							color:#000
					.qui_list__desc
						.qui_list__txt
							color:#777
							font-size:13px
							margin:8px 0 0
</style>
