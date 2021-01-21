import React from "react";
import '../style/main.css';
/* eslint-disable */

class Index extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          user:"prskid1000"
        }
    }

    handleClick() {
    this.props.history.push("/index");
  }

    render() {
        console.log(this.props.history);
        return (
          <div class="container">
            <nav class="collapse navbar-collapse navbar navbar-expand-md navbar-dark bg-dark">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <a class="navbar-brand fa fa-fw fa-home big-icon" href="/"></a>
                </li>
              </ul>
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <p class="h1 text-warning font-italic font-weight-bolder">CodeNut</p>
                </li>
              </ul>
              <ul class="navbar-nav">
                <li class="nav-item">
                  <center><a class="navbar-brand fa fa-fw fa-user big-icon" href="/"></a></center>
                  <p class="h6 text-warning">{this.state.user}</p>
                </li>
              </ul>
            </nav>
            <div class="row">
              <div class="col-10 bg-warning">
                <center><p>1 of 2</p></center> 
              </div>
              <div class="col-2 bg-danger">
                <center><p>2 of 2</p></center> 
              </div>
            </div>
          </div>
        );
    }
}

export default Index;
