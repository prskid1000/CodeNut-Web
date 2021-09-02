/* eslint-disable */
import React from "react";
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
          this.props.history.push("/viewposts");
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
            <div className="col-12 col-md-6 bgt p-4">
              <label>Question</label>
              <textarea rows="10" type="text" className="form-control"  title={JSON.stringify(this.state)} value={this.state.question} onChange={this.handleChange} id="question"></textarea><br></br>
              <label>Answer</label>
              <textarea rows="10" type="text" className="form-control"  title={JSON.stringify(this.state)} value={this.state.description} onChange={this.handleChange} id="description"></textarea><br></br>
              <input type="button" value="Create" className="btn h5 btn-dark col mt-2" onClick={this.saveChange} id="Create"></input>
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

export default createPost;
