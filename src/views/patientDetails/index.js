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

  const [fetching, setFetching] = useState(false);
  const [initialValues, setInitialValues] = useState({
    fullName: '',
    motherName: '',
    birthDate: '',
    city: '',
    statusId: 0,
    surgeryId: 0,
    weight: 0,
    handbookNumber: 0,
    bedNumber: 0,
    sex: 'M'
  });
  const [options, setOptions] = useState({
    status: [
      { value: 0, label: 'Alta' },
      { value: 1, label: 'Internado' },
      { value: 2, label: 'Óbito' }
    ],
    surgery: [
      { value: 0, label: 'Cirurgia' },
      { value: 1, label: 'Hernia umbilical' },
      { value: 2, label: 'Hipospádia' },
      { value: 3, label: 'Fimose' }
    ]
  });

  const { id: patientId } = useParams();

  // Fetch patient by Id
  useEffect(() => {
    (async function fetchPatient() {
      if (patientId === 'new') return;

      setFetching(true);
      try {
        const response = await api.get(`/patient/${patientId}`);
        let patientData = {
          ...response.data,
          birthDate: moment(response.data.birthDate).format('yyyy-MM-DDThh:mm')
        };
        setInitialValues(patientData);
      } catch (e) {
        console.log(e);
      }
      setFetching(false);
    })();
  }, [patientId]);

  async function onSubmit(values) {
    if (patientId === 'new') {
      try {
        await api.post(`/patient/`);
        alert('Paciente cadastrado.');
        navigate('/app/patient');
      } catch (e) {
        console.log(e);
        alert('Nao foi possivel cadastrar o paciente. Veja o console.');
      }
    } else {
      try {
        await api.update(`/patient/${patientId}`);
      } catch (e) {
        console.log(e);
        alert('Nao foi possivel atualizar o paciente. Veja o console.');
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
                fullName: Yup.string()
                  .max(255)
                  .required('Nome completo é requerido'),
                motherName: Yup.string()
                  .max(255)
                  .required('Nome completo é requerido'),
                city: Yup.string()
                  .max(255)
                  .required('Cidade de nascimento é requerido'),
                birthDate: Yup.date().required(
                  'Data de nascimento é requerido'
                ),
                statusId: Yup.number().required('Status é requerido'),
                surgeryId: Yup.number(),
                weight: Yup.number()
                  .integer('Insira um numero inteiro')
                  .required(),
                handbookNumber: Yup.number()
                  .integer('Insira um numero inteiro')
                  .required(),
                bedNumber: Yup.number()
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
                      name="fullName"
                      variant="outlined"
                    />
                    <Field
                      component={TextField}
                      label="Nome da mãe"
                      name="motherName"
                      variant="outlined"
                    />
                    <Field
                      component={TextField}
                      type="datetime-local"
                      label="Data de nascimento"
                      name="birthDate"
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
                      name="statusId"
                      variant="outlined"
                      label="Status"
                      select
                    >
                      {options.status.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                    <Field
                      component={TextField}
                      label="Cirurgia"
                      name="surgeryId"
                      variant="outlined"
                      select
                    >
                      {options.surgery.map(option => (
                        <MenuItem key={option.value} value={option.value}>
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
                        name="handbookNumber"
                        variant="outlined"
                      />
                    </div>
                    <div className={classes.gridItem}>
                      <Field
                        component={TextField}
                        type="number"
                        label="# Leito"
                        name="bedNumber"
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
                      disabled={isSubmitting || fetching}
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
