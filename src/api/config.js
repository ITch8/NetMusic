//公用请求参数
export const commonParams = {
	g_tk:5381,
	inCharset:'utf-8',
	outCharset:'utf-8',
	notice:0,
	format:'jsonp'
}

//公用请求配置
export const options = {
	param:'jsonpCallback'
}

//返回结果正确标识
export const RES_OK = 0

//音乐播放url主   C400003OUlho2HcRHC对应每个歌曲的file.media_mid
export const mediaBaseUrl = {
	baseUrl:'http://dl.stream.qqmusic.qq.com/C400',
	param:'.m4a?guid=2835179416&vkey=A9FF354DEA682624194372E9AC3876EFB50589A23ABEFF82DF60D045F1BD81DC9384FE8B32A19C784BB5C33D2F33E549527E1594E8ED6D00&uin=0&fromtag=38'
}
//根据songId播放url
export const songBaseUrl = {
	baseUrl:'http://stream0.qqmusic.qq.com/',
	param:'.wma'
}
//歌手头像url
export const singerImageBaseUrl={
	baseUrl:'http://y.gtimg.cn/music/photo_new/T001R300x300M000',
	param:'.jpg?max_age=2592000'
	//'y.gtimg.cn/music/photo_new/'T001R300x300M0000025NhlN2yWrP4.jpg?max_age=2592000
}
