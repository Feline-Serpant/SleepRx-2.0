import React, {useState} from 'react'


const Home = () => {
    const [show, setShow] = useState(false)
    return (
        <div>
            <button onClick={ () => setShow(!show)}> Click to begin</button>
        {show && <>
            <h1>Lets get you well rested</h1>
        </>}
        </div>
    )
}

export default Home
