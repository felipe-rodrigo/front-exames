import { defineStore } from "pinia";
import useApi from "src/composable/UseApi";
import { Exame, ExameListResponse } from "src/model/exame_interface";
import axios, { AxiosInstance } from "axios";
// import { useQuasar, Loading } from "quasar";

const url = "http://localhost:8080";
export const useExameStore = defineStore("exame", {
   state: () => {
    return {
      exame: {
    
        idMedico: 0,
        idPaciente: 0,
        dataHoraExame: "",
        observacao: "",
        resultado: "",
      },
      examesResponse: [] as Exame[],
      isLoading: false,
      isError: false,
      scroll: Object,
    };
  },
  actions: {
    getExameList() {
      this.setIsLoading(true);
      this.setIsError(false);
      useApi('exames/listar').list()
      .then((data) => {
        const response: ExameListResponse = data;
        if (!response) {
          this.setIsLoading(false);
          return;
        }
        this.examesResponse = response;

          this.setIsLoading(false);
        })
        .catch((error) => {

          this.setIsError(true);
          this.setIsLoading(false);
        });


      // axios.get(`${url}/exames/listar`).then((data) => {
      //   const response = data;
      //   if (!response) {
      //     this.setIsLoading(false);
      //     return;
      //   }
      //   this.examesResponse = response.data;
      //   console.log(this.examesResponse)
      //       this.setIsLoading(false);
      // })
      // .catch((error) => {
      //   this.setIsError(true);
      //   this.setIsLoading(false);
      // })

    },


    postExame() {
      this.setIsLoading(true);
      this.setIsError(false);

      const params = this.exame;
      useApi("exames/adicionar")
        .post(params)
        .then(() => {
          this.setIsLoading(false);
         // this.router.push("/paciente/listar");
          //notifySuccess("Cadastro efetuado com sucesso!");
        })
        .catch((error) => {
          this.setIsError(true);
          this.setIsLoading(false);
          //notifyError(error.message);
        });
    },
    // getExameList() {
    //   this.setIsLoading(true);
    //   this.setIsError(false);
    //   useApi(`exame`).list()
    //     .then((data) => {
    //       const response: ExameListResponse = data;
    //       if (!response) {
    //         this.setIsLoading(false);
    //         return;
    //       }
    //       this.exameResponse = response._embedded.exameResponseList as Exame[];
    //       this.setIsLoading(false);
    //     })
    //     .catch((error) => {
    //       this.setIsError(true);
    //       this.setIsLoading(false);
    //     });
    // },
    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
    setIsError(isError: boolean) {
      this.isError = isError;
    },
  },
});
