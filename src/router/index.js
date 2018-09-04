import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import post from '@/components/post/post'
import user from '@/components/user/user'
import deliver from '@/components/deliver/deliver'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/post/:postId',
      name: 'post',
      component: post
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: user
    },
    {
      path: '/deliver',
      name: 'deliver',
      component: deliver
    }
  ]
})
