import { Common, SpringBootResponse } from "./helper.interface";

export interface SancoesListResponse extends SpringBootResponse {
  _embedded: {
    sancoesResponseList: Sancoes[];
  }
}

export interface Sancoes extends Common {
  id:number;
  nome: string;
  nomeNumeroArtigoLei: string;
  textoLei: string
}
