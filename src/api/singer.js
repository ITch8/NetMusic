
import axios from 'axios'
import jsonp from 'common/js/jsonp.js'
import {commonParams,options} from './config.js'

//获取歌手列表
export function getSingerList() {
	const pdata = {
    '-':'getUCGI8040122966070598',
		g_tk: 5381,
		loginUin: 0,
		hostUin: 0,
		format: 'json',
		inCharset: 'utf8',
		outCharset: 'utf-8',
		notice: 0,
		platform: 'yqq.json',
		needNewCode: 0,
		data:JSON.stringify({"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}})
	}


  if (process.env.NODE_ENV === 'production') {
    return jsonp('https://u.y.qq.com/cgi-bin/musicu.fcg?', pdata, {});
  }else{
    return	axios.get('/api/getSingers',{
    		 params:pdata
    	}).then((res)=>{
    		return Promise.resolve(res.data)
    	}).catch((err)=>{
    			console.log(err);
    	})
  }


}

//歌手详情
export function getSingerDetail(singermid) {

    const pd = {
      g_tk: 5381,
      loginUin: 0,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0,
    }

		const pdata = {
			ct: 24,
			singermid:singermid,
			order: 'listen',
			begin: 0,
			num: 30,
			songstatus: 1
		}

    const _pdata = {
      '-': 'getUCGI16316501972998343',
      data:JSON.stringify({"comm":{"ct":24,"cv":0},"singer":{"method":"get_singer_detail_info","param":{"sort":5,"singermid":singermid,"sin":0,"num":20},"module":"music.web_singer_info_svr"}})
    }

    if (process.env.NODE_ENV === 'production') {
      return jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?', Object.assign(pd,pdata), options);
    }else{
      return	axios.get('/api/getSingerDetail',{
      		 params:Object.assign(pd,pdata)
      	}).then((res)=>{
      		return Promise.resolve(res.data)
      	}).catch((err)=>{
      			console.log(err);
      	})
    }

}
