import React from 'react'
import SleepForm from './SleepForm'
import SleepEntry from './SleepEntry'

 const MainContainer = (props) => {
    // console.log("MainContainer", props.sleepData)


    const sleep = props.sleepData
    // console.log("MainContainer state", sleep)
    // console.log("user stuff", props.userData)
    const sleepEntries = sleep.map((sleep) => (
        // console.log("mapped", sleep)
       <SleepEntry key={sleep.sleepid} sleep={sleep} entryDate={sleep.date} />
  
  ))
   
    return (
        <div>
            <h2>Hi from main </h2>
            <SleepForm addSleepEntry={props.addSleepEnrtry} userData={props.userData}/>
            {sleepEntries}
            {/* <SleepEntry key={sleep.sleepid} sleep={sleep} entryDate={sleep.date} /> */}
            {/* <SleepEntry key={sleep.sleepid} sleep={sleep} entryDate={sleep.date} /> */}

        </div>
    )
}
export default MainContainer