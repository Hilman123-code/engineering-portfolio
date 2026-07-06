import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import tilt from './directives/tilt'

const app = createApp(App)

app.directive('tilt', tilt)

app.use(router)

app.mount('#app')