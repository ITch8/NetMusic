<template>
	<div>
		<div class="info_box">
			<div class="info_box__bd">
				<div class="album">
					<div class="album__media">
						<img  class="album__cover" :src="rank_pic" />
					</div>
					<div class="album__bd">
						<h1 class="album__name">{{rank_title}}</h1>
						<p class="total">{{title_share}}</p>
						<p class="total">更新时间 {{update_time}}</p>
					</div>
				</div>
			</div>
		</div>
		<scroll ref="scroll" class="scroll" :data="songs">
			<song-list :data="songs"></song-list>
		</scroll>
	</div>
</template>

<script>
	import {getTopDetail} from 'api/rank.js'
	import Scroll from 'components/base/scroll/scroll'
	import SongList from 'components/base/song-list/song-list'
	import Song from 'common/js/class/song.js'
	import {RES_OK} from 'api/config.js'
	
	export default{
		data(){
			return{
				rank_id:'26',
				rank_pic:'',
				rank_title:'',
				title_share:'',
				update_time:'2019-03-28',
				songs:[]
			}
		},
		mounted(){
		},
		activated(){
			this.rank_id = this.$route.query.rank_id
			this.rank_pic = this.$route.query.rank_pic
			this._getTopDetail()
		},
		methods:{
			_getTopDetail(){
				let res =  getTopDetail(this.rank_id).then((res)=>{
					console.log(`res=====${JSON.stringify(res)}`)
					let detail = res.detail.data.data
					this.rank_title = detail.title
					this.update_time = detail.updateTime
					this.title_share = detail.titleShare
					let list  = detail.song|| []
					let arr = []
					console.log(`list=====${JSON.stringify(list)}`)
					list.forEach((v)=>{
						arr.push(new Song(v.songId,v.title,v.title,v.singerName,v.singerMid,v.mid))
					})
					this.songs = arr || []
					
				}).catch((err)=>{
					
				})
			}
		},
		components:{
			Scroll,
			SongList
		}
	}
	
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	
	.scroll
		position: fixed
		width:100% 
		height:100%
		top: 150px
	.info_box
		position:absolute
		top: 0
		left: 0
		z-index: 10
		width: 100%
		overflow: hidden
		color: #fff
		background: #fff
		.info_box__bd
			position: relative
			z-index: 4
			width: 100%
			display: -webkit-box
			-webkit-box-orient: vertical
			overflow: hidden
			background: rgba(0,0,0,.5)
			.album
				display: -webkit-box
				-webkit-box-pack: center
				-webkit-box-align: center
				-webkit-box-sizing: border-box
				width: 100%
				padding: 20px 16px
				overflow: hidden
				.album__media
					position: relative
					width: 125px
					margin-right: 10px
					overflow: hidden
					&:after
						content: ""
						display: block
						padding-top: 100%
					.album__cover
						position: absolute
						top: 0
						left: 0
						z-index: 2
						width: 100%
						height: 100%
						object-fit: cover
				.album__bd
					position: relative
					-webkit-box-flex: 1
					.album__name
						display: -webkit-box
						-webkit-box-orient: vertical
						-webkit-line-clamp: 2
						max-height: 47px
						line-height: 1.3
						overflow: hidden
						font-size: 18px
					.total
						font-size:13px
						margin-top:20px
</style>
