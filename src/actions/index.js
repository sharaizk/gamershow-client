import server from '../api/server'
import history from '../history'
import {loadState, saveState} from '../localStorage'
import {store} from '../index';
import {
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
    SUC_SNACK,
    SIGN_UP,
    PSIGN_IN,CHK_TKN, PSIGN_OUT
} from './types'

export const signIn = (userId) =>{
    return{
        type: SIGN_IN,
        payload:userId
    }
}

export const signOut = () =>{
    return{
        type: SIGN_OUT
    }
}
export const signUp=(formValues,gender)=>{
    const{name, username,email,password}=formValues
    return async(dispatch)=>{
        try{
            const response = await server.post('/register',{name, username,email,password,gender})
            dispatch({type: SIGN_UP, payload:response.data.userId})
            history.push('/login')
        }
        catch(e){
            alert(e.response.data.error)
        }

    }
}

export const psignIn = (formValues)=>{
    const{username, password}=formValues
    return async(dispatch)=>{
        try{
            const response = await server.post('/login',{username,password})
            if(response.status !== 400){
                const data= await response.data
                dispatch({type:PSIGN_IN, payload:data})   
                await saveState(store.getState().pauth)
                history.push('/home')
            }
            else{
                const error = new Error("Invalid Credentials")
                throw error
            }
        }
        catch(e){
            alert(e)
        }
    }
}

export const psignOut = ()=>{
    return async (dispatch) =>{
        dispatch({type:PSIGN_OUT})
        saveState(store.getState().pauth)
        history.push('/')
    }
}

export const chkToken=()=>{
    return (dispatch) =>{
        try{
            const data = loadState()
            if(data === undefined || data.isSignedIn === false){
                const ERROR = new Error("USER NOT LOGGED IN")
                throw ERROR
            }
            else{
                dispatch({type:CHK_TKN, payload: data})
            }
            }
            catch(e){
                alert(e)
                history.push('/login')
            }
    }
}

export const createStream = (formValues) =>{
    return async (dispatch, getState) =>{
        const {userId} = getState().pauth
        const response = await server.post('/streams/new',{...formValues, userId})
        dispatch({type: CREATE_STREAM, payload: response.data})
    }
}

export const fetchStreams = () =>{
    return async (dispatch) =>{
        const response = await server.get('/streams')
        dispatch({type:FETCH_STREAMS, payload: response.data})
    }
}

export const fetchStream = (id) =>{
    return async(dispatch) =>{
        const response = await server.get(`/streams/${id}`)
        dispatch({type: FETCH_STREAM, payload: response.data})
    }
}

export const editStream = (id, formValues) =>{
    return async(dispatch)=>{
        const response = await server.patch(`/streams/edit/${id}`, {...formValues})
        dispatch({type:EDIT_STREAM, payload:response.data})
    }
}

export const deleteStream = (id)=>{
    return async(dispatch)=>{
        await server.delete(`/streams/delete/${id}`)
        dispatch({type: DELETE_STREAM, payload: id})
        history.push('/streams/list')
    }
}


export const sucSnack = (status) =>{
    return{
        type: SUC_SNACK,
        payload: status
    }
}