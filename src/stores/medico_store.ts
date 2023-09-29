import { defineStore } from "pinia";
import useApi from "src/composable/UseApi";
import { Medico, MedicoListResponse } from "src/model/medico_interface";
import axios, { AxiosInstance } from "axios";
import { useQuasar, Loading } from "quasar";

const url = "http://localhost:8080";
export const useMedicoStore = defineStore("medico", {
   state: () => {
    return {
      medico: {

        idMedico: 0,
        idPaciente: 0,
        dataHoraMedico: "",
        observacao: "",
        resultado: "",
      },
      medicosResponse: [] as Medico[],
      isLoading: false,
      isError: false,
      scroll: Object,
    };
  },
  actions: {
    getMedicoList() {
      this.setIsLoading(true);
      this.setIsError(false);
      useApi('medicos/listar').list()
      .then((data) => {
        const response: MedicoListResponse = data;
        if (!response) {
          this.setIsLoading(false);
          return;
        }
        this.medicosResponse = response;
          this.setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          this.setIsError(true);
          this.setIsLoading(false);
        });


      // axios.get(`${url}/medicos/listar`).then((data) => {
      //   const response = data;
      //   if (!response) {
      //     this.setIsLoading(false);
      //     return;
      //   }
      //   this.medicosResponse = response.data;
      //   console.log(this.medicosResponse)
      //       this.setIsLoading(false);
      // })
      // .catch((error) => {
      //   this.setIsError(true);
      //   this.setIsLoading(false);
      // })

    },


    postMedico() {
      this.setIsLoading(true);
      this.setIsError(false);

      const params = this.medico;
      useApi("medicos/adicionar")
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
    // getMedicoList() {
    //   this.setIsLoading(true);
    //   this.setIsError(false);
    //   useApi(`medico`).list()
    //     .then((data) => {
    //       const response: MedicoListResponse = data;
    //       if (!response) {
    //         this.setIsLoading(false);
    //         return;
    //       }
    //       this.medicoResponse = response._embedded.medicoResponseList as Medico[];
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
