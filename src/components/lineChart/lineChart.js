import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ labels, data }) => {
  console.log('labels',labels)
  console.log('data',data)
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature',
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default LineChart;
