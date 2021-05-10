import React, {useState}  from 'react'

const SleepEntry = (props) => {

    const {bed_time, caffeine_intake, calorie_intake, exercise_time, date, hours_slept, mood, score, wake_time, sleepid } = props.sleep
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
        <div className="entry">

            <h2>date {date}</h2>
            <div className="catContent">
                <h3>Bed time      {bed_time}</h3>
                <h3>Wake time      {wake_time}</h3>
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
