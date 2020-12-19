import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
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

const BirthLineGraph = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    (async function() {
      try {
        const response = await api.get('/timeline');
        console.log(response.data);
        setGraphData(response.data);
      } catch (e) {
        console.log('Erro ao buscar o grafico donut', e);
      }
    })();
  }, []);

  function calcSums() {
    let graphSum = 0;
    return graphData.map(month => {
      return (graphSum += month.cnt);
    });
  }

  const data = {
    datasets: [
      {
        data: calcSums(),
        // borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: graphData.map(month => month.label)
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
      <CardHeader title="Nascimentos" />
      <Divider />
      <CardContent>
        <Box height={300}>
          <Line data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

BirthLineGraph.propTypes = {
  className: PropTypes.string
};

export default BirthLineGraph;
