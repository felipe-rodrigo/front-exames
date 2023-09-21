import { Common, SpringBootResponse } from "./helper_interface";

export interface CidadeListResponse extends SpringBootResponse {
  _embedded: {
    cidadesResponseList: Cidade[];
  }
}

export interface Cidade extends Common {
  id: number;
  nome: string;
  sigla: string
}
