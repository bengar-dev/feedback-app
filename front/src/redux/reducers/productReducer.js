const INITIAL_STATE = {
    productArray: []
}

function productReducer(state = INITIAL_STATE, action) {

    switch(action.type) {

        case 'GETPRODUCTS': {
            return {
                ...state,
                productArray: action.payload
            }
        }

    }

    return state
}

export default productReducer