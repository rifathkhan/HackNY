import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import MedicationList from "./components/medication-list.component";
import EditMedication from "./components/edit-medication.component";
import AddMedication from "./components/add-medication.component";
import CreateNewUser from "./components/create-user.component";
import UserLogin from "./components/user-login.component";

function App() {
  return (
    <Router> 
      <div className="container">
        <br/>
        <Route path="/" exact component={MedicationList} />
        <Route path="/edit/:id" exact component={EditMedication} />
        <Route path="/create" exact component={AddMedication} />
        <Route path="/user" exact component={CreateNewUser} />
        <Route path="/login" exact component={UserLogin} />
      </div>
    </Router>
  );
}

export default App;
