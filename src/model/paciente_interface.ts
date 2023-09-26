import { Common, SpringBootResponse } from "./helper_interface";

export interface PacienteListResponse extends SpringBootResponse {
  _embedded: {
    pacientesResponseList: Paciente[];
  };
}

export interface Paciente extends Common {
  id: number;
  nome: string;
  dataNascimento: Date;
  endereco: string;
  telefone: string;
  cartaoSus: string;
}
