/* eslint-disable */
import React from "react";
import { Button } from "react-bootstrap";
import '../style/main.css';
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
          <div>
            <nav className="grey darken-4 mb-3">
              <div className="nav-wrapper m-5 ">
                <ul className="left ">
                  <li><a href="#" className="left brand-logo hide-on-small-only">CodeNut-Web</a></li>
                </ul>
                <ul className="right">
                  <li><a href="https://wellcart.netlify.app/"><i className="material-icons">store</i></a></li>
                  <li><a href="#"><i className="material-icons" onClick={this.Home}>home</i></a></li>
                  <li><a href="#"><i className="material-icons" onClick={this.createPost}>create</i></a></li>
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

            <div className="row">

              <div className="col-12 hide-on-med-and-up">
                <div>
                  <center><h2>Users</h2></center>
                  <center >
                    {this.state.contributors.map((user, index) => (
                      <div className="card col">
                        <div className="row m-1">
                          <span class="col-8 h5 mt-1 mb-1 ml-1" id={index}>
                            {user.userid}
                          </span>
                          <span class="col-3 new badge teal mt-2 mb-1 darken-4" data-badge-caption="">
                            <a href="#" class="nostyle" id={user.userid} onClick={this.newChat} >
                              {user.exp}
                            </a>
                          </span>
                        </div>
                      </div>
                    ))}
                  </center>
                </div>
              </div>

              <div className="col-12 col-md-9">
                <div>
                  <center><h2>Posts</h2></center>
                  <center>
                    {this.state.posts.map((post, index) => (
                      <div className="row mt-2 pb-3" id={index}>
                        <div className="card col-12">

                          <row className="row col">
                            <span class="col new badge teal darken-4 m-3" data-badge-caption="" id={index}>
                              {post.author}
                            </span>

                            <span class="col new badge teal darken-4 m-3" data-badge-caption="" id={index}>   
                              <b>Votes: &nbsp;</b>{post.votes}
                            </span>
                          </row>
                          
                          <div className="card-body mt-3">
                            <div class="input-group form-group">
                              <div class="input-group-prepend">
                                <span class="material-icons">question_answer</span>
                              </div>
                              <input type="text" class="form-control" placeholder={post.question} disabled></input>
                            </div>
                            <div class="input-group form-group">
                              <div class="input-group-prepend">
                                <span class="material-icons">question_answer</span>
                              </div>
                              <input type="text" class="form-control" placeholder={post.desciption} disabled></input>
                            </div>
                            <div className="row">
                              <Button className="btn teal darken-4 col-sm m-1 mr-3" value={JSON.stringify(post)} onClick={this.fullView} id="Full View">Full View</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </center>
                  <center>
                    <div className="row">
                      <Button className="btn teal darken-4 col-sm m-1 mr-3" onClick={this.viewPosts} id="View Posts">View More</Button>
                    </div>
                  </center>
                </div>
              </div>

              <div className="col-3 hide-on-small-only">
                <div class="p-1">
                  <center><h2>Users</h2></center>
                  <center >
                    {this.state.contributors.map((user, index) => (
                      <div className="card col">
                        <div className="row mb-1">
                          <span class="col-9 h5 mt-2 mb-1" id={index}>
                            {user.userid}
                          </span>
                          <span class="col-1 new badge teal mt-2 mb-1 darken-4" data-badge-caption="">
                            <a href="#" class="nostyle" id={user.userid} onClick={this.newChat} >
                              {user.exp}
                          </a>
                          </span>
                        </div>
                      </div>
                    ))}
                  </center>
                </div>
              </div>   
            </div>

          </div>
        );
    }
}

export default Index;
