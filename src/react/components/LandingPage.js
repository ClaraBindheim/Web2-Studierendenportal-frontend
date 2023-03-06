import React, { Component } from "react";
import LoginDialog from "../authentication/LoginDialog"; 
import BHTLogo from "../images/BHTLogo.png"
import { Container, Row, Col } from "react-bootstrap";
import { Badge } from "react-bootstrap";

class LandingPage extends Component{

    render(){

        return(
            
            <div className="page-content" id="LandingPage" style={{ background: 'White' , minHeight: "95vh"}}>
                
                <Container style={{ maxWidth: "90%" }}>
                    <Row className="g-4">
                        <Col>
                            <img src={BHTLogo} className="img-Logo" style={{ height: 600}}/>
                        </Col>
                        <Col style={{ marginTop: 100 }}>
                            <Col>
                                <h2 className="LoginText">Login und organisiere dein Studium!</h2>
                            </Col>
                            <br/>
                            <Col>
                                <LoginDialog />
                            </Col>
                        </Col>
                    </Row>
                </Container>
                
            </div>  
            
        ) 

    }
}

export default LandingPage;