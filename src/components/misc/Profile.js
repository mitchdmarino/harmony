import { useEffect } from "react"
import { showUser } from "../../utils/rest_api"
import './Profile.css'

export default function Profile({user, image=false}) {
    useEffect(() => {

    })
    var color 
    user.color ? color = user.color : color = "white";
    return (
        <div className="profile" style={{backgroundColor: color}}>
            {image? (
                <img src={image} alt={`${user.fname} profilepic`} />
            ) : (
                <p>{user.fname[0]}</p>
            )}
        </div>
    )
}