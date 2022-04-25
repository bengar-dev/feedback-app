import {api} from '../config/api'
const axios = require('axios').default

export function getRegister(username, email, password) {

    const data = {
        username,
        email,
        password
    }

    return axios.post(api + '/api/user/register', data)
        .then((response) => {
            return true
        })
        .catch((error) => {
            return false
        })

}

export function getLogin(username, password) {
    
    const data = {
        email: username,
        password
    }

    return axios.post(api + '/api/user/login', data)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error.response.data.error
        })

}