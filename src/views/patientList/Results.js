import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';

import api from 'src/utils/httpClient';

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';

const Results = ({ className, ...rest }) => {
  const [patients, setPatients] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      const response = await api.get('/patient/');
      setPatients(response.data);
    } catch (e) {
      alert('Erro ao buscar a lista de pacientes. Veja o console.');
      console.log(e);
    }
  }

  return (
    <Card {...rest}>
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
              {patients &&
                patients.map(patient => (
                  <TableRow
                    hover
                    key={patient.id}
                    onClick={() => navigate(`/app/patient/${patient.id}`)}
                  >
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Typography color="textPrimary" variant="body1">
                          {patient.fullName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{patient.sex}</TableCell>
                    <TableCell>
                      {moment(patient.birthDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>{patient.bedNumber}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string
};

export default Results;
