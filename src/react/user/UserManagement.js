import React, { Component } from "react";
import {bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Row } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";

import * as UserManagementActions from "./UserManagementActions";


const mapStateToProps = state => {
   
    const { user } = state.authReducer;
    const { accessToken } = state.authReducer;
    const { loadUsers } = state.userReducer;
    const { users } = state.userReducer;
    const { showCreateUserModal } = state.userReducer;
    const { showEditUserModal } = state.userReducer;
    const { showDeleteUserModal } = state.userReducer;
    const { userEdit, newUser } = state.userReducer;
    return {
      user, accessToken, loadUsers, users, showCreateUserModal, showEditUserModal, userEdit, newUser, showDeleteUserModal
    };
}

class UserManagement extends Component{

    constructor(props){

        super(props);
        this.state = {
          currentUser: this.props.user,
          users: this.props.users,
          token: this.props.accessToken,
          loadUsers: this.props.loadUsers,
          showCreateUserModal: this.props.showCreateUserModal,
          showEditUserModal: this.props.showEditUserModal,
          showDeleteUserModal: this.props.showDeleteUserModal,
          userEdit: this.props.userEdit,
          newUser: this.props.newUser
        };
        this.openCreateUserModal = this.openCreateUserModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.openEditUserModal = this.openEditUserModal.bind(this);
        this.handleEditUser = this.handleEditUser.bind(this);
        this.handleDeleteClose = this.handleDeleteClose.bind(this);
        this.openDeleteUserModal = this.openDeleteUserModal.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
      }

    async componentDidMount(){
        
        //Damit die funktion bekannt ist...
        const {getAllUsersAction} = this.props;
        this.setState(await getAllUsersAction(this.state.token));
        console.log("In ComponentDidMount " + JSON.stringify(this.state));
        
    }

    async componentDidUpdate() {

        if(!this.props.loadUsers && this.state.userEdit) {
            const {getAllUsersAction} = this.props;
            await getAllUsersAction(this.state.token);
            this.setState({userEdit: false});
        }

    }
    
    openCreateUserModal(e){

        e.preventDefault();
        const {showCreateUserModalAction} = this.props;
        showCreateUserModalAction();

    }

    async openEditUserModal(e){
        console.log(JSON.stringify(this.state));
        console.log(e.target);
        e.preventDefault();
        const {showEditUserModalAction} = this.props;
        let tempFirstName, tempLastName;
        tempFirstName = (e.target.attributes.getNamedItem('data-firstname')) ? e.target.attributes.getNamedItem('data-firstname').value : "";
        tempLastName = (e.target.attributes.getNamedItem('data-lastname')) ? e.target.attributes.getNamedItem('data-lastname').value : "";
        this.setState(
            {
                "newUser": {
                    userID: e.target.attributes.getNamedItem('data-userid').value,
                    firstName: tempFirstName,
                    lastName: tempLastName,
                    password: e.target.attributes.getNamedItem('data-password').value,
                    isAdministrator: e.target.attributes.getNamedItem('data-isadmin').value
                },
                "userID": undefined,
                "firstName": undefined,
                "lastName": undefined,
                "password": undefined,
                "isAdministrator": undefined

            },
            () => {

                showEditUserModalAction();
                
            }
        );
    }

    async openDeleteUserModal(e){
       
        e.preventDefault();
        const {showDeleteUserModalAction} = this.props;
        this.setState(
            {
                "newUser": {
                    userID: e.target.attributes.getNamedItem('data-userid').value,
                }
            },
            () => {
                
                showDeleteUserModalAction();
            }
        );
    }

    handleEditUser(e){

        let userID;
        let firstName;
        let lastName;
        let password;
        let isAdmin;

        e.preventDefault();
        
        if(!this.state.userID){
            userID = this.state.newUser.userID;
        }
        else{
            userID = this.state.userID;
        }
        if(!this.state.firstName){
            firstName = this.state.newUser.firstName;
        }
        else{
            firstName = this.state.firstName;
        }
        if(!this.state.lastName){
            lastName = this.state.newUser.lastName;
        }
        else{
            lastName = this.state.lastName;
        }
        if(!this.state.password){
            password= this.state.newUser.password;
        }
        else{
            password = this.state.password;
        }
        if(!this.state.isAdministrator){
           
            isAdmin= this.state.newUser.isAdministrator;
        }
        else{
            
            isAdmin = this.state.isAdministrator;
        }
        
        const {editUserAction} = this.props;
        editUserAction(this.state.token, userID, firstName, lastName, password, isAdmin);
        this.setState({userEdit: true});
        const {hideEditModalAction} = this.props;
        hideEditModalAction();

    }

