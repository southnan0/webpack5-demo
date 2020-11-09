import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant, { Toast } from 'vant'
import 'vant/lib/index.less'
Toast.setDefaultOptions({ duration: 3000 });
const app = createApp(App)
app.use(router)
app.use(store)
app.use(vant)
app.mount('#app')
