import useApi from "src/composable/UseApi";
import { defineStore } from "pinia";
import { useCommonStore } from "./common_store";
import useNotify from "src/composable/UseNotify";
import useDialog from "src/composable/UseDialog";
import { Pagination } from "src/model/helper_interface";
import { Paciente, PacienteListResponse } from "src/model/paciente_interface";

const { notifyError, notifySuccess } = useNotify();
const { notifyConfirmar } = useDialog();

export const usePacienteStore = defineStore("paciente", {
  state: () => {
    return {
      pagination: {
        sortBy: "id",
        descending: false,
        page: 1,
        rowsPerPage: 10,
      } as Pagination,
      paciente: {} as Paciente,
      pacienteResponse: [] as Paciente[],
      searchString: "",
      isLoading: false,
      isError: false,
    };
  },
  getters: {
    getPacienteListByFilter: (state) => {
      return state.pacienteResponse.filter((paciente) =>
        paciente.nome !== null
          ? paciente.nome
              .toLocaleUpperCase()
              .includes(state.searchString.toUpperCase())
          : paciente.razaoSocial != null
          ? paciente.razaoSocial
              .toLocaleLowerCase()
              .includes(state.searchString.toUpperCase())
          : paciente.documento.includes(state.searchString)
      );
    },
  },

  // TODO: CRIAR A LISTA DE PACIENTES QUE ALIMENTA O ESTADO DE PACIENTES, SE BASEANDO NO EXAME_STORE.TS

  actions: {
    getPacienteList() {
      this.setIsLoading(true);
      this.setIsError(false);
      useApi(`paciente`)
        .list()
        .then((data) => {
          const response: PacienteListResponse = data;
          if (!response) {
            this.setIsLoading(false);
            return;
          }
          this.pacienteResponse = response._embedded
            .pacientesResponseList as Paciente[];
          this.setIsLoading(false);
        })
        .catch((error) => {
          this.setIsError(true);
          this.setIsLoading(false);
        });
    },
    salvar() {
      this.setIsLoading(true);
      this.setIsError(false);

      const params = this.paciente;
      useApi("paciente")
        .post(params)
        .then(() => {
          this.setIsLoading(false);
          this.router.push("/paciente/listar");
          notifySuccess("Cadastro efetuado com sucesso!");
        })
        .catch((error) => {
          this.setIsError(true);
          this.setIsLoading(false);
          notifyError(error.message);
        });
    },
    editar() {
      this.setIsLoading(true);
      this.setIsError(false);
      const params = this.paciente;

      useApi("paciente")
        .update(params)
        .then(({ data }) => {
          this.setIsLoading(false);
          this.router.push("/paciente/listar");
          notifySuccess("Cadastro alterado com sucesso!");
        })
        .catch((error) => {
          this.setIsError(true);
          this.setIsLoading(false);
          notifyError(error.message);
        });
    },
    deletar() {
      this.setIsLoading(true);
      this.setIsError(false);
      const callback = () => {
        return useApi("paciente")
          .remove(this.paciente.id)
          .then(({ data }) => {
            this.getPacienteList();
            this.setIsLoading(false);
          })
          .catch((error) => {
            this.setIsError(true);
            this.setIsLoading(false);
            notifyError(error.message);
          });
      };
      return notifyConfirmar(
        "Paciente",
        "A paciente <b>" + this.paciente.nome + " </b>será removida!",
        callback
      ).onCancel(() => {
        this.setIsLoading(false);
      });
    },
    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading;
      useCommonStore().setIsLoading(isLoading);
    },
    setIsError(isError: boolean) {
      this.isError = isError;
      useCommonStore().setIsError(isError);
    },
  },
});
