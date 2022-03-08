import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Radar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y' ,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export function PairsWithID() {
    const labelsData = {
        'ID': 252,
        'ORG': 168,
        'PRO': 85,
        'VER': 0,
        'VUL': 367,
        'O': 641,
    }

    const labelsDataTwo = {
        'ID-ID': 252,
        'ORG-ID': 33,
        'PRO-ID': 500,
        'VER-ID': 0,
        'VUL-ID': 44,
        'O-ID': 1061,
    }

    const data = {
        labels: Object.keys(labelsData),
        datasets: [
            {
            label: 'ID First Pair',
            data: Object.values(labelsData),
            borderColor: [
                'rgb(255, 99, 132, 0.4)',
            ],
            backgroundColor: [
                'rgba(230, 25, 75, 0.2)',
            ],
            },
            {
            label: 'ID Second Pair',
            data: Object.values(labelsDataTwo),
            borderColor: [
                'rgb(132, 99, 255, 0.4)',
            ],
            backgroundColor: [
                'rgba(75, 25, 230, 0.2)',
            ],
            },
        ],
    };
    return <Line data={data} />;
}

export function PairsWithO() {

    const labelsAndValuesFirstPair = {
        'O': 5080,
        'ORG': 799,
        'PRO': 2048,
        'VER': 1346,
        'VUL': 739,
        'ID': 1061
    }

    const labelsAndValuesSecondPair = {
        'O-O': 5080,
        'ORG-O': 241,
        'PRO-O': 1168,
        'VER-O': 877,
        'VUL-O': 526,
    }

    const data = {
        labels: Object.keys(labelsAndValuesFirstPair),
        datasets: [
            {
            label: 'O First Pair',
            data: Object.values(labelsAndValuesFirstPair),
            borderColor: [
                'rgb(255, 99, 132, 0.4)',
            ],
            backgroundColor: [
                'rgba(230, 25, 75, 0.2)',
            ],
            },
            {
            label: 'O Second Pair',
            data: Object.values(labelsAndValuesSecondPair),
            borderColor: [
                'rgb(132, 99, 255, 0.4)',
            ],
            backgroundColor: [
                'rgba(75, 25, 230, 0.2)',
            ],
            },
        ],
    };

    return <Line data={data} />
}

export function PairsWithORG() {

    const labelsAndValuesFirstPair = {
        'ORG': 198,
        'O': 241,
        'PRO': 1108,
        'VER': 3,
        'VUL': 0,
        'ID': 33,
    }

    const labelsAndValuesSecondPair = {
        'ORG-ORG': 198,
        'O-ORG': 799,
        'PRO-ORG': 3,
        'VER-ORG': 3,
        'VUL-ORG': 0,
        'ID-ORG': 168,
    }

    const data = {
        labels: Object.keys(labelsAndValuesFirstPair),
        datasets: [
            {
            label: 'Org First Pair',
            data: Object.values(labelsAndValuesFirstPair),
            borderColor: [
                'rgb(255, 99, 132, 0.4)',
            ],
            backgroundColor: [
                'rgba(230, 25, 75, 0.2)',
            ],
            },
            {
            label: 'Org Second Pair',
            data: Object.values(labelsAndValuesSecondPair),
            borderColor: [
                'rgb(132, 99, 255, 0.4)',
            ],
            backgroundColor: [
                'rgba(75, 25, 230, 0.2)',
            ],
            },
        ],
    };

    return <Line data={data} />
}

export function PairsWithVER() {

    const labelsAndValuesFirstPair = {
        'VER': 349,
        'ORG': 3,
        'ID': 0,
        'O': 877,
        'PRO': 126,
        'VUL': 256,

    }

    const labelsAndValuesSecondPair = {
        'VER-VER': 349,
        'ORG-VER': 3,
        'ID-VER': 0,
        'O-VER': 1346,
        'PRO-VER': 886,
        'VUL-VER': 1,
    }

    const data = {
        labels: Object.keys(labelsAndValuesFirstPair),
        datasets: [
            {
            label: 'Org First Pair',
            data: Object.values(labelsAndValuesFirstPair),
            borderColor: [
                'rgb(255, 99, 132, 0.4)',
            ],
            backgroundColor: [
                'rgba(230, 25, 75, 0.2)',
            ],
            },
            {
            label: 'Org Second Pair',
            data: Object.values(labelsAndValuesSecondPair),
            borderColor: [
                'rgb(132, 99, 255, 0.4)',
            ],
            backgroundColor: [
                'rgba(75, 25, 230, 0.2)',
            ],
            },
        ],
    };

    return <Line data={data} />
}

export function PairsWithVUL() {
    const labelsAndValuesFirstPair = {
        'VUL': 2010,
        'ID': 44,
        'VER': 1,
        'ORG': 0,
        'O': 526,
        'PRO': 58,
    }

    const labelsAndValuesSecondPair = {
        'VUL-VUL': 2010,
        'ID-VUL': 367,
        'VER-VUL': 256,
        'ORG-VUL': 0,
        'O-VUL': 739,
        'VUL-PRO': 40,
    }

    const data = {
        labels: Object.keys(labelsAndValuesFirstPair),
        datasets: [
            {
            label: 'Org First Pair',
            data: Object.values(labelsAndValuesFirstPair),
            borderColor: [
                'rgb(255, 99, 132, 0.4)',
            ],
            backgroundColor: [
                'rgba(230, 25, 75, 0.2)',
            ],
            },
            {
            label: 'Org Second Pair',
            data: Object.values(labelsAndValuesSecondPair),
            borderColor: [
                'rgb(132, 99, 255, 0.4)',
            ],
            backgroundColor: [
                'rgba(75, 25, 230, 0.2)',
            ],
            },
        ],
    };

    return <Line data={data} />
}

export function PairsWithPRO() {

    const labelsAndValuesFirstPair = {
        'VUL': 2010,
        'ID': 44,
        'VER': 1,
        'ORG': 0,
        'O': 526,
        'PRO': 58,
    }

    const labelsAndValuesSecondPair = {
        'VUL-VUL': 2010,
        'ID-VUL': 367,
        'VER-VUL': 256,
        'ORG-VUL': 0,
        'O-VUL': 739,
        'VUL-PRO': 40,
    }

    const data = {
        labels: Object.keys(labelsAndValuesFirstPair),
        datasets: [
            {
            label: 'Org First Pair',
            data: Object.values(labelsAndValuesFirstPair),
            borderColor: [
                'rgb(255, 99, 132, 0.4)',
            ],
            backgroundColor: [
                'rgba(230, 25, 75, 0.2)',
            ],
            },
            {
            label: 'Org Second Pair',
            data: Object.values(labelsAndValuesSecondPair),
            borderColor: [
                'rgb(132, 99, 255, 0.4)',
            ],
            backgroundColor: [
                'rgba(75, 25, 230, 0.2)',
            ],
            },
        ],
    };

    return <Line data={data} />
}

