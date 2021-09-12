import React from 'react';
import { Bar } from 'react-chartjs-2';

export const Charts = ({ titleLeft, titleRight, dataLeft, dataRight }) => {
  const normal = (array) =>
    array?.reduce(
      (acc, element) => {
        const [key, value] = element.split(',');
        acc.stats.push(key);
        acc.values.push(value);
        return acc;
      },
      { stats: [], values: [] }
    ) || {};

  const left = normal(dataLeft);
  const right = normal(dataRight);

  const dataset = (label, data, backgroundColor) =>
    label &&
    data &&
    backgroundColor && {
      label,
      data,
      backgroundColor,
    };

  const push = (array, data) => {
    if (!!data) {
      array.push(data);
    }
  };

  const datasets = [];
  push(datasets, dataset(titleLeft, left.values, 'rgb(75, 192, 192)'));
  push(datasets, dataset(titleRight, right.values, 'rgb(88, 88, 199)'));

  const data = {
    labels: left.stats,
    datasets,
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className='max-h-12'>
      <p className='text-center'> STATS </p>
      <Bar data={data} options={options} />
    </div>
  );
};
