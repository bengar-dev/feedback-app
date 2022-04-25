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
        
        case 'ADDPRODUCT' : {

            const newArr = [...state.productArray]
            newArr.unshift(action.payload)
            
            return { 
                ...state,
                productArray: newArr
            }

        }

    }

    return state
}

export default productReducer