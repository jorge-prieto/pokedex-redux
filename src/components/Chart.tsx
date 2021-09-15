import React from "react";
import { Bar } from "react-chartjs-2";

export const Charts = (
  titleLeft: string,
  titleRight: string,
  dataLeft: [],
  dataRight: []
) => {
  const normal = (array: []) =>
    array?.reduce(
      (
        acc: { stats: number[]; values: number[] },
        element: { split: (arg0: string) => [number, number] }
      ) => {
        const [key, value] = element.split(",");
        acc.stats.push(key);
        acc.values.push(value);
        return acc;
      },
      { stats: [], values: [] }
    ) || {};

  const left = normal(dataLeft);
  const right = normal(dataRight);

  const dataset = (label: string, data: string[], backgroundColor: string) =>
    label &&
    data &&
    backgroundColor && {
      label,
      data,
      backgroundColor,
    };

  const push = (
    array: unknown[],
    data: string | { label: string; data: string[]; backgroundColor: string }
  ) => {
    if (!!data) {
      array.push(data);
    }
  };

  const datasets: never[] = [];
  push(datasets, dataset(titleLeft, left.values, "rgb(75, 192, 192)"));
  push(datasets, dataset(titleRight, right.values, "rgb(88, 88, 199)"));

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
    <div className="max-h-12">
      <p className="text-center"> STATS </p>
      <Bar data={data} options={options} />
    </div>
  );
};
