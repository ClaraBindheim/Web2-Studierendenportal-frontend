import React, { Component } from "react";
import StartMenu from "./StartMenu";
import {bindActionCreators } from "redux";
import { connect } from "react-redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const mapStateToProps = state => {
    const { user } = state.authReducer;
    return {
        user
      };
}


class Startseite extends Component{

    constructor(props){

        super(props);
        this.state = {
          currentUser: this.props.user
        };
    }   

    render(){
        
        return(
            
            <div className="page-content" id="StartPage" style={{ background: 'white' , minHeight: "90vh"}}>
                <div style={{ marginTop: 200}}>
                    <Container>
                        <Row>
                            <h1>Wilkommen {this.state.currentUser.firstName} {this.state.currentUser.lastName}</h1>
                        </Row>
                    </Container>
                </div> 
            </div>  
        ) 

    }
}

export default connect(mapStateToProps)(Startseite);
