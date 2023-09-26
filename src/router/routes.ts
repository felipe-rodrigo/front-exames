
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
    path: '/',
    meta: {signIn: true},
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { name: 'home', path: 'pages/IndexPage.vue', component: () => import('pages/IndexPage.vue') },
      {
        path: 'exames',
        meta: {signIn: true},
        children: [
          { name: 'exame-adicionar', path: 'adicionar', component: () => import('pages/cidade/CidadeCreate.vue') },
          { name: 'cidade-visualizar', path: 'visualizar', component: () => import('pages/cidade/CidadeCreate.vue') },
          { name: 'cidade-editar', path: 'editar', component: () => import('pages/cidade/CidadeCreate.vue') },
          { name: 'cidade-listar', path: 'listar', component: () => import('pages/cidade/CidadeList.vue') }
        ]
      },
      {
        path: 'exames',
        meta: {signIn: true},
        children: [
          { name: 'exames-adicionar', path: 'adicionar', component: () => import('pages/exames/ExameCreate.vue') },
          { name: 'exames-visualizar', path: 'visualizar', component: () => import('pages/exames/ExameCreate.vue') },
          { name: 'exames-editar', path: 'editar', component: () => import('pages/exames/ExameCreate.vue') },
          { name: 'exames-listar', path: 'listar', component: () => import('pages/sancoes/ExameList.vue') }
        ]
      },
      {
        path: 'pessoa',
        meta: {signIn: true},
        children: [
          { name: 'pessoa-adicionar', path: 'adicionar', component: () => import('pages/pessoa/PessoaCreate.vue') },
          { name: 'pessoa-visualizar', path: 'visualizar', component: () => import('pages/pessoa/PessoaCreate.vue') },
          { name: 'pessoa-editar', path: 'editar', component: () => import('pages/pessoa/PessoaCreate.vue') },
          { name: 'pessoa-listar', path: 'listar', component: () => import('pages/pessoa/PessoaList.vue') }
        ]
      },
    ],
  },
  {
    path: "/oauth/authorize/callback",
    meta: {signIn: false},
    component: () => import('pages/oauth/oauth-callback.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
