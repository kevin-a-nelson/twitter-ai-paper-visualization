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
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const labelsData = {
    'ID-ID': 252,
    'ID-ORG': 168,
    'ORG-ID': 33,
    'ID-PRO': 85,
    'PRO-ID': 500,
    'ID-VER': 0,
    'VER-ID': 0,
    'ID-VUL': 367,
    'VUL-ID': 44,
    'O-ID': 1061,
    'ID-O': 641,
    'O-O': 5080,
    'O-ORG': 799,
    'ORG-O': 241,
    'O-PRO': 2048,
    'PRO-O': 1168,
    'O-VER': 1346,
    'VER-O': 877,
    'O-VUL': 739,
    'VUL-O': 526,
    'ORG-ORG': 198,
    'ORG-PRO': 1108,
    'PRO-ORG': 3,
    'PRO-PRO': 1436,
    'VER-ORG': 3,
    'ORG-VER': 3,
    'VER-PRO': 126,
    'PRO-VER': 886,
    'VER-VER': 349,
    'VUL-ORG': 0,
    'ORG-VUL': 0,
    'VUL-PRO': 58,
    'VUL-VER': 1,
    'VER-VUL': 256,
    'VUL-VUL': 2010,
}

export const data = {
  labels: Object.keys(labelsData),
  datasets: [
    {
      label: '# of Occurences',
      data: Object.values(labelsData),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

export default function App() {
  return <Radar data={data} />;
}
