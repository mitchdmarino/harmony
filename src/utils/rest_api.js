import axios from "axios"
import { REST_API_SERVER_URL } from "./constants"
import jwt_decode from "jwt-decode"

export const deleteUser = async (token) => {
    try {
        const response = await axios.delete(`${REST_API_SERVER_URL}/user`,{headers: {Authorization: token}} )
        if (response.status === 200) {
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

export const showUser = async (token) => {
    try {
        const response = await axios.get(`${REST_API_SERVER_URL}/user`,{headers: {Authorization: token}} )
        if (response.status === 200) {
            return response.data.user
        }
    } catch(error) {
        console.warn(error)
        return false
    }
}

export const editUser = async (token, body) => {
    try {
        const response = await axios.put(`${REST_API_SERVER_URL}/user`,{fname: body.fname, lname: body.lname, email: body.email, color: body.color, profilePicture: body.profilePicture},{headers: {Authorization: token}}, )
        if (response.status === 200) {
            return response.data.user
        }
    } catch (error) {
        console.warn(error)
        return false
    }
}