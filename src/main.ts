import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Directives:
import vFocus from './directives/vFocus'
import { vClickOutside } from './directives/vClickOutside'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('focus', vFocus)
app.directive('click-outside', vClickOutside)
app.mount('#app')
