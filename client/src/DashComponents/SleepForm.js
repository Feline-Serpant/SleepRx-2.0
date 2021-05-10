import React from 'react'
//import { useForm } from "react-hook-form"
import useSleepForm from "./useSleepForm"

//score, hours slept and user Id need to be figured out by me in react -coral
//id grabbed by user logged in state 
//score only calculated if hrs slept in state is not null

const SleepForm = (props) => {

    
    // If no entry exists, post request.
    

    const [values, handleChange] = useSleepForm()
    // console.log(values)
    const {date, bed_time, wake_time, hours_slept, exercise_time, caffeine_intake, calorie_intake, mood} = values
    let entryExists = false;
    if(date){
        // fetch request to db to check if entry exists
        // If entry exists, update state with current entry, and change handleSubmit to be a patch request.
        //console.log("date has proper length")
        fetch('/api/confirm', {
            method: "PATCH",
            headers: {
                 "content-type": "application/json"
            },
            body: JSON.stringify({date: date})
            })
            .then(res => res.json())
            .then(confirmed => {
                if(confirmed) entryExists = true;
            })
            .catch(err => console.log(err))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
        console.log(values)
        
        // ! Make conditional statements on Post/Patch based on date field completion.
        // ? when date field length is 10 chararcters, get request to DB checking if entry exists.
   

        const userid = props.userData[0].userid
        console.log("post treq user", userid)
        console.log(entryExists)
        if(entryExists) {
            // fetch...method: "GET"
            fetch(`/api/update`, {
                method: "PATCH",
                headers: {
                
                "content-type": "application/json"
                },
                    body: JSON.stringify({
                        
                        values
                    })
                })
                .then(r => r.json())
                .then((updatedEntry) => {
                    console.log(updatedEntry)
            })
        }
        if(!entryExists){
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
      
    }


    
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
                    <option className="c-options" value="" selected="true" disabled="disabled">Select Mood</option>
                    <option className="c-options" value="3">Feeling Good</option>
                    <option className="c-options" value="2">Average Day</option>
                    <option className="c-options" value="1">Don't Talk to Me</option>
                </select>
                <input className="submitButton" type="submit"></input>

            </form> 
        </div>
    )
}

export default SleepForm

{/*<option className="c-options" selected="true" disabled="disabled">Select Mood</option> */}

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