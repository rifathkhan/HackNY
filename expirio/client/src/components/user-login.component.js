import React, { Component } from 'react';
import axios from 'axios';

import "../login.css"
import logo from "../expirio.PNG"

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

  }

  onSubmit(e) {
    e.preventDefault();

    const myForm = document.getElementById("loginform");
    let formData = new FormData(myForm);
    let user = {};
    for (let key of formData.keys()){
      user[key] = formData.get(key);
    }


    axios.post('http://localhost:5000/user/login', user)
      .then(res => {
        if(res.status >= 400){
          console.log(res.data);
        } else {
          localStorage.setItem("token", res.data.token);
          console.log(localStorage.getItem("token"));

          window.location = '/medcab';
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
          <div className="row no-gutter">
              <div className="col-md-8 col-lg-6">
                <div className="login d-flex align-items-center py-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-9 col-lg-8 mx-auto">
                        <img className="login-Logo" src={logo} width="150px" height="220px" alt="Expirio Logo"/>
                        <h3 className="login-heading mb-4">Welcome back!</h3>
                        <form id="loginform">
                          <label htmlFor="inputEmail">User Name</label>
                          <div className="form-label-group">
                            <input type="text" id="inputUsername" className="form-control" name="username" required autoFocus/>
                          </div>
                          <label htmlFor="inputPassword">Password</label>
                          <div className="form-label-group">
                            <input type="password" id="inputPassword" className="form-control" name="password" required/> 
                          </div>

                          <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                            <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                          </div>
                          
                          <button 
                            className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" 
                            type="submit"
                            onClick = {e => this.onSubmit(e)}
                          >
                            Sign in
                          </button>
                          
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

              <div className="d-none d-md-flex col-md-6 col-lg-6">
                <section>

                </section>
              </div>
            </div>

    )
  }
}