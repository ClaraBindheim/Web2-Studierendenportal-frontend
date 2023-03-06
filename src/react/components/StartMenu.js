import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import config from "../config/config";
import { connect } from "react-redux";


const mapStateToProps = state => {
    return state;
}

class StartMenu extends Component{

    render(){
        const user = this.props.authReducer.user;
        let adminLinks;

        if(user.isAdmin || user.isAdministrator) {
            adminLinks = 
                <>
                    <Link id="OpenUserManagementPageButton" to={config.workspaces.userManagement}>Benutzer</Link>
                </>
            ;
        }


        return(
            
            <div>
                <Navbar bg="light" className="navbar-startmenu" expand="lg">
                    
                    <Link id="OpenStartPageButton" to={config.workspaces.Startseite}>Start</Link>
                    {adminLinks}
                    <Link id="OpenDegreeCourseManagementPageButton" to={config.workspaces.degreeManagement}>Studiengänge</Link>
                    <Link id="OpenDegreeCourseApplicationManagementPageButton" to={config.workspaces.applicationManagement}>Bewerbungen</Link>
                                       
                </Navbar>
            </div>

        ) 

    }
}

export default connect(mapStateToProps)(StartMenu);