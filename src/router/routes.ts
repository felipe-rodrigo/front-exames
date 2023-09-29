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
  // Rota principal 'Home'
  {
    path: "/",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      {
        name: "home",
        path: "/",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },
  // Rotas para 'Exames'
  {
    path: "/exame",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      {
        name: "exame-create",
        path: "criar",
        component: () => import("pages/exame/ExameCreate.vue"),
      },
      {
        name: "exame-list",
        path: "listar",
        component: () => import("pages/exame/ExameList.vue"),
      },
    ],
  },
  // Rotas para 'Médicos'
  {
    path: "/medico",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      {
        name: "medico-create",
        path: "criar",
        component: () => import("pages/medico/MedicoCreate.vue"),
      },
      {
        name: "medico-list",
        path: "listar",
        component: () => import("pages/medico/MedicoList.vue"),
      },
    ],
  },
  // Rotas para 'Pacientes'
  {
    path: "/paciente",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      {
        name: "paciente-create",
        path: "criar",
        component: () => import("pages/paciente/PacienteCreate.vue"),
      },
      {
        name: "paciente-list",
        path: "listar",
        component: () => import("pages/paciente/PacienteList.vue"),
      },
    ],
  },
  // Rotas para 'Usuarios'
  {
    path: "/usuario",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      {
        name: "usuario-create",
        path: "criar",
        component: () => import("pages/usuario/UsuarioCreate.vue"),
      },
      {
        name: "usuario-list",
        path: "listar",
        component: () => import("pages/usuario/UsuarioList.vue"),
      },
    ],
  },

  // Tratamento de Exceção
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
