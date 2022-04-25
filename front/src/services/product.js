import {api} from '../config/api'
const axios = require('axios').default
const token = JSON.parse(localStorage.getItem('token'))

export function sendProduct(product) {

    console.log(product)

    const data = {
        ...product,
        autorId: token.userId
    }

    axios.post(api + '/api/product', data, {
        headers: {'Authorization' : 'Bearer ' + token.token}
    })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return error.response.data.error
        })

}