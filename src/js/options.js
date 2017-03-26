import './../img/icon16.png';
import './../img/icon48.png';
import './../img/icon128.png';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from "./../components/App.vue"
import Fullscreen from './../components/Fullscreen.vue'
import Settings from './../components/Settings.vue'
import Multiview from './../components/Multiview.vue'

chrome.storage.sync.get(["connections"], (result) => {
  if (result && result.connections) {
    localStorage.setItem('connections', JSON.stringify(result.connections));
  } else {
    const connectionsString = localStorage.getItem('connections');
    if (!connectionsString) {
      localStorage.setItem('connections', JSON.stringify([]));
    }
  }
});

Vue.use(VueRouter);

const routes = [
  { path: '/multiview', name: 'multiview', component: Multiview, meta: { uri: 'multiview' } },
  { path: '/', name: 'settings', component: Settings, meta: { uri: 'settings' } },
  { path: '*', name: 'fullscreen', component: Fullscreen, meta: { uri: 'fullscreen' } }
];

const router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});