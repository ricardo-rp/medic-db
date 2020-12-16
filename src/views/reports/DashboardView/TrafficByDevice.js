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

const TrafficByDevice = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    (async function() {
      try {
        const response = await api.get('/surgery');
        setGraphData(response.data);
      } catch (e) {
        console.log('Erro ao buscar o grafico donut', e);
      }
    })();
  }, []);

  const data = {
    datasets: [
      {
        data: graphData.map(surgery => surgery.count),
        backgroundColor: [
          colors.red[600],
          colors.purple[600],
          colors.indigo[600],
          colors.lightBlue[600],
          colors.teal[600],
          colors.lightGreen[600],
          colors.yellow[600],
          colors.orange[600],
          colors.pink[600],
          colors.deepPurple[600],
          colors.blue[600],
          colors.cyan[600],
          colors.green[600],
          colors.lime[600],
          colors.amber[600],
          colors.deepOrange[600]
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
      display: false
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
        <Box height={450}>
          <Doughnut data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

TrafficByDevice.propTypes = {
  className: PropTypes.string
};

export default TrafficByDevice;
