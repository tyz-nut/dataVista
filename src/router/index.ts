/** @module router */

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: '数据视界 · 电商运营大屏' },
    },
  ],
});

// 路由守卫：设置页面标题
router.beforeEach((to) => {
  if (to.meta?.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
