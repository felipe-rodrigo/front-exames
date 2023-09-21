
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
        path: 'cidade',
        meta: {signIn: true},
        children: [
          { name: 'cidade-adicionar', path: 'adicionar', component: () => import('pages/cidade/CidadeCreate.vue') },
          { name: 'cidade-visualizar', path: 'visualizar', component: () => import('pages/cidade/CidadeCreate.vue') },
          { name: 'cidade-editar', path: 'editar', component: () => import('pages/cidade/CidadeCreate.vue') },
          { name: 'cidade-listar', path: 'listar', component: () => import('pages/cidade/CidadeList.vue') }
        ]
      },
      {
        path: 'sancoes',
        meta: {signIn: true},
        children: [
          { name: 'sancoes-adicionar', path: 'adicionar', component: () => import('pages/sancoes/SancoesCreate.vue') },
          { name: 'sancoes-visualizar', path: 'visualizar', component: () => import('pages/sancoes/SancoesCreate.vue') },
          { name: 'sancoes-editar', path: 'editar', component: () => import('pages/sancoes/SancoesCreate.vue') },
          { name: 'sancoes-listar', path: 'listar', component: () => import('pages/sancoes/SancoesList.vue') }
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
