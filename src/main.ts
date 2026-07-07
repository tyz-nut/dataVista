/** @module main */

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// 样式（顺序很重要）
import './assets/styles/reset.css';
import './assets/styles/variables.css';
import './assets/styles/global.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
