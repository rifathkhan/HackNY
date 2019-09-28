import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      phonenumber: Number(''),
      emailaddress: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    axios.post('http://localhost:5000/user/signup', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
              <div className="col-md-8 col-lg-6">
                <div className="login d-flex align-items-center py-5">
                  <div className="container">
                  <div className="row">
                    <div className="col-md-9 col-lg-8 mx-auto">
                      <h3 className="login-heading mb-4">Create an account!</h3>
                      <form>
                        <div className="form-label-group">
                          <label for="inputEmail">User Name</label>
                          <input name="username" type="email" id="inputUsername" className="form-control" placeholder="Todd Howard" required autofocus/>
                        </div>

                        <div className="form-label-group">
                          <label for="inputEmail">Email address</label>
                          <input name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>
                        </div>

                        <div className="form-label-group">
                          <label for="inputPassword">Password</label>
                          <input name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required/> 
                        </div>

                        <div className="form-label-group"> 
                          <label for="inputPassword">Confirm Password</label>
                          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/> 
                        </div>

                        <div className="form-label-group">
                          <label for="inputPhoneNumber">Phone number</label>
                          <input name="cellnumber" type="password" id="inputPassword" className="form-control" placeholder="Password" required/> 
                        </div>

                        <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Register</button>
                        <a className="d-block text-center mt-2 small" href="/login">Already have an account?</a>

                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}