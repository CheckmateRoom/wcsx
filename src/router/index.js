import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                // {
                //     path: '/dashboard',
                //     component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                //     meta: { title: '系统首页' }
                // },
                {
                    // 设置分类
                    path: '/finance',
                    component: resolve => require(['../components/page/analysis/newGood.vue'], resolve),
                    meta: { title: '设置轮播图'}
                },
                {
                    // 我的二级分销
                    path: '/edit',
                    component: resolve => require(['../components/page/distributor/distributor.vue'], resolve),
                    meta: { title: '我的首页图片' }
                },
                {
                    // 个人设置
                    path: '/editFinance',
                    component: resolve => require(['../components/page/personalSetting/pesonal.vue'], resolve),
                    meta: { title: '个人设置' }
                },
                {
                    // 新增分类
                    path: '/newkind',
                    component: resolve => require(['../components/page/analysis/newKinds.vue'], resolve),
                    meta: { title: '新增分类' }
                },
                {
                    // 新增商品
                    path: '/newgood',
                    component: resolve => require(['../components/page/analysis/newGood.vue'], resolve),
                    meta: { title: '新增商品' }
                },
                {
                    // 修改商品信息
                    path: '/changegood',
                    component: resolve => require(['../components/page/analysis/changeGood.vue'], resolve),
                    meta: { title: '修改商品信息' }
                },
                // {
                //     // 权限页面
                //     path: '/permission',
                //     component: resolve => require(['../components/page/Permission.vue'], resolve),
                //     meta: { title: '权限测试', permission: true }
                // },
                // {
                //     path: '/404',
                //     component: resolve => require(['../components/page/404.vue'], resolve),
                //     meta: { title: '404' }
                // },
                // {
                //     path: '/403',
                //     component: resolve => require(['../components/page/403.vue'], resolve),
                //     meta: { title: '403' }
                // }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
