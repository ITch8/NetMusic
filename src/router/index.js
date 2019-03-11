import Vue from 'vue'
import Router from 'vue-router'

import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import Sing from 'components/sing/sing'

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
			path:'/sing',
			component:Sing
		}
  ]
})
