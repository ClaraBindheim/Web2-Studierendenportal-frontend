import * as DegreeCourseActions from "../degreeCourse/DegreeCourseActions";

//Hier den state für den eingeloggten User angeben. Also Token etc. User wird Users weil es mehrere geben kann
const initialState = {
    currentUser: null,
    courses: null,
    loadCourses: false,
    accessToken: false,
    newCourse: null,
    showCreateCourseModal: false,
    showEditCourseModal: false,
    showDeleteCourseModal: false,
    courseEdit: false,
    error: null

    };

    function DegreeCourseReducer(state = initialState, action) {
    
        console.log("Bin im DegreeCourseReducer " + action.type)
        switch(action.type)
        {
            case DegreeCourseActions.LOAD_COURSES_PENDING:
                return{

                    ...state,
                    loadCourses: true,
                    error: null

                }
                case DegreeCourseActions.GET_COURSES_SUCCESS:
                    return{
        
                        ...state,
                        courses: action.courses,
                        loadCourses: false,
                        error: null
                    }
                case DegreeCourseActions.GET_COURSES_ERROR:
                    return{
            
                        ...state,
                        loadCourses: true,
                        error: "Loading Courses failed"
            
                        } 
                case DegreeCourseActions.SHOW_CREATE_COURSE_MODAL:
                    return{
            
                        ...state,
                        showCreateCourseModal: true,
                        error: null
                    } 
                case DegreeCourseActions.HIDE_MODAL:
                    return{

                        ...state,
                        showCreateCourseModal: false,
                        error: null

                    } 
                case DegreeCourseActions.CREATE_COURSE_SUCCESS:
                    return{

                        ...state,
                        newCourse: action.newCourse,
                        error: null
                    } 
                case DegreeCourseActions.CREATE_COURSE_ERROR:
                    return{

                        ...state,
                        error: "Error: Course not created"
                    }   
                case DegreeCourseActions.SHOW_EDIT_COURSE_MODAL:
                    
                    return{
            
                        ...state,
                        showEditCourseModal: true,
                        error: null
                    } 
                case DegreeCourseActions.HIDE_EDIT_MODAL:
                    return{

                        ...state,
                        showEditCourseModal: false,
                        error: null

                    }
                case DegreeCourseActions.EDIT_COURSE_SUCCSESS:
                    
                    return{
            
                        ...state,
                        showEditCourseModal: false,
                        error: null
                    } 
                case DegreeCourseActions.EDIT_COURSE_ERROR:
                    return{

                        ...state,
                        showEditCourseModal: false,
                        error: "Error: course not edited"

                    }            
                case DegreeCourseActions.SHOW_DELETE_COURSE_MODAL:
                    
                    return{
            
                        ...state,
                        showDeleteCourseModal: true,
                        error: null
                    } 
                case DegreeCourseActions.HIDE_DELETE_MODAL:
                    return{

                        ...state,
                        showDeleteCourseModal: false,
                        error: null

                    }
                case DegreeCourseActions.DELETE_COURSE_SUCCSESS:
                    
                    return{
            
                        ...state,
                        showDeleteCourseModal: false,
                        error: null
                    } 
                case DegreeCourseActions.DELETE_COURSE_ERROR:
                    return{

                        ...state,
                        showDeleteCourseModal: false,
                        error: "Error: course not deleted"

                    }            
                default:
                return state;      
            }        
      
    };

export default DegreeCourseReducer;