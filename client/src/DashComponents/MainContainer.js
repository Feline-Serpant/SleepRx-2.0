import React from 'react'
import SleepForm from './SleepForm'
import SleepEntry from './SleepEntry'
import Graph from './Graph'

 const MainContainer = (props) => {
    // console.log("MainContainer", props.sleepData)


    const sleep = props.sleepData
    
    sleep.sort((a,b)=>{
        
        const bdate = b.date.split('-')
        const adate = a.date.split('-')
        console.log(adate)
        return bdate[0] - adate[0] || bdate[1] - adate[1] || bdate[2] - adate[2];
    })

    // console.log("MainContainer state", sleep)
    // console.log("user stuff", props.userData)
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