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

export function getProduct(id) {
    return axios.get(api + '/api/product/' + id, {
        headers: {'Authorization' : 'Bearer ' + token.token}
    })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error.response.data.error
        })
}

export function getLikes(id) {

    const data = {
        userId: token.userId
    }

    return axios.put(api + '/api/product/like/' + id, data, {
        headers: {'Authorization' : 'Bearer ' + token.token}
    })
        .then((response) => {
            return true
        })
        .catch((error) => {
            return error.response.data.error
        })

}