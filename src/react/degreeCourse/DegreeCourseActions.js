import config from "../config/config";
import { Buffer } from "buffer";
import { json, useRevalidator } from "react-router-dom";

export const LOAD_COURSES_PENDING = "LOAD_COURSES_PENDING";
export const GET_COURSES_SUCCESS = "GET_COURSES_SUCCESS";
export const GET_COURSES_ERROR = "GET_COURSES_ERROR";
export const SHOW_CREATE_COURSE_MODAL = "SHOW_CREATE_COURSE_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";
export const CREATE_COURSE_SUCCESS = "CREATE_COURSE_SUCCSESS";
export const CREATE_COURSE_ERROR = "CREATE_COURSE_ERROR";
export const SHOW_EDIT_COURSE_MODAL = "SHOW_EDIT_COURSE_MODAL";
export const HIDE_EDIT_MODAL = "HIDE_EDIT_MODAL";
export const EDIT_COURSE_SUCCSESS = "EDIT_COURSE_SUCCSESS";
export const EDIT_COURSE_ERROR = "EDIT_COURSE_ERROR";
export const SHOW_DELETE_COURSE_MODAL = "SHOW_DELETE_COURSE_MODAL";
export const HIDE_DELETE_MODAL = "HIDE_DELETE_MODAL";
export const DELETE_COURSE_SUCCSESS = "DELETE_COURSE_SUCCSESS";
export const DELETE_COURSE_ERROR = "DELETE_COURSE_ERROR";


export function getLoadCoursesPendingAction(){

    return{

        type: LOAD_COURSES_PENDING,
        loadCourses: true
    }
}

export function getAllCoursesSuccessAction(userSession){

    return{

        type: GET_COURSES_SUCCESS,
        courses: userSession.courses,
        loadCourses: false
        
    }
}

export function getAllCoursesErrorAction(error){

    return{

        type: GET_COURSES_ERROR,
        error: error
        
    }
}

export function getShowCreateCourseModalAction(){

    return{

        type: SHOW_CREATE_COURSE_MODAL
    }
}

export function getHideModalAction(){

    return{

        type: HIDE_MODAL
    }
}

export function getCreateNewCourseSuccessAction(userSession){

    return{

        type: CREATE_COURSE_SUCCESS,
        newCourse: userSession.newCourse,
        
    }
}

export function getCreateNewCourseErrorAction(error){

    return{

        type: CREATE_COURSE_ERROR,
        error: error
        
    }
}

export function getShowEditCourseModalAction(){

    return{

        type: SHOW_EDIT_COURSE_MODAL
    }
}

export function getHideEditModalAction(){

    return{

        type: HIDE_EDIT_MODAL
    }
}

export function getEditCourseSuccessAction(){

    return{

        type: EDIT_COURSE_SUCCSESS
    }
}

export function getEditCourseErrorAction(error){

    return{

        type: EDIT_COURSE_ERROR,
        error: error
    }
}

export function getShowDeleteCourseModalAction(){

    return{

        type: SHOW_DELETE_COURSE_MODAL
    }
}

export function getHideDeleteModalAction(){

    return{

        type: HIDE_DELETE_MODAL
    }
}

export function getDeleteCourseSuccessAction(){

    return{

        type: DELETE_COURSE_SUCCSESS
    }
}

export function getDeleteCourseErrorAction(error){

    return{

        type: DELETE_COURSE_ERROR,
        error: error
    }
}

//Export Actions 

//Get All Courses
export function getAllCourses(token){
    
    return dispatch => {

        allCoursesRequest(token).then(
            userSession => {
                console.log("userSession DegreeCourseActions " + JSON.stringify(userSession))
                const action = getAllCoursesSuccessAction(userSession);
                dispatch(action);
            },
            error => {
                console.log("ERROR");
                console.log(error);
                dispatch(getAllCoursesErrorAction(error));
            }
        )
            .catch(error => {
                console.log("CATCH ERROR");
                dispatch(getAllCoursesErrorAction(error));
            })
        }   
    }  

//Create Course    
export function getAddNewCourseAction(token, universityName, universityShortName, departmentName, departmentShortName, name, shortName){

    return dispatch => {

        createNewCourseRequest(token, universityName, universityShortName, departmentName, departmentShortName, name, shortName).then(
            userSession => {
                console.log("userSession in DegreeCourseActions " + JSON.stringify(userSession))
                const action = getCreateNewCourseSuccessAction(userSession);
                dispatch(action);
            },
            error => {
                console.log("ERROR");
                console.log(error);
                dispatch(getCreateNewCourseErrorAction(error));
            }
        )
            .catch(error => {
                console.log("CATCH ERROR");
                dispatch(getCreateNewCourseErrorAction(error));
            })
        }   
    
}

