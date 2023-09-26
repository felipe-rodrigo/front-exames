// const routes = [
//   {
//     path: '/',
//     component: () => import('layouts/MainLayout.vue'),
//     children: [
//       { path: '', name: 'home', component: () => import('pages/IndexPage.vue') }
//     ]
//   },

//   {
//     path: '/:catchAll(.*)*',
//     component: () => import('pages/ErrorNotFound.vue')
//   }
// ]

// export default routes

import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      {
        name: "home",
        path: "/",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        name: "exame-create",
        path: "exame",
        component: () => import("pages/exame/ExameCreate.vue.vue"),
      },
    ],
  },
  {
    path: "/exame",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      {
        name: "exame-create",
        path: "criar",
        component: () => import("pages/exame/ExameCreate.vue"),
      },
    ],
  },
  {
    path: "/oauth/authorize/callback",
    meta: { signIn: false },
    component: () => import("pages/oauth/oauth-callback.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
