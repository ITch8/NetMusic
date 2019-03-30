# Net Music

# 模仿QQ音乐wap端 
## 实践中来学习Vue技术栈开发

## 效果图

[效果图](https://docs.qq.com/doc/DWnJoS0tRRndNVklY) 

## 开发
### 模块化开发

### 技术栈

Vue + VueRouter + vuex + webpack + stylus + VueLazyload

### views
- 首页推荐
- 歌手列表
- 歌曲排行榜
- 搜索页面
- 歌手详情页
- 电台详情页
- 排行榜详情页
- 音乐播放器

### 功能
- 查看推荐歌单
- 歌手排行
- 播放歌曲列表（随机播放、单曲循环、顺序播放）
- 歌曲排行榜

### 公用组件
- Scroll
- Slider(轮播图)
- SongList(歌曲列表)
- ProgressBar(进度条)
- player

## 总结
### 知识点
	1.抽象代码，自定义公用组件及做好组件复用  
	2.vuex来管理播放器播放状态及播放内容  
```
const state = {
	singer:{},
	playing:false,
	fullScreen:false,
	playlist:[],
	sequenceList:[],
	mode:playMode.squence,
	currentIndex:-1
}
```  
	3.webpack proxyTable的反向代理来实现跨域请求，抓取QQ音乐官网数据  
```
//例如 获取歌手列表

//代理配置
'/api/getSingers':{
		target:'https://u.y.qq.com/cgi-bin/musicu.fcg',
		changeOrigin: true,
		bypass:function(req,res,proxyOptions){
			req.headers.referer='https://u.y.qq.com'
			req.headers.host='u.y.qq.com'
		},
		pathRewrite:{
			'^/api/getSingers':''
		}
	}
//请求
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

```  
	4.使用混入 (mixins) 解决底部播放器出现时页面底部元素被遮盖问题  	
```
import {mapGetters} from 'vuex'
export const playListMixin = {
computed:{
	...mapGetters([
		'playlist'
	])
},
mounted(){
	this.handlePlayList(this.playlist)
},
activated(){
	this.handlePlayList(this.playlist)
},
watch:{
	playlist(newVal){
		this.handlePlayList(newVal)
	}
},
methods:{
	handlePlayList(){
		throw new Error('components must implement handlePlayList function')
	}
}
```  
	5.页面样式仿QQ音乐wap端，copy Style，更多注意力放在了功能开发上了  
	6.歌词解析及播放是使用 lyric-parser  （去install lyric-parser即可，感谢其作者）


### 问题记录
	1、注意BetterScroll初始化时机。dom渲染完成之后，bscroll对父子容器高度进行计算  
	2、activated 在keep-alive 组件激活时调用，来解决路由跳转新的组件，重新加载数据（而不是挂载在mounted上面)  
	3、QQ音乐的数据接口会一直在变动，若是接口访问错误要重新去QQ音乐官网抓取

## 使用
* 安装  
```
	npm install  
```
* 开发运行  
```
	npm run dev  
```
* 打包  
```
	npm run build
```

## TODO

   1.完善搜索页面功能    
   2.添加播放列表管理页面  
   3.优化

