import axios from "axios"
import { REST_API_SERVER_URL } from "./constants"
import jwt_decode from "jwt-decode"

export const deleteUser = async (token) => {
    try {
        const response = await axios.delete(`${REST_API_SERVER_URL}/user`,{headers: {Authorization: token}} )
        if (response.status === 20) {
            return true
            
        } else if (response.status === 400) {
            console.warn(response)
            return false
        }
        
    } catch (error) {
        console.warn(error)
        return false
    }
}