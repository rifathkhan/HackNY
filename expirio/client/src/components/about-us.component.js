import React, { Component } from 'react';
import "../about.css"

import Oren from "../Oren_Senpai.jpg";
import Rifat from "../Rifat.PNG";
import Rehman from "../Rehman.PNG";

export default class AboutUs extends Component {
  constructor(props) {
    super(props);

  }



  render() {
    return (
      <div>
        {/* Header */}
        <header className="bg-primary text-center py-5 mb-4">
          <div className="container">
            <h1 className="font-weight-light text-white">About Us</h1>
          </div>
        </header>
        {/* Page Content */}
        <div className="container">
          <div className="row">
            {/* Team Member 1 */}
            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card border-0 shadow">
                <img src={Rifat} className="card-img-top" alt="..." />
                <div className="card-body text-center">
                  <h5 className="card-title mb-0">Team Member</h5>
                  <div className="card-text text-black-50">Web Developer</div>
                </div>
              </div>
            </div>
            {/* Team Member 2 */}
            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card border-0 shadow">
                <img src={Oren} className="card-img-top" alt="..." />
                <div className="card-body text-center">
                  <h5 className="card-title mb-0">Team Member</h5>
                  <div className="card-text text-black-50">Web Developer</div>
                </div>
              </div>
            </div>
            {/* Team Member 3 */}
            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card border-0 shadow">
                <img src={Rehman} className="card-img-top" alt="..." />
                <div className="card-body text-center">
                  <h5 className="card-title mb-0">Team Member</h5>
                  <div className="card-text text-black-50">Web Developer</div>
                </div>
              </div>
            </div>
            {/* Team Member 4 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </div>
    );
  }
}