import config from "../config/config";
import { Buffer } from "buffer";
import { json, useRevalidator } from "react-router-dom";

export const LOAD_APPLICATIONS_PENDING = "LOAD_APPLICATIONS_PENDING";
export const GET_APPLICATIONS_SUCCESS = "GET_APPLICATIONS_SUCCESS";
export const GET_APPLICATIONS_ERROR = "GET_APPLICATIONS_ERROR";
export const SHOW_CREATE_APPLICATION_MODAL = "SHOW_CREATE_APPLICATION_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";
export const CREATE_APPLICATION_SUCCESS = "CREATE_APPLICATION_SUCCSESS";
export const CREATE_APPLICATION_ERROR = "CREATE_APPLICATION_ERROR";
export const SHOW_DELETE_APPLICATION_MODAL = "SHOW_DELETE_APPLICATION_MODAL";
export const HIDE_DELETE_MODAL = "HIDE_DELETE_MODAL";
export const DELETE_APPLICATION_SUCCSESS = "DELETE_APPLICATION_SUCCSESS";
export const DELETE_APPLICATION_ERROR = "DELETE_APPLICATION_ERROR";


export function getLoadApplicationsPendingAction(){

    return{

        type: LOAD_APPLICATIONS_PENDING,
        loadApplications: true
    }
}

export function getAllApplicationsSuccessAction(userSession){

    return{

        type: GET_APPLICATIONS_SUCCESS,
        applications: userSession.applications,
        loadApplications: false
        
    }
}

export function getAllApplicationsErrorAction(error){

    return{

        type: GET_APPLICATIONS_ERROR,
        error: error
        
    }
}

export function getShowCreateApplicationModalAction(){

    return{

        type: SHOW_CREATE_APPLICATION_MODAL
    }
}

export function getHideApplicationModalAction(){

    return{

        type: HIDE_MODAL
    }
}

export function getCreateNewApplicationSuccessAction(userSession){

    return{

        type: CREATE_APPLICATION_SUCCESS,
        newApplication: userSession.newApplication,
        
    }
}

export function getCreateNewApplicationErrorAction(error){

    return{

        type: CREATE_APPLICATION_ERROR,
        error: error
        
    }
}

export function getShowDeleteApplicationModalAction(){

    return{

        type: SHOW_DELETE_APPLICATION_MODAL
    }
}

export function getHideDeleteModalAction(){

    return{

        type: HIDE_DELETE_MODAL
    }
}

export function getDeleteApplicationSuccessAction(){

    return{

        type: DELETE_APPLICATION_SUCCSESS
    }
}

export function getDeleteApplicationErrorAction(error){

    return{

        type: DELETE_APPLICATION_ERROR,
        error: error
    }
}

//Export Actions 

//Get All Application
export function getAllApplications(token, isAdministrator){
    
    return dispatch => {

        allApplicationsRequest(token, isAdministrator).then(
            userSession => {
                console.log("userSession ApplicationActions " + JSON.stringify(userSession))
                const action = getAllApplicationsSuccessAction(userSession);
                dispatch(action);
            },
            error => {
                console.log("ERROR");
                console.log(error);
                dispatch(getAllApplicationsErrorAction(error));
            }
        )
            .catch(error => {
                console.log("CATCH ERROR");
                dispatch(getAllApplicationsErrorAction(error));
            })
        }   
    }  

//Create Application    
export function getAddNewApplicationAction(token, applicantUserID, degreeCourseID, targetPeriodYear, targetPeriodShortName){

    return dispatch => {

        createNewApplicationRequest(token, applicantUserID, degreeCourseID, targetPeriodYear, targetPeriodShortName).then(
            userSession => {
                console.log("userSession in ApplicationActions " + JSON.stringify(userSession))
                const action = getCreateNewApplicationSuccessAction(userSession);
                dispatch(action);
            },
            error => {
                console.log("ERROR");
                console.log(error);
                dispatch(getCreateNewApplicationErrorAction(error));
            }
        )
            .catch(error => {
                console.log("CATCH ERROR");
                dispatch(getCreateNewApplicationErrorAction(error));
            })
        }   
    
}


//Delete Application  
export function getDeleteApplicationAction(token, id){

    return dispatch => {

        deleteApplicationRequest(token, id).then(
            userSession => {
                console.log("userSession in ApplicationActions " + JSON.stringify(userSession))
                const action = getDeleteApplicationSuccessAction(userSession);
                dispatch(action);
            },
            error => {
                console.log("ERROR");
                console.log(error);
                dispatch(getDeleteApplicationErrorAction(error));
            }
        )
            .catch(error => {
                console.log("CATCH ERROR");
                dispatch(getDeleteApplicationErrorAction(error));
            })
        }   
    
} 

//Request Functions zum Backend

//Request all Application
function allApplicationsRequest(token, isAdministrator){
    console.log(isAdministrator)
    let urlEnding = "";
    if(isAdministrator){

        urlEnding = config.backendEndpoints.applications;
    }
    else {

        urlEnding = config.backendEndpoints.myApplications;

    }

    const requestOptions= {
        method: 'GET',
        headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
    };
    //console.log(config.backendUrl + urlEnding)
    return fetch(config.backendUrl + urlEnding, requestOptions)
        .then(handleResponse)
        .then(userSession => {
            
            return userSession;

        })
}

//Request Create Application
function createNewApplicationRequest(token, applicantUserID, degreeCourseID, targetPeriodYear, targetPeriodShortName){

    const requestOptions= {
        method: 'POST',
        headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
        body: JSON.stringify({ 
        "applicantUserID": applicantUserID,
        "degreeCourseID": degreeCourseID,
        "targetPeriodYear": targetPeriodYear,
        "targetPeriodShortName": targetPeriodShortName,
        })                
    };
    
    return fetch(config.backendUrl + config.backendEndpoints.applications, requestOptions)
        .then(handleResponseCreate)
        .then(userSession => {
            
            return userSession;

        }) 

}


//Request Delete Application
function deleteApplicationRequest(token, id){

    const requestOptions= {
        method: 'DELETE',
        headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
        body: JSON.stringify({ 
        "id": id
        })                
    };
    
    return fetch(config.backendUrl + config.backendEndpoints.applications + id, requestOptions)
        .then(handleResponseDelete)
        .then(userSession => {
            
            return userSession;

        }) 

}

//handle responses

//handle getAllApplications
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
                
                console.log("Error get all courses");

            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        else{
            let userSession = {
                applications: data,
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
                
                console.log("Error create new course");

            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        else{
            let userSession = {
                newApplication: data,
            }
            return userSession;
        }
    }
    });

}


//handle delete
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
                
                console.log("Error delete course");

            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        else{
            let userSession = {
                newApplication: data,
            }
            return userSession;
        }
    }
    });

}
