import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import FormikRadioGroup from 'src/components/FormikRadioGroup';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

import {
  Box,
  Card,
  Container,
  makeStyles,
  TextField,
  Button,
  Divider,
  CardHeader,
  CardActions,
  InputAdornment,
  FormControlLabel,
  Radio,
  InputLabel
} from '@material-ui/core';
import { ChevronLeft } from 'react-feather';

import Page from 'src/components/Page';

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
            <CardHeader title={`Detalhes do paciente ${id}`} />
            <Divider />
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
                    <TextField
                      error={Boolean(touched.motherName && errors.motherName)}
                      helperText={touched.motherName && errors.motherName}
                      label="Nome da mãe"
                      name="motherName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.motherName}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.birthDate && errors.birthDate)}
                      helperText={touched.birthDate && errors.birthDate}
                      type="datetime-local"
                      InputLabelProps={{ shrink: true }}
                      label="Data de nascimento"
                      name="birthDate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.birthDate}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                      label="Cidade de nascimento"
                      name="city"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.city}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.statusId && errors.statusId)}
                      helperText={touched.statusId && errors.statusId}
                      label="Status"
                      name="statusId"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.statusId}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.surgeryId && errors.surgeryId)}
                      helperText={touched.surgeryId && errors.surgeryId}
                      label="Cirurgia"
                      name="surgeryId"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.surgeryId}
                      variant="outlined"
                    />
                    <div className={classes.gridItem}>
                      <TextField
                        error={Boolean(touched.weight && errors.weight)}
                        helperText={touched.weight && errors.weight}
                        type="number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">Kg</InputAdornment>
                          )
                        }}
                        label="Peso"
                        name="weight"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.weight}
                        variant="outlined"
                      />

                      <TextField
                        error={Boolean(
                          touched.handbookNumber && errors.handbookNumber
                        )}
                        helperText={
                          touched.handbookNumber && errors.handbookNumber
                        }
                        type="number"
                        label="# Prontuario"
                        name="handbookNumber"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.handbookNumber}
                        variant="outlined"
                      />
                    </div>
                    <div className={classes.gridItem}>
                      <TextField
                        error={Boolean(touched.bedNumber && errors.bedNumber)}
                        helperText={touched.bedNumber && errors.bedNumber}
                        type="number"
                        label="# Leito"
                        name="bedNumber"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.bedNumber}
                        variant="outlined"
                      />
                      <div>
                        <InputLabel>Sexo</InputLabel>
                        <Field name="sex">
                          {({ field, form, meta }) => {
                            return (
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
                            );
                          }}
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
                </form>
              )}
            </Formik>
          </Card>
        </Box>
      </Container>
    </Page>
  );
};

export default PatientView;
