import * as AuthenticationActions from "../authentication/AuthenticationActions";

const initialState = {
    user: null,
    loginPending: false,
    showLoginDialog: false,
    showLogoutDialog: false,
    accessToken: false,
    error: null

    };

    function AuthenticationReducer(state = initialState, action) {
    
        console.log("Bin im AuthenticationReducer " + action.type)
        switch(action.type)
        {
            case AuthenticationActions.SHOW_LOGIN_DIALOG:
                return{

                    ...state,
                    showLoginDialog: true,
                    error: null

                }
            case AuthenticationActions.HIDE_LOGIN_DIALOG:
                return{

                    ...state,
                    showLoginDialog: false,
                    error: null

                }
            case AuthenticationActions.AUTHENTICATION_PENDING:
                return{
    
                    ...state,
                    pending: true,
                    error: null
    
                }
            case AuthenticationActions.AUTHENTICATION_SUCCESS:
                return{
    
                    ...state,
                    showLoginDialog: false,
                    user: action.user,
                    accessToken: action.accessToken,
                    loggedIn: action.loggedIn,
                    error: null
    
                }
            case AuthenticationActions.AUTHENTICATION_ERROR:
                return{
        
                    ...state,
                    pending: false,
                    error: "Authentication failed"
        
                    } 
            case AuthenticationActions.LOGOUT_ACTION:
                return{
                
                    ...state,
                    user: null,
                    accessToken: null,
                    loginPending: false,
                    showLoginDialog: false,
                    showLogoutDialog: false,
                    error: null
                
                    }           
            default:
                return state;    
        }
    };

export default AuthenticationReducer;