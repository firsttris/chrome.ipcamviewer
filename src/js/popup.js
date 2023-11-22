import { createApp } from 'vue';
import Multiview from './../components/Multiview.vue';
import Fullscreen from './../components/Fullscreen.vue';
import './styles.js'


if (window.location.search === '?fullscreen') {
    createApp(Fullscreen).mount('#popup');
} else {
    createApp(Multiview).mount('#popup');
}
