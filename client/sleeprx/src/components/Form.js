import React from 'react'

const Form = (props) => {



    // let handleSubmit = (e) => {
    //     e.preventDefault()
    //     // this.props.handleSubmit(this.state)
    //   }
    
    let handleSubmit = (e) => {
          e.preventDefault()
        
        // console.log("made it to handle sub")
        // const user = this.props.users.find(user => user.username === this.state.username)
        // console.log(user, "user & handle sub")
        // return this.props.currentUser(user)
        
    }
    
    const handleChange = (e) => {
        // let {name, value} = e.target
        // this.setState({
        //   [name]: value
        // })
      }

    let {formName} = props
    // let {name, username, password} = state
    return (
        <div>
             <form onSubmit={handleSubmit}>

                <div className="form">
                <h2>{formName}</h2>
                <h3>Hey, Good to see you! </h3>
                <div className="formContent">
                    <label htmlFor="name">Name:</label>
                    <input className="input" type="text" autoComplete="off" name="name" value="{name}" onChange={handleChange}/><br/>
                    <label htmlFor="username">Username:</label>
                    <input className="input" type="text" autoComplete="off" name="username" value="{username}" onChange={handleChange}/><br/>
                    <label htmlFor="password">Password:</label>
                    <input className="input" type="password" autoComplete="off" name="password" value="{password}" onChange={handleChange}/><br/>
                </div>
                    <input className="submitButton" type="submit" value="Submit"/>
                    <h3>Or Authenticate with </h3>
                    <a href="https://imgur.com/N4okLOv"><img src="https://i.imgur.com/N4okLOv.png" title="" /></a><br/>
                    {/* <img src={github} className="" alt="github"  /> */}
                    {/* <button onClick={props.handleLoginGithub}>GITHUB</button> */}
                </div>
                </form>
        </div>
    )
}

export default Form
