
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

export function getSingerDetail(singermid,begin,num) {
  const url = '/api/getSingerDetail'

  const pdata = {
	cid:205360581,
	singermid:singermid,
	begin:begin,
	num:num,
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
  return axios.get(url,{
  		 params:pdata
  	}).then((res)=>{
  		return Promise.resolve(res.data)
  	}).catch((err)=>{
  			console.log(err);
  	})
}

