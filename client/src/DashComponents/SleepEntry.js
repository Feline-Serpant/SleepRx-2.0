import React from 'react'

const SleepEntry = (props) => {
    const {bed_time, caffeine_intake, calorie_intake, exercise_time, date, hours_slept, mood, score, wake_time } = props.sleep
    // console.log(props.sleep)
    return (
        <div>
            <h3>date {date}</h3>
            <h3>bed_time {bed_time}</h3>
            <h3>wake_time {wake_time}</h3>
            <h3>hours_slept {hours_slept}</h3>
            <h3>caffeine_intake {caffeine_intake}</h3>
            <h3>calorie_intake {calorie_intake}</h3>
            <h3>exercise_time {exercise_time}</h3>
            <h3>mood {mood}</h3>
            <h2>score {score}</h2>
        </div>
    )
}

export default SleepEntry
