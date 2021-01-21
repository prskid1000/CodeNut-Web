import React from "react";
import '../style/main.css';
/* eslint-disable */

class Index extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          alert:"Welcome to site",
          user:"prskid1000",
          posts: [{ 'question': 'WHat is OOPs?', 'desciption': 'Descibe it! Please give defination also.' }, { 'question': 'WHat is Java?', 'desciption': 'Descibe it! Please give defination also.' }, { 'question': 'WHat is Java?', 'desciption': 'Descibe it! Please give defination also.' }],
          contributors: [{ 'userid': 'prskid1000', 'exp': '1000' }, { 'userid': 'devil2021', 'exp': '1000' }]
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
                  <center><a class="navbar-brand fa fa-fw fa-book big-icon" href="/"></a></center>
                  <p class="h6 text-warning">Posts</p>
                </li>
                <li class="nav-item">
                  <center><a class="navbar-brand fa fa-fw fa-pencil big-icon" href="/"></a></center>
                  <p class="h6 text-warning">Create</p>
                </li>
                <li class="nav-item">
                  <center><a class="navbar-brand fa fa-fw fa-user big-icon" href="/"></a></center>
                  <p class="h6 text-warning">{this.state.user}</p>
                </li>
              </ul>
            </nav>
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>{this.state.alert}</strong>
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <br></br>
            <div class="row">
              <div class="col-10 bg-warning">
                <center><p class="bg-dark col-6 h3 text-white font-weight-bolder">Top Posts!</p></center> 
                <center>
                    {this.state.posts.map((post, index) => (
                      <div class="row col-11 mt-2">
                        <div class="card col-12">
                          <div class="card-body">
                            <h5 class="card-title overflow-auto text-danger">{post.question}</h5>
                            <p class="card-text overflow-auto">{post.desciption}</p>
                            <a href="#" class="btn btn-dark">Full View</a>
                          </div>
                        </div>
                      </div>
                    ))}
                </center>
              </div>
              <div class="col-2 bg-muted">
                <center><p class="bg-dark col text-white font-weight-bolder">Top Contributors!</p></center>
                  {this.state.contributors.map((user, index) => (
                    <span class="h4 badge badge-danger">
                      {user.userid}
                      <span class="h6 badge badge-success">
                        {user.exp}
                      </span>
                    </span>
                  ))}
              </div>
              <a href="#" class="btn btn-dark col-10 mt-2 mb-5">View More</a>
            </div>
          </div>
        );
    }
}

export default Index;
