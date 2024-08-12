//路由跳转
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    //登陆路由
    {
        path: '/',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    //首页路由
    {
        path: '/Indextest',
        name: 'Indextest',
        component: () => import('../components/Indextest.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export function resetRouter() {
    router.matcher = createRouter({
        module: 'history',
        routes: []
    }).matcher
}
// const router = new VueRouter({
//     module: 'history',
//     routes
// })

export default router;