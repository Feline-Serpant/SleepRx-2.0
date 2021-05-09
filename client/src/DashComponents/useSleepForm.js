import {useState} from 'react'

const useSleepForm = () => {
    const [state, setState] = useState({})
    const handleChange = e => {
        e.persist()
        const {name, value} = e.target
        setState(state => ({ ...state, [name]: value }))
    }
    return [state, handleChange]
}

export default useSleepForm
