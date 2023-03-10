import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Partnerpage.css'
import Navbar from "../navbar/Navbar";
import Connect from "../connect/Connect"
import Conflicts from "../conflicts/Conflicts"
import Goals from "../goals/Goals"
import Memories from "../memories/Memories"
import CoupleSetup from "../couple/CoupleSetup";
import YinYang from "../misc/YinYang"

import axios from "axios";
import { REST_API_SERVER_URL } from "../../utils/constants";
import Profile from "../misc/Profile";


export default function PartnerPage({user, setUser}) {
    const [content, setContent] = useState("connect")
    const [partners, setPartners] = useState([])
    const [showCoupleId, setShowCoupleId] = useState("false")
    var tabContent = ""
    if(user) {
        switch(content) {
            case "conflicts":
                tabContent = <Conflicts/>
                break;
            case "memories":
                tabContent = <Memories />
                break;
            case "goals":
                tabContent = <Goals />
                break;
            default:
                tabContent = <Connect user={user}/>
    
        }
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
                if (response.data.couple.users.length ===1) {
                    setShowCoupleId(true)
                } else {
                    setShowCoupleId(false)
                }
                
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
            <div className="settings-link">
                <Link to="/settings"><img style = {{height: 40, width: 40 }}src="/icons/icons_settings.svg" alt="settings icon"/></Link>
            </div>            
            {user.coupleId ? (
                <div>
                    
                    <div className="profiles">
                        {partners.map((partner, i) => {
                            return (
                                <div key={i}>
                                    <Profile  user={partner}/>
                                </div>
                            )
                        })}
                        {
                            showCoupleId ? (
                                <div className="coupleId">
                                    <p className="jost-400">Share this code with your partner:<br></br> <span>{user.coupleId}</span></p>
                                </div>
                            ) : ""
                        }
                    </div>
                    {partners.length ===2 ? (
                            <div className="partner-yin-yang">
                                <YinYang color1={partners[0].color} color2={partners[1].color} size="small"/>
                            </div>
                        ) : (
                            ""
                        ) }
                
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