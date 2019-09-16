import jsonp from 'common/js/jsonp.js'
import {commonParams,options} from './config'

export function getRecommend(){//获取推荐歌曲数据
	
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?' //推荐歌曲请求接口
	
	const data = Object.assign({},commonParams,{
		platform:'h5',
		uin:0,
		needNewCode:1
	})
	
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