    handleClose(){

        const {hideModalAction} = this.props;
        hideModalAction();
        const {hideEditModalAction} = this.props;
        hideEditModalAction();
        const {hideDeleteModalAction} = this.props;
        hideDeleteModalAction();
    
    }
    
    handleEditClose(e){

        e.preventDefault();
        const {hideEditModalAction} = this.props;
        hideEditModalAction();
    
    }

    handleDeleteClose(e){

        e.preventDefault();
        const {hideDeleteModalAction} = this.props;
        hideDeleteModalAction();
    
    }

    handleChange(e){

        const {name, value} = e.target;
        this.setState({[name]: value});

    } 
    
    handleCreateUser(e){

        e.preventDefault();
        const {userID, firstName, lastName, password, isAdmin} = this.state;
        const {addNewUserAction} = this.props;
        const {hideModalAction} = this.props;
        addNewUserAction(this.state.token, userID, firstName, lastName, password, isAdmin);
        this.setState({userEdit: true})
        hideModalAction();
          
    }
    
    handleDeleteUser(e){

        e.preventDefault();
        let userID = this.state.newUser.userID;
        const {deleteUserAction} = this.props;
        deleteUserAction(this.state.token, userID);
        this.setState({userEdit: true});
        const {hideDeleteModalAction} = this.props;
        hideDeleteModalAction();

    }

