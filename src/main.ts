import App from '@/App.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import '@/sass/global.scss'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia).use(createPinia)

app.mount('#app')
