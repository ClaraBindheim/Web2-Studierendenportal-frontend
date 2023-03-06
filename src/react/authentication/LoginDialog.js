import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as AuthenticationActions from "./AuthenticationActions";

const mapStateToProps = state => {
  return state;
}

class LoginDialog extends Component{

  constructor(props){

    super(props);
    this.state = {
      userID: "",
      password: "",
      loggedIn: ""
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleSubmitLogout = this.handleSubmitLogout.bind(this);

  }

  handleShow(e){

    e.preventDefault();
    const {showLoginDialogAction} = this.props;
    showLoginDialogAction();

  }

  handleClose(){

    const {hideLoginDialogAction} = this.props;
    hideLoginDialogAction();

  }

  handleChange(e){

    const {name, value} = e.target;
    this.setState({[name]: value});

  }

  handleSubmitLogin(e){

    e.preventDefault();
    this.state.loggedIn = false;
    console.log("In HandleSubmitLogin" + JSON.stringify(this.state));
    const {userID, password, loggedIn} = this.state;
    const {authenticateUserAction} = this.props;
    authenticateUserAction(userID, password, loggedIn);   

  }

  handleSubmitLogout(e){

    e.preventDefault();
    this.state.loggedIn = true;
    console.log("In HandleSubmit" + JSON.stringify(this.state));
    const {userID, password, loggedIn} = this.state;
    const {authenticateUserAction} = this.props;
    authenticateUserAction(userID, password, loggedIn);   

  }

    render(){

      var showDialog = this.props.authReducer.showLoginDialog;
      if(showDialog == undefined){

        showDialog = false;

      }

      const user = this.props.authReducer.user;
      let button;

      if(user){

        button = <Button variant="primary" type="submit" id= "LogoutButton" onClick={this.handleSubmitLogout}>Logout</Button>

      }
      else{

        button = <Button variant="primary" id= "OpenLoginDialogButton" onClick={this.handleShow}>Login</Button>

      }

      return(
        <div style={{float: 'center', margin: 10}}>

      {button}

      <Modal id="LoginDialog" show={showDialog} onHide={this.handleClose}>
        
       <Modal.Header closeButton>
      
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>

        <Form>  
          <Form.Group className="mb-3">
            <Form.Label>UserID</Form.Label>
              <Form.Control id="LoginDialogUserIDText" type="text" placeholder="UserID" name="userID" onChange={this.handleChange}/>
          </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
            <Form.Control id="LoginDialogPasswordText" type="password" placeholder="Password" name="password" onChange={this.handleChange} />
        </Form.Group>

          <Button variant="primary" type="submit" id= "PerformLoginButton" onClick={this.handleSubmitLogin}>
            Submit
          </Button>

        </Form>

      </Modal.Body>

      <Modal.Footer></Modal.Footer>

      </Modal>

        </div>
      )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({

  showLoginDialogAction: AuthenticationActions.getShowDialogAction,
  hideLoginDialogAction: AuthenticationActions.getHideDialogAction,
  authenticateUserAction: AuthenticationActions.authenticateUser

}, dispatch)

const connectedLoginDialog = connect(mapStateToProps, mapDispatchToProps)(LoginDialog);

export default connectedLoginDialog;