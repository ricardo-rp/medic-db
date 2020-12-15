import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { useParams } from 'react-router-dom';

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

  let { id } = useParams();

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Box mt={3}>
          <Card>
            <PerfectScrollbar>
              <Box minWidth={1050}>{`${id}`}</Box>
            </PerfectScrollbar>
          </Card>
        </Box>
      </Container>
    </Page>
  );
};

export default PatientView;
