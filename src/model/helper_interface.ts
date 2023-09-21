export interface SpringBootResponse {
  _embedded: any;
  content: any;
  _links: {
    self: {
      href: string;
    };
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

export interface Pagination {
  sortBy: string,
  descending: boolean,
  page: number,
  rowsPerPage: number,
  rowsNumber: number
}

export interface Common {
  criadoPor: string,
  criadoEm: Date,
  alteradoPor: string,
  alteradoEm: Date,
  idImportacao: string
}
