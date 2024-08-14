//路由跳转
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/Indextest',
        name: 'Indextest',
        component: () => import('../components/Indextest.vue'),
        children: [
            {
                path: '/Home',
                name: 'Home',
                meta: {
                    title: '首页'
                },
                component: () => import('../components/Home.vue')
            }

        ]
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