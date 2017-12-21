
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');


import VueRouter from 'vue-router';
import VueSocketio from 'vue-socket.io';

Vue.use(VueRouter);

//Vue.use(VueSocketio, 'http://192.168.10.10:8080');
Vue.use(VueSocketio, 'http://192.168.10.1:8080');

const user = Vue.component('user', require('./components/user.vue'));
const singleplayerGame = Vue.component('singlegame', require('./components/singleplayer_game.vue'));
const multiplayerGame = Vue.component('multiplayergame', require('./components/multiplayer_game.vue'));


const routes = [
    { path: '/', redirect: '/users' },
    { path: '/users', component: user },
    { path: '/singlememorygame', component: singleplayerGame },
    { path: '/multimemorygame', component: multiplayerGame }
];

const router = new VueRouter({
    routes:routes
});


const app = new Vue({
    router,
    data:{
       // player1:undefined,
       // player2: undefined,
    }
}).$mount('#app');


Vue.component('example-component', require('./components/ExampleComponent.vue'));
