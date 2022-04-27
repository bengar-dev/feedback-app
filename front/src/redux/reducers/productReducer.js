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

        case 'LIKE' : {

            const newArr = [...state.productArray]
            const findIndex = newArr.findIndex(p => p.productId === action.payload.id)
            const tempArr = JSON.parse(newArr[findIndex].like)
            const findUser = tempArr.findIndex(p => p === action.payload.userId)
            if(findUser === -1) {
                tempArr.push(action.payload.userId)
                newArr[findIndex].like = JSON.stringify(tempArr)
            } else {
                tempArr.splice(findUser, 1)
                newArr[findIndex].like = JSON.stringify(tempArr)
            }
            return {
                ...state,
                productArray: newArr
            }
        }

    }

    return state
}

export default productReducer