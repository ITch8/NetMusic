/*排行榜*/

import axios from 'axios'

export function getTopDetail(topId) {
	const url = '/api/getTopDetail'
		const pdata = {
			'-':'getUCGI6876926254623921',
			g_tk: 5381,
			loginUin: 0,
			hostUin: 0,
			format: 'json',
			inCharset: 'utf8',
			outCharset: 'utf-8',
			notice: 0,
			platform: 'yqq.json',
			needNewCode: 0,
			data:{"detail":{"module":"musicToplist.ToplistInfoServer","method":"GetDetail","param":{"topId":topId,"offset":0,"num":10,"period":"2019_12"}},"comm":{"ct":24,"cv":0}}
		}
		return	axios.get(url,{
			 params:pdata
		}).then((res)=>{
			return Promise.resolve(res.data)
		}).catch((err)=>{
				console.log(err);
		})
		
}