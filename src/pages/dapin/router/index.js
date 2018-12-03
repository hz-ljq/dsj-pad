import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import page1 from '@/components/dapinPages/page1'
import page2 from '@/components/dapinPages/page2'
import page3 from '@/components/dapinPages/page3'
import page4 from '@/components/dapinPages/page4'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/page1'
    },
    {
      path: '/page1',
      name: 'page1',
      component: page1
    }, {
      path: '/page2',
      name: 'page2',
      component: page2
    }, {
      path: '/page3',
      name: 'page3',
      component: page3
    }, {
      path: '/page4',
      name: 'page4',
      component: page4
    }
  ]
})
