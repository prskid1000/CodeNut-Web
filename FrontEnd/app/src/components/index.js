/* eslint-disable */
import React from "react";
import { Button } from "react-bootstrap";
import '../style/main.css';
import axios from "axios";
import Cookies from 'universal-cookie';

class Index extends React.Component
{
    constructor(props){
        const cookies = new Cookies();
        super(props);
        this.state =
        {
          alert:"Welcome to site",
          user: cookies.get('userid'),
          password: cookies.get('password'),
          posts: [{ 'question': 'WHat is OOPs?', 'desciption': 'Descibe it! Please give defination also.', 'author': 'prskid1000' }, { 'question': 'WHat is Java?', 'desciption': 'Descibe it! Please give defination also.', 'author': 'prskid1000' }, { 'question': 'WHat is Java?', 'desciption': 'Descibe it! Please give defination also.', 'author': 'prskid1000'}],
          contributors: [{ 'userid': 'prskid1000', 'exp': '1000' }, { 'userid': 'devil2021', 'exp': '1000' }]
        }

      this.fullView = this.fullView.bind(this);
    }

    fullView(event){
      var post = JSON.parse(event.target.value);
      this.props.history.push({
        pathname: '/postview',
        state: { question: post.question, author: post.author}
      });
      this.props.history.push("/postview");
    }

  componentWillMount() {
    axios.get("http://localhost:8060/getallpost",{
      "Content-Type": "application/json"
    })
      .then(res => {
        
        if (res.data.success === "True") {
          for (var i in res.data.data) {
            console.log(res.data.data[i]);
            posts.push({ question: res.data.data[i].question,
              desciption: res.data.data[i].description,
              author: res.data.data[i].author
            })
          }
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });
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
                  <center><a className="navbar-brand fa fa-fw fa-book big-icon" href="/viewposts"></a></center>
                  <p className="h6 text-warning">Posts</p>
                </li>
                <li className="nav-item">
                  <center><a className="navbar-brand fa fa-fw fa-pencil big-icon" href="/createpost"></a></center>
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
              <div className="col-10 bg-warning">
                <center><p className="bg-dark col-6 h3 text-white font-weight-bolder">Top Posts!</p></center> 
                <center>
                    {this.state.posts.map((post, index) => (
                      <div className="row col-11 mt-2" id={index}>
                        <div className="card col-12">
                          <div className="card-body">
                            <h5 className="card-title overflow-auto text-danger">{post.question}</h5>
                            <p className="card-text overflow-auto">{post.desciption}</p>
                            <center><Button className="btn btn-danger col-6" value={JSON.stringify(post)} onClick={this.fullView} id="Full View">Full View</Button></center>
                          </div>
                        </div>
                      </div>
                    ))}
                </center>
              </div>
              <div className="col-2 bg-muted">
                <center><p className="bg-dark col text-white font-weight-bolder">Top Contributors!</p></center>
                  {this.state.contributors.map((user, index) => (
                    <span className="h4 badge badge-danger" id={index}>
                      {user.userid}
                      <span className="h6 badge badge-success">
                        {user.exp}
                      </span>
                    </span>
                  ))}
              </div>
              <a href="/viewposts" className="btn btn-dark col-10 mt-2 mb-5">View More</a>
            </div>
          </div>
        );
    }
}

export default Index;
