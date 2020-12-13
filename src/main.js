import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from '@/config/axios'

import appUseElement from './plugin/element'

const app = createApp(App)
// 将axios方法挂载到全局
app.config.globalProperties.$http = axios
// 注册element plus 组件
appUseElement(app)

app.use(router).mount('#app')
