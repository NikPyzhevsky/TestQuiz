import axios from "axios"
import { AUTH_LOGOUT, AUTH_SUCCESS } from "./actionTypes"

export function auth(email, password, isLogin){
    return async (dispatch) =>{
        const authData = {
            email, password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCR230B6OL5UoaUn5ihmW1A5FuvNur5h9Q'

        if(isLogin){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCR230B6OL5UoaUn5ihmW1A5FuvNur5h9Q'
        }
        else{

        }
            const response = await axios.post(url, authData)
            const data = response.data

            const exitrationDate = new Date(new Date().getTime()+ data.expiresIn * 1000)

            localStorage.setItem('token', data.idToken)
            localStorage.setItem('userId', data.localId)
            localStorage.setItem('exitrationDate', exitrationDate)
        
            dispatch(authSuccess(data.idToken))
            dispatch(autoLogout(data.expiresIn))
            // console.log(response.data.idToken)
    }
}

export function authSuccess(token){
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time){
    return dispatch => {
        setTimeout(() =>{
            dispatch(logout())
        }, time*1000)
        
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('exitrationDate')
    return{
        type: AUTH_LOGOUT
    }
}

export function autoLogin(){
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token){
            dispatch(logout())
        }
        else {
            const exitrationDate = new Date(localStorage.getItem('exitrationDate'))
            if (exitrationDate <= new Date()){
                dispatch(logout())
            } else{
                dispatch(authSuccess(token))
                dispatch(autoLogout((exitrationDate.getTime()- new Date().getTime()) / 1000))
            }
        }
    }
}