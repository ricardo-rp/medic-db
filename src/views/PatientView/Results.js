import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, customers: patients, ...rest }) => {
  const classes = useStyles();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Sexo</TableCell>
                <TableCell>Nascimento</TableCell>
                <TableCell>Leito</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.slice(0, limit).map(patient => (
                <TableRow
                  hover
                  key={patient.id}
                  onClick={() => navigate(`/app/patient/${patient.id}`)}
                >
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Typography color="textPrimary" variant="body1">
                        {patient.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>F</TableCell>
                  <TableCell>
                    {moment(patient.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>{patient.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={patients.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
