/* eslint-disable */
import React from "react";
import { Button } from "react-bootstrap";
import '../style/main.css';
import axios from "axios";

class postView extends React.Component
{
    constructor(props){
        super(props);
        this.state =
        {
          alert:"Welcome to site",
          user: localStorage.getItem('userid'),
          password: localStorage.getItem('password'),
          old_question: localStorage.getItem('question'),
          question: localStorage.getItem('question'),
          author: localStorage.getItem('author'),
          description: "",
          votes: "",
          comments: [],
          mycomment: ""
        }
    this.viewPosts = this.viewPosts.bind(this);
    this.createPost = this.createPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveChange = this.saveChange.bind(this);
    this.upVotePost = this.upVotePost.bind(this);
    this.downVotePost = this.downVotePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.addComment = this.addComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.editComment = this.editComment.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleChangeC = this.handleChangeC.bind(this);
    this.upVoteComment = this.upVoteComment.bind(this);
    this.downVoteComment = this.downVoteComment.bind(this);
    this.Home = this.Home.bind(this);
  }

  deleteComment(event){
    var id = event.target.id;
    if (this.state.user == this.state.comments[id].author) {
      const data = {
        userid: this.state.user,
        password: this.state.password,
        author: this.state.author,
        question: this.state.old_question,
        idx: id
      }
      axios.post("https://codenutb.herokuapp.com/deletecomment", data, {
        "Content-Type": "application/json"
      })
        .then(res => {
          console.log(res.data);
          if (res.data.success === "True") {
            this.setState({ 'comments': res.data.data.comments });
            this.setState({ 'alert': "Changes Saved" });
          }
          else {
            this.setState({ 'alert': "Error in Communication" });
          }
        });

    }
    else {
      this.setState({ 'alert': 'Only Author can edit it' });
    }
  }
  

  upVoteComment(event){
    var id = event.target.id;
    if (this.state.user != this.state.comments[id].author) {
      const data = {
        userid: this.state.user,
        password: this.state.password,
        author: this.state.author,
        question: this.state.old_question,
        idx: id
      }
      axios.post("https://codenutb.herokuapp.com/upvotec", data, {
        "Content-Type": "application/json"
      })
        .then(res => {
          console.log(res.data);
          if (res.data.success === "True") {
            this.setState({ 'comments': res.data.data.comments });
            this.setState({ 'alert': "Changes Saved" });
          }
          else {
            this.setState({ 'alert': "Error in Communication" });
          }
        });

    }
    else {
      this.setState({ 'alert': 'Only Author can edit it' });
    }
  }

  downVoteComment(event){
    var id = event.target.id;
    if (this.state.user != this.state.comments[id].author) {
      const data = {
        userid: this.state.user,
        password: this.state.password,
        author: this.state.author,
        question: this.state.old_question,
        idx: id
      }
      axios.post("https://codenutb.herokuapp.com/downvotec", data, {
        "Content-Type": "application/json"
      })
        .then(res => {
          console.log(res.data);
          if (res.data.success === "True") {
            this.setState({ 'comments': res.data.data.comments });
            this.setState({ 'alert': "Changes Saved" });
          }
          else {
            this.setState({ 'alert': "Error in Communication" });
          }
        });

    }
    else {
      this.setState({ 'alert': 'Only Author can edit it' });
    }
  }

  editComment(event){
    var id = event.target.id;
    if (this.state.user == this.state.comments[id].author) {
      const data = {
        userid: this.state.user,
        password: this.state.password,
        author: this.state.author,
        question: this.state.old_question,
        newcomment: this.state.comments[id].comment,
        idx: id
      }
      axios.post("https://codenutb.herokuapp.com/updatecomment", data, {
        "Content-Type": "application/json"
      })
        .then(res => {
          console.log(res.data);
          if (res.data.success === "True") {
            this.setState({ 'comments': res.data.data.comments });
            this.setState({ 'alert': "Changes Saved" });
          }
          else {
            this.setState({ 'alert': "Error in Communication" });
          }
        });

    }
    else {
      this.setState({ 'alert': 'Only Author can edit it' });
    }
  }

