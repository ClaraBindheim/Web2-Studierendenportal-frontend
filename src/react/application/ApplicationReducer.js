import * as ApplicationActions from "../application/ApplicationActions";

//Hier den state für den eingeloggten User angeben. Also Token etc. User wird Users weil es mehrere geben kann
const initialState = {
    currentUser: null,
    applications: null,
    loadApplications: false,
    accessToken: false,
    newApplication: null,
    showCreateApplicationModal: false,
    showDeleteApplicationModal: false,
    applicationEdit: false,
    error: null

    };

    function ApplicationReducer(state = initialState, action) {
    
        console.log("Bin im ApplicationReducer " + action.type)
        switch(action.type)
        {
            case ApplicationActions.LOAD_APPLICATIONS_PENDING:
                return{

                    ...state,
                    loadApplications: true,
                    error: null

                }
                case ApplicationActions.GET_APPLICATIONS_SUCCESS:
                    return{
        
                        ...state,
                        applications: action.applications,
                        loadApplications: false,
                        error: null
                    }
                case ApplicationActions.GET_APPLICATIONS_ERROR:
                    return{
            
                        ...state,
                        loadApplications: true,
                        error: "Loading Applications failed"
            
                        } 
                case ApplicationActions.SHOW_CREATE_APPLICATION_MODAL:
                    return{
            
                        ...state,
                        showCreateApplicationModal: true,
                        error: null
                    } 
                case ApplicationActions.HIDE_MODAL:
                    return{

                        ...state,
                        showCreateApplicationModal: false,
                        error: null

                    } 
                case ApplicationActions.CREATE_APPLICATION_SUCCESS:
                    return{

                        ...state,
                        newApplication: action.newApplication,
                        error: null
                    } 
                case ApplicationActions.CREATE_APPLICATION_ERROR:
                    return{

                        ...state,
                        error: "Error: Application not created"
                    }             
                case ApplicationActions.SHOW_DELETE_APPLICATION_MODAL:
                    
                    return{
            
                        ...state,
                        showDeleteApplicationModal: true,
                        error: null
                    } 
                case ApplicationActions.HIDE_DELETE_MODAL:
                    return{

                        ...state,
                        showDeleteApplicationModal: false,
                        error: null

                    }
                case ApplicationActions.DELETE_APPLICATION_SUCCSESS:
                    
                    return{
            
                        ...state,
                        showDeleteApplicationModal: false,
                        error: null
                    } 
                case ApplicationActions.DELETE_APPLICATION_ERROR:
                    return{

                        ...state,
                        showDeleteApplicationModal: false,
                        error: "Error: application not deleted"

                    }            
                default:
                return state;      
            }        
      
    };

export default ApplicationReducer;