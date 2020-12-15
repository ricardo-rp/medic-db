import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
  Select,
  MenuItem,
  FormControl
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
            <CardHeader title={`Detalhes do paciente`} />
            <Divider />
            <Formik
              initialValues={{
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
              }}
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
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  alert(JSON.stringify(values, null, 2));
                }, 500);
              }}
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
                <Form onSubmit={handleSubmit}>
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
                      <MenuItem value="0">Alta</MenuItem>
                      <MenuItem value="1">Internado</MenuItem>
                      <MenuItem value="2">Óbito</MenuItem>
                    </Field>
                    <Field
                      component={TextField}
                      label="Cirurgia"
                      name="surgeryId"
                      variant="outlined"
                    />
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
                      disabled={isSubmitting}
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Salvar
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
