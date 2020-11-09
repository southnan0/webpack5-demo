import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/index.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/list",
    component: Home,
    children: [
      {
        path: "list",
        name: "List",
        component: () =>
          import(/* webpackChunkName: "Home" */ "@/views/List/index.vue"),
        meta: {
          title: "手机签约-待签约",
        },
      },
      {
        path: "history",
        name: "History",
        component: () =>
          import(/* webpackChunkName: "Home" */ "@/views/History/index.vue"),
        meta: {
          title: "手机签约-签约历史",
        },
      },
      {
        path: "user",
        name: "User",
        component: () =>
          import(/* webpackChunkName: "Home" */ "@/views/User/index.vue"),
        meta: {
          title: "手机签约-我",
        },
      },
    ],
  },
  {
    path: "/list/:id",
    name: "Detail",
    component: () =>
      import(/* webpackChunkName: "Detail" */ "@/views/Detail/index.vue"),
    meta: {
      title: "手机签约-流程",
    },
  },
  {
    path: "/list/:id/information",
    name: "Information",
    component: () =>
      import(
        /* webpackChunkName: "Information" */ "@/views/Detail/information.vue"
      ),
    meta: {
      title: "手机签约-完善信息",
    },
  },
  {
    path: "/list/:id/contract",
    name: "Contract",
    component: () =>
      import(
        /* webpackChunkName: "Information" */ "@/views/Detail/contractInfo.vue"
      ),
    meta: {
      title: "手机签约-完善合同",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/Login/index.vue"),
    meta: {
      title: "手机签约-登录",
    },
  },
  {
    path: "/form",
    name: "Form",
    component: () =>
      import(/* webpackChunkName: "form" */ "@/views/Detail/form.vue"),
    meta: {
      title: "手机签约-form",
    },
  },
  {
    path: "/count",
    name: "Count",
    component: () =>
      import(/* webpackChunkName: "Count" */ "@/views/Count/index.vue"),
    meta: {
      title: "手机签约-count",
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/list",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
