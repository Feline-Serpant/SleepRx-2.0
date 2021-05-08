import React from 'react'

const SleepForm = () => {



    // handleSubmit = (e) => {
    //     console.log(e.target)
    // }
    return (
        <div>
            <form onSubmit='{}'>
                <label>Coffee Intake</label>
                <input type="text" placeholder="coffee" ></input>
                <label>Water Intake</label>
                <input type="text" placeholder="chug"></input>
                <label>exercise Intake</label>
                <input type="text" placeholder="workout"></input>
                <select>
                    <option disabled>Mood</option>
                    <option>Feelin Good</option>
                    <option>could be better</option>
                </select>
                <input type="submit"></input>

            </form> 
        </div>
    )
}

export default SleepForm
