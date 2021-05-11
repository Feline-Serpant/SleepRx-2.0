import React, {useState}  from 'react'

const SleepEntry = (props) => {

//     sleepid: 53,
//     userid: null,
//     bed_time: 2100,
//     wake_time: 600,
//     hours_slept: 8,
//     exercise_time: 1,
//    caffeine_intake: 1,
//     calorie_intake: 1000,
//     mood: 3,
//     score: 9,
//     date: '2021-04-30'

    //
    const {bed_time, caffeine_intake, calorie_intake, exercise_time, date, hours_slept, mood, score, wake_time, sleepid } = props.sleep
    console.log('SLEEP PROPS', props.sleep)
    console.log('BED TIME', bed_time)
    const updatedTime = (time) => {
        if(time !== null){
        const str = time.toString()
        const paddedStr = str.padStart(4, 0)
        const splitStr = paddedStr.split('')
        
          splitStr.splice(2, 0, ':')
            console.log(splitStr.join(''))
            return splitStr
          }
      }
      const new_bed_time =  updatedTime(bed_time);
      const new_wake_time = updatedTime(wake_time);

    // console.log(props.sleep)
    // console.log(bed_time)
    // const bedString = bed_time.toString()
    // const updateBedTime = (time) => {
    //     if(bed_time !== null){
    //         let bed_time = bed_time.toString()
    //         for (let i = 0; i < str.length; i++) {
    //             console.log(str[i]);
    //           }
    //     }
    // }
    //const bedTime = 


    //create a delete button on each render of sleep entries
    //the fetch (delete) request will need to accept either
    //1. sleepid ONLY
    //2. sleepid AND userid (dependant on if login state is working).

    const handleDelete = () => {
        console.log("delete request for ", sleepid)
        fetch('/api/delete',{
            method: "DELETE",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(props.sleep)
        })
            .then(res => res.json())
            .then(data => {
                // console.logg(data)
                // deleteSleepEntry(data);
            })
            .catch(err => console.log(err))
            location.reload();
    }

    return (

    //passed props into the functional component and deconstructed the props on line 18 these are not imported by magic
        <div className="entry">

            <h2>date {date}</h2>
            <div className="catContent">
                <h3>Bed time      {new_bed_time}</h3>
                <h3>Wake time      {new_wake_time}</h3>
                <h3>Hours slept      {hours_slept}</h3>
                <h3>Caffeine intake      {caffeine_intake}</h3>
                <h3>Caloric intake      {calorie_intake}</h3>
                <h3>Exercise time      {exercise_time}</h3>
                <h3>Mood      {mood}</h3>
                <h2>Score {score}</h2>
                <button className="submitButton" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default SleepEntry
