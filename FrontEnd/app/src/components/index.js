/* eslint-disable */
import React from "react";
import axios from "axios";

class Index extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          alert:"Welcome to site",
          user: localStorage.getItem('userid'),
          password: localStorage.getItem('password'),
          posts: [],
          contributors: []
        }

      this.fullView = this.fullView.bind(this);
      this.viewPosts = this.viewPosts.bind(this);
      this.createPost = this.createPost.bind(this);
      this.Home = this.Home.bind(this);
    }

  viewPosts(event){
    this.props.history.push("/viewposts");
  }

  Home(event) {
    this.props.history.push("/index");
  }

  createPost(event) {
    this.props.history.push("/createpost");
  }
    fullView(event){
      var post = JSON.parse(event.target.value);
      localStorage.setItem('author', post.author);
      localStorage.setItem('question', post.question);
      this.props.history.push("/postview");
    }
  
  componentDidMount() {

    this.setState({ 'user': localStorage.getItem('userid') });
    this.setState({ 'password': localStorage.getItem('password') });

    axios.get("https://codenutb.herokuapp.com/getallpost",{
      "Content-Type": "application/json"
    })
      .then(res => {
        
        if (res.data.success === "True") {
          for (var i in res.data.data) {
            this.state.posts.push({ question: res.data.data[i].question,
              desciption: res.data.data[i].description,
              author: res.data.data[i].author,
              votes: res.data.data[i].votes,
            });
            if(i === 5)break;
          }
          this.setState({'posts': this.state.posts});
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });

    axios.get("https://codenutb.herokuapp.com/getalluser", {
      "Content-Type": "application/json"
    })
      .then(res => {

        if (res.data.success === "True") {
          for (var i in res.data.data) {
            this.state.contributors.push({
              userid: res.data.data[i].userid,
              exp: res.data.data[i].exp,
            });
            if (i === 20) break;
          }
          this.setState({ 'contributors': this.state.contributors });
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });
  }

    render() {
        return (
          <>
            <nav className="navbar fixed-top navbar-expand-md bg">
              <div className="title">IChat</div>
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


          </>
        );
    }
}

export default Index;
