import { createApp } from "vue";
import App from "./App.vue";
import * as VueRouter from 'vue-router';
import axios from 'axios';

// import "~/styles/element/index.scss";

import ElementPlus from "element-plus";
// import all element css, uncommented next line
import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss";
import "uno.css";

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";


const routes = [
    {
        path: '/',
        component: () => import('./views/root.vue'),
    },
    {
        path: '/login',
        component: () => import('./views/login.vue'),
    },
    {
        path: '/dashboard',
        component: () => import('./views/dashboard.vue'),
        children: [
            {
                path: 'puzzles',
                component: () => import('./views/dashboard/puzzles.vue'),
            },
            {
                path: 'books',
                component: () => import('./views/dashboard/books.vue'),
            },
            {
                path: 'bookCategories',
                component: () => import('./views/dashboard/bookCategories.vue'),
            },
            {
                path: 'goods',
                component: () => import('./views/dashboard/goods.vue'),
            },
            {
                path: 'goodsCategories',
                component: () => import('./views/dashboard/goodsCategories.vue'),
            },
            {
                path: 'activities',
                component: () => import('./views/dashboard/activities.vue'),
            },
        ],
    },
    {
        path: '/test',
        component: () => import('./views/test.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('./views/404.vue'),
    },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})


const app = createApp(App);
// app.use(ElementPlus);
app.use(router)
app.mount("#app");


axios.defaults.baseURL = 'http://120.78.157.4:8080'
//axios.defaults.baseURL = 'http://jw6b7g.natappfree.cc'
//axios.defaults.baseURL = 'http://192.168.2.99:8080'
axios.defaults.headers.common['token'] = localStorage.getItem("token")
