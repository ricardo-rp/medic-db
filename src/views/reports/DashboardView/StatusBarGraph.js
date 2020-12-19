import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

import api from 'src/utils/httpClient';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const StatusBarGraph = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    (async function() {
      try {
        const response = await api.get('/status/count');
        setGraphData(response.data);
      } catch (e) {
        console.log('Erro ao buscar o grafico de barras', e);
      }
    })();
  }, []);

  const data = {
    datasets: [
      {
        backgroundColor: [
          colors.green[300],
          colors.yellow[300],
          colors.red[300],
          colors.purple[300],
          colors.indigo[300],
          colors.lightBlue[300],
          colors.teal[300],
          colors.lightGreen[300],
          colors.orange[300],
          colors.pink[300],
          colors.deepPurple[300],
          colors.blue[300],
          colors.cyan[300],
          colors.lime[300],
          colors.amber[300],
          colors.deepOrange[300]
        ],
        data: graphData.map(surgery => surgery.cnt)
      }
    ],
    labels: graphData.map(status => status.label)
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    datasets: {
      barThickness: 100,
      maxBarThickness: 200,
      barPercentage: 0.5,
      categoryPercentage: 0.5
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
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
      <CardHeader title="Status" />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

StatusBarGraph.propTypes = {
  className: PropTypes.string
};

export default StatusBarGraph;
