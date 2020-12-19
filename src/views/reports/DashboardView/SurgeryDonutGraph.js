import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import api from 'src/utils/httpClient';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const SurgeryDonutGraph = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    (async function() {
      try {
        const response = await api.get('/surgery/count');
        setGraphData(response.data);
      } catch (e) {
        console.log('Erro ao buscar o grafico donut', e);
      }
    })();
  }, []);

  const data = {
    datasets: [
      {
        data: graphData.map(surgery => surgery.cnt),
        backgroundColor: [
          colors.red[300],
          colors.purple[300],
          colors.indigo[300],
          colors.lightBlue[300],
          colors.teal[300],
          colors.lightGreen[300],
          colors.yellow[300],
          colors.orange[300],
          colors.pink[300],
          colors.deepPurple[300],
          colors.blue[300],
          colors.cyan[300],
          colors.green[300],
          colors.lime[300],
          colors.amber[300],
          colors.deepOrange[300],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: graphData.map(surgery => surgery.label)
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: true
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Cirurgias" />
      <Divider />
      <CardContent>
        <Box height={300}>
          <Doughnut data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

SurgeryDonutGraph.propTypes = {
  className: PropTypes.string
};

export default SurgeryDonutGraph;
