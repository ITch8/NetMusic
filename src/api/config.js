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
	baseUrl:'http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400',//http://dl.stream.qqmusic.qq.com/C400'
	param:'.m4a?guid=8695206164&vkey=9A54ADE397F62F376C2F796CB663F63D591E6417D78F9C781D76E9447D2DE657131AA3CCFD02BB04643938E47B2F0B33F3388FF7DF803CD6&uin=0&fromtag=38'
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
