import {
    SUC_SNACK
} from '../actions/types'
const sucSnack = (state = false, action) =>{
    switch(action.type){
        case SUC_SNACK:
            return action.payload
        default:
            return state
    }
}
export default sucSnack