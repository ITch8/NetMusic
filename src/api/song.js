import axios from 'axios'
import jsonp from 'common/js/jsonp.js'

export function getSongLyric(musicid) {//获取歌词
	const pdata = {
		nobase64:1,
		musicid: musicid,
		g_tk: 5381,
		loginUin: 0,
		hostUin: 0,
		format: 'json',
		inCharset: 'utf8',
		outCharset: 'utf-8',
		notice: 0,
		platform: 'yqq.json',
		needNewCode: 0
	}

  if(process.env.NODE_ENV === 'production'){
    return jsonp('https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_yqq.fcg?', pdata, {});
  }else{
    return axios.get('/api/getSongLyric',{
    	params:pdata
    }).then((res)=>{
    	return Promise.resolve(res.data)
    }).catch((err)=>{
       
    })
  }

}

export function getRadioDetail(disstid) {//获取radio详情
	const url = '/api/getRadioDetail'
	const pdata = {
		type:1,
		type: 1,
		json: 1,
		utf8: 1,
		onlysong: 0,
		disstid: disstid,
		g_tk: 5381,
		loginUin: 0,
		hostUin: 0,
		format: 'json',
		inCharset: 'utf8',
		outCharset: 'utf-8',
		notice: 0,
		platform: 'yqq.json',
		needNewCode: 0
	}


  if(process.env.NODE_ENV === 'production'){
    return jsonp('https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?', pdata, {});
  }else{
    return axios.get('/api/getRadioDetail',{
    	params:pdata
    }).then((res)=>{
    	return Promise.resolve(res.data)
    }).catch((err)=>{

    })
  }

}
