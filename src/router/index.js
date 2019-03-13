import Vue from 'vue'
import Router from 'vue-router'

import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import SingerDetail from 'components/singer/singerDetail'
import Song from 'components/song/song'
import Player from 'components/player/player'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
			redirect:'/recommend'
    },
		{
			path:'/recommend',
			component:Recommend
		},
		{
			path:'/search',
			component:Search
		},
		{
			path:'/rank',
			component:Rank
		},
		{
			path:'/singer',
			component:Singer
		},
		{
			path:'/singer_detail',
			component:SingerDetail
		},
		{
			path:'/song',
			component:Song
		},
		{
			path:'/player',
			name:'player',
			component:Player
		}
  ]
})
