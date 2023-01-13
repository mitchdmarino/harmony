import { red } from "@mui/material/colors";
import { useEffect } from "react";
import { Navigate, useNavigate, redirect } from "react-router-dom";

export default function UserSettings({user, setUser, handleLogout}) {
    const nav = useNavigate()
    useEffect(() => {
        if (!user) {
             nav("/")
        }
    }, [user])

    
    return (
        <div>
            <button style={{marginTop: 45}} onClick={handleLogout}>Log Out</button>
        </div>
    )
}