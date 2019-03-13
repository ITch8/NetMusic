import axios from 'axios'
import {commonParams} from './config.js'

export function getSongLyric(musicid) {
	const url = '/api/getSongLyric'
	const pdata = {
		nobase64:1,
		musicid: musicid,
		'-': 'jsonp1',
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
		
	})

}
