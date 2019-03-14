import axios from 'axios'
import {commonParams} from './config.js'

export function getSongLyric(musicid) {//获取歌词
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

export function getRadioDetail(disstid) {//获取radio详情
	const url = '/api/getRadioDetail'
	const pdata = {
		type:1,
		json:1,
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
	return axios.get(url,{
		params:pdata
	}).then((res)=>{
		return Promise.resolve(res.data)
	}).catch((err)=>{
		
	})

}
