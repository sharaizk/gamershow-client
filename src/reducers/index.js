import {combineReducers} from 'redux'
import authReducer from './authReducer'
import {reducer as formReducer} from 'redux-form'
import streamReducer from './streamReducer'
import sucSnack from './successSnack'
import pauthReducer from './pauthReducer'

export default combineReducers ({
    auth: authReducer,
    form: formReducer,
    stream: streamReducer,
    sucsnack: sucSnack,
    pauth: pauthReducer
})