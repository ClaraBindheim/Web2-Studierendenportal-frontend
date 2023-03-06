import React, { Component } from "react";
import {bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";

import * as DegreeCourseActions from "./DegreeCourseActions";
import * as ApplicationActions from "../application/ApplicationActions";




const mapStateToProps = state => {
   
    const { user } = state.authReducer;
    const { accessToken } = state.authReducer;
    const { loadCourses } = state.courseReducer;
    const { courses } = state.courseReducer;
    const { showCreateCourseModal } = state.courseReducer;
    const { showEditCourseModal } = state.courseReducer;
    const { showDeleteCourseModal } = state.courseReducer;
    const { courseEdit, newCourse } = state.courseReducer;
    const { showCreateApplicationModal, newApplication } = state.applicationReducer;
    return {
      user, accessToken, loadCourses, courses, showCreateCourseModal, showEditCourseModal, courseEdit, newCourse, showDeleteCourseModal,
      showCreateApplicationModal, newApplication
    };
}

class DegreeCourseManagement extends Component{

    constructor(props){

        super(props);
        this.state = {
          currentUser: this.props.user,
          courses: this.props.courses,
          token: this.props.accessToken,
          loadCourses: this.props.loadCourses,
          showCreateCourseModal: this.props.showCreateCourseModal,
          showEditCourseModal: this.props.showEditCourseModal,
          showDeleteCourseModal: this.props.showDeleteCourseModal,
          courseEdit: this.props.courseEdit,
          newCourse: this.props.newCourse,
          showCreateApplicationModal: this.props.showCreateApplicationModal,
          newApplication: this.props.newApplication
        };
        this.openCreateCourse = this.openCreateCourse.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCreateCourse = this.handleCreateCourse.bind(this);
        this.openCreateApplicationModal = this.openCreateApplicationModal.bind(this);
        this.openEditCourseModal = this.openEditCourseModal.bind(this);
        this.openDeleteCourseModal = this.openDeleteCourseModal.bind(this);
        this.handleEditCourse = this.handleEditCourse.bind(this);
        this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);
        this.handleDeleteClose = this.handleDeleteClose.bind(this);
        this.handleCreateApplication = this.handleCreateApplication.bind(this);
        this.handleApplicationClose = this.handleApplicationClose.bind(this);
      }

      async componentDidMount(){
        
        //Damit die funktion bekannt ist...
        const {getAllCoursesAction} = this.props;
        this.setState(await getAllCoursesAction(this.state.token));
        console.log("In ComponentDidMount " + JSON.stringify(this.state));
        
    }

    async componentDidUpdate() {
        if(!this.props.loadCourses && this.state.courseEdit) {
            console.log("DidUpdate " + this.state.courseEdit);
            const {getAllCoursesAction} = this.props;
            await getAllCoursesAction(this.state.token);
            this.setState({courseEdit: false});
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
        const {hideEditModalAction} = this.props;
        hideEditModalAction();
        const {hideDeleteModalAction} = this.props;
        hideDeleteModalAction();
    
    }

    openCreateCourse(e){
        
        e.preventDefault();
        const {showCreateCourseModalAction} = this.props;
        showCreateCourseModalAction();

    }

    openCreateApplicationModal(e) {
        e.preventDefault();
        const {showCreateApplicationModalAction} = this.props;
        this.setState(
            {
                "newCourse": {
                    id: e.target.attributes.getNamedItem('data-courseid').value,
                    name: e.target.attributes.getNamedItem('data-name').value,

                },
                "id": undefined,
                "universityName": undefined,
                "universityShortName": undefined,
                "departmentName": undefined,
                "departmentShortName": undefined,
                "name": undefined,
                "shortName": undefined
                
            },
            () => {

                showCreateApplicationModalAction();
                
            }
        );
    }

    handleCreateCourse(e){

        e.preventDefault();
        const {universityName, universityShortName, departmentName, departmentShortName, name, shortName} = this.state;
        const {addNewCourseAction} = this.props;
        addNewCourseAction(this.state.token, universityName, universityShortName, departmentName, departmentShortName, name, shortName);
        this.setState({courseEdit: true});
        const {hideModalAction} = this.props;
        hideModalAction();

    }

    async openEditCourseModal(e){
        
        e.preventDefault();
        const {showEditCourseModalAction} = this.props;
        this.setState(
            {
                "newCourse": {
                    id: e.target.attributes.getNamedItem('data-courseid').value,
                    universityName: e.target.attributes.getNamedItem('data-universityname').value,
                    universityShortName: e.target.attributes.getNamedItem('data-universityshortname').value,
                    departmentName: e.target.attributes.getNamedItem('data-departmentname').value,
                    departmentShortName: e.target.attributes.getNamedItem('data-departmentshortname').value,
                    name: e.target.attributes.getNamedItem('data-name').value,
                    shortName: e.target.attributes.getNamedItem('data-shortname').value
                },
                "id": undefined,
                "universityName": undefined,
                "universityShortName": undefined,
                "departmentName": undefined,
                "departmentShortName": undefined,
                "name": undefined,
                "shortName": undefined
                
            },
            () => {

                showEditCourseModalAction();
                
            }
        );
    }

    handleEditCourse(e){

        let id;
        let name;
        let shortName;
        let universityName;
        let universityShortName;
        let departmentName;
        let departmentShortName;

        e.preventDefault();
        
        if(!this.state.id){
            id = this.state.newCourse.id;
        }
        else{
            id = this.state.id;
        }
        if(!this.state.name){
            name = this.state.newCourse.name;
        }
        else{
            name = this.state.name;
        }
        if(!this.state.shortName){
            shortName = this.state.newCourse.shortName;
        }
        else{
            shortName = this.state.shortName;
        }
        if(!this.state.universityName){
            universityName = this.state.newCourse.universityName;
        }
        else{
            universityName = this.state.universityName;
        }
        if(!this.state.universityShortName){
            universityShortName = this.state.newCourse.universityShortName;
        }
        else{
            universityShortName = this.state.universityShortName;
        }
        if(!this.state.departmentName){
           
            departmentName = this.state.newCourse.departmentName;
        }
        else{
            
            departmentName = this.state.departmentName;
        }
        if(!this.state.departmentShortName){
           
            departmentShortName = this.state.newCourse.departmentShortName;
        }
        else{
            
            departmentShortName = this.state.departmentShortName;
        }
        
        console.log(JSON.stringify(this.state));
        const {editCourseAction} = this.props;
        editCourseAction(this.state.token, id, universityName, universityShortName, departmentName, departmentShortName, name, shortName);
        this.setState({courseEdit: true});
        const {hideEditModalAction} = this.props;
        hideEditModalAction();

    }

    async openDeleteCourseModal(e){
       
        e.preventDefault();
        const {showDeleteCourseModalAction} = this.props;
        this.setState(
            {
                "newCourse": {
                    id: e.target.attributes.getNamedItem('data-courseid').value
                }
            },
            () => {
                
                showDeleteCourseModalAction();
            }
        );
    }

    handleDeleteCourse(e){

        e.preventDefault();
        let id = this.state.newCourse.id;
        console.log(id)
        const {deleteCourseAction} = this.props;
        deleteCourseAction(this.state.token, id);
        this.setState({courseEdit: true});
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

    handleCreateApplication(e){

        let id;
     
        if(!this.state.id){
            id = this.state.newCourse.id;
        }
        else{
            id = this.state.id;
        }

        e.preventDefault();
        const {applicantUserID, targetPeriodYear, targetPeriodShortName} = this.state;
        const {addNewApplicationAction} = this.props;
        addNewApplicationAction(this.state.token, applicantUserID, id, targetPeriodYear, targetPeriodShortName);
        this.setState({courseEdit: true});
        const {hideApplicationModalAction} = this.props;
        hideApplicationModalAction();

    }

    handleApplicationClose(e){

        e.preventDefault();
        const {hideApplicationModalAction} = this.props;
        hideApplicationModalAction();
    }

    render(){
        
        const { user: currentUser } = this.props;
        const { accessToken: token } = this.props;
        const loadCourses = this.props.loadCourses;
        const courses = this.props.courses;
        //Wie bei UserManagement if newCourse true dann das erste, false das zeite (also null)
        const newCourse = (this.state.newCourse) ? this.state.newCourse : null;

        var showCreateCourseModal = this.props.showCreateCourseModal;
        if(showCreateCourseModal == undefined){
        
            showCreateCourseModal = false;

        }

        var showEditCourseModal = this.props.showEditCourseModal;
        if(showEditCourseModal == undefined){

            showEditCourseModal = false;

        }

        var showDeleteCourseModal = this.props.showDeleteCourseModal;
        if(showDeleteCourseModal == undefined){

            showDeleteCourseModal = false;

        }

        var showCreateApplicationModal = this.props.showCreateApplicationModal;
        if(showCreateApplicationModal == undefined){

            showCreateApplicationModal = false;

        }

        if(currentUser && token && !loadCourses && courses){

            const headline = <h1>Degree Courses</h1>;
            let displayCourses = "";
            let courseEditModal = "";
            let courseDeleteModal = "";
            let createApplicationModal = "";
            let createButton = "";

            if(loadCourses){

                displayCourses = <p>Loading Courses</p>;

            }
            else if(courses){ 

            displayCourses = courses.map(course => {
                        
                return <Card border="dark" className="courseCard" key={course.id} id={"DegreeCourseItem" + course.id} style={{ width: '25rem', margin: 20, padding: 0 }}>
                            <Card.Header style={{ fontWeight: 'bold'}}>Degree Course</Card.Header>
                            <Card.Body>
                                <ListGroup.Item>id: {course.id}</ListGroup.Item>
                                <ListGroup.Item id="UniversityName">Universtity name: {course.universityName}</ListGroup.Item>
                                <ListGroup.Item id="UniversityShortName">Universtity short name: {course.universityShortName}</ListGroup.Item>
                                <ListGroup.Item id="DepartmentName">Departement name: {course.departmentName}</ListGroup.Item>
                                <ListGroup.Item id="DepartmentShortName">Departement short name: {course.departmentShortName}</ListGroup.Item>
                                <ListGroup.Item id="Name">name: {course.name}</ListGroup.Item>
                                <ListGroup.Item id="ShortName">Short name: {course.shortName}</ListGroup.Item>    
                            </Card.Body>
                            <Card.Footer>
                                {
                                    (currentUser.isAdministrator) ?
                                        (<>
                                            <Button variant="warning" type="submit" id={"DegreeCourseItemEditButton" + course.id} onClick={this.openEditCourseModal} style={{ margin: 10}}
                                            data-courseid={course.id} data-universityname={course.universityName} data-universityshortname={course.universityShortName}
                                            data-departmentname={course.departmentName} data-departmentshortname={course.departmentShortName} data-name={course.name}
                                            data-shortname={course.shortName}>Edit</Button>
                                            <Button variant="danger" type="submit" id={"DegreeCourseItemDeleteButton" + course.id} data-courseid={course.id} onClick={this.openDeleteCourseModal} style={{ margin: 10}}>Delete</Button>
                                        </>)
                                        :
                                        (<></>)
                                }
                                <Button variant="success" type="submit" id={"CreateDegreeCourseApplicationForDegreeCourse" + course.id} onClick={this.openCreateApplicationModal} style={{ margin: 10}}
                                data-courseid={course.id} data-universityname={course.universityName} data-universityshortname={course.universityShortName}
                                data-departmentname={course.departmentName} data-departmentshortname={course.departmentShortName} data-name={course.name}
                                data-shortname={course.shortName}>Create Application</Button>
                            </Card.Footer>    
                        </Card> 
                    })
            
                }
            
            if(newCourse){

                courseEditModal = (

                    <Modal id="DegreeCourseManagementPageEditComponent" show={showEditCourseModal} onHide={this.handleClose}>
                
                    <Modal.Header closeButton>

                        <Modal.Title>Edit Course</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Form>  
                                <Form.Group className="mb-3">
                                    <Form.Label>Id cant be changed</Form.Label>
                                    <br />
                                    <Form.Text id="EditCourseComponentEditCourseID">{newCourse.id}</Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>University name</Form.Label>
                                    <Form.Control id="EditDegreeCourseComponentEditUniversityName" type="text" placeholder={newCourse.universityName} name="universityName" onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>University short name</Form.Label>
                                    <Form.Control id="EditDegreeCourseComponentEditUniversityShortName" type="text" placeholder={newCourse.universityShortName} name="universityShortName" onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Department name</Form.Label>
                                    <Form.Control id="EditDegreeCourseComponentEditDepartmentName" type="text" placeholder={newCourse.departmentName} name="departmentName" onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Department short name</Form.Label>
                                    <Form.Control id="EditDegreeCourseComponentEditDepartmentShortName“" type="text" placeholder={newCourse.departmentShortName} name="departmentShortName" onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group className="mb-3">   
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control id="EditDegreeCourseComponentEditName" type="text" placeholder={newCourse.name} name="name" onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Short name</Form.Label>
                                    <Form.Control id="EditDegreeCourseComponentEditShortName" type="text" placeholder={newCourse.shortName} name="shortName" onChange={this.handleChange}/>
                                </Form.Group>

                                    <Button variant="warning" type="submit" id= "EditDegreeCourseComponentSaveDegreeCourseButton" onClick={this.handleEditCourse} style={{ margin: 10}}>Edit</Button>
                                    
                                    <Button variant="secondary" id="OpenDegreeCourseManagementPageListComponentButton" style={{ margin: 10}} onClick={this.handleEditClose}>Close</Button>

                            </Form> 

                    </Modal.Body>

                    <Modal.Footer></Modal.Footer>

                </Modal>

                )


                courseDeleteModal = (

                    <Modal id={"DeleteDialogDegreeCourse" + newCourse.id} show={showDeleteCourseModal} onHide={this.handleClose}>

                        <Modal.Header closeButton>
                            <Modal.Title>Delete Course</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            Delete {newCourse.id} ?

                            <Button variant="danger" type="submit" id= "DeleteDialogConfirmButton" onClick={this.handleDeleteCourse} style={{ margin: 10}}>Delete</Button>
                            <Button variant="secondary" type="submit" id= "DeleteDialogCancelButton" onClick={this.handleDeleteClose} style={{ margin: 10}}>Cancel</Button>

                        </Modal.Body>

                        <Modal.Footer></Modal.Footer>

                    </Modal> 
                )
                
                createApplicationModal = (

                    <Modal id="DegreeCourseManagementPageCreateApplicationComponent" show={showCreateApplicationModal} onHide={this.handleClose}>
                
                        <Modal.Header closeButton>
                            <Modal.Title>Create Application</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <Form>  
                                <Form.Group className="mb-3">
                                    <Form.Label>CourseName</Form.Label>
                                    <br />
                                    <Form.Text id="EditUserComponentEditUserID">{newCourse.name}</Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>ApplicantUserID</Form.Label>
                                        {
                                            (currentUser.isAdministrator) ?
                                                (<>
                                                    <Form.Control id="CreateDegreeCourseApplicationEditUserID" type="text" placeholder="ApplicantUserID" name="applicantUserID" onChange={this.handleChange}/>
                                                </>)
                                                :
                                                (<>
                                                    &nbsp;<Form.Text id="CreateDegreeCourseApplicationEditUserID">{currentUser.userID}</Form.Text>
                                                </>)
                                        }
                                </Form.Group>

                                <Form.Group className="mb-3">   
                                    <Form.Label>TargetPeriodYear</Form.Label>
                                    <Form.Control id="CreateDegreeCourseApplicationEditTargetPeriodYear" type="text" placeholder="TargetPeriodYear" name="targetPeriodYear" onChange={this.handleChange}/>
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label>Semester</Form.Label>
                                    <Form.Control as="select" className="inline form50" id="CreateDegreeCourseApplicationEditTargetPeriodName" name="targetPeriodShortName" onChange={this.handleChange}>
                                        <option value="">Bitte Semester auswählen</option>
                                        <option value="WiSe">Wintersemester</option>
                                        <option value="SoSe">Sommersemester</option>
                                    </Form.Control>
                                </Form.Group>

                                <Button variant="success" type="submit" id= "CreateDegreeCourseApplicationCreateButton" onClick={this.handleCreateApplication} style={{ margin: 10}}>Create</Button>
                                    
                                <Button variant="secondary" id="OpenDegreeCourseManagementPageListComponentButton" style={{ margin: 10}} onClick={this.handleApplicationClose}>Close</Button>

                            </Form> 

                        </Modal.Body>

                        <Modal.Footer></Modal.Footer>

                    </Modal>

                )

            }

            return(
                
                <div className="page-content" id="DegreeCourseManagementPageListComponent" style={{ background: 'white' , minHeight: "90vh"}}>
                    {headline}
                    {courseDeleteModal}
                    {courseEditModal}
                    {createApplicationModal}
                    <br />
                            
                            {
                                (currentUser.isAdministrator) ?
                                    (<>
                                        <Button variant="success" id="DegreeCourseManagementPageCreateDegreeCourseButton" style={{ margin: 10}} onClick={this.openCreateCourse}>Create Course</Button>
                                    </>)
                                    :
                                    (<></>)
                            }
                            
                            <Container style={{ margin: 30, maxWidth: "100%" }}>
                                <Row className="g-4">
                                    {displayCourses}
                                
                                </Row>
                            </Container>

                            <Modal id="DegreeCourseManagementPageCreateComponent" show={showCreateCourseModal} onHide={this.handleClose}>
                
                            <Modal.Header closeButton>

                                <Modal.Title>Create Course</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>

                                <Form>  
                                        <Form.Group className="mb-3">   
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control id="CreateDegreeCourseComponentEditName" type="text" placeholder="Name" name="name" onChange={this.handleChange}/>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Short name</Form.Label>
                                            <Form.Control id="CreateDegreeCourseComponentEditShortName" type="text" placeholder="Short name" name="shortName" onChange={this.handleChange}/>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>University name</Form.Label>
                                            <Form.Control id="CreateDegreeCourseComponentEditUniversityName" type="text" placeholder="University name" name="universityName" onChange={this.handleChange}/>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>University short name</Form.Label>
                                            <Form.Control id="CreateDegreeCourseComponentEditUniversityShortName" type="text" placeholder="University short name" name="universityShortName" onChange={this.handleChange}/>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Department name</Form.Label>
                                            <Form.Control id="CreateDegreeCourseComponentEditDepartmentName" type="text" placeholder="Department name" name="departmentName" onChange={this.handleChange}/>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Department short name</Form.Label>
                                            <Form.Control id="CreateDegreeCourseComponentEditDepartmentShortName“" type="text" placeholder="Department short name" name="departmentShortName" onChange={this.handleChange}/>
                                        </Form.Group>

                                            <Button variant="success" type="submit" id= "CreateDegreeCourseComponentCreateDegreeCourseButton" onClick={this.handleCreateCourse} style={{ margin: 10}}>Create</Button>
                                            
                                            <Button variant="secondary" id="OpenDegreeCourseManagementPageListComponentButton" style={{ margin: 10}} onClick={this.handleClose}>Close</Button>

                                    </Form> 

                            </Modal.Body>

                            <Modal.Footer></Modal.Footer>

                        </Modal>     
                    

                </div>  
            ) 
        }
        else if(!courses || courses.length === 0){
            return(
            
                <div className="page-content" id="UserManagementPage" style={{ background: 'white' , minHeight: "90vh"}}> 
                    <br />
                    No courses found
                </div>  
            
            ) 
        
        }   
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({

    getAllCoursesAction: DegreeCourseActions.getAllCourses,
    showCreateCourseModalAction: DegreeCourseActions.getShowCreateCourseModalAction,
    showCreateApplicationModalAction: ApplicationActions.getShowCreateApplicationModalAction,
    hideModalAction: DegreeCourseActions.getHideModalAction,
    hideEditModalAction: DegreeCourseActions.getHideEditModalAction,
    hideDeleteModalAction: DegreeCourseActions.getHideDeleteModalAction,
    addNewCourseAction: DegreeCourseActions.getAddNewCourseAction,
    showEditCourseModalAction: DegreeCourseActions.getShowEditCourseModalAction,
    showDeleteCourseModalAction: DegreeCourseActions.getShowDeleteCourseModalAction,
    deleteCourseAction: DegreeCourseActions.getDeleteCourseAction,
    editCourseAction: DegreeCourseActions.getEditCourseAction,
    addNewApplicationAction: ApplicationActions.getAddNewApplicationAction,
    hideApplicationModalAction: ApplicationActions.getHideApplicationModalAction
  
  }, dispatch)
  
  const connectedDegreeCourseManagement = connect(mapStateToProps, mapDispatchToProps)(DegreeCourseManagement);
  
  export default connectedDegreeCourseManagement;