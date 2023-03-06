import config from "../config/config";
import { Buffer } from "buffer";
import { json, useRevalidator } from "react-router-dom";

export const LOAD_USERS_PENDING = "LOAD_USERS_PENDING";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_ERROR = "GET_USERS_ERROR";
export const SHOW_CREATE_USER_MODAL = "SHOW_CREATE_USER_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCSESS";
export const CREATE_USER_ERROR = "CREATE_USER_ERROR";
export const SHOW_EDIT_USER_MODAL = "SHOW_EDIT_USER_MODAL";
export const HIDE_EDIT_MODAL = "HIDE_EDIT_MODAL";
export const EDIT_USER_SUCCSESS = "EDIT_MODAL_SUCCSESS";
export const EDIT_USER_ERROR = "EDIT_MODAL_ERROR";
export const SHOW_DELETE_USER_MODAL = "SHOW_DELETE_USER_MODAL";
export const HIDE_DELETE_MODAL = "HIDE_DELETE_MODAL";
export const DELETE_USER_SUCCSESS = "DELETE_MODAL_SUCCSESS";
export const DELETE_USER_ERROR = "DELETE_MODAL_ERROR";


export function getLoadUsersPendingAction(){

    return{

        type: LOAD_USERS_PENDING,
        loadUsers: true
    }
}

export function getAllUsersSuccessAction(userSession){

    return{

        type: GET_USERS_SUCCESS,
        users: userSession.users,
        loadUsers: false
        
    }
}

export function getAllUsersErrorAction(error){

    return{

        type: GET_USERS_ERROR,
        error: error
        
    }
}

export function getShowCreateUserModalAction(){

    return{

        type: SHOW_CREATE_USER_MODAL
    }
}

export function getHideModalAction(){

    return{

        type: HIDE_MODAL
    }
}

export function getCreateNewUserSuccessAction(userSession){

    return{

        type: CREATE_USER_SUCCESS,
        newUser: userSession.newUser,
        
    }
}

export function getCreateNewUserErrorAction(error){

    return{

        type: CREATE_USER_ERROR,
        error: error
        
    }
}

export function getShowEditUserModalAction(){

    return{

        type: SHOW_EDIT_USER_MODAL
    }
}

export function getHideEditModalAction(){

    return{

        type: HIDE_EDIT_MODAL
    }
}

export function getEditUserSuccessAction(){

    return{

        type: EDIT_USER_SUCCSESS
    }
}

export function getEditUserErrorAction(error){

    return{

        type: EDIT_USER_ERROR,
        error: error
    }
}

export function getShowDeleteUserModalAction(){

    return{

        type: SHOW_DELETE_USER_MODAL
    }
}

export function getHideDeleteModalAction(){

    return{

        type: HIDE_DELETE_MODAL
    }
}

export function getDeleteUserSuccessAction(){

    return{

        type: DELETE_USER_SUCCSESS
    }
}

export function getDeleteUserErrorAction(error){

    return{

        type: DELETE_USER_ERROR,
        error: error
    }
}

//Export Actions 

//Get All Users
export function getAllUsers(token){
    
    return dispatch => {

        allUsersRequest(token).then(
            userSession => {
                console.log("userSession in UserManagemantActions " + JSON.stringify(userSession))
                const action = getAllUsersSuccessAction(userSession);
                dispatch(action);
            },
            error => {
                console.log("ERROR");
                console.log(error);
                dispatch(getAllUsersErrorAction(error));
            }
        )
            .catch(error => {
                console.log("CATCH ERROR");
                dispatch(getAllUsersErrorAction(error));
            })
        }   
    }  

//Create User    
export function getAddNewUserAction(token, userID, firstName, lastName, password, isAdmin){

    return dispatch => {

        createNewUserRequest(token, userID, firstName, lastName, password, isAdmin).then(
            userSession => {
                console.log("userSession in UserManagemantActions " + JSON.stringify(userSession))
                const action = getCreateNewUserSuccessAction(userSession);
                dispatch(action);
            },
            error => {
                console.log("ERROR");
                console.log(error);
                dispatch(getCreateNewUserErrorAction(error));
            }
        )
            .catch(error => {
                console.log("CATCH ERROR");
                dispatch(getCreateNewUserErrorAction(error));
            })
        }   
    
}

//Edit User    
export function getEditUserAction(token, userID, firstName, lastName, password, isAdmin){

    return dispatch => {

        editUserRequest(token, userID, firstName, lastName, password, isAdmin).then(
            userSession => {
                console.log("userSession in UserManagemantActions " + JSON.stringify(userSession))
                const action = getEditUserSuccessAction(userSession);
                dispatch(action);
            },
            error => {
                console.log("ERROR");
                console.log(error);
                dispatch(getEditUserErrorAction(error));
            }
        )
            .catch(error => {
                console.log("CATCH ERROR");
                dispatch(getEditUserErrorAction(error));
            })
        }   
    
} 

