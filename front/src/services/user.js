import {api} from '../config/api'
const axios = require('axios').default
const token = JSON.parse(localStorage.getItem('token'))

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

export function getInfo() {

    return axios.get(api + '/api/user/' + token.userId, {
        headers: {'Authorization' : 'Bearer ' + token.token}
    })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error.response.data.error
        })

}