//Edit Course    
export function getEditCourseAction(token, id, universityName, universityShortName, departmentName, departmentShortName, name, shortName){

    //console.log(id)
    //console.log("Hiii" + universityName + universityShortName + departmentName + departmentShortName + name + shortName)
    return dispatch => {

        editCourseRequest(token, id, universityName, universityShortName, departmentName, departmentShortName, name, shortName).then(
            userSession => {
                console.log("userSession in DegreeCourseActions " + JSON.stringify(userSession))
                const action = getEditCourseSuccessAction(userSession);
                dispatch(action);
            },
            error => {
                console.log("ERROR");
                console.log(error);
                dispatch(getEditCourseErrorAction(error));
            }
        )
            .catch(error => {
                console.log("CATCH ERROR");
                dispatch(getEditCourseErrorAction(error));
            })
        }   
    
} 

//Delete Course    
export function getDeleteCourseAction(token, id){

    return dispatch => {

        deleteCourseRequest(token, id).then(
            userSession => {
                console.log("userSession in DegreeCourseActions " + JSON.stringify(userSession))
                const action = getDeleteCourseSuccessAction(userSession);
                dispatch(action);
            },
            error => {
                console.log("ERROR");
                console.log(error);
                dispatch(getDeleteCourseErrorAction(error));
            }
        )
            .catch(error => {
                console.log("CATCH ERROR");
                dispatch(getDeleteCourseErrorAction(error));
            })
        }   
    
} 

//Request Functions zum Backend

//Request all Courses
function allCoursesRequest(token){

    const requestOptions= {
        method: 'GET',
        headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
    };
    return fetch(config.backendUrl + config.backendEndpoints.courses, requestOptions)
        .then(handleResponse)
        .then(userSession => {
            
            return userSession;

        })
}

//Request Create Course
function createNewCourseRequest(token, universityName, universityShortName, departmentName, departmentShortName, name, shortName){

    const requestOptions= {
        method: 'POST',
        headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
        body: JSON.stringify({ 
        "universityName": universityName,
        "universityShortName": universityShortName,
        "departmentName": departmentName,
        "departmentShortName": departmentShortName,
        "name": name,
        "shortName": shortName })                
    };
    
    return fetch(config.backendUrl + config.backendEndpoints.courses, requestOptions)
        .then(handleResponseCreate)
        .then(userSession => {
            
            return userSession;

        }) 

}

//Request Edit Course
function editCourseRequest(token, id, universityName, universityShortName, departmentName, departmentShortName, name, shortName){
    
    let requestOptions;
    //console.log(id)
    //console.log("Hiii" + universityName + universityShortName + departmentName + departmentShortName + name + shortName)
    if(token && id && universityName && universityShortName && departmentName && departmentShortName && name && shortName){

   requestOptions= {
        method: 'PUT',
        headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
        body: JSON.stringify({ 

        "universityName": universityName,
        "universityShortName": universityShortName,
        "departmentName": departmentName,
        "departmentShortName": departmentShortName,
        "name": name,
        "shortName": shortName 
        })                
    };

}
    console.log("Hooooooo" + id);
    return fetch(config.backendUrl + config.backendEndpoints.courses + id, requestOptions)
        .then(handleResponseEdit)
        .then(userSession => {
            
            return userSession;

        }) 
        
}

//Request Delete Course
function deleteCourseRequest(token, id){

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
    
    return fetch(config.backendUrl + config.backendEndpoints.courses + id, requestOptions)
        .then(handleResponseDelete)
        .then(userSession => {
            
            return userSession;

        }) 

}

//handle responses

//handle getAllCourses
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
                courses: data,
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
                newCourse: data,
            }
            return userSession;
        }
    }
    });

}

//handle editCourse
function handleResponseEdit(response){
    console.log(response)
    const authorizationHeader = response.headers.get("Authorization");
    const statusCode = response.status;
    return response.text().then(text => {
        
        if(statusCode === 200){

        const data = text && JSON.parse(text);
        var token;
        console.log(data)
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
                newCourse: data,
            }
            console.log("traaaaaaa" + JSON.stringify(userSession))
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
                newCourse: data,
            }
            return userSession;
        }
    }
    });

}
