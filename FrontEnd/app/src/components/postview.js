/* eslint-disable */
import React from "react";
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
    console.log(event.target)
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
    console.log(event.target)
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
              <ul className="nav pt-3 nav-pills ml-3">
                <li className="nav-item"><a className="nav-link active btn btn-dark bgt" data-toggle="pill" href="#message" role="tab">Post</a></li>
                <li className="nav-item"><a className="nav-link btn btn-dark bgt" data-toggle="pill" href="#contact" role="tab">Comments</a></li>
              </ul>

              <div className="tab-content">

                <div id="message" className="tab-pane active" role="tabpanel">
                  <div className="mg">
                    <div className="row bgt p-4">
                      <div className="col-12 col-md-10 bgt p-4">
          
                          <div className="h5 mt-2 mb-5">
                            <b>{this.state.author}</b>
                            <div className="float-right ">
                              <a className="btn bgt btn-dark bgt p-2">{this.state.votes}</a>
                              <a className="btn bgt btn-dark clickable p-2" onClick={this.upVotePost}><i className="fas fa-thumbs-up"></i></a>
                              <a className="btn bgt btn-dark clickable p-2" onClick={this.downVotePost}><i className="fas fa-thumbs-down"></i></a>
                            </div>
                          </div>

                          {this.state.author != this.state.user && <>
                            <label>Question</label>
                            <textarea rows="10" type="text" className="form-control" name={JSON.stringify(this.state)} value={this.state.question} onChange={this.handleChange} id="question" disabled></textarea><br></br>
                            <label>Answer</label>
                            <textarea rows="10" type="text" className="form-control" name={JSON.stringify(this.state)} value={this.state.description} onChange={this.handleChange} id="description" disabled></textarea><br></br>
                        </>}

                          {this.state.author == this.state.user && <>
                            <label>Question</label>
                            <textarea rows="10" type="text" className="form-control" name={JSON.stringify(this.state)} value={this.state.question} onChange={this.handleChange} id="question"></textarea><br></br>
                            <label>Answer</label>
                            <textarea rows="10" type="text" className="form-control" name={JSON.stringify(this.state)} value={this.state.description} onChange={this.handleChange} id="description"></textarea><br></br>
                            <div className="row">
                              <input type="button" value="Create" className="btn h5 btn-dark col-11 col-md-5 ml-3 m-2" onClick={this.saveChange} id="Save"></input>
                              <input type="button" value="Delete" className="btn h5 btn-dark col-11 col-md-5 ml-3 m-2" onClick={this.deletePost} id="Delete Post"></input>
                            </div>
                        </>}
                        <div className="row mt-5">
                          <textarea rows="5" type="text" class="form-control ml-3 col-11 col-md-8" value={this.state.mycomment} onChange={this.handleChangeC} ></textarea>
                          <button className="btn h5 btn-dark col-11 ml-3 mt-md-5 col-md-2 ml-3 m-2" onClick={this.addComment} id="Add Comment">Comment</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="contact" className="tab-pane fade" role="tabpanel">
                  <div className="mg">
                    <div className="row p-4">
                      {this.state.comments.map((comment, index) => (
                        <div className="card col-12 col-md-3 m-2">
                          <div className="textrain h5 mt-2 mb-2" id={index}>
                            <b>{this.state.comments[index].author}</b>
                            <div className="float-right ">
                              <a className="btn bgt btn-dark bgt p-2">{this.state.comments[index].votes}</a>
                              <a className="btn bgt btn-dark clickable p-2" onClick={this.upVoteComment} id={index}><i id={index} className="fas fa-thumbs-up"></i></a>
                              <a className="btn bgt btn-dark clickable p-2" onClick={this.downVoteComment} id={index}><i id={index} className="fas fa-thumbs-down"></i></a>
                            </div>
                          </div>
                          {
                            this.state.comments[index].author != this.state.user && <>
                              <div className="row">
                                <textarea rows="5" className="col-10 bgt text-white mr-5 m-2" name={JSON.stringify(this.state)} value={this.state.comments[index].comment} onChange={this.handleComment} id={index} disabled></textarea>
                              </div>
                            </>
                          }
                          {
                            this.state.comments[index].author == this.state.user && <>
                              <div className="row">
                                <textarea rows="5" className="col-10 bgt text-white mr-5 m-2" name={JSON.stringify(this.state)} value={this.state.comments[index].comment} onChange={this.handleComment} id={index} ></textarea>
                              </div>
                              <div className="row">
                                <button className="btn bgt btn-dark bgt col-5 m-2" onClick={this.deleteComment} id={index}>Delete</button>
                                <button className="btn bgt btn-dark bgt col-5 m-2" onClick={this.editComment} id={index}>Save</button>
                              </div>
                            </>
                            
                          }
                        </div>
                      ))}
                    </div>
                  </div>
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

export default postView;
