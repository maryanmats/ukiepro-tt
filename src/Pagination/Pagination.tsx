import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { Data } from '../types/types';

type Props = {
  list: Data[];
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

export default function Pagination({
  list,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: Props) {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  return (
    <TablePagination
      component="div"
      count={list.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
