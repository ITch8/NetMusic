<template>
	<div>
		<div class="info_box">
			<div class="info_box__bd">
				<div class="album">
					<div class="album__media">
						<img  class="album__cover" :src="singer_pic" />
					</div>
					<div class="album__bd">
						<h1 class="album__name">{{singer_name}}</h1>
						<p class="total">单曲 {{total}}</p>
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
	import {getSingerDetail} from 'api/singer.js'
	import Scroll from 'components/base/scroll/scroll'
	import SongList from 'components/base/song-list/song-list'
	import Song from 'common/js/class/song.js'
	import {RES_OK} from 'api/config.js'
	
	export default{
		data(){
			return{
				singermid:'0025NhlN2yWrP4',
				singer_pic:'',
				singer_name:'',
				total:'',
				songs:[]
			}
		},
		mounted(){
			this.singermid = this.$route.query.singermid
			this.singer_pic = this.$route.query.singer_pic
		},
		activated(){
			this.singermid = this.$route.query.singermid
			this.singer_pic = this.$route.query.singer_pic
			this._getSingerDetail()
		},
		methods:{
			_getSingerDetail(){
				let res =  getSingerDetail(this.singermid).then((res)=>{
					let list  = res.data.list || []
					this.total = res.data.total || 0
					this.singer_name = res.data.singer_name
					let arr = []
					list.forEach((v)=>{
						arr.push(new Song(v.musicData.songid,v.musicData.songname,v.musicData.albumname,v.musicData.singer[0].name,v.musicData.singer[0].mid,v.musicData.strMediaMid))
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
			background: $color-background-info
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
