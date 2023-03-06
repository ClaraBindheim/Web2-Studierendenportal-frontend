import React, { Component } from "react";
import config from "./react/config/config";
import './App.css';
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TopMenu from './react/components/TopMenu';
import StartMenu from "./react/components/StartMenu";
import LandingPage from './react/components/LandingPage';
import Startseite from "./react/components/Startseite";
import UserManagement from "./react/user/UserManagement";
import DegreeCourseManagement from "./react/degreeCourse/DegreeCourseManagement";
import ApplicationManagement from "./react/application/ApplicationManagement";
import { Navigate } from "react-router-dom";


const mapStateToProps = state => {
  return state;
}

class App extends Component {

  render(){

    const user = this.props.authReducer.user;
    let navigation, workspace, adminRoute;

    if(user){

      //wenn ein user eingelogged ist, ist das Startenu auf der Seite (es wird unten eingefügt und wenn es leer ist ist es nicht da)
      navigation = <StartMenu />;
      
      //Abfrage ob admin damit nur ein admin auf userManagemant kann
      if(user.isAdmin || user.isAdministrator) {
        adminRoute = <Route path={config.workspaces.userManagement} element={<UserManagement />} exact />;
      }

      workspace =
        <Routes>
          <Route path={config.workspaces.Startseite} element={<Startseite />} exact />
          {adminRoute}
          <Route element={<Startseite />} />
          <Route path={config.workspaces.degreeManagement} element={<DegreeCourseManagement />} exact />;
          <Route path={config.workspaces.applicationManagement} element={<ApplicationManagement />} exact />;
        </Routes>
      ;
    }
    else {
      workspace =
        <Routes>
          <Route path={config.workspaces.LandingPage} element={<LandingPage />} exact />
          <Route element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ;
    }

    return (
      <BrowserRouter>
        <div className='App'>
          <TopMenu />
          {navigation}
          {workspace}
        </div>
      </BrowserRouter>
    );
  }

}

export default connect(mapStateToProps)(App);
