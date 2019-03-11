
import axios from 'axios'
import {commonParams} from './config.js'

//获取歌手列表
export function getSingerList() {
  const url = '/api/getSingers'
	const pdata = {
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
	return	axios.get(url,{
			 params:pdata
		}).then((res)=>{
			return Promise.resolve(res.data)
		}).catch((err)=>{
				console.log(err);
		})
}

// export function getSingerDetail(singerId) {
//   const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
// 
//   const data = Object.assign({}, commonParams, {
//     hostUin: 0,
//     needNewCode: 0,
//     platform: 'yqq',
//     order: 'listen',
//     begin: 0,
//     num: 80,
//     songstatus: 1,
//     singermid: singerId
//   })
// 
//   return jsonp(url, data, options)
// }
// 
