import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';

import PerfectScrollbar from 'react-perfect-scrollbar';

import api from 'src/utils/httpClient';

import {
  makeStyles,
  Container,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress
} from '@material-ui/core';

import SurgeryRow from './SurgeryRow';
import TableBodyLoader from 'src/components/TableBodyLoader';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SurgeryListView = () => {
  const classes = useStyles();

  //STATE
  const [isFetching, setIsFetching] = useState(false);
  const [surgeries, setSurgeries] = useState([]);

  // Fetch surgeries
  useEffect(() => {
    fetchSurgeries();
  }, []);

  async function fetchSurgeries() {
    setIsFetching(true);
    try {
      const response = await api.get(`/surgery`);
      await setSurgeries(response.data);
    } catch (e) {
      console.log('Erro ao buscar cirurgias.', e);
    }
    setIsFetching(false);
  }

  return (
    <Page className={classes.root} title="Pacientes">
      <Container maxWidth={false}>
        <Box mt={3}>
          <Card>
            <PerfectScrollbar>
              <Box>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Cirurgia</TableCell>
                      <TableCell style={{ width: '7em', textAlign: 'center' }}>
                        Editar
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isFetching ? (
                      <TableBodyLoader/>
                    ) : (
                      surgeries &&
                      surgeries.map(
                        surgery =>
                          surgery.id !== 1 && ( // Elimina a opcao "Nenhuma"
                            <SurgeryRow
                              surgery={surgery}
                              key={surgery.id}
                              fetchSurgeries={fetchSurgeries}
                            />
                          )
                      )
                    )}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
          </Card>
        </Box>
      </Container>
    </Page>
  );
};

export default SurgeryListView;
