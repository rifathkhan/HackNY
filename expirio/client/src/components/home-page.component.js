import React, { Component } from 'react';
import axios from 'axios';

import "../home.css"
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
        <div>
            <img className="login-Logo" src={logo} width="150px" height="220px" alt="Expirio Logo"/>
        </div>

    )
  }
}