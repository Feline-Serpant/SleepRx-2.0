import vincent from './vincent.svg';
import './styles.scss';
import React, { useState } from 'react';
import MainContainer from './DashComponents/MainContainer'
import NavBar from './components/NavBar'
import Home from './components/Home'
import About from './components/About'

import Form from './components/Form'
import { Route, withRouter, Switch } from 'react-router';


const App = () => {
 
  //vvv----equiv of state={}---vvv
  const [appState, setAppState] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    username: "",
    password: ""
  }) 
  
  //useState returns 2 vars defined in brackets, and set to value in parens
  // useState(0) returns a pair of values: the current state and a function that updates it
  
  ////vvv---- <p>You clicked {this.state.count} times</p>---vvv
  //vvv------  <p>You clicked {count} times</p> -------vvv
  
  // In a class, we need to call this.setState() to update the count state:
  
  //   <button onClick={() => this.setState({ count: this.state.count + 1 })}> Click me </button>
  // In a function, we already have setCount and count as variables so we don’t need this:
  
  //   <button onClick={() => setCount(count + 1)}> Click me</button>

  //___________________state rerendering____________________//

  const addSleepEntry = (createdSleepEntry) => {
    console.log('from app render func', createdSleepEntry)
    // const copyOfState = [...appState, createdSleepEntry]
    // let copyOfUser = {
    //   ...this.state.user, 
    //   trips: copyOfTrips
    // }
    // this.setState({
    //   user: copyOfUser
    // })
  }




  //___________________route rendering____________________//
  const renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form
        formName="Login"
        // user={state.user}
        // handleSubmit={this.handleLoginSubmit}
        // handleLoginGithub={this.handleLoginGithub}
       
      />
    } else if (routerProps.location.pathname === "/register") {
      return <Form
      formName="Register To Begin"
      
      // handleSubmit={handleRegisterSubmit}
      // handleLoginGithub={handleLoginGithub}
      />
    }
  }
  // const renderForm = () => {
  //   //if register is clicked render register form else i render login form
  //   return <Form userData={appState} />
  // }

  const renderMain = () => {
    return <MainContainer userData={appState} />
  }
  const renderAbout = () => {
    return <About />
  }
 


  return (
    <div className="App">
      <header className="App-header">
        <img src={vincent} className="App-logo" alt="logo" />
      </header>
        <h2>
        SleepRx
        </h2>
        <style>
              @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap')
        </style>
        <NavBar/>  
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login" render={renderForm}/>
          <Route path="/register" render={renderForm}/>
          <Route path="/tracker" render={renderMain} />
         
          <Route path="/about" render={renderAbout} />
          {/* <Route path="/about" render={renderErrorPage} /> */}
        </Switch>
        
    </div>
  );
}
let RouterComponent = withRouter(App)
export default RouterComponent;
