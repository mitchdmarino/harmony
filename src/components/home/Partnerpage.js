import { useState, useEffect } from "react";
import './Partnerpage.css'
import Navbar from "../navbar/Navbar";
import Connect from "../connect/Connect"
import Conflicts from "../conflicts/Conflicts"
import Goals from "../goals/Goals"
import Memories from "../memories/Memories"
import UserSettings from "../user-settings/UserSettings"

export default function PartnerPage({user}) {
    const [content, setContent] = useState("connect")
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

    return (
        <>
            <div className="profiles">
                <div className="profile-pic">
                    M
                </div>
                <div className="profile-pic">
                    D
                </div>
            </div>
           
            <Navbar handleTabClick={(tab) => handleTabClick(tab)}/>
            {tabContent}
        </>
    )
}