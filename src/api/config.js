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
	param:'.m4a?guid=733535980&vkey=E41969A4B2EB9740E46DE33523CA80DAD7FFDE13146A83AA9B67FD9DCCCEEA0E4DD62D0D0CF467B50574361BB4A12393656778AEDB82D6C6&uin=7289&fromtag=66'
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
