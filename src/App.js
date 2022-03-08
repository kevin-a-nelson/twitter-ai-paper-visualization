import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Doughnut, Pie, PolarArea } from 'react-chartjs-2';
import { Button, Space, Divider, Input, Badge } from 'antd';
import "antd/dist/antd.css";
import MyScatterPlot from './MyScatterPlot/MyScatterPlot'
import RadarChart from './RadarChart/RadarChart';
import PairsCount from './PairsCount/PairsCount'
import { PairsWithID, PairsWithO, PairsWithORG, PairsWithVER, PairsWithVUL, PairsWithPRO } from './HorizontalBar/HorizontalBar'
import { Card } from 'antd';

            {/* 'O': 'Black',
            'PRO': 'rgba(54, 162, 235, 1)',
            'ORG: 'rgba(255, 206, 86, 1)',
            'VUL': 'rgba(75, 192, 192, 1)',
            'ID': 'rgba(153, 102, 255, 1)',
            'VER': 'rgba(255, 159, 64, 1)' */}

const COLORS = {
  USELESS: 'Black',
  PRO: 'rgba(255, 99, 132, 1)',
  ORG: 'rgba(255, 206, 86, 1)',
  VUL: 'rgba(75, 192, 192, 1)',
  ID: 'rgba(153, 102, 255, 1)',
  VER: 'rgba(255, 159, 64, 1)'
}

const LAST_PAGE_NUMBER = 9;

const { TextArea } = Input

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const backgroundColor1 = [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
]

const backgroundColor2 = [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
]

const chartLabels = [
  ['O', 'PRO', 'ORG', 'VUL', 'ID', 'VER']
]

export const defaultChartData = {
  labels: [],
  datasets: [],
};

function CSVStringToObject(CSVString) {
  const arr = CSVString.split("\n")
  var jsonObj = [];
  var headers = arr[0].split(',');
  for(var i = 1; i < arr.length; i++) {
    var data = arr[i].split(',');
    var obj = {};
    for(var j = 0; j < data.length; j++) {
      if(headers[j]) {
        obj[headers[j].trim()] = data[j].trim();
      }
    }
    jsonObj.push(obj);
  }
  return jsonObj;
}

function getElemOccurence(elem,arr) {
  let count = 0;
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === elem) {
      count += 1
    }
  }
  return count
}

function getEntityOccurence(CSVObject) {
  let allEntites = ""

  const numOfTweets = CSVObject.length;

  for(let i = 0; i < CSVObject.length; i++) {
    allEntites += CSVObject[i]["entities"]
    allEntites += " "
  }

  allEntites = allEntites.split(" ")

  return {
    "O": getElemOccurence('O', allEntites) / numOfTweets,
    "PRO": getElemOccurence('PRO', allEntites) / numOfTweets,
    "ORG": getElemOccurence('ORG', allEntites) / numOfTweets,
    "VUL": getElemOccurence('VUL', allEntites) / numOfTweets,
    "ID": getElemOccurence('ID', allEntites) / numOfTweets,
    "VER": getElemOccurence('ID', allEntites) / numOfTweets
  }
}

function getNewChartData(entityOccurence) {
  return {
    // labels: ['O', 'PRO', 'ORG', 'VUL', 'ID', 'VER'],
    labels: ['Other', 'Product', 'Organization', 'Vulnerability', 'ID', 'Version'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          entityOccurence['O'] / 10.206 * 100,
          entityOccurence['PRO'] / 10.206 * 100,
          entityOccurence['ORG'] / 10.206 * 100,
          entityOccurence['VUL'] / 10.206 * 100,
          entityOccurence['ID'] / 10.206 * 100,
          entityOccurence['VER'] / 10.206 * 100,
        ],
        backgroundColor: backgroundColor1,
        borderColor: backgroundColor2,
        borderWidth: 1,
      },
    ],
  };
}

const occurenceOfLabel = 
  {
    // labels: ['O', 'PRO', 'ORG', 'VUL', 'ID', 'VER'],
    labels: ['Other', 'Product', 'Organization', 'Vulnerability', 'ID', 'Version'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          4.486,
          1.811,
          0.586,
          1.949,
          0.682,
          0.692,
        ],
        backgroundColor: backgroundColor1,
        borderColor: backgroundColor2,
        borderWidth: 1,
      },
    ],
  };

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

