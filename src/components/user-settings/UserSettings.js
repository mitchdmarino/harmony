import { useEffect, useState } from "react";
import { Navigate, useNavigate, redirect } from "react-router-dom";
import { deleteUser, editUser, showUser } from "../../utils/rest_api";
import Profile from "../misc/Profile";
import './UserSettings.css'

export default function UserSettings({user, setUser, handleLogout}) {
    const nav = useNavigate()
    const [profileForm, setProfileForm] = useState({
        fname: "",
        lname: "",
        email: "",
        color: {},
        profilePicture: "",
    })
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("jwt")
        const getUserInfo = async () => {
        const ourUser = await showUser(token)
        setProfileForm({
            fname: ourUser.fname,
            lname: ourUser.lname,
            email: ourUser.email,
            color: ourUser.color || "",
            // profilePicture: ourUser.profilePicture || ""
        })
        }
        getUserInfo()
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

    const handleEditAccount = async (e) => {
        const token = localStorage.getItem("jwt")
        try {
            const response = await editUser(token, profileForm)
            // console.log(response)
            setUser(response)
        } catch (error) {
            console.warn(error)
        }
    }

    const doLogoutAndRedirect = () => {
        handleLogout()
        nav("/")
    }

    const handleBackClick = () => {
        nav("/")
    }

    return (
        <div className="settings">
            <div className="back" onClick={handleBackClick}><img src="/icons/icons_backarrow.png" alt="back arrow"></img></div>
            <div className="container">
                <h1 className="josefin-400 text-center">Settings</h1>
                {user ? <div className="profile-head"><Profile user={user} image={user.profilePicture} /></div> : ""}
                {user && !showEdit ? (
                    <div className="show-profile user-info">
                        <div>
                            <p>First name: </p>
                            <p>{user.fname}</p>
                        </div>
                        <div>
                            <p>Last name: </p>
                            <p>{user.lname}</p>
                        </div>
                        <div>
                            <p>Email: </p>
                            <p>{user.email}</p>
                        </div>
                        <div className="color-show">
                            <p>Color:</p>
                            <div className="" style={{backgroundColor: user.color}}></div>
                        </div>                    
                    <button className="edit-button " onClick={() => setShowEdit(true)}>Edit</button>
                </div>
                
                ) : (
                    <div className="edit-profile user-info">
                    <form>
                        <div>
                            <label htmlFor="fname">First name:</label>
                            <input type="text" value={profileForm.fname} name="fname" onChange={(e) => setProfileForm({...profileForm, fname:e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="lname">Last name:</label>
                            <input type="text" value={profileForm.lname} name="lname" onChange={(e) => setProfileForm({...profileForm, lname:e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="text" value={profileForm.email} name="email" onChange={(e) => setProfileForm({...profileForm, email:e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="color">Color:</label>
                            <input type="color" value={profileForm.color} name="color" onChange={(e) => setProfileForm({...profileForm, color:e.target.value})}/>
                        </div>
                        {/* <div>
                            <label htmlFor="profilePicture">Profile Picture</label>
                            <input type="text" value={profileForm.profilePicture} name="profilePicture" onChange={(e) => setProfileForm({...profileForm, profilePicture:e.target.value})}/>
                        </div> */}
                        <div className="button-group">
                            <button type="submit" onClick={(e) => handleEditAccount(e)}>Save</button>
                            <button onClick={() => setShowEdit(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
                )}
                <div className="exit-button-group button-group">
                    <button onClick={doLogoutAndRedirect}>Log Out</button>
                    <button onClick={handleDeleteAccount}>Delete Account</button>
                </div>
                
                
            </div>
            
        </div>
    )
}