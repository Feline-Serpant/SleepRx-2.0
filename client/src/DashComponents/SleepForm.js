import React from 'react'
//import { useForm } from "react-hook-form"
import useSleepForm from "./useSleepForm"

//score, hours slept and user Id need to be figured out by me in react -coral
//id grabbed by user logged in state 
//score only calculated if hrs slept in state is not null

const SleepForm = (props) => {

    const [values, handleChange] = useSleepForm()

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(e.target)
        // console.log(values)
        const userid = props.userData[0].userid
        // console.log("post treq user", userid)
        fetch(`/api/`, {
            method: "POST",
            headers: {
            
            "content-type": "application/json"
            },
                body: JSON.stringify({
                    
                    values
                })
            })
            .then(r => r.json())
            .then((createdSleepEntry) => {
                props.addSleepEntry(createdSleepEntry)
        })
    }


    const {date, bed_time, wake_time, hours_slept, exercise_time, caffeine_intake, calorie_intake, mood} = values
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter Date</label>
                <input type="date" name="date" placeholder="" value={date || ""} onChange={handleChange} ></input>
                <label>Bed Time</label>
                <input type="time" name="bed_time"placeholder="" value={bed_time || ""} onChange={handleChange}></input>
                <label>Rise O'clock</label>
                <input type="time" name="wake_time" placeholder="" value={wake_time || ""} onChange={handleChange}></input>
                <label>Hours Slept</label>
                <input type="number" name="hours_slept" placeholder="Hours Slept" value={hours_slept || ""} onChange={handleChange}></input><br/>
                {/* <label>Water Intake</label> */}
                <input type="number" name="exercise_time" placeholder="Workout Length" value={exercise_time || ""} onChange={handleChange}></input>
                {/* <label>exercise Intake</label> */}
                <input type="number" name="caffeine_intake" placeholder="Cups of Caffeine" value={caffeine_intake || ""} onChange={handleChange}></input>
                <input type="number" name="calorie_intake" placeholder="Calorie Intake" value={calorie_intake || ""} onChange={handleChange}></input>
                <select name="mood" placeholder="Mood"  value={mood || ""} onChange={handleChange}>
                    <option disabled>Mood</option>
                    <option placeholder="Feeling Good">3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
                <input type="submit"></input>

            </form> 
        </div>
    )
}

export default SleepForm


{/* <select>
                    <option disabled>Bed Time</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>midnight</option>
                    <option>12</option>
                    <option>1</option>
                    <option>8</option>
                    <option>8</option>
                    <option>8</option>
                    <option>8</option>
                    <option>8</option>
                    
                </select> */}