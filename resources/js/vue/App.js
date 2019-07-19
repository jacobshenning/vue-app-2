
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from './Resources/Public/Home'
import Structure from './Resources/Public/Structure'
import RegisterRequest from './Requests/Auth/RegisterRequest'
import LoginRequest from './Requests/Auth/LoginRequest'
import Dashboard from './Resources/User/Dashboard'
import Profile from './Resources/User/Profile'
import ProjectList from './Resources/Projects/ProjectList'
import NewProject from './Resources/Projects/NewProject'
import SingleProject from './Resources/Projects/SingleProject'
import MessageBox from './Resources/Message/MessageBox'

const FooBar = { template: '<div>foo-bar</div>' }

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { path: '/', component: Home },
    { path: '/structure', component: Structure },
    { path: '/login', component: LoginRequest },
    { path: '/register', component: RegisterRequest },
    { path: '/dashboard', component: Dashboard },
    { path: '/dashboard/chat', component: MessageBox },
    { path: '/dashboard/profile', component: Profile },
    { path: '/dashboard/projects', component: ProjectList },
    { path: '/dashboard/projects/create', component: NewProject },
    { path: '/dashboard/projects/:id', component: SingleProject },
  ],
})

const app = new Vue({
  router,
  el: '#app',
  render: h => h({template: '<router-view></router-view>'}),
})
