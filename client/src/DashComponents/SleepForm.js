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
        console.log(e.target)
        console.log(values)
        const userid = props.userData[0].userid
        console.log("post treq user", userid)
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
        <div className="catForm">
            <form onSubmit={handleSubmit}>
                <label>Enter Date</label>
                <input className="c-input" type="date" name="date" placeholder="" value={date || ""} onChange={handleChange} ></input>
                <label>Bed Time</label>
                <input className="c-input" type="time" name="bed_time"placeholder="" value={bed_time || ""} onChange={handleChange}></input>
                <label>Rise O'clock</label>
                <input className="c-input" type="time" name="wake_time" placeholder="" value={wake_time || ""} onChange={handleChange}></input>
                <label>Hours Slept</label>
                <input className="c-input" type="number" name="hours_slept" placeholder="Hours Slept" value={hours_slept || ""} onChange={handleChange}></input><br/>
                <label>Workout</label>
                <input className="c-input" type="number" name="exercise_time" placeholder="minutes" value={exercise_time || ""} onChange={handleChange}></input>
                <label>Caffeine Intake</label>
                <input className="c-input" type="number" name="caffeine_intake" placeholder="Number of Cups" value={caffeine_intake || ""} onChange={handleChange}></input>
                <label>Caloric Intake</label>
                <input className="c-input" type="number" name="calorie_intake" placeholder="ex: 2000" value={calorie_intake || ""} onChange={handleChange}></input>
                <label>Mood  </label>
                <select className="c-options" name="mood" placeholder="Mood"  value={mood || ""} onChange={handleChange}>
                    <option className="c-options" selected="true" disabled="disabled">Mood</option>
                    <option className="c-options" value="3" placeholder="Feeling Good">Feeling Good</option>
                    <option className="c-options" value="2">Average Day</option>
                    <option className="c-options" value="1">Don't Talk to Me</option>
                </select>
                <input className="submitButton" type="submit"></input>

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