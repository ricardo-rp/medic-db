import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';

import api from 'src/utils/httpClient';

import { X, XCircle } from 'react-feather';

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton
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
      console.log('Erro ao buscar a lista de pacientes', e);
    }
  }

  async function attemptDelete(e, patient) {
    e.stopPropagation();
    if (window.confirm(`Deletar paciente ${patient.full_name}?`)) {
      try {
        const response = await api.delete(`/patient/${patient.id}`);
        alert('Paciente deletado');
        fetchPatients();
      } catch (e) {
        console.log('Erro ao tentar deletar um paciente', e);
      }
    } else {
      alert('Deleção cancelada');
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
                <TableCell>Deletar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients &&
                patients.map(patient => (
                  <TableRow
                    hover
                    key={patient.id}
                    onClick={() => navigate(`/app/patient/${patient.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Typography color="textPrimary" variant="body1">
                          {patient.full_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{patient.sex}</TableCell>
                    <TableCell>
                      {moment(patient.birth_date).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>{patient.bed_number}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={e => attemptDelete(e, patient)}
                      >
                        <XCircle />
                      </IconButton>
                    </TableCell>
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
