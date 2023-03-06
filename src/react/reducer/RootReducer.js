import { combineReducers } from "redux";
import authReducer from "../authentication/AuthenticationReducer";
import userReducer from "../user/UserManagementReducer";
import courseReducer from "../degreeCourse/DegreeCourseReducer";
import applicationReducer from "../application/ApplicationReducer";


const rootReducer = combineReducers({
    authReducer, 
    userReducer,
    courseReducer,
    applicationReducer
});

export default rootReducer;
