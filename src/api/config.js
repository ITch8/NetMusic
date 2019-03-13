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
	param:'.m4a?guid=733535980&vkey=911E52989E019B6B1B96AD5DDF6582EB4F4B37B4E6E4D33EBAA90CA8171106A21B0AE10C78F9608F7AEBABC0F8F78F1F94D35FA0770F39DA&uin=0&fromtag=38'
}