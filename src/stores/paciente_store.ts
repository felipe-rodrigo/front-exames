import useApi from "src/composable/UseApi";
import { defineStore } from "pinia";
import { useCommonStore } from "./common_store";
import useNotify from "src/composable/UseNotify";
import useDialog from "src/composable/UseDialog";
import { Pagination } from "src/model/helper_interface";
import { Pessoa, PessoaListResponse } from "src/model/paciente_interface";

const { notifyError, notifySuccess } = useNotify();
const { notifyConfirmar } = useDialog();

export const usePessoaStore = defineStore("pessoa", {
  state: () => {
    return {
      pagination: {
        sortBy: "id",
        descending: false,
        page: 1,
        rowsPerPage: 10,
      } as Pagination,
      pessoa: {} as Pessoa,
      pessoaResponse: [] as Pessoa[],
      estado: [] as string[],
      searchString: "",
      isLoading: false,
      isError: false,
    };
  },
  getters: {
    getPessoaListByFilter: (state) => {
      return state.pessoaResponse.filter((pessoa) =>
        pessoa.nome !== null
          ? pessoa.nome
              .toLocaleUpperCase()
              .includes(state.searchString.toUpperCase())
          : pessoa.razaoSocial != null
          ? pessoa.razaoSocial
              .toLocaleLowerCase()
              .includes(state.searchString.toUpperCase())
          : pessoa.documento.includes(state.searchString)
      );
    },
  },
  actions: {
    getPessoaList() {
      this.setIsLoading(true);
      this.setIsError(false);
      useApi(`pessoa`)
        .list()
        .then((data) => {
          const response: PessoaListResponse = data;
          if (!response) {
            this.setIsLoading(false);
            return;
          }
          this.pessoaResponse = response._embedded
            .pessoaResponseList as Pessoa[];
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

      const params = this.pessoa;
      useApi("pessoa")
        .post(params)
        .then(() => {
          this.setIsLoading(false);
          this.router.push("/pessoa/listar");
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
      const params = this.pessoa;

      useApi("pessoa")
        .update(params)
        .then(({ data }) => {
          this.setIsLoading(false);
          this.router.push("/pessoa/listar");
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
        return useApi("pessoa")
          .remove(this.pessoa.id)
          .then(({ data }) => {
            this.getPessoaList();
            this.setIsLoading(false);
          })
          .catch((error) => {
            this.setIsError(true);
            this.setIsLoading(false);
            notifyError(error.message);
          });
      };
      return notifyConfirmar(
        "Pessoa",
        "A pessoa <b>" + this.pessoa.nome + " </b>será removida!",
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
