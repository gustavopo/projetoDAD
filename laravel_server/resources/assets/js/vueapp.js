/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap');
window.Vue = require('vue');

import VueRouter from 'vue-router';
import VueSocketio from 'vue-socket.io';
import VueResource from 'vue-resource';
import Auth from './packages/auth/Auth.js';
import axios from 'axios';
window.axios = require('axios');


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Auth);
//Vue.use(VueSocketio, 'http://192.168.10.10:8080');
Vue.use(VueSocketio, 'http://192.168.10.1:8080');



/************************  ROUTES    **********************/
const index = Vue.component('index', require('./components/Index.vue'));
const user = Vue.component('user', require('./components/User/user.vue'));
const userPage = Vue.component('userPage', require('./components/User/userPage.vue'));

/** AUTH ROUTES **/
const login = Vue.component('login', require('./components/Login.vue'));
const register = Vue.component('register', require('./components/Register.vue'));
/** GAME ROUTES **/
const singleplayerGame = Vue.component('singlegame', require('./components/singleplayer_game.vue'));
const multiplayerGame = Vue.component('multiplayergame', require('./components/multiplayer_game.vue'));


const routes = [
    {path: '/', redirect: '/index', component: index},
    {path: '/users', component: user},
    {path: '/userPage', component: userPage},
    {path: '/multimemorygame', component: multiplayerGame},
    {path: '/singlememorygame', component: singleplayerGame, meta: {forAuth: true}},
    {path: '/multimemorygame', component: multiplayerGame, meta: {forAuth: true}},
    {path: '/login', component: login, meta: {forVisitors: true}},
    {path: '/register', component: register, meta: {forVisitors: true} }
];

const router = new VueRouter({

    routes: routes
});


/*router.beforeEach(
    (to, from, next) => {
        //Quando uma navegaçao é ativada
        //#NavigationGuard
        //to => where we want to go
        //from => current route
        if (to.matched.some(record => record.meta.forVisitors)) {
            if (Vue.auth.isAuthenticated()) {
                next({
                    path: '/singlememorygame'
                })
            } else next()

        } else if (to.matched.some(record => record.meta.forAuth)) {
            if (!Vue.auth.isAuthenticated()) {
                next({
                    path: '/login'
                })
            } else next()
        } else next()
        //$route.matched
    }
)*/


const app = new Vue({
    router,


}).$mount('#app');


Vue.component('example-component', require('./components/ExampleComponent.vue'));

