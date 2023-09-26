import { defineStore } from "pinia";
import useApi from "src/composable/UseApi";
import { Exame } from "src/model/exame_interface";
// import { useQuasar, Loading } from "quasar";

export const useExameStore = defineStore("exame", {
  state: () => {
    return {
      exame: {
        idExame: 0,
        idMedico: [],
        idPaciente: [],
        dataHoraExame: "",
        observacao: "",
        resultado: "",
      },
      isLoading: false,
      isError: false,
      scroll: Object,
    };
  },
  actions: {
    postExame() {
      this.setIsLoading(true);
      this.setIsError(false);

      const params = this.exame;
      useApi("exames/adicionar")
        .post(params)
        .then(() => {
          this.setIsLoading(false);
          this.router.push("/paciente/listar");
          //notifySuccess("Cadastro efetuado com sucesso!");
        })
        .catch((error) => {
          this.setIsError(true);
          this.setIsLoading(false);
          //notifyError(error.message);
        });
    },
    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
    setIsError(isError: boolean) {
      this.isError = isError;
    },
  },
});
