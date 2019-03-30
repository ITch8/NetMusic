<template>
	<div class="player" v-show="playlist.length > 0">
		<transition  name="normal">
			<div class="normal-player" v-show="fullScreen">
				<div class="background">
					<img :src="currentSong.singer_pic" width="100%" height="100%"/>
				</div>
				<div class="top">
					<div class="back">
						<i class="icon-back" @click="convertToMini"></i>
					</div>
					<h1 class="title" v-html="currentSong.name"></h1>
					<h2 class="subtitle" v-html="currentSong.singer_name"></h2>
				</div>
				<div class="middle">
					<div class="middle-l" v-show="!isShowLyric">
						<div class="cd-wrapper">
							<div :class="cdCls">
								<img class="image" :src="currentSong.singer_pic">
							</div>
						</div>
						<div class="playing-lyric-wrapper">
							<div class="playing-lyric">{{lyricPlaying}}</div>
						</div>
					</div>
					<scroll class="middle-r" ref="lyricList" v-show="isShowLyric" :data="currentLyric && currentLyric.lines">
						<div class="lyric-wrapper">
							<div v-if="currentLyric.lines">
								<p ref="lyricLine" class="text" :class="{'current': currentLyricLine === index}" v-for="(line,index) in currentLyric.lines" :key="index">{{line.txt}}</p>
							</div>
						</div>
					</scroll>
				</div>
				<div class="bottom">
					<div class="progress-wrapper">
						<span class="time time-l">{{format(currentTime)}}</span>
						<div class="progress-bar-wrapper">
							<progress-bar :pers="persent" @setPlayerPersent="setPlayerPersent"></progress-bar>
						</div>
						<span class="time time-r">{{format(duration)}}</span>
					</div>
				  <div class="operators">
					<div class="icon i-left" @click="changeMode">
					  <i class="icon" :class="modeCls"></i>
					</div>
					<div class="icon i-left" :class="disableCls">
					  <i class="icon-prev" @click="prev"></i>
					</div>
					<div class="icon i-center">
					  <i :class="playCls" @click="play"></i>
					</div>
					<div class="icon i-right" :class="disableCls">
					  <i class="icon-next" @click="next"></i>
					</div>
					<div class="icon i-right"  @click="showLyric">
					  <span class="lyric-label" :class="{'lyric-false':!isShowLyric}">词</span>
					</div>
				  </div>
				</div>
			</div>
		</transition >
		<transition name="mini">
		  <div class="mini-player" v-show="!fullScreen" @click="convertToNormal">
			<div class="icon" >
			  <img :class="cdCls" width="40" height="40" :src="currentSong.singer_pic">
			</div>
			<div class="text">
			  <h2 class="name" v-html="currentSong.name"></h2>
			  <p class="desc" v-html="currentSong.singer_name"></p>
			</div>
			<div class="control" @click.stop="play">
				<i :class="miniPlayCls"></i>
			</div>
			<div class="control">
			  <i class="icon-playlist"></i>
			</div>
		  </div>
		</transition >
		<audio ref="audio" :src="currentSong.url" @play="ready" @error="error" @timeupdate="timeUpdate"></audio>
	</div>
</template>

