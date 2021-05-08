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
  const initialState = {
    username: "",
    password: "",
  }
  
  //vvv----equiv of state={}---vvv
  const [appState, setAppState] = useState(initialState) //useState returns 2 vars defined in brackets, and set to value in parens
  // useState(0) returns a pair of values: the current state and a function that updates it
  
  ////vvv---- <p>You clicked {this.state.count} times</p>---vvv
  //vvv------  <p>You clicked {count} times</p> -------vvv
  
  // In a class, we need to call this.setState() to update the count state:
  
  //   <button onClick={() => this.setState({ count: this.state.count + 1 })}> Click me </button>
  // In a function, we already have setCount and count as variables so we don’t need this:
  
  //   <button onClick={() => setCount(count + 1)}> Click me</button>


//Step 1:

//FOR USE IN OAUTH LATER: Request a user's GitHub identity
//GET https://github.com/login/oauth/authorize

//Params:
//client_id: Required. The client ID you received from GitHub when you registered.
//redirect_uri: Required. The client ID you received from GitHub when you registered. needs to be our actual app page with the trakcer items
//login: Suggests a specific account to use for signing in and authorizing the app. self-explanatory
//scope: don't need(?) seems to redirect as needed
//state: An unguessable random string. It is used to protect against cross-site request forgery attacks.
//allow_signup: don't need.

//Step 2:

//Exchange this code for an access token:
//POST https://github.com/login/oauth/access_token

//Params:
//client_id: 	Required. The client ID you received from GitHub for your OAuth App.
//client_secret: 	Required. The client secret you received from GitHub for your OAuth App.
//code: 	Required. The code you received as a response to Step 1.
//redirect_uri: The URL in your application where users are sent after authorization.
//state: 	The unguessable random string you provided in Step 1.

//Step 3:
// The access token allows you to make requests to the API on a behalf of a user.

// Authorization: token OAUTH-TOKEN
// GET https://api.github.com/user

//For example, in curl you can set the Authorization header like this:
//curl -H "Authorization: token OAUTH-TOKEN" https://api.github.com/user

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
        <p>
        Here we go!
        </p>
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
