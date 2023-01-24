import { useEffect, useState } from "react";
import { Navigate, useNavigate, redirect } from "react-router-dom";
import { deleteUser, editUser, showUser } from "../../utils/rest_api";
import Profile from "../misc/Profile";
import './UserSettings.css'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    minWidth: 300,
    bgcolor: '#FAF0CA',
    border: '2px solid #72A98F',
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
  };

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
        // const token = localStorage.getItem("jwt")
        // const getUserInfo = async () => {
        //     const ourUser = await showUser(token)
        //     setProfileForm({
        //         fname: ourUser.fname,
        //         lname: ourUser.lname,
        //         email: ourUser.email,
        //         color: ourUser.color || "",
        //         // profilePicture: ourUser.profilePicture || ""
        //     })
        // }
        // getUserInfo()
        if (user) {
            setProfileForm({
                        fname: user.fname,
                        lname: user.lname,
                        email: user.email,
                        color: user.color,
                        // profilePicture: ourUser.profilePicture || ""
                    })
        }
    }, [user])

    const handleDeleteAccount = () => {
        // api call to delete account 
        const token = localStorage.getItem("jwt")
        if(deleteUser(token)){
            console.log("account deleted")
            handleLogout()
            nav("/")
        }
        else {
            console.log("error occured")
        }
    }

    const handleEditAccount = async (e) => {
        e.preventDefault()
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

    const handleColorChange = (e) => {
        // console.log(e.target.value)
        setProfileForm({...profileForm, color: e.target.value})
    }

    return (
        <div className="settings">
            <div className="container">
            <div className="back" onClick={handleBackClick}><img src="/icons/icons_backarrow.png" alt="back arrow"></img></div>
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
                            <input type="color" value={profileForm.color} name="color" onChange={(e) => handleColorChange(e)}/>
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
                    <button onClick={() => setShowDelete(true)}>Delete Account</button>
                </div>
                <Modal
                    open={showDelete}
                    onClose={() => setShowDelete(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="delete-modal"
                >
                    <Box sx={style}>
                        <h3>Are you sure you want to delete your account? This action cannot be undone.</h3>
                        <button onClick={handleDeleteAccount} className="confirm-button">Yes, delete my account.</button>
                        <button onClick={()=>setShowDelete(false)} className="cancel-button">No, go back.</button>
                    </Box>
                </Modal>
                
                
            </div>
            
        </div>
    )
}