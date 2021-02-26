/* eslint-disable */
import React from "react";
import { Button } from "react-bootstrap";
import '../style/main.css';
import axios from "axios";

class createPost extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      alert: "Welcome to site",
      user: localStorage.getItem('userid'),
      password: localStorage.getItem('password'),
      question: "",
      description: "",
    }
    this.viewPosts = this.viewPosts.bind(this);
    this.createPost = this.createPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveChange = this.saveChange.bind(this);
    this.Home = this.Home.bind(this);
  }

  saveChange(event) {
    const data = {
      userid: this.state.user,
      password: this.state.password,
      question: this.state.question,
      description: this.state.description,
      author: this.state.user,
    }
    axios.post("https://codenutb.herokuapp.com/createpost", data, {
      "Content-Type": "application/json"
    })
      .then(res => {
        console.log(res.data);
        if (res.data.success === "True") {
          this.setState({ 'alert': "Post Created Successfully" });
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });
  }

  handleChange(event) {
    switch (event.target.id) {
      case "question":
        this.setState({ 'question': event.target.value });
        break;
      case "description":
        this.setState({ 'description': event.target.value });
        break;
    }
  }

  viewPosts(event) {
    this.props.history.push("/viewposts");
  }

  createPost(event) {
    this.props.history.push("/createpost");
  }

  Home(event) {
    this.props.history.push("/index");
  }

  componentDidMount() {
    this.setState({ 'user': localStorage.getItem('userid') });
    this.setState({ 'password': localStorage.getItem('password') });
  }

  render() {
    return (
      <div className="container">
        <nav className="grey darken-4 mb-3">
          <div className="nav-wrapper m-5 ">
            <ul className="left ">
              <li><a href="#" className="left brand-logo hide-on-small-only">CodeNut-Web</a></li>
            </ul>
            <ul className="right">
              <li><a href="/index"><i className="left material-icons">home</i></a></li>
              <li><a href="viewposts"><i className="material-icons" onClick={this.viewPosts}>book</i></a></li>
              <li><a href="/createpost"><i className="material-icons" onClick={this.createPost}>create</i></a></li>
              <li><a href="/"><i className="material-icons">logout</i></a></li>
            </ul>
          </div>
        </nav>
        
        <div className="alert white-text grey darken-1 alert-dismissible fade show" role="alert">
          <strong>{this.state.alert}</strong>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <br></br>
        
        <div className="row">
          <div className="col-sm">
            <div class="jumbotron">
              <div class="card">
                <div class="card-header">
                  <h3>New</h3>
                </div>
                <div class="card-body">
                  <form>
                    <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="material-icons">question_answer</span>
                      </div>
                      <input type="text" class="form-control" placeholder="Question" title={JSON.stringify(this.state)} value={this.state.question} onChange={this.handleChange} id="question"></input>
                    </div>
                    <div class="input-group form-group">
                      <div class="input-group-prepend">
                        <span class="material-icons">question_answer</span>
                      </div>
                      <input type="password" class="form-control" placeholder="Description" title={JSON.stringify(this.state)} value={this.state.description} onChange={this.handleChange} id="description"></input>
                    </div>
                    <div class="row">
                      <input type="button" value="Create" class="col btn float-right login_btn grey darken-4 white-text" onClick={this.saveChange} id="Create"></input>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default createPost;
