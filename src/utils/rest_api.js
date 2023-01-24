import axios from "axios"
import {  REST_API_SERVER_URL } from "./constants"


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

export const getQuestions = async (token) => {
    try {
        const response = await axios.get(`${REST_API_SERVER_URL}/question`, {headers: {Authorization: token}})
        
        return response.data.questions.reverse()
    } catch (error) {
        console.warn(error)
        return false
    }
}

export const createQuestion = async (token, question) => {
    try {
        const response = await axios.post(`${REST_API_SERVER_URL}/question`, {question: question}, {headers: {Authorization: token}})

        return response.data.couple.questions
    } catch (error) {
        console.warn(error)
        return false
    }
}

export const answerQuestion = async (token, questionId, answer) => {
    try {
        const response = await axios.post(`${REST_API_SERVER_URL}/question/${questionId}/answer`, {text: answer}, {headers: {Authorization: token}})
        if(response.status === 200)
        {
            return response.data.question
        }
        else {
            return false
        }
    } catch(error) {
        console.warn(error)
        return false
    }
}

export const getGoals = async (token) => {
    try {
        const response = await axios.get(`${REST_API_SERVER_URL}/goal`, {headers: {Authorization: token}})
        if (response.status ===200) {
            return response.data.goals
        }else {
            return false
        }
    } catch (error) {
        console.warn(error)
        return false
    }
}

export const getGoal = async (token, goalId) => {
    try {
        const response = await axios.get(`${REST_API_SERVER_URL}/goal/${goalId}`, {headers: {Authorization: token}})
        if (response.status ===200) {
            return response.data.goal
        }else {
            return false
        }
    } catch (error) {
        console.warn(error)
        return false
    }
}

export const createGoal = async (token, body) => {
    try {
        const response = await axios.post(`${REST_API_SERVER_URL}/goal`, {title: body.description, steps: body.steps}, {headers: {Authorization: token}})
        if (response.status === 201) {
            return response.data.goal
        }
        else {
            return false
        }
    } catch (error) {
        console.warn(error)
        return false
    }
}

export const finishGoalStep = async (token, goalId, stepId) => {
    try {
        const response = await axios.post(`${REST_API_SERVER_URL}/goal/${goalId}/step/${stepId}`, {}, {headers: {Authorization: token}})
        if (response.status === 200) {
            return response.data.goal
        }
        else {
            return false
        }
    } catch (error) {
        console.warn(error)
        return false
    }
}

export const getCloudCredentials = async (token) => {
    try {
        
    } catch (error) {
        console.warn(error)
        return false
    }
}

export const uploadPhoto = async (token,formData) => {
    try {
        let response = await axios.get(`${REST_API_SERVER_URL}/photo/signature`, {headers: {Authorization: token}})
        if (response.status === 200) {
            const signature = response.data.signature 
            const cloudName = response.data.cloudName 
            const apiKey = response.data.apiKey
            const timestamp = response.data.timestamp
            formData.append("api_key", apiKey)
            formData.append("timestamp", timestamp)
            formData.append("signature", signature)
            formData.append("eager", "c_fill,h_250,w_250")
            formData.append("folder", "Harmony")
            let cloudResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
            if (cloudResponse.status === 200) {
                const photoUrl = cloudResponse.data.url
                // add the photoURL to the database
                const finalResponse = await axios.post(`${REST_API_SERVER_URL}/photo`, {url: photoUrl}, {headers: {Authorization: token}})
                if (finalResponse.status === 201) {
                    return finalResponse.data.photos
                }
            }
        }
        // if nothing has been returned yet 
        return false
        
    } catch (error) {
        console.warn(error)
        return false
    }
}

export const getPhotos = async (token,page=0) => {
    try {
        const response = await axios.get(`${REST_API_SERVER_URL}/photo?page=${page}`, {headers: {Authorization: token}})
        if (response) {
            return response.data.photos
        }
    } catch (error) {
        console.warn(error)
        return false
    }
}

