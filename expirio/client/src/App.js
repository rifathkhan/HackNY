import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import MedicationList from "./components/medication-list.component";
import EditMedication from "./components/edit-medication.component";
import AddMedication from "./components/add-medication.component";
import CreateNewUser from "./components/user-signup.component";
import UserLogin from "./components/user-login.component";

function App() {
  return (
    <Router> 

          <Route path="/medcab" exact component={MedicationList} />
          <Route path="/edit/:id" exact component={EditMedication} />
          <Route path="/add" exact component={AddMedication} />
          <Route path="/signup" exact component={CreateNewUser} />
          <Route path="/login" exact component={UserLogin} />
        
    </Router>
  );
}

export default App;
