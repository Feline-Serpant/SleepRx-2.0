import React, {useState} from 'react'
import Start from '../Start.svg';
import {useHistory} from 'react-router-dom'
const Home = () => {
    // const [show, setShow] = useState(false)

    const handleClick = () => {
        const history = useHistory()
        history.push('/register')
    }
    return (
        <div className='startdiv' onClick={handleClick} >
            {/* <a href="http://localhost:8080/register"><img src={Start} className="App-logo" alt="logo" /></a> */}
           <div >
                <img src={Start} alt="github" className="App-logo"  title="start" />
            </div>     
            {/* <button onClick={ () => setShow(!show)}> Click to begin</button> */}
        {/* {show && <>
            <h1>Lets get you well rested</h1>
        </>} */}
        </div>
    )
}

export default Home
