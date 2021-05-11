import React from 'react'
import { Line } from "react-chartjs-2";
const Graph = (props) => {

    const sleep = props.sleepData
//dates being sorted to display in timeline properly
    sleep.sort((a,b)=>{
        
      const bdate = b.date.split('-')
      const adate = a.date.split('-')
      console.log(adate)
      return adate[0] - bdate[0] || adate[1] - bdate[1] || adate[2] - bdate[2];
  })
//getting just sleep dates
    const sleepEntryDate = sleep.map((sleep) => (
        // console.log("mapped", sleep)
        sleep.date
  ))
//getting just score
  const sleepEntryScore = sleep.map((sleep) => (
    // console.log("mapped", sleep)
    sleep.score 
))
//optimized the overall sleep score... will break down the optimization by category later, running out of time
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
//graph data below sorry guys running out of time we can talk about this if it's unclear
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
