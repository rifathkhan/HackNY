import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
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

    axios.post('http://localhost:5000/user/login', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  render() {
    return (
          <div className="row no-gutter">
            <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
              <div className="col-md-8 col-lg-6">
                <div className="login d-flex align-items-center py-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-9 col-lg-8 mx-auto">
                        <h3 className="login-heading mb-4">Welcome back!</h3>
                        <form>
                          <div className="form-label-group">
                            <label for="inputEmail">Email address</label>
                            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>
                          </div>
                          <div className="form-label-group">
                            <label for="inputPassword">Password</label>
                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/> 
                          </div>

                          <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                            <label className="custom-control-label" for="customCheck1">Remember password</label>
                          </div>
                          
                          <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Sign in</button>
                          <div className="text-center">
                            <a className="small" href="#">Forgot password?</a>
                          </div>

                          <div className="text-center">
                            <a className="small" href="/signup">Don't have an account?</a>
                          </div>
                            
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    )
  }
}