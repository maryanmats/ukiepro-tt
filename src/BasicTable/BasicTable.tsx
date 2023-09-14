import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Data } from '../types/types';
import Delete from '@mui/icons-material/Delete';
import EditFormDialog from '../EditFormDialog/EditFormDialog';

type Props = {
  list: Data[];
  handleDelete: (id: number) => void;
  handleEdit: (item: Data) => void;
}

export default function BasicTable({ list, handleDelete, handleEdit }:Props) {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="left">Text</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.category}
              </TableCell>
              <TableCell align="left">{item.name}</TableCell>
              <TableCell align="left">{item.text}</TableCell>
              <TableCell sx={{ display: 'flex', flexDirection: 'row' }} align="right">{
                <>
                <EditFormDialog defaultValues={item} handleEdit={handleEdit} />
                <Delete sx={{ '&:hover': { cursor: 'pointer' } }} onClick={() => handleDelete(item.id)} 
              />
              </>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
