import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import StatusBarGraph from './StatusBarGraph';
import SurgeryDonutGraph from './SurgeryDonutGraph';
import BirthLineGraph from './BirthLineGraph';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={7} md={7} xl={7} sm={12} xs={12}>
            <StatusBarGraph />
          </Grid>
          <Grid item lg={5} md={5} xl={5} sm={12} xs={12}>
            <SurgeryDonutGraph />
          </Grid>
          <Grid item xs={12}>
            <BirthLineGraph />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
