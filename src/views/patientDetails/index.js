import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import api from 'src/utils/httpClient';
import moment from 'moment';

import FormikRadioGroup from 'src/components/FormikRadioGroup';

import { TextField } from 'formik-material-ui';

import { Formik, Form, Field } from 'formik';

import {
  Box,
  Card,
  Container,
  makeStyles,
  Button,
  Divider,
  CardHeader,
  CardActions,
  InputAdornment,
  FormControlLabel,
  Radio,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import { ChevronLeft } from 'react-feather';

import Page from 'src/components/Page';

import * as Yup from 'yup';

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
    padding: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gridGap: '1em'
  },
  gridItem: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: theme.spacing(2)
  }
}));

const PatientView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  // STATE
  const [fetchingSurgeries, setFetchingSurgeries] = useState(false);
  // const [fetchingStatus, setFetchingStatus] = useState(false);
  const [fetchingPatient, setFetchingPatient] = useState(false);
  const [initialValues, setInitialValues] = useState({
    full_name: '',
    mother_name: '',
    birth_date: '',
    city: '',
    status_id: 1,
    surgery_id: 1,
    weight: 0,
    handbook_number: 0,
    bed_number: 0,
    sex: 'M'
  });
  // const [statusOptions, setStatusOptions] = useState(
  const statusOptions = [
    { id: 1, label: 'Alta' },
    { id: 2, label: 'Internado' },
    { id: 3, label: 'Óbito' }
  ];
  // );
  const [surgeryOptions, setSurgeryOptions] = useState([
    { id: 1, label: 'Nenhuma' }
  ]);

  // Fetch surgery options
  useEffect(() => {
    (async function fetchOptions() {
      setFetchingSurgeries(true);
      try {
        const response = await api.get(`/surgery`);
        await setSurgeryOptions(response.data);
      } catch (e) {
        console.log('Erro ao buscar cirurgias.', e);
      }
      setFetchingSurgeries(false);
    })();
  }, []);

  // Fetch patient by Id
  const { id: patientId } = useParams();
  useEffect(() => {
    (async function fetchPatient() {
      if (patientId === 'new') return;

      setFetchingPatient(true);
      try {
        const responseData = await api.get(`/patient/${patientId}`);
        let patientData = {
          ...responseData.data[0],
          birth_date: moment(responseData.data[0].birth_date).format(
            'yyyy-MM-DDThh:mm'
          )
        };
        setInitialValues(patientData);
      } catch (e) {
        console.log('Erro ao buscar dados do paciente', e);
      }
      setFetchingPatient(false);
    })();
  }, [patientId]);

  async function onSubmit(values) {
    const isRegister = patientId === 'new';
    try {
      if (isRegister) {
        await api.post(`/patient/`, values);
      } else {
        await api.put(`/patient/${patientId}`, values);
      }
      alert('Paciente salvo.');
      navigate('/app/patient');
    } catch (e) {
      console.log('Erro ao salvar o paciente', e);
      if (e.response.data.errno === 19) {
        alert('Numero de leito ou prontuario ja ocupados.');
      } else {
        alert('Nao foi possivel salvar o paciente. Veja o console.');
      }
    }
  }

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
            <CardHeader title={`Detalhes do paciente`} />
            <Divider />
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                full_name: Yup.string()
                  .max(255)
                  .required('Nome completo é requerido'),
                mother_name: Yup.string()
                  .max(255)
                  .required('Nome completo é requerido'),
                city: Yup.string()
                  .max(255)
                  .required('Cidade de nascimento é requerido'),
                birth_date: Yup.date().required(
                  'Data de nascimento é requerido'
                ),
                status_id: Yup.number().required('Status é requerido'),
                surgery_id: Yup.number().required('Indique se há cirurgias'),
                weight: Yup.number()
                  .integer('Insira um numero inteiro')
                  .required(),
                handbook_number: Yup.number()
                  .integer('Insira um numero inteiro')
                  .required(),
                bed_number: Yup.number()
                  .integer('Insira um numero inteiro')
                  .required(),
                sex: Yup.string()
                  .max(1)
                  .required()
              })}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className={classes.formGrid}>
                    <Field
                      component={TextField}
                      label="Nome completo"
                      name="full_name"
                      variant="outlined"
                    />
                    <Field
                      component={TextField}
                      label="Nome da mãe"
                      name="mother_name"
                      variant="outlined"
                    />
                    <Field
                      component={TextField}
                      type="datetime-local"
                      label="Data de nascimento"
                      name="birth_date"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                    />
                    <Field
                      component={TextField}
                      label="Cidade de nascimento"
                      name="city"
                      variant="outlined"
                    />
                    <Field
                      component={TextField}
                      name="status_id"
                      variant="outlined"
                      label="Status"
                      select
                    >
                      {statusOptions.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                    <Field
                      component={TextField}
                      label="Cirurgia"
                      name="surgery_id"
                      variant="outlined"
                      select
                    >
                      {surgeryOptions.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                    <div className={classes.gridItem}>
                      <Field
                        component={TextField}
                        type="number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">Kg</InputAdornment>
                          )
                        }}
                        label="Peso"
                        name="weight"
                        variant="outlined"
                      />

                      <Field
                        component={TextField}
                        type="number"
                        label="# Prontuario"
                        name="handbook_number"
                        variant="outlined"
                      />
                    </div>
                    <div className={classes.gridItem}>
                      <Field
                        component={TextField}
                        type="number"
                        label="# Leito"
                        name="bed_number"
                        variant="outlined"
                      />
                      <div>
                        <InputLabel>Sexo</InputLabel>
                        <Field name="sex">
                          {({ field, form, meta }) => (
                            <FormikRadioGroup
                              form={form}
                              field={field}
                              style={{ flexDirection: 'row' }}
                            >
                              {['M', 'F'].map(option => (
                                <FormControlLabel
                                  key={option}
                                  value={option}
                                  control={<Radio />}
                                  label={option}
                                />
                              ))}
                            </FormikRadioGroup>
                          )}
                        </Field>
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <CardActions className={classes.submitButton}>
                    <Button
                      color="primary"
                      disabled={
                        isSubmitting || fetchingPatient || fetchingSurgeries
                        // ||fetchingStatus
                      }
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {patientId === 'new' ? 'Cadastrar' : 'Salvar'}
                    </Button>
                  </CardActions>
                </Form>
              )}
            </Formik>
          </Card>
        </Box>
      </Container>
    </Page>
  );
};

export default PatientView;
