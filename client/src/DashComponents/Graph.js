import React from 'react'
import { Line } from "react-chartjs-2";
const Graph = (props) => {

    const sleep = props.sleepData

    const sleepEntryDate = sleep.map((sleep) => (
        // console.log("mapped", sleep)
        sleep.date
  ))

  const sleepEntryScore = sleep.map((sleep) => (
    // console.log("mapped", sleep)
    sleep.score 
))

const sleepEntryScoreOptimized = sleep.map((sleep) => (
    // console.log("mapped", sleep)
    
    sleep.score + ( sleep.score * 20 / 100)
))
    // const verifyNotNull = (sleep) => {
    //     const notNull = []
    //     for(let obj in array){
    //         if(Object.values(obj) !== null){
                
    //             notNull.push(obj.score)
                
    //         }
            
    //     }
    //     return notNull
    // }
    // const notNull = verifyNotNull(sleep)
  //console.log(verifyNotNull)
  
  console.log("sleep entries", sleepEntryScore)

    const data = {
        labels: sleepEntryDate,
        datasets: [
          {
            label: "Current Sleep",
            data: sleepEntryScore,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
          {
            label: "Optimized Sleep",
            data: sleepEntryScoreOptimized,
            fill: false,
            borderColor: "#742774"
          }
        ]
      };

    return (
        <div className="">
             <Line className="graph" data={data}/>
        </div>
    )
}

export default Graph
