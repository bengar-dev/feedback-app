import {api} from '../config/api'
const axios = require('axios').default
const token = JSON.parse(localStorage.getItem('token'))

export function sendProduct(product) {

    const data = {
        ...product,
        autorId: token.userId
    }

    return axios.post(api + '/api/product', data, {
        headers: {'Authorization' : 'Bearer ' + token.token}
    })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error.response.data.error
        })

}

export function getProducts() {

    return axios.get(api + '/api/product', {
        headers: {'Authorization' : 'Bearer ' + token.token}
    })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error.response.data.error
        })

}