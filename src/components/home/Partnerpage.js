import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Partnerpage.css'
import Navbar from "../navbar/Navbar";
import Connect from "../connect/Connect"
import Conflicts from "../conflicts/Conflicts"
import Goals from "../goals/Goals"
import Memories from "../memories/Memories"
import CoupleSetup from "../couple/CoupleSetup";

import axios from "axios";
import { REST_API_SERVER_URL } from "../../utils/constants";
import Profile from "../misc/Profile";


export default function PartnerPage({user, setUser}) {
    const [content, setContent] = useState("connect")
    const [partners, setPartners] = useState([])
    var tabContent
    switch(content) {
        case "conflicts":
            tabContent = <Conflicts />
            break;
        case "memories":
            tabContent = <Memories />
            break;
        case "goals":
            tabContent = <Goals />
            break;
        default:
            tabContent = <Connect />

    }
    const handleTabClick = (tab) => {
        setContent(tab)
    }

    useEffect(() => {
        const getCoupleInfo = async () => {
            const token = localStorage.getItem("jwt")
            try {
                const response = await axios.get(`${REST_API_SERVER_URL}/couple`, {headers: {Authorization: token}})
                setPartners(response.data.couple.users)
                
            } catch (error) {
                console.warn(error)
            }
        }
        if (user.coupleId) {
            getCoupleInfo()
        }
    }, [user.coupleId])   

    return (
        <>
            <div>
            <Link to="/settings"><img style = {{height: 40, width: 40 }}src="/icons/icons_settings.svg" alt="settings icon"/></Link>
            </div>            
            {user.coupleId ? (
                <div>
                    <p>Couple id: {user.coupleId}</p>
                    <div className="profiles">
                        {partners.map((partner, i) => {
                            return (
                                <Profile key={i} user={partner}/>
                            )
                        })}
                    </div>
                
                    <Navbar handleTabClick={(tab) => handleTabClick(tab)}/>
                    {tabContent}
                </div>
            ) : (
                <>
                    {<CoupleSetup user={user} setUser={setUser}/>}
                </>
            )}
            
        </>
    )
}