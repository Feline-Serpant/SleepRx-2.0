import React from 'react'
import SleepForm from './SleepForm'
import SleepEntry from './SleepEntry'
import Graph from './Graph'

 const MainContainer = (props) => {
    console.log("MainContainer", props.sleepData)


    const sleep = props.sleepData
    console.log("MainContainer state", sleep)
    console.log("user stuff", props.userData)
    const sleepEntries = sleep.map((sleep) => (
        // console.log("mapped", sleep)
       <SleepEntry  key={sleep.sleepid} sleep={sleep} entryDate={sleep.date} />
        
  ))
   
    return (
        <div className="containerG">
         
            <SleepForm userData={props.userData} />
            <div className="graphContainer">
            <Graph sleepData={props.sleepData}/>
            </div>
            <div className="entries">
            {sleepEntries}
            </div>
            {/* <SleepEntry key={sleep.sleepid} sleep={sleep} entryDate={sleep.date} /> */}
            {/* <SleepEntry key={sleep.sleepid} sleep={sleep} entryDate={sleep.date} /> */}

        </div>
    )
}
export default MainContainer