import React from 'react';
import github from '../github.svg';
import google from '../google.svg';
//import { useState } from 'react';
//import { useForm } from "react-hook-form"
import useForm from "./useForm"


const Form = (props) => {
    // const [formState, setFormState] = useState({
        
    //     first_name: "",
    //     last_name: "",
    //     username: "",
    //     password: ""
    
    
    //   })

  
    
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);


    // let handleSubmit = (e) => {
    //     e.preventDefault()
    //     // this.props.handleSubmit(this.state)
    //   }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formState)
       if(props.formName === 'Register To Begin'){
        fetch('/api/register', {
              
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        
                     formState
                    })
                  }).then( res => res.json())
                  .then(createdSleepEntry => {
                      props.createUser(createdSleepEntry)
                  }).console.log(err => {console.log(err)})
        }
       
    }
    
    // const handleChange = (e) => {
    //     const {name, value} = e.target
    //     console.log(e.target.value)

    //     setFormState({ 
    //         [name]: value
    //     })
    //}     

    const [formState, handleChange ] = useForm();
    
    let {formName} = props
    let {first_name, last_name, username, password} = formState
    //console.log("state in decon", useState())
    return (
        <div>
             <form onSubmit={handleSubmit}>

                <div className="form">
                <h2>{formName}</h2>
                <h3>Hey, Good to see you! </h3>
                <div className="formContent">
                    <label htmlFor="name">First Name:</label>
                    <input className="input" type="text" autoComplete="off" name="first_name" value={first_name } onChange={handleChange}/><br/>
                    <label htmlFor="name">Last Name:</label>
                    <input className="input" type="text" autoComplete="off" name="last_name " value={last_name } onChange={handleChange}/><br/>
                    <label htmlFor="username">Username:</label>
                    <input className="input" type="text" autoComplete="off" name="username" value={username } onChange={handleChange}/><br/>
                    <label htmlFor="password">Password:</label>
                    <input className="input" type="password" autoComplete="off" name="password" value={password } onChange={handleChange}/><br/>
                </div>
                    <input className="submitButton" type="submit" value="Submit"/>
                    <h3> Or Authenticate with </h3>
                <div className="loginBtm">
                    <a className="gitLogo" href="https://github.com/"><img src={github} alt="github" onClick={props.handleLoginGithub}  title="Github" /></a>
                    <a className="gitLogo" href="https://github.com/"><img src={google} alt="github" onClick={props.handleLoginGithub}  title="Github" /></a>
                </div>
                    {/* <img src={github} className="gitLogo"  />  */}
                    {/* <button onClick={props.handleLoginGithub}>GITHUB</button> */}
                </div>
                </form>
        </div>
    )
}

export default Form
