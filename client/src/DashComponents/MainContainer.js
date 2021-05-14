import React, {useState, useEffect} from 'react'
import SleepForm from './SleepForm'
import SleepEntry from './SleepEntry'
import Graph from './Graph'

 const MainContainer = (props) => {
    // console.log("MainContainer", props.sleepData)
    const [appState, setAppState] = useState([]) 
    //     ^state,      ^.setState({})        ^initial state
    //      new state[{},{}, etc.]
    const [sleepState, setSleepState] = useState([]) 
    
    
  
    useEffect(() => {
    
      fetch("/api/sleep")
      .then(r => r.json())
      .then((sleep) => {
         console.log("sleep fetch", sleep)
         setSleepState(sleep)
        //  console.log("sleep fetch", sleep)
      }).catch(err => console.log(err))
      
    }, [])
    const sleep = sleepState
    console.log(sleep)
    console.log("new state",sleepState)
   
  

    // if (sleep.isLoggedIn === false) {

    // }
    ;
    sleepState.sort((a,b)=>{;
        ;
        const bdate = b.date.split('-')
        const adate = a.date.split('-')
        //console.log(adate)
        return bdate[0] - adate[0] || bdate[1] - adate[1] || bdate[2] - adate[2];
    })

    // console.log("MainContainer state", sleep)
    // console.log("user stuff", props.userData)
    const sleepEntries = sleepState.map((sleep) => (
        // console.log("mapped", sleep)
       <SleepEntry  key={sleep.sleepid} sleep={sleep} entryDate={sleep.date} />
        
  ))
   
    return (
        <div className="containerG">
         
            <SleepForm  />
            <div className="graphContainer">
            <Graph sleepData={sleepState}/>
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