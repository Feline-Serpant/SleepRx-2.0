import React from 'react'

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
    const {bed_time, caffeine_intake, calorie_intake, exercise_time, date, hours_slept, mood, score, wake_time } = props.sleep
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

    

    return (
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
            </div>
        </div>
    )
}

export default SleepEntry
