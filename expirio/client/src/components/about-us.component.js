import React, { Component } from 'react';
import "../about.css"

import Oren_Senpai from "../Oren_Senpai.jpg";
import Rifat_Senpai from "../Rifat.PNG";
import Rehman from "../Rehman.PNG";

export default class AboutUs extends Component {
  constructor(props) {
    super(props);

  }



  render() {
    return (

        <div>
            <div className="color col-sm-6 col-md-9 col-lg-12 mx-auto">
                <img className="rounded-circle placement" src={Oren_Senpai} width="200px" height="220px" alt="Oren Ben-Meir" />
                <img className="rounded-circle placement" src={Rehman} width="200px" height="220px" alt="Oren Ben-Meir" />
                <img className="rounded-circle placement" src={Rifat_Senpai} width="200px" height="220px" alt="Oren Ben-Meir" />
            </div>
            <div>
            <p className="about-Rehman">Rehman Arshad</p>
            <p className="about-Oren">Oren Ben-Meir</p>
            <p className="about-Rifat">Rifat Khan</p>
                <section>

                </section>
            </div>
        </div>

    )
  }
}