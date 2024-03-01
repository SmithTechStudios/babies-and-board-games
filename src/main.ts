import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'

import './styles/style.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})
app.use(router)
app.use(VueQueryPlugin)
app.mount('#app')
