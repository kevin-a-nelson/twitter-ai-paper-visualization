import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar, Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const labelsData = {
  'ID': 3.4821752265861026,
  'O': 5.610888412417265,
  'ORG': 2.4807417974322395,
  'PRO': 3.8817278817278815,
  'VER': 5.658221302998967,
  'VUL': 7.843347639484976,
}


export const data = {
  labels: Object.keys(labelsData),
  datasets: [
    {
      label: 'The higher the index, the later it appears in a cyber tweet',
      data: Object.values(labelsData),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

export default function App() {
  return <Bar data={data} />;
}
