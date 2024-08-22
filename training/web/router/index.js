//路由跳转
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../components/Login/Login.vue')

    },
    {
        path: '/register',
        name: 'RegisterPage',
        component: () => import('../components/Login/RegisterPage.vue')
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
                component: () => import('../components/Home/Home.vue')
            },
            {
                path: '/edit-profile',
                name: 'EditProfile',
                component: () => import('../components/Home/EditProfile.vue')
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
            {
                path: '/Record',
                name: 'record',
                meta: {
                    title: '记录管理'
                },
                component: () => import('../components/record/RecordManage.vue')
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