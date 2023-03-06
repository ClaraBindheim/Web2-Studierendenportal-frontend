import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import LoginDialog from "../authentication/LoginDialog";

class TopMenu extends Component{

    render(){

        return(
            
            <div>
            <Navbar bg="dark" expand="lg">
                <Container style={{marginLeft: 50}}>
                    <Navbar.Brand style={{color: "white" }}>Studienverwaltung</Navbar.Brand>
                    <LoginDialog />   
                </Container>
          </Navbar>
          </div>

        ) 

    }
}

export default TopMenu;