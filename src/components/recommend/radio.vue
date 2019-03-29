<template>
	<div>
		<div class="info_box">
			<div class="info_box__bd">
				<div class="album">
					<div class="album__media">
						<img  class="album__cover js_open_music" :src="album__cover" />
					</div>
					<div class="album__bd">
						<h1 class="album__name js_info_show">{{album__name}}</h1>
						<div class="author js_open_author">
							<img class="author__avatar" :src="author__avatar"/>
							<div class="author__bd">
								<span class="author__name">{{author__name}}</span>
							</div>
						</div>
						<div class="album__desc">播放量：{{album__desc | numFilter}}万</div>
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
	import SongList from 'components/base/song-list/song-list'
	import Scroll from 'components/base/scroll/scroll'
	import {getRadioDetail} from 'api/song'
	import {RES_OK} from 'api/config.js'
	import Song from 'common/js/class/song'
	
	export default{
		data(){
			return{
				album__name:'',
				album__cover:'',
				author__name:'',
				album__desc:'',
				author__avatar:'',
				disstid:'',
				songs:[]
			}
		},
		mounted(){
		},
		methods: {
			_getRadioDetail() {
				getRadioDetail(this.disstid).then((res)=>{
					let cdDetail = res.cdlist[0]
					let songList = cdDetail.songlist || []
					let songTemp = []
					this.album__name = cdDetail.dissname
					this.album__cover = cdDetail.logo
					this.author__name = cdDetail.nickname
					this.album__desc = cdDetail.visitnum
					this.author__avatar = cdDetail.headurl
					songList.forEach(v=>{
						songTemp.push(new Song(v.songid,v.songname,v.albumname,v.singer[0].name,v.singer[0].mid,v.strMediaMid))
					})
					this.songs = songTemp
				}).catch((err)=>{
				})
			}
		},
		activated(){
			this.disstid  = this.$route.query.disstid || ''
			this._getRadioDetail()
			console.log(this.disstid)
		},
		components:{
			SongList,
			Scroll
		},
		filters:{
			numFilter(num){
				return Math.ceil(Number(num || 0)/10000)
			}
		}
	}
	
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
	.scroll
		position: fixed
		width:100% 
		height:100%
		top: 168px
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
					.author
						position: relative
						display: -webkit-box
						-webkit-box-align: center
						margin-top: 8px
						overflow: hidden
						.author__avatar
							display: block
							width: 24px
							height: 24px
							margin-right: 8px
							border-radius: 24px
						.author__bd
							-webkit-box-flex: 1
							.author__name
								display: block
								width: 100%
								overflow: hidden
								white-space: nowrap
								text-overflow: ellipsis
								font-size: 14px
								color: #fff
					.album__desc
						display: -webkit-box
						-webkit-box-orient: vertical
						-webkit-line-clamp: 2
						max-height: 36px
						overflow: hidden
						margin-top: 8px
					
</style>
