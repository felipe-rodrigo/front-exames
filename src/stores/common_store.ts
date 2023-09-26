import { defineStore } from "pinia";
// import { useQuasar, Loading } from "quasar";


export const useCommonStore = defineStore("common", {
  state: () => {
    return {
      pageTitle: "",
      isLoading: false,
      isError: false,
      scroll: Object
    };
  },
  actions: {
    hideTitle() {
      this.pageTitle = "";
    },
    setPageTitle(title: string) {
      this.pageTitle = title;
    },
    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading;

      // if (this.isLoading) {
      //   Loading.show();
      // } else {
      //   Loading.hide();
      // }
    },
    setIsError(isError: boolean) {
      this.isError = isError;
    },
  },
});