    render(){

        const { user: currentUser } = this.props;
        const { accessToken: token } = this.props;
        const loadUsers = this.props.loadUsers;
        const users = this.props.users;
        const newUser = (this.state.newUser) ? this.state.newUser : null;

        var showCreateUserModal = this.props.showCreateUserModal;
        if(showCreateUserModal == undefined){

            showCreateUserModal = false;

        }

        var showEditUserModal = this.props.showEditUserModal;
        if(showEditUserModal == undefined){

            showEditUserModal = false;

        }

        var showDeleteUserModal = this.props.showDeleteUserModal;
        if(showDeleteUserModal == undefined){

            showDeleteUserModal = false;

        }

        if(currentUser && token && !loadUsers && users){
            
            const headline = <h1>User Management</h1>;

            let displayUsers = "";
            let userEditModal = "";
            let userDeleteModal = "";

            if(loadUsers){

                displayUsers = <p>Loading Users</p>;

            }
            else if(users){

                displayUsers = users.map(user => {
                    
                return <Card border="dark" className="userCard" key={user.userID} id={"UserItem" + user.userID} style={{ width: '20rem', margin: 20, padding: 0 }}>
                            <Card.Header style={{ fontWeight: 'bold'}}>User</Card.Header>
                            <Card.Body>
                                <ListGroup.Item>UserID: {user.userID}</ListGroup.Item>
                                <ListGroup.Item>UserName: {user.firstName + " " + user.lastName}</ListGroup.Item>
                                <ListGroup.Item>Admin: {user.isAdministrator.toString()}</ListGroup.Item>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="primary" id={"UserItemEditButton" + user.userID} data-userid={user.userID} data-firstname={user.firstName} 
                                    data-lastname={user.lastName} data-password="****" 
                                    data-isadmin={user.isAdministrator} style={{ margin: 10}} onClick={this.openEditUserModal}>Edit</Button>
                                <Button variant="danger" id={"UserItemDeleteButton" + user.userID} data-userid={user.userID} style={{ margin: 10}} onClick={this.openDeleteUserModal}>Delete</Button>
                            </Card.Footer>    
                        </Card> 
                    })
            }

            if(newUser){  
                userEditModal = (

                    <Modal id="UserManagementPageEditComponent" show={showEditUserModal} onHide={this.handleClose}>

                        <Modal.Header closeButton>
                            <Modal.Title>Edit User</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <Form>  
                                <Form.Group className="mb-3">
                                    <Form.Label>UserID cant be changed</Form.Label>
                                    <br />
                                    <Form.Text id="EditUserComponentEditUserID">{newUser.userID}</Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control id="EditUserComponentEditFirstName" type="text" placeholder={newUser.firstName} name="firstName" onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control id="EditUserComponentEditLastName" type="text" placeholder={newUser.lastName} name="lastName" onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control id="EditUserComponentEditPassword" type="password" placeholder={newUser.password} name="password" onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Administrator</Form.Label>
                                    <Form.Control as="select" className="inline form50" id="EditUserComponentEditIsAdministrator" name="isAdministrator" onChange={this.handleChange}>
                                        {
                                            (newUser.isAdministrator === "true") ?
                                                (<>
                                                    <option value="true">True</option>
                                                    <option value="false">False</option>
                                                </>)
                                                :
                                                (<>
                                                    <option value="false">False</option>
                                                    <option value="true">True</option>
                                                </>)
                                        }
                                    </Form.Control>
                                </Form.Group>

                                <Button variant="warning" type="submit" id= "EditUserComponentSaveUserButton" onClick={this.handleEditUser} style={{ margin: 10}}>Edit</Button>
                                <Button variant="secondary" type="submit" id= "OpenUserManagementPageListComponentButton" onClick={this.handleEditClose} style={{ margin: 10}}>Close</Button>

                            </Form>

                        </Modal.Body>

                        <Modal.Footer></Modal.Footer>

                    </Modal> 
            
                )
            
                userDeleteModal = (

                    <Modal id={"DeleteDialogUser" + newUser.userID} show={showDeleteUserModal} onHide={this.handleClose}>

                        <Modal.Header closeButton>
                            <Modal.Title>Delete User</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            Delete {newUser.userID} ?

                            <Button variant="danger" type="submit" id="DeleteDialogConfirmButton" onClick={this.handleDeleteUser} style={{ margin: 10}}>Delete</Button>
                            <Button variant="secondary" type="submit" id="DeleteDialogCancelButton" onClick={this.handleDeleteClose} style={{ margin: 10}}>Cancel</Button>

                        </Modal.Body>

                        <Modal.Footer></Modal.Footer>

                    </Modal> 
                ) 
            }

            return(
                
                <div className="page-content" id="UserManagementPage" style={{ background: 'white' , minHeight: "90vh"}}> 
                    
                    {headline}
                    <br />
                        
                 
                    <Button variant="success"  id="UserManagementPageCreateUserButton" style={{ margin: 10}} onClick={this.openCreateUserModal}>Create User</Button>
                   
                    <Container style={{ margin: 30, maxWidth: "100%" }}>
                        <Row className="g-4">
                            {displayUsers}
                            {userEditModal}
                            {userDeleteModal}
                        </Row>
                    </Container>  

                    <Modal id="UserManagementPageCreateComponen" show={showCreateUserModal} onHide={this.handleClose}>
            
                        <Modal.Header closeButton>
            
                            <Modal.Title>Create User</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <Form>  
                                <Form.Group className="mb-3">
                                    <Form.Label>UserID</Form.Label>
                                    <Form.Control id="CreateUserComponentEditUserID" type="text" placeholder="UserID" name="userID" onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control id="CreateUserComponentEditFirsttName" type="text" placeholder="FirstName" name="firstName" onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control id="CreateUserComponentEditLastName" type="text" placeholder="LastName" name="lastName" onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control id="CreateUserComponentEditPassword" type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Administrator</Form.Label>
                                    <Form.Control as="select" className="inline form50" id="CreateUserComponentEditIsAdministrator" name="isAdmin" onChange={this.handleChange}>
                                        <option value="placeholder">please set value</option>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </Form.Control>
                                </Form.Group>

                                <Button variant="success" type="submit" id="CreateUserComponentCreateUserButton" onClick={this.handleCreateUser}>Create</Button>

                            </Form>

                        </Modal.Body>

                        <Modal.Footer></Modal.Footer>

                    </Modal> 
                
                </div>  
                
            ) 

        }
        else if(!users || users.length === 0){
            return(
            
                <div className="page-content" id="UserManagementPage" style={{ background: 'white' , minHeight: "90vh"}}> 
                    <br />
                    No users found
                </div>  
            
            ) 
        
        }   
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({

    getAllUsersAction: UserManagementActions.getAllUsers,
    showCreateUserModalAction: UserManagementActions.getShowCreateUserModalAction,
    hideModalAction: UserManagementActions.getHideModalAction,
    addNewUserAction: UserManagementActions.getAddNewUserAction,
    showEditUserModalAction: UserManagementActions.getShowEditUserModalAction,
    hideEditModalAction: UserManagementActions.getHideEditModalAction,
    editUserAction: UserManagementActions.getEditUserAction, 
    showDeleteUserModalAction: UserManagementActions.getShowDeleteUserModalAction,
    hideDeleteModalAction: UserManagementActions.getHideDeleteModalAction,
    deleteUserAction: UserManagementActions.getDeleteUserAction
  
  }, dispatch)
  
  const connectedUserManagement = connect(mapStateToProps, mapDispatchToProps)(UserManagement);
  
  export default connectedUserManagement;