//Delete User    
export function getDeleteUserAction(token, userID){

    return dispatch => {

        deleteUserRequest(token, userID).then(
            userSession => {
                console.log("userSession in UserManagemantActions " + JSON.stringify(userSession))
                const action = getDeleteUserSuccessAction(userSession);
                dispatch(action);
            },
            error => {
                console.log("ERROR");
                console.log(error);
                dispatch(getDeleteUserErrorAction(error));
            }
        )
            .catch(error => {
                console.log("CATCH ERROR");
                dispatch(getDeleteUserErrorAction(error));
            })
        }   
    
} 

//Request Functions zum Backend

//Request all Users
function allUsersRequest(token){

    const requestOptions= {
        method: 'GET',
        headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
    };
    return fetch(config.backendUrl + config.backendEndpoints.users, requestOptions)
        .then(handleResponse)
        .then(userSession => {
            
            return userSession;

        })
}

//Request Create User
function createNewUserRequest(token, userID, firstName, lastName, password, isAdmin){

    const requestOptions= {
        method: 'POST',
        headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
        body: JSON.stringify({ 
        "userID": userID,
        "firstName": firstName,
        "lastName": lastName,
        "password": password,
        "isAdministrator": isAdmin })                
    };
    
    return fetch(config.backendUrl + config.backendEndpoints.users, requestOptions)
        .then(handleResponseCreate)
        .then(userSession => {
            
            return userSession;

        }) 

}

//Request Edit User
function editUserRequest(token, userID, firstName, lastName, password, isAdmin){
    
    let requestOptions;
    console.log("DEBUG editUser " + isAdmin + " " + lastName + " " + password);

    if(userID && firstName && lastName){

        let bodyData = "";

        if(password == "****"){

            bodyData = JSON.stringify({ 

                "firstName": firstName,
                "lastName": lastName,
                "isAdministrator": isAdmin

            })   

        }
        else if(password){

            bodyData = JSON.stringify({ 

                "firstName": firstName,
                "lastName": lastName,
                "password": password,
                "isAdministrator": isAdmin

            })   
        }

        requestOptions= {
                method: 'PUT',
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: bodyData/*JSON.stringify({ 

                    "firstName": firstName,
                    "lastName": lastName,
                    "isAdministrator": isAdmin

                }) */               
        };

        /*if(!password == "****"){

            requestOptions.body.password = password;
    
        }*/

    }

    return fetch(config.backendUrl + config.backendEndpoints.users + userID, requestOptions)
        .then(handleResponseEdit)
        .then(userSession => {
            
            return userSession;

        }) 
        
}

//Request Create User
function deleteUserRequest(token, userID){

    const requestOptions= {
        method: 'DELETE',
        headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
        body: JSON.stringify({ 
        "userID": userID
        })                
    };
    
    return fetch(config.backendUrl + config.backendEndpoints.users + userID, requestOptions)
        .then(handleResponseDelete)
        .then(userSession => {
            
            return userSession;

        }) 

}

//handle responses

//handle getAllUsers
function handleResponse(response){
    
    const authorizationHeader = response.headers.get("Authorization");
    const statusCode = response.status;
    return response.text().then(text => {
        
        if(statusCode === 200){

        const data = text && JSON.parse(text);
        var token;
        
        if(authorizationHeader){

            token = authorizationHeader.split(" ")[1];
            console.log("Token " + token);
        }

        if(!response.ok){
            if(response.status === 401){
                
                console.log("Error get all users");

            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        else{
            let userSession = {
                users: data,
                accessToken: token,
            }
            return userSession;
        }
    }
    });

}

//handle getCreate
function handleResponseCreate(response){
    
    const authorizationHeader = response.headers.get("Authorization");
    const statusCode = response.status;
    return response.text().then(text => {
        
        if(statusCode === 200){

        const data = text && JSON.parse(text);
        var token;
        
        if(authorizationHeader){

            token = authorizationHeader.split(" ")[1];
            console.log("Token " + token);
        }

        if(!response.ok){
            if(response.status === 401){
                
                console.log("Error create new user");

            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        else{
            let userSession = {
                newUser: data,
            }
            return userSession;
        }
    }
    });

}

//handle etitUser
function handleResponseEdit(response){
    
    const authorizationHeader = response.headers.get("Authorization");
    const statusCode = response.status;
    return response.text().then(text => {
        
        if(statusCode === 200){

        const data = text && JSON.parse(text);
        var token;
        
        if(authorizationHeader){

            token = authorizationHeader.split(" ")[1];
            console.log("Token " + token);
        }

        if(!response.ok){
            if(response.status === 401){
                
                console.log("Error edit user");

            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        else{
            let userSession = {
                newUser: data,
            }
            return userSession;
        }
    }
    });

}

//handle deleteUser
function handleResponseDelete(response){
    
    const authorizationHeader = response.headers.get("Authorization");
    const statusCode = response.status;
    return response.text().then(text => {
        
        if(statusCode === 200){

        const data = text && JSON.parse(text);
        var token;
        
        if(authorizationHeader){

            token = authorizationHeader.split(" ")[1];
            console.log("Token " + token);
        }

        if(!response.ok){
            if(response.status === 401){
                
                console.log("Error delete user");

            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        else{
            let userSession = {
                newUser: data,
            }
            return userSession;
        }
    }
    });

}
