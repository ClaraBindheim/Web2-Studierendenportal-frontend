import React, { Component } from "react";
import config from "../config/config";
import { connect } from "react-redux";
import {bindActionCreators } from "redux";
import { Button, Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";

import * as ApplicationActions from "./ApplicationActions";


const mapStateToProps = state => {
   
    const { user } = state.authReducer;
    const { accessToken } = state.authReducer;
    const { loadApplications } = state.applicationReducer;
    const { applications } = state.applicationReducer;
    const { showCreateApplicationModal } = state.applicationReducer;
    const { showDeleteApplicationModal } = state.applicationReducer;
    const { applicationEdit, newApplication } = state.applicationReducer;
    return {
      user, accessToken, loadApplications, applications, showCreateApplicationModal, applicationEdit, newApplication, showDeleteApplicationModal
    };
}

class ApplicationManagement extends Component{

    constructor(props){

        super(props);
        this.state = {
          currentUser: this.props.user,
          applications: this.props.applications,
          token: this.props.accessToken,
          loadApplications: this.props.loadApplications,
          showDeleteApplicationModal: this.props.showDeleteApplicationModal,
          applicationEdit: this.props.applicationEdit,
          newApplication: this.props.newApplication
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDeleteClose = this.handleDeleteClose.bind(this);
        this.handleDeleteApplication = this.handleDeleteApplication.bind(this);
        this.openDeleteApplicationModal = this.openDeleteApplicationModal.bind(this);

      }

      async componentDidMount(){
        console.log("DidMount " + this.state.currentUser.isAdmin)
        //Damit die funktion bekannt ist...
        const {getAllApplicationsAction} = this.props;
        this.setState(await getAllApplicationsAction(this.state.token, this.state.currentUser.isAdministrator));
        console.log("In ComponentDidMount " + JSON.stringify(this.state));
        
    }

    async componentDidUpdate() {
        if(!this.props.loadApplications && this.state.applicationEdit) {
            const {getAllApplicationsAction} = this.props;
            await getAllApplicationsAction(this.state.token, this.state.currentUser.isAdministrator);
            this.setState({applicationEdit: false});
        }

    }

    handleChange(e){

        const {name, value} = e.target;
        this.setState({[name]: value});
        //console.log(JSON.stringify(this.state));

    } 

    handleClose(){

        const {hideModalAction} = this.props;
        hideModalAction();
        const {hideDeleteModalAction} = this.props;
        hideDeleteModalAction();
    
    }
    

    async openDeleteApplicationModal(e){
       
        e.preventDefault();
        console.log(e.target.attributes)
        const {showDeleteApplicationModalAction} = this.props;
        this.setState(
            {
                "newApplication": {
                    id: e.target.attributes.getNamedItem('data-applicationid').value
                }
            },
            () => {
                
                showDeleteApplicationModalAction();
            }
        );
    }

    handleDeleteClose(e){

        e.preventDefault();
        const {hideDeleteModalAction} = this.props;
        hideDeleteModalAction();
    
    }

    handleDeleteApplication(e){

        e.preventDefault();
        let id = this.state.newApplication.id;
        console.log(id);
        const {deleteApplicationAction} = this.props;
        deleteApplicationAction(this.state.token, id);
        this.setState({applicationEdit: true});
        const {hideDeleteModalAction} = this.props;
        hideDeleteModalAction();

    }



    render(){

        const { user: currentUser } = this.props;
        const { accessToken: token } = this.props;
        const loadApplications= this.props.loadApplications;
        const applications = this.props.applications;
        const newApplication = (this.state.newApplication) ? this.state.newApplication : null;

        var showDeleteApplicationModal = this.props.showDeleteApplicationModal;
        if(showDeleteApplicationModal == undefined){

            showDeleteApplicationModal = false;

        }

        if(currentUser && token && !loadApplications && applications){

            const headline = <h1>Applications</h1>;
            let displayApplications = "";
            let displayDeleteModal = "";
        
            if(loadApplications){

                displayApplications = <p>Loading Applications</p>;

            }
            else if(applications){

                displayApplications = applications.map(application => {
                            
                    return <Card border="dark" className="applicationCard" key={application.id} id={"DegreeCourseApplicationItem" + application.id} style={{ width: '25rem', margin: 20, padding: 0 }}>
                                <Card.Header style={{ fontWeight: 'bold'}}>Application</Card.Header>
                                <Card.Body>
                                    <ListGroup.Item>id: {application.id}</ListGroup.Item>
                                    <ListGroup.Item id="ApplicantUserID">ApplicantUserID: {application.applicantUserID}</ListGroup.Item>
                                    <ListGroup.Item id="DegreeCourseName">DegreeCourseName: {application.degreeCourseName}</ListGroup.Item>
                                    <ListGroup.Item id="TargetPeriodYear">TargetPeriodYear: {application.targetPeriodYear}</ListGroup.Item>
                                    <ListGroup.Item id="TargetPeriodShortName">TargetPeriodShortName: {application.targetPeriodShortName}</ListGroup.Item>
                                    <ListGroup.Item id="UniversityShortName">UniversityShortName: {application.universityShortName}</ListGroup.Item>   
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="danger" type="submit" id={"DegreeCourseApplicationItemDeleteButton" + application.id} data-applicationid={application.id} onClick={this.openDeleteApplicationModal} style={{ margin: 10}}>Delete</Button>
                                </Card.Footer>    
                            </Card> 
                        })
            
            if(newApplication){
                   
                    displayDeleteModal = (

                        <Modal id={"DeleteDialogDegreeCourseApplication" + newApplication.id} show={showDeleteApplicationModal} onHide={this.handleClose}>

                            <Modal.Header closeButton>
                                <Modal.Title>Delete Application</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>

                                Delete {newApplication.id} ?

                                <Button variant="danger" type="submit" id= "DeleteDialogConfirmButton" onClick={this.handleDeleteApplication} style={{ margin: 10}}>Delete</Button>
                                <Button variant="secondary" type="submit" id= "DeleteDialogCancelButton" onClick={this.handleDeleteClose} style={{ margin: 10}}>Cancel</Button>

                            </Modal.Body>

                            <Modal.Footer></Modal.Footer>

                        </Modal> 
                    )
                }         
            
            }

        return(
            
            <div className="DegreeCourseApplicationManagementPageListComponent">
                {headline}
                {displayDeleteModal}

                <Container style={{ margin: 30, maxWidth: "100%" }}>
                    <Row className="g-4">
                    {displayApplications}
                    </Row>
                </Container>
                
                
            </div>

        ) 

        }
        else if(!applications || applications.length === 0){
            return(
            
                <div className="page-content" id="UserManagementPage" style={{ background: 'white' , minHeight: "90vh"}}> 
                    <br />
                    No applications found
                </div>  
            
            ) 
        
        }   
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({

    getAllApplicationsAction: ApplicationActions.getAllApplications,
    showCreateApplicationModalAction: ApplicationActions.getShowCreateApplicationModalAction,
    hideModalAction: ApplicationActions.getHideApplicationModalAction,
    hideDeleteModalAction: ApplicationActions.getHideDeleteModalAction,
    addNewApplicationAction: ApplicationActions.getAddNewApplicationAction,
    showDeleteApplicationModalAction: ApplicationActions.getShowDeleteApplicationModalAction,
    deleteApplicationAction: ApplicationActions.getDeleteApplicationAction
  
  }, dispatch)
  
  const connectedApplicationManagement = connect(mapStateToProps, mapDispatchToProps)(ApplicationManagement);
  
  export default connectedApplicationManagement;