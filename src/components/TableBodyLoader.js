import { CircularProgress, TableCell, TableRow } from '@material-ui/core';
import React from 'react';

function TableBodyLoader() {
  return (
    <TableRow>
      <TableCell colSpan={2} style={{ textAlign: 'center', padding: '4em' }}>
        <CircularProgress />
      </TableCell>
    </TableRow>
  );
}

export default TableBodyLoader;
