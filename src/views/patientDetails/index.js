import React, { useState } from 'react';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';

import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Container,
  Link,
  makeStyles,
  TextField,
  Typography,
  FormHelperText,
  Button
} from '@material-ui/core';
import { ChevronLeft } from 'react-feather';

import Page from 'src/components/Page';

import { Formik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
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
          Voltar
        </Button>
        <Box mt={3}>
          <Card>
            <PerfectScrollbar>
              <Box minWidth={1050}>
                <Formik
                  initialValues={{
                    email: '',
                    fullName: '',
                    motherName: '',
                    password: '',
                    policy: false
                  }}
                  validationSchema={Yup.object().shape({
                    fullName: Yup.string()
                      .max(255)
                      .required('Nome completo é requerido'),
                    motherName: Yup.string()
                      .max(255)
                      .required('Nome da mãe é requerido'),
                    email: Yup.string()
                      .email('Must be a valid email')
                      .max(255)
                      .required('Email is required'),
                    password: Yup.string()
                      .max(255)
                      .required('password is required'),
                    policy: Yup.boolean().oneOf(
                      [true],
                      'This field must be checked'
                    )
                  })}
                  onSubmit={() => {
                    navigate('/app/dashboard', { replace: true });
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
                    <form onSubmit={handleSubmit}>
                      <TextField
                        error={Boolean(touched.fullName && errors.fullName)}
                        fullWidth
                        helperText={touched.fullName && errors.fullName}
                        label="First name"
                        margin="normal"
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.fullName}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(touched.motherName && errors.motherName)}
                        fullWidth
                        helperText={touched.motherName && errors.motherName}
                        label="Last name"
                        margin="normal"
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.motherName}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        label="Email Address"
                        margin="normal"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
                        label="Password"
                        margin="normal"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                        variant="outlined"
                      />
                      <Box alignItems="center" display="flex" ml={-1}>
                        <Checkbox
                          checked={values.policy}
                          name="policy"
                          onChange={handleChange}
                        />
                        <Typography color="textSecondary" variant="body1">
                          I have read the{' '}
                          <Link
                            color="primary"
                            component={RouterLink}
                            to="#"
                            underline="always"
                            variant="h6"
                          >
                            Terms and Conditions
                          </Link>
                        </Typography>
                      </Box>
                      {Boolean(touched.policy && errors.policy) && (
                        <FormHelperText error>{errors.policy}</FormHelperText>
                      )}
                      <Box my={2}>
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Sign up now
                        </Button>
                      </Box>
                      <Typography color="textSecondary" variant="body1">
                        Have an account?{' '}
                        <Link component={RouterLink} to="/login" variant="h6">
                          Sign in
                        </Link>
                      </Typography>
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
