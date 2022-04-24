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
            console.log(response)
            return true
        })
        .catch((error) => {
            return false
        })

}