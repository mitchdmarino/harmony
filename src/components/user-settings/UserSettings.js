import { red } from "@mui/material/colors";
import { useEffect } from "react";
import { Navigate, useNavigate, redirect } from "react-router-dom";
import { deleteUser } from "../../utils/rest_api";

export default function UserSettings({user, setUser, handleLogout}) {
    const nav = useNavigate()
    useEffect(() => {
        if (!user) {
             nav("/")
        }
    }, [user])

    const handleDeleteAccount = () => {
        // api call to delete account 
        const token = localStorage.getItem("jwt")
        if(deleteUser(token)){
            console.log("account deleted")
            handleLogout()
        }
        else {
            console.log("error occured")
        }
    }

    return (
        <div>
            <button style={{marginTop: 45}} onClick={handleLogout}>Log Out</button>
            <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
    )
}