import vincent from './vincent.svg';
import SleepRx_Logo from './SleepRx_Logo.svg';
import styles from './scss/styles.scss';
import React, { useState, useEffect } from 'react';
import MainContainer from './DashComponents/MainContainer'
import NavBar from './components/NavBar'
import Home from './components/Home'
import About from './components/About'
import DreamJournal from './components/DreamJournal'
import Form from './components/Form'
import { Route, withRouter, Switch } from 'react-router';
import { useHistory } from 'react-router-dom';
const  history = useHistory



const App = () => {
 

  //CORAL'S NOTES FOR THE TEAM TO GET A HANDLE ON MY HOOKS

  //vvv below----  equiv of this.state={}  --- below vvv
  //useState returns 2 vars defined in brackets, and set to value in parens
  // useState(0) returns a pair of values: the current state and a function that updates it
  
  ////vvv---- <p>You clicked {this.state.count} times</p>---vvv
  //vvv------  <p>You clicked {count} times</p> -------vvv
  
  // In a class, we need to call this.setState() to update the count state:
  
  //   <button onClick={() => this.setState({ count: this.state.count + 1 })}> Click me </button>
  // In a function, we already have setCount and count as variables so we don’t need this:
  
  //   <button onClick={() => setCount(count + 1)}> Click me</button>


  //___________________fetches____________________//

     //initially null
  const [appState, setAppState] = useState(null) 
  //     ^state,      ^.setState({})        ^initial state
  //      new state[{},{}, etc.]
  const [sleepState, setSleepState] = useState(null) 
  
  const [tester , setTester] = useState();

  useEffect(() => {
    setTester("Testing setting state on mount");
    //add login stuff here
    fetch("/api/")
      .then(r => r.json())
      .then((user) => {
        console.log("user fetch", user)
        // console.log(user);
        setAppState(user);
        //  console.log("user data from 2nd promise after setState", appState);
    })
    // .then(user => handleResponse(user))
    .catch(err => console.log(err))
    
    fetch("/api/sleep")
    .then(r => r.json())
    .then((sleep) => {
       console.log("sleep fetch", sleep)
       setSleepState(sleep)
      //  console.log("sleep fetch", sleep)
    }).catch(err => console.log(err))
    
  }, [])










  //___________________state re-rendering callbacks____________________//

  //takes copy of original state,
    //"edit" user, pass, FN, and LN of state and set to what's been registered
    //trigger rerender of page, and "create" session for that user
    //these can't be exports. it's erroring out
    //Its nor regocnozing create user as a function, I thought exporting might fix that
    //yeah i see the logic. the terminal is upset tho
  // const createUser = (createdUser) => {
  //   console.log('from app render func', createdUser)
  //   console.log('from app redner func : Created:', createdUser)
  //   const copyOfState = [...appState, createdUser]
  //   let copyOfUser = {
  //     ...appState,
  //     ...createdUser
  //   }
  //   //  use my set state
  //   copyOfState = setAppState(copyOfUser)
    

  // };

  const handleResponse = (res) => {
    if(res){
      setAppState(res, () =>{
        history.push("/tracker")
      })
    }
  }
  
  //now that there are users we are going to use appState
  //appState is current state, to set it, use setState and put what we're using inside
  //const [appState, setAppState] = useState(null) 
  //     ^state,      ^.setState({})        ^initial state

  const addSleepEntry = (createdSleepEntry) => {
    //console.log('from app render func', createdSleepEntry)
    const copyOfState = [...appState, createdSleepEntry]
    let copyOfUser = {
      ...appState,
      ...createdSleepEntry
    }
    //!HANDLE RE-RENDER
    //  use my set state
    copyOfState = setAppState({copyOfUser})
    return;
  }

  const updateSleepEntry = (updateSleepEntry) => {
    // console.log('from app render func', createdSleepEntry)
    // const copyOfState = [...appState, createdSleepEntry]
    // let copyOfUser = {
    //   ...appState
    //  //!HANDLE RE-RENDER
    // }
    //  use my set state here when you set the new state
  }



  //___________________route rendering____________________//


  //   the way the below function works is if register is clicked render register form else i render login form
  //   return <Form userData={appState} />

  const renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form
        formName="Login" 
        //addSleepEntry={addSleepEntry}
        handleResponse={handleResponse}

      />
    } else if (routerProps.location.pathname === "/register") {
      return <Form
      formName="Register To Begin"
      //createUser={createUser}
      // handleSubmit={handleRegisterSubmit}
      // handleLoginGithub={handleLoginGithub}
      handleResponse={handleResponse}
      />
    }
  }

  const renderMain = () => {
    if(appState && sleepState) return  <MainContainer userData={appState} sleepData={sleepState} addSleepEntry={addSleepEntry} />
  }

  const renderDreamJournal = () => {
    return <DreamJournal />
  }
 
  const renderAbout = () => {
    return <About />
  }

  // console.log("new app state", appState)
  // console.log("new sleep state", sleepState)
  //console.log("new app state first", appState[0])
  return (
    <div className="App">
      <header className="App-header">
      <div className="header-col">
      <h2 className="name">  SleepRx  </h2> <img  src={SleepRx_Logo} className="navLogo" alt="logo" />
       </div>
      </header>
       
        {/* <h2>{appState[0].first_name}</h2> */}
        <style>
              @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap')
        </style>
        <NavBar/>  
        {/* <h1>Hello  {appState[0].first_name}!</h1> */}
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login" render={renderForm}/>
          <Route path="/register" render={renderForm}/>
          <Route path="/tracker" render={renderMain} />
          <Route path="/dreams" render={renderDreamJournal} />
          <Route path="/about" render={renderAbout} />
          {/* <Route path="/about" render={renderErrorPage} /> */}
        </Switch>
        
    </div>
  );
}
let RouterComponent = withRouter(App)
export default RouterComponent;








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