  saveChange(event){
    const data = {
      userid: this.state.user,
      password: this.state.password,
      author: this.state.author,
      question: this.state.old_question,
      newquestion: this.state.question,
      newdescription: this.state.description,
    }
    axios.post("https://codenutb.herokuapp.com/updatepost", data, {
      "Content-Type": "application/json"
    })
      .then(res => {
        console.log(res.data);
        if (res.data.success === "True") {
          this.setState({ 'old_question': res.data.data.question });
          this.setState({ 'alert': "Changes Saved" });
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });
  }

  upVotePost(event) {
    const data = {
      userid: this.state.user,
      password: this.state.password,
      author: this.state.author,
      question: this.state.old_question,
    }
    axios.post("https://codenutb.herokuapp.com/upvoteq", data, {
      "Content-Type": "application/json"
    })
      .then(res => {
        if (res.data.success === "True") {
          this.setState({'votes': res.data.data.votes});
          this.setState({ 'alert': "Changes Saved" });
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });
  }

  downVotePost(event) {
    const data = {
      userid: this.state.user,
      password: this.state.password,
      author: this.state.author,
      question: this.state.old_question,
    }
    axios.post("https://codenutb.herokuapp.com/downvoteq", data, {
      "Content-Type": "application/json"
    })
      .then(res => {
        if (res.data.success === "True") {
          this.setState({ 'votes': res.data.data.votes });
          this.setState({ 'alert': "Changes Saved" });
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });
  }

  
  deletePost(event) {
    const data = {
      userid: this.state.user,
      password: this.state.password,
      author: this.state.author,
      question: this.state.old_question,
    }
    axios.post("https://codenutb.herokuapp.com/deletepost", data, {
      "Content-Type": "application/json"
    })
      .then(res => {
        console.log(res.data);
        if (res.data.success === "True") {
          this.setState({ 'alert': "Post Deleted" });
          this.props.history.push("/viewposts");
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });
  }
  

  handleChange(event){
    var target = JSON.parse(event.target.name);
    if(target.user == target.author)
    {
      switch (event.target.id) {
        case "question":
          this.setState({ 'question': event.target.value });
          break;
        case "description":
          this.setState({ 'description': event.target.value });
      }
    }
    else
    {
      this.setState({'alert':'Only Author can edit it'});
    }
  }

  handleChangeC(event) {
    this.setState({ 'mycomment': event.target.value });
  }

  handleComment(event) {
    var idx = event.target.id;
    if (this.state.user == this.state.comments[idx].author) {
      this.state.comments[idx].comment = event.target.value;
      this.setState({ 'comments': this.state.comments});
    }
    else {
      this.setState({ 'alert': 'Only Author can edit it' });
    }
  }

  addComment(event){
    const data = {
      userid: this.state.user,
      password: this.state.password,
      author: this.state.author,
      question: this.state.old_question,
      comment: this.state.mycomment,
    }
    axios.post("https://codenutb.herokuapp.com/createcomment", data, {
      "Content-Type": "application/json"
    })
      .then(res => {
        console.log(res.data);
        if (res.data.success === "True") {
          this.setState({'comments': res.data.data.comments});
          this.setState({ 'alert': "Changes Saved" });
        }
        else {
          this.setState({ 'alert': "Error in Communication" });
        }
      });
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

    axios.get("https://codenutb.herokuapp.com/getallpost", {
      "Content-Type": "application/json"
    })
      .then(res => {

        if (res.data.success === "True") {

          for (var i in res.data.data)
          {
            if(res.data.data[i].question == this.state.question)
            {
              if (res.data.data[i].author == this.state.author)
              {
                this.setState({ 'question': res.data.data[i].question });
                this.setState({ 'description': res.data.data[i].description, });
                this.setState({ 'author': res.data.data[i].author });
                this.setState({ 'votes': res.data.data[i].votes });
                this.setState({ 'comments': res.data.data[i].comments });
                this.setState({ 'old_question': res.data.data[i].question });
                break;
              }
            }
          }
         
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
                  <li><a href="#"><i className="material-icons" onClick={this.viewPosts}>book</i></a></li>
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
              <div className="jumbotron col-sm p-1">
                <div class="jumbotron">
                  <div className="row col-11">
                    <div className="card col-sm-12">

                      <row className="row col hide-on-small-only">
                        <span class="col-4 new badge teal darken-4 m-3" data-badge-caption="">
                          <b>Author: &nbsp;</b>{this.state.author}
                        </span>
                        <span class="col-4 new badge teal darken-4 m-3" data-badge-caption="">
                          <b>Votes: &nbsp;</b>{this.state.votes}
                        </span>
                        <span class="col-1 new badge grey darken-4 mt-3 mb-3 white-text clickable" data-badge-caption="" onClick={this.upVotePost}>Up
                        </span>
                        <span class="col-1 new badge grey darken-4 mt-3 mb-3 white-text clickable" data-badge-caption="" onClick={this.downVotePost}>Down
                        </span>
                      </row>

                      <row className="row hide-on-med-and-up">
                        <span class="col-sm-6 new badge teal darken-4 mt-3" data-badge-caption="">
                          <b>Author: &nbsp;</b>{this.state.author}
                        </span>
                        <span class="col-sm-6 new badge teal darken-4 mt-3" data-badge-caption="">
                          <b>Votes: &nbsp;</b>{this.state.votes}
                        </span>
                      </row>

                      <row className="row hide-on-med-and-up">                    
                        <span class="col new badge grey darken-4 white-text clickable" data-badge-caption="" onClick={this.upVotePost}>Up
                        </span>
                        <span class="col new badge grey darken-4 white-text clickable" data-badge-caption="" onClick={this.downVotePost}>Down
                        </span>
                      </row>

                      <div className="card-body mt-3">
                        <div class="input-group form-group">
                          <div class="input-group-prepend">
                            <span class="material-icons">question_answer</span>
                          </div>
                          <input type="text" class="form-control" name={JSON.stringify(this.state)} value={this.state.question} onChange={this.handleChange} id="question"></input>
                        </div>
                        <div class="input-group form-group">
                          <div class="input-group-prepend">
                            <span class="material-icons">question_answer</span>
                          </div>
                          <input type="text" class="form-control" name={JSON.stringify(this.state)} value={this.state.description} onChange={this.handleChange} id="description"></input>
                        </div>
                        <div className="row">
                          <Button className="btn teal darken-4 col-sm m-1" onClick={this.saveChange} id="Save Change">Save Changes</Button>
                          <Button className="btn teal darken-4 col-sm m-1" onClick={this.deletePost} id="Delete Post">Delete Post</Button>
                        </div>
                      </div>

                      <div className="m-3">
                        <div className="row">
                          <textarea class="materialize-textarea col-sm-7 m-1" value="" ></textarea>
                          <Button className="btn teal darken-4 col-sm-4 m-1" onClick={this.addComment} id="Add Comment">Add Comment</Button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>  
            </div>

            <div className="row">
              <div className="jumbotron col-sm p-1">
                <center><h2>All Comments</h2></center>
                <div class="jumbotron">
                  <div className="row col-11 pb-3">
                    {this.state.comments.map((comment, index) => (
                      <div className="card col-sm-12">
                        <row className="row col hide-on-small-only">
                          <span class="col-4 new badge teal darken-4 m-3" data-badge-caption="">
                            <b>Author: &nbsp;</b>{this.state.comments[index].author}
                          </span>
                          <span class="col-4 new badge teal darken-4 m-3" data-badge-caption="">
                            <b>Votes: &nbsp;</b>{this.state.comments[index].votes}
                          </span>
                          <span class="col-1 new badge grey darken-4 mt-3 mb-3 white-text clickable" data-badge-caption="" onClick={this.upVoteComment} id={index}>Up
                        </span>
                          <span class="col-1 new badge grey darken-4 mt-3 mb-3 white-text clickable" data-badge-caption="" onClick={this.downVoteComment} id={index}>Down
                        </span>
                        </row>

                        <row className="row hide-on-med-and-up">
                          <span class="col-sm-6 new badge teal darken-4 mt-3" data-badge-caption="">
                            <b>Author: &nbsp;</b>{this.state.comments[index].author}
                          </span>
                          <span class="col-sm-6 new badge teal darken-4 mt-3" data-badge-caption="">
                            <b>Votes: &nbsp;</b>{this.state.comments[index].votes}
                          </span>
                        </row>

                        <row className="row hide-on-med-and-up ">
                          <span class="col new badge grey darken-4 white-text clickable" data-badge-caption="" onClick={this.upVoteComment} id={index}>Up
                        </span>
                          <span class="col new badge grey darken-4 white-text clickable" data-badge-caption="" onClick={this.downVoteComment} id={index}>Down
                        </span>
                        </row>


                        <div class="input-group form-group mt-5">
                          <div class="input-group-prepend">
                            <span class="material-icons">question_answer</span>
                          </div>
                          <input type="text" class="form-control" name={JSON.stringify(this.state)} value={this.state.comments[index].comment} onChange={this.handleComment} id={index}></input>
                        </div>

                        {
                          this.state.comments[index].author == this.state.user &&
                          <div className="row">
                            <Button className="btn teal darken-4 col-sm m-1 mr-3" onClick={this.deleteComment} id={index}>Delete Comment</Button>
                            <Button className="btn teal darken-4 col-sm m-1 mr-3" onClick={this.editComment} id={index}>Edit Comment</Button>
                          </div>
                        }
                    
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        );
    }
}

export default postView;
