import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'

import VueApexCharts from 'vue3-apexcharts'

import './styles/style.css'

const app = createApp(App)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
})

app.use(router)
app.use(VueQueryPlugin)
app.use(VueApexCharts);
app.mount('#app')
