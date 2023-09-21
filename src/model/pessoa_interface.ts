import { Common, SpringBootResponse } from "./helper_interface";

export interface PessoaListResponse extends SpringBootResponse {
  _embedded: {
    pessoaResponseList: Pessoa[];
  };
}

export interface Pessoa extends Common {
  id: number;
  nome: string;
  dtNascimento: Date;
  endereco: string;
  telefone: string;
  cartaoSus: string;
}
