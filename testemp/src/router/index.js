import Vue from 'vue'
import Router from 'vue-router'
//底部导航页
import Index from '@/components/index'

//首页
import HomePage from '../components/index/index'
import HomeFirst from '../components/index/homepage/homeFirst'
import HomeSecond from '../components/index/homepage/homeSecond'
import HomeThird from '../components/index/homepage/homeThird'
import HomeFourth from '../components/index/homepage/homeFourth'




import SecondPage from '../components/second/index'
import ThreePage from '../components/three/index'
import FourPage from '../components/four/index'




Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children:[
        {
          path:"/",
          redirect:"/index"
        },
        {
          path:"/index",
          name:"我是第一页",
          component:HomePage,
          children:[
            {
              path:"/index",
              redirect:"/index/homeFirst"
            },
            {
              path:"/index/homeFirst",
              name:"homeFirst",
              component:HomeFirst
            },{
              path:"/index/homeSecond",
              name:"homeSecond",
              component:HomeSecond
            },{
              path:"/index/homeThird",
              name:"homeThird",
              component:HomeThird
            },{
              path:"/index/homeFourth",
              name:"homeFourth",
              component:HomeFourth
            }
          ]
        },{
          path:"/second",
          name:"我是第二页",
          component:SecondPage
        },{
          path:"/three",
          name:"我是第三页",
          component:ThreePage
        },{
          path:"/four",
          name:"我是第四页",
          component:FourPage
        }
      ]
    }
  ]
})
