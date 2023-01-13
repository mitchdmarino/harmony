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
            <Link to="/settings">Settings</Link>
            {user.coupleId ? (
                <>
                    
                    <div className="profiles">
                        {partners.map(partner => {
                            return (
                                <div className="profile-pic">
                                    {partner.fname}
                                </div>
                            )
                        })}
                    </div>
                
                    <Navbar handleTabClick={(tab) => handleTabClick(tab)}/>
                    {tabContent}
                </>
            ) : (
                <>
                    {<CoupleSetup user={user} setUser={setUser}/>}
                </>
            )}
            
        </>
    )
}