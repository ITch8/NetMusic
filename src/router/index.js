import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view){//路由懒加载
	return () => import(/* webpackChunkName: "view-[request]" */ `components/${view}.vue`)
}

export default new Router({
	routes: [{
			path: '/',
			redirect: '/recommend'
		},
		{
			path: '/recommend',
			component: loadView('recommend/recommend')
		},
		{
			path: '/search',
			component: loadView('search/search')
		},
		{
			path: '/rank',
			component: loadView('rank/rank'),
		},
		{
			path: '/rank_detail',
			component: loadView('rank/rankDetail'),
		},
		{
			path: '/singer',
			component: loadView('singer/singer'),
		},
		{
			path: '/singer_detail',
			component: loadView('singer/singerDetail'),
		},
		{
			path: '/song',
			component: loadView('song/song'),
		},
		{
			path: '/player',
			name: 'player',
			component: loadView('player/player'),
		},
		{
			path: '/radio',
			name: 'radio',
			component: loadView('recommend/radio'),
		}
	]
})