<script>
	import {RES_OK} from 'api/config'
	import {mapGetters,mapMutations} from 'vuex'
	import ProgressBar from 'components/base/progress-bar/progress-bar.vue'
	import {playMode} from 'common/js/config'
	import Lyric from 'lyric-parser'
	import Scroll from 'components/base/scroll/scroll'
	
	export default{
		data(){
			return{
				songReady:false,
				lyric:'',
				currentTime:'',
				duration:'',
				persent:0,
				audioObj:null,
				lyricParser:null,
				currentLyric:[],
				currentLyricLine:0,
				isShowLyric:false,
				lyricPlaying:''
			}
		},
		mounted(){
			this.audioObj =  this.$refs.audio
		},
		computed: {
			...mapGetters([
				'fullScreen',
				'playlist',
				'currentSong',
				'playing',
				'currentIndex',
				'mode'
			]),
			playCls(){
				return this.playing ? 'icon-pause' : 'icon-play'
			},
			cdCls(){
				return this.playing ? 'cd play' : 'cd play pause'
			},
			miniPlayCls(){
				return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
			},
			disableCls(){
				return this.songReady ? '' : 'disable'
			},
			modeCls(){
				return this.mode === playMode.squence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
			}
		},
		methods: {
			_getSongLyric() {//获取歌曲歌词
				this.currentSong.getLyric().then((lyric)=>{
					this.currentLyric  = new Lyric(lyric,this.handleLyric)
					if(this.playing){
						this.currentLyric.play()
					}
				})
			},
			handleLyric({lineNum,txt}){
				this.currentLyricLine = lineNum
				this.lyricPlaying = txt //当前歌词
				//歌词列表上划
				if(lineNum > 5){
					let elemtEl = this.$refs.lyricLine[lineNum - 5]
					this.$refs.lyricList.scrollToElement(elemtEl,1000)
				}else{
					this.$refs.lyricList.scrollTo(0,0,1000)
				}
			},
			convertToMini(){//转成mini播放器
				this.setFullScreen(false)
			},
			convertToNormal(){//转成正常播放器
				this.setFullScreen(true)
			},
			play(){
				this.setPlayingState(!this.playing)//控制播放状态
				if(this.playing){
					this.audioObj.play()
				}else{
					this.audioObj.pause()
				}
				this.songReady = true
			},
			changeMode(){//变换播放模式
				let mode = this.mode || 0
				if(mode < 2){
					mode += 1
				}else{
					mode = 0
				}
				this.setPlayMode(mode)
			},
			_setPlayIndex(type){//不同模式下设置播放列表的索引
				if(!this.songReady){
					return
				}
				let currentIndex  = this.currentIndex
				let index = 0
				if(this.mode == 0){
					if('prev' == type){//前进一曲
						if(currentIndex === 0){
							index = this.playlist.length - 1
						}else{
							index = currentIndex - 1
						}
					}else{
						if(currentIndex  === this.playlist.length -1){
							index = 0
						}else{
							index = currentIndex + 1
						}
					}
				}else if(this.mode == 1){
					index = currentIndex
				}else{
					let len = this.playlist.length
					index  = Math.floor(Math.random() * Math.floor(len))
				}
				this.setCurrentIndex(index)
				if(!this.playing){
					this.play()
				}
				this.songReady = false
			},
			setPlayerPersent(persent){
				const currentTime  = this.duration * persent
				if('fastSeek' in this.audioObj){//设置播放进度
					this.audioObj.fastSeek(currentTime)
				}else{
					this.audioObj.currentTime = currentTime
				}
				//设置歌词对应
				if(this.currentLyric){
					this.currentLyric.seek(currentTime * 1000)
				}
				this.setPlayingState(false)
				this.play()
			},
			ready(){
				this.songReady = true
				this.duration = this.audioObj.duration
			},
			error(){
				this.songReady = true
			},
			timeUpdate(e){
				this.currentTime = e.target.currentTime
				this.persent = Number(this.currentTime / this.duration || 0)
				if(1 == this.persent){//当前曲目播放完了
					this.setPlayingState(false)
					this._setPlayIndex('next')//接着播放
					if(this.currentLyric){
						this.currentLyric.seek(0)//歌词位置重置
					}
				}
			},
			format(time){
				time = time | 0
				const minute = time / 60 | 0
				const second = time % 60 
				return `${minute}:${second}`
			},
			showLyric(){
				this.isShowLyric = !this.isShowLyric
			},
			prev(){
				this._setPlayIndex('prev')
			},
			next(){
				this._setPlayIndex('next')
			},
			...mapMutations({
				setFullScreen:'SET_FULL_SCREEN',
				setPlayingState:'SET_PLAYING_STATE',
				setCurrentIndex:'SET_CURRENT_INDEX',
				setPlayMode:'SET_PLAY_MODE'
			})
		},
		watch:{
			currentSong(newSong,oldSong){
				if(newSong.id === oldSong.id){
					return
				}
				if(this.currentLyric){
					this.currentTime = 0
					this.lyricPlaying = ''
					this.currentLyricLine = 0
				}
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.audioObj.play()
					this._getSongLyric()
				},1000)
			}
		},
		components:{
			ProgressBar,
			Scroll
		}
	}
	
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-player-background 
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-theme
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
          .lyric-label
            font-size: 25px
          .lyric-false
            color: $color-text
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-theme
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-text
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>