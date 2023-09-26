import { Common, SpringBootResponse } from "./helper_interface";

export interface MedicoListResponse extends SpringBootResponse {
  _embedded: {
    MedicosResponseList: Medico[];
  }
}

export interface Medico extends Common {
  idMedico: number;
  nome: string;
  crm: string
}
