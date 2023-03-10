import { useState, useEffect } from "react"
import { REST_API_SERVER_URL } from "../../utils/constants"
import axios from "axios"
import jwt_decode from "jwt-decode"
import './CoupleSetup.css'


export default function CoupleSetup({user, setUser}) {
    const [method, setMethod] = useState("")
    const [code, setCode] = useState("")

    const handleJoinCouple = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("jwt")
        const options = {
            headers: {
                Authorization: token,
            }
        }
        try {
            const response = await axios.post(`${REST_API_SERVER_URL}/couple/${code}/partner`,{}, options)
            if(response.status === 200) {
                localStorage.setItem("jwt", response.data.token)
                setUser(response.data.user)
            }
        } catch (error) {
            console.warn(error)
        }

    }
    const handleCreateCouple = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("jwt")
        const options = {
            headers: {
                authorization: token,
            }
        }
        try {
            const response = await axios.post(`${REST_API_SERVER_URL}/couple`, {}, options)
            if(response.status === 201) {
                localStorage.setItem("jwt", response.data.token)
                setUser(jwt_decode(response.data.token))
            }
        } catch (error) {
            console.warn(error)
        }
    }

    var content 
    if (method === "create") {
        content = (
            <button className="create-couple-button" onClick={(e) => handleCreateCouple(e)}>Create Couple</button>
        )
    } 
    else if (method === "join") {
        content = (
            <form className="join-couple-form" onSubmit={(e) => handleJoinCouple(e)}>
                <label htmlFor="code">Code</label>
                <input type="text" name="code" placeholder="your code here" onChange={(e) => setCode(e.target.value)} value={code}/>
                <button className="create-couple-button" type="submit">Submit</button>
            </form>
        )
    } else {
        content = ""
    }
    

    return (
        <div className="couple-setup">
            <h1>Join or create your couple!</h1>
            <button onClick={() => {setMethod("join")}}>I have a partner code</button>
            <button onClick={() => {setMethod("create")}}>I am creating the couple</button>
            {content}
        </div>
    )
}