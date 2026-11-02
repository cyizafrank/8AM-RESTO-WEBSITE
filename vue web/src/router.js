import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Menu from './views/Menu.vue'
import Gallery from './views/Gallery.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import Careers from './views/Careers.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/careers',
    name: 'Careers',
    component: Careers
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
