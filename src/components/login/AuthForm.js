import { useState } from "react"
import axios from "axios"
import { REST_API_SERVER_URL } from "../../utils/constants"
import jwt_decode from "jwt-decode"
import './AuthForm.css'
import CircularProgress from '@mui/material/CircularProgress';

export default function AuthForm({type, setUser}) {
    const initialForm={
        fname: '',
        lname: '', 
        email: '', 
        password: '', 
        password2: '',
        color: '#e66465',
    }
    const [form, setForm] = useState(initialForm)
    const [msg, setMsg] = useState('')
    const [progress, setProgress] = useState(false)

    const handleLoginSubmit = async (e, form, setForm) => {
        e.preventDefault()
        setProgress(true)
        // console.log(form)
        try {
            const response = await axios.post(`${REST_API_SERVER_URL}/user/login`, form)
            if (response.status === 200) {
                const { token } = response.data
                localStorage.setItem("jwt", token)
                const decoded = jwt_decode(token)
                setUser(decoded)
                setForm(initialForm)
                setMsg("Login success.")
                setProgress(false)
            } else if (response.status === 400) {
                setMsg(response.msg)
                setProgress(false)
            }
            
        } catch (error) {
            console.warn(error)
            setProgress(false)
            setMsg("Invalid Login")
        }
    
        
    }
    const handleSignupSubmit = async (e, form, setForm) => {
        e.preventDefault()
        setProgress(true)
        // console.log(form)
        try {
            const response = await axios.post(`${REST_API_SERVER_URL}/user/signup`, form)
            if (response.status === 201) {
                const { token } = response.data
                localStorage.setItem("jwt", token)
                const decoded = jwt_decode(token)
                setUser(decoded)
                setForm(initialForm)
                setProgress(false)
                setMsg("Signup success.")
            } else if (response.status === 400) {
                setMsg(response.msg)
                setProgress(false)
            }
            
        } catch (error) {
            console.warn(error)
            setProgress(false)
            setMsg("An error occured")
        }
    }

    return (
        <div className="auth-container">
            {type==="login" ? (
                <div className="login-form">
                    <h3 className="josefin-400">Sign in to your account</h3>
                    <form onSubmit={(e) => handleLoginSubmit(e,form, setForm)}>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input type="text" name="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}></input>
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input type="password" name="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}></input>
                        </div>
                        <button type='submit'>Log In</button>
                    </form>
                    {msg}
                    {progress ? <CircularProgress /> : ""}
                </div>): (
                <div className="signup-form">
                    <h3 className="josefin-400">Create your account</h3>
                    <form onSubmit={(e) => handleSignupSubmit(e,form, setForm)}>
                        <div>
                            <label htmlFor='fname'>First Name</label>
                            <input type="text" name="fname" value={form.fname} onChange={(e) => setForm({...form, fname: e.target.value})}></input>
                        </div>
                        <div>
                            <label htmlFor='lname'>Last Name</label>
                            <input type="text" name="lname" value={form.lname} onChange={(e) => setForm({...form, lname: e.target.value})}></input>
                        </div>
                        <div>
                            <label htmlFor='email'>email</label>
                            <input type="text" name="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}></input>
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input type="password" name="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}></input>
                        </div>
                        <div>
                            <label htmlFor='password2'>Confirm Password</label>
                            <input type="password" name="password2" value={form.password2} onChange={(e) => setForm({...form, password2: e.target.value})}></input>
                        </div>
                        <div>
                            <label htmlFor='color'>Color</label>
                            <input type="color" name="color" value={form.color} onChange={(e) => setForm({...form, color: e.target.value})}></input>
                        </div>
                        <button type='submit'>Sign Up</button>
                    </form>
                    {progress ? <CircularProgress /> : ""}
                    {msg}
                </div>
                )
            }
        </div>
    )
}