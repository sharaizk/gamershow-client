import {PSIGN_IN, PSIGN_OUT, SIGN_UP,CHK_TKN} from '../actions/types'
const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
    userdata: null
}

const pauthReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case SIGN_UP:
            return {...state, isSignedIn: false, userId: null, userdata:null}
        case PSIGN_IN:
            return{...state, isSignedIn:true, userId:action.payload._id, userdata:action.payload}
        case PSIGN_OUT:
            return {...state, isSignedIn: false, userId: null, userdata: null}
        case CHK_TKN:
            return {...state, isSignedIn: action.payload.isSignedIn, userId: action.payload.userId, userdata:action.payload.userdata}
        default:
            return state
    }
}
export default pauthReducer