import jsonp from 'common/js/jsonp.js'
import {commonParams,options} from './config'

export function getRecommend(){//获取推荐歌曲数据

	const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?' //推荐歌曲请求接口

	const data = {
    '-': "recom2602123966875127",
    g_tk: 5381,
    loginUin: 2862390393,
    hostUin: 0,
    format: 'json',
    inCharset: "utf8",
    outCharset: "utf-8",
    notice: 0,
    platform: "yqq.json",
    needNewCode: 0,
    data: {"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"newsong.NewSongServer","method":"get_new_song_info","param":{"type":5}},"new_album":{"module":"newalbum.NewAlbumServer","method":"get_new_album_info","param":{"area":1,"sin":0,"num":10}},"new_album_tag":{"module":"newalbum.NewAlbumServer","method":"get_new_album_area","param":{}},"toplist":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}}
  }

	return jsonp(url,data,options);
}

export function getTopList(){//获取排行榜数据

	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?' //推荐歌曲请求接口

	const data = Object.assign({},commonParams,{
		platform:'h5',
		uin:0,
		needNewCode:1
	})

	return jsonp(url,data,options);
}


export function getHotkey(){//获取热门搜索

	const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?' //推荐歌曲请求接口

	const data = Object.assign({},commonParams,{
		platform:'h5',
		uin:0,
		needNewCode:1
	})

	return jsonp(url,data,options);
}
