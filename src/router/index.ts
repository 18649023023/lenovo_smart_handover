import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw
} from "vue-router";
import Login from "../views/Login.vue";

import Home from "../views/Home.vue";

import new_Home from "../views/new_option/NewHome.vue";

/***移动端***/
import mobileHome from "../views/mobile/mobileHome.vue";
import mobile_NoPermissions from "../views/mobile/mobile_NoPermissions.vue";
import noticeVue from "@/components/notice.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { title: "智慧交班" }
  },
  {
    path: "/notice",
    name: "notice",
    component: noticeVue,
    meta: { title: "智慧交班声音" }
  },
  {
    path: "/mobileHome",
    name: "mobileHome",
    component: mobileHome,
    meta: { title: "智慧交班" }
  },

  {
    path: "/mobile_NoPermissions",
    name: "mobile_NoPermissions",
    component: mobile_NoPermissions,
    meta: { title: "无权限" }
  },

  {
    path: "/Home",
    name: "Home",
    component: Home,
    meta: { title: "智慧交班" }
  }
];

const router = createRouter({
  history: createWebHashHistory(), //createWebHistory(),
  routes
});

router.beforeEach((to: any, from: any, next: any) => {
  /* 路由发生变化修改页面title */

  document.title = to.meta.title;
  next();
});

export default router;
