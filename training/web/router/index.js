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
            },
            {
                path: '/Admin',
                name: 'admin',
                meta: {
                    title: '管理员管理'
                },
                component: () => import('../components/admin/AdminManage.vue')
            },
            {
                path: '/User',
                name: 'user',
                meta: {
                    title: '用户管理'
                },
                component: () => import('../components/user/UserManage.vue')
            },
            {
                path: '/Priority',
                name: 'priority',
                meta: {
                    title: '运输公司管理'
                },
                component: () => import('../components/priority/PriorityManage.vue')
            },
            {
                path: '/Trainingtype',
                name: 'trainingtype',
                meta: {
                    title: '运输方式管理'
                },
                component: () => import('../components/trainingtype/TrainingtypeManage.vue')
            }, {
                path: '/Trainingorder',
                name: 'trainingorder',
                meta: {
                    title: '运输方式管理'
                },
                component: () => import('../components/trainingorder/TrainingorderManage.vue')
            },
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