function isRelevant(row) {
  if(row) {
    return row['relevant'] == '1'
  }
  return false
}

 function getEntityIndexes(CSVObject) {
   let allEntites = []
   CSVObject.forEach((row) => {
     if(row) {
      allEntites.push(row['entities'])
     }
   })

   allEntites = allEntites.map((entites) => {
     return entites.split(" ")
   })

   const entityIdxCounter = {} 
   const entityOccurenceCounter = {}

   allEntites.forEach((entites) => {
     entites.forEach((entity, idx) => {
       if(entityIdxCounter.hasOwnProperty(entity)) {
         entityIdxCounter[entity] += idx
         entityOccurenceCounter[entity] += 1
       } else {
         entityIdxCounter[entity] = idx
         entityOccurenceCounter[entity] = 1
       }
     })
   })

   Object.keys(entityIdxCounter).forEach((key) => {
     entityIdxCounter[key] /= entityOccurenceCounter[key]
   })
   console.log(entityIdxCounter)
 }

function App() {
  const [chartData, setChartData] = useState(defaultChartData)
  const [tweetData, setTweetData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {

    let csvFileUrl = 'https://raw.githubusercontent.com/ndionysus/twitter-cyberthreat-detection/master/data/D1.csv'

    axios.get(csvFileUrl).then((response) => 
      {
        let object = CSVStringToObject(response.data)

        let CSVObject = object.filter((row) => isRelevant(row))

        const entityOccurence = getEntityOccurence(CSVObject)
        const scatterPlotData = getScatterPlotData(CSVObject)
        getEntityIndexes(CSVObject)
        console.log(scatterPlotData)
        const scatterPlotData2 = getScatterPlotData2(scatterPlotData)
        const newChartData = getNewChartData(entityOccurence)
        setChartData((chartData) => newChartData)
      }
    )
    csvFileUrl = 'https://raw.githubusercontent.com/kevin-a-nelson/cs-capstone-data/main/data/clean_D1.csv'

    axios.get(csvFileUrl).then((response) => 
      {
        const CSVObject = CSVStringToObject(response.data)
        setTweetData((tweetData) => CSVObject)
      })

  }, []);

    function Tweets() {
    if(!tweetData) {
      return
    }

    const tweets = []

    for(let i = 10; i < 200; i++) {
      if(tweetData[i]) {

        const text = tweetData[i]['clean']
        const entities = tweetData[i]['entities']

        if(text && entities) {
          const words = text.split(" ")
          const entitiesList = entities.split(" ")
          
          const wordsColor = []

          for(let i = 0; i < words.length; i++) {

            const color = entitiesList.length >= words.length ? entitiesList[i] : 'black'

            const wordLabelText = color === 'O' ? '' : ` (${color})`

            const wordColor = {
                'word': words[i],
                'color': color            
              }

            wordsColor.push(wordColor)
          }

          const labelToColor = {
            'O': 'Black',
            'PRO': COLORS.PRO,
            'ORG': 'rgba(255, 206, 86, 1)',
            'VUL': 'rgba(75, 192, 192, 1)',
            'ID': 'rgba(153, 102, 255, 1)',
            'VER': 'rgba(255, 159, 64, 1)'
          }

          const spans = []
          for(let i = 0; i < wordsColor.length; i++ ) {
            const word = <span style={{marginRight: '4px', color: `${labelToColor[wordsColor[i]['color']]}`}}>{wordsColor[i]['word']}</span>
            spans.push(word)
          }

          const tweet = 
          <div>
            <div key={i} style={{ width: '100%', margin: '0px auto', textAlign: 'left', wordWrap: 'break-word' }}>
              <p>{spans}</p>
              {/* <p>{entities}</p> */}
            </div>
              <Divider />
          </div>

            tweets.push(tweet)
        }
      }
    }
    return tweets
  }

  function content() {
    if(pageNumber === 1) {
      return (
        <div className='charts-container'>
            <Card title="The Purpose of this Website">
              <p></p>
              <p>The purpose of this website is to visualize the results of this <a href="https://arxiv.org/pdf/1904.01127.pdf">research paper.</a> It talks about an AI that can look at a tweet and classify whether or not it’s talking about a cyber threat.   For example, if a tweet reads “flash exploit found in seven exploit kits”, the AI would recognize that it’s talking about a cyberthreat and classify it as a cyber threat tweet. </p>
            </Card>
            <div style={{height: '3vh'}}></div>
            <Card title="How the AI processes Tweets">
              <p style={{textAlign: 'left'}}>
                The AI processes tweets by labeling each word. For example, the AI labels microsoft as ORG meaning orgnization. After labeling each word, it scans each label in relation to each other to gain an understanding of the tweet as a whole.
              </p>
            </Card>,
            <Card title="Word Types Color Code">
              <div style={{display: 'flex'}}>
                <div style={{textAlign: 'left', width: '33%'}}>
                  <Badge style={{marginRight: '10px'}}color={COLORS.USELESS} text="Other ( O )" />
                  <Badge style={{marginRight: '10px'}}color={COLORS.PRO} text="Product ( PRO )" />
                </div>
                <div style={{textAlign: 'center', width: '33%'}}>
                  <Badge style={{marginRight: '10px'}}color="rgba(255, 206, 86, 1)" text="Organization ( ORG )" />
                  <Badge style={{marginRight: '10px'}}color="rgba(75, 192, 192, 1)" text="Vulnerability ( VUL )" />
                </div>
                <div style={{textAlign: 'right', width: '33%'}}>
                  <Badge style={{marginRight: '10px'}}color="rgba(153, 102, 255, 1)" text="Identification ( ID )" />
                  <Badge style={{marginRight: '10px'}}color="rgba(255, 159, 64, 1)" text="Version ( VER )" />
                </div>
              </div>
              </Card>
              <div style={{height: '3vh'}}></div>
            <div className='tweets-container'>
              <Card title="Tweets">
                {Tweets()}
              </Card>
            </div>
        </div>
      )
    }

    if(pageNumber === 2) {
      return (
          <div className="charts-container">
            <Card title="Average Composition of a Cyber Tweet by Word Type">
              <p style={{textAlign: 'center'}}>
                VUL and PRO words often come in chains while, ID and VER often come in singles.
              </p>
              <p style={{textAlign: "Center"}}>Due to this VUL and PRO words make up a bigger percetange of a cyber tweets.</p>
              <Divider orientation='left' textAlign='left'>Example: </Divider>
              {/* <Card> */}
                <div style={{textAlign: 'center'}}>
                    <p>
                      vuln <span style={{color: COLORS.ORG}}>SAP</span> <span style={{color: COLORS.PRO}}>business objects explorer</span> <span style={{color: COLORS.VUL}}>information disclosure vulnerability</span>
                    </p>
                </div>
              {/* </Card> */}
              <Divider />
              <Pie data={chartData} />
            </Card>
          </div>
      )
    }

    if(pageNumber === 3) {
      return (
        <div className="charts-container">
          <Card title="Average Number of Each Word type Per Tweet">
            <p style={{textAlign: 'center'}}>
              <p>This graph is the similiar to the previous graph expect it shows the count instead of a percentage.</p>
            </p>
            <Divider />
            <PolarArea data={occurenceOfLabel} />
          </Card>
        </div>
      )
    }

    if(pageNumber === 4) {
      return (
        <div className="charts-container">
          <Card title="Average Position of each word type in a Cyber Tweet">
          <p>
            VUL words have a high index so their often at the end of a tweet.
          </p>
          <p>
            ORG words have a low index so their often at the beginning.
          </p>
          <Divider orientation='left'>Example</Divider>
          <p>threatmeter <span style={{color: COLORS.ORG}}>microsoft</span> <span style={{color: COLORS.PRO}}>windows kernel</span> dll <span style={{color: COLORS.VUL}}>priviledge escalation</span></p>
            <Divider />
            <RadarChart />
          </Card>
        </div>
      )
    }

    if(pageNumber === 5) {
      return (
        <div className="charts-container">
          <Card title="What word type is often next to ID words?">
            <p>ID words often pair with Product words.</p>
            <p>This makes sense since most products have an ID.</p>
            <Divider orientation='left'>Example</Divider>
            <p><span style={{color: COLORS.ID}}>ms16-155</span> security update for <span style={{color: COLORS.PRO}}>.net framework</span> <span style={{color: COLORS.ID}}>3205640</span></p>
            <br></br>
            <Divider orientation='left'>First pair vs Second Pair</Divider>
            <p>First ID Pair Example: <span style={{color: COLORS.ID}}>cve2016-6803</span> <span style={{color: COLORS.PRO}}>apache</span></p>
            <p>Second ID Pair Example:  <span style={{color: COLORS.PRO}}>apache</span> <span style={{color: COLORS.ID}}>cve2016-6803</span></p>
            <Divider />
            <PairsWithID />
          </Card>
        </div>
      )
    }

    if(pageNumber === 6) {
      return (
        <div className="charts-container">
          <Card title="What word type is often next to Other words?">
            <p>Other words pair with other words often because</p>
            <p>they make up the majiority of a cyber tweet.</p>
            <Divider orientation='left'>Example</Divider> 
            <p>
              sanfrancisco transit ransomware attacker likely usedyear-old <span style={{color: COLORS.PRO}}>Java</span> exploit
            </p>
            <Divider />
            <PairsWithO />
          </Card>
        </div>
      )
    }

    if(pageNumber === 7) {
      return (
        <div className="charts-container">
          <Card title="What word type is often next to Organization Words?">
            <p>
              Organization words often pair with Product words 
            </p>
            <p>
              because the organization is often mentioned before a product.
            </p>
            <p>
              However the product is almost never mentioned before the product.
            </p>
            <p>
              so PRO ORG pairs are scarce.
            </p>
            <Divider orientation='left'>Example</Divider>
            <p>threatmeter  <span style={{color: COLORS.ORG}}>microsoft</span>  <span style={{color: COLORS.PRO}}>windows kernel</span> ntsetwindowlongptr <span style={{color: COLORS.VUL}}>priviledge escalation</span></p>
            <Divider />
            <PairsWithORG />
          </Card>
        </div>
      )
    }
    if(pageNumber === 8) {
      return (
        <div className="charts-container">
          <Card title="What word type is often next to Product words?">
            <p>
              Version words are often next to product words since products often have versions.
            </p>
            <Divider orientation='left'>Example</Divider>
            <p>
              samri10 <span style={{color: COLORS.ORG}}>windows</span> <span style={{color: COLORS.VER}}>10</span> hardening tool for thwarting network recon
            </p>
            <Divider/>
            <PairsWithVER />
          </Card>
        </div>
      )
    }

    if(pageNumber === 9) {
      return (
        <div className="charts-container">
          <Card title="What word type is often next to Vulnerability words?">
            <p>
              Vulnerability words often pair with other vulnerability words because they come in chains.
            </p>
            <Divider orientation='left'>Example</Divider>
            <p>
              threatmeter vuln <span style={{color: COLORS.ORG}}>microsoft</span> <span style={{color: COLORS.PRO}}>office</span> <span style={{color: COLORS.ID}}>cve2016-2016-7266</span> <span style={{color: COLORS.VUL}}>remote code execution vulnerability</span>
            </p>
            <Divider />
            <PairsWithVUL />
          </Card>
        </div>
      )
    }
  }

  return (
    <div className="App">
      <div style={{height: '3vh'}}></div>
      <div style={{width: '600px', margin: '0px auto', justifyContent: 'space-between', display: 'flex'}}>
        <Button 
          type="primary"
          ghost
          onClick={() => setPageNumber((pageNumber) => pageNumber > 1 ? pageNumber - 1 : pageNumber )} 
          style={{visibility: pageNumber >= 2 ? 'visible' : 'hidden'}}>
            {'<'} Back
        </Button>
        {
          pageNumber === LAST_PAGE_NUMBER ? 
          <Button 
            type="primary"
            ghost
            onClick={() => setPageNumber((pageNumber) => 1)}
            >
              Go to Beginning {'>'}
          </Button>
          :
          <Button 
            type="primary"
            ghost
            onClick={() => setPageNumber((pageNumber) => pageNumber + 1)}
            >
              Next {'>'}
          </Button>
        }
      </div>
      <div style={{height: '3vh'}}></div>
      {
        pageNumber === 1 ? null :
        <div className='charts-container'>
          <Card title="Word Types Color Code">
            <div style={{display: 'flex'}}>
              <div style={{textAlign: 'left', width: '33%'}}>
                <Badge style={{marginRight: '10px'}}color={COLORS.USELESS} text="Other ( O )" />
                <Badge style={{marginRight: '10px'}}color={COLORS.PRO} text="Product ( PRO )" />
              </div>
              <div style={{textAlign: 'center', width: '33%'}}>
                <Badge style={{marginRight: '10px'}}color="rgba(255, 206, 86, 1)" text="Organization ( ORG )" />
                <Badge style={{marginRight: '10px'}}color="rgba(75, 192, 192, 1)" text="Vulnerability ( VUL )" />
              </div>
              <div style={{textAlign: 'right', width: '33%'}}>
                <Badge style={{marginRight: '10px'}}color="rgba(153, 102, 255, 1)" text="Identification ( ID )" />
                <Badge style={{marginRight: '10px'}}color="rgba(255, 159, 64, 1)" text="Version ( VER )" />
              </div>
            </div>
          </Card>
          </div>
      }
        <div style={{height: '3vh'}}></div>
      {content()}
      <div style={{height: '3vh'}}></div>
      <div style={{width: '600px', margin: '0px auto', justifyContent: 'space-between', display: 'flex'}}>
        <Button 
          type="primary"
          ghost
          onClick={() => setPageNumber((pageNumber) => pageNumber > 1 ? pageNumber - 1 : pageNumber )} 
          style={{visibility: pageNumber > 1 ? 'visible' : 'hidden'}}>
            {'<'} Back
        </Button>
        {
          pageNumber === LAST_PAGE_NUMBER ? 
          <Button 
            type="primary"
            ghost
            onClick={() => setPageNumber((pageNumber) => 1)}
            >
              Go to Beginning {'>'}
          </Button>
          :
          <Button 
            type="primary"
            ghost
            onClick={() => setPageNumber((pageNumber) => pageNumber + 1)}
            >
              Next {'>'}
          </Button>
        }
      </div>

      <div className='App-container'>

        <div style={{height: '3vh'}}></div>

      </div>
    </div>
  );
}

export default App;
