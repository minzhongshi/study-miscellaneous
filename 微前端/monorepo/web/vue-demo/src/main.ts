import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {a} from 'common'

createApp(App).mount('#app')


declare global {
    interface window {
        $wujie:{
            props:Record<string,any>
        }
    }
}