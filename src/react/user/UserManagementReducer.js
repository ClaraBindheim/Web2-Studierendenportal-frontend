import * as UserManagementActions from "../user/UserManagementActions";

//Hier den state für den eingeloggten User angeben. Also Token etc. User wird Users weil es mehrere geben kann
const initialState = {
    currentUser: null,
    users: null,
    loadUsers: false,
    accessToken: false,
    newUser: null,
    showCreateUserModal: false,
    showEditUserModal: false,
    showDeleteUserModal: false,
    userEdit: false,
    error: null

    };

    function UserManagementReducer(state = initialState, action) {
    
        console.log("Bin im UserManagementReducer " + action.type)
        switch(action.type)
        {
            case UserManagementActions.LOAD_USERS_PENDING:
                return{

                    ...state,
                    loadUsers: true,
                    error: null

                }
                case UserManagementActions.GET_USERS_SUCCESS:
                    return{
        
                        ...state,
                        users: action.users,
                        loadUsers: false,
                        error: null
                    }
                case UserManagementActions.GET_USERS_ERROR:
                    return{
            
                        ...state,
                        loadUsers: true,
                        error: "Loading Users failed"
            
                        } 
                case UserManagementActions.SHOW_CREATE_USER_MODAL:
                    return{
            
                        ...state,
                        showCreateUserModal: true,
                        error: null
                    } 
                case UserManagementActions.HIDE_MODAL:
                    return{

                        ...state,
                        showCreateUserModal: false,
                        error: null

                    } 
                case UserManagementActions.CREATE_USER_SUCCESS:
                    return{

                        ...state,
                        newUser: action.newUser,
                        error: null
                    } 
                case UserManagementActions.CREATE_USER_ERROR:
                    return{

                        ...state,
                        error: "Error: User not created"
                    }   
                case UserManagementActions.SHOW_EDIT_USER_MODAL:
                    
                    return{
            
                        ...state,
                        showEditUserModal: true,
                        error: null
                    } 
                case UserManagementActions.HIDE_EDIT_MODAL:
                    return{

                        ...state,
                        showEditUserModal: false,
                        error: null

                    }
                case UserManagementActions.EDIT_USER_SUCCSESS:
                    
                    return{
            
                        ...state,
                        showEditUserModal: false,
                        error: null
                    } 
                case UserManagementActions.EDIT_USER_ERROR:
                    return{

                        ...state,
                        showEditUserModal: false,
                        error: "Error: user not edited"

                    }            
                case UserManagementActions.SHOW_DELETE_USER_MODAL:
                    
                    return{
            
                        ...state,
                        showDeleteUserModal: true,
                        error: null
                    } 
                case UserManagementActions.HIDE_DELETE_MODAL:
                    return{

                        ...state,
                        showDeleteUserModal: false,
                        error: null

                    }
                case UserManagementActions.DELETE_USER_SUCCSESS:
                    
                    return{
            
                        ...state,
                        showDeleteUserModal: false,
                        error: null
                    } 
                case UserManagementActions.DELETE_USER_ERROR:
                    return{

                        ...state,
                        showDeleteUserModal: false,
                        error: "Error: user not deleted"

                    }            
                default:
                return state;      
            }        
      
    };

export default UserManagementReducer;