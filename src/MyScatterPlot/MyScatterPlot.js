import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter, Bubble } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function letterToNum(letter) {
  return {
    "O": 1,
    "PRO": 2,
    "ORG": 3,
    "VUL": 4,
    "ID": 5,
    "VER": 6
  }[letter]
}

function CSVStringToObject(CSVString) {
  const arr = CSVString.split("\n")
  var jsonObj = [];
  var headers = arr[0].split(',');
  for(var i = 1; i < arr.length; i++) {
    var data = arr[i].split(',');
    var obj = {};
    for(var j = 0; j < data.length; j++) {
      obj[headers[j].trim()] = data[j].trim();
    }
    jsonObj.push(obj);
  }
  return jsonObj;
}

function getScatterPlotData(CSVObject) {
  let allEntites = []

  for(let i = 0; i < CSVObject.length; i++) {
    if(CSVObject[i]["entities"]) {
      allEntites.push(CSVObject[i]["entities"].split(" "))
    }
  }

  const counter = {};
  const uniquePairCount = {};

  const entites = ['O','ID','VUL','VER','ORG','PRO']

  for(let i = 0; i < entites.length; i++) {
    for(let j = i; j < entites.length; j++) {

      const pair = entites[i] + "-" + entites[j]

      counter[pair] = false
      uniquePairCount[pair] = 0;
    }
  }



  for(let k = 0; k < allEntites.length; k++) {
    for(let i = 0; i < allEntites[k].length; i++) {
      for(let j = 0; j < i; j++) {
        const key = allEntites[k][i] + "-" + allEntites[k][j]
        const key2 = allEntites[k][j] + "-" + allEntites[k][i]

        if(key2 in counter) {
          counter[key2] = true
        }

        if(key in counter) {
          counter[key] = true
        }
      }
    }
    const allPairs = Object.keys(counter)
    allPairs.forEach(pair => {
      if(counter[pair]) {
        uniquePairCount[pair] += 1
        counter[pair] = false
      }
    });
  }

  return uniquePairCount;
}

function getScatterPlotData2(scatterPlotData) {
  const data = []
  const allKeys = Object.keys(scatterPlotData)
  allKeys.forEach(key => {
    let x = key.split('-')[0]
    let y = key.split('-')[1]

    x = letterToNum(x)
    y = letterToNum(y)

    const r = scatterPlotData[key]

    const set = {x, y, r}
    data.push(set)
  })
  return data;
}
export const options = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        // Include a dollar sign in the ticks
        callback: function(value, index, values) {
          return {
            1: "O",
            2: "PRO",
            3: "ORG",
            4: "VUL",
            5: "ID",
            6: "VER"
          }[value]
        }
      }
    },
    x: {
      beginAtZero: true,
      ticks: {
        // Include a dollar sign in the ticks
        callback: function(value, index, values) {
          return {
            1: "O",
            2: "PRO",
            3: "ORG",
            4: "VUL",
            5: "ID",
            6: "VER"
          }[value]
        }
      }
    },
  },
};

export const defaultChartData = {
  datasets: [
    {
      label: 'Pair B',
      data: [
        {x: 5, y: 1, r: 1251/150},
        {x: 4, y: 1, r: 1234/150},
        {x: 6, y: 1, r: 887/150},
        {x: 3, y: 1, r: 1143/150},
        {x: 2, y: 1, r: 2154/150},
        {x: 4, y: 5, r: 550/150},
        {x: 6, y: 5, r: 444/150},
        {x: 3, y: 5, r: 617/150},
        {x: 2, y: 5, r: 1221/150},
        {x: 6, y: 4, r: 486/150},
        {x: 3, y: 4, r: 762/150},
        {x: 2, y: 4, r: 1247/150},
        {x: 3, y: 6, r: 549/150},
        {x: 2, y: 6, r: 955/150},
        {x: 2, y: 3, r: 1111/150},
      ],
      backgroundColor: 'rgba(132, 99, 255, 1)',
    },
    {
      label: 'Pair A',
      data: [
        {x: 1, y: 1, r: 1879/150},
        {x: 1, y: 5, r: 1251/150},
        {x: 1, y: 4, r: 1234/150},
        {x: 1, y: 6, r: 887/150},
        {x: 1, y: 3, r: 1143/150},
        {x: 1, y: 2, r: 2154/150},
        {x: 5, y: 5, r: 304/150},
        {x: 5, y: 4, r: 550/150},
        {x: 5, y: 6, r: 444/150},
        {x: 5, y: 3, r: 617/150},
        {x: 5, y: 2, r: 1221/150},
        {x: 4, y: 4, r: 1269/150},
        {x: 4, y: 6, r: 486/150},
        {x: 4, y: 3, r: 762/150},
        {x: 4, y: 2, r: 1247/150},
        {x: 6, y: 6, r: 456/150},
        {x: 6, y: 3, r: 549/150},
        {x: 6, y: 2, r: 955/150},
        {x: 3, y: 3, r: 198/150},
        {x: 3, y: 2, r: 1111/150},
        {x: 2, y: 2, r: 1436/150},
    ],
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

export default function App() {
  const [chartData, setChartData] = useState(defaultChartData)

  useEffect(() => {

    let csvFileUrl = 'https://raw.githubusercontent.com/ndionysus/twitter-cyberthreat-detection/master/data/D1.csv'

    axios.get(csvFileUrl).then((response) => 
      {
        const CSVObject = CSVStringToObject(response.data)
        const scatterPlotData = getScatterPlotData(CSVObject)
        const scatterPlotData2 = getScatterPlotData2(scatterPlotData)

        const newChartData = defaultChartData

        newChartData['datasets'][0]['data'] = scatterPlotData2
        setChartData((chartData) => (newChartData))

        console.log(chartData)

      }
    )
  }, []);
  return <Bubble options={options} data={chartData} />;
}
