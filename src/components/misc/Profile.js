import { fontSize } from "@mui/system"
import { useEffect } from "react"
import { showUser } from "../../utils/rest_api"
import './Profile.css'

export default function Profile({user, image=false, size="large"}) {
    useEffect(() => {

    })
    var color 
    var length
    var fontSize
    user.color ? color = user.color : color = "white";
    if (size==="large") {
        length = 150
        fontSize = 40
    } 
    else if (size==="small") {
        length = 30
        fontSize = 10
    }
    var style = {
        backgroundColor: color,
        height: length,
        width: length,
        fontSize: fontSize,
    }
    return (
        <div className="profile" style={style}>
            {image? (
                <img src={image} alt={`${user.fname} profilepic`} />
            ) : (
                <p>{user.fname[0]}</p>
            )}
        </div>
    )
}