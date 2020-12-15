import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Container,
  makeStyles,
  TextField,
  Button,
  Divider,
  CardHeader,
  CardActions
} from '@material-ui/core';
import { ChevronLeft } from 'react-feather';

import Page from 'src/components/Page';

import { Formik } from 'formik';
import * as Yup from 'yup';

require('./styles.css');

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  submitButton: {
    float: 'right',
    marginRight: theme.spacing(1)
  },
  formGrid: {
    padding: theme.spacing(2)
  }
}));

const PatientView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  let { id } = useParams();

  return (
    <Page className={classes.root} title="Paciente">
      <Container maxWidth={false}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/app/patient')}
        >
          <ChevronLeft style={{ marginLeft: '-0.5em' }} />
          Voltar sem salvar
        </Button>
        <Box mt={3}>
          <Card>
            <CardHeader title={`Detalhes do paciente ${id}`} />
            <Divider />
            <PerfectScrollbar>
              <Box minWidth={1050}>
                <Formik
                  initialValues={{
                    fullName: ''
                  }}
                  validationSchema={Yup.object().shape({
                    fullName: Yup.string()
                      .max(255)
                      .required('Nome completo é requerido')
                  })}
                  onSubmit={() => navigate('/app/dashboard')}
                >
                  {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className={classes.formGrid}>
                        <TextField
                          error={Boolean(touched.fullName && errors.fullName)}
                          helperText={touched.fullName && errors.fullName}
                          label="Nome completo"
                          name="fullName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.fullName}
                          variant="outlined"
                        />
                      </div>
                      <Divider />
                      <CardActions className={classes.submitButton}>
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Salvar
                        </Button>
                      </CardActions>
                    </form>
                  )}
                </Formik>
              </Box>
            </PerfectScrollbar>
          </Card>
        </Box>
      </Container>
    </Page>
  );
};

export default PatientView;
