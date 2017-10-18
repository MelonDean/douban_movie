import Vue from 'vue'
import Router from 'vue-router'
import Movie from '../components/movie.vue'
import Detail from '../components/moviedetail.vue'
import Actor from '../components/actordetail.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/movie'
    },
    {
      path:'/movie',
      component:Movie
    },
    {
      path:'/moviedetail',
      component:Detail
    },
    {
      path:'/actor',
      component:Actor
    }
  ]
})
