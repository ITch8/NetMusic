import {mediaBaseUrl,singerImageBaseUrl} from 'api/config.js'
import {getSongLyric} from 'api/song'

export default class Song{
	
	constructor(id,name,album_title,singer_name,singer_mid,media_mid) {
		this.id = id
		this.name = name
		this.album_title = album_title
		this.singer_name = singer_name
		this.singer_pic =`${singerImageBaseUrl.baseUrl}${singer_mid}${singerImageBaseUrl.param}`//歌手头像url
		this.url = `${mediaBaseUrl.baseUrl}${media_mid}${mediaBaseUrl.param}` //歌曲url
		this.image = require('common/image/person_default.png')
	}
	
	getLyric(){//歌曲歌词
		if(this.lyric){
			return Promise.resolve(this.lyric)
		}
		return new Promise((resolve,reject)=>{
			getSongLyric(this.id).then((res)=>{
				if(res.retcode == 0){
					this.lyric = this.formatterLyric(res.lyric)
					resolve(this.lyric)
				}else{
					reject('no lyric')
				}
			})
		})
	}
	
	formatterLyric(lyric){
		let reg_1 = new RegExp('&#58;','gm')
		let reg_2 = new RegExp('&#32;','gm')
		let reg_3 = new RegExp('&#40;','gm')
		let reg_4 = new RegExp('&#41;','gm')
		let reg_5 = new RegExp('&#10;','gm')
		let reg_6 = new RegExp('&#46;','gm')
		let reg_7 = new RegExp('&#45;','gm')
		
		return lyric.replace(reg_1,':').replace(reg_2,' ').replace(reg_3,'(').replace(reg_4,')').replace(reg_5,'\n').replace(reg_6,'.').replace(reg_7,'-')
	}
}