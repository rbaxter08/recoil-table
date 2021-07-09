export interface Column {
  Header: string;
  accessor: string;
}

export interface Page {
  rowsPerPage: number;
  page: number;
}
