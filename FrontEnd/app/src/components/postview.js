/* eslint-disable */
import React from "react";
import { Button } from "react-bootstrap";
import '../style/main.css';
import axios from "axios";
import Cookies from 'universal-cookie';

class postView extends React.Component
{
    constructor(props){
        const cookies = new Cookies();
        super(props);
        this.state =
        {
          alert:"Welcome to site",
          user: cookies.get('userid'),
          password: cookies.get('password'),
          posts: [{ 'question': 'WHat is OOPs?', 'desciption': 'Descibe it! Please give defination also.' }, { 'question': 'WHat is Java?', 'desciption': 'Descibe it! Please give defination also.' }, { 'question': 'WHat is Java?', 'desciption': 'Descibe it! Please give defination also.' }],
        }
    }


    render() {
        return (
          <div className="container">
            <nav className="collapse navbar-collapse navbar navbar-expand-md navbar-dark bg-dark">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="navbar-brand fa fa-fw fa-home big-icon" href="/index"></a>
                </li>
              </ul>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <p className="h1 text-warning font-italic font-weight-bolder">CodeNut</p>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <center><a className="navbar-brand fa fa-fw fa-book big-icon" href="/index"></a></center>
                  <p className="h6 text-warning">Posts</p>
                </li>
                <li className="nav-item">
                  <center><a className="navbar-brand fa fa-fw fa-pencil big-icon" href="/index"></a></center>
                  <p className="h6 text-warning">Create</p>
                </li>
                <li className="nav-item">
                  <center><a className="navbar-brand fa fa-fw fa-user big-icon" href="/index"></a></center>
                  <p className="h6 text-warning">{this.state.user}</p>
                </li>
              </ul>
            </nav>
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>{this.state.alert}</strong>
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <br></br>
            <div className="row">
              <div className="col-12">
                
              </div>
            </div>
          </div>
        );
    }
}

export default postView;
