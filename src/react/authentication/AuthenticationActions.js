import config from "../config/config";
import { Buffer } from "buffer";

export const SHOW_LOGIN_DIALOG = "SHOW_LOGIN_DIALOG";
export const HIDE_LOGIN_DIALOG = "HIDE_LOGIN_DIALOG";

export const AUTHENTICATION_PENDING = "AUTHENTICATION_PENDING";
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";
export const AUTHENTICATION_LOGOUT = "AUTHENTICATION_LOGOUT";
export const LOGOUT_ACTION = "LOGOUT_ACTION";

export function getShowDialogAction(){

    return{

        type: SHOW_LOGIN_DIALOG
    }
}

export function getHideDialogAction(){

    return{

        type: HIDE_LOGIN_DIALOG
    }
}

export function getAuthenticationPendingAction(){

    return{

        type: AUTHENTICATION_PENDING
    }
}

export function getAuthenticationSuccessAction(userSession){

    return{

        type: AUTHENTICATION_SUCCESS,
        user: userSession.user,
        accessToken: userSession.accessToken,
        loggedIn: userSession.loggedIn
    }
}

export function getAuthenticationErrorAction(error){

    return{

        type: AUTHENTICATION_ERROR,
        error: error
    }
}

export function logoutAction(){

    return{

        type: LOGOUT_ACTION,
        user: null,
        accessToken: null,
        loggedIn: false

    }
}

export function authenticateUser(userID, password, loggedIn){

    if(loggedIn === false){
        console.log(loggedIn);
        return dispatch => {

            dispatch(getAuthenticationPendingAction());

            login(userID, password).then(
                userSession => {
                    console.log("userSession in authenticateUser " + JSON.stringify(userSession));

                    //userSession2 wird gemacht, weil nur mein Backend die userDaten gleich zu user gibt. Hier rufe ich die Daten nochmal vorher ab
                    if(userSession.user.Success == "Authorization success" && !userSession.user.isAdministrator){
                        
                        getUserData(userSession.accessToken, userID).then(
                            userSession2 => {
                                userSession2.accessToken = userSession.accessToken;
                                const action = getAuthenticationSuccessAction(userSession2);
                                dispatch(action);
                            },
                            error => {
                                console.log("ERROR");
                                console.log(error);
                                dispatch(getAuthenticationErrorAction(error));
                            }
                        )
                        .catch(error => {
                            console.log("CATCH ERROR");
                            dispatch(getAuthenticationErrorAction(error));
                        });
                    }
                    else {
                        const action = getAuthenticationSuccessAction(userSession);
                        dispatch(action);
                    }
                },
                error => {
                    console.log("ERROR");
                    console.log(error);
                    dispatch(getAuthenticationErrorAction(error));
                }
            )
            .catch(error => {
                console.log("CATCH ERROR");
                dispatch(getAuthenticationErrorAction(error));
            })
        }
    }
    else
    if(loggedIn === true){
        
        return dispatch => {
            
            dispatch(logoutAction());  
       
        }
    }   

    }


function login(userID, password){

    let inhalt = Buffer.from(userID + ":" + password).toString("base64");

    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json", Accept: "application/json", Authorization: "Basic " + inhalt}

    };
    
    return fetch(config.backendUrl + config.backendEndpoints.auth, requestOptions)
    .then(handleResponse)
    .then(userSession => {
        console.log("userSession in login " + JSON.stringify(userSession))
        return userSession;
    });
}

function getUserData(token, userID){

    const requestOptions= {
        method: 'GET',
        headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
    };
    return fetch(config.backendUrl + config.backendEndpoints.usersPublic + userID, requestOptions)
        .then(handleResponse)
        .then(userSession => {
            
            return userSession;

        })
}

function handleResponse(response){
    
    const authorizationHeader = response.headers.get("Authorization");
    const statusCode = response.status;

    return response.text().then(text => {
        
        if(statusCode === 200){

        const data = text && JSON.parse(text);
        
        var token;
        
        if(authorizationHeader){
            console.log(authorizationHeader);
            token = authorizationHeader.split(" ")[1];
            console.log("Token " + token);
        }

        if(!response.ok){
            if(response.status === 401){
                
                logout();

            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        else{
        
            let userSession = {
                user: data,
                accessToken: token,
                loggedIn: true
            }
            
            return userSession;
        }
    }
    });

}

function logout(){

    return dispatch => {
        dispatch(logoutAction());  
    }
}





