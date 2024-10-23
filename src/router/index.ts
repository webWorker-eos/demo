import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 动态导入模块
const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
  eager: true,
});
const routes: Array<RouteRecordRaw> = [];
Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default);
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(() => {
  NProgress.start();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
