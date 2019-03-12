<template>
	<div>
		<scroll ref="scroll" class="scroll" :data="songs">
			<song-list :data="songs"></song-list>
		</scroll>
	</div>
</template>

<script type="text/ecmascript-6">
	import {getSingerDetail} from 'api/singer.js'
	import Scroll from 'components/base/scroll/scroll'
	import SongList from 'components/base/song-list/song-list'
	import Song from 'common/js/class/song.js'
	import {RES_OK} from 'api/config.js'
	
	export default{
		data(){
			return{
				singermid:'002J4UUk29y8BY',
				singer_pic:'',
				singer_name:'',
				songs:[]
			}
		},
		mounted(){
			this._getSingerDetail()
		},
		methods:{
			_getSingerDetail(){
				let res =  getSingerDetail()
				let list  = res.data || []
				console.log(res)
				let arr = []
				if(list && list.length > 0){
					for(var i = 0 ; i < list.length; i++){
						console.log(list[i].id)
						arr.push(new Song(list[i].id,list[i].name,list[i].title,list[i].singer[0].name,list[i].url))
					}
				}
				this.songs = arr || []
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
		top: 88px
</style>
