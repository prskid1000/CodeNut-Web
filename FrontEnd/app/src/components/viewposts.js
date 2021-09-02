/* eslint-disable */
import React from "react";
import axios from "axios";

class viewPosts extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          alert:"Welcome to site",
          user: localStorage.getItem('userid'),
          password: localStorage.getItem('password'),
          posts: []
        }
    this.viewPosts = this.viewPosts.bind(this);
    this.createPost = this.createPost.bind(this);
    this.fullView = this.fullView.bind(this);
      this.Home = this.Home.bind(this);
  }

  viewPosts(event) {
    this.props.history.push("/viewposts");
  }

  createPost(event) {
    this.props.history.push("/createpost");
  }

  fullView(event) {
    var post = JSON.parse(event.target.value);
    localStorage.setItem('author', post.author);
    localStorage.setItem('question', post.question);
    this.props.history.push("/postview");
  }

  Home(event) {
    this.props.history.push("/index");
  }

  componentDidMount() {

    this.setState({ 'user': localStorage.getItem('userid') });
    this.setState({ 'password': localStorage.getItem('password') });

    axios.get("https://codenutb.herokuapp.com/getallpost", {
      "Content-Type": "application/json"
    })
      .then(res => {

        if (res.data.success === "True") {
          for (var i in res.data.data) {
            this.state.posts.push({
              question: res.data.data[i].question,
              desciption: res.data.data[i].description,
              author: res.data.data[i].author,
              votes: res.data.data[i].votes,
            });
          }
          this.setState({ 'posts': this.state.posts });
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });
  }
    render() {
        return (
          <div className="bg">

            <nav className="navbar fixed-top navbar-expand-md bg">
              <div className="title">CodeNut</div>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <i className="text-white fas fa-bars"></i>
              </button>

              <div className="collapse navbar-collapse subbg2" id="collapsibleNavbar">
                <ul className="nav navbar-nav ml-auto navbar-right">
                  <li className="nav-item pl-3">
                    <button className="btn navbar-dark clickable f24 text-white" onClick={this.Home}>Home</button>
                  </li>
                  <li className="nav-item pl-3">
                    <button className="btn navbar-dark clickable f24 text-white" onClick={this.viewPosts}>All Posts</button>
                  </li>
                  <li className="nav-item pl-3">
                    <button className="btn navbar-dark clickable f24 text-white" onClick={this.createPost}>Create</button>
                  </li>
                  <li className="nav-item pl-3">
                    <a className="btn navbar-dark text-white clickable" href="/"><i className="fas fa-sign-out-alt f24"></i><br></br>Logout</a>
                  </li>
                </ul>
              </div>
            </nav>

            <div className="mt-5 p-4 bg">
              <div className="mg">
                <div className="row bgt p-4">
                  {this.state.posts.map((post, index) => (
                    <div className="card col-12 col-md-3 m-1">
                      <div className="row">
                        <div className="h5 col-10 bgt mt-3">{post.author}</div>
                        <div className="h5 bgt mt-3 float-right">{post.votes}</div>
                      </div>
                      <div className="card-body">
                        <div className="row pb-3">
                          <span className="bgt mb-1 h5 col-10 text-white mt-2"><b>Question</b></span>
                          <textarea rows="5" className="col-10 bgt text-white mr-5 mt-1" value={post.question} disabled ></textarea>
                        </div>
                        <div className="row pb-3">
                          <span className="bgt mb-1 h5 col-10 text-white mt-2"><b>Answer</b></span>
                          <textarea rows="5" className="col-10 bgt text-white mr-5 mt-1" value={post.desciption} disabled ></textarea>
                        </div>
                        <div className="row">
                          <button className="btn btn-dark bgt col-5 m-1 mr-3" value={JSON.stringify(post)} onClick={this.fullView} id="Full View">View</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          </div>
            <div className="panel-group fixed-bottom bg row pl-md-5 p-3">
              <div className="panel col-8">
                <div className="panel-body">
                  <div className="ftext">Contact Us</div>
                  <div className="ftext">Email: prskid1000@gmail.com</div>
                  <div className="ftext">Address: IIIT-R, Jharkhand, India</div>
                </div>
              </div>
              <div className="panel col-4 p-3">
                <div className="panel-body">
                  <div className="ftext clickable"><a className="clickable text-white" href="https://wellcart.netlify.app/" >Donate Us</a></div>
                </div>
              </div>
              <div className="panel col-12">
                <div className="d-flex ftext justify-content-center panel-body">
                  Copyright @ 2021, CodeNut
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default viewPosts;
