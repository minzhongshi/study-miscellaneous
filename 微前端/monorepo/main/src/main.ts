import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

var a = 1231412451
const app = createApp(App)

import Wujie from 'wujie-vue3'
import { preloadApp } from 'wujie'
app.use(router).use(Wujie)

app.mount('#app')

preloadApp({url:"http://localhost:5174/", name:"vue3",exec: true})
preloadApp({url:"http://localhost:5175/", name:"react",exec: true})