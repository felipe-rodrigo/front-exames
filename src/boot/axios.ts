// import { boot } from 'quasar/wrappers'
// import axios from 'axios'

// const api = axios.create({ baseURL: 'http://localhost:8080/' })

// export default boot(({ app }) => {
//   app.config.globalProperties.$axios = axios
//   app.config.globalProperties.$api = api
// })

// export { api }

import { boot } from "quasar/wrappers";
import axios, { AxiosInstance } from "axios";
import { useOauthStore } from "stores/oauth.store";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

//todo
//const api = axios.create({ baseURL: process.env.API });
const api = "http://localhost:8080";

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  // api.interceptors.response.use((response) => {
  //   return response
  // }, async function (error) {
  //   const originalRequest = error.config;
  //   if (error.response.status === 401 && !originalRequest._retry) {
  //     originalRequest._retry = true;
  //     useOauthStore().apagarToken();
  //   }
  //   return Promise.reject(error);
  // });

  // api.interceptors.request.use(
  //   async config => {
  //     const oauthStore = useOauthStore();
  //     const token = oauthStore.getToken;
  //     if (token) {
  //       config.headers = {
  //         'Authorization': token
  //       }
  //     }
  //     return config;
  //   },
  //   error => {
  //     Promise.reject(error)
  //   });
});

export { api };
