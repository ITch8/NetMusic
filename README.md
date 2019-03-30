# Net Music

# 模仿QQ音乐wap端 仅为学习

##效果图

[效果图](https://github.com/ITch8/NetMusic)  
查看页面图 ![效果图]

## 开发
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
- 播放器

### 公用组件
- Scroll
- Slider(轮播图)
- SongList(歌曲列表)
- ProgressBar(进度条)

## 总结
### 知识点
  1、抽象代码，自定义公用组件及做好组件复用  
  2、vuex来管理播放器播放状态及播放内容
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
  3、webpack proxyTable的反向代理来实现跨域请求
	4、使用混入 (mixins) 解决底部播放器出现时页面底部元素被遮盖问题  	
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


### 问题记录
  1、注意BetterScroll初始化时机。dom渲染完成之后，bscroll对父子容器高度进行计算  
  2、activated 在keep-alive 组件激活时调用，来解决路由跳转新的组件，重新加载数据（而不是挂载在mounted上面)  
	3、QQ音乐的数据接口会一直在变动，若是接口访问错误要重新去QQ音乐官网抓取

## 使用
* 安装
+ npm install

* 开发运行
+ npm run dev
 

## 接下来TODO  

   1.完善搜索页面功能    
   2.补充抓取排行榜音乐列表的音乐mid接口  
   3.完善首页电台的跳转  
   4.优化

