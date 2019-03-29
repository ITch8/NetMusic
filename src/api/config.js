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
	param:'.m4a?guid=733535980&vkey=AA09E2EE8249BF01BB89E2CCA1AFEE5CD2A92D0A53392D115BDAFB0A5549A770CA88E6FFA43CF4D1DE535EB5539E0D0587B73B774612B946&uin=0&fromtag=38'
}

export const singerImageBaseUrl={
	baseUrl:'http://y.gtimg.cn/music/photo_new/T001R300x300M000',
	param:'.jpg?max_age=2592000'
	//'y.gtimg.cn/music/photo_new/'T001R300x300M0000025NhlN2yWrP4.jpg?max_age=2592000